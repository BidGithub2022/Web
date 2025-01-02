import { NextResponse } from 'next/server';

export function middleware(request) {
  const path = request.nextUrl.pathname;

  // Protected routes that need authentication
  const protectedRoutes = ['/dashboard', '/staff-dashboard'];
  
  // Only check auth for protected routes
  if (protectedRoutes.some(route => path.startsWith(route))) {
    const token = request.cookies.get('token')?.value;
    const staffToken = request.cookies.get('staffToken')?.value;

    if (!token && !staffToken) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/staff-dashboard/:path*'
  ]
};