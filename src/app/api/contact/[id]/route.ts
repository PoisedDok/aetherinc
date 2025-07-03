import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/database';
import { withSecureErrorHandler } from '@/app/api/errorHandler';
import { ApiError, ErrorType } from '@/lib/errorHandler';

export const PATCH = withSecureErrorHandler(async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const { id } = params;
    const data = await request.json();
    
    if (!id) {
      throw new ApiError('Missing contact form ID', ErrorType.VALIDATION);
    }
    
    // Validate the status if provided
    if (data.status && !['NEW', 'RESPONDED', 'CLOSED'].includes(data.status)) {
      throw new ApiError('Invalid status value', ErrorType.VALIDATION, {
        allowedStatuses: ['NEW', 'RESPONDED', 'CLOSED']
      });
    }
    
    // Update the contact form
    const updatedContactForm = await db.contactForm.update({
      where: { id },
      data: {
        status: data.status,
        updatedAt: new Date()
      }
    });
    
    return NextResponse.json({
      success: true,
      message: 'Contact form updated successfully',
      data: updatedContactForm
    });
    
  } catch (error: any) {
    // Check if it's a Prisma error
    if (error.code === 'P2025') {
      throw new ApiError('Contact form not found', ErrorType.NOT_FOUND);
    }
    
    // Rethrow other errors to be handled by the error handler
    throw error;
  }
});

export const GET = withSecureErrorHandler(async (
  _request: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const { id } = params;
    
    if (!id) {
      throw new ApiError('Missing contact form ID', ErrorType.VALIDATION);
    }
    
    // Get the contact form
    const contactForm = await db.contactForm.findUnique({
      where: { id }
    });
    
    if (!contactForm) {
      throw new ApiError('Contact form not found', ErrorType.NOT_FOUND);
    }
    
    return NextResponse.json({
      success: true,
      data: contactForm
    });
    
  } catch (error) {
    // Rethrow errors to be handled by the error handler
    throw error;
  }
});

export const DELETE = withSecureErrorHandler(async (
  _request: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const { id } = params;
    
    if (!id) {
      throw new ApiError('Missing contact form ID', ErrorType.VALIDATION);
    }
    
    // Delete the contact form
    await db.contactForm.delete({
      where: { id }
    });
    
    return NextResponse.json({
      success: true,
      message: 'Contact form deleted successfully'
    });
    
  } catch (error: any) {
    // Check if it's a Prisma error
    if (error.code === 'P2025') {
      throw new ApiError('Contact form not found', ErrorType.NOT_FOUND);
    }
    
    // Rethrow other errors to be handled by the error handler
    throw error;
  }
}); 