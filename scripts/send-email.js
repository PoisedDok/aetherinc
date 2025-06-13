import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

// Load .env.local file instead of .env
dotenv.config({ path: '.env.local' });

/**
 * Creates an email transport using Zoho SMTP
 * @returns {Object} Configured nodemailer transporter
 */
export function createTransporter() {
  return nodemailer.createTransport({
    host: 'smtp.zoho.com',
    port: 587,
    secure: false, // use TLS instead of SSL
    auth: {
      user: process.env.ZOHO_EMAIL,
      pass: process.env.ZOHO_PASSWORD,
    },
  });
}

/**
 * Sends an email using Zoho SMTP
 * @param {Object} options - Email options
 * @param {string} options.to - Recipient email
 * @param {string} options.subject - Email subject
 * @param {string} options.text - Plain text content (optional)
 * @param {string} options.html - HTML content (optional)
 * @returns {Promise} Result of the email sending operation
 */
export async function sendEmail({ to, subject, text, html }) {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: process.env.ZOHO_EMAIL,
      to,
      subject,
      text,
      html,
    };
    
    const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent: ${info.messageId}`);
    return { success: true, messageId: info.messageId };
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