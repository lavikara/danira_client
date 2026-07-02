export interface NotificationItem {
  icon: string;
  bg: string;
  iconColor: string;
  text: string;
  time: string;
  unread: boolean;
}

export const ALL_NOTIFICATIONS: NotificationItem[] = [
  { icon: "bi-person-plus-fill", bg: "var(--color-primary-50)", iconColor: "var(--color-primary)", text: "<strong>New student</strong> Amara Okafor registered in SS 3A", time: "2 min ago", unread: true },
  { icon: "bi-coin", bg: "var(--color-green-bg)", iconColor: "var(--color-green)", text: "<strong>Payment</strong> ₦85,000 from Chidi Eze", time: "14 min ago", unread: true },
  { icon: "bi-exclamation-circle-fill", bg: "var(--color-red-bg)", iconColor: "var(--color-red)", text: "<strong>Alert</strong> JSS 2B attendance below 80%", time: "1 hr ago", unread: true },
  { icon: "bi-calendar-event", bg: "var(--color-orange-bg)", iconColor: "var(--color-orange)", text: "<strong>Exam</strong> Maths SS3 on May 20", time: "3 hrs ago", unread: false },
  { icon: "bi-star-fill", bg: "var(--color-purple-bg)", iconColor: "var(--color-purple)", text: "<strong>Results</strong> Second term grades published", time: "Yesterday", unread: false },
];

export interface Announcement {
  title: string;
  to: string;
  date: string;
  delivered: string;
  openRate: string;
  status: "Delivered";
}

export const ANNOUNCEMENTS: Announcement[] = [
  { title: "Term 2 Exam Schedule Released", to: "All Students", date: "May 13", delivered: "1,248", openRate: "84%", status: "Delivered" },
  { title: "Parent-Teacher Meeting", to: "All Parents", date: "May 10", delivered: "986", openRate: "71%", status: "Delivered" },
  { title: "Sports Day Reminder", to: "Everyone", date: "May 8", delivered: "2,318", openRate: "79%", status: "Delivered" },
  { title: "Fee Payment Deadline", to: "Parents", date: "May 5", delivered: "986", openRate: "88%", status: "Delivered" },
];

export const DELIVERY_STATS = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May"],
  delivered: [82, 85, 79, 88, 84],
  opened: [65, 70, 62, 74, 71],
};
