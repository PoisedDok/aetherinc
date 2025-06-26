import { NextResponse } from 'next/server';
import { prisma } from '@/lib/database';

export async function POST(request: Request) {
  try {
    const { eventType, elementId, elementName, page, visitorId } = await request.json();
    
    if (!eventType || !elementId || !page) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Get current date (without time) for daily aggregation
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Find analytics event entry for this event type, element, page and date
    const analyticsEvent = await prisma.analyticsEvent.findFirst({
      where: {
        eventType,
        elementId,
        page,
        date: {
          gte: today,
          lt: new Date(today.getTime() + 24 * 60 * 60 * 1000)
        }
      }
    });
    
    if (analyticsEvent) {
      // Update existing entry
      await prisma.analyticsEvent.update({
        where: { id: analyticsEvent.id },
        data: {
          count: analyticsEvent.count + 1
        }
      });
    } else {
      // Create new entry
      await prisma.analyticsEvent.create({
        data: {
          eventType,
          elementId,
          elementName,
          page,
          count: 1,
          date: today
        }
      });
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error tracking event:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to track event' },
      { status: 500 }
    );
  }
} 