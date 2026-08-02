import { create } from 'zustand';
import {
  NotificationAnalyticsResponse,
  Notifications,
  PaginationMeta,
  Role,
} from '@/types/definitions';
import { defaultPaginationMeta } from '@/components/ui/table';
import { getMethod } from '@/app/api/apiClient';

interface NotificationStore {
  schoolNotificationAnalytics: NotificationAnalyticsResponse | null;
  schoolNotificationDetails: Notifications[];
  groupNotificationDetails: Notifications[];
  groupNotificationAnalytics: NotificationAnalyticsResponse | null;
  paginationMeta: PaginationMeta | null;
  notificationLoading: boolean;
  notificationAnalyticsLoading: boolean;
  fetchAllSchoolNotification: (
    role: Role,
    schoolId: string,
    query: { page: number; limit: number; search?: string | null },
    options?: { onError?: (msg: string) => void },
  ) => Promise<void>;
  fetchSchoolNotificationAnalytics: (
    role: Role,
    schoolId: string,
    options?: { onError?: (msg: string) => void },
  ) => Promise<void>;
  fetchGroupNotificationAnalytics: (
    role: Role,
    groupId: string,
    options?: { onError?: (msg: string) => void },
  ) => Promise<void>;
  fetchAllGroupNotification: (
    role: Role,
    groupId: string,
    query: { page: number | null; limit: number | null; search?: string | null },
    options?: { onError?: (msg: string) => void },
  ) => Promise<void>;
}

const icons = [
  { type: 'MEGAPHONE_FILL', icon: 'bi-megaphone-fill' },
  { type: 'CASH_COIN', icon: 'bi-cash-coin' },
  { type: 'CASH_STACK', icon: 'bi-cash-stack' },
  { type: 'PERSON_FILL_EXCLAMATION', icon: 'bi-person-fill-exclamation' },
  { type: 'JOURNAL_CHECK', icon: 'bi-journal-check' },
  { type: 'PENCIL_SQUARE', icon: 'bi-pencil-square' },
  { type: 'CALENDAR2_WEEK_FILL', icon: 'bi-calendar2-week-fill' },
  { type: 'CALENDAR_EVENT_FILL', icon: 'bi-calendar-event-fill' },
  { type: 'CLIPBOARD2_CHECK_FILL', icon: 'bi-clipboard2-check-fill' },
  { type: 'FILE_EARMARK_BAR_GRAPH_FILL', icon: 'bi-file-earmark-bar-graph-fill' },
  { type: 'INFO_CIRCLE_FILL', icon: 'bi-info-circle-fill' },
];

const color = [
  {
    type: 'GREEN',
    bgColor: 'var(--color-green-bg)',
    iconColor: 'var(--color-green)',
  },
  {
    type: 'YELLOW',
    bgColor: 'var(--color-yellow-bg)',
    iconColor: 'var(--color-yellow)',
  },
  {
    type: 'ORANGE',
    bgColor: 'var(--color-orange-bg)',
    iconColor: 'var(--color-orange)',
  },
  {
    type: 'RED',
    bgColor: 'var(--color-red-bg)',
    iconColor: 'var(--color-red)',
  },
  {
    type: 'PURPLE',
    bgColor: 'var(--color-purple-bg)',
    iconColor: 'var(--color-purple)',
  },
  {
    type: 'TEAL',
    bgColor: 'var(--color-teal-bg)',
    iconColor: 'var(--color-teal)',
  },
  {
    type: 'PINK',
    bgColor: 'var(--color-pink-bg)',
    iconColor: 'var(--color-pink)',
  },
  {
    type: 'INDIGO',
    bgColor: 'var(--color-indigo-bg)',
    iconColor: 'var(--color-indigo)',
  },
];

const parseNotification = (notificationList: Notifications[]): Notifications[] => {
  notificationList.forEach((notification) => {
    notification.icon = icons.find((icon) => icon.type === notification.icon)?.icon || '';
    const colorConfig = color.find((c) => c.type === notification.bgColor);
    if (colorConfig) {
      notification.bgColor = colorConfig.bgColor;
      notification.iconColor = colorConfig.iconColor;
    }
  });

  return notificationList;
};

