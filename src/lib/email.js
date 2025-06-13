import { Resend } from 'resend';

// Initialize Resend with the API key
const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Send an email using Resend
 * 
 * @param {Object} options Email options
 * @param {string} options.to Recipient email address
 * @param {string} options.subject Email subject
 * @param {string} options.text Plain text version of the email (optional)
 * @param {string} options.html HTML version of the email
 * @param {string} options.from Sender email (defaults to onboarding@resend.dev)
 * @param {string} options.replyTo Reply-to email address (optional)
 * @returns {Promise<{success: boolean, id?: string, error?: any}>}
 */
export async function sendEmail({
  to,
  subject,
  text,
  html,
  from = 'AetherInc <onboarding@resend.dev>',
  replyTo
}) {
  try {
    const { data, error } = await resend.emails.send({
      from,
      to,
      subject,
      text,
      html,
      reply_to: replyTo
    });

    if (error) {
      console.error('Email sending failed:', error);
      return { success: false, error };
    }

    return { success: true, id: data.id };
  } catch (error) {
    console.error('Email sending failed:', error);
    return { success: false, error };
  }
}

/**
 * Send a contact form email notification to admin and a confirmation to the user
 * 
 * @param {Object} formData Form data from the contact form
 * @param {string} formData.name Sender's name
 * @param {string} formData.email Sender's email
 * @param {string} formData.subject Email subject
 * @param {string} formData.message Message content
 * @param {string} formData.company Sender's company (optional)
 * @param {string} formData.serviceType Service type of interest (optional)
 * @returns {Promise<{success: boolean, error?: any}>}
 */
export async function sendContactFormEmails(formData) {
  const { name, email, subject, message, company, serviceType } = formData;
  
  try {
    // 1. Send notification to admin
    const adminResult = await sendEmail({
      to: process.env.ADMIN_EMAIL || 'info@aetherinc.xyz',
      subject: `Contact Form: ${subject}`,
      replyTo: email,
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
      `
    });

    // 2. Send confirmation to user
    const userResult = await sendEmail({
      to: email,
      subject: 'Thank you for contacting AetherInc',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 5px;">
          <h2 style="color: #333;">Thank you for reaching out!</h2>
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
      `
    });

    if (!adminResult.success || !userResult.success) {
      return { 
        success: false, 
        error: adminResult.success ? userResult.error : adminResult.error 
      };
    }

    return { success: true };
  } catch (error) {
    console.error('Contact form email sending failed:', error);
    return { success: false, error };
  }
} 