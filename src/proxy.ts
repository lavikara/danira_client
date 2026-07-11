import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const AUTH_ROUTES = ['/login', '/signup', '/forgot-password', '/reset-password'];
const DASHBOARD_PREFIX = '/dashboard';

export async function proxy(request: NextRequest) {
  const token = request.cookies.get('authToken')?.value;
  const { pathname } = request.nextUrl;

  const isAuthRoute = AUTH_ROUTES.some((route) => pathname.startsWith(route));
  const isDashboardRoute =
    pathname === DASHBOARD_PREFIX || pathname.startsWith(`${DASHBOARD_PREFIX}/`);

  let validToken;

  if (token) {
    validToken = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/verify`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  if (validToken?.status === 401 && isDashboardRoute) {
    const cookieStore = await cookies();
    cookieStore.set('authToken', '', { maxAge: 0 });
    cookieStore.delete('authToken');
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (isDashboardRoute && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  const response = NextResponse.next();
  if (isAuthRoute || isDashboardRoute) {
    response.headers.set('Cache-Control', 'no-store, max-age=0, must-revalidate');
  }

  return response;
}

export const config = {
  matcher: ['/dashboard/:path*', '/login', '/signup', '/forgot-password', '/reset-password'],
};
