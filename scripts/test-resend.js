import { Resend } from 'resend';
import dotenv from 'dotenv';

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

/**
 * Simple test to demonstrate sending an email via Resend
 * 
 * Before running this script:
 * 1. Sign up for a free Resend account at https://resend.com
 * 2. Get your API key from the Resend dashboard
 * 3. Add RESEND_API_KEY to your .env.local file
 * 
 * Run with: node scripts/test-resend.js
 */
async function testResendEmail() {
  console.log('Sending test email via Resend...');
  
  // Check if API key is configured
  if (!process.env.RESEND_API_KEY) {
    console.error('❌ Error: Missing RESEND_API_KEY environment variable');
    console.error('Please add RESEND_API_KEY to your .env.local file');
    process.exit(1);
  }
  
  // Create Resend client
  const resend = new Resend(process.env.RESEND_API_KEY);
  
  try {
    // Send a test email
    const result = await resend.emails.send({
      from: 'Aether Inc <contact@resend.dev>',
      to: 'recipient@example.com', // Replace with a real email address to test
      subject: 'Test Email from Aether Inc',
      html: `
        <div style="font-family: Arial, sans-serif; color: #333;">
          <h2 style="color: #0066cc;">Test Email from Aether Inc</h2>
          <p>This is a <b>test email</b> sent from Aether Inc using Resend.</p>
          <p>If you received this email, the configuration is working correctly!</p>
          <hr>
          <p style="font-size: 12px; color: #666;">This is an automated test message.</p>
        </div>
      `
    });
    
    console.log('✅ Email sent successfully!');
    console.log(`Message ID: ${result.id}`);
  } catch (error) {
    console.error('❌ Failed to send email:', error);
  }
}

testResendEmail().catch(err => {
  console.error('Unhandled error:', err);
  process.exit(1);
}); 