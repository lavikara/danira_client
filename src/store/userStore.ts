import { create } from 'zustand';
import { Users } from '@/types/definitions';
import { get } from '@/app/api/apiClient';

interface UserState {
  user: Users | null;
  isLoading: boolean;
  fetchLoggedInUser: (options?: { onError?: (msg: string) => void }) => Promise<void>;
}

export const useLoggedInUser = create<UserState>((set) => ({
  user: null,
  isLoading: true,

  fetchLoggedInUser: async (options) => {
    set({ isLoading: true });
    try {
      const response = await get('/api/user/me');
      if (!response.success) throw new Error('Failed to fetch data');

      const { data } = response;
      const dataKey = Object.keys(data)[0];
      set({ user: data[dataKey].users, isLoading: false });
    } catch (err: any) {
      set({ isLoading: false });
      const errorMsg = err.message || 'An error occured';
      if (options?.onError) {
        options.onError(errorMsg);
      }
    }
  },
}));
