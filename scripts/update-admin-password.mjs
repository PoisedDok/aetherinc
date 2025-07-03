// Script to update admin password to admin123
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function updateAdminPassword() {
  try {
    console.log('Updating admin password...');
    
    // Find admin user
    const admin = await prisma.user.findUnique({
      where: { email: 'admin@aetherinc.com' }
    });
    
    if (!admin) {
      console.error('Admin user not found');
      return;
    }
    
    // Update password to admin123
    const hashedPassword = await bcrypt.hash('admin123', 12);
    const updatedUser = await prisma.user.update({
      where: { id: admin.id },
      data: { password: hashedPassword }
    });
    
    console.log('Admin password updated successfully for:', updatedUser.email);
    console.log('New login credentials:');
    console.log('Email: admin@aetherinc.com');
    console.log('Password: admin123');
    
  } catch (error) {
    console.error('Error updating admin password:', error);
  } finally {
    await prisma.$disconnect();
  }
}

updateAdminPassword(); 