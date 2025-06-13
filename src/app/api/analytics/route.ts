import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/database';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const timeframe = searchParams.get('timeframe') || '7d';
    
    // Calculate date range
    const now = new Date();
    let startDate = new Date();
    
    switch (timeframe) {
      case '24h':
        startDate.setHours(now.getHours() - 24);
        break;
      case '7d':
        startDate.setDate(now.getDate() - 7);
        break;
      case '30d':
        startDate.setDate(now.getDate() - 30);
        break;
      case '90d':
        startDate.setDate(now.getDate() - 90);
        break;
      default:
        startDate.setDate(now.getDate() - 7);
    }

    // Get basic stats
    const [
      totalUsers,
      totalWaitlist,
      totalTools,
      totalNews,
      recentWaitlist,
      recentUsers,
      toolsByCategory,
      waitlistBySource,
      dailyActivity
    ] = await Promise.all([
      // Total counts
      db.user.count(),
      db.waitlist.count(),
      db.aiTools.count({ where: { isActive: true } }),
      db.news.count({ where: { isPublished: true } }),
      
      // Recent activity (last 7 days)
      db.waitlist.count({
        where: {
          createdAt: {
            gte: startDate
          }
        }
      }),
      
      db.user.count({
        where: {
          createdAt: {
            gte: startDate
          }
        }
      }),
      
      // Tools by category
      db.aiTools.groupBy({
        by: ['category'],
        where: { isActive: true },
        _count: {
          category: true
        }
      }),
      
      // Waitlist by source (if available)
      db.waitlist.groupBy({
        by: ['source'],
        _count: {
          source: true
        }
      }),
      
      // Daily activity for the last 30 days
      db.waitlist.findMany({
        where: {
          createdAt: {
            gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
          }
        },
        select: {
          createdAt: true
        },
        orderBy: {
          createdAt: 'desc'
        }
      })
    ]);

    // Process daily activity data
    const dailyStats = processDailyActivity(dailyActivity);
    
    // Get top referrer sources
    const topSources = waitlistBySource
      .map(item => ({
        source: item.source || 'Direct',
        count: item._count.source
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    // Calculate growth rates
    const previousPeriodStart = new Date(startDate);
    previousPeriodStart.setTime(startDate.getTime() - (now.getTime() - startDate.getTime()));
    
    const [previousWaitlist, previousUsers] = await Promise.all([
      db.waitlist.count({
        where: {
          createdAt: {
            gte: previousPeriodStart,
            lt: startDate
          }
        }
      }),
      db.user.count({
        where: {
          createdAt: {
            gte: previousPeriodStart,
            lt: startDate
          }
        }
      })
    ]);

    const waitlistGrowth = previousWaitlist > 0 
      ? ((recentWaitlist - previousWaitlist) / previousWaitlist) * 100 
      : recentWaitlist > 0 ? 100 : 0;
      
    const userGrowth = previousUsers > 0 
      ? ((recentUsers - previousUsers) / previousUsers) * 100 
      : recentUsers > 0 ? 100 : 0;

    return NextResponse.json({
      success: true,
      data: {
        overview: {
          totalUsers,
          totalWaitlist,
          totalTools,
          totalNews,
          recentWaitlist,
          recentUsers,
          waitlistGrowth: Math.round(waitlistGrowth * 100) / 100,
          userGrowth: Math.round(userGrowth * 100) / 100
        },
        charts: {
          toolsByCategory: toolsByCategory.map(item => ({
            category: item.category,
            count: item._count.category
          })),
          topSources,
          dailyActivity: dailyStats
        },
        timeframe,
        lastUpdated: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch analytics data' },
      { status: 500 }
    );
  }
}

function processDailyActivity(activities: { createdAt: Date }[]) {
  const dailyMap = new Map<string, number>();
  
  // Initialize last 30 days
  for (let i = 29; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const dateKey = date.toISOString().split('T')[0];
    dailyMap.set(dateKey, 0);
  }
  
  // Count activities by day
  activities.forEach(activity => {
    const dateKey = activity.createdAt.toISOString().split('T')[0];
    dailyMap.set(dateKey, (dailyMap.get(dateKey) || 0) + 1);
  });
  
  // Convert to array format
  return Array.from(dailyMap.entries()).map(([date, count]) => ({
    date,
    count
  }));
} 