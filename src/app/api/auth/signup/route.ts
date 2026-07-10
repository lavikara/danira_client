import { postServerRequest } from '../../apiClient';

export async function POST(request: Request) {
  const { schoolData, groupData, adminData } = await request.json();
  return postServerRequest('/auth/signup', request.method, { schoolData, groupData, adminData });
}
