import { NextResponse } from 'next/server';
import { prisma } from '@/lib/database';
import { ApiError, ErrorType } from '@/lib/errorHandler';
import { withSecureErrorHandler } from '@/app/api/errorHandler';

export const POST = withSecureErrorHandler(async (request: Request) => {
  try {
    const { sessionId, visitorId, role, content, page, metadata } = await request.json();
    
    if (!sessionId || !role || !content) {
      throw new ApiError('Missing required fields', ErrorType.VALIDATION, {
        missingFields: [
          ...(!sessionId ? ['sessionId'] : []),
          ...(!role ? ['role'] : []),
          ...(!content ? ['content'] : [])
        ]
      });
    }
    
    // Save the chat message to the database
    await prisma.terminalChat.create({
      data: {
        sessionId,
        visitorId,
        role,
        content,
        page,
        metadata: metadata || {},
      }
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving terminal chat:', error);
    throw error;
  }
});

export const GET = withSecureErrorHandler(async (request: Request) => {
  try {
    // Parse query parameters
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('sessionId');
    const visitorId = searchParams.get('visitorId');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const limit = parseInt(searchParams.get('limit') || '50');
    
    // Build the query filters
    const filters: any = {};
    
    if (sessionId) {
      filters.sessionId = sessionId;
    }
    
    if (visitorId) {
      filters.visitorId = visitorId;
    }
    
    if (startDate || endDate) {
      filters.timestamp = {};
      
      if (startDate) {
        filters.timestamp.gte = new Date(startDate);
      }
      
      if (endDate) {
        // Add one day to include the full end date
        const endDateObj = new Date(endDate);
        endDateObj.setDate(endDateObj.getDate() + 1);
        filters.timestamp.lt = endDateObj;
      }
    }
    
    // Fetch chat messages with filters
    const chats = await prisma.terminalChat.findMany({
      where: filters,
      orderBy: {
        timestamp: 'desc'
      },
      take: limit
    });
    
    return NextResponse.json({ success: true, data: chats });
  } catch (error) {
    console.error('Error fetching terminal chats:', error);
    throw error;
  }
}); 