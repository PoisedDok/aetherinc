import { NextResponse } from 'next/server';
import { handleApiError } from '@/lib/errorHandler';
import { applySecurityHeaders } from '@/lib/middleware/securityHeaders';

/**
 * Error handler for Next.js API routes
 * Applies security headers to error responses
 */
export function withSecureErrorHandler(handler: Function) {
  return async (...args: any[]) => {
    try {
      // Get the response from the handler
      const response = await handler(...args);
      
      // Apply security headers to the response
      return applySecurityHeaders(response);
    } catch (error) {
      // Handle the error and apply security headers
      const errorResponse = handleApiError(error);
      return applySecurityHeaders(errorResponse);
    }
  };
} 