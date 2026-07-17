import { create } from 'zustand';
import { GroupSchools, SchoolWithInclude, SchoolGroups, Role } from '@/types/definitions';
import { getMethod } from '@/app/api/apiClient';

interface SchoolState {
  groupSchoolSchools: GroupSchools[] | null;
  schoolDetails: SchoolWithInclude | null;
  groupSchoolDetails: SchoolGroups | null;
  schoolLoading: boolean;
  fetchGroupDetails: (
    role: Role,
    groupId: string,
    options?: { onError?: (msg: string) => void },
  ) => Promise<void>;
  fetchGroupSchools: (
    role: Role,
    groupId: string,
    options?: { onError?: (msg: string) => void },
  ) => Promise<void>;
  fetchSchoolDetails: (
    role: Role,
    schoolId: string,
    options?: { onError?: (msg: string) => void },
  ) => Promise<void>;
}

export const useSchoolStore = create<SchoolState>((set) => ({
  groupSchoolSchools: null,
  schoolDetails: null,
  groupSchoolDetails: null,
  schoolLoading: true,

  fetchSchoolDetails: async (role, schoolId, options) => {
    const permission = [
      'GROUPSCHOOLADMIN',
      'SCHOOLADMIN',
      'SUBSCHOOLADMIN',
      'SCHOOLSTAFF',
      'STUDENT',
    ];
    if (!permission.includes(role as string)) return;
    set({ schoolLoading: true });
    try {
      const url = `/api/single-school/${encodeURIComponent(schoolId)}/school-details`;
      const response = await getMethod(url);
      if (response.error === 'Unauthorised') {
        return;
      }
      if (!response.success) throw new Error('Failed to fetch data');

      const { data } = response;

      set({ schoolDetails: data, schoolLoading: false });
    } catch (err: any) {
      set({ schoolLoading: false });
      const errorMsg = err.message || 'An error occured';
      if (options?.onError) {
        options.onError(errorMsg);
      }
    }
  },

  fetchGroupDetails: async (role, groupId, options) => {
    if (role !== 'GROUPSCHOOLADMIN') return;
    set({ schoolLoading: true });
    try {
      const url = `/api/group-school/${encodeURIComponent(groupId)}/group-details`;
      const response = await getMethod(url);

      if (!response.success) throw new Error('Failed to fetch data');

      const { data } = response;

      set({ groupSchoolDetails: data?.schoolGroups, schoolLoading: false });
    } catch (err: any) {
      set({ schoolLoading: false });
      const errorMsg = err.message || 'An error occured';
      if (options?.onError) {
        options.onError(errorMsg);
      }
    }
  },

  fetchGroupSchools: async (role, groupId, options) => {
    if (role !== 'GROUPSCHOOLADMIN') return;
    set({ schoolLoading: true });
    try {
      const url = `/api/group-school/${encodeURIComponent(groupId)}/group-schools`;
      const response = await getMethod(url);

      if (!response.success) throw new Error('Failed to fetch data');

      const { data } = response;
      set({ groupSchoolSchools: data, schoolLoading: false });
    } catch (err: any) {
      set({ schoolLoading: false });
      const errorMsg = err.message || 'An error occured';
      if (options?.onError) {
        options.onError(errorMsg);
      }
    }
  },
}));
