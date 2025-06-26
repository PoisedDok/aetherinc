/**
 * Script to add/reset admin credentials in the database
 */

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function fixAdminLogin() {
  try {
    console.log('Starting admin user reset...');
    
    const adminEmail = 'admin@aetherinc.com';
    const adminPassword = 'AetherInc2025!Admin';
    const hashedPassword = await bcrypt.hash(adminPassword, 12);
    
    // Check if admin exists
    const existingAdmin = await prisma.user.findUnique({
      where: { email: adminEmail }
    });
    
    if (existingAdmin) {
      console.log(`Admin user found with ID: ${existingAdmin.id}`);
      console.log('Updating admin password...');
      
      // Update existing admin
      await prisma.user.update({
        where: { id: existingAdmin.id },
        data: {
          password: hashedPassword,
          role: 'ADMIN'
        }
      });
      
      console.log('Admin password reset successfully');
    } else {
      console.log('Admin user not found. Creating new admin...');
      
      // Create new admin user
      const newAdmin = await prisma.user.create({
        data: {
          email: adminEmail,
          username: 'admin',
          password: hashedPassword,
          role: 'ADMIN'
        }
      });
      
      console.log(`Admin user created with ID: ${newAdmin.id}`);
    }
    
    // Log credentials for reference
    console.log('\n============================================');
    console.log('ADMIN LOGIN CREDENTIALS');
    console.log('============================================');
    console.log(`Email: ${adminEmail}`);
    console.log(`Password: ${adminPassword}`);
    console.log('============================================\n');
    
  } catch (error) {
    console.error('Error fixing admin login:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the function
fixAdminLogin(); 