import { NextResponse } from 'next/server';
import { withAuth } from 'next-auth/middleware';

export default withAuth(
  function middleware(req) {
    const { token } = req.nextauth;
    const { pathname } = req.nextUrl;

    // If trying to access login, let them through
    if (pathname === '/admin/login') {
      // If already logged in as admin, redirect to dashboard
      if (token && token.role === 'ADMIN') {
        return NextResponse.redirect(new URL('/admin', req.url));
      }
  return NextResponse.next();
}

    // For any other admin route, check for admin role
    if (pathname.startsWith('/admin')) {
      if (!token || token.role !== 'ADMIN') {
        // Redirect to login, preserving the originally requested URL
        const loginUrl = new URL('/admin/login', req.url);
        loginUrl.searchParams.set('callbackUrl', req.url);
        return NextResponse.redirect(loginUrl);
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      // This is required for the middleware to run
      authorized: () => true,
    },
  }
);

export const config = {
  matcher: ['/admin/:path*'],
}; 