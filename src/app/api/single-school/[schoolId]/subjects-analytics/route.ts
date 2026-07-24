import type { NextRequest } from 'next/server';
import { getServerRequest } from '../../../apiClient';
import authHeader from '../../../authHeader';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ schoolId: string }> },
) {
  const { schoolId } = await params;
  const { searchParams } = new URL(request.url);
  const page = searchParams.get('page');
  const limit = searchParams.get('limit');
  const search = searchParams.get('search');
  const backendPath = search
    ? `/subject/${encodeURIComponent(schoolId)}/analytics?page=${page}&limit=${limit}&search=${search}`
    : `/subject/${encodeURIComponent(schoolId)}/analytics?page=${page}&limit=${limit}`;

  return getServerRequest(backendPath, request.method, {
    Authorization: `Bearer ${await authHeader()}`,
  });
}
