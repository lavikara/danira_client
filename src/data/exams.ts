export interface UpcomingExam {
  name: string;
  cls: string;
  date: string;
  duration: string;
  venue: string;
  status: "Upcoming" | "Scheduled";
}

export const UPCOMING_EXAMS: UpcomingExam[] = [
  { name: "Mathematics", cls: "SS 3", date: "May 20", duration: "2h 30m", venue: "Hall A", status: "Upcoming" },
  { name: "English Language", cls: "SS 3", date: "May 22", duration: "2h", venue: "Hall B", status: "Upcoming" },
  { name: "Physics", cls: "SS 3", date: "May 24", duration: "2h 30m", venue: "Lab 1", status: "Upcoming" },
  { name: "Chemistry", cls: "SS 2", date: "May 28", duration: "2h", venue: "Hall A", status: "Scheduled" },
  { name: "Biology", cls: "SS 2", date: "May 30", duration: "2h", venue: "Lab 2", status: "Scheduled" },
  { name: "Economics", cls: "SS 3", date: "Jun 3", duration: "2h", venue: "Hall B", status: "Scheduled" },
];

export interface SubjectResult {
  subject: string;
  teacher: string;
  avg: number;
  pass: number;
  high: number;
  low: number;
}

export const SUBJECT_RESULTS: SubjectResult[] = [
  { subject: "Mathematics", teacher: "Dr. Emmanuel Obi", avg: 68.4, pass: 82, high: 98, low: 34 },
  { subject: "English Language", teacher: "Mrs. Kemi Adeleke", avg: 74.2, pass: 91, high: 96, low: 42 },
  { subject: "Physics", teacher: "Mr. Femi Ojo", avg: 61.8, pass: 74, high: 95, low: 28 },
  { subject: "Chemistry", teacher: "Mr. Segun Alabi", avg: 65.5, pass: 78, high: 97, low: 32 },
  { subject: "Biology", teacher: "Miss Grace Okoro", avg: 72.1, pass: 88, high: 99, low: 40 },
];

export const SCORE_DISTRIBUTION = {
  labels: ["0-39", "40-49", "50-59", "60-69", "70-79", "80-89", "90-100"],
  data: [28, 62, 145, 298, 342, 254, 119],
  colors: ["#EF4444", "#F97316", "#F59E0B", "#10B981", "#2563EB", "#8B5CF6", "#EC4899"],
};
