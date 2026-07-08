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

export interface ForgotPasswordFormData {
  email: string;
}
