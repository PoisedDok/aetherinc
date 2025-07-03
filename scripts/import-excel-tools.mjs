/**
 * Script to import tools from an Excel file into the database
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { PrismaClient } from '@prisma/client';
import xlsx from 'xlsx';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const prisma = new PrismaClient();
const excelFilePath = process.argv[2] || path.join(process.cwd(), 'AI_Tools.xlsx');

console.log('Script started');
console.log(`Looking for Excel file at: ${excelFilePath}`);

// Parse the Excel file
async function parseExcelFile() {
  try {
    console.log(`Checking if file exists: ${fs.existsSync(excelFilePath)}`);
    if (!fs.existsSync(excelFilePath)) {
      console.error(`Excel file not found at: ${excelFilePath}`);
      return [];
    }

    const workbook = xlsx.readFile(excelFilePath);
    const sheetName = workbook.SheetNames[0]; // Use first sheet
    const worksheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(worksheet);
    
    console.log(`File read successfully, found ${data.length} rows`);
    
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
    return [];
  }
}

// Import tools into database
async function importTools() {
  const tools = await parseExcelFile();
  console.log(`Found ${tools.length} tools in the Excel file`);
  
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