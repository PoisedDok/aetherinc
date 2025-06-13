import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/database';
import { sendContactEmail } from '@/lib/email';

interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  subject: string;
  message: string;
  serviceType?: string;
}

export async function POST(request: NextRequest) {
  try {
    const data: ContactFormData = await request.json();
    
    // Validate required fields
    if (!data.name || !data.email || !data.subject || !data.message) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields: name, email, subject, message' },
        { status: 400 }
      );
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return NextResponse.json(
        { success: false, message: 'Invalid email format' },
        { status: 400 }
      );
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
      console.error('Failed to send email:', emailResult.error);
      // Still return success since we saved to database
    }
    
    // Log analytics event
    await logAnalyticsEvent('page_view', {
      page: 'contact',
      action: 'contact_form_submitted',
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
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to submit inquiry. Please try again.' },
      { status: 500 }
    );
  }
}

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

async function logAnalyticsEvent(page: string, data: Record<string, unknown>) {
  try {
    // Increment page views in Analytics table
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const existingRecord = await db.analytics.findUnique({
      where: {
        page_date: {
          page,
          date: today
        }
      }
    });
    
    if (existingRecord) {
      await db.analytics.update({
        where: {
          page_date: {
            page,
            date: today
          }
        },
        data: {
          pageViews: existingRecord.pageViews + 1,
          visitors: JSON.stringify({
            ...JSON.parse(existingRecord.visitors),
            [new Date().toISOString()]: data
          })
        }
      });
    } else {
      await db.analytics.create({
        data: {
          page,
          pageViews: 1,
          uniqueViews: 1,
          date: today,
          visitors: JSON.stringify({
            [new Date().toISOString()]: data
          })
        }
      });
    }
  } catch (error) {
    console.error('Failed to log analytics event:', error);
  }
} 