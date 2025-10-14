import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_KEY);

/**
 * Send an email using Resend
 *
 * @param {string | string[]} to - Recipient(s) email address
 * @param {string} subject - Email subject
 * @param {string} message - HTML message body
 * @returns {Promise<object>} - Resend API response
 */
export async function sendMail(to, subject, message) {
  try {
    if (!process.env.RESEND_KEY || !process.env.RESEND_MAIL) {
      throw new Error('Missing RESEND_KEY or RESEND_MAIL in environment');
    }

    const data = await resend.emails.send({
      from: process.env.RESEND_MAIL,
      to,
      subject,
      html: message
    });

    return { success: true, data };
  } catch (error) {
    console.error('Email send error:', error);
    return { success: false, error: error.message || error };
  }
}
