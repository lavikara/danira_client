export interface HostelRoom {
  room: string;
  block: string;
  type: string;
  capacity: number;
  occupied: number;
  warden: string;
  status: "Full" | "Available";
}

export const HOSTEL_ROOMS: HostelRoom[] = [
  { room: "101", block: "Block A", type: "Dormitory", capacity: 8, occupied: 8, warden: "Mr. Ade", status: "Full" },
  { room: "102", block: "Block A", type: "Dormitory", capacity: 8, occupied: 6, warden: "Mr. Ade", status: "Available" },
  { room: "103", block: "Block A", type: "Dormitory", capacity: 8, occupied: 8, warden: "Mrs. Yemi", status: "Full" },
  { room: "201", block: "Block B", type: "Dormitory", capacity: 10, occupied: 9, warden: "Mrs. Yemi", status: "Available" },
  { room: "202", block: "Block B", type: "Private", capacity: 2, occupied: 2, warden: "Mr. Babs", status: "Full" },
  { room: "301", block: "Block C", type: "Dormitory", capacity: 8, occupied: 4, warden: "Mr. Babs", status: "Available" },
];

export const HOSTEL_FEE_STATUS = [
  { label: "Fully Paid", value: 312, pct: 81, color: "var(--color-green)" },
  { label: "Partial", value: 54, pct: 14, color: "var(--color-orange)" },
  { label: "Not Paid", value: 18, pct: 5, color: "var(--color-red)" },
];

export const HOSTEL_OCCUPANCY = {
  labels: ["Block A", "Block B", "Block C"],
  occupied: [168, 132, 84],
  vacant: [8, 18, 6],
};
