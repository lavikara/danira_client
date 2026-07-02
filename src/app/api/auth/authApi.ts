import apiClient from '../apiClient';
import {
  SignupFormData,
  ResetPasswordFormData,
  LoginFormData,
  ForgotPasswordFormData,
} from '@/types/definitions';

export default {
  login(payload: LoginFormData) {
    return apiClient.post(`/auth/login`, payload);
  },

  signup(payload: SignupFormData) {
    return apiClient.post(`/auth/signup`, payload);
  },

  resetPassword(payload: ResetPasswordFormData) {
    return apiClient.patch(`/auth/reset-password`, payload);
  },

  forgotPassword(payload: ForgotPasswordFormData) {
    return apiClient.post(`/auth/forgot-password`, payload);
  },
};
