export interface LibraryBook {
  title: string;
  author: string;
  category: string;
  copies: number;
  available: number;
}

export const LIBRARY_BOOKS: LibraryBook[] = [
  { title: "New General Mathematics", author: "MF Macrae", category: "Mathematics", copies: 24, available: 18 },
  { title: "Comprehensive English", author: "AS Hornby", category: "English", copies: 30, available: 22 },
  { title: "Modern Physics", author: "Paul Tipler", category: "Physics", copies: 20, available: 12 },
  { title: "Biology for Senior Sec.", author: "T. Ojukwu", category: "Biology", copies: 28, available: 19 },
  { title: "Senior Secondary Chemistry", author: "L. Jones", category: "Chemistry", copies: 22, available: 14 },
  { title: "Economics: Principles", author: "N.G. Mankiw", category: "Economics", copies: 18, available: 10 },
];

export const OVERDUE_BOOKS = [
  { name: "Ibrahim Aliyu", book: "Modern Physics", due: "May 1", daysOverdue: 13 },
  { name: "Emeka Nwosu", book: "Mathematics Vol.2", due: "Apr 28", daysOverdue: 16 },
  { name: "Tunde Fasanya", book: "Senior Sec. Chemistry", due: "May 5", daysOverdue: 9 },
];

export interface BorrowRecord {
  name: string;
  book: string;
  borrowed: string;
  due: string;
  returned: string;
  status: "Active" | "Returned";
}

export const BORROW_RECORDS: BorrowRecord[] = [
  { name: "Amara Okafor", book: "English Literature", borrowed: "May 5", due: "May 19", returned: "—", status: "Active" },
  { name: "Fatima Bello", book: "Biology Practical", borrowed: "May 3", due: "May 17", returned: "—", status: "Active" },
  { name: "Zainab Yusuf", book: "Further Mathematics", borrowed: "Apr 28", due: "May 12", returned: "May 10", status: "Returned" },
  { name: "Ngozi Okeke", book: "Government Today", borrowed: "May 7", due: "May 21", returned: "—", status: "Active" },
];

export const BOOKS_BY_CATEGORY = {
  labels: ["Mathematics", "English", "Sciences", "Humanities", "Others"],
  data: [820, 740, 1100, 960, 660],
};
