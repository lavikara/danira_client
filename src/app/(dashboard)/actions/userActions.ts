import userApi from '@/app/api/user/userApi';
import { handleApiError } from '@/utils/errorHandler';

export const getLoggedInUserAction = async () => {
  try {
    const { data } = await userApi.getLoggedInUser();
    console.log('Logged in user data:', data);
    return data;
  } catch (error: any) {
    return handleApiError(error);
  }
};
