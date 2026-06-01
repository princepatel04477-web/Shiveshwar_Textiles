'use server';

import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

// Simple HTML input sanitization helper
function sanitizeInput(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

export async function submitInquiry(prevState: any, formData: FormData) {
  try {
    // 1. Honeypot Check (Hidden form field filled by bots)
    const honeypot = formData.get('website') as string;
    if (honeypot) {
      console.log('Spam detected via honeypot field.');
      return { success: true, message: 'Your inquiry has been submitted successfully.' };
    }

    const fullName = formData.get('fullName') as string;
    const businessEmail = formData.get('email') as string;
    const companyName = formData.get('companyName') as string;
    const subject = formData.get('subject') as string;
    const country = formData.get('country') as string;
    const vatNumber = formData.get('vatNumber') as string;
    const source = formData.get('referral') as string;
    const message = formData.get('message') as string;
    const isHuman = formData.get('isHuman') === 'true';

    // 2. Field Validation
    if (!fullName || !businessEmail || !subject || !message) {
      return { success: false, error: 'Please complete all required fields.' };
    }

    if (!isHuman) {
      return { success: false, error: 'Please confirm that this is a professional business inquiry.' };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(businessEmail)) {
      return { success: false, error: 'Please enter a valid business email address.' };
    }

    if (message.length < 20) {
      return { success: false, error: 'Your message must be at least 20 characters long.' };
    }

    // Sanitize and trim inputs
    const cleanFullName = sanitizeInput(fullName.trim());
    const cleanBusinessEmail = businessEmail.trim().toLowerCase();
    const cleanCompanyName = companyName ? sanitizeInput(companyName.trim()) : '';
    const cleanSubject = sanitizeInput(subject.trim());
    const cleanCountry = country ? sanitizeInput(country.trim()) : '';
    const cleanVatNumber = vatNumber ? sanitizeInput(vatNumber.trim()) : '';
    const cleanSource = source ? sanitizeInput(source.trim()) : '';
    const cleanMessage = sanitizeInput(message.trim());

    // 3. Initialize Supabase Admin Client
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      console.error('Supabase credentials missing on server.');
      return { success: false, error: 'Server configuration error. Please contact our support team.' };
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // 4. Server-Side Rate Limiting (Check if email submitted in last 60 seconds)
    const { data: recentInquiries, error: limitError } = await supabase
      .from('wholesale_inquiries')
      .select('id')
      .eq('business_email', cleanBusinessEmail)
      .gt('created_at', new Date(Date.now() - 60000).toISOString());

    if (limitError) {
      console.error('Database rate limit query failed:', limitError);
    }

    if (recentInquiries && recentInquiries.length > 0) {
      return { success: false, error: 'Too many requests. Please wait a minute before submitting again.' };
    }

    // 5. Database Insertion
    const { data: insertedRecord, error: dbError } = await supabase
      .from('wholesale_inquiries')
      .insert([
        {
          full_name: cleanFullName,
          business_email: cleanBusinessEmail,
          company_name: cleanCompanyName,
          subject: cleanSubject,
          country: cleanCountry,
          vat_number: cleanVatNumber,
          source: cleanSource,
          message: cleanMessage,
          status: 'new'
        }
      ])
      .select()
      .single();

    if (dbError) {
      console.error('Failed to save wholesale inquiry:', dbError);
      return { success: false, error: 'Failed to record your inquiry. Please try again.' };
    }

    const submissionTime = insertedRecord?.created_at
      ? new Date(insertedRecord.created_at).toLocaleString()
      : new Date().toLocaleString();

    // 6. Send Email Notifications via Resend
    const resendApiKey = process.env.RESEND_API_KEY;
    if (resendApiKey) {
      const resend = new Resend(resendApiKey);
      const notifyEmail = process.env.NOTIFICATION_EMAIL || 'parthmangukiya@shiveshwartextiles.com';
      const senderEmail = process.env.SENDER_EMAIL || 'Wholesale Portal <onboarding@resend.dev>';

      // A. Send email notification to B2B coordinate desk
      try {
        await resend.emails.send({
          from: senderEmail,
          to: notifyEmail,
          subject: `New Wholesale Inquiry - ${cleanCompanyName || 'No Company'}`,
          text: `New inquiry received.

Name:
${cleanFullName}

Email:
${cleanBusinessEmail}

Company:
${cleanCompanyName || 'N/A'}

Subject:
${cleanSubject}

Country:
${cleanCountry || 'N/A'}

VAT Number:
${cleanVatNumber || 'N/A'}

Source:
${cleanSource || 'N/A'}

Message:
${cleanMessage}

Submitted At:
${submissionTime}`,
          html: `<div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid rgba(184, 146, 74, 0.15); background: #0c0b09; color: #f5f0e8; border-radius: 4px;">
            <h2 style="color: #d4a96a; border-bottom: 1px solid rgba(184, 146, 74, 0.15); padding-bottom: 10px; margin-top: 0; font-size: 20px; font-weight: normal; text-transform: uppercase; letter-spacing: 0.1em;">New Wholesale Inquiry</h2>
            <p style="color: #f5f0e8/80; font-size: 14px;">A new business inquiry has been recorded in the database.</p>
            <table style="width: 100%; border-collapse: collapse; margin: 20px 0; font-size: 13px;">
              <tr style="border-bottom: 1px solid rgba(245, 240, 232, 0.05);"><td style="padding: 10px 0; color: #d4a96a; width: 140px;">Full Name</td><td style="padding: 10px 0; color: #f5f0e8; font-weight: bold;">${cleanFullName}</td></tr>
              <tr style="border-bottom: 1px solid rgba(245, 240, 232, 0.05);"><td style="padding: 10px 0; color: #d4a96a;">Business Email</td><td style="padding: 10px 0; color: #f5f0e8; font-weight: bold;">${cleanBusinessEmail}</td></tr>
              <tr style="border-bottom: 1px solid rgba(245, 240, 232, 0.05);"><td style="padding: 10px 0; color: #d4a96a;">Company Name</td><td style="padding: 10px 0; color: #f5f0e8; font-weight: bold;">${cleanCompanyName || 'N/A'}</td></tr>
              <tr style="border-bottom: 1px solid rgba(245, 240, 232, 0.05);"><td style="padding: 10px 0; color: #d4a96a;">Subject</td><td style="padding: 10px 0; color: #f5f0e8;">${cleanSubject}</td></tr>
              <tr style="border-bottom: 1px solid rgba(245, 240, 232, 0.05);"><td style="padding: 10px 0; color: #d4a96a;">Country</td><td style="padding: 10px 0; color: #f5f0e8;">${cleanCountry || 'N/A'}</td></tr>
              <tr style="border-bottom: 1px solid rgba(245, 240, 232, 0.05);"><td style="padding: 10px 0; color: #d4a96a;">VAT Number</td><td style="padding: 10px 0; color: #f5f0e8;">${cleanVatNumber || 'N/A'}</td></tr>
              <tr style="border-bottom: 1px solid rgba(245, 240, 232, 0.05);"><td style="padding: 10px 0; color: #d4a96a;">Found Us Via</td><td style="padding: 10px 0; color: #f5f0e8;">${cleanSource || 'N/A'}</td></tr>
              <tr style="border-bottom: 1px solid rgba(245, 240, 232, 0.05);"><td style="padding: 10px 0; color: #d4a96a;">Submitted At</td><td style="padding: 10px 0; color: #f5f0e8;">${submissionTime}</td></tr>
            </table>
            <div style="margin-top: 20px; padding: 15px; background: rgba(184, 146, 74, 0.05); border: 1px solid rgba(184, 146, 74, 0.1); border-radius: 2px;">
              <h4 style="color: #d4a96a; margin: 0 0 10px 0; font-size: 13px; text-transform: uppercase;">Message Details</h4>
              <p style="white-space: pre-wrap; font-size: 13px; line-height: 1.6; color: #f5f0e8; margin: 0;">${cleanMessage}</p>
            </div>
          </div>`
        });
      } catch (emailErr) {
        console.error('Error sending notification email:', emailErr);
      }

      // B. Send confirmation auto-reply email to client
      try {
        await resend.emails.send({
          from: senderEmail,
          to: cleanBusinessEmail,
          subject: 'Thank You for Contacting Shiveshwar Textiles',
          text: `Dear ${cleanFullName},

Thank you for your inquiry.

Our team has received your request and will review the details shortly.

We typically respond within one business day.

Regards,
Shiveshwar Textiles`,
          html: `<div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid rgba(184, 146, 74, 0.15); background: #0c0b09; color: #f5f0e8; border-radius: 4px;">
            <h2 style="color: #d4a96a; border-bottom: 1px solid rgba(184, 146, 74, 0.15); padding-bottom: 10px; margin-top: 0; font-size: 18px; font-weight: normal; text-transform: uppercase;">Inquiry Received</h2>
            <p>Dear ${cleanFullName},</p>
            <p>Thank you for contacting Shiveshwar Textiles. We have received your wholesale inquiry and our B2B team will review the details shortly.</p>
            <p>We typically respond to wholesale RFQs with fabric specs and shipping options within <strong>one business day</strong>.</p>
            <br />
            <p style="color: #d4a96a; margin-bottom: 0;">Regards,<br /><strong style="font-size: 14px;">Shiveshwar Textiles</strong><br />Surat, Gujarat, India</p>
          </div>`
        });
      } catch (autoReplyErr) {
        console.error('Error sending auto-reply email:', autoReplyErr);
      }
    } else {
      console.warn('RESEND_API_KEY is not defined. Skipping email dispatch.');
    }

    return { success: true };
  } catch (err) {
    console.error('Unhandled Server Action error:', err);
    return { success: false, error: 'A critical server error occurred.' };
  }
}
