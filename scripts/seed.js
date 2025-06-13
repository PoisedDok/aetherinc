const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

// Function to parse tools.txt file
function parseToolsFile() {
  try {
    const toolsPath = path.join(process.cwd(), 'tools.txt');
    const content = fs.readFileSync(toolsPath, 'utf-8');
    const lines = content.split('\n');
    
    // Skip header line
    const dataLines = lines.slice(1).filter(line => line.trim());
    
    const tools = dataLines.map(line => {
      const columns = line.split('\t');
      if (columns.length >= 7) {
        return {
          name: columns[0] || '',
          category: columns[1] || 'Uncategorized',
          type: columns[2] || 'Tool',
          license: columns[3] || null,
          description: columns[4] || '',
          url: columns[5] || '',
          pricing: columns[6] || 'Free'
        };
      }
      return null;
    }).filter(Boolean);
    
    return tools;
  } catch (error) {
    console.error('Error reading tools.txt:', error);
    return [];
  }
}

async function main() {
  console.log('🌱 Starting database seed...');
  
  try {
    // Create admin user
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@aetherinc.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'AetherInc2025!Admin';
    
    const existingAdmin = await prisma.user.findUnique({
      where: { email: adminEmail }
    });
    
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash(adminPassword, 12);
      await prisma.user.create({
        data: {
          email: adminEmail,
          username: 'admin',
          password: hashedPassword,
          role: 'ADMIN'
        }
      });
      console.log('✅ Admin user created');
    } else {
      console.log('ℹ️  Admin user already exists');
    }
    
    // Load and seed AI tools from tools.txt
    console.log('📚 Loading AI tools from tools.txt...');
    const tools = parseToolsFile();
    
    for (const tool of tools) {
      const existing = await prisma.aITool.findFirst({
        where: { name: tool.name }
      });
      
      if (!existing && tool.name) {
        await prisma.aITool.create({
          data: {
            name: tool.name,
            category: tool.category,
            type: tool.type,
            license: tool.license,
            description: tool.description,
            url: tool.url,
            pricing: tool.pricing,
            isActive: true
          }
        });
        console.log(`✅ Created AI tool: ${tool.name}`);
      }
    }
    
    console.log(`📊 Total tools processed: ${tools.length}`);
    
    // Seed some sample waitlist entries
    const sampleEntries = [
      {
        name: 'Alex Johnson',
        email: 'alex.johnson@techcorp.com',
        useCase: 'Enterprise AI automation for customer service',
        reason: 'Need privacy-first AI solution for sensitive customer data'
      },
      {
        name: 'Sarah Chen',
        email: 'sarah.chen@startup.io',
        useCase: 'Personal AI assistant for productivity',
        reason: 'Looking for local AI that works offline'
      },
      {
        name: 'David Kumar',
        email: 'david.kumar@healthcare.org',
        useCase: 'Medical data analysis with HIPAA compliance',
        reason: 'Healthcare data cannot leave our premises'
      }
    ];
    
    for (const entry of sampleEntries) {
      const existing = await prisma.waitlistEntry.findUnique({
        where: { email: entry.email }
      });
      
      if (!existing) {
        await prisma.waitlistEntry.create({ data: entry });
        console.log(`✅ Created waitlist entry for ${entry.name}`);
      }
    }
    
    // Seed some news articles
    const newsArticles = [
      {
        title: 'OpenAI Services Experience Major Outage',
        content: 'Full article content about the OpenAI outage and its impact on businesses...',
        excerpt: 'Millions of users affected as ChatGPT and API services go down for hours, highlighting risks of cloud dependency',
        author: 'Tech Reporter',
        source: 'TechCrunch',
        sourceUrl: 'https://techcrunch.com/openai-outage',
        category: 'AI_OUTAGES',
        isPublished: true,
        publishedAt: new Date('2025-01-15')
      },
      {
        title: 'UK Government Announces £86bn Investment in AI and Science',
        content: 'Detailed coverage of the UK government\'s massive AI investment announcement...',
        excerpt: 'Massive funding boost positions UK as global AI leader, creating opportunities for innovative startups',
        author: 'Innovation News',
        source: 'Innovation News Network',
        sourceUrl: 'https://www.innovationnewsnetwork.com/ai-opportunities-action-plan-positioning-the-uk-as-a-global-leader/58497/',
        category: 'INDUSTRY_INSIGHTS',
        isPublished: true,
        publishedAt: new Date('2025-01-10')
      }
    ];
    
    for (const article of newsArticles) {
      const existing = await prisma.newsArticle.findFirst({
        where: { title: article.title }
      });
      
      if (!existing) {
        await prisma.newsArticle.create({ data: article });
        console.log(`✅ Created news article: ${article.title.substring(0, 50)}...`);
      }
    }
    
    console.log('🎉 Database seeded successfully!');
    
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 