import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/database';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// Middleware to check admin auth
async function checkAdminAuth() {
  const session = await getServerSession(authOptions);
  
  if (!session || session.user.role !== 'ADMIN') {
    return { isAuthorized: false };
  }
  
  return { isAuthorized: true, userId: session.user.id };
}

// GET /api/admin/waitlist - Get all waitlist entries
export async function GET() {
  const auth = await checkAdminAuth();
  
  if (!auth.isAuthorized) {
    return NextResponse.json(
      { success: false, message: 'Unauthorized' },
      { status: 401 }
    );
  }
  
  try {
    const entries = await prisma.waitlistEntry.findMany({
      orderBy: { createdAt: 'desc' }
    });
    
    // Format entries for the frontend
    const formattedEntries = entries.map((entry: any) => ({
      id: entry.id,
      name: entry.name,
      email: entry.email,
      useCase: entry.useCase || '',
      reason: entry.reason || '',
      createdAt: entry.createdAt.toISOString().split('T')[0]
    }));
    
    return NextResponse.json({
      success: true,
      data: formattedEntries
    });
  } catch (error) {
    console.error('Error fetching waitlist entries:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch waitlist entries' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/waitlist/[id] - Delete a waitlist entry
export async function DELETE(request: NextRequest) {
  const id = request.nextUrl.pathname.split('/').pop();
  
  if (!id) {
    return NextResponse.json(
      { success: false, message: 'Missing entry ID' },
      { status: 400 }
    );
  }
  
  const auth = await checkAdminAuth();
  
  if (!auth.isAuthorized) {
    return NextResponse.json(
      { success: false, message: 'Unauthorized' },
      { status: 401 }
    );
  }
  
  try {
    await prisma.waitlistEntry.delete({
      where: { id }
    });
    
    return NextResponse.json({
      success: true,
      message: 'Waitlist entry deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting waitlist entry:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete waitlist entry' },
      { status: 500 }
    );
  }
} 