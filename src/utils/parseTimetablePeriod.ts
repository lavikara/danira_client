export interface RawPeriod {
  id: string;
  name: string; // still present for ASSEMBLY/BREAK rows where lesson is null
  day: 'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY' | 'SATURDAY' | 'SUNDAY';
  startTime: string; // ISO UTC
  endTime: string; // ISO UTC
  periodType: 'TEACHING' | 'ASSEMBLY' | 'BREAK' | string;
  lesson: {
    id: string;
    subject: {
      id: string;
      name: string;
      code: string;
      category: string;
    };
    staff: {
      id: string;
      position: string;
      users: {
        firstName: string;
        lastName: string;
        email: string;
      };
    };
    class: {
      id: string;
      name: string;
    };
  } | null; // null for ASSEMBLY / non-teaching periods
}

// ---------- Target shapes ----------
export interface SlotEntry {
  subject: string;
  teacher: string;
}

export interface TimetableSlot {
  time: string;
  subjects: (SlotEntry | null)[] | null; // outer null => BREAK row; inner null => no class that day/period
}

export interface SubjectColor {
  accent: string;
  bgVar: string;
}

export interface TodayScheduleEntry {
  time: string;
  teacher: string;
  subject: string;
  cls: string;
  room: string;
}

export interface TransformResult {
  TIMETABLE_SLOTS: TimetableSlot[];
  SUBJECT_COLORS: Record<string, SubjectColor>;
  /** Every distinct teacher who teaches this subject to this class, in first-seen order. A subject can have more than one (main + "2nd subject" staff). */
  SUBJECT_TEACHERS: Record<string, string[]>;
  TODAY_SCHEDULE: TodayScheduleEntry[];
  DAYS: string[];
}

const DAY_ORDER = [
  'MONDAY',
  'TUESDAY',
  'WEDNESDAY',
  'THURSDAY',
  'FRIDAY',
  'SATURDAY',
  'SUNDAY',
] as const;
type Day = (typeof DAY_ORDER)[number];

const PALETTE: SubjectColor[] = [
  { accent: '#2563EB', bgVar: 'var(--blue-chip-bg)' },
  { accent: '#10B981', bgVar: 'var(--green-chip-bg)' },
  { accent: '#EC4899', bgVar: 'var(--pink-chip-bg)' },
  { accent: '#8B5CF6', bgVar: 'var(--purple-chip-bg)' },
  { accent: '#06B6D4', bgVar: 'var(--teal-chip-bg)' },
  { accent: '#F59E0B', bgVar: 'var(--orange-chip-bg)' },
  { accent: '#EF4444', bgVar: 'var(--red-chip-bg)' },
  { accent: '#6366F1', bgVar: 'var(--indigo-chip-bg)' },
  { accent: '#D97706', bgVar: 'var(--amber-chip-bg)' },
  { accent: '#0EA5E9', bgVar: 'var(--cyan-chip-bg)' },
  { accent: '#C026D3', bgVar: 'var(--fuchsia-chip-bg)' },
  { accent: '#65A30D', bgVar: 'var(--lime-chip-bg)' },
  { accent: '#F43F5E', bgVar: 'var(--rose-chip-bg)' },
  { accent: '#0284C7', bgVar: 'var(--sky-chip-bg)' },
  { accent: '#7C3AED', bgVar: 'var(--violet-chip-bg)' },
];

function getSubject(p: RawPeriod): string {
  return p.lesson?.subject.name ?? extractSubjectFallback(p.name);
}

function getTeacherName(p: RawPeriod): string {
  if (!p.lesson) return '-';
  const { firstName, lastName } = p.lesson.staff.users;
  return `${firstName} ${lastName}`.trim();
}

function getClassName(p: RawPeriod): string {
  return p.lesson?.class.name ?? extractClassNameFallback(p.name) ?? '';
}

function getRoom(p: RawPeriod): string {
  const tail =
    p.name
      .split('—')
      .map((s) => s.trim())
      .pop() ?? '';
  return /^P\d+$/.test(tail) ? tail : '-';
}

function extractSubjectFallback(name: string): string {
  return name.split('—')[0].trim();
}

function extractClassNameFallback(name: string): string | undefined {
  const parts = name.split('—').map((p) => p.trim());
  return parts.length >= 2 ? parts[1] : undefined;
}

function formatClock(iso: string, tz: string): string {
  return new Date(iso).toLocaleTimeString('en-GB', {
    timeZone: tz,
    hour: 'numeric',
    minute: '2-digit',
    hour12: false,
  });
}

