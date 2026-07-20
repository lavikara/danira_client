import { create } from 'zustand';
import { StudentAnalyticsResponse, Students, PaginationMeta, Role } from '@/types/definitions';
import { defaultPaginationMeta } from '@/components/ui/table';
import { getMethod } from '@/app/api/apiClient';

interface StudentState {
  schoolStudentAnalytics: StudentAnalyticsResponse | null;
  schoolStudentDetails: Students[];
  groupStudentDetails: Students[];
  groupStudentAnalytics: StudentAnalyticsResponse | null;
  paginationMeta: PaginationMeta | null;
  studentLoading: boolean;
  studentAnalyticsLoading: boolean;
  fetchAllSchoolStudent: (
    role: Role,
    schoolId: string,
    query: { page: number; limit: number; search?: string | null },
    options?: { onError?: (msg: string) => void },
  ) => Promise<void>;
  fetchSchoolStudentAnalytics: (
    role: Role,
    schoolId: string,
    options?: { onError?: (msg: string) => void },
  ) => Promise<void>;
  fetchGroupStudentAnalytics: (
    role: Role,
    groupId: string,
    options?: { onError?: (msg: string) => void },
  ) => Promise<void>;
  fetchAllGroupSchoolStudent: (
    role: Role,
    groupId: string,
    query: { page: number | null; limit: number | null; search?: string | null },
    options?: { onError?: (msg: string) => void },
  ) => Promise<void>;
}

export const useStudentStore = create<StudentState>((set) => ({
  schoolStudentAnalytics: null,
  schoolStudentDetails: [],
  groupStudentDetails: [],
  groupStudentAnalytics: null,
  paginationMeta: defaultPaginationMeta,
  studentLoading: true,
  studentAnalyticsLoading: true,

  fetchAllSchoolStudent: async (role, schoolId, query, options) => {
    set({ studentLoading: true });
    const permission = ['GROUPSCHOOLADMIN', 'SCHOOLADMIN', 'SUBSCHOOLADMIN', 'SCHOOLSTAFF'];
    if (!permission.includes(role as string)) return;
    try {
      const url = query.search
        ? `/api/single-school/${encodeURIComponent(schoolId)}/all-students?page=${query.page}&limit=${query.limit}&search=${query.search}`
        : `/api/single-school/${encodeURIComponent(schoolId)}/all-students?page=${query.page}&limit=${query.limit}`;
      const response = await getMethod(url);
      if (response.error === 'Unauthorised') {
        return;
      }
      if (!response.success) throw new Error('Failed to fetch data');

      const data = Array.isArray(response?.data) ? response.data : (response?.data ?? response);
      const studentList = Array.isArray(data) ? (data as Students[]) : [];
      set({ schoolStudentDetails: studentList, paginationMeta: response?.meta });
      set({ studentLoading: false });
    } catch (err: any) {
      set({ studentLoading: false });
      const errorMsg = err.message || 'An error occured';
      if (options?.onError) {
        options.onError(errorMsg);
      }
    }
  },

  fetchSchoolStudentAnalytics: async (role, schoolId, options) => {
    set({ studentAnalyticsLoading: true });
    const permission = ['GROUPSCHOOLADMIN', 'SCHOOLADMIN', 'SUBSCHOOLADMIN', 'SCHOOLSTAFF'];
    if (!permission.includes(role as string)) return;
    try {
      const url = `/api/single-school/${encodeURIComponent(schoolId)}/student-analytics`;
      const response = await getMethod(url);
      if (response.error === 'Unauthorised') {
        return;
      }
      if (!response.success) throw new Error('Failed to fetch data');

      set({ schoolStudentAnalytics: response, studentAnalyticsLoading: false });
    } catch (err: any) {
      set({ studentAnalyticsLoading: false });
      const errorMsg = err.message || 'An error occured';
      if (options?.onError) {
        options.onError(errorMsg);
      }
    }
  },

  fetchAllGroupSchoolStudent: async (role, groupId, query, options) => {
    set({ studentLoading: true });
    if (role !== 'GROUPSCHOOLADMIN') return;
    try {
      const url = query.search
        ? `/api/group-school/${encodeURIComponent(groupId)}/all-students?page=${query.page}&limit=${query.limit}&search=${query.search}`
        : `/api/group-school/${encodeURIComponent(groupId)}/all-students?page=${query.page}&limit=${query.limit}`;

      const response = await getMethod(url);
      if (!response.success) throw new Error('Failed to fetch data');

      const data = Array.isArray(response?.data) ? response.data : (response?.data ?? response);
      const staffList = Array.isArray(data) ? (data as Students[]) : [];
      set({ groupStudentDetails: staffList, paginationMeta: response?.meta });
      set({ studentLoading: false });
    } catch (err: any) {
      set({ studentLoading: false });
      const errorMsg = err.message || 'An error occured';
      if (options?.onError) {
        options.onError(errorMsg);
      }
    }
  },

  fetchGroupStudentAnalytics: async (role, groupId, options) => {
    set({ studentAnalyticsLoading: true });
    const permission = ['GROUPSCHOOLADMIN'];
    if (!permission.includes(role as string)) return;
    try {
      const url = `/api/group-school/${encodeURIComponent(groupId)}/group-student-analytics`;
      const response = await getMethod(url);
      if (response.error === 'Unauthorised') {
        return;
      }
      if (!response.success) throw new Error('Failed to fetch data');

      set({ groupStudentAnalytics: response, studentAnalyticsLoading: false });
    } catch (err: any) {
      set({ studentAnalyticsLoading: false });
      const errorMsg = err.message || 'An error occured';
      if (options?.onError) {
        options.onError(errorMsg);
      }
    }
  },
}));
