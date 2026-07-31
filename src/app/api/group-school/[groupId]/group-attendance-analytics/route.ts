import type { NextRequest } from 'next/server';
import { getServerRequest } from '../../../apiClient';
import authHeader from '../../../authHeader';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ groupId: string }> },
) {
  const { groupId } = await params;
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');
  const backendPath = `/attendance/${encodeURIComponent(groupId)}/${type}-analytics-group`;

  return getServerRequest(backendPath, request.method, {
    Authorization: `Bearer ${await authHeader()}`,
  });
}
