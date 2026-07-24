import { create } from 'zustand';
import { ClassAnalyticsResponse, PaginationMeta, Role, Classes } from '@/types/definitions';
import { defaultPaginationMeta } from '@/components/ui/table';
import { getMethod } from '@/app/api/apiClient';

interface ClassState {
  schoolClassAnalytics: ClassAnalyticsResponse | null;
  schoolClassDetails: Classes[];
  groupClassDetails: Classes[];
  groupClassAnalytics: ClassAnalyticsResponse | null;
  paginationMeta: PaginationMeta | null;
  classLoading: boolean;
  classAnalyticsLoading: boolean;
  fetchAllSchoolClass: (
    role: Role,
    schoolId: string,
    query: { page: number; limit: number; search?: string | null },
    options?: { onError?: (msg: string) => void },
  ) => Promise<void>;
  fetchSchoolClassAnalytics: (
    role: Role,
    schoolId: string,
    options?: { onError?: (msg: string) => void },
  ) => Promise<void>;
  fetchGroupClassAnalytics: (
    role: Role,
    groupId: string,
    options?: { onError?: (msg: string) => void },
  ) => Promise<void>;
  fetchAllGroupSchoolClass: (
    role: Role,
    groupId: string,
    query: { page: number | null; limit: number | null; search?: string | null },
    options?: { onError?: (msg: string) => void },
  ) => Promise<void>;
}

export const useClassStore = create<ClassState>((set) => ({
  schoolClassAnalytics: null,
  schoolClassDetails: [],
  groupClassDetails: [],
  groupClassAnalytics: null,
  paginationMeta: defaultPaginationMeta,
  classLoading: true,
  classAnalyticsLoading: true,

  fetchAllSchoolClass: async (role, schoolId, query, options) => {
    set({ classLoading: true });
    const permission = ['GROUPSCHOOLADMIN', 'SCHOOLADMIN', 'SUBSCHOOLADMIN', 'SCHOOLSTAFF'];
    if (!permission.includes(role as string)) return;
    try {
      const url = query.search
        ? `/api/single-school/${encodeURIComponent(schoolId)}/all-classes?page=${query.page}&limit=${query.limit}&search=${query.search}`
        : `/api/single-school/${encodeURIComponent(schoolId)}/all-classes?page=${query.page}&limit=${query.limit}`;
      const response = await getMethod(url);
      if (response.error === 'Unauthorised') {
        return;
      }
      if (!response.success) throw new Error('Failed to fetch data');

      const data = Array.isArray(response?.data) ? response.data : (response?.data ?? response);
      const classList = Array.isArray(data) ? (data as Classes[]) : [];
      set({ schoolClassDetails: classList, paginationMeta: response?.meta });
      set({ classLoading: false });
    } catch (err: any) {
      set({ classLoading: false });
      const errorMsg = err.message || 'An error occured';
      if (options?.onError) {
        options.onError(errorMsg);
      }
    }
  },

  fetchSchoolClassAnalytics: async (role, schoolId, options) => {
    set({ classAnalyticsLoading: true });
    const permission = ['GROUPSCHOOLADMIN', 'SCHOOLADMIN', 'SUBSCHOOLADMIN', 'SCHOOLSTAFF'];
    if (!permission.includes(role as string)) return;
    try {
      const url = `/api/single-school/${encodeURIComponent(schoolId)}/class-analytics`;
      const response = await getMethod(url);
      if (response.error === 'Unauthorised') {
        return;
      }
      if (!response.success) throw new Error('Failed to fetch data');

      set({ schoolClassAnalytics: response, classAnalyticsLoading: false });
    } catch (err: any) {
      set({ classAnalyticsLoading: false });
      const errorMsg = err.message || 'An error occured';
      if (options?.onError) {
        options.onError(errorMsg);
      }
    }
  },

  fetchAllGroupSchoolClass: async (role, groupId, query, options) => {
    set({ classLoading: true });
    if (role !== 'GROUPSCHOOLADMIN') return;
    try {
      const url = query.search
        ? `/api/group-school/${encodeURIComponent(groupId)}/all-classes?page=${query.page}&limit=${query.limit}&search=${query.search}`
        : `/api/group-school/${encodeURIComponent(groupId)}/all-classes?page=${query.page}&limit=${query.limit}`;

      const response = await getMethod(url);
      if (!response.success) throw new Error('Failed to fetch data');

      const data = Array.isArray(response?.data) ? response.data : (response?.data ?? response);
      const classList = Array.isArray(data) ? (data as Classes[]) : [];
      set({ groupClassDetails: classList, paginationMeta: response?.meta });
      set({ classLoading: false });
    } catch (err: any) {
      set({ classLoading: false });
      const errorMsg = err.message || 'An error occured';
      if (options?.onError) {
        options.onError(errorMsg);
      }
    }
  },

  fetchGroupClassAnalytics: async (role, groupId, options) => {
    set({ classAnalyticsLoading: true });
    const permission = ['GROUPSCHOOLADMIN'];
    if (!permission.includes(role as string)) return;
    try {
      const url = `/api/group-school/${encodeURIComponent(groupId)}/group-class-analytics`;
      const response = await getMethod(url);
      if (response.error === 'Unauthorised') {
        return;
      }
      if (!response.success) throw new Error('Failed to fetch data');

      set({ groupClassAnalytics: response, classAnalyticsLoading: false });
    } catch (err: any) {
      set({ classAnalyticsLoading: false });
      const errorMsg = err.message || 'An error occured';
      if (options?.onError) {
        options.onError(errorMsg);
      }
    }
  },
}));
