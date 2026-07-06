import { logoutAction } from '@/app/(auth)/actions/authActions';

export const handleApiError = (err: any) => {
  console.log('error');
  console.log(err);

  let message = null;
  if (err?.message === 'Network Error') {
    message = 'Connection not established';
  } else if (err?.message === 'Request failed with status code 401') {
    logoutAction();
    message = err?.response?.data?.message || 'Session expired';
  } else if (err?.message == 'timeout exceeded') {
    message = err?.message;
  } else if (err?.response?.data?.message) {
    message = err?.response?.data;
  } else {
    message = 'An error occured';
  }

  return message;
};
