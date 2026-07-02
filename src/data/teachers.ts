export interface Teacher {
  name: string;
  subject: string;
  classes: string;
  students: number;
  lessons: number;
  rating: number;
  status: "Active" | "On Leave";
}

export const TEACHERS: Teacher[] = [
  { name: "Dr. Emmanuel Obi", subject: "Mathematics", classes: "SS1,SS2,SS3", students: 156, lessons: 18, rating: 4.9, status: "Active" },
  { name: "Mrs. Kemi Adeleke", subject: "English Language", classes: "JSS1,JSS2,SS1", students: 142, lessons: 16, rating: 4.7, status: "Active" },
  { name: "Mr. Femi Ojo", subject: "Physics", classes: "SS2,SS3", students: 88, lessons: 14, rating: 4.6, status: "Active" },
  { name: "Miss Grace Okoro", subject: "Biology", classes: "SS1,SS2,SS3", students: 134, lessons: 15, rating: 4.8, status: "Active" },
  { name: "Mr. Segun Alabi", subject: "Chemistry", classes: "SS2,SS3", students: 92, lessons: 13, rating: 4.5, status: "On Leave" },
  { name: "Mrs. Aisha Mohammed", subject: "Economics", classes: "SS2,SS3", students: 98, lessons: 12, rating: 4.7, status: "Active" },
  { name: "Mr. Kunle Balogun", subject: "Government", classes: "SS1,SS2", students: 86, lessons: 10, rating: 4.4, status: "Active" },
];

export const TEACHER_ACTIVITY = [
  { icon: "bi-check2", color: "var(--color-green)", text: "Dr. Obi marked SS3A attendance", time: "8:42 AM" },
  { icon: "bi-upload", color: "var(--color-primary)", text: "Mrs. Adeleke uploaded JSS2 results", time: "9:15 AM" },
  { icon: "bi-chat", color: "var(--color-purple)", text: "Mr. Ojo sent parent notification", time: "10:30 AM" },
  { icon: "bi-clock", color: "var(--color-orange)", text: "Mr. Alabi submitted leave request", time: "11:05 AM" },
];
