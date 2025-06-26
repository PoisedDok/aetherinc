import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Middleware to add security headers to responses
 * Helps protect against various web vulnerabilities
 */
export function securityHeaders(request: NextRequest, response: NextResponse) {
  // Content Security Policy
  // Customize this based on your application's needs
  const contentSecurityPolicy = `
    default-src 'self';
    script-src 'self' 'unsafe-inline' 'unsafe-eval';
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data: https://*.githubusercontent.com https://*.vercel.sh https://seeklogo.com;
    font-src 'self';
    connect-src 'self' https://api.github.com;
    frame-ancestors 'none';
    form-action 'self';
  `.replace(/\s{2,}/g, ' ').trim();

  // Set security headers
  const headers = response.headers;
  
  // Content Security Policy
  headers.set('Content-Security-Policy', contentSecurityPolicy);
  
  // Prevent MIME type sniffing
  headers.set('X-Content-Type-Options', 'nosniff');
  
  // Prevent clickjacking
  headers.set('X-Frame-Options', 'DENY');
  
  // Control browser features
  headers.set(
    'Permissions-Policy', 
    'camera=(), microphone=(), geolocation=(), interest-cohort=()'
  );
  
  // Control referrer information
  headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  // Enable browser XSS protection
  headers.set('X-XSS-Protection', '1; mode=block');
  
  return response;
}

/**
 * Apply security headers to a response
 * Use this in API routes where middleware doesn't apply
 */
export function applySecurityHeaders(response: NextResponse): NextResponse {
  // Content Security Policy
  const contentSecurityPolicy = `
    default-src 'self';
    script-src 'self' 'unsafe-inline' 'unsafe-eval';
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data: https://*.githubusercontent.com https://*.vercel.sh https://seeklogo.com;
    font-src 'self';
    connect-src 'self' https://api.github.com;
    frame-ancestors 'none';
    form-action 'self';
  `.replace(/\s{2,}/g, ' ').trim();

  // Set security headers
  response.headers.set('Content-Security-Policy', contentSecurityPolicy);
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set(
    'Permissions-Policy', 
    'camera=(), microphone=(), geolocation=(), interest-cohort=()'
  );
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  
  return response;
} 