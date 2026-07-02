export interface BusRoute {
  route: string;
  driver: string;
  busNo: string;
  students: number;
  distance: string;
  status: "Active" | "Maintenance";
}

export const BUS_ROUTES: BusRoute[] = [
  { route: "Route A — Lekki", driver: "Musa Abubakar", busNo: "GFA-001", students: 52, distance: "22km", status: "Active" },
  { route: "Route B — Ajah", driver: "Emeka Okonkwo", busNo: "GFA-002", students: 48, distance: "28km", status: "Active" },
  { route: "Route C — VGC", driver: "Tunde Olatunji", busNo: "GFA-003", students: 60, distance: "18km", status: "Active" },
  { route: "Route D — Ikeja", driver: "Yusuf Ibrahim", busNo: "GFA-004", students: 44, distance: "35km", status: "Active" },
  { route: "Route E — Surulere", driver: "Dele Adeyemi", busNo: "GFA-005", students: 56, distance: "42km", status: "Active" },
  { route: "Route F — Maryland", driver: "Biodun Ojo", busNo: "GFA-006", students: 38, distance: "31km", status: "Maintenance" },
];

export interface BusAssignment {
  name: string;
  cls: string;
  route: string;
  busNo: string;
  pickup: string;
  fee: "Paid" | "Unpaid";
}

export const BUS_ASSIGNMENTS: BusAssignment[] = [
  { name: "Amara Okafor", cls: "SS 3A", route: "Route C — VGC", busNo: "GFA-003", pickup: "Gate 3", fee: "Paid" },
  { name: "Fatima Bello", cls: "SS 2A", route: "Route A — Lekki", busNo: "GFA-001", pickup: "Junction", fee: "Paid" },
  { name: "Emeka Nwosu", cls: "JSS 3A", route: "Route D — Ikeja", busNo: "GFA-004", pickup: "Market", fee: "Unpaid" },
  { name: "Zainab Yusuf", cls: "SS 1C", route: "Route B — Ajah", busNo: "GFA-002", pickup: "Shell Gate", fee: "Paid" },
];

export const STUDENTS_PER_ROUTE = {
  labels: ["Rt A", "Rt B", "Rt C", "Rt D", "Rt E", "Rt F"],
  data: [52, 48, 60, 44, 56, 38],
};
