export interface NavItem {
  key: string;
  label: string;
  href: string;
  icon: string;
  badge?: string;
}

export interface NavSection {
  label: string;
  items: NavItem[];
}

export const NAV_SECTIONS: NavSection[] = [
  {
    label: 'Overview',
    items: [{ key: 'dashboard', label: 'Dashboard', href: '/dashboard', icon: 'bi-speedometer2' }],
  },
  {
    label: 'People',
    items: [
      {
        key: 'students',
        label: 'Students',
        href: '/dashboard/students',
        icon: 'bi-people',
        badge: '1,248',
      },
      {
        key: 'teachers',
        label: 'Teachers',
        href: '/dashboard/teachers',
        icon: 'bi-person-workspace',
      },
      { key: 'parents', label: 'Parents', href: '/dashboard/parents', icon: 'bi-heart' },
    ],
  },
  {
    label: 'Academic',
    items: [
      {
        key: 'attendance',
        label: 'Attendance',
        href: '/dashboard/attendance',
        icon: 'bi-calendar-check',
      },
      {
        key: 'classes',
        label: 'Classes',
        href: '/dashboard/classes',
        icon: 'bi-journal-bookmark',
      },
      { key: 'timetable', label: 'Timetable', href: '/dashboard/timetable', icon: 'bi-clock' },
      {
        key: 'exams',
        label: 'Exams & Results',
        href: '/dashboard/exams',
        icon: 'bi-award',
      },
    ],
  },
  {
    label: 'Finance',
    items: [
      {
        key: 'fees',
        label: 'Fees & Payments',
        href: '/dashboard/fees',
        icon: 'bi-credit-card',
        badge: '12',
      },
    ],
  },
  {
    label: 'Resources',
    items: [
      { key: 'library', label: 'Library', href: '/dashboard/library', icon: 'bi-book' },
      { key: 'hostel', label: 'Hostel', href: '/dashboard/hostel', icon: 'bi-building' },
      {
        key: 'transport',
        label: 'Transport',
        href: '/dashboard/transport',
        icon: 'bi-bus-front',
      },
    ],
  },
  {
    label: 'Management',
    items: [
      {
        key: 'notifications',
        label: 'Notifications',
        href: '/dashboard/notifications',
        icon: 'bi-bell',
        badge: '5',
      },
      {
        key: 'analytics',
        label: 'Reports & Analytics',
        href: '/dashboard/analytics',
        icon: 'bi-bar-chart-line',
      },
      { key: 'settings', label: 'Settings', href: '/dashboard/settings', icon: 'bi-gear' },
    ],
  },
];

export const PAGE_META: Record<string, { title: string; subtitle: string }> = {
  '/dashboard': { title: 'Dashboard', subtitle: 'EduAdmin Pro / Dashboard' },
  '/dashboard/students': { title: 'Students', subtitle: 'EduAdmin Pro / Students' },
  '/dashboard/teachers': { title: 'Teachers', subtitle: 'EduAdmin Pro / Teachers' },
  '/dashboard/parents': { title: 'Parents', subtitle: 'EduAdmin Pro / Parents' },
  '/dashboard/attendance': { title: 'Attendance', subtitle: 'EduAdmin Pro / Attendance' },
  '/dashboard/classes': { title: 'Classes', subtitle: 'EduAdmin Pro / Classes' },
  '/dashboard/timetable': { title: 'Timetable', subtitle: 'EduAdmin Pro / Timetable' },
  '/dashboard/exams': {
    title: 'Exams & Results',
    subtitle: 'EduAdmin Pro / Exams & Results',
  },
  '/dashboard/fees': {
    title: 'Fees & Payments',
    subtitle: 'EduAdmin Pro / Fees & Payments',
  },
  '/dashboard/library': { title: 'Library', subtitle: 'EduAdmin Pro / Library' },
  '/dashboard/hostel': { title: 'Hostel', subtitle: 'EduAdmin Pro / Hostel' },
  '/dashboard/transport': { title: 'Transport', subtitle: 'EduAdmin Pro / Transport' },
  '/dashboard/notifications': {
    title: 'Notifications',
    subtitle: 'EduAdmin Pro / Notifications',
  },
  '/dashboard/analytics': {
    title: 'Reports & Analytics',
    subtitle: 'EduAdmin Pro / Reports & Analytics',
  },
  '/dashboard/settings': { title: 'Settings', subtitle: 'EduAdmin Pro / Settings' },
};
