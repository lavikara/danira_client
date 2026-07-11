import { create } from 'zustand';
import { GroupSchools, SchoolWithInclude, SchoolGroups, Role } from '@/types/definitions';
import { getMethod } from '@/app/api/apiClient';

interface SchoolState {
  groupSchools: GroupSchools[] | null;
  schoolDetails: SchoolWithInclude | null;
  groupDetails: SchoolGroups | null;
  schoolLoading: boolean;
  fetchGroupDetails: (role: Role, options?: { onError?: (msg: string) => void }) => Promise<void>;
  fetchGroupSchools: (role: Role, options?: { onError?: (msg: string) => void }) => Promise<void>;
  fetchSchoolDetails: (role: Role, options?: { onError?: (msg: string) => void }) => Promise<void>;
}

export const useSchoolStore = create<SchoolState>((set) => ({
  groupSchools: null,
  schoolDetails: null,
  groupDetails: null,
  schoolLoading: true,

  fetchSchoolDetails: async (role, options) => {
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
      const response = await getMethod('/api/school/single-school');
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

  fetchGroupDetails: async (role, options) => {
    if (role !== 'GROUPSCHOOLADMIN') return;
    set({ schoolLoading: true });
    try {
      const response = await getMethod('/api/school/group-details');
      if (response.error === 'Unauthorised') {
        return;
      }
      if (!response.success) throw new Error('Failed to fetch data');

      const { data } = response;

      set({ groupDetails: data, schoolLoading: false });
    } catch (err: any) {
      set({ schoolLoading: false });
      const errorMsg = err.message || 'An error occured';
      if (options?.onError) {
        options.onError(errorMsg);
      }
    }
  },

  fetchGroupSchools: async (role, options) => {
    if (role !== 'GROUPSCHOOLADMIN') return;
    set({ schoolLoading: true });
    try {
      const response = await getMethod('/api/school/group-schools');

      if (!response.success) throw new Error('Failed to fetch data');

      const { data } = response;

      set({ groupSchools: data, schoolLoading: false });
    } catch (err: any) {
      set({ schoolLoading: false });
      const errorMsg = err.message || 'An error occured';
      if (options?.onError) {
        options.onError(errorMsg);
      }
    }
  },
}));
