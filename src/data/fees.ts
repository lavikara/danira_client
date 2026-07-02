export interface FeeRecord {
  name: string;
  cls: string;
  total: string;
  paid: string;
  balance: string;
  due: string;
  status: "Paid" | "Partial" | "Overdue";
}

export const FEES: FeeRecord[] = [
  { name: "Amara Okafor", cls: "SS 3A", total: "₦120,000", paid: "₦120,000", balance: "₦0", due: "Jan 31", status: "Paid" },
  { name: "Chidi Eze", cls: "SS 3B", total: "₦120,000", paid: "₦60,000", balance: "₦60,000", due: "Jan 31", status: "Partial" },
  { name: "Fatima Bello", cls: "SS 2A", total: "₦105,000", paid: "₦105,000", balance: "₦0", due: "Jan 31", status: "Paid" },
  { name: "Emeka Nwosu", cls: "JSS 3A", total: "₦95,000", paid: "₦0", balance: "₦95,000", due: "Jan 31", status: "Overdue" },
  { name: "Zainab Yusuf", cls: "SS 1C", total: "₦105,000", paid: "₦105,000", balance: "₦0", due: "Feb 15", status: "Paid" },
  { name: "Ibrahim Aliyu", cls: "SS 3A", total: "₦120,000", paid: "₦30,000", balance: "₦90,000", due: "Jan 31", status: "Overdue" },
];

export const FEE_SUMMARY = [
  { label: "School Fees", value: "₦28.4M", pct: 78, color: "var(--color-primary)" },
  { label: "Development Levy", value: "₦9.2M", pct: 91, color: "var(--color-teal)" },
  { label: "Library Fee", value: "₦2.1M", pct: 88, color: "var(--color-green)" },
  { label: "Other Charges", value: "₦3.1M", pct: 65, color: "var(--color-orange)" },
];

export const COLLECTION_BY_CLASS = {
  labels: ["SS 3", "SS 2", "SS 1", "JSS 3", "JSS 2", "JSS 1"],
  data: [92, 87, 94, 78, 83, 89],
};

export const REVENUE_TREND = {
  labels: ["Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar"],
  data: [4.2, 5.8, 3.1, 2.2, 8.4, 6.1, 4.8],
};

export const PAYMENT_METHODS = {
  labels: ["Bank Transfer", "Mobile App", "Cash", "POS"],
  data: [45, 28, 18, 9],
  colors: ["#2563EB", "#10B981", "#F59E0B", "#8B5CF6"],
};