function formatRange(startIso: string, endIso: string, tz: string): string {
  return `${formatClock(startIso, tz)}–${formatClock(endIso, tz)}`;
}

export interface TransformOptions {
  timezone?: string;
  todayDay?: Day;
  className?: string;
}

export function transformPeriods(
  raw: RawPeriod[],
  options: TransformOptions = {},
): TransformResult {
  const tz = options.timezone ?? 'Africa/Lagos';

  const inferredToday = new Date()
    .toLocaleDateString('en-US', { timeZone: tz, weekday: 'long' })
    .toUpperCase() as Day;
  const todayDay: Day =
    options.todayDay ?? (DAY_ORDER.includes(inferredToday) ? inferredToday : 'MONDAY');

  const className =
    options.className ?? getClassName(raw.find((p) => p.periodType === 'TEACHING') ?? raw[0]) ?? '';

  const byDay: Record<Day, RawPeriod[]> = {
    MONDAY: [],
    TUESDAY: [],
    WEDNESDAY: [],
    THURSDAY: [],
    FRIDAY: [],
    SATURDAY: [],
    SUNDAY: [],
  };
  for (const p of raw) {
    if (DAY_ORDER.includes(p.day as Day) && p.periodType === 'TEACHING') {
      byDay[p.day as Day].push(p);
    }
  }
  for (const day of DAY_ORDER) {
    byDay[day].sort((a, b) => a.startTime.localeCompare(b.startTime));
  }

  const slotWindows = new Map<string, { start: string; end: string }>();
  for (const day of DAY_ORDER) {
    for (const p of byDay[day]) {
      const key = `${p.startTime}|${p.endTime}`;
      if (!slotWindows.has(key)) slotWindows.set(key, { start: p.startTime, end: p.endTime });
    }
  }
  const orderedWindows = [...slotWindows.values()].sort((a, b) => a.start.localeCompare(b.start));

  const TIMETABLE_SLOTS: TimetableSlot[] = [];
  for (let i = 0; i < orderedWindows.length; i++) {
    const win = orderedWindows[i];
    const subjectsForRow: (SlotEntry | null)[] = DAY_ORDER.map((day) => {
      const match = byDay[day].find((p) => p.startTime === win.start && p.endTime === win.end);
      return match ? { subject: getSubject(match), teacher: getTeacherName(match) } : null;
    });
    TIMETABLE_SLOTS.push({ time: formatRange(win.start, win.end, tz), subjects: subjectsForRow });

    const next = orderedWindows[i + 1];
    if (next && next.start !== win.end) {
      TIMETABLE_SLOTS.push({ time: 'BREAK', subjects: null });
    }
  }

  const uniqueSubjects = [
    ...new Set(raw.filter((p) => p.periodType === 'TEACHING').map((p) => getSubject(p))),
  ].sort();
  const SUBJECT_COLORS: Record<string, SubjectColor> = {};
  uniqueSubjects.forEach((subject, i) => {
    SUBJECT_COLORS[subject] = PALETTE[i % PALETTE.length];
  });

  const SUBJECT_TEACHERS: Record<string, string[]> = {};
  for (const p of raw) {
    if (p.periodType !== 'TEACHING') continue;
    const subject = getSubject(p);
    const teacher = getTeacherName(p);
    const existing = (SUBJECT_TEACHERS[subject] ??= []);
    if (!existing.includes(teacher)) existing.push(teacher);
  }

  const todayPeriods = raw
    .filter((p) => p.day === todayDay)
    .sort((a, b) => a.startTime.localeCompare(b.startTime));

  const TODAY_SCHEDULE: TodayScheduleEntry[] = todayPeriods.map((p) => {
    if (p.periodType !== 'TEACHING') {
      return {
        time: formatClock(p.startTime, tz),
        teacher: '-',
        subject: p.periodType === 'ASSEMBLY' ? 'Assembly' : p.periodType,
        cls: className,
        room: '-',
      };
    }
    return {
      time: formatClock(p.startTime, tz),
      teacher: getTeacherName(p),
      subject: getSubject(p),
      cls: getClassName(p) || className,
      room: getRoom(p),
    };
  });

  const DAYS = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'];
  return { TIMETABLE_SLOTS, SUBJECT_COLORS, SUBJECT_TEACHERS, TODAY_SCHEDULE, DAYS };
}
