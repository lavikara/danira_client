import { create } from 'zustand';
import { FeeAnalyticsResponse, Fees, FeeInvoice, PaginationMeta, Role } from '@/types/definitions';
import { defaultPaginationMeta } from '@/components/ui/table';
import { getMethod } from '@/app/api/apiClient';

interface FeeState {
  schoolFeeAnalytics: FeeAnalyticsResponse | null;
  schoolPaymentDetails: FeeInvoice[];
  groupPaymentDetails: FeeInvoice[];
  schoolFeeDetails: Fees[];
  groupFeeDetails: Fees[];
  groupFeeAnalytics: FeeAnalyticsResponse | null;
  paymentPaginationMeta: PaginationMeta | null;
  feePaginationMeta: PaginationMeta | null;
  feesLoading: boolean;
  paymentRecordLoading: boolean;
  feeAnalyticsLoading: boolean;
  fetchAllSchoolPaymentRecords: (
    role: Role,
    schoolId: string,
    query: { page: number; limit: number; search?: string | null },
    options?: { onError?: (msg: string) => void },
  ) => Promise<void>;
  fetchSchoolFeeAnalytics: (
    role: Role,
    schoolId: string,
    options?: { onError?: (msg: string) => void },
  ) => Promise<void>;
  fetchGroupFeeAnalytics: (
    role: Role,
    groupId: string,
    options?: { onError?: (msg: string) => void },
  ) => Promise<void>;
  fetchAllGroupSchoolPaymentRecords: (
    role: Role,
    groupId: string,
    query: { page: number | null; limit: number | null; search?: string | null },
    options?: { onError?: (msg: string) => void },
  ) => Promise<void>;
  fetchAllSchoolFees: (
    role: Role,
    groupId: string,
    query: { page: number | null; limit: number | null; search?: string | null },
    options?: { onError?: (msg: string) => void },
  ) => Promise<void>;
  fetchAllGroupFees: (
    role: Role,
    groupId: string,
    query: { page: number | null; limit: number | null; search?: string | null },
    options?: { onError?: (msg: string) => void },
  ) => Promise<void>;
}

