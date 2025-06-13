import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// Load .env.local file instead of .env
dotenv.config({ path: '.env.local' });

/**
 * Verifies connection to Zoho SMTP server
 * Use this script to test your Zoho email configuration
 * 
 * Run with: node scripts/verify-zoho.js
 */
async function verifyZohoConnection() {
  console.log('Verifying connection to Zoho SMTP server...');
  console.log('----------------------------------------');
  
  // Check for required environment variables
  if (!process.env.ZOHO_EMAIL || !process.env.ZOHO_PASSWORD) {
    console.error('❌ Error: Missing required environment variables');
    console.error('Please set ZOHO_EMAIL and ZOHO_PASSWORD in your .env.local file');
    process.exit(1);
  }
  
  console.log(`Using email: ${process.env.ZOHO_EMAIL}`);
  console.log('Password: [hidden]');
  
  // Create transporter
  const transporter = nodemailer.createTransport({
    host: 'smtp.zoho.com',
    port: 587,
    secure: false, // Use TLS instead of SSL
    auth: {
      user: process.env.ZOHO_EMAIL,
      pass: process.env.ZOHO_PASSWORD,
    },
    debug: true // Enable for detailed logging
  });
  
  // Verify connection
  try {
    console.log('Attempting to verify connection...');
    const verification = await transporter.verify();
    console.log('✅ Success! Server is ready to take messages:', verification);
    return true;
  } catch (error) {
    console.error('❌ Verification failed!');
    console.error('Error details:', error);
    
    // Provide helpful troubleshooting tips based on error
    if (error.code === 'EAUTH') {
      console.log('\nTroubleshooting tips for authentication failure:');
      console.log('1. Double-check your ZOHO_EMAIL and ZOHO_PASSWORD values');
      console.log('2. If using 2FA, generate an app-specific password');
      console.log('3. Check for any Zoho security alerts in your inbox');
    } else if (error.code === 'ESOCKET' || error.code === 'ECONNECTION') {
      console.log('\nTroubleshooting tips for connection issues:');
      console.log('1. Check your network/firewall allows connections to smtp.zoho.com:465');
      console.log('2. Try changing to port 587 with secure:false if behind a firewall');
      console.log('3. Verify the Zoho SMTP server is not experiencing outages');
    }
    
    return false;
  }
}

// Run the verification
verifyZohoConnection().catch(err => {
  console.error('Unhandled error:', err);
  process.exit(1);
}); 