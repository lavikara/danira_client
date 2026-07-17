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

export interface Departments {
  id: string;
  name: string;
  code: string | null;
  description: string | null;
  status: 'ACTIVE' | 'INACTIVE';
  schoolId: string;
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
  users: Users;
  subjects: Subjects[];
  lessonCount?: number;
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
  code: string;
  createdAt: string;
  updatedAt: string;
  status: string;
  examId: string | null;
  testId: string | null;
  reportCardId: string | null;
  departmentId: string;
}

export type Students = {
  id: string;
  userId: string;
  image: string | null;
  accomodation: Accomodation | null;
  classId: string;
  guardianId: string;
  schoolId: string | null;
  gradeYearId: string | null;
  examId: string | null;
  testId: string | null;
  assignmentId: string | null;
  subjectId: string | null;
  departmentId: string | null;
};

export interface Dataset {
  label: string;
  data: number[];
  backgroundColor: string;
  borderColor: string;
  borderWidth: number;
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

export interface TopTeachersByWorkload {
  chart: BarChart;
  raw: TopTeacherWorkloadItem[];
}

export interface StaffAnalyticsResponse {
  totalStaffs: number;
  activeStaffs: number;
  staffsOnLeave: number;
  averageRating: number;
  topTeachersByWorkload: TopTeachersByWorkload;
}

export interface PaginationMeta {
  page: number;
  limit: number;
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

type SchoolType = 'PRIMARY' | 'SECONDARY' | 'TERTIARY';

type SchoolStatus = 'ACTIVE' | 'BLOCKED' | 'PENDING' | 'APPROVED' | 'REJECTED';

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