export const useFeeStore = create<FeeState>((set) => ({
  schoolFeeAnalytics: null,
  schoolPaymentDetails: [],
  groupPaymentDetails: [],
  schoolFeeDetails: [],
  groupFeeDetails: [],
  groupFeeAnalytics: null,
  paymentPaginationMeta: defaultPaginationMeta,
  feePaginationMeta: defaultPaginationMeta,
  feesLoading: true,
  paymentRecordLoading: true,
  feeAnalyticsLoading: true,

  fetchAllSchoolFees: async (role, schoolId, query, options) => {
    set({ feesLoading: true });
    const permission = ['GROUPSCHOOLADMIN', 'SCHOOLADMIN', 'SUBSCHOOLADMIN', 'SCHOOLSTAFF'];
    if (!permission.includes(role as string)) return;

    try {
      const url = query.search
        ? `/api/single-school/${encodeURIComponent(schoolId)}/all-fees?page=${query.page}&limit=${query.limit}&search=${query.search}`
        : `/api/single-school/${encodeURIComponent(schoolId)}/all-fees?page=${query.page}&limit=${query.limit}`;
      const response = await getMethod(url);
      if (response.error === 'Unauthorised') {
        return;
      }
      if (!response.success) throw new Error('Failed to fetch data');

      const data = Array.isArray(response?.data) ? response.data : (response?.data ?? response);
      const feeList = Array.isArray(data) ? (data as Fees[]) : [];
      set({ schoolFeeDetails: feeList, feePaginationMeta: response?.meta });
      set({ feesLoading: false });
    } catch (err: any) {
      set({ feesLoading: false });
      const errorMsg = err.message || 'An error occured';
      if (options?.onError) {
        options.onError(errorMsg);
      }
    }
  },

  fetchAllGroupFees: async (role, groupId, query, options) => {
    set({ feesLoading: true });
    if (role !== 'GROUPSCHOOLADMIN') return;
    try {
      const url = query.search
        ? `/api/group-school/${encodeURIComponent(groupId)}/all-fees?page=${query.page}&limit=${query.limit}&search=${query.search}`
        : `/api/group-school/${encodeURIComponent(groupId)}/all-fees?page=${query.page}&limit=${query.limit}`;

      const response = await getMethod(url);
      if (!response.success) throw new Error('Failed to fetch data');

      const data = Array.isArray(response?.data) ? response.data : (response?.data ?? response);
      const feeList = Array.isArray(data) ? (data as Fees[]) : [];
      set({ groupFeeDetails: feeList, feePaginationMeta: response?.meta });
      set({ feesLoading: false });
    } catch (err: any) {
      set({ feesLoading: false });
      const errorMsg = err.message || 'An error occured';
      if (options?.onError) {
        options.onError(errorMsg);
      }
    }
  },

  fetchAllSchoolPaymentRecords: async (role, schoolId, query, options) => {
    set({ paymentRecordLoading: true });
    const permission = ['GROUPSCHOOLADMIN', 'SCHOOLADMIN', 'SUBSCHOOLADMIN', 'SCHOOLSTAFF'];
    if (!permission.includes(role as string)) return;
    try {
      const url = query.search
        ? `/api/single-school/${encodeURIComponent(schoolId)}/all-payment-records?page=${query.page}&limit=${query.limit}&search=${query.search}`
        : `/api/single-school/${encodeURIComponent(schoolId)}/all-payment-records?page=${query.page}&limit=${query.limit}`;
      const response = await getMethod(url);
      if (response.error === 'Unauthorised') {
        return;
      }
      if (!response.success) throw new Error('Failed to fetch data');

      const data = Array.isArray(response?.data) ? response.data : (response?.data ?? response);
      const paymentList = Array.isArray(data) ? (data as FeeInvoice[]) : [];
      set({ schoolPaymentDetails: paymentList, paymentPaginationMeta: response?.meta });
      set({ paymentRecordLoading: false });
    } catch (err: any) {
      set({ paymentRecordLoading: false });
      const errorMsg = err.message || 'An error occured';
      if (options?.onError) {
        options.onError(errorMsg);
      }
    }
  },

  fetchSchoolFeeAnalytics: async (role, schoolId, options) => {
    set({ feeAnalyticsLoading: true });
    const permission = ['GROUPSCHOOLADMIN', 'SCHOOLADMIN', 'SUBSCHOOLADMIN', 'SCHOOLSTAFF'];
    if (!permission.includes(role as string)) return;
    try {
      const url = `/api/single-school/${encodeURIComponent(schoolId)}/fee-analytics`;
      const response = await getMethod(url);
      if (response.error === 'Unauthorised') {
        return;
      }
      if (!response.success) throw new Error('Failed to fetch data');
      response.data.collectionRate =
        parseFloat((response.data.collectionRate * 100).toFixed(2)) + '%';
      response.data.feeTypeChart.chart.labels = response.data?.feeTypeChart?.chart?.labels?.map(
        (item: any) => item.split(' ')[0],
      );
      set({ schoolFeeAnalytics: response.data });
      set({ feeAnalyticsLoading: false });
    } catch (err: any) {
      set({ feeAnalyticsLoading: false });
      const errorMsg = err.message || 'An error occured';
      if (options?.onError) {
        options.onError(errorMsg);
      }
    }
  },

  fetchAllGroupSchoolPaymentRecords: async (role, groupId, query, options) => {
    set({ paymentRecordLoading: true });
    if (role !== 'GROUPSCHOOLADMIN') return;
    try {
      const url = query.search
        ? `/api/group-school/${encodeURIComponent(groupId)}/all-payment-records?page=${query.page}&limit=${query.limit}&search=${query.search}`
        : `/api/group-school/${encodeURIComponent(groupId)}/all-payment-records?page=${query.page}&limit=${query.limit}`;

      const response = await getMethod(url);
      if (!response.success) throw new Error('Failed to fetch data');

      const data = Array.isArray(response?.data) ? response.data : (response?.data ?? response);
      const paymentList = Array.isArray(data) ? (data as FeeInvoice[]) : [];
      set({ groupPaymentDetails: paymentList, paymentPaginationMeta: response?.meta });
      set({ paymentRecordLoading: false });
    } catch (err: any) {
      set({ paymentRecordLoading: false });
      const errorMsg = err.message || 'An error occured';
      if (options?.onError) {
        options.onError(errorMsg);
      }
    }
  },

  fetchGroupFeeAnalytics: async (role, groupId, options) => {
    set({ feeAnalyticsLoading: true });
    if (role !== 'GROUPSCHOOLADMIN') return;
    try {
      const url = `/api/group-school/${encodeURIComponent(groupId)}/group-fee-analytics`;
      const response = await getMethod(url);
      if (response.error === 'Unauthorised') {
        return;
      }
      if (!response.success) throw new Error('Failed to fetch data');
      response.data.collectionRate =
        parseFloat((response.data.collectionRate * 100).toFixed(2)) + '%';
      response.data.feeTypeChart.chart.labels = response.data?.feeTypeChart?.chart?.labels?.map(
        (item: any) => item.split(' ')[0],
      );
      set({ groupFeeAnalytics: response.data });
      set({ feeAnalyticsLoading: false });
    } catch (err: any) {
      set({ feeAnalyticsLoading: false });
      const errorMsg = err.message || 'An error occured';
      if (options?.onError) {
        options.onError(errorMsg);
      }
    }
  },
}));
