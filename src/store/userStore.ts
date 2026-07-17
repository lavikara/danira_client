import { create } from 'zustand';
import { Users, Staffs, Admins } from '@/types/definitions';
import { getMethod } from '@/app/api/apiClient';

interface UserState {
  user: Users | null;
  data: (Admins & Staffs) | null;
  userLoading: boolean;
  unAuthorised: boolean;
  fetchLoggedInUser: (options?: { onError?: (msg: string) => void }) => Promise<void>;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  data: null,
  userLoading: true,
  unAuthorised: false,

  fetchLoggedInUser: async (options) => {
    set({ userLoading: true });
    try {
      const response = await getMethod('/api/user/me');
      if (response.error === 'Unauthorised') {
        return set({ unAuthorised: true });
      }
      if (!response.success) throw new Error('Failed to fetch data');

      const { data } = response;
      const dataKey = Object.keys(data)[0] as keyof (Admins | Staffs);
      set({ user: data[dataKey].users, data: data[dataKey], userLoading: false });
    } catch (err: any) {
      set({ userLoading: false });
      const errorMsg = err.message || 'An error occured';
      if (options?.onError) {
        options.onError(errorMsg);
      }
    }
  },
}));
