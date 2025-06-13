import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/database';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// Helper to check admin session
async function checkAdminAuth() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'ADMIN') {
    return { isAuthorized: false };
  }
  return { isAuthorized: true, userId: session.user.id };
}

// GET /api/admin/ai-tools/[id] - single tool (optional)
export async function GET(_request: NextRequest, { params }: { params: { id: string } }) {
  const auth = await checkAdminAuth();
  if (!auth.isAuthorized) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const tool = await prisma.aITool.findUnique({ where: { id: params.id } });
    if (!tool) {
      return NextResponse.json({ success: false, message: 'Not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: tool });
  } catch (error) {
    console.error('Error fetching tool:', error);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}

// PUT /api/admin/ai-tools/[id]
export async function PUT(request: NextRequest, context: { params: { id: string } }) {
  const { id } = context.params;
  const auth = await checkAdminAuth();
  if (!auth.isAuthorized) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    if (!body.name || !body.description || !body.category) {
      return NextResponse.json(
        { success: false, message: 'Name, description, and category are required' },
        { status: 400 }
      );
    }
    const updated = await prisma.aITool.update({
      where: { id },
      data: {
        name: body.name,
        description: body.description,
        category: body.category,
        type: Array.isArray(body.tags) ? body.tags.join(',') : body.type || '',
        url: body.url || '',
        pricing: body.pricing || null,
        isActive: body.isActive !== undefined ? body.isActive : true,
      },
    });
    return NextResponse.json({ success: true, data: updated, message: 'AI tool updated successfully' });
  } catch (error) {
    console.error('Error updating tool:', error);
    return NextResponse.json({ success: false, message: 'Failed to update AI tool' }, { status: 500 });
  }
}

// DELETE /api/admin/ai-tools/[id]
export async function DELETE(_request: NextRequest, context: { params: { id: string } }) {
  const { id } = context.params;
  const auth = await checkAdminAuth();
  if (!auth.isAuthorized) {
    return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  }
  try {
    await prisma.aITool.delete({ where: { id } });
    return NextResponse.json({ success: true, message: 'AI tool deleted successfully' });
  } catch (error) {
    console.error('Error deleting AI tool:', error);
    return NextResponse.json({ success: false, message: 'Failed to delete AI tool' }, { status: 500 });
  }
} 