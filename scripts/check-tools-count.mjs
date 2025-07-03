/**
 * Script to check how many AI tools are in the database
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkToolsCount() {
  try {
    // Count all AI tools
    const count = await prisma.aITool.count();
    console.log(`Total AI tools in database: ${count}`);
    
    // Get categories breakdown
    const categories = await prisma.aITool.groupBy({
      by: ['category'],
      _count: {
        _all: true
      }
    });
    
    console.log('\nBreakdown by category:');
    categories.forEach(cat => {
      console.log(`- ${cat.category}: ${cat._count._all} tools`);
    });
    
  } catch (error) {
    console.error('Error checking tools count:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the check
checkToolsCount(); 