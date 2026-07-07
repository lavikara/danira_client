import apiClient from '../apiClient';

export default {
  getLoggedInUser() {
    return apiClient.get(`/user/me`);
  },
};
