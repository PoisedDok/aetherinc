import { NextResponse } from 'next/server';
import { prisma } from '@/lib/database';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { ApiError, ErrorType } from '@/lib/errorHandler';
import { withSecureErrorHandler } from '@/app/api/errorHandler';

// Add export configuration to indicate this route is dynamic
export const dynamic = 'force-dynamic';

async function checkAdminAuth() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'ADMIN') {
    return { isAuthorized: false };
  }
  return { isAuthorized: true };
}

export const GET = withSecureErrorHandler(async (request: Request) => {
  const auth = await checkAdminAuth();
  if (!auth.isAuthorized) {
    throw new ApiError('You are not authorized to export analytics data', ErrorType.AUTHORIZATION);
  }

  const url = new URL(request.url);
  const startDateStr = url.searchParams.get('startDate');
  const endDateStr = url.searchParams.get('endDate');

  let startDate = new Date(0); // default beginning of time
  let endDate = new Date(); // default now

  if (startDateStr) {
    startDate = new Date(startDateStr);
    if (isNaN(startDate.getTime())) {
      throw new ApiError('Invalid start date format', ErrorType.VALIDATION, { startDate: startDateStr });
    }
  }

  if (endDateStr) {
    endDate = new Date(endDateStr);
    if (isNaN(endDate.getTime())) {
      throw new ApiError('Invalid end date format', ErrorType.VALIDATION, { endDate: endDateStr });
    }
  }

  // Query analytics data
  const pageAnalytics = await prisma.analytics.findMany({
    where: {
      date: {
        gte: startDate,
        lte: endDate
      }
    },
    orderBy: { date: 'desc' }
  });

  // @ts-ignore - analyticsEvent exists on generated client
  const eventAnalytics = await prisma.analyticsEvent.findMany({
    where: {
      date: {
        gte: startDate,
        lte: endDate
      }
    },
    orderBy: { date: 'desc' }
  });

  // Create export data
  const exportData = {
    exportedAt: new Date().toISOString(),
    dateRange: {
      start: startDate.toISOString(),
      end: endDate.toISOString()
    },
    pageAnalytics,
    eventAnalytics
  };

  // Format the date for the filename
  const dateStr = new Date().toISOString().split('T')[0];
  
  // Return as downloadable JSON file
  return new NextResponse(JSON.stringify(exportData, null, 2), {
    headers: {
      'Content-Type': 'application/json',
      'Content-Disposition': `attachment; filename="analytics-${dateStr}.json"`
    }
  });
}); 