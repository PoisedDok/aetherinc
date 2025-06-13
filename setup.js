const fs = require('fs');
const path = require('path');

// Create .env.local file
const envContent = `DATABASE_URL="file:./dev.db"
ADMIN_EMAIL="admin@aetherinc.com"
ADMIN_PASSWORD="AetherInc2025!Admin"
NEXTAUTH_SECRET="aetherinc-super-secret-key-for-auth-2025"
NEXTAUTH_URL="http://localhost:3000"
COMPANY_REGISTRATION="SC851680"
COMPANY_FOUNDED="2025-06-10"
COMPANY_LOCATION="Glasgow, Scotland"
NODE_ENV="development"
`;

console.log('📝 Creating .env.local file...');
fs.writeFileSync('.env.local', envContent);
console.log('✅ .env.local created successfully');

console.log('🔄 Setup complete! You can now run:');
console.log('   npx prisma db push');
console.log('   npm run db:seed');
console.log('   npm run dev'); 