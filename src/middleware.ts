import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Get the pathname from the URL
  const { pathname } = request.nextUrl;

  // If it's the root path '/', make sure to show the landing page
  if (pathname === '/') {
    // Create a new URL object from the request URL
    const url = request.nextUrl.clone();
    
    // Reset any hash or search parameters that might be redirecting to the 'Try our AI' section
    url.hash = '';
    
    // Return the modified URL without any automatic scroll
    return NextResponse.rewrite(url);
  }

  // Continue with the request for all other paths
  return NextResponse.next();
}

// Configure the middleware to run only on specific paths
export const config = {
  matcher: '/',
}; 