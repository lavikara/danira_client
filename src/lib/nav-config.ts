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
    label: "Overview",
    items: [
      { key: "dashboard", label: "Dashboard", href: "/", icon: "bi-speedometer2" },
    ],
  },
  {
    label: "People",
    items: [
      {
        key: "students",
        label: "Students",
        href: "/students",
        icon: "bi-people",
        badge: "1,248",
      },
      {
        key: "teachers",
        label: "Teachers",
        href: "/teachers",
        icon: "bi-person-workspace",
      },
      { key: "parents", label: "Parents", href: "/parents", icon: "bi-heart" },
    ],
  },
  {
    label: "Academic",
    items: [
      {
        key: "attendance",
        label: "Attendance",
        href: "/attendance",
        icon: "bi-calendar-check",
      },
      {
        key: "classes",
        label: "Classes",
        href: "/classes",
        icon: "bi-journal-bookmark",
      },
      { key: "timetable", label: "Timetable", href: "/timetable", icon: "bi-clock" },
      {
        key: "exams",
        label: "Exams & Results",
        href: "/exams",
        icon: "bi-award",
      },
    ],
  },
  {
    label: "Finance",
    items: [
      {
        key: "fees",
        label: "Fees & Payments",
        href: "/fees",
        icon: "bi-credit-card",
        badge: "12",
      },
    ],
  },
  {
    label: "Resources",
    items: [
      { key: "library", label: "Library", href: "/library", icon: "bi-book" },
      { key: "hostel", label: "Hostel", href: "/hostel", icon: "bi-building" },
      {
        key: "transport",
        label: "Transport",
        href: "/transport",
        icon: "bi-bus-front",
      },
    ],
  },
  {
    label: "Management",
    items: [
      {
        key: "notifications",
        label: "Notifications",
        href: "/notifications",
        icon: "bi-bell",
        badge: "5",
      },
      {
        key: "analytics",
        label: "Reports & Analytics",
        href: "/analytics",
        icon: "bi-bar-chart-line",
      },
      { key: "settings", label: "Settings", href: "/settings", icon: "bi-gear" },
    ],
  },
];

export const PAGE_META: Record<string, { title: string; subtitle: string }> = {
  "/": { title: "Dashboard", subtitle: "EduAdmin Pro / Dashboard" },
  "/students": { title: "Students", subtitle: "EduAdmin Pro / Students" },
  "/teachers": { title: "Teachers", subtitle: "EduAdmin Pro / Teachers" },
  "/parents": { title: "Parents", subtitle: "EduAdmin Pro / Parents" },
  "/attendance": { title: "Attendance", subtitle: "EduAdmin Pro / Attendance" },
  "/classes": { title: "Classes", subtitle: "EduAdmin Pro / Classes" },
  "/timetable": { title: "Timetable", subtitle: "EduAdmin Pro / Timetable" },
  "/exams": {
    title: "Exams & Results",
    subtitle: "EduAdmin Pro / Exams & Results",
  },
  "/fees": {
    title: "Fees & Payments",
    subtitle: "EduAdmin Pro / Fees & Payments",
  },
  "/library": { title: "Library", subtitle: "EduAdmin Pro / Library" },
  "/hostel": { title: "Hostel", subtitle: "EduAdmin Pro / Hostel" },
  "/transport": { title: "Transport", subtitle: "EduAdmin Pro / Transport" },
  "/notifications": {
    title: "Notifications",
    subtitle: "EduAdmin Pro / Notifications",
  },
  "/analytics": {
    title: "Reports & Analytics",
    subtitle: "EduAdmin Pro / Reports & Analytics",
  },
  "/settings": { title: "Settings", subtitle: "EduAdmin Pro / Settings" },
};
