import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/database';
import { prisma } from '@/lib/database';
import { sendContactEmail } from '@/lib/contact';
import { ApiError, ErrorType } from '@/lib/errorHandler';
import { withSecureErrorHandler } from '@/app/api/errorHandler';

interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  subject: string;
  message: string;
  serviceType?: string;
}

export const POST = withSecureErrorHandler(async (request: NextRequest) => {
  try {
    const data: ContactFormData = await request.json();
    
    // Validate required fields
    if (!data.name || !data.email || !data.subject || !data.message) {
      const missingFields = [];
      if (!data.name) missingFields.push('name');
      if (!data.email) missingFields.push('email');
      if (!data.subject) missingFields.push('subject');
      if (!data.message) missingFields.push('message');
      
      throw new ApiError('Missing required fields', ErrorType.VALIDATION, {
        missingFields
      });
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      throw new ApiError('Invalid email format', ErrorType.VALIDATION, {
        email: data.email
      });
    }
    
    // Create contact inquiry in database
    const inquiry = await db.contactForm.create({
      data: {
        name: data.name.trim(),
        email: data.email.toLowerCase().trim(),
        company: data.company?.trim() || null,
        phone: data.phone?.trim() || null,
        message: data.message.trim(),
        serviceType: data.serviceType || null,
        status: 'NEW',
        createdAt: new Date()
      }
    });
    
    // Send emails using our email utility
    const emailResult = await sendContactEmail({
      name: data.name,
      email: data.email,
      company: data.company,
      subject: data.subject,
      message: data.message,
      serviceType: data.serviceType
    });
    
    if (!emailResult.success) {
      console.error('Failed to send email');
      // Still return success since we saved to database
    }
    
    // Log analytics event instead of adding a synthetic page view so the dashboard reflects real data only.
    await logContactFormEvent({
      serviceType: data.serviceType,
      company: data.company,
      hasPhone: !!data.phone
    });
    
    return NextResponse.json({
      success: true,
      message: 'Thank you for your inquiry! We will get back to you within 24 hours.',
      inquiryId: inquiry.id
    });
    
  } catch (error) {
    // Let the error handler deal with this
    throw error;
  }
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');
    
    const whereClause = status ? { status } : {};
    
    const [inquiries, total] = await Promise.all([
      db.contactForm.findMany({
        where: whereClause,
        orderBy: [
          { createdAt: 'desc' }
        ],
        take: limit,
        skip: offset
      }),
      db.contactForm.count({ where: whereClause })
    ]);
    
    return NextResponse.json({
      success: true,
      inquiries,
      total,
      pagination: {
        limit,
        offset,
        hasMore: offset + limit < total
      }
    });
    
  } catch (error) {
    console.error('Error fetching contact inquiries:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch inquiries' },
      { status: 500 }
    );
  }
}

// Log contact form submission as an AnalyticsEvent record so it shows up under "Events" in the dashboard
async function logContactFormEvent(_extra: Record<string, unknown>) {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const eventType = 'form_submit';
    const elementId = 'contact_form';
    const page = 'contact';

    // Use `any` cast to avoid type issues until the Prisma client types regenerate.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const analyticsEventClient: any = (prisma as any).analyticsEvent;

    const existing = await analyticsEventClient.findUnique({
      where: {
        eventType_elementId_page_date: {
          eventType,
          elementId,
          page,
          date: today,
        },
      },
    });

    if (existing) {
      await analyticsEventClient.update({
        where: { id: existing.id },
        data: { count: existing.count + 1 },
      });
    } else {
      await analyticsEventClient.create({
        data: {
          eventType,
          elementId,
          elementName: 'Contact Form',
          page,
          count: 1,
          date: today,
        },
      });
    }
  } catch (error) {
    console.error('Failed to log contact form analytics event:', error);
  }
} 