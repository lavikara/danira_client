export const YEARLY_ENROLLMENT = {
  labels: ["2021-22", "2022-23", "2023-24", "2024-25"],
  jss: [380, 410, 440, 462],
  ss: [590, 640, 690, 786],
};

export const ACADEMIC_PERFORMANCE = {
  labels: ["T1 22", "T2 22", "T3 22", "T1 23", "T2 23", "T3 23", "T1 24", "T2 24", "T1 25", "T2 25"],
  school: [62, 64, 61, 65, 67, 63, 66, 69, 70, 68],
  state: [58, 59, 57, 60, 61, 59, 62, 63, 64, 63],
};

export const DEPT_PERFORMANCE = {
  labels: ["Sciences", "Arts", "Commerce", "Tech", "Humanities", "Sports"],
  data: [74, 82, 78, 68, 85, 91],
};

export const FEE_BREAKDOWN = {
  labels: ["School Fees", "Dev Levy", "Library", "Sports", "ICT"],
  data: [28.4, 9.2, 2.1, 1.8, 1.3],
};

export const GRADE_DISTRIBUTION = {
  labels: ["A1", "B2", "B3", "C4", "C5", "C6", "D7", "E8", "F9"],
  data: [180, 245, 320, 298, 260, 180, 95, 60, 42],
  colors: ["#10B981", "#10B981", "#2563EB", "#2563EB", "#F59E0B", "#F59E0B", "#EF4444", "#EF4444", "#EF4444"],
};

export const AI_INSIGHTS = [
  { title: "Enrollment Forecast", icon: "bi-graph-up-arrow", color: "#10B981", text: "Projected 1,380 students by September 2025, a 10.6% increase. Recommend expanding SS1 intake by one class." },
  { title: "Fee Risk Alert", icon: "bi-exclamation-triangle-fill", color: "#EF4444", text: "47 students flagged as high-risk for non-payment. Automated reminders show 68% response — consider personal follow-ups." },
  { title: "Academic Intervention", icon: "bi-book-fill", color: "#F59E0B", text: "Physics performance declined 9.4% over two terms. Recommend additional tutorials for SS2 and SS3." },
];
