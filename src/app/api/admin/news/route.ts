import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/database';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// Define the interface for news articles from the database
interface DbNewsArticle {
  id: string;
  title: string;
  content: string;
  excerpt: string | null;
  author: string | null;
  source: string | null;
  sourceUrl: string | null;
  imageUrl: string | null;
  category: string;
  isPublished: boolean;
  publishedAt: Date | null;
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

// GET /api/admin/news - Get all news articles
export async function GET() {
  const auth = await checkAdminAuth();
  
  if (!auth.isAuthorized) {
    return NextResponse.json(
      { success: false, message: 'Unauthorized' },
      { status: 401 }
    );
  }
  
  try {
    const articles = await prisma.newsArticle.findMany({
      orderBy: { createdAt: 'desc' }
    });
    
    // Format articles for the frontend
    const formattedArticles = articles.map((article: DbNewsArticle) => ({
      id: article.id,
      title: article.title,
      excerpt: article.excerpt || '',
      content: article.content,
      category: article.category,
      impact: article.category.includes('HIGH') ? 'High' : 
             article.category.includes('MEDIUM') ? 'Medium' : 'Low',
      source: article.source || '',
      relevance: article.author || '', // Using author field for relevance
      published: article.isPublished,
      createdAt: article.createdAt.toISOString().split('T')[0]
    }));
    
    return NextResponse.json({
      success: true,
      data: formattedArticles
    });
  } catch (error) {
    console.error('Error fetching news articles:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch news articles' },
      { status: 500 }
    );
  }
}

// POST /api/admin/news - Create a new article
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
    if (!body.title || !body.content) {
      return NextResponse.json(
        { success: false, message: 'Title and content are required' },
        { status: 400 }
      );
    }

    // Create new article in database
    const newArticle = await prisma.newsArticle.create({
      data: {
        title: body.title,
        content: body.content,
        excerpt: body.excerpt || null,
        author: body.relevance || null,
        source: body.source || null,
        category: body.category || 'AI_NEWS',
        isPublished: body.published || false,
        publishedAt: body.published ? new Date() : null
      }
    });

    // Format the response to match frontend expectations
    const formattedArticle = {
      id: newArticle.id,
      title: newArticle.title,
      excerpt: newArticle.excerpt || '',
      content: newArticle.content,
      category: newArticle.category,
      impact: newArticle.category.includes('HIGH') ? 'High' : 
             newArticle.category.includes('MEDIUM') ? 'Medium' : 'Low',
      source: newArticle.source || '',
      relevance: newArticle.author || '',
      published: newArticle.isPublished,
      createdAt: newArticle.createdAt.toISOString().split('T')[0]
    };

    return NextResponse.json({
      success: true,
      data: formattedArticle,
      message: 'News article created successfully'
    });
  } catch (error) {
    console.error('Error creating news article:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to create news article' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/news/[id] - Delete a news article
export async function DELETE(request: NextRequest) {
  const id = request.nextUrl.pathname.split('/').pop();
  
  if (!id) {
    return NextResponse.json(
      { success: false, message: 'Missing article ID' },
      { status: 400 }
    );
  }
  
  const auth = await checkAdminAuth();
  
  if (!auth.isAuthorized) {
    return NextResponse.json(
      { success: false, message: 'Unauthorized' },
      { status: 401 }
    );
  }
  
  try {
    await prisma.newsArticle.delete({
      where: { id }
    });
    
    return NextResponse.json({
      success: true,
      message: 'News article deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting news article:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete news article' },
      { status: 500 }
    );
  }
} 