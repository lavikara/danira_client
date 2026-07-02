export interface Student {
  name: string;
  id: string;
  cls: string;
  gender: "Male" | "Female";
  attendance: number;
  fee: "Paid" | "Partial" | "Unpaid";
  status: "Active" | "Suspended";
}

export const STUDENTS: Student[] = [
  { name: "Amara Okafor", id: "GFA-2025-0012", cls: "SS 3A", gender: "Female", attendance: 95, fee: "Paid", status: "Active" },
  { name: "Chidi Eze", id: "GFA-2025-0034", cls: "SS 3B", gender: "Male", attendance: 88, fee: "Partial", status: "Active" },
  { name: "Fatima Bello", id: "GFA-2025-0056", cls: "SS 2A", gender: "Female", attendance: 97, fee: "Paid", status: "Active" },
  { name: "Emeka Nwosu", id: "GFA-2025-0078", cls: "JSS 3A", gender: "Male", attendance: 73, fee: "Unpaid", status: "Active" },
  { name: "Zainab Yusuf", id: "GFA-2025-0091", cls: "SS 1C", gender: "Female", attendance: 99, fee: "Paid", status: "Active" },
  { name: "Oluwaseun Adeyemi", id: "GFA-2025-0103", cls: "SS 2B", gender: "Male", attendance: 80, fee: "Partial", status: "Active" },
  { name: "Ngozi Okeke", id: "GFA-2025-0115", cls: "JSS 2A", gender: "Female", attendance: 92, fee: "Paid", status: "Active" },
  { name: "Ibrahim Aliyu", id: "GFA-2025-0127", cls: "SS 3A", gender: "Male", attendance: 76, fee: "Unpaid", status: "Suspended" },
  { name: "Adaeze Okonkwo", id: "GFA-2025-0139", cls: "JSS 1B", gender: "Female", attendance: 98, fee: "Paid", status: "Active" },
  { name: "Tunde Fasanya", id: "GFA-2025-0141", cls: "SS 1A", gender: "Male", attendance: 85, fee: "Paid", status: "Active" },
];

export const RECENT_REGISTRATIONS = [
  { name: "Amara Okafor", id: "GFA-2025-0012", cls: "SS 3A", date: "May 8", status: "Active", fee: "Paid" },
  { name: "Chidi Eze", id: "GFA-2025-0034", cls: "SS 3B", date: "May 9", status: "Active", fee: "Partial" },
  { name: "Fatima Bello", id: "GFA-2025-0056", cls: "SS 2A", date: "May 10", status: "Active", fee: "Paid" },
  { name: "Emeka Nwosu", id: "GFA-2025-0078", cls: "JSS 3A", date: "May 11", status: "Active", fee: "Unpaid" },
  { name: "Zainab Yusuf", id: "GFA-2025-0091", cls: "SS 1C", date: "May 12", status: "Active", fee: "Paid" },
  { name: "Oluwaseun A.", id: "GFA-2025-0103", cls: "SS 2B", date: "May 13", status: "Active", fee: "Partial" },
];
