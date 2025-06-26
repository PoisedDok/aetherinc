/**
 * Script to check the count of tools in both tools.txt and database
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

// Count tools in the tools.txt file
async function countToolsInFile() {
  try {
    const data = fs.readFileSync(toolsFilePath, 'utf-8');
    const lines = data.split('\n').filter(line => line.trim());
    
    // Count non-empty lines that have at least one tab
    const toolCount = lines.filter(line => line.includes('\t')).length;
    
    console.log(`Tools in tools.txt: ${toolCount}`);
    return toolCount;
  } catch (error) {
    console.error('Error reading tools.txt:', error);
    return 0;
  }
}

// Count tools in the database
async function countToolsInDatabase() {
  try {
    const count = await prisma.aITool.count();
    console.log(`Tools in database: ${count}`);
    return count;
  } catch (error) {
    console.error('Error counting tools in database:', error);
    return 0;
  }
}

// Main function
async function main() {
  try {
    const fileCount = await countToolsInFile();
    const dbCount = await countToolsInDatabase();
    
    if (fileCount === dbCount) {
      console.log('\nMatched: The number of tools in tools.txt matches the database.');
    } else {
      console.log('\nMismatch: The number of tools does not match.');
      console.log(`Difference: ${Math.abs(fileCount - dbCount)} tools`);
    }
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main(); 