export const TIMETABLE_DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

export interface TimetableSlot {
  time: string;
  subjects: string[] | null;
}

export const TIMETABLE_SLOTS: TimetableSlot[] = [
  { time: "7:30–8:20",  subjects: ["Mathematics","Mathematics","Physics","Biology","English"] },
  { time: "8:20–9:10",  subjects: ["English","Chemistry","Mathematics","Chemistry","Mathematics"] },
  { time: "BREAK",      subjects: null },
  { time: "9:30–10:20", subjects: ["Biology","English","Government","Physics","Biology"] },
  { time: "10:20–11:10",subjects: ["Economics","Biology","Chemistry","English","Physics"] },
  { time: "BREAK",      subjects: null },
  { time: "11:30–12:20",subjects: ["Physics","Economics","Biology","Mathematics","Chemistry"] },
  { time: "12:20–1:00", subjects: ["Government","Physics","English","Economics","Government"] },
];

/**
 * accent = the vivid colour used for text and left border in both themes.
 * bg uses CSS variables so it reads from :root (light) or .dark overrides.
 */
export const SUBJECT_COLORS: Record<string, { accent: string; bgVar: string }> = {
  Mathematics: { accent: "#2563EB", bgVar: "var(--blue-chip-bg)" },
  English:     { accent: "#10B981", bgVar: "var(--green-chip-bg)" },
  Physics:     { accent: "#EC4899", bgVar: "var(--pink-chip-bg)" },
  Biology:     { accent: "#8B5CF6", bgVar: "var(--purple-chip-bg)" },
  Chemistry:   { accent: "#06B6D4", bgVar: "var(--teal-chip-bg)" },
  Economics:   { accent: "#F59E0B", bgVar: "var(--orange-chip-bg)" },
  Government:  { accent: "#EF4444", bgVar: "var(--red-chip-bg)" },
};

export const SUBJECT_TEACHERS: Record<string, string> = {
  Mathematics: "Dr. Obi",
  English:     "Mrs. Adeleke",
  Physics:     "Mr. Ojo",
  Biology:     "Miss Okoro",
  Chemistry:   "Mr. Alabi",
  Economics:   "Mrs. Mohammed",
  Government:  "Mr. Balogun",
};

export const TODAY_SCHEDULE = [
  { time: "7:30",  teacher: "Dr. Obi",      subject: "Mathematics", cls: "SS 3A", room: "A-101" },
  { time: "8:20",  teacher: "Mrs. Adeleke", subject: "English",     cls: "SS 3B", room: "A-102" },
  { time: "9:30",  teacher: "Mr. Ojo",       subject: "Physics",     cls: "SS 3A", room: "Lab 1" },
  { time: "10:20", teacher: "Miss Okoro",    subject: "Biology",     cls: "SS 2A", room: "Lab 2" },
  { time: "11:30", teacher: "Mrs. Mohammed", subject: "Economics",   cls: "SS 3A", room: "B-201" },
];

export const ROOM_UTILIZATION = {
  labels: ["A-101","A-102","B-201","Lab 1","Lab 2","Hall"],
  data:   [38, 35, 32, 28, 24, 10],
};
