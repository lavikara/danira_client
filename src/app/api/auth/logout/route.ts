// app/api/logout/route.ts
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST() {
  const cookieStore = await cookies();

  // Remove the cookie from the server
  cookieStore.delete('authToken');

  return NextResponse.json({ success: true });
}
