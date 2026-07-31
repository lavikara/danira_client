import { create } from 'zustand';
import { AttendanceAnalyticsResponse, PaginationMeta, Role, Attendance } from '@/types/definitions';
import { defaultPaginationMeta } from '@/components/ui/table';
import { getMethod } from '@/app/api/apiClient';
import { abbrStringArr } from '@/utils/helpers';

interface SubjectState {
  schoolAttendanceAnalytics: AttendanceAnalyticsResponse | null;
  schoolAttendanceDetails: Attendance[];
  groupAttendanceDetails: Attendance[];
  groupAttendanceAnalytics: AttendanceAnalyticsResponse | null;
  paginationMeta: PaginationMeta | null;
  attendanceLoading: boolean;
  attendanceAnalyticsLoading: boolean;
  fetchAllSchoolAttendance: (
    role: Role,
    schoolId: string,
    query: { page: number; limit: number; search?: string | null },
    type?: string,
    options?: { onError?: (msg: string) => void },
  ) => Promise<void>;
  fetchSchoolAttendanceAnalytics: (
    role: Role,
    schoolId: string,
    type?: string,
    options?: { onError?: (msg: string) => void },
  ) => Promise<void>;
  fetchGroupAttendanceAnalytics: (
    role: Role,
    groupId: string,
    type?: string,
    options?: { onError?: (msg: string) => void },
  ) => Promise<void>;
  fetchAllGroupSchoolAttendance: (
    role: Role,
    groupId: string,
    query: { page: number | null; limit: number | null; search?: string | null },
    type: string,
    options?: { onError?: (msg: string) => void },
  ) => Promise<void>;
}

const formatLineChart = (response: Record<string, any>) => {
  response.thirtyDaysTrend.chart.datasets[0].backgroundColor = 'rgba(37,99,235,.08)';
  delete response?.thirtyDaysTrend.chart.datasets[0].borderRadius;
  response.thirtyDaysTrend.chart.datasets[0].borderColor = '#2563EB';
  response.thirtyDaysTrend.chart.datasets[0].fill = true;
  response.thirtyDaysTrend.chart.datasets[0].tension = 0.35;
  response.thirtyDaysTrend.chart.datasets[0].borderWidth = 2;
  response.thirtyDaysTrend.chart.datasets[0].pointRadius = 0;
  return response;
};

export const useAttendanceStore = create<SubjectState>((set) => ({
  schoolAttendanceAnalytics: null,
  schoolAttendanceDetails: [],
  groupAttendanceDetails: [],
  groupAttendanceAnalytics: null,
  paginationMeta: defaultPaginationMeta,
  attendanceLoading: true,
  attendanceAnalyticsLoading: true,

  fetchAllSchoolAttendance: async (role, schoolId, query, type, options) => {
    set({ attendanceLoading: true });
    const permission = ['GROUPSCHOOLADMIN', 'SCHOOLADMIN', 'SUBSCHOOLADMIN', 'SCHOOLSTAFF'];
    if (!permission.includes(role as string)) return;
    try {
      const url = query.search
        ? `/api/single-school/${encodeURIComponent(schoolId)}/all-attendance?page=${query.page}&limit=${query.limit}&type=${type}&search=${query.search}`
        : `/api/single-school/${encodeURIComponent(schoolId)}/all-attendance?page=${query.page}&limit=${query.limit}&type=${type}`;
      const response = await getMethod(url);
      if (response.error === 'Unauthorised') {
        return;
      }
      if (!response.success) throw new Error('Failed to fetch data');

      const data = Array.isArray(response?.data) ? response.data : (response?.data ?? response);
      const attendanceList = Array.isArray(data) ? (data as Attendance[]) : [];
      set({ schoolAttendanceDetails: attendanceList, paginationMeta: response?.meta });
      set({ attendanceLoading: false });
    } catch (err: any) {
      set({ attendanceLoading: false });
      const errorMsg = err.message || 'An error occured';
      if (options?.onError) {
        options.onError(errorMsg);
      }
    }
  },

  fetchSchoolAttendanceAnalytics: async (role, schoolId, type, options) => {
    set({ attendanceAnalyticsLoading: true });
    const permission = ['GROUPSCHOOLADMIN', 'SCHOOLADMIN', 'SUBSCHOOLADMIN', 'SCHOOLSTAFF'];
    if (!permission.includes(role as string)) return;
    try {
      const url = `/api/single-school/${encodeURIComponent(schoolId)}/attendance-analytics?type=${type}`;
      let response = await getMethod(url);
      if (response.error === 'Unauthorised') {
        return;
      }
      if (!response.success) throw new Error('Failed to fetch data');
      response = formatLineChart(response);
      set({ schoolAttendanceAnalytics: response, attendanceAnalyticsLoading: false });
    } catch (err: any) {
      set({ attendanceAnalyticsLoading: false });
      const errorMsg = err.message || 'An error occured';
      if (options?.onError) {
        options.onError(errorMsg);
      }
    }
  },

  fetchAllGroupSchoolAttendance: async (role, groupId, query, type, options) => {
    set({ attendanceLoading: true });
    if (role !== 'GROUPSCHOOLADMIN') return;
    try {
      const url = query.search
        ? `/api/group-school/${encodeURIComponent(groupId)}/all-attendance?page=${query.page}&limit=${query.limit}&type=${type}&search=${query.search}`
        : `/api/group-school/${encodeURIComponent(groupId)}/all-attendance?page=${query.page}&limit=${query.limit}&type=${type}`;

      const response = await getMethod(url);
      if (!response.success) throw new Error('Failed to fetch data');

      const data = Array.isArray(response?.data) ? response.data : (response?.data ?? response);
      const subjectList = Array.isArray(data) ? (data as Attendance[]) : [];
      set({ groupAttendanceDetails: subjectList, paginationMeta: response?.meta });
      set({ attendanceLoading: false });
    } catch (err: any) {
      set({ attendanceLoading: false });
      const errorMsg = err.message || 'An error occured';
      if (options?.onError) {
        options.onError(errorMsg);
      }
    }
  },

  fetchGroupAttendanceAnalytics: async (role, groupId, type, options) => {
    set({ attendanceAnalyticsLoading: true });
    const permission = ['GROUPSCHOOLADMIN'];
    if (!permission.includes(role as string)) return;
    try {
      const url = `/api/group-school/${encodeURIComponent(groupId)}/group-attendance-analytics?type=${type}`;
      let response = await getMethod(url);
      if (response.error === 'Unauthorised') {
        return;
      }
      if (!response.success) throw new Error('Failed to fetch data');

      response = formatLineChart(response);

      set({ groupAttendanceAnalytics: response, attendanceAnalyticsLoading: false });
    } catch (err: any) {
      set({ attendanceAnalyticsLoading: false });
      const errorMsg = err.message || 'An error occured';
      if (options?.onError) {
        options.onError(errorMsg);
      }
    }
  },
}));
