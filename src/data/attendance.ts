export const ATTENDANCE_BY_CLASS = [
  { name: "SS 3A", pct: 94 },
  { name: "SS 3B", pct: 87 },
  { name: "SS 2A", pct: 96 },
  { name: "SS 2B", pct: 79 },
  { name: "SS 1A", pct: 92 },
  { name: "JSS 3A", pct: 83 },
  { name: "JSS 2A", pct: 90 },
];

export interface AttendanceRecord {
  name: string;
  id: string;
  cls: string;
  timeIn: string;
  status: "Present" | "Absent" | "Late";
}

export const ATTENDANCE_REGISTER: AttendanceRecord[] = [
  { name: "Amara Okafor", id: "GFA-0012", cls: "SS 3A", timeIn: "7:48 AM", status: "Present" },
  { name: "Chidi Eze", id: "GFA-0034", cls: "SS 3B", timeIn: "—", status: "Absent" },
  { name: "Fatima Bello", id: "GFA-0056", cls: "SS 2A", timeIn: "7:55 AM", status: "Present" },
  { name: "Emeka Nwosu", id: "GFA-0078", cls: "JSS 3A", timeIn: "8:14 AM", status: "Late" },
  { name: "Zainab Yusuf", id: "GFA-0091", cls: "SS 1C", timeIn: "7:42 AM", status: "Present" },
  { name: "Oluwaseun Adeyemi", id: "GFA-0103", cls: "SS 2B", timeIn: "—", status: "Absent" },
  { name: "Ngozi Okeke", id: "GFA-0115", cls: "JSS 2A", timeIn: "7:51 AM", status: "Present" },
];

export const ATTENDANCE_TREND_30D = [
  92, 90, 89, 93, 91, 88, 87, 90, 92, 94, 91, 89, 90, 93, 92, 91, 90, 88, 91,
  93, 94, 90, 89, 92, 91, 94, 93, 91, 92, 91,
];
