import { Resend } from 'resend';

// Create Resend client - free tier allows 100 emails/day, no credit card needed
// Visit https://resend.com to sign up and get an API key
const resend = new Resend(process.env.RESEND_API_KEY);

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
    // Send notification email to site owner
    await resend.emails.send({
      from: 'AetherInc Contact <contact@resend.dev>', // Using Resend's free domain
      to: 'info@aetherinc.xyz',
      subject: `Contact Form: ${subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
        ${serviceType ? `<p><strong>Interest:</strong> ${serviceType}</p>` : ''}
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br />')}</p>
      `
    });
    
    // Send auto-response to the user
    await resend.emails.send({
      from: 'AetherInc <contact@resend.dev>', // Using Resend's free domain
      to: email,
      subject: 'Thank you for contacting AetherInc',
      html: `
        <h2>Thank you for reaching out to AetherInc!</h2>
        <p>Hello ${name},</p>
        <p>We've received your message and will get back to you within 24 hours.</p>
        <p>Here's a summary of your inquiry:</p>
        <p><strong>Subject:</strong> ${subject}</p>
        ${serviceType ? `<p><strong>Interest:</strong> ${serviceType}</p>` : ''}
        <p><strong>Message:</strong></p>
        <p>${message.substring(0, 100)}${message.length > 100 ? '...' : ''}</p>
        <br />
        <p>Best regards,</p>
        <p>The AetherInc Team</p>
        <hr />
        <p style="font-size: 12px; color: #666;">
          AetherInc Limited (SC851680)<br />
          info@aetherinc.xyz<br />
          Building the future of local AI
        </p>
      `
    });
    
    return { success: true };
  } catch (error) {
    console.error('Email sending failed:', error);
    return { success: false, error };
  }
} 