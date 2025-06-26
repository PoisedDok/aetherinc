import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();
const adminEmail = 'admin@aetherinc.com';
const adminPassword = 'AetherInc2025!Admin';

async function main() {
  console.log('Resetting admin password...');
  const hashedPassword = await bcrypt.hash(adminPassword, 12);
  
  try {
    await prisma.user.upsert({
      where: { email: adminEmail },
      update: { password: hashedPassword, role: 'ADMIN' },
      create: { 
        email: adminEmail,
        username: 'admin',
        password: hashedPassword,
        role: 'ADMIN'
      }
    });
    console.log('Admin password reset successfully!');
    console.log(`Email: ${adminEmail}`);
    console.log(`Password: ${adminPassword}`);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main(); 