interface SchoolFormData {
  schoolName: string;
  email: string;
  setup: string;
  type: string;
  address: string;
  country: string;
  state: string;
  phoneNumber: string;
  isApproved?: boolean;
  status?: string;
  termsConditions: boolean;
}

interface GroupFormData {
  groupName: string | null;
  status?: string | null;
}

interface AdminFormData {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  country: string;
  state: string;
  address: string;
  gender: string;
  phoneNumber: string;
  isVerified?: boolean;
  status?: string;
  role?: string;
}

export interface SignupFormData {
  schoolData: SchoolFormData;
  groupData: GroupFormData;
  adminData: AdminFormData;
}

export interface ResetPasswordFormData {
  token: string;
  newPassword: string;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface ForgotPasswordFormData {
  email: string;
}

type SchoolSetup = 'SINGLE' | 'GROUP' | 'DANIRA';

type Gender = 'MALE' | 'FEMALE';

export type Role =
  | 'SUPERADMIN'
  | 'DANIRAADMIN'
  | 'SCHOOLADMIN'
  | 'GROUPSCHOOLADMIN'
  | 'SUBSCHOOLADMIN'
  | 'SCHOOLSTAFF'
  | 'STUDENT'
  | 'GUARDIAN';

type UserCondition =
  | 'BLOCKED'
  | 'DELETED'
  | 'ACTIVE'
  | 'DEACTIVATED'
  | 'SUSPENDED'
  | 'EXPELLED'
  | 'GRADUATED'
  | 'MUTUALEXIT'
  | 'SACKED'
  | 'LEAVE'
  | 'PENDING'
  | 'TRANSFERED'
  | StaffStatus;

type Accomodation = 'ONCAMPUS' | 'OFFCAMPUS' | 'STAFFQUARTERS';

type StaffStatus = 'PERTIME' | 'FULLTIME' | 'VISITING';

export type Admins = {
  id: string;
  userId: string;
  type: SchoolSetup | null;
  schoolIds: string[];
  groupId: string | null;
};

export interface LoggedInUserPayload<
  TUser = Users,
  TSchool = Schools,
  TGroup = SchoolGroups,
> extends Admins {
  users: TUser;
  schools: TSchool[];
  group: TGroup;
}

export interface Departments {
  id: string;
  name: string;
  code: string | null;
  description: string | null;
  status: 'ACTIVE' | 'INACTIVE';
  schoolId: string;
  school: Schools;
  headId: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Staffs {
  id: string;
  userId: string;
  position: string;
  image: string | null;
  accomodation: string | null;
  employmentStatus: string;
  schoolId: string;
  departmentId: string;
  department: Departments;
  staffId: string;
  users: Users;
  subjects: Subjects[];
  lessons: {
    lessonCount: number;
    subjectName: string;
  };
}

export interface Users {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  designation: string | null;
  phoneNumber: string;
  country: string;
  state: string;
  ratings: string;
  address: string;
  isVerified: boolean;
  gender: Gender;
  role: Role;
  status: UserCondition;
  createdAt: Date;
  updatedAt: Date;
}

export type Schools = {
  id: string;
  email: string;
  schoolName: string;
  type: SchoolType;
  setup: SchoolSetup;
  address: string;
  phoneNumber: string;
  country: string;
  state: string;
  createdBy: string | null;
  approvedBy: string | null;
  isApproved: boolean;
  termsConditions: boolean;
  status: SchoolStatus;
  createdAt: Date;
  updatedAt: Date;
  groupId: string | null;
};

export interface Subjects {
  id: string;
  name: string;
  description: string;
  category: string;
  code: string;
  subjectTeacher: string;
  averageScore: number;
  createdAt: string;
  updatedAt: string;
  status: string;
  examId: string | null;
  testId: string | null;
  reportCardId: string | null;
  departmentId: string;
  studentClassCount: { classes: number; students: number };
  department: Departments;
}

export type Students = {
  id: string;
  studentId: string;
  userId: string;
  image: string | null;
  accomodation: Accomodation | null;
  classId: string;
  fees: Fees[];
  attendances: Attendance[] | number;
  guardianId: string;
  schoolId: string | null;
  gradeYearId: string | null;
  examId: string | null;
  testId: string | null;
  assignmentId: string | null;
  subjectId: string | null;
  departmentId: string | null;
  position: string;
  users: Users;
  classInfo: Classes;
  department: Departments;
  subjects: Subjects[];
};

export type Timetables = {
  id: string;
  name: string;
  status: Duration;
  schoolId: string;
  periods: TimetablePeriods[];
  totalLessons: number;
  totalPeriods: number;
  classId: string | null;
  gradeYearId: string | null;
  termId: string | null;
  classInfo: Classes;
  gradeYear: GradeYears;
  term: Terms;
  lessons: Lessons;
};

export type TimetablePeriods = {
  id: string;
  name: string;
  day: Day;
  startTime: string;
  endTime: string;
  periodType: PeriodType;
  timetableId: string;
  timetable: Timetables;
  lessonId: string;
  lesson: Lessons;
  createdAt: string;
  updatedAt: string;
};
export interface Classes {
  id: string;
  name: string;
  type: ClassType;
  status: ClassCondition;
  description: string;
  subjectCount: number;
  population: number;
  compulsoryFeesAmount: {
    amount: number;
    currency: string;
  };
  supervisorId: string;
  supervisor: Staffs;
  lessons: Lessons[];
  students: Students[];
  events: Events[];
  announcements: Announcements[];
  fees: Fees[];
  gradeYearId: string;
  gradeYear: GradeYears;
  department: Departments;
}

export interface Lessons {
  id: string;
  name: string;
  description: string;
  day: Day;
  status: Duration;
  startTime: string;
  endTime: string;
  attendances: Attendance[];
  subject: Subjects;
  subjectId: string;
  classInfo: Classes;
  classId: string;
  staff: Staffs;
  staffId: string;
  assignmentId: string;
  assignment: Assignments;
}

export interface Assignments {
  id: string;
  title: string;
  startTime: string;
  dueDate: string;
  status: Duration;
  lessons: Lessons[];
  students: Students[];
}

export interface Attendance {
  id: string;
  date: string;
  status: AttendanceStatus;
  attendance: AttendanceStatus;
  studentId: string;
  student: Students;
  lessonId: string;
  lesson: Lessons;
  staff: Staffs;
  clockIn: string;
  clockOut: string;
}

export interface Fees {
  id: string;
  name: string;
  description: string;
  receipt: string;
  amount: number;
  currency: Currency;
  paid: number;
  outstanding: number;
  category: FeeCategory;
  status: FeeStatus;
  studentId: string;
  student: Students;
  schoolId: string;
  school: Schools;
  classId: string;
  classInfo: Classes;
  feeStructureId: string;
  feeStructure: FeeStructures;
}

export interface FeeStructures {
  id: string;
  name: string;
  description: string;
  category: FeeCategory;
  amount: number;
  classType: ClassType;
  schoolId: string;
  school: Schools;
  fees: Fees[];
}

export interface FeeInvoice {
  id: string;
  invoiceNumber: string;
  totalAmount: number;
  totalPaid: number;
  totalOutstanding: number;
  currency: Currency;
  status: FeeStatus;
  notes: string;
  studentId: string;
  student: Students;
  schoolId: string;
  school: Schools;
  classId: string;
  classInfo: Classes;
  termId: string;
  term: Terms;
  fees: Fees[];
  createdAt: string;
  updatedAt: string;
}

export interface Events {
  id: string;
  title: string;
  description: string;
  status: Duration;
  date: string;
  duration: string;
  classInfo: Classes;
  classId: string;
}

export interface Announcements {
  id: string;
  title: string;
  description: string;
  status: AnnouncementStatus;
  date: string;
  classInfo: Classes;
  classId: string;
}

export interface Notifications {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  priority: NotificationPriority;
  schoolId: string;
  school: Schools;
  entityType: NotificationEntityType;
  entityId: string;
  actionUrl: string;
  createdAt: string;
  icon: string;
  bgColor: string;
  iconColor: string;
  recipients: NotificationRecipients[];
}

export interface NotificationRecipients {
  id: string;
  notificationId: string;
  notification: Notifications;
  userId: string;
  user: Users;
  isRead: boolean;
  readAt: string;
  createdAt: string;
}

export interface GradeYears {
  id: string;
  level: string;
  start: string;
  end: string;
  students: Students[];
  classes: Classes[];
  terms: Terms[];
}

export interface Terms {
  id: string;
  name: string;
  start: string;
  end: string;
  status: Duration;
  type: TermType;
  gradeYearId: string;
  gradeYear: GradeYears;
}
export interface Dataset {
  label: string;
  data: number[];
  backgroundColor: string;
  borderColor: string;
  borderWidth: number;
  borderRadius?: number;
}

export interface BarChart {
  labels: string[];
  datasets: Dataset[];
}

export interface TopTeacherWorkloadItem {
  staffId: string;
  firstName: string;
  lastName: string;
  position: string;
  schoolId: string;
  studentCount: number;
}

export interface BarChart {
  chart: BarChart;
  raw: TopTeacherWorkloadItem[];
}

export interface StaffAnalyticsResponse {
  totalStaffs: number;
  activeStaffs: number;
  staffsOnLeave: number;
  averageRating: number;
  topTeachersByWorkload: BarChart;
}

export interface FeeAnalyticsResponse {
  collectionRate: number;
  currency: string;
  debtors: number;
  totalCollected: number;
  totalExpected: number;
  fullyPaidStudents: number;
  totalOutstanding: number;
  averageRating: number;
  feeTypeChart: BarChart;
  monthlyChart: BarChart;
}

export interface NotificationAnalyticsResponse {
  unreadCount: number;
  avgOpenRateLast30Days: number;
  last30DaysTotal: number;
  totalReach: number;
}

export interface StudentAnalyticsResponse {
  totalStudents: number;
  activeStudents: number;
  newIntakes: number;
  outstandingFees: number;
  studentsByDepartment: BarChart;
  studentsByGender: BarChart;
}

export interface ClassAnalyticsResponse {
  averageAttendance: number;
  averageClassSize: number;
  averagePerformance: number;
  totalClasses: number;
  topClassesByPopulation: BarChart;
}

export interface SubjectAnalyticsResponse {
  coreSubjects: number;
  electiveSubjects: number;
  totalSubjects: number;
  mixedSubjects: number;
  subjectByDepartmentChart: BarChart;
  subjectByStudentChart: BarChart;
}

export interface AttendanceAnalyticsResponse {
  absentToday: number;
  attendanceRate: number;
  lateToday: number;
  presentToday: number;
  thirtyDayAttendanceRate: number;
  thirtyDaysTrend: BarChart;
  attendanceByDepartment: BarChart;
}

export interface TimetableAnalyticsResponse {
  totalLessons: number;
  totalPeriod: number;
}

export interface PaginationMeta {
  page: number | null;
  limit: number | null;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface StaffListResponse {
  data: Staffs[];
  meta: PaginationMeta;
  timestamp: string;
  success: boolean;
  message: string;
}

export interface StudentListResponse {
  data: Students[];
  meta: PaginationMeta;
  timestamp: string;
  success: boolean;
  message: string;
}

export interface SchoolWithInclude {
  schools: Schools & { students: Students; staffs: Staffs };
}
export interface GroupSchools {
  schools: Schools & { students: Students; staffs: Staffs };
}

export type SchoolGroups = {
  id: string;
  groupName: string;
  status: SchoolStatus;
  createdAt: Date;
  updatedAt: Date;
};

export type PeriodType =
  | 'TEACHING'
  | 'LECTURE'
  | 'STUDY'
  | 'BREAK'
  | 'BREAKFAST'
  | 'LUNCH'
  | 'DINNER'
  | 'ASSEMBLY'
  | 'RELIGIOUS'
  | 'CoCURRICULAR'
  | 'TEST'
  | 'EXAM';

export type SchoolType = 'PRIMARY' | 'SECONDARY' | 'TERTIARY';

export type FeeStatus = 'PARTIAL' | 'PAID' | 'UNPAID';

export type ClassType = 'PRIMARY' | 'SECONDARY' | 'TERTIARY';

export type FeeCategory = 'COMPULSORY' | 'ABSENT';

export type AttendanceStatus = 'PRESENT' | 'ABSENT' | 'LATE';

export type TermType = 'FIRSTTERM' | 'SECONDTERM' | 'THIRDTERM';

export type Duration = 'UPCOMING' | 'STARTED' | 'ONGOING' | 'ENDED';

export type AnnouncementStatus = 'PUBLISHED' | 'EXPIRED' | 'PENDING';

export type ClassCondition = 'ACTIVE' | 'DELETED' | 'CLOSED' | 'SUSPENDED';

export type SchoolStatus = 'ACTIVE' | 'BLOCKED' | 'PENDING' | 'APPROVED' | 'REJECTED';

export type Currency = 'NGN' | 'USD' | 'KES' | 'GBP' | 'GHS' | 'EUR' | 'ZAR' | 'CAD';

export type NotificationType =
  | 'ANNOUNCEMENT'
  | 'FEE_REMINDER'
  | 'ATTENDANCE_ALERT'
  | 'EXAM_SCHEDULED'
  | 'TIMETABLE_CHANGE'
  | 'REPORT_CARD_READY'
  | 'GENERAL';

export type NotificationPriority = 'LOW' | 'NORMAL' | 'HIGH' | 'URGENT';

export type NotificationEntityType =
  | 'ANNOUNCEMENT'
  | 'FEE'
  | 'EXAM'
  | 'TEST'
  | 'ASSIGNMENT'
  | 'TIMETABLE'
  | 'EVENT'
  | 'REPORT_CARD';

export type Day =
  | 'MONDAY'
  | 'TUESDAY'
  | 'WEDNESDAY'
  | 'THURSDAY'
  | 'FRIDAY'
  | 'SATURDAY'
  | 'SUNDAY';

export type RelationKeys =
  | 'admins'
  | 'students'
  | 'staffs'
  | 'guardians'
  | 'users'
  | 'schools'
  | 'schoolGroups';

export interface AdminUser {
  admins: Admins & {
    users: Users;
  };
}

export interface StaffUser {
  staffs: Staffs & {
    users: Users;
  };
}
export type LoggedInUser = AdminUser | StaffUser;

export type FetchPayload =
  | SignupFormData
  | ResetPasswordFormData
  | LoginFormData
  | ForgotPasswordFormData;
