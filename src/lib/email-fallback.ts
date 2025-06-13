import { Resend } from 'resend';

// Initialize Resend client with API key
const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Send a contact form email using Resend's default domain
 * Use this until your domain is verified with Resend
 */
export async function sendContactEmail(data: {
  name: string;
  email: string;
  company?: string;
  subject: string;
  message: string;
  serviceType?: string;
}) {
  const { name, email, company, subject, message, serviceType } = data;

  try {
    // Send email to site owner using Resend
    await resend.emails.send({
      from: 'AetherInc <onboarding@resend.dev>', // Using Resend's default domain
      to: 'info@aetherinc.xyz',
      subject: `Contact Form: ${subject}`,
      replyTo: email, // This will allow you to reply directly to the sender
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 5px;">
          <h2 style="color: #333;">New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
          ${serviceType ? `<p><strong>Interest:</strong> ${serviceType}</p>` : ''}
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, '<br />')}</p>
        </div>
      `,
    });
    
    // Send auto-response to the sender
    await resend.emails.send({
      from: 'AetherInc <onboarding@resend.dev>', // Using Resend's default domain
      to: email,
      subject: 'Thank you for contacting AetherInc',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 5px;">
          <h2 style="color: #333;">Thank you for reaching out to AetherInc!</h2>
          <p>Hello ${name},</p>
          <p>We've received your message and will get back to you within 24 hours.</p>
          <p>Here's a summary of your inquiry:</p>
          <p><strong>Subject:</strong> ${subject}</p>
          ${serviceType ? `<p><strong>Interest:</strong> ${serviceType}</p>` : ''}
          <p><strong>Message:</strong></p>
          <p>${message.length > 100 ? message.substring(0, 100) + '...' : message}</p>
          <br />
          <p>Best regards,</p>
          <p>The AetherInc Team</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
          <p style="font-size: 12px; color: #666;">
            AetherInc Limited (SC851680)<br />
            info@aetherinc.xyz<br />
            Building the future of local AI
          </p>
        </div>
      `,
    });
    
    return { success: true };
  } catch (error) {
    console.error('Email sending failed:', error);
    return { success: false, error };
  }
} 