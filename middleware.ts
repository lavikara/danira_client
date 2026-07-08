// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  console.log('im here');
  const token = request.cookies.get('authToken')?.value;
  const { pathname } = request.nextUrl;

  // Redirect to /login if trying to access dashboard without a token
  if (pathname.startsWith('/(dashboard)') && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Redirect to /dashboard if logged-in user tries to access /login
  if (pathname.startsWith('/login') && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

// Optimize to only run on relevant routes
export const config = {
  matcher: ['/(dashboard)/:path*', '/login'],
};
