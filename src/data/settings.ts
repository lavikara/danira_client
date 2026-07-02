export const NOTIFICATION_TOGGLES = [
  { label: "Email Notifications", sub: "Receive emails for key events", on: true },
  { label: "SMS Alerts", sub: "Text messages for urgent alerts", on: false },
  { label: "Fee Payment Reminders", sub: "Automatic reminders to parents", on: true },
  { label: "Attendance Alerts", sub: "Alert when student is absent", on: true },
  { label: "Exam Reminders", sub: "Notify before scheduled exams", on: true },
  { label: "Announcement Push", sub: "Push notifications for announcements", on: false },
];

export interface RoleRow {
  role: string;
  users: number;
  dashboard: boolean;
  students: boolean;
  finance: boolean;
  reports: boolean;
  settings: boolean;
}

export const ROLES: RoleRow[] = [
  { role: "Super Admin", users: 2, dashboard: true, students: true, finance: true, reports: true, settings: true },
  { role: "Principal", users: 1, dashboard: true, students: true, finance: true, reports: true, settings: false },
  { role: "Accountant", users: 3, dashboard: false, students: false, finance: true, reports: true, settings: false },
  { role: "Class Teacher", users: 42, dashboard: true, students: true, finance: false, reports: false, settings: false },
  { role: "Subject Teacher", users: 42, dashboard: false, students: true, finance: false, reports: false, settings: false },
];

export interface SessionRow {
  device: string;
  ip: string;
  loc: string;
  time: string;
  current: boolean;
}

export const SESSIONS: SessionRow[] = [
  { device: "Chrome — Windows", ip: "197.210.45.12", loc: "Lagos, NG", time: "Current", current: true },
  { device: "Safari — iPhone", ip: "197.210.45.13", loc: "Lagos, NG", time: "2 hrs ago", current: false },
  { device: "Firefox — Mac", ip: "105.112.89.22", loc: "Abuja, NG", time: "Yesterday", current: false },
];
