import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/database';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const type = searchParams.get('type');
    const search = searchParams.get('search');
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');
    
    // Build where clause
    const whereClause: {
      isActive: boolean;
      category?: string;
      type?: string;
      OR?: Array<{
        name?: { contains: string; mode: 'insensitive' };
        description?: { contains: string; mode: 'insensitive' };
        category?: { contains: string; mode: 'insensitive' };
      }>;
    } = { isActive: true };
    
    if (category) {
      whereClause.category = category;
    }
    
    if (type) {
      whereClause.type = type;
    }
    
    if (search) {
      whereClause.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { category: { contains: search, mode: 'insensitive' } }
      ];
    }
    
    // Get tools with pagination
    const [tools, total] = await Promise.all([
      prisma.aITool.findMany({
        where: whereClause,
        orderBy: { createdAt: 'desc' },
        take: limit,
        skip: offset
      }),
      prisma.aITool.count({ where: whereClause })
    ]);
    
    // Get categories and types for filtering
    const [categories, types] = await Promise.all([
      prisma.aITool.findMany({
        where: { isActive: true },
        select: { category: true },
        distinct: ['category']
      }),
      prisma.aITool.findMany({
        where: { isActive: true },
        select: { type: true },
        distinct: ['type']
      })
    ]);
    
    return NextResponse.json({
      success: true,
      tools,
      total,
      categories: categories.map((c: { category: string }) => c.category),
      types: types.map((t: { type: string }) => t.type),
      pagination: {
        limit,
        offset,
        hasMore: offset + limit < total
      }
    });
  } catch (error) {
    console.error('Error fetching AI tools:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch AI tools' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Validate required fields
    if (!data.name || !data.category || !data.description || !data.url) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields: name, category, description, url' },
        { status: 400 }
      );
    }
    
    // Check if tool already exists
    const existing = await prisma.aITool.findFirst({
      where: { name: data.name }
    });
    
    if (existing) {
      return NextResponse.json(
        { success: false, message: 'Tool with this name already exists' },
        { status: 409 }
      );
    }
    
    // Create new tool
    const tool = await prisma.aITool.create({
      data: {
        name: data.name,
        category: data.category,
        type: data.type || 'Tool',
        license: data.license || null,
        description: data.description,
        url: data.url,
        pricing: data.pricing || null,
        isActive: true
      }
    });
    
    return NextResponse.json({
      success: true,
      message: 'AI tool created successfully',
      tool
    });
  } catch (error) {
    console.error('Error creating AI tool:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to create AI tool' },
      { status: 500 }
    );
  }
} 