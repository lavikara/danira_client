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
  | 'TRANSFERED';

type Accomodation = 'ONCAMPUS' | 'OFFCAMPUS' | 'STAFFQUARTERS';

type StaffStatus = 'PERTIME' | 'FULLTIME' | 'VISITING';

export type Admins = {
  id: string;
  userId: string;
  type: SchoolSetup | null;
  schoolIds: string[];
  groupId: string | null;
};

export type Staffs = {
  id: string;
  userId: string;
  position: string;
  image: string | null;
  depertment: string | null;
  accomodation: Accomodation | null;
  employmentStatus: StaffStatus;
  schoolId: string | null;
};

export type Users = {
  email: string;
  id: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  designation: string | null;
  phoneNumber: string;
  country: string;
  state: string;
  address: string;
  isVerified: boolean;
  gender: Gender;
  role: Role;
  status: UserCondition;
  createdAt: Date;
  updatedAt: Date;
};

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
