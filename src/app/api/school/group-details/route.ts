import { getServerRequest } from '../../apiClient';
import authHeader from '../../authHeader';

export async function GET(request: Request) {
  return getServerRequest('/school/group-details', request.method, {
    Authorization: `Bearer ${await authHeader()}`,
  });
}
