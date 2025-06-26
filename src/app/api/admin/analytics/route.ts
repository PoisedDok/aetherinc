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
export async function GET(request: Request) {
  const auth = await checkAdminAuth();
  
  if (!auth.isAuthorized) {
    return NextResponse.json(
      { success: false, message: 'Unauthorized' },
      { status: 401 }
    );
  }
  
  try {
    // Parse query parameters
    const url = new URL(request.url);
    const startDateStr = url.searchParams.get('startDate');
    const endDateStr = url.searchParams.get('endDate');
    
    let startDate = new Date();
    startDate.setDate(startDate.getDate() - 30); // Default to last 30 days
    startDate.setHours(0, 0, 0, 0);
    
    let endDate = new Date();
    endDate.setHours(23, 59, 59, 999);
    
    if (startDateStr) {
      startDate = new Date(startDateStr);
      startDate.setHours(0, 0, 0, 0);
    }
    
    if (endDateStr) {
      endDate = new Date(endDateStr);
      endDate.setHours(23, 59, 59, 999);
    }
    
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
    
    // Get page analytics data for the selected date range
    const pageAnalytics = await prisma.analytics.findMany({
      where: {
        date: {
          gte: startDate,
          lte: endDate
        }
      },
      orderBy: {
        date: 'asc'
      }
    });
    
    // @ts-ignore - property will exist on generated Prisma client
    const eventAnalytics = await prisma.analyticsEvent.findMany({
      where: {
        date: {
          gte: startDate,
          lte: endDate
        }
      },
      orderBy: {
        count: 'desc'
      },
      take: 50 // Limit to top 50 events
    });
    
    // Process page analytics data
    const pageViewsByDate: Record<string, { pageViews: number; uniqueViews: number }> = {};
    const pageViewsByPage: Record<string, { pageViews: number; uniqueViews: number }> = {};
    const pageVisitorSets: Record<string, Set<string>> = {};
    const globalVisitorSet: Set<string> = new Set();
    let totalPageViews = 0;
    
    pageAnalytics.forEach(record => {
      // Aggregate by date
      const dateStr = record.date.toISOString().split('T')[0];
      if (!pageViewsByDate[dateStr]) {
        pageViewsByDate[dateStr] = {
          pageViews: 0,
          uniqueViews: 0
        };
      }
      pageViewsByDate[dateStr].pageViews += record.pageViews;
      
      // Aggregate by page
      if (!pageViewsByPage[record.page]) {
        pageViewsByPage[record.page] = {
          pageViews: 0,
          uniqueViews: 0
        };
        pageVisitorSets[record.page] = new Set<string>();
      }
      pageViewsByPage[record.page].pageViews += record.pageViews;
      
      // Total counts
      totalPageViews += record.pageViews;
      
      // Parse visitors JSON to count unique visitors across all pages
      try {
        const visitors = JSON.parse(record.visitors);
        const visitorIds = Object.keys(visitors);
        visitorIds.forEach((id) => {
          globalVisitorSet.add(id);
          pageVisitorSets[record.page].add(id);
          // Track unique per date too
          if (!pageViewsByDate[dateStr].hasOwnProperty('visitorSet')) {
            (pageViewsByDate[dateStr] as any).visitorSet = new Set<string>();
          }
          ((pageViewsByDate[dateStr] as any).visitorSet as Set<string>).add(id);
        });
      } catch (e) {
        // Skip if JSON parsing fails
      }
    });
    
    // Finalize unique counts after de-duping
    const totalUniqueVisitors = globalVisitorSet.size;
    
    // Update per-page unique counts
    Object.keys(pageViewsByPage).forEach((page) => {
      pageViewsByPage[page].uniqueViews = pageVisitorSets[page].size;
    });
    
    // Update per-date unique counts
    Object.keys(pageViewsByDate).forEach((date) => {
      const visitorSet = (pageViewsByDate[date] as any).visitorSet as Set<string> | undefined;
      pageViewsByDate[date].uniqueViews = visitorSet ? visitorSet.size : 0;
      delete (pageViewsByDate[date] as any).visitorSet;
    });
    
    // Process event analytics data
    const eventsByType: Record<string, number> = {};
    const eventsByPage: Record<string, number> = {};
    
    eventAnalytics.forEach((event: any) => {
      // Aggregate by event type
      if (!eventsByType[event.eventType]) {
        eventsByType[event.eventType] = 0;
      }
      eventsByType[event.eventType] += event.count;
      
      // Aggregate by page
      if (!eventsByPage[event.page]) {
        eventsByPage[event.page] = 0;
      }
      eventsByPage[event.page] += event.count;
    });
    
    // Format response data
    const analyticsData = {
      totalWaitlist,
      totalTools,
      totalNews,
      recentSignups,
      pageViews: {
        total: totalPageViews,
        unique: totalUniqueVisitors,
        byDate: pageViewsByDate,
        byPage: pageViewsByPage
      },
      events: {
        byType: eventsByType,
        byPage: eventsByPage,
        topEvents: eventAnalytics.map((e: any) => ({
          id: e.id,
          eventType: e.eventType,
          elementId: e.elementId,
          elementName: e.elementName,
          page: e.page,
          count: e.count,
          date: e.date
        }))
      }
    };
    
    return NextResponse.json({
      success: true,
      data: analyticsData
    });
  } catch (error) {
    console.error('Error fetching analytics data:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch analytics data' },
      { status: 500 }
    );
  }
} 