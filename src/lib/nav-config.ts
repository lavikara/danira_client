export interface NavItem {
  key: string;
  label: string;
  href: string[];
  icon: string;
  badge?: string;
}

export interface NavSection {
  label: string;
  items: NavItem[];
}

export const getSidebarItems = (dynamicRoute: string = '') => [
  {
    label: 'Overview',
    items: [
      { key: 'dashboard', label: 'Dashboard', href: ['/dashboard'], icon: 'bi-speedometer2' },
    ],
  },
  {
    label: 'People',
    items: [
      {
        key: 'students',
        label: 'Students',
        href: ['/dashboard/students'],
        icon: 'bi-people',
        badge: '1,248',
      },
      {
        key: 'staffs',
        label: 'Staffs',
        href: ['/dashboard/staffs'],
        icon: 'bi-person-workspace',
      },
      { key: 'guardians', label: 'Guardians', href: ['/dashboard/guardians'], icon: 'bi-heart' },
    ],
  },
  {
    label: 'Academic',
    items: [
      {
        key: 'attendance',
        label: 'Attendance',
        href: ['/dashboard/attendance'],
        icon: 'bi-calendar-check',
      },
      {
        key: 'classes',
        label: 'Classes',
        href: ['/dashboard/classes'],
        icon: 'bi-journal-bookmark',
      },
      {
        key: 'subjects',
        label: 'Subjects',
        href: ['/dashboard/subjects'],
        icon: 'bi-book-half',
      },
      {
        key: 'timetable',
        label: 'Timetable',
        href: ['/dashboard/timetable', `/dashboard/timetable/${dynamicRoute}`],
        icon: 'bi-clock',
      },
      {
        key: 'exams',
        label: 'Exams & Results',
        href: ['/dashboard/exams'],
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
        href: ['/dashboard/fees'],
        icon: 'bi-credit-card',
        badge: '12',
      },
    ],
  },
  {
    label: 'Resources',
    items: [
      { key: 'library', label: 'Library', href: ['/dashboard/library'], icon: 'bi-book' },
      { key: 'hostel', label: 'Hostel', href: ['/dashboard/hostel'], icon: 'bi-building' },
      {
        key: 'transport',
        label: 'Transport',
        href: ['/dashboard/transport'],
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
        href: ['/dashboard/notifications'],
        icon: 'bi-bell',
        badge: '5',
      },
      {
        key: 'analytics',
        label: 'Reports & Analytics',
        href: ['/dashboard/analytics'],
        icon: 'bi-bar-chart-line',
      },
      { key: 'settings', label: 'Settings', href: ['/dashboard/settings'], icon: 'bi-gear' },
    ],
  },
];
