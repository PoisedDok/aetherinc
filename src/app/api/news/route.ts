import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/database';

// RSS feeds for AI industry news
const NEWS_SOURCES = [
  {
    name: 'TechCrunch AI',
    url: 'https://techcrunch.com/category/artificial-intelligence/feed/',
    category: 'AI_NEWS'
  },
  {
    name: 'VentureBeat AI',
    url: 'https://venturebeat.com/ai/feed/',
    category: 'AI_NEWS'
  },
  {
    name: 'The Register Security',
    url: 'https://www.theregister.com/security/headlines.atom',
    category: 'DATA_BREACHES'
  },
  {
    name: 'Bleeping Computer',
    url: 'https://www.bleepingcomputer.com/feed/',
    category: 'CYBERSECURITY'
  }
];

async function fetchRSSFeed(source: typeof NEWS_SOURCES[0]) {
  try {
    const response = await fetch(source.url, {
      headers: {
        'User-Agent': 'AetherInc-NewsBot/1.0'
      }
    });
    
    if (!response.ok) {
      console.warn(`Failed to fetch ${source.name}: ${response.status}`);
      return [];
    }
    
    const xmlText = await response.text();
    
    // Parse RSS/Atom feed (simplified parser)
    const items = [];
    const itemMatches = xmlText.match(/<item[\s\S]*?<\/item>|<entry[\s\S]*?<\/entry>/g) || [];
    
    for (const itemXml of itemMatches.slice(0, 5)) { // Limit to 5 items per source
      const title = extractXMLContent(itemXml, 'title');
      const description = extractXMLContent(itemXml, 'description') || extractXMLContent(itemXml, 'summary');
      const link = extractXMLContent(itemXml, 'link') || extractXMLContent(itemXml, 'guid');
      const pubDate = extractXMLContent(itemXml, 'pubDate') || extractXMLContent(itemXml, 'published');
      
      if (title && link) {
        items.push({
          title: cleanText(title),
          content: cleanText(description || ''),
          excerpt: cleanText(description || '').substring(0, Math.min(cleanText(description || '').length, 200)) + (cleanText(description || '').length > 200 ? '...' : ''),
          sourceUrl: link,
          source: source.name,
          category: source.category,
          publishedAt: pubDate ? new Date(pubDate) : new Date(),
          isPublished: true
        });
      }
    }
    
    return items;
  } catch (error) {
    console.error(`Error fetching ${source.name}:`, error);
    return [];
  }
}

function extractXMLContent(xml: string, tag: string): string | null {
  const regex = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, 'i');
  const match = xml.match(regex);
  return match ? match[1].trim() : null;
}

function cleanText(text: string): string {
  if (!text) return '';
  // Remove HTML tags and decode entities
  return text
    .replace(/<[^>]*>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .trim();
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const limit = parseInt(searchParams.get('limit') || '10');
    
    // Get articles from database
    const whereClause = category ? { category, isPublished: true } : { isPublished: true };
    const articles = await prisma.newsArticle.findMany({
      where: whereClause,
      orderBy: { publishedAt: 'desc' },
      take: limit
    });
    
    return NextResponse.json({
      success: true,
      articles,
      total: articles.length
    });
  } catch (error) {
    console.error('Error fetching news:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch news' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const refresh = searchParams.get('refresh') === 'true';
    
    if (!refresh) {
      return NextResponse.json(
        { success: false, message: 'Refresh parameter required' },
        { status: 400 }
      );
    }
    
    console.log('🔄 Refreshing news feeds...');
    
    let totalAdded = 0;
    
    for (const source of NEWS_SOURCES) {
      console.log(`📡 Fetching from ${source.name}...`);
      const articles = await fetchRSSFeed(source);
      
      for (const article of articles) {
        try {
          // Check if article already exists
          const existing = await prisma.newsArticle.findFirst({
            where: {
              OR: [
                { title: article.title },
                { sourceUrl: article.sourceUrl }
              ]
            }
          });
          
          if (!existing) {
            await prisma.newsArticle.create({ data: article });
            totalAdded++;
            console.log(`✅ Added: ${article.title.substring(0, 50)}...`);
          }
        } catch (error) {
          console.error(`Failed to save article: ${article.title}`, error);
        }
      }
    }
    
    console.log(`🎉 Added ${totalAdded} new articles`);
    
    return NextResponse.json({
      success: true,
      message: `Successfully refreshed news feeds. Added ${totalAdded} new articles.`,
      articlesAdded: totalAdded
    });
  } catch (error) {
    console.error('Error refreshing news:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to refresh news feeds' },
      { status: 500 }
    );
  }
}

// Add some manual high-impact articles highlighting local AI advantages
export async function PUT(request: NextRequest) {
  try {
    const manualArticles = [
      {
        title: 'OpenAI Services Experience Major Global Outage',
        content: 'ChatGPT, API services, and other OpenAI products went down for several hours, affecting millions of users worldwide and highlighting the risks of cloud dependency for AI services.',
        excerpt: 'Millions affected as ChatGPT and APIs go down, showcasing cloud AI risks',
        author: 'AetherInc News Team',
        source: 'Industry Analysis',
        sourceUrl: 'https://aetherinc.com/news/openai-outage-analysis',
        category: 'AI_OUTAGES',
        isPublished: true,
        publishedAt: new Date()
      },
      {
        title: 'Healthcare Data Breach Exposes 500,000 Patient Records',
        content: 'Another major healthcare provider suffered a data breach when their cloud AI system was compromised, exposing sensitive patient information and highlighting the need for on-premise AI solutions.',
        excerpt: 'Cloud AI breach exposes patient data, reinforcing local AI benefits',
        author: 'Security Analysis Team',
        source: 'Healthcare Security Report',
        sourceUrl: 'https://aetherinc.com/news/healthcare-breach-analysis',
        category: 'DATA_BREACHES',
        isPublished: true,
        publishedAt: new Date(Date.now() - 86400000) // Yesterday
      },
      {
        title: 'UK Government Announces £86bn Investment in AI and Science',
        content: 'The UK government announced a massive £86 billion investment in AI and science, creating unprecedented opportunities for innovative AI startups and positioning the UK as a global AI leader.',
        excerpt: 'Massive UK AI investment creates opportunities for innovative startups',
        author: 'Government Relations Team',
        source: 'Gov.UK Official',
        sourceUrl: 'https://www.gov.uk/government/news/86-billion-boost-for-ai-and-science',
        category: 'INDUSTRY_INSIGHTS',
        isPublished: true,
        publishedAt: new Date(Date.now() - 172800000) // 2 days ago
      }
    ];
    
    let added = 0;
    for (const article of manualArticles) {
      const existing = await prisma.newsArticle.findFirst({
        where: { title: article.title }
      });
      
      if (!existing) {
        await prisma.newsArticle.create({ data: article });
        added++;
      }
    }
    
    return NextResponse.json({
      success: true,
      message: `Added ${added} featured articles`,
      articlesAdded: added
    });
  } catch (error) {
    console.error('Error adding featured articles:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to add featured articles' },
      { status: 500 }
    );
  }
} 