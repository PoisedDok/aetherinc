import { NextResponse } from 'next/server';
import { prisma } from '@/lib/database';

export async function GET() {
  try {
    // Test basic database operations
    const counts = {
      waitlistCount: await prisma.waitlistEntry.count(),
      toolsCount: await prisma.aITool.count(),
      contactCount: await prisma.contactForm.count(),
      analyticsCount: await prisma.analytics.count(),
      eventsCount: await prisma.analyticsEvent.count(),
    };
    
    // Return the counts
    return NextResponse.json({
      success: true,
      message: 'Database connection test successful',
      counts,
      dbUrl: process.env.DATABASE_URL?.replace(/:[^:@]*@/, ':***@'), // Hide password
    });
  } catch (error) {
    console.error('Database test error:', error);
    return NextResponse.json({
      success: false,
      message: 'Database connection test failed',
      error: error instanceof Error ? error.message : String(error),
    }, { status: 500 });
  }
} 