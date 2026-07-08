// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define the URLs belonging to each group (without the parenthesis)
const AUTH_ROUTES = ['/login', '/signup', '/forgot-password', '/reset-password'];
const DASHBOARD_PREFIX = '/dashboard';

export function proxy(request: NextRequest) {
  const token = request.cookies.get('authToken')?.value;
  const { pathname, searchParams } = request.nextUrl;
  console.log(`🎬 Middleware running on: ${pathname}`);
  console.log(`🍪 Token found:`, token);

  const isAuthRoute = AUTH_ROUTES.some((route) => pathname.startsWith(route));
  const isDashboardRoute =
    pathname === DASHBOARD_PREFIX || pathname.startsWith(`${DASHBOARD_PREFIX}/`);

  // 1. Guard: Redirect to login if trying to access dashboard without a token
  if (isDashboardRoute && !token) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 2. Guard: Redirect to dashboard if logged-in user tries to access auth pages
  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // 3. Prevent browser back-button caching for these routes
  const response = NextResponse.next();
  if (isAuthRoute || isDashboardRoute) {
    response.headers.set('Cache-Control', 'no-store, max-age=0, must-revalidate');
  }

  return response;
}

// 4. Update your matcher to cover all nested pages
export const config = {
  matcher: ['/dashboard/:path*', '/login', '/signup', '/forgot-password', '/reset-password'],
};
