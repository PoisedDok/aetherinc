import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/database';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// Define interface for AITool
interface DbAITool {
  id: string;
  name: string;
  description: string;
  category: string;
  type: string;
  url: string;
  pricing: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Middleware to check admin auth
async function checkAdminAuth() {
  const session = await getServerSession(authOptions);
  
  if (!session || session.user.role !== 'ADMIN') {
    return { isAuthorized: false };
  }
  
  return { isAuthorized: true, userId: session.user.id };
}

// GET /api/admin/ai-tools - Get all AI tools
export async function GET() {
  const auth = await checkAdminAuth();
  
  if (!auth.isAuthorized) {
    return NextResponse.json(
      { success: false, message: 'Unauthorized' },
      { status: 401 }
    );
  }
  
  try {
    const tools = await prisma.aITool.findMany({
      orderBy: { createdAt: 'desc' }
    });
    
    // Convert database fields to match the expected format in the frontend
    const formattedTools = tools.map((tool: DbAITool) => ({
      id: tool.id,
      name: tool.name,
      description: tool.description,
      category: tool.category,
      url: tool.url,
      pricing: tool.pricing || 'Unknown',
      tags: tool.type.split(',').filter((t: string) => t.trim() !== ''),
      createdAt: tool.createdAt.toISOString().split('T')[0]
    }));
    
    return NextResponse.json({
      success: true,
      data: formattedTools
    });
  } catch (error) {
    console.error('Error fetching AI tools:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch AI tools' },
      { status: 500 }
    );
  }
}

// POST /api/admin/ai-tools - Create new AI tool
export async function POST(request: NextRequest) {
  const auth = await checkAdminAuth();
  
  if (!auth.isAuthorized) {
    return NextResponse.json(
      { success: false, message: 'Unauthorized' },
      { status: 401 }
    );
  }
  
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.name || !body.description || !body.category) {
      return NextResponse.json(
        { success: false, message: 'Name, description, and category are required' },
        { status: 400 }
      );
    }

    // Create new tool in database
    const newTool = await prisma.aITool.create({
      data: {
      name: body.name,
      description: body.description,
      category: body.category,
        type: Array.isArray(body.tags) ? body.tags.join(',') : '',
        url: body.url || '',
        pricing: body.pricing || null,
        isActive: true
      }
    });

    // Format the response to match frontend expectations
    const formattedTool = {
      id: newTool.id,
      name: newTool.name,
      description: newTool.description,
      category: newTool.category,
      url: newTool.url,
      pricing: newTool.pricing || 'Unknown',
      tags: newTool.type.split(',').filter((t: string) => t.trim() !== ''),
      createdAt: newTool.createdAt.toISOString().split('T')[0]
    };

    return NextResponse.json({
      success: true,
      data: formattedTool,
      message: 'AI tool created successfully'
    });
  } catch (error) {
    console.error('Error creating AI tool:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to create AI tool' },
      { status: 500 }
    );
  }
} 