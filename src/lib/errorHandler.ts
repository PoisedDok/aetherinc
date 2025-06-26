import { NextResponse } from 'next/server';

// Error types
export enum ErrorType {
  VALIDATION = 'VALIDATION_ERROR',
  AUTHENTICATION = 'AUTHENTICATION_ERROR',
  AUTHORIZATION = 'AUTHORIZATION_ERROR',
  NOT_FOUND = 'NOT_FOUND',
  CONFLICT = 'CONFLICT',
  SERVER_ERROR = 'SERVER_ERROR',
  EXTERNAL_SERVICE = 'EXTERNAL_SERVICE_ERROR',
}

// Error status code mapping
const ERROR_STATUS_CODES = {
  [ErrorType.VALIDATION]: 400,
  [ErrorType.AUTHENTICATION]: 401,
  [ErrorType.AUTHORIZATION]: 403,
  [ErrorType.NOT_FOUND]: 404,
  [ErrorType.CONFLICT]: 409,
  [ErrorType.SERVER_ERROR]: 500,
  [ErrorType.EXTERNAL_SERVICE]: 502,
};

// API Error class
export class ApiError extends Error {
  type: ErrorType;
  details?: Record<string, any>;
  
  constructor(message: string, type: ErrorType = ErrorType.SERVER_ERROR, details?: Record<string, any>) {
    super(message);
    this.name = 'ApiError';
    this.type = type;
    this.details = details;
  }
}

// Define error response type
interface ErrorResponseType {
  type: ErrorType;
  message: string;
  details?: Record<string, any>;
}

/**
 * Handles API errors consistently
 * @param error - Error to handle
 * @param shouldLog - Whether to log the error (default: true)
 * @returns NextResponse with appropriate status and error details
 */
export function handleApiError(error: unknown, shouldLog = true): NextResponse {
  // Default error response
  let errorResponse = {
    success: false,
    error: {
      type: ErrorType.SERVER_ERROR,
      message: 'An unexpected error occurred',
    } as ErrorResponseType,
  };
  
  let statusCode = 500;
  
  // Handle ApiError instances
  if (error instanceof ApiError) {
    statusCode = ERROR_STATUS_CODES[error.type] || 500;
    errorResponse.error = {
      type: error.type,
      message: error.message,
      ...(error.details && { details: error.details }),
    };
  } 
  // Handle Prisma errors
  else if (error && typeof error === 'object' && 'code' in error && typeof error.code === 'string') {
    const prismaError = error as { code: string; meta?: Record<string, any> };
    
    // Map common Prisma error codes to API errors
    switch (prismaError.code) {
      case 'P2002': // Unique constraint violation
        statusCode = 409;
        errorResponse.error = {
          type: ErrorType.CONFLICT,
          message: 'A record with this identifier already exists',
          details: prismaError.meta,
        };
        break;
      case 'P2025': // Record not found
        statusCode = 404;
        errorResponse.error = {
          type: ErrorType.NOT_FOUND,
          message: 'The requested resource was not found',
          details: prismaError.meta,
        };
        break;
      default:
        // Keep default server error for other Prisma errors
        errorResponse.error.message = `Database error: ${prismaError.code}`;
        errorResponse.error.details = prismaError.meta;
    }
  } 
  // Handle standard errors
  else if (error instanceof Error) {
    errorResponse.error.message = error.message;
  }
  
  // Log error in development and production (unless disabled)
  if (shouldLog) {
    console.error('[API Error]', error);
  }
  
  // Return formatted error response
  return NextResponse.json(errorResponse, { status: statusCode });
}

/**
 * Wraps an API handler with error handling
 * @param handler - API route handler function
 * @returns Wrapped handler with error handling
 */
export function withErrorHandler(handler: Function) {
  return async (...args: any[]) => {
    try {
      return await handler(...args);
    } catch (error) {
      return handleApiError(error);
    }
  };
} 