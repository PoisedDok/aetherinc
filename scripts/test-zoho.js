import { sendEmail } from './send-email.js';

/**
 * Simple test to demonstrate sending an email via Zoho
 * 
 * Before running this script:
 * 1. Make sure you have a .env file with ZOHO_EMAIL and ZOHO_PASSWORD defined
 * 2. If using 2FA on Zoho, generate an app-specific password
 * 
 * Run with: node scripts/test-zoho.js
 */
async function testZohoEmail() {
  console.log('Sending test email via Zoho...');
  
  const result = await sendEmail({
    to: 'recipient@example.com', // Replace with a real email address to test
    subject: 'Test Email from Aether Inc',
    text: 'This is a test email from Aether Inc',
    html: '<div style="font-family: Arial, sans-serif; color: #333;">'+
          '<h2 style="color: #0066cc;">Test Email from Aether Inc</h2>'+
          '<p>This is a <b>test email</b> sent from Aether Inc using Zoho SMTP.</p>'+
          '<p>If you received this email, the configuration is working correctly!</p>'+
          '<hr>'+
          '<p style="font-size: 12px; color: #666;">This is an automated test message.</p>'+
          '</div>'
  });
  
  if (result.success) {
    console.log('✅ Email sent successfully!');
    console.log(`Message ID: ${result.messageId}`);
  } else {
    console.error('❌ Failed to send email:', result.error);
  }
}

testZohoEmail().catch(err => {
  console.error('Unhandled error:', err);
  process.exit(1);
}); 