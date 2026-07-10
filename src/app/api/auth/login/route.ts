import { postServerRequest } from '../../apiClient';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

async function setAuthTokenCookie(token: string) {
  const cookieStore = await cookies();

  cookieStore.set('authToken', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24,
    path: '/',
  });
}

export async function POST(request: Request) {
  const { email, password } = await request.json();
  const response = await postServerRequest('/auth/login', request.method, { email, password });

  const data = await response.json();

  if (!response.ok) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 400 });
  }
  const token = data.data?.token;

  if (token) {
    await setAuthTokenCookie(token);
  }
  return NextResponse.json(data);
}
