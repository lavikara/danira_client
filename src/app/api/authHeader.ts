import { cookies } from 'next/headers';

export default async function authHeader() {
  const cookieHeader = (await cookies()).toString();
  const match = cookieHeader.match(/authToken=([^;]+)/);
  const jwt = match ? match[1] : '';
  return jwt;
}
