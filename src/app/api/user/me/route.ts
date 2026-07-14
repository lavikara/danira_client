import type { NextRequest } from 'next/server';
import { getServerRequest } from '../../apiClient';
import authHeader from '../../authHeader';

export async function GET(request: NextRequest) {
  return getServerRequest('/user/me', request.method, {
    Authorization: `Bearer ${await authHeader()}`,
  });
}
