import { NextResponse } from 'next/server';
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

// GET /api/admin/analytics - Get analytics data
export async function GET() {
  const auth = await checkAdminAuth();
  
  if (!auth.isAuthorized) {
    return NextResponse.json(
      { success: false, message: 'Unauthorized' },
      { status: 401 }
    );
  }
  
  try {
    // Get total waitlist count
    const totalWaitlist = await prisma.waitlistEntry.count();
    
    // Get total AI tools count
    const totalTools = await prisma.aITool.count();
    
    // Get total news articles count
    const totalNews = await prisma.newsArticle.count();
    
    // Get recent signups (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    const recentSignups = await prisma.waitlistEntry.count({
      where: {
        createdAt: {
          gte: sevenDaysAgo
        }
      }
    });
    
    return NextResponse.json({
      success: true,
      data: {
        totalWaitlist,
        totalTools,
        totalNews,
        recentSignups
      }
    });
  } catch (error) {
    console.error('Error fetching analytics data:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch analytics data' },
      { status: 500 }
    );
  }
} 