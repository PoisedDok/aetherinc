import { NextResponse } from 'next/server';
import { prisma } from '@/lib/database';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { withSecureErrorHandler } from '@/app/api/errorHandler';

// Middleware to check admin auth
async function checkAdminAuth() {
  const session = await getServerSession(authOptions);
  
  if (!session || session.user.role !== 'ADMIN') {
    return { isAuthorized: false };
  }
  
  return { isAuthorized: true, userId: session.user.id };
}

// Helper function to format date for Prisma query
const formatDateForQuery = (dateString: string) => {
  const date = new Date(dateString);
  // Reset to midnight
  date.setHours(0, 0, 0, 0);
  return date;
};

// GET /api/admin/analytics - Get analytics data
export const GET = withSecureErrorHandler(async (request: Request) => {
  const auth = await checkAdminAuth();
  
  if (!auth.isAuthorized) {
    return NextResponse.json(
      { success: false, message: 'Unauthorized' },
      { status: 401 }
    );
  }
  
  try {
    console.log('Analytics API called - fetching data...');
    const { searchParams } = new URL(request.url);
    const startDateParam = searchParams.get('startDate');
    const endDateParam = searchParams.get('endDate');
    
    // Default to last 30 days if no dates provided
    let startDate = new Date();
    startDate.setDate(startDate.getDate() - 30);
    startDate.setHours(0, 0, 0, 0);
    
    let endDate = new Date();
    endDate.setHours(23, 59, 59, 999);
    
    if (startDateParam) {
      startDate = formatDateForQuery(startDateParam);
    }
    
    if (endDateParam) {
      endDate = new Date(endDateParam);
      endDate.setHours(23, 59, 59, 999);
    }
    
    console.log(`Date range: ${startDate.toISOString()} to ${endDate.toISOString()}`);
    
    // Count total waitlist entries
    const totalWaitlist = await prisma.waitlistEntry.count();
    console.log(`Total waitlist entries: ${totalWaitlist}`);
    
    // Count total AI tools
    const totalTools = await prisma.aITool.count();
    console.log(`Total AI tools: ${totalTools}`);
    
    // Count total contact forms
    const totalContactForms = await prisma.contactForm.count();
    console.log(`Total contact forms: ${totalContactForms}`);
    
    // Get recent signups (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    sevenDaysAgo.setHours(0, 0, 0, 0);
    
    const recentSignups = await prisma.waitlistEntry.count({
      where: {
        createdAt: {
          gte: sevenDaysAgo
        }
      }
    });
    console.log(`Recent signups: ${recentSignups}`);
    
    // Fetch page views data
    const pageViews = await prisma.analytics.findMany({
      where: {
        date: {
          gte: startDate,
          lte: endDate
        }
      }
    });
    
    // Aggregate page view data by date and by page
    const viewsByDate = pageViews.reduce((acc, entry) => {
      const dateKey = entry.date.toISOString().split('T')[0];
      
      if (!acc[dateKey]) {
        acc[dateKey] = {
          pageViews: 0,
          uniqueViews: 0
        };
      }
      
      acc[dateKey].pageViews += entry.pageViews;
      acc[dateKey].uniqueViews += entry.uniqueViews;
      
      return acc;
    }, {} as Record<string, { pageViews: number, uniqueViews: number }>);
    
    const viewsByPage = pageViews.reduce((acc, entry) => {
      if (!acc[entry.page]) {
        acc[entry.page] = {
          pageViews: 0,
          uniqueViews: 0
        };
      }
      
      acc[entry.page].pageViews += entry.pageViews;
      acc[entry.page].uniqueViews += entry.uniqueViews;
      
      return acc;
    }, {} as Record<string, { pageViews: number, uniqueViews: number }>);
    
    // Calculate total page views
    const totalPageViews = pageViews.reduce((sum, entry) => sum + entry.pageViews, 0);
    const totalUniqueViews = pageViews.reduce((sum, entry) => sum + entry.uniqueViews, 0);
    
    // Fetch events data
    const events = await prisma.analyticsEvent.findMany({
      where: {
        date: {
          gte: startDate,
          lte: endDate
        }
      },
      orderBy: {
        count: 'desc'
      },
      take: 100
    });
    
    // Aggregate event data
    const eventsByType = events.reduce((acc, event) => {
      if (!acc[event.eventType]) {
        acc[event.eventType] = 0;
      }
      
      acc[event.eventType] += event.count;
      return acc;
    }, {} as Record<string, number>);
    
    const eventsByPage = events.reduce((acc, event) => {
      if (!acc[event.page]) {
        acc[event.page] = 0;
      }
      
      acc[event.page] += event.count;
      return acc;
    }, {} as Record<string, number>);
    
    // Get terminal chat data
    const terminalChats = await prisma.terminalChat.findMany({
      where: {
        timestamp: {
          gte: startDate,
          lte: endDate
        }
      },
      orderBy: {
        timestamp: 'desc'
      },
      take: 1000
    });
    
    // Aggregate terminal chat data
    const totalTerminalChats = terminalChats.length;
    
    const chatsByRole = terminalChats.reduce((acc, chat) => {
      if (!acc[chat.role]) {
        acc[chat.role] = 0;
      }
      
      acc[chat.role]++;
      return acc;
    }, {} as Record<string, number>);
    
    const chatsByPage = terminalChats.reduce((acc, chat) => {
      const page = chat.page || 'unknown';
      
      if (!acc[page]) {
        acc[page] = 0;
      }
      
      acc[page]++;
      return acc;
    }, {} as Record<string, number>);
    
    // Count unique sessions and visitors
    const uniqueSessions = new Set(terminalChats.map(chat => chat.sessionId)).size;
    const uniqueVisitors = new Set(terminalChats.filter(chat => chat.visitorId).map(chat => chat.visitorId)).size;
    
    // Get most recent chats by session
    const chatsBySession = terminalChats.reduce((acc, chat) => {
      if (!acc[chat.sessionId]) {
        acc[chat.sessionId] = [];
      }
      
      acc[chat.sessionId].push(chat);
      return acc;
    }, {} as Record<string, any[]>);
    
    // Sort chats by timestamp within each session
    Object.keys(chatsBySession).forEach(sessionId => {
      chatsBySession[sessionId].sort((a, b) => 
        new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
      );
    });
    
    // Return analytics data
    return NextResponse.json({
      success: true,
      data: {
        totalWaitlist,
        totalTools,
        totalContactForms,
        recentSignups,
        pageViews: {
          total: totalPageViews,
          unique: totalUniqueViews,
          byDate: viewsByDate,
          byPage: viewsByPage
        },
        events: {
          byType: eventsByType,
          byPage: eventsByPage,
          topEvents: events
        },
        terminalChat: {
          total: totalTerminalChats,
          uniqueSessions,
          uniqueVisitors,
          byRole: chatsByRole,
          byPage: chatsByPage,
          recentSessions: Object.values(chatsBySession).slice(0, 10) // Get 10 most recent sessions
        }
      }
    });
  } catch (error) {
    console.error('Error fetching analytics data:', error);
    throw error;
  }
}); 