import { NextResponse } from 'next/server';
import { prisma } from '@/lib/database';
import { Prisma } from '@prisma/client';
import { ApiError, ErrorType } from '@/lib/errorHandler';
import { withSecureErrorHandler } from '@/app/api/errorHandler';

interface Visitor {
  lastSeen: string;
  referrer: string;
}

interface VisitorRecord {
  [visitorId: string]: Visitor;
}

export const POST = withSecureErrorHandler(async (request: Request) => {
  try {
    const data = await request.json();
    const { page, visitorId, referrer } = data;
    
    if (!page || !visitorId) {
      throw new ApiError('Missing required fields', ErrorType.VALIDATION, {
        missingFields: [
          ...(!page ? ['page'] : []),
          ...(!visitorId ? ['visitorId'] : [])
        ]
      });
    }
    
    // Get current date (without time) for daily aggregation
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Find analytics entry for this page and date
    const analytics = await prisma.analytics.findUnique({
      where: {
        page_date: {
          page,
          date: today,
        },
      },
    });
    
    if (analytics) {
      // Update existing entry
      let visitors: VisitorRecord = {};
      try {
        visitors = JSON.parse(analytics.visitors);
      } catch (e) {
        visitors = {};
      }
      
      // Check if this visitor has already been counted today
      const isNewVisitor = !visitors[visitorId];
      
      // Add visitor to the tracking object
      visitors[visitorId] = {
        lastSeen: new Date().toISOString(),
        referrer: referrer || 'direct'
      };
      
      await prisma.analytics.update({
        where: { id: analytics.id },
        data: {
          pageViews: analytics.pageViews + 1,
          uniqueViews: isNewVisitor ? analytics.uniqueViews + 1 : analytics.uniqueViews,
          visitors: JSON.stringify(visitors)
        }
      });
    } else {
      // Create new entry
      const visitors: VisitorRecord = {
        [visitorId]: {
          lastSeen: new Date().toISOString(),
          referrer: referrer || 'direct'
        }
      };
      
      try {
        await prisma.analytics.create({
          data: {
            page,
            pageViews: 1,
            uniqueViews: 1,
            visitors: JSON.stringify(visitors),
            date: today
          }
        });
      } catch (err) {
        // Handle race condition where another request created the entry first
        if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2002') {
          // Re-fetch the entry that now exists
          const existing = await prisma.analytics.findUnique({
            where: {
              page_date: {
                page,
                date: today,
              },
            },
          });

          if (existing) {
            let existingVisitors: VisitorRecord = {};
            try {
              existingVisitors = JSON.parse(existing.visitors);
            } catch (e) {
              existingVisitors = {};
            }

            const isNewVisitor = !existingVisitors[visitorId];

            existingVisitors[visitorId] = {
              lastSeen: new Date().toISOString(),
              referrer: referrer || 'direct'
            };

            await prisma.analytics.update({
              where: { id: existing.id },
              data: {
                pageViews: existing.pageViews + 1,
                uniqueViews: isNewVisitor ? existing.uniqueViews + 1 : existing.uniqueViews,
                visitors: JSON.stringify(existingVisitors)
              }
            });
          }
        } else {
          // Let the error handler deal with this
          throw err;
        }
      }
    }
    
    return NextResponse.json({ success: true });
  } catch (err) {
    throw err;
  }
}); 