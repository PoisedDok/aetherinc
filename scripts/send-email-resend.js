import { Resend } from 'resend';
import dotenv from 'dotenv';

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

/**
 * Creates a Resend client for email sending
 * @returns {Object} Configured Resend client
 */
export function createResendClient() {
  return new Resend(process.env.RESEND_API_KEY);
}

/**
 * Sends an email using Resend
 * @param {Object} options - Email options
 * @param {string} options.to - Recipient email
 * @param {string} options.subject - Email subject
 * @param {string} options.text - Plain text content (optional)
 * @param {string} options.html - HTML content (optional)
 * @returns {Promise} Result of the email sending operation
 */
export async function sendEmail({ to, subject, text, html }) {
  try {
    const resend = createResendClient();
    
    const result = await resend.emails.send({
      from: process.env.FROM_EMAIL || 'Aether Inc <contact@resend.dev>',
      to,
      subject,
      text,
      html,
    });
    
    console.log(`Email sent: ${result.id}`);
    return { success: true, messageId: result.id };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error: error.message };
  }
}

// Example usage (uncomment to test):
/*
sendEmail({
  to: 'recipient@example.com',
  subject: 'Test Email from Aether Inc',
  text: 'This is a test email from Aether Inc',
  html: '<p>This is a <b>test email</b> from Aether Inc</p>',
});
*/ 