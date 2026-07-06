import {
  SignupFormData,
  ResetPasswordFormData,
  LoginFormData,
  ForgotPasswordFormData,
} from '@/types/definitions';
import authApi from '@/app/api/auth/authApi';
import { clearStorage } from '@/utils/storage';
import { handleApiError } from '@/utils/errorHandler';
import { setItem } from '@/utils/storage';

export const loginAction = async (formData: LoginFormData) => {
  try {
    const { data } = await authApi.login(formData);
    setItem('authToken', data.data.token);
    return data;
  } catch (error: any) {
    return handleApiError(error);
  }
};

export const signupAction = async (formData: SignupFormData) => {
  try {
    const { data } = await authApi.signup(formData);
    return data;
  } catch (error: any) {
    return handleApiError(error);
  }
};

export const forgotPasswordAction = async (formData: ForgotPasswordFormData) => {
  try {
    const { data } = await authApi.forgotPassword(formData);
    return data;
  } catch (error: any) {
    return handleApiError(error);
  }
};

export const resetPasswordAction = async (formData: ResetPasswordFormData) => {
  try {
    const { data } = await authApi.resetPassword(formData);
    return data;
  } catch (error: any) {
    return handleApiError(error);
  }
};

export const logoutAction = () => {
  clearStorage();
  if (typeof window !== 'undefined') {
    window.location.replace('/login');
  }
};
