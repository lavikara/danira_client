import { postServerRequest } from '../../apiClient';

export async function PATCH(request: Request) {
  const { token, newPassword } = await request.json();
  return postServerRequest('/auth/reset-password', request.method, { token, newPassword });
}
