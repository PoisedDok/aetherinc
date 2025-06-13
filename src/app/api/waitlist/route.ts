import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/database';

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
        { success: false, message: 'Invalid email address', error: 'Invalid email address' },
        { status: 400 }
      );
    }
    
    if (!name || name.trim() === '') {
      return NextResponse.json(
        { success: false, message: 'Name is required', error: 'Name is required' },
        { status: 400 }
      );
    }
    
    // Check if email already exists in the database
    const existingEntry = await prisma.waitlistEntry.findUnique({
      where: { email }
    });

    if (existingEntry) {
      return NextResponse.json(
        { success: false, message: 'Email already exists in waitlist', error: 'Email already exists in waitlist' },
        { status: 409 }
      );
    }

    // Create a new waitlist entry
    await prisma.waitlistEntry.create({
      data: {
        name,
        email,
        reason,
        useCase,
        earlyAccess: !!earlyAccess,
        ip
      }
    });

    return NextResponse.json({
      success: true,
      message: 'Successfully added to waitlist'
    });
  } catch (error) {
    console.error('Error processing waitlist submission:', error);
    return NextResponse.json(
      { success: false, message: 'Server error processing request', error: 'Server error processing request' },
      { status: 500 }
    );
  }
} 