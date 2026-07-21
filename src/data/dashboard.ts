export const STAT_CARDS = [
  {
    icon: 'bi-people-fill',
    color: 'blue',
    value: '1,248',
    label: 'Total Students',
    trend: '+4.2%',
    trendUp: true,
    spark: [1080, 1120, 1090, 1160, 1140, 1200, 1248],
    sparkColor: '#2563EB',
  },
  {
    icon: 'bi-person-workspace',
    color: 'green',
    value: '84',
    label: 'Total Teachers',
    trend: '+2.1%',
    trendUp: true,
    spark: [78, 80, 81, 82, 83, 83, 84],
    sparkColor: '#10B981',
  },
  {
    icon: 'bi-calendar-check',
    color: 'orange',
    value: '91.4%',
    label: 'Attendance Rate',
    trend: '-1.3%',
    trendUp: false,
    spark: [93, 92, 94, 91, 90, 92, 91],
    sparkColor: '#F59E0B',
  },
  {
    icon: 'bi-coin',
    color: 'purple',
    value: '₦42.8M',
    label: 'Revenue Collected',
    trend: '+18.7%',
    trendUp: true,
    spark: [36, 38, 37, 40, 39, 41, 42.8],
    sparkColor: '#8B5CF6',
  },
  {
    icon: 'bi-exclamation-circle',
    color: 'red',
    value: '₦8.1M',
    label: 'Pending Fees',
    trend: '-6.2%',
    trendUp: false,
    spark: [10, 9.5, 9.8, 8.8, 8.5, 8.3, 8.1],
    sparkColor: '#EF4444',
  },
  {
    icon: 'bi-book-half',
    color: 'teal',
    value: '38',
    label: 'Active Courses',
    trend: '+3.0%',
    trendUp: true,
    spark: [34, 35, 36, 36, 37, 37, 38],
    sparkColor: '#06B6D4',
  },
] as const;

export const QUICK_ACTIONS = [
  { label: 'Add Student', icon: 'bi-person-plus-fill', color: 'blue', href: '/students' },
  { label: 'Create Class', icon: 'bi-plus-circle-fill', color: 'green', href: '/classes' },
  { label: 'Upload Results', icon: 'bi-upload', color: 'orange', href: '/exams' },
  { label: 'Announcement', icon: 'bi-megaphone-fill', color: 'purple', href: '/notifications' },
];

export const ENROLLMENT_TREND = {
  labels: ['Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May'],
  current: [980, 1020, 1060, 1090, 1040, 1100, 1140, 1180, 1210, 1248],
  previous: [850, 880, 920, 940, 900, 960, 990, 1010, 1030, 1050],
};

export const GENDER_DISTRIBUTION = {
  male: 674,
  female: 574,
};

export const WEEKLY_ATTENDANCE = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Mon', 'Tue'],
  present: [1180, 1160, 1200, 1140, 1190, 1170, 1210],
  absent: [68, 88, 48, 108, 58, 78, 38],
};

export const REVENUE_OVERVIEW = {
  labels: ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May'],
  data: [4.2, 5.8, 3.1, 2.2, 8.4, 6.1, 4.8, 5.2, 3.0],
};

export const CALENDAR_EVENT_DAYS = [5, 12, 14, 18, 22, 26];
export const CALENDAR_TODAY = 14;
export const CALENDAR_START_OFFSET = 3;
export const CALENDAR_MONTH_LABEL = 'May 2025';

export const UPCOMING_EVENTS: {
  day: string;
  month: string;
  title: string;
  meta: string;
  tag: 'orange' | 'green' | 'red' | 'purple';
  tagLabel: string;
}[] = [
  {
    day: '18',
    month: 'May',
    title: 'Mid-Term Break Begins',
    meta: 'All students • 1 week',
    tag: 'orange',
    tagLabel: 'Holiday',
  },
  {
    day: '26',
    month: 'May',
    title: 'Inter-House Sports Day',
    meta: 'Sports Complex • 8:00 AM',
    tag: 'green',
    tagLabel: 'Sports',
  },
  {
    day: '3',
    month: 'Jun',
    title: 'Second Term Exams Begin',
    meta: 'All SS Classes • 9:00 AM',
    tag: 'red',
    tagLabel: 'Exam',
  },
  {
    day: '15',
    month: 'Jun',
    title: 'Prize-Giving Day',
    meta: 'School Hall • 10:00 AM',
    tag: 'purple',
    tagLabel: 'Event',
  },
];

export const AI_DASHBOARD_INSIGHTS = [
  {
    dot: 'var(--color-orange)',
    text: 'Attendance in JSS 2B dropped 8.2% over 3 weeks — early intervention recommended.',
  },
  {
    dot: 'var(--color-green)',
    text: 'Fee collection on track to exceed last year by ₦4.2M at current pace.',
  },
  {
    dot: 'var(--color-teal)',
    text: "Math results show 12-point improvement linked to Dr. Obi's new approach.",
  },
  {
    dot: 'var(--color-red)',
    text: '18 students at risk of repeating — recommend notifying guardians this week.',
  },
  {
    dot: 'var(--color-purple)',
    text: 'Library utilization up 34% — consider expanding reading hour programs.',
  },
];

export const DASHBOARD_NOTIFICATIONS = [
  {
    icon: 'bi-person-plus-fill',
    bg: 'var(--color-primary-50)',
    iconColor: 'var(--color-primary)',
    text: '<strong>New student</strong> Amara Okafor registered in SS 3A',
    time: '2 min ago',
  },
  {
    icon: 'bi-coin',
    bg: 'var(--color-green-bg)',
    iconColor: 'var(--color-green)',
    text: '<strong>Payment</strong> ₦85,000 from Chidi Eze',
    time: '14 min ago',
  },
  {
    icon: 'bi-exclamation-circle-fill',
    bg: 'var(--color-red-bg)',
    iconColor: 'var(--color-red)',
    text: '<strong>Alert</strong> JSS 2B attendance below 80%',
    time: '1 hr ago',
  },
  {
    icon: 'bi-calendar-event',
    bg: 'var(--color-orange-bg)',
    iconColor: 'var(--color-orange)',
    text: '<strong>Exam reminder</strong> Maths SS3 on May 20',
    time: '3 hrs ago',
  },
  {
    icon: 'bi-star-fill',
    bg: 'var(--color-purple-bg)',
    iconColor: 'var(--color-purple)',
    text: '<strong>Results</strong> Second term grades published',
    time: 'Yesterday',
  },
];
