import { NextResponse } from 'next/server';
import { prisma } from '@/lib/database';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { ApiError, ErrorType } from '@/lib/errorHandler';
import { withSecureErrorHandler } from '@/app/api/errorHandler';

// Re-use same admin check logic as in analytics route
async function checkAdminAuth() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'ADMIN') {
    return { isAuthorized: false };
  }
  return { isAuthorized: true };
}

export const DELETE = withSecureErrorHandler(async () => {
  const auth = await checkAdminAuth();
  if (!auth.isAuthorized) {
    throw new ApiError('You are not authorized to clear analytics data', ErrorType.AUTHORIZATION);
  }

  // Delete all analytics data
  await prisma.analytics.deleteMany();
  // @ts-ignore – analyticsEvent exists on generated client
  await prisma.analyticsEvent.deleteMany();

  return NextResponse.json({ success: true, message: 'Analytics data cleared' });
}); 