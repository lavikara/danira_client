import type { NextRequest } from 'next/server';
import { getServerRequest } from '../../../apiClient';
import authHeader from '../../../authHeader';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ schoolId: string }> },
) {
  const { schoolId } = await params;
  const backendPath = `/student/${encodeURIComponent(schoolId)}/analytics`;

  return getServerRequest(backendPath, request.method, {
    Authorization: `Bearer ${await authHeader()}`,
  });
}
