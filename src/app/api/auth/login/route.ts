// app/api/login/route.ts
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { email, password } = await request.json();
  console.log(email, password);
  // 1. Call your Express backend to authenticate
  const expressRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (!expressRes.ok) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  const data = await expressRes.json();
  const token = data.token; // Your JWT from Express

  // 2. Access the cookie jar (await is required in Next.js)
  const cookieStore = await cookies();

  // 3. Save the token into an HTTP-only cookie
  cookieStore.set('authToken', token, {
    httpOnly: true, // Prevents client-side JS from reading the cookie
    secure: process.env.NODE_ENV === 'production', // Requires HTTPS in production
    sameSite: 'strict', // Protects against CSRF attacks
    maxAge: 60 * 60 * 24, // Expires in 24 hours
    path: '/', // Accessible across your entire site
  });

  return NextResponse.json(data);
}
