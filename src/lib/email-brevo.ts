import nodemailer from 'nodemailer';

// Create reusable transporter with Brevo (formerly Sendinblue)
// Free tier: 300 emails per day, no credit card required
// https://www.brevo.com/free/
export const transporter = nodemailer.createTransport({
  host: 'smtp-relay.brevo.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.BREVO_USER || 'info@aetherinc.xyz', // Your registered Brevo email
    pass: process.env.BREVO_PASSWORD || '', // Your Brevo SMTP key (not your account password)
  },
});

export async function sendContactEmail(data: {
  name: string;
  email: string;
  company?: string;
  subject: string;
  message: string;
  serviceType?: string;
}) {
  const { name, email, company, subject, message, serviceType } = data;

  // Email to the site owner
  const mailOptions = {
    from: process.env.BREVO_USER || 'info@aetherinc.xyz',
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
    `,
  };

  // Auto-response to the sender
  const autoResponseOptions = {
    from: process.env.BREVO_USER || 'info@aetherinc.xyz',
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
    `,
  };

  try {
    // Send email to site owner
    await transporter.sendMail(mailOptions);
    
    // Send auto-response to the sender
    await transporter.sendMail(autoResponseOptions);
    
    return { success: true };
  } catch (error) {
    console.error('Email sending failed:', error);
    return { success: false, error };
  }
} 