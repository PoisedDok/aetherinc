import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

// Security headers to apply to all responses
const securityHeaders = {
  'Content-Security-Policy': 
    "default-src 'self'; " +
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'; " +
    "style-src 'self' 'unsafe-inline'; " +
    "img-src 'self' blob: data: https://*; " +
    "font-src 'self'; " +
    "connect-src 'self' https://*; " +
    "frame-ancestors 'none';",
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()'
};

// Apply security headers to a response
function applySecurityHeaders(response: NextResponse): NextResponse {
  Object.entries(securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });
  return response;
}

// Export NextAuth middleware with custom configuration
export default withAuth(
  // Add your own logic here, this function is called after the auth check
  function middleware(req) {
    const { token } = req.nextauth;
    const { pathname } = req.nextUrl;

    // If trying to access login, let them through
    if (pathname === '/admin/login') {
      // If already logged in as admin, redirect to dashboard
      if (token && token.role === 'ADMIN') {
        return applySecurityHeaders(NextResponse.redirect(new URL('/admin', req.url)));
      }
      return applySecurityHeaders(NextResponse.next());
    }

    // For any admin route, check for admin role
    if (pathname.startsWith('/admin')) {
      if (!token || token.role !== 'ADMIN') {
        // Redirect to login, preserving the originally requested URL
        const loginUrl = new URL('/admin/login', req.url);
        loginUrl.searchParams.set('callbackUrl', req.url);
        return applySecurityHeaders(NextResponse.redirect(loginUrl));
      }
    }

    // Continue for authorized requests
    return applySecurityHeaders(NextResponse.next());
  },
  {
    // Specify allowed roles for specific paths
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;
        
        // Allow access to login page
        if (pathname === '/admin/login') {
          return true;
        }
        
        // Require admin role for admin routes
        if (pathname.startsWith('/admin')) {
          return token?.role === 'ADMIN';
        }
        
        // Default to authorized for non-protected routes
        return true;
      }
    },
  }
);

// Configuration for NextAuth middleware
export const config = {
  matcher: ['/admin/:path*'],
}; 