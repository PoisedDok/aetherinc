import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { rateLimiter } from './lib/middleware/rateLimiter';

// Define redirect rules for common misspellings and variations
const redirectRules: Record<string,string> = {
  // Common misspellings of the domain
  '/aetherinc.com': 'https://aetherinc.xyz',
  '/www.aetherinc.com': 'https://aetherinc.xyz',
  '/aetherinc.net': 'https://aetherinc.xyz',
  '/www.aetherinc.net': 'https://aetherinc.xyz',
  '/aetherinc.org': 'https://aetherinc.xyz',
  '/www.aetherinc.org': 'https://aetherinc.xyz',

  // Common misspellings of the company name
  '/aether': 'https://aetherinc.xyz',
  '/aetherinc': 'https://aetherinc.xyz',
  '/aether-inc': 'https://aetherinc.xyz',
  '/aether_inc': 'https://aetherinc.xyz',
  '/aetherinc-ai': 'https://aetherinc.xyz',

  // Product name variations
  '/guru': 'https://aetherinc.xyz/products',
  '/guru-ai': 'https://aetherinc.xyz/products',
  '/guru-assistant': 'https://aetherinc.xyz/products',
  '/aetherarena': 'https://aetherinc.xyz/products',
  '/aether-arena': 'https://aetherinc.xyz/products',
  '/arena': 'https://aetherinc.xyz/products',

  // Service variations
  '/consulting': 'https://aetherinc.xyz/contact',
  '/ai-consulting': 'https://aetherinc.xyz/contact',
  '/services': 'https://aetherinc.xyz/contact',

  // Industry terms that should redirect to relevant pages
  '/privacy-ai': 'https://aetherinc.xyz',
  '/local-ai': 'https://aetherinc.xyz',
  '/edge-ai': 'https://aetherinc.xyz',
  '/on-device-ai': 'https://aetherinc.xyz',
  '/nvidia-jetson': 'https://aetherinc.xyz',
  '/iron-man-ai': 'https://aetherinc.xyz',
  '/jarvis-ai': 'https://aetherinc.xyz',

  // Legacy URLs or old page names
  '/about-us': 'https://aetherinc.xyz/about',
  '/contact-us': 'https://aetherinc.xyz/contact',
  '/products-and-services': 'https://aetherinc.xyz/products',

  // Social media and external links that should redirect
  '/twitter': 'https://twitter.com/aether_inc_ai',
  '/linkedin': 'https://www.linkedin.com/company/aetherinc',
  '/github': 'https://github.com/aetherinc',
};

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
  const { pathname, search } = request.nextUrl;
  const searchParams = search || '';

  // Don't process admin routes (handled by separate middleware)
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    return NextResponse.next();
  }

  // Handle redirects first
  const redirectUrl = redirectRules[pathname];
  if (redirectUrl) {
    const finalUrl = searchParams ? `${redirectUrl}${searchParams}` : redirectUrl;
    return NextResponse.redirect(finalUrl, {
      status: 301, // Permanent redirect for SEO
    });
  }

  // Handle case-insensitive redirects for common variations
  const lowerPathname = pathname.toLowerCase();
  if (lowerPathname.includes('ai') && !pathname.includes('/ai-tools')) {
    if (lowerPathname.includes('tool') || lowerPathname.includes('bot') || lowerPathname.includes('assistant')) {
      return NextResponse.redirect(`https://aetherinc.xyz/ai-tools${searchParams}`, {
        status: 302, // Temporary redirect for search queries
      });
    }
  }

  // Handle trailing slash redirects for SEO
  if (pathname.length > 1 && pathname.endsWith('/') && !pathname.startsWith('/_next')) {
    const pathWithoutTrailingSlash = pathname.slice(0, -1);
    return NextResponse.redirect(
      new URL(pathWithoutTrailingSlash + searchParams, request.url),
      { status: 301 }
    );
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
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files with extensions
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.).*)',
    // Also apply to API endpoints for rate limiting and security
    '/api/:path*',
    '/admin/login',
  ],
}; 