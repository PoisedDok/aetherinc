import { NextRequest, NextResponse } from 'next/server';

// Simple in-memory store for rate limiting
// In production, use Redis or another distributed store
const ipRequests: Record<string, Record<string, { count: number; resetTime: number }>> = {};

// Configuration
const DEFAULT_WINDOW_SIZE = 60; // 60 seconds
const DEFAULT_MAX_REQUESTS = 10;

// Path-specific rate limits
const PATH_RATE_LIMITS: Record<string, { windowSize: number; maxRequests: number }> = {
  '/api/auth': { windowSize: 60, maxRequests: 5 },       // Stricter limits for auth
  '/admin/login': { windowSize: 60, maxRequests: 5 },    // Stricter limits for login
  '/api/contact': { windowSize: 60, maxRequests: 3 },    // Very strict for contact form (prevent spam)
  '/api/waitlist': { windowSize: 60, maxRequests: 3 },   // Very strict for waitlist (prevent spam)
};

/**
 * Rate limiting middleware for sensitive routes
 * Limits requests based on IP address and path
 */
export function rateLimiter(req: NextRequest) {
  // Get client IP and path
  const ip = req.ip || '127.0.0.1';
  const path = getBasePath(req.nextUrl.pathname);
  const now = Date.now();
  
  // Get path-specific rate limit settings or use defaults
  let windowSize = DEFAULT_WINDOW_SIZE;
  let maxRequests = DEFAULT_MAX_REQUESTS;
  
  // Check if we have specific settings for this path
  for (const [pathPrefix, settings] of Object.entries(PATH_RATE_LIMITS)) {
    if (req.nextUrl.pathname.startsWith(pathPrefix)) {
      windowSize = settings.windowSize;
      maxRequests = settings.maxRequests;
      break;
    }
  }
  
  // Initialize IP tracking if needed
  if (!ipRequests[ip]) {
    ipRequests[ip] = {};
  }
  
  // Initialize or reset if window expired
  if (!ipRequests[ip][path] || ipRequests[ip][path].resetTime < now) {
    ipRequests[ip][path] = {
      count: 1,
      resetTime: now + windowSize * 1000
    };
    return null; // Allow the request
  }
  
  // Increment request count
  ipRequests[ip][path].count += 1;
  
  // Check if over limit
  if (ipRequests[ip][path].count > maxRequests) {
    // Calculate seconds until reset
    const secondsUntilReset = Math.ceil((ipRequests[ip][path].resetTime - now) / 1000);
    
    // Return rate limit response
    return new NextResponse(
      JSON.stringify({
        success: false,
        message: 'Rate limit exceeded. Please try again later.',
        retryAfter: secondsUntilReset
      }),
      {
        status: 429,
        headers: {
          'Content-Type': 'application/json',
          'X-RateLimit-Limit': maxRequests.toString(),
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': Math.ceil(ipRequests[ip][path].resetTime / 1000).toString(),
          'Retry-After': secondsUntilReset.toString()
        }
      }
    );
  }
  
  // Add rate limit headers even when not exceeded
  const remainingRequests = maxRequests - ipRequests[ip][path].count;
  const response = NextResponse.next();
  
  response.headers.set('X-RateLimit-Limit', maxRequests.toString());
  response.headers.set('X-RateLimit-Remaining', remainingRequests.toString());
  response.headers.set('X-RateLimit-Reset', Math.ceil(ipRequests[ip][path].resetTime / 1000).toString());
  
  return response;
}

/**
 * Gets the base path for rate limiting
 * Groups similar paths together (e.g., /api/users/1 and /api/users/2 -> /api/users)
 */
function getBasePath(pathname: string): string {
  // Match /api/resource pattern and group by resource
  const apiMatch = pathname.match(/^(\/api\/[^\/]+)/);
  if (apiMatch) return apiMatch[1];
  
  // For admin pages
  const adminMatch = pathname.match(/^(\/admin\/[^\/]+)/);
  if (adminMatch) return adminMatch[1];
  
  // Default to full path
  return pathname;
}

/**
 * Clean up expired rate limit entries
 * Call this periodically to prevent memory leaks
 */
export function cleanupRateLimiter() {
  const now = Date.now();
  Object.keys(ipRequests).forEach(ip => {
    Object.keys(ipRequests[ip]).forEach(path => {
      if (ipRequests[ip][path].resetTime < now) {
        delete ipRequests[ip][path];
      }
    });
    
    // Remove IP entry if all paths are cleared
    if (Object.keys(ipRequests[ip]).length === 0) {
      delete ipRequests[ip];
    }
  });
}

// Set up cleanup interval (every 5 minutes)
if (typeof window === 'undefined') { // Only run on server
  setInterval(cleanupRateLimiter, 5 * 60 * 1000);
}