// app/api/login/route.ts
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { schoolData, groupData, adminData } = await request.json();
  // 1. Call your Express backend to authenticate
  const expressRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ schoolData, groupData, adminData }),
  });

  if (!expressRes.ok) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  const data = await expressRes.json();

  return NextResponse.json(data);
}
