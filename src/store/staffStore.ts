import { create } from 'zustand';
import { StaffAnalyticsResponse, Staffs, Role } from '@/types/definitions';
import { getMethod } from '@/app/api/apiClient';

interface StaffState {
  schoolStaffAnalytics: StaffAnalyticsResponse | null;
  schoolStaffDetails: Staffs[];
  groupStaffDetails: Staffs[];
  groupStaffAnalytics: StaffAnalyticsResponse | null;
  staffLoading: boolean;
  fetchAllSchoolStaff: (
    role: Role,
    schoolId: string,
    options?: { onError?: (msg: string) => void },
  ) => Promise<void>;
  fetchSchoolStaffAnalytics: (
    role: Role,
    schoolId: string,
    options?: { onError?: (msg: string) => void },
  ) => Promise<void>;
  fetchGroupStaffAnalytics: (
    role: Role,
    groupId: string,
    options?: { onError?: (msg: string) => void },
  ) => Promise<void>;
  fetchAllGroupSchoolStaff: (
    role: Role,
    groupId: string,
    options?: { onError?: (msg: string) => void },
  ) => Promise<void>;
}

export const useStaffStore = create<StaffState>((set) => ({
  schoolStaffAnalytics: null,
  schoolStaffDetails: [],
  groupStaffDetails: [],
  groupStaffAnalytics: null,
  staffLoading: true,

  fetchAllSchoolStaff: async (role, schoolId, options) => {
    const permission = ['GROUPSCHOOLADMIN', 'SCHOOLADMIN', 'SUBSCHOOLADMIN', 'SCHOOLSTAFF'];
    if (!permission.includes(role as string)) return;
    set({ staffLoading: true });
    try {
      const url = `/api/single-school/${encodeURIComponent(schoolId)}/all-staffs`;
      const response = await getMethod(url);
      if (response.error === 'Unauthorised') {
        return;
      }
      if (!response.success) throw new Error('Failed to fetch data');

      const { data } = response;
      set({ schoolStaffDetails: data as Staffs[] });
      setTimeout(() => {
        set({ staffLoading: false });
      }, 500);
    } catch (err: any) {
      set({ staffLoading: false });
      const errorMsg = err.message || 'An error occured';
      if (options?.onError) {
        options.onError(errorMsg);
      }
    }
  },

  fetchSchoolStaffAnalytics: async (role, schoolId, options) => {
    const permission = ['GROUPSCHOOLADMIN', 'SCHOOLADMIN', 'SUBSCHOOLADMIN', 'SCHOOLSTAFF'];
    if (!permission.includes(role as string)) return;
    set({ staffLoading: true });
    try {
      const url = `/api/single-school/${encodeURIComponent(schoolId)}/staff-analytics`;
      const response = await getMethod(url);
      if (response.error === 'Unauthorised') {
        return;
      }
      if (!response.success) throw new Error('Failed to fetch data');

      set({ schoolStaffAnalytics: response, staffLoading: false });
    } catch (err: any) {
      set({ staffLoading: false });
      const errorMsg = err.message || 'An error occured';
      if (options?.onError) {
        options.onError(errorMsg);
      }
    }
  },

  fetchAllGroupSchoolStaff: async (role, groupId, options) => {
    if (role !== 'GROUPSCHOOLADMIN') return;
    set({ staffLoading: true });
    try {
      const url = `/api/group-school/${encodeURIComponent(groupId)}/all-staffs`;
      const response = await getMethod(url);
      if (!response.success) throw new Error('Failed to fetch data');

      const { data } = response;
      set({ groupStaffDetails: data as Staffs[] });
      setTimeout(() => {
        set({ staffLoading: false });
      }, 500);
    } catch (err: any) {
      set({ staffLoading: false });
      const errorMsg = err.message || 'An error occured';
      if (options?.onError) {
        options.onError(errorMsg);
      }
    }
  },

  fetchGroupStaffAnalytics: async (role, groupId, options) => {
    const permission = ['GROUPSCHOOLADMIN', 'SCHOOLADMIN', 'SUBSCHOOLADMIN', 'SCHOOLSTAFF'];
    if (!permission.includes(role as string)) return;
    set({ staffLoading: true });
    try {
      const url = `/api/group-school/${encodeURIComponent(groupId)}/group-staff-analytics`;
      const response = await getMethod(url);
      if (response.error === 'Unauthorised') {
        return;
      }
      if (!response.success) throw new Error('Failed to fetch data');

      set({ groupStaffAnalytics: response, staffLoading: false });
    } catch (err: any) {
      set({ staffLoading: false });
      const errorMsg = err.message || 'An error occured';
      if (options?.onError) {
        options.onError(errorMsg);
      }
    }
  },
}));
