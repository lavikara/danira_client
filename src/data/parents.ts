export interface Parent {
  name: string;
  ward: string;
  cls: string;
  phone: string;
  lastContact: string;
  fee: "Paid" | "Partial" | "Unpaid";
}

export const PARENTS: Parent[] = [
  { name: "Mr. James Okafor", ward: "Amara Okafor", cls: "SS 3A", phone: "+234 803 1234 567", lastContact: "Today", fee: "Paid" },
  { name: "Mrs. Ngozi Eze", ward: "Chidi Eze", cls: "SS 3B", phone: "+234 805 2345 678", lastContact: "Yesterday", fee: "Partial" },
  { name: "Dr. Akin Bello", ward: "Fatima Bello", cls: "SS 2A", phone: "+234 806 3456 789", lastContact: "May 10", fee: "Paid" },
  { name: "Alhaja Hadiza Yusuf", ward: "Zainab Yusuf", cls: "SS 1C", phone: "+234 807 4567 890", lastContact: "May 8", fee: "Paid" },
  { name: "Mr. Kunle Okonkwo", ward: "Adaeze Okonkwo", cls: "JSS 1B", phone: "+234 802 5678 901", lastContact: "May 6", fee: "Paid" },
];

export const TODAYS_MEETINGS = [
  { name: "Mr. James Okafor", time: "9:00 AM", reason: "Academic performance" },
  { name: "Mrs. Ngozi Eze", time: "10:30 AM", reason: "Fees discussion" },
  { name: "Dr. Akin Bello", time: "2:00 PM", reason: "Progress review" },
];
