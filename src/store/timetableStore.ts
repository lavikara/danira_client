import { create } from 'zustand';
import { TimetableAnalyticsResponse, PaginationMeta, Role, Timetables } from '@/types/definitions';
import { defaultPaginationMeta } from '@/components/ui/table';
import { transformPeriods, RawPeriod } from '@/utils/parseTimetablePeriod';
import { getMethod } from '@/app/api/apiClient';
import { TransformResult } from '@/utils/parseTimetablePeriod';

interface TimetableState {
  schoolTimetableAnalytics: TimetableAnalyticsResponse | null;
  groupTimetableAnalytics: TimetableAnalyticsResponse | null;
  schoolTimetableDetails: Timetables[];
  groupTimetableDetails: Timetables[];
  timetablePeriods: TransformResult | null;
  timetableDetails: Timetables | null;
  paginationMeta: PaginationMeta | null;
  timetableLoading: boolean;
  timetableAnalyticsLoading: boolean;
  fetchAllSchoolTimetable: (
    role: Role,
    schoolId: string,
    query: { page: number; limit: number; search?: string | null },
    options?: { onError?: (msg: string) => void },
  ) => Promise<void>;
  fetchAllGroupSchoolTimetable: (
    role: Role,
    groupId: string,
    query: { page: number | null; limit: number | null; search?: string | null },
    options?: { onError?: (msg: string) => void },
  ) => Promise<void>;
  fetchSchoolTimetableAnalytics: (
    role: Role,
    schoolId: string,
    options?: { onError?: (msg: string) => void },
  ) => Promise<void>;
  fetchGroupTimetableAnalytics: (
    role: Role,
    groupId: string,
    options?: { onError?: (msg: string) => void },
  ) => Promise<void>;
  fetchTimetableById: (
    role: Role,
    schoolId: string,
    query: { timetableId: string },
    options?: { onError?: (msg: string) => void },
  ) => Promise<void>;
}

export const useTimetablesStore = create<TimetableState>((set) => ({
  schoolTimetableAnalytics: null,
  schoolTimetableDetails: [],
  groupTimetableDetails: [],
  timetableDetails: null,
  timetablePeriods: null,
  groupTimetableAnalytics: null,
  paginationMeta: defaultPaginationMeta,
  timetableLoading: true,
  timetableAnalyticsLoading: true,

  fetchTimetableById: async (role, schoolId, query, options) => {
    set({ timetableLoading: true });
    const permission = ['GROUPSCHOOLADMIN', 'SCHOOLADMIN', 'SUBSCHOOLADMIN', 'SCHOOLSTAFF'];
    if (!permission.includes(role as string)) return;
    try {
      const url = `/api/single-school/${encodeURIComponent(schoolId)}/timetable-by-id?timetableId=${encodeURIComponent(query.timetableId)}`;
      const response = await getMethod(url);
      if (response.error === 'Unauthorised') {
        return;
      }
      if (!response.success) throw new Error('Failed to fetch data');
      const periods = transformPeriods(response?.data.periods);
      set({ timetableDetails: response.data, timetablePeriods: periods, timetableLoading: false });
    } catch (err: any) {
      set({ timetableLoading: false });
      const errorMsg = err.message || 'An error occured';
      if (options?.onError) {
        options.onError(errorMsg);
      }
    }
  },

  fetchAllSchoolTimetable: async (role, schoolId, query, options) => {
    set({ timetableLoading: true });
    const permission = ['GROUPSCHOOLADMIN', 'SCHOOLADMIN', 'SUBSCHOOLADMIN', 'SCHOOLSTAFF'];
    if (!permission.includes(role as string)) return;
    try {
      const url = query.search
        ? `/api/single-school/${encodeURIComponent(schoolId)}/all-timetables?page=${query.page}&limit=${query.limit}&search=${query.search}`
        : `/api/single-school/${encodeURIComponent(schoolId)}/all-timetables?page=${query.page}&limit=${query.limit}`;
      const response = await getMethod(url);
      if (response.error === 'Unauthorised') {
        return;
      }
      if (!response.success) throw new Error('Failed to fetch data');

      const data = Array.isArray(response?.data) ? response.data : (response?.data ?? response);
      const subjectList = Array.isArray(data) ? (data as Timetables[]) : [];
      set({ schoolTimetableDetails: subjectList, paginationMeta: response?.meta });
      set({ timetableLoading: false });
    } catch (err: any) {
      set({ timetableLoading: false });
      const errorMsg = err.message || 'An error occured';
      if (options?.onError) {
        options.onError(errorMsg);
      }
    }
  },

  fetchAllGroupSchoolTimetable: async (role, groupId, query, options) => {
    set({ timetableLoading: true });
    if (role !== 'GROUPSCHOOLADMIN') return;
    try {
      const url = query.search
        ? `/api/group-school/${encodeURIComponent(groupId)}/all-timetables?page=${query.page}&limit=${query.limit}&search=${query.search}`
        : `/api/group-school/${encodeURIComponent(groupId)}/all-timetables?page=${query.page}&limit=${query.limit}`;

      const response = await getMethod(url);
      if (!response.success) throw new Error('Failed to fetch data');

      const data = Array.isArray(response?.data) ? response.data : (response?.data ?? response);
      const subjectList = Array.isArray(data) ? (data as Timetables[]) : [];
      set({ groupTimetableDetails: subjectList, paginationMeta: response?.meta });
      set({ timetableLoading: false });
    } catch (err: any) {
      set({ timetableLoading: false });
      const errorMsg = err.message || 'An error occured';
      if (options?.onError) {
        options.onError(errorMsg);
      }
    }
  },

  fetchSchoolTimetableAnalytics: async (role, schoolId, options) => {
    set({ timetableAnalyticsLoading: true });
    const permission = ['GROUPSCHOOLADMIN', 'SCHOOLADMIN', 'SUBSCHOOLADMIN', 'SCHOOLSTAFF'];
    if (!permission.includes(role as string)) return;
    try {
      const url = `/api/single-school/${encodeURIComponent(schoolId)}/timetable-analytics`;
      const response = await getMethod(url);
      if (response.error === 'Unauthorised') {
        return;
      }
      if (!response.success) throw new Error('Failed to fetch data');
      set({ schoolTimetableAnalytics: response, timetableAnalyticsLoading: false });
    } catch (err: any) {
      set({ timetableAnalyticsLoading: false });
      const errorMsg = err.message || 'An error occured';
      if (options?.onError) {
        options.onError(errorMsg);
      }
    }
  },

  fetchGroupTimetableAnalytics: async (role, groupId, options) => {
    set({ timetableAnalyticsLoading: true });
    const permission = ['GROUPSCHOOLADMIN'];
    if (!permission.includes(role as string)) return;
    try {
      const url = `/api/group-school/${encodeURIComponent(groupId)}/group-timetable-analytics`;
      const response = await getMethod(url);
      if (response.error === 'Unauthorised') {
        return;
      }
      if (!response.success) throw new Error('Failed to fetch data');

      set({ groupTimetableAnalytics: response, timetableAnalyticsLoading: false });
    } catch (err: any) {
      set({ timetableAnalyticsLoading: false });
      const errorMsg = err.message || 'An error occured';
      if (options?.onError) {
        options.onError(errorMsg);
      }
    }
  },
}));