export const useNotificationStore = create<NotificationStore>((set) => ({
  schoolNotificationAnalytics: null,
  schoolNotificationDetails: [],
  groupNotificationDetails: [],
  groupNotificationAnalytics: null,
  paginationMeta: defaultPaginationMeta,
  notificationLoading: true,
  notificationAnalyticsLoading: true,

  fetchAllSchoolNotification: async (role, schoolId, query, options) => {
    set({ notificationLoading: true });
    const permission = ['GROUPSCHOOLADMIN', 'SCHOOLADMIN', 'SUBSCHOOLADMIN', 'SCHOOLSTAFF'];
    if (!permission.includes(role as string)) return;
    try {
      const url = query.search
        ? `/api/single-school/${encodeURIComponent(schoolId)}/all-notifications?page=${query.page}&limit=${query.limit}&search=${query.search}`
        : `/api/single-school/${encodeURIComponent(schoolId)}/all-notifications?page=${query.page}&limit=${query.limit}`;
      const response = await getMethod(url);
      if (response.error === 'Unauthorised') {
        return;
      }
      if (!response.success) throw new Error('Failed to fetch data');

      const data = Array.isArray(response?.data) ? response.data : (response?.data ?? response);
      const notificationList = Array.isArray(data) ? (data as Notifications[]) : [];

      parseNotification(notificationList);

      set({ schoolNotificationDetails: notificationList, paginationMeta: response?.meta });
      set({ notificationLoading: false });
    } catch (err: any) {
      set({ notificationLoading: false });
      const errorMsg = err.message || 'An error occured';
      if (options?.onError) {
        options.onError(errorMsg);
      }
    }
  },

  fetchSchoolNotificationAnalytics: async (role, schoolId, options) => {
    set({ notificationAnalyticsLoading: true });
    const permission = ['GROUPSCHOOLADMIN', 'SCHOOLADMIN', 'SUBSCHOOLADMIN', 'SCHOOLSTAFF'];
    if (!permission.includes(role as string)) return;
    try {
      const url = `/api/single-school/${encodeURIComponent(schoolId)}/notification-analytics`;
      const response = await getMethod(url);
      if (response.error === 'Unauthorised') {
        return;
      }
      if (!response.success) throw new Error('Failed to fetch data');
      set({ schoolNotificationAnalytics: response });
      set({ notificationAnalyticsLoading: false });
    } catch (err: any) {
      set({ notificationAnalyticsLoading: false });
      const errorMsg = err.message || 'An error occured';
      if (options?.onError) {
        options.onError(errorMsg);
      }
    }
  },

  fetchAllGroupNotification: async (role, groupId, query, options) => {
    set({ notificationLoading: true });
    if (role !== 'GROUPSCHOOLADMIN') return;
    try {
      const url = query.search
        ? `/api/group-school/${encodeURIComponent(groupId)}/all-notifications?page=${query.page}&limit=${query.limit}&search=${query.search}`
        : `/api/group-school/${encodeURIComponent(groupId)}/all-notifications?page=${query.page}&limit=${query.limit}`;

      const response = await getMethod(url);
      if (!response.success) throw new Error('Failed to fetch data');
      const data = Array.isArray(response?.data) ? response.data : (response?.data ?? response);
      const notificationList = Array.isArray(data) ? (data as Notifications[]) : [];

      parseNotification(notificationList);

      set({ groupNotificationDetails: notificationList, paginationMeta: response?.meta });
      set({ notificationLoading: false });
    } catch (err: any) {
      set({ notificationLoading: false });
      const errorMsg = err.message || 'An error occured';
      if (options?.onError) {
        options.onError(errorMsg);
      }
    }
  },

  fetchGroupNotificationAnalytics: async (role, groupId, options) => {
    set({ notificationAnalyticsLoading: true });
    if (role !== 'GROUPSCHOOLADMIN') return;
    try {
      const url = `/api/group-school/${encodeURIComponent(groupId)}/group-notification-analytics`;
      const response = await getMethod(url);
      if (response.error === 'Unauthorised') {
        return;
      }
      if (!response.success) throw new Error('Failed to fetch data');
      set({ groupNotificationAnalytics: response });
      set({ notificationAnalyticsLoading: false });
    } catch (err: any) {
      set({ notificationAnalyticsLoading: false });
      const errorMsg = err.message || 'An error occured';
      if (options?.onError) {
        options.onError(errorMsg);
      }
    }
  },
}));
