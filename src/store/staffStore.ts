import { create } from 'zustand';
import { StaffAnalyticsResponse, Staffs, PaginationMeta, Role } from '@/types/definitions';
import { defaultPaginationMeta } from '@/components/ui/table';
import { getMethod } from '@/app/api/apiClient';

interface StaffState {
  schoolStaffAnalytics: StaffAnalyticsResponse | null;
  schoolStaffDetails: Staffs[];
  groupStaffDetails: Staffs[];
  groupStaffAnalytics: StaffAnalyticsResponse | null;
  paginationMeta: PaginationMeta | null;
  staffLoading: boolean;
  analyticsLoading: boolean;
  fetchAllSchoolStaff: (
    role: Role,
    schoolId: string,
    query: { page: number; limit: number; search?: string | null },
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
    query: { page: number | null; limit: number | null; search?: string | null },
    options?: { onError?: (msg: string) => void },
  ) => Promise<void>;
}

export const useStaffStore = create<StaffState>((set) => ({
  schoolStaffAnalytics: null,
  schoolStaffDetails: [],
  groupStaffDetails: [],
  groupStaffAnalytics: null,
  paginationMeta: defaultPaginationMeta,
  staffLoading: true,
  analyticsLoading: true,

  fetchAllSchoolStaff: async (role, schoolId, query, options) => {
    const permission = ['GROUPSCHOOLADMIN', 'SCHOOLADMIN', 'SUBSCHOOLADMIN', 'SCHOOLSTAFF'];
    if (!permission.includes(role as string)) return;
    set({ staffLoading: true });
    try {
      const url = query.search
        ? `/api/single-school/${encodeURIComponent(schoolId)}/all-staffs?page=${query.page}&limit=${query.limit}&search=${query.search}`
        : `/api/single-school/${encodeURIComponent(schoolId)}/all-staffs?page=${query.page}&limit=${query.limit}`;
      const response = await getMethod(url);
      if (response.error === 'Unauthorised') {
        return;
      }
      if (!response.success) throw new Error('Failed to fetch data');

      const data = Array.isArray(response?.data) ? response.data : (response?.data ?? response);
      const staffList = Array.isArray(data) ? (data as Staffs[]) : [];
      set({ schoolStaffDetails: staffList, paginationMeta: response?.meta, staffLoading: false });
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
    set({ analyticsLoading: true });
    try {
      const url = `/api/single-school/${encodeURIComponent(schoolId)}/staff-analytics`;
      const response = await getMethod(url);
      if (response.error === 'Unauthorised') {
        return;
      }
      if (!response.success) throw new Error('Failed to fetch data');

      set({ schoolStaffAnalytics: response, analyticsLoading: false });
    } catch (err: any) {
      set({ analyticsLoading: false });
      const errorMsg = err.message || 'An error occured';
      if (options?.onError) {
        options.onError(errorMsg);
      }
    }
  },

  fetchAllGroupSchoolStaff: async (role, groupId, query, options) => {
    if (role !== 'GROUPSCHOOLADMIN') return;
    set({ staffLoading: true });
    try {
      const url = query.search
        ? `/api/group-school/${encodeURIComponent(groupId)}/all-staffs?page=${query.page}&limit=${query.limit}&search=${query.search}`
        : `/api/group-school/${encodeURIComponent(groupId)}/all-staffs?page=${query.page}&limit=${query.limit}`;

      const response = await getMethod(url);
      if (!response.success) throw new Error('Failed to fetch data');

      const data = Array.isArray(response?.data) ? response.data : (response?.data ?? response);
      const staffList = Array.isArray(data) ? (data as Staffs[]) : [];
      set({ groupStaffDetails: staffList, paginationMeta: response?.meta, staffLoading: false });
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
    set({ analyticsLoading: true });
    try {
      const url = `/api/group-school/${encodeURIComponent(groupId)}/group-staff-analytics`;
      const response = await getMethod(url);
      if (response.error === 'Unauthorised') {
        return;
      }
      if (!response.success) throw new Error('Failed to fetch data');

      set({ groupStaffAnalytics: response, analyticsLoading: false });
    } catch (err: any) {
      set({ analyticsLoading: false });
      const errorMsg = err.message || 'An error occured';
      if (options?.onError) {
        options.onError(errorMsg);
      }
    }
  },
}));
