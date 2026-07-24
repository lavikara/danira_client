import { create } from 'zustand';
import { SubjectAnalyticsResponse, PaginationMeta, Role, Subjects } from '@/types/definitions';
import { defaultPaginationMeta } from '@/components/ui/table';
import { getMethod } from '@/app/api/apiClient';
import { abbrstringArr } from '@/utils/helpers';

interface SubjectState {
  schoolSubjectAnalytics: SubjectAnalyticsResponse | null;
  schoolSubjectDetails: Subjects[];
  groupSubjectDetails: Subjects[];
  groupSubjectAnalytics: SubjectAnalyticsResponse | null;
  paginationMeta: PaginationMeta | null;
  subjectLoading: boolean;
  subjectAnalyticsLoading: boolean;
  fetchAllSchoolSubject: (
    role: Role,
    schoolId: string,
    query: { page: number; limit: number; search?: string | null },
    options?: { onError?: (msg: string) => void },
  ) => Promise<void>;
  fetchSchoolSubjectAnalytics: (
    role: Role,
    schoolId: string,
    options?: { onError?: (msg: string) => void },
  ) => Promise<void>;
  fetchGroupSubjectAnalytics: (
    role: Role,
    groupId: string,
    options?: { onError?: (msg: string) => void },
  ) => Promise<void>;
  fetchAllGroupSchoolSubject: (
    role: Role,
    groupId: string,
    query: { page: number | null; limit: number | null; search?: string | null },
    options?: { onError?: (msg: string) => void },
  ) => Promise<void>;
}

export const useSubjectStore = create<SubjectState>((set) => ({
  schoolSubjectAnalytics: null,
  schoolSubjectDetails: [],
  groupSubjectDetails: [],
  groupSubjectAnalytics: null,
  paginationMeta: defaultPaginationMeta,
  subjectLoading: true,
  subjectAnalyticsLoading: true,

  fetchAllSchoolSubject: async (role, schoolId, query, options) => {
    set({ subjectLoading: true });
    const permission = ['GROUPSCHOOLADMIN', 'SCHOOLADMIN', 'SUBSCHOOLADMIN', 'SCHOOLSTAFF'];
    if (!permission.includes(role as string)) return;
    try {
      const url = query.search
        ? `/api/single-school/${encodeURIComponent(schoolId)}/all-subjects?page=${query.page}&limit=${query.limit}&search=${query.search}`
        : `/api/single-school/${encodeURIComponent(schoolId)}/all-subjects?page=${query.page}&limit=${query.limit}`;
      const response = await getMethod(url);
      if (response.error === 'Unauthorised') {
        return;
      }
      if (!response.success) throw new Error('Failed to fetch data');

      const data = Array.isArray(response?.data) ? response.data : (response?.data ?? response);
      const subjectList = Array.isArray(data) ? (data as Subjects[]) : [];
      set({ schoolSubjectDetails: subjectList, paginationMeta: response?.meta });
      set({ subjectLoading: false });
    } catch (err: any) {
      set({ subjectLoading: false });
      const errorMsg = err.message || 'An error occured';
      if (options?.onError) {
        options.onError(errorMsg);
      }
    }
  },

  fetchSchoolSubjectAnalytics: async (role, schoolId, options) => {
    set({ subjectAnalyticsLoading: true });
    const permission = ['GROUPSCHOOLADMIN', 'SCHOOLADMIN', 'SUBSCHOOLADMIN', 'SCHOOLSTAFF'];
    if (!permission.includes(role as string)) return;
    try {
      const url = `/api/single-school/${encodeURIComponent(schoolId)}/subjects-analytics`;
      const response = await getMethod(url);
      if (response.error === 'Unauthorised') {
        return;
      }
      if (!response.success) throw new Error('Failed to fetch data');
      const labels = response.subjectByStudentChart.chart.labels;
      response.subjectByStudentChart.chart.labels = abbrstringArr(labels, 6);
      set({ schoolSubjectAnalytics: response, subjectAnalyticsLoading: false });
    } catch (err: any) {
      set({ subjectAnalyticsLoading: false });
      const errorMsg = err.message || 'An error occured';
      if (options?.onError) {
        options.onError(errorMsg);
      }
    }
  },

  fetchAllGroupSchoolSubject: async (role, groupId, query, options) => {
    set({ subjectLoading: true });
    if (role !== 'GROUPSCHOOLADMIN') return;
    try {
      const url = query.search
        ? `/api/group-school/${encodeURIComponent(groupId)}/all-subjects?page=${query.page}&limit=${query.limit}&search=${query.search}`
        : `/api/group-school/${encodeURIComponent(groupId)}/all-subjects?page=${query.page}&limit=${query.limit}`;

      const response = await getMethod(url);
      if (!response.success) throw new Error('Failed to fetch data');

      const data = Array.isArray(response?.data) ? response.data : (response?.data ?? response);
      const subjectList = Array.isArray(data) ? (data as Subjects[]) : [];
      set({ groupSubjectDetails: subjectList, paginationMeta: response?.meta });
      set({ subjectLoading: false });
    } catch (err: any) {
      set({ subjectLoading: false });
      const errorMsg = err.message || 'An error occured';
      if (options?.onError) {
        options.onError(errorMsg);
      }
    }
  },

  fetchGroupSubjectAnalytics: async (role, groupId, options) => {
    set({ subjectAnalyticsLoading: true });
    const permission = ['GROUPSCHOOLADMIN'];
    if (!permission.includes(role as string)) return;
    try {
      const url = `/api/group-school/${encodeURIComponent(groupId)}/group-subjects-analytics`;
      const response = await getMethod(url);
      if (response.error === 'Unauthorised') {
        return;
      }
      if (!response.success) throw new Error('Failed to fetch data');
      const labels = response.subjectByStudentChart.chart.labels;
      response.subjectByStudentChart.chart.labels = abbrstringArr(labels, 6);

      set({ groupSubjectAnalytics: response, subjectAnalyticsLoading: false });
    } catch (err: any) {
      set({ subjectAnalyticsLoading: false });
      const errorMsg = err.message || 'An error occured';
      if (options?.onError) {
        options.onError(errorMsg);
      }
    }
  },
}));
