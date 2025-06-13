import { Resend } from 'resend';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

/**
 * Quick test for Resend
 * Run with: node scripts/test-resend-quick.js
 */
async function quickTest() {
  // Use environment variable or fallback to the provided key
  const apiKey = process.env.RESEND_API_KEY || 're_7oXU8neE_2qJMKapiADcvNaW9YAs35kos';
  console.log('Testing Resend email service...');
  
  try {
    const resend = new Resend(apiKey);
    
    console.log('Sending test email...');
    const { data, error } = await resend.emails.send({
      from: 'AetherInc <info@aetherinc.xyz>',
      to: 'krisu1839@gmail.com',
      subject: 'Test from Aether Inc',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 5px;">
          <h2 style="color: #333;">Email Service Test</h2>
          <p>This is a test email sent from Aether Inc using Resend.</p>
          <p>Your Resend integration is working correctly!</p>
          <div style="background: #f9f9f9; padding: 15px; border-radius: 4px; margin-top: 20px;">
            <p style="margin: 0; color: #666; font-size: 14px;">Sent at: ${new Date().toLocaleString()}</p>
          </div>
        </div>
      `
    });
    
    if (error) {
      console.error('❌ Failed to send email:', error);
    } else {
      console.log('✅ Email sent successfully!');
      console.log(`Message ID: ${data.id}`);
    }
  } catch (err) {
    console.error('❌ Error:', err);
  }
}

quickTest().catch(console.error); 