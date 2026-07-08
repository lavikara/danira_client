import { forwardServerRequest } from '../../apiClient';

export async function GET(request: Request) {
  return forwardServerRequest('/user/me', request.method);
}
