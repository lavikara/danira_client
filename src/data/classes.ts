export interface SchoolClass {
  name: string;
  formTeacher: string;
  students: number;
  subjects: number;
  room: string;
  avg: number;
}

export const CLASSES: SchoolClass[] = [
  { name: "SS 3A", formTeacher: "Dr. Emmanuel Obi", students: 42, subjects: 14, room: "A-101", avg: 68 },
  { name: "SS 3B", formTeacher: "Mrs. Kemi Adeleke", students: 40, subjects: 14, room: "A-102", avg: 71 },
  { name: "SS 2A", formTeacher: "Mr. Femi Ojo", students: 44, subjects: 12, room: "B-201", avg: 74 },
  { name: "SS 2B", formTeacher: "Miss Grace Okoro", students: 43, subjects: 12, room: "B-202", avg: 69 },
  { name: "SS 1A", formTeacher: "Mrs. Aisha Mohammed", students: 45, subjects: 11, room: "C-301", avg: 72 },
  { name: "JSS 3A", formTeacher: "Mr. Kunle Balogun", students: 41, subjects: 10, room: "D-401", avg: 66 },
  { name: "JSS 2A", formTeacher: "Mr. Segun Alabi", students: 39, subjects: 9, room: "D-402", avg: 70 },
];

export const SUBJECTS_OFFERED = [
  "Mathematics", "English", "Physics", "Biology", "Chemistry", "Economics",
  "Government", "Geography", "History", "Literature", "Further Maths",
  "Commerce", "Agric Sci", "CRS",
];

export const CLASS_LEVEL_DISTRIBUTION = {
  labels: ["SS3", "SS2", "SS1", "JSS3", "JSS2", "JSS1"],
  data: [202, 220, 215, 180, 194, 237],
};
