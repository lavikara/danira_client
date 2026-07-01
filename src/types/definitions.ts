interface SchoolFormData {
  schoolName: string;
  email: string;
  setup: string;
  type: string;
  address: string;
  country: string;
  state: string;
  phoneNumber: string;
  termsConditions: boolean;
}

interface GroupFormData {
  groupName: string | undefined;
}

interface AdminFormData {
  userName: string;
  email: string;
  firstName: string;
  lastName: string;
  country: string;
  state: string;
  address: string;
  gender: string;
  phoneNumber: string;
}

export interface SignupFormData {
  schoolData: SchoolFormData;
  groupData: GroupFormData;
  adminData: AdminFormData;
}
