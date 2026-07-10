import { postServerRequest } from '../../apiClient';

export async function POST(request: Request) {
  const { email } = await request.json();
  return postServerRequest('/auth/forgot-password', request.method, { email });
}
