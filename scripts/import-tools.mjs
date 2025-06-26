/**
 * Script to import tools from tools.txt into the database
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { PrismaClient } from '@prisma/client';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const prisma = new PrismaClient();
const toolsFilePath = path.join(process.cwd(), 'tools.txt');

console.log('Script started');
console.log(`Looking for tools.txt at: ${toolsFilePath}`);

// Parse the tools.txt file
async function parseToolsFile() {
  try {
    console.log(`Checking if file exists: ${fs.existsSync(toolsFilePath)}`);
    const data = fs.readFileSync(toolsFilePath, 'utf-8');
    console.log(`File read successfully, size: ${data.length} bytes`);
    const lines = data.split('\n').filter(line => line.trim());
    console.log(`Found ${lines.length} non-empty lines`);
    
    const tools = [];
    
    for (const line of lines) {
      const parts = line.split('\t');
      if (parts.length < 5) {
        console.log(`Skipping line with insufficient parts: ${parts.length}`);
        continue;
      }
      
      const tool = {
        name: parts[0],
        category: parts[1] || '',
        type: parts[2] || '',
        license: parts[3] || '',
        description: parts[4] || '',
        url: parts[5] || '',
        pricing: parts[6] || '',
        isActive: true
      };
      
      tools.push(tool);
    }
    
    console.log(`Parsed ${tools.length} tools from the file`);
    return tools;
  } catch (error) {
    console.error('Error parsing tools file:', error);
    return [];
  }
}

// Import tools into database
async function importTools() {
  const tools = await parseToolsFile();
  console.log(`Found ${tools.length} tools in tools.txt file`);
  
  if (tools.length === 0) {
    console.error('No tools found to import!');
    return;
  }
  
  let created = 0;
  let updated = 0;
  let skipped = 0;
  
  console.log('Starting database import...');
  
  for (const tool of tools) {
    try {
      // Check if tool already exists
      console.log(`Checking if tool exists: ${tool.name}`);
      const existingTool = await prisma.aITool.findFirst({
        where: { name: tool.name }
      });
      
      if (existingTool) {
        console.log(`Updating existing tool: ${tool.name}`);
        // Update existing tool
        await prisma.aITool.update({
          where: { id: existingTool.id },
          data: tool
        });
        updated++;
        console.log(`Updated: ${tool.name}`);
      } else {
        console.log(`Creating new tool: ${tool.name}`);
        // Create new tool
        await prisma.aITool.create({
          data: tool
        });
        created++;
        console.log(`Created: ${tool.name}`);
      }
    } catch (error) {
      console.error(`Error importing tool "${tool.name}":`, error);
      skipped++;
    }
  }
  
  console.log(`\nImport summary:`);
  console.log(`- Total tools processed: ${tools.length}`);
  console.log(`- New tools created: ${created}`);
  console.log(`- Existing tools updated: ${updated}`);
  console.log(`- Failed/skipped tools: ${skipped}`);
}

// Main function
async function main() {
  try {
    console.log('Starting import process');
    await importTools();
    console.log('Import process completed');
  } catch (error) {
    console.error('Error during import:', error);
  } finally {
    await prisma.$disconnect();
    console.log('Database connection closed');
  }
}

main(); 