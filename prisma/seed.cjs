// Prisma Seed Script (CommonJS format)
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');

const prisma = new PrismaClient();
const excelFilePath = process.env.EXCEL_FILE_PATH || path.join(process.cwd(), 'AI_Tools.xlsx');

// Parse Excel file for tools
async function parseExcelFile() {
  try {
    console.log(`Checking if Excel file exists: ${excelFilePath}`);
    if (!fs.existsSync(excelFilePath)) {
      console.log(`Excel file not found at: ${excelFilePath}, will use default tools list`);
      return null;
    }

    const workbook = xlsx.readFile(excelFilePath);
    const sheetName = workbook.SheetNames[0]; // Use first sheet
    const worksheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(worksheet);
    
    console.log(`Excel file read successfully, found ${data.length} rows`);
    
    const tools = [];
    
    for (const row of data) {
      // Check for required fields with capitalized column names
      if (!row.Name || !row.Category) {
        console.log(`Skipping row with missing required fields:`, row);
        continue;
      }
      
      const tool = {
        name: row.Name || '',
        category: row.Category || '',
        type: row.Type || 'Tool',
        license: row.License || null,
        description: row.Description || '',
        url: row.URL || '',
        pricing: row.Pricing || null,
        isActive: true
      };
      
      tools.push(tool);
    }
    
    console.log(`Parsed ${tools.length} tools from the Excel file`);
    return tools;
  } catch (error) {
    console.error('Error parsing Excel file:', error);
    return null;
  }
}

// AI Tools seeding function
async function seedAITools() {
  // Try to get tools from Excel file first
  const excelTools = await parseExcelFile();
  
  // If Excel parsing failed or returned no tools, use default tools
  if (!excelTools) {
    console.log('No tools found in Excel file or file not available. Skipping AI tools seeding.');
    return;
  }
  
  console.log(`Seeding ${excelTools.length} AI tools to database...`);
  let created = 0;
  let updated = 0;
  
  for (const tool of excelTools) {
    // Check if the tool already exists
    const existingTool = await prisma.aITool.findFirst({
      where: { name: tool.name }
    });
    
    if (existingTool) {
      // Update existing tool
      await prisma.aITool.update({
        where: { id: existingTool.id },
        data: tool
      });
      updated++;
    } else {
      // Create new tool
      await prisma.aITool.create({
        data: tool
      });
      created++;
    }
  }
  
  console.log(`AI tools seeded: ${created} created, ${updated} updated`);
}

// Function to check and create missing tables
async function checkAndCreateMissingTables() {
  try {
    console.log('Checking for missing database tables...');
    
    // Check if terminal_chats table exists by attempting a query
    try {
      await prisma.$queryRaw`SELECT 1 FROM terminal_chats LIMIT 1`;
      console.log('terminal_chats table exists');
    } catch (error) {
      if (error.message.includes('relation "terminal_chats" does not exist')) {
        console.log('Creating missing terminal_chats table...');
        
        // Create the terminal_chats table
        await prisma.$executeRaw`
          CREATE TABLE IF NOT EXISTS "terminal_chats" (
            "id" TEXT NOT NULL,
            "sessionId" TEXT NOT NULL,
            "visitorId" TEXT,
            "role" TEXT NOT NULL,
            "content" TEXT NOT NULL,
            "page" TEXT,
            "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
            "metadata" JSONB,
            CONSTRAINT "terminal_chats_pkey" PRIMARY KEY ("id")
          )
        `;
        
        // Create indexes
        await prisma.$executeRaw`CREATE INDEX IF NOT EXISTS "terminal_chats_sessionId_idx" ON "terminal_chats"("sessionId")`;
        await prisma.$executeRaw`CREATE INDEX IF NOT EXISTS "terminal_chats_visitorId_idx" ON "terminal_chats"("visitorId")`;
        await prisma.$executeRaw`CREATE INDEX IF NOT EXISTS "terminal_chats_timestamp_idx" ON "terminal_chats"("timestamp")`;
        
        console.log('terminal_chats table created successfully');
      } else {
        console.error('Error checking terminal_chats table:', error);
      }
    }
  } catch (error) {
    console.error('Error checking database tables:', error);
  }
}

async function main() {
  try {
    // Check and create missing tables
    await checkAndCreateMissingTables();
    
    // Create admin user if doesn't exist
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@aetherinc.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
    
    const existingAdmin = await prisma.user.findUnique({
      where: { email: adminEmail }
    });
    
    if (!existingAdmin) {
      console.log('Creating admin user...');
      const hashedPassword = await bcrypt.hash(adminPassword, 12);
      await prisma.user.create({
        data: {
          email: adminEmail,
          username: 'admin',
          password: hashedPassword,
          role: 'ADMIN'
        }
      });
      console.log('Admin user created successfully');
    } else {
      console.log('Admin user already exists');
    }

    // Seed AI tools from Excel file
    await seedAITools();

    // Seed complete
    console.log('Database seeding completed');
  } catch (error) {
    console.error('Error seeding database:', error);
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