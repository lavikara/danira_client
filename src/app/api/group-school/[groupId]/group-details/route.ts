import type { NextRequest } from 'next/server';
import { getServerRequest } from '../../../apiClient';
import authHeader from '../../../authHeader';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ groupId: string }> },
) {
  const { groupId } = await params;
  const backendPath = `/school/${encodeURIComponent(groupId)}/group-details`;

  return getServerRequest(backendPath, request.method, {
    Authorization: `Bearer ${await authHeader()}`,
  });
}
