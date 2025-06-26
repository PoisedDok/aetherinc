import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { rateLimiter } from './lib/middleware/rateLimiter';

// Define paths that need rate limiting
const RATE_LIMITED_PATHS = [
  '/api/auth',
  '/admin/login',
  '/api/contact',
  '/api/waitlist',
];

// CSRF protection settings
const CSRF_PROTECTED_METHODS = ['POST', 'PUT', 'PATCH', 'DELETE'];
const CSRF_PROTECTED_PATHS = [
  '/api/admin',
  '/api/auth',
  '/api/contact',
  '/api/waitlist',
];

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

// Check CSRF protection
function validateCSRF(request: NextRequest): NextResponse | null {
  const pathname = request.nextUrl.pathname;
  const method = request.method;
  
  // Skip CSRF validation for non-mutation methods
  if (!CSRF_PROTECTED_METHODS.includes(method)) {
    return null;
  }
  
  // Skip CSRF for paths that don't need protection
  if (!CSRF_PROTECTED_PATHS.some(path => pathname.startsWith(path))) {
    return null;
  }
  
  // Check Origin and Host headers to prevent CSRF
  const origin = request.headers.get('Origin');
  const host = request.headers.get('Host');
  
  // If no Origin header for a POST request to protected endpoint, reject
  // This blocks requests from attacker sites and non-browser requests
  if (!origin) {
    return new NextResponse(
      JSON.stringify({ 
        success: false, 
        error: { message: 'CSRF validation failed: Missing Origin header' } 
      }),
      { status: 403, headers: { 'Content-Type': 'application/json' } }
    );
  }

  // Validate Origin matches Host to prevent cross-origin requests
  try {
    const originHost = new URL(origin).host;
    if (host !== originHost) {
      return new NextResponse(
        JSON.stringify({ 
          success: false, 
          error: { message: 'CSRF validation failed: Origin does not match Host' } 
        }),
        { status: 403, headers: { 'Content-Type': 'application/json' } }
      );
    }
  } catch (e) {
    return new NextResponse(
      JSON.stringify({ 
        success: false, 
        error: { message: 'CSRF validation failed: Invalid Origin' } 
      }),
      { status: 403, headers: { 'Content-Type': 'application/json' } }
    );
  }
  
  return null; // Validation passed
}

// Apply middleware for non-admin routes
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Don't process admin routes (handled by separate middleware)
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    return NextResponse.next();
  }
  
  // Step 1: Apply rate limiting to sensitive paths
  if (RATE_LIMITED_PATHS.some(path => pathname.startsWith(path))) {
    const rateLimitResponse = rateLimiter(request);
    if (rateLimitResponse) {
      return applySecurityHeaders(rateLimitResponse);
    }
  }
  
  // Step 2: Validate CSRF protection
  const csrfResponse = validateCSRF(request);
  if (csrfResponse) {
    return applySecurityHeaders(csrfResponse);
  }
  
  // Step 3: Apply security headers to all responses
  const response = NextResponse.next();
  return applySecurityHeaders(response);
}

// Create a separate auth middleware export
export const config = {
  matcher: [
    // Apply to API endpoints
    '/api/auth/:path*',
    '/api/admin/:path*',
    '/api/contact/:path*',
    '/api/waitlist/:path*',
    '/admin/login',
  ],
}; 