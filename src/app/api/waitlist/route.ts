import { NextRequest, NextResponse } from 'next/server';
import { addWaitlistEntry } from '@/lib/waitlist';

export async function POST(request: NextRequest) {
  try {
    // Get client IP
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    
    // Parse request body
    const body = await request.json();
    const { name, email, reason, useCase, earlyAccess } = body;
    
    // Validate required fields
    if (!email || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      return NextResponse.json(
        { success: false, message: 'Invalid email address' },
        { status: 400 }
      );
    }
    
    if (!name || name.trim() === '') {
      return NextResponse.json(
        { success: false, message: 'Name is required' },
        { status: 400 }
      );
    }
    
    // Add to waitlist with all fields
    const success = addWaitlistEntry({
      name,
      email,
      reason,
      useCase,
      earlyAccess: !!earlyAccess,
      ip
    });
    
    if (success) {
      return NextResponse.json({
        success: true,
        message: 'Successfully added to waitlist'
      });
    } else {
      return NextResponse.json({
        success: false,
        message: 'Email already exists in waitlist'
      });
    }
  } catch (error) {
    console.error('Error processing waitlist submission:', error);
    return NextResponse.json(
      { success: false, message: 'Server error processing request' },
      { status: 500 }
    );
  }
} 