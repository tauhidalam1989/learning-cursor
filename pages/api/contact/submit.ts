import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';

export type ContactFormType = 'contact' | 'application' | 'newsletter' | 'feedback';

type Body = {
  formType?: ContactFormType;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  email?: string;
  phoneCountry?: string;
  phoneNumber?: string;
  company?: string;
  role?: string;
  services?: string[];
  timeline?: string;
  budget?: number;
  codebase?: string;
  description?: string;
  source?: string;
  requestNda?: boolean;
  message?: string; // Compiled text message for CMS
};

function validate(body: Body) {
  const errors: Record<string, string> = {};
  if (!body.fullName || !body.fullName.trim() || body.fullName.trim().length < 2) {
    errors.fullName = 'Full name is required and must be at least 2 characters';
  }
  if (!body.email || !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(body.email)) {
    errors.email = 'Valid email is required';
  }
  if (!body.message || !body.message.trim() || body.message.trim().length < 10) {
    errors.message = 'Please provide a more detailed message (min 10 characters)';
  }
  if (body.phoneNumber && !/^\d{7,15}$/.test(body.phoneNumber)) {
    errors.phoneNumber = 'Enter a valid phone number';
  }
  return errors;
}

function formatBudget(value?: number): string {
  if (!value) return 'Not Specified';
  if (value >= 500000) return '$500k+';
  if (value >= 1000) return `$${value / 1000}k`;
  return `$${value.toLocaleString()}`;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const body: Body = req.body ?? {};
  const errors = validate(body);
  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors });
  }

  try {
    // 1. Save to Payload CMS database
    const protocol = req.headers['x-forwarded-proto'] || 'http';
    const host = req.headers.host || 'localhost:3000';
    const base = `${protocol}://${host}`;

    const resp = await fetch(new URL('/api/payload/api/cms-contacts', base).toString(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        formType: body.formType ?? 'contact',
        fullName: body.fullName,
        email: body.email,
        phoneCountry: body.phoneCountry,
        phoneNumber: body.phoneNumber,
        company: body.company,
        message: body.message,
      }),
    });

    if (!resp.ok) {
      const text = await resp.text();
      console.error('Payload CMS Save failed:', text);
      return res.status(502).json({ error: 'Failed to save contact submission', detail: text });
    }

    const json = await resp.json();
    const submissionId = json?.doc?.id ?? json?.id ?? 'N/A';

    // 2. Prepare Logo Inline Attachment
    let logoAttachment: any = null;
    const logoPath = path.join(process.cwd(), 'public', 'images', 'logo.png');
    if (fs.existsSync(logoPath)) {
      try {
        logoAttachment = {
          filename: 'logo.png',
          content: fs.readFileSync(logoPath),
          cid: 'corematrix-logo', // Referenced via <img src="cid:corematrix-logo" />
        };
      } catch (err) {
        console.error('Failed to read logo image:', err);
      }
    }

    // 3. Configure SMTP Transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.hostinger.com',
      port: Number(process.env.SMTP_PORT) || 465,
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER || 'info@corematrixs.com',
        pass: process.env.SMTP_PASSWORD || 'Corematix@123#',
      },
    });

    // Email styling constants (harmonious HSL custom dark mode matching Corematrix palette)
    const emailStyles = `
      body { margin: 0; padding: 0; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #030712; color: #f3f4f6; -webkit-font-smoothing: antialiased; word-break: break-word; overflow-wrap: break-word; }
      .container { width: 100% !important; max-width: 650px; margin: 0 auto; background-color: #0b0f19; border: 1px solid #1f2937; border-radius: 20px; overflow: hidden; margin-top: 20px; margin-bottom: 20px; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.5); }
      .header { padding: 40px 30px; text-align: center; background: linear-gradient(180deg, #0f172a 0%, #0b0f19 100%); border-bottom: 1px solid #111827; }
      .logo { max-height: 42px; margin-bottom: 20px; }
      .badge { display: inline-block; padding: 6px 14px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #10b981; background-color: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.25); border-radius: 50px; margin-bottom: 15px; }
      .content { padding: 40px 35px; }
      .title { font-size: 24px; font-weight: 800; color: #ffffff; margin: 0 0 15px 0; line-height: 1.3; }
      .subtitle { font-size: 15px; color: #9ca3af; margin: 0 0 30px 0; line-height: 1.6; }
      .card { background-color: #111827; border: 1px solid #1f2937; border-radius: 14px; padding: 24px; margin-bottom: 30px; }
      .grid { width: 100%; border-collapse: collapse; }
      .grid-item { padding: 12px 0; border-bottom: 1px solid #1f2937; vertical-align: top; }
      .grid-item:last-child { border-bottom: none; }
      .label { font-size: 12px; font-weight: 700; color: #4b5563; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px; }
      .value { font-size: 14px; color: #e5e7eb; font-weight: 500; }
      .value-highlight { color: #10b981; font-weight: 700; }
      .desc-box { background-color: #030712; border-left: 3px solid #10b981; border-radius: 4px; padding: 16px; font-size: 14px; color: #d1d5db; line-height: 1.6; font-style: italic; white-space: pre-wrap; margin-top: 10px; }
      .footer { background-color: #080c14; padding: 30px; text-align: center; border-top: 1px solid #111827; }
      .footer-text { font-size: 12px; color: #4b5563; line-height: 1.8; }
      .footer-links { margin-top: 15px; font-size: 13px; }
      .footer-link { color: #10b981; text-decoration: none; margin: 0 10px; font-weight: 600; }
      .btn { display: inline-block; background-color: #10b981; color: #ffffff !important; text-decoration: none; padding: 12px 28px; font-size: 14px; font-weight: 700; border-radius: 8px; margin-top: 10px; box-shadow: 0 4px 14px 0 rgba(16, 185, 129, 0.4); text-transform: uppercase; letter-spacing: 0.05em; transition: background 0.2s; }
      .timeline { width: 100%; margin: 30px 0; border-collapse: collapse; }
      .timeline-step { padding: 16px 20px; background-color: #111827; border: 1px solid #1f2937; border-radius: 12px; margin-bottom: 12px; }
      .timeline-num { display: inline-block; width: 22px; height: 22px; line-height: 22px; border-radius: 50%; background-color: #10b981; color: #ffffff; text-align: center; font-size: 11px; font-weight: 800; margin-right: 10px; vertical-align: middle; }
      .timeline-title { display: inline-block; font-size: 14px; font-weight: 700; color: #ffffff; vertical-align: middle; }
      .timeline-desc { font-size: 12px; color: #9ca3af; margin: 6px 0 0 32px; line-height: 1.5; }

      @media only screen and (max-width: 600px) {
        .container { border-radius: 0px !important; margin-top: 0px !important; margin-bottom: 0px !important; width: 100% !important; }
        .content { padding: 25px 15px !important; }
        .card { padding: 16px !important; margin-bottom: 20px !important; }
        .title { font-size: 20px !important; }
        .subtitle { font-size: 13px !important; margin-bottom: 20px !important; }
        .timeline-desc { margin-left: 0px !important; }
      }
    `;

    // 4. Send Lead Alert Email to Admin (junednite@gmail.com)
    const adminHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Project Lead Brief</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
        <style>${emailStyles}</style>
      </head>
      <body style="margin: 0; padding: 0; background-color: #030712;">
        <div style="background-color: #030712; padding: 20px 0; min-height: 100%; width: 100%; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #f3f4f6;">
          <div class="container" style="width: 100% !important; max-width: 650px; margin: 0 auto; background-color: #0b0f19; border: 1px solid #1f2937; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.5);">
            <div class="header" style="padding: 40px 30px; text-align: center; background: linear-gradient(180deg, #0f172a 0%, #0b0f19 100%); background-color: #0b0f19; border-bottom: 1px solid #111827;">
              ${logoAttachment ? '<img src="cid:corematrix-logo" class="logo" style="max-height: 42px; margin-bottom: 20px;" alt="Corematrix Logo" />' : '<h2 style="color:#ffffff;margin:0;">Corematrix</h2>'}
              <div><span class="badge" style="display: inline-block; padding: 6px 14px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #10b981; background-color: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.25); border-radius: 50px; margin-bottom: 15px;">New Project Lead</span></div>
              <h1 class="title" style="font-size: 24px; font-weight: 800; color: #ffffff; margin: 0 0 15px 0; line-height: 1.3; margin-bottom:0;">New Project Brief Received</h1>
            </div>
            <div class="content" style="padding: 40px 35px; background-color: #0b0f19;">
              <div class="subtitle" style="font-size: 15px; color: #9ca3af; line-height: 1.6; text-align: center; margin-bottom: 25px;">
                A potential client has submitted a project request via the Corematrix.
              </div>

              <div class="card" style="background-color: #111827; border: 1px solid #1f2937; border-radius: 14px; padding: 24px; margin-bottom: 30px;">
                <h3 style="color:#ffffff;margin-top:0;margin-bottom:20px;font-size:16px;border-bottom:1px solid #1f2937;padding-bottom:10px;"><i class="fas fa-user-shield" style="color: #10b981; margin-right: 8px;"></i> Contact Information</h3>
                <div style="padding: 10px 0; border-bottom: 1px solid #1f2937;">
                  <div class="label" style="font-size: 12px; font-weight: 700; color: #4b5563; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px;">Full Name</div>
                  <div class="value" style="font-size: 14px; color: #e5e7eb; font-weight: 500;">${body.fullName}</div>
                </div>
                <div style="padding: 10px 0; border-bottom: 1px solid #1f2937;">
                  <div class="label" style="font-size: 12px; font-weight: 700; color: #4b5563; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px;">Work Email</div>
                  <div class="value" style="font-size: 14px; color: #e5e7eb; font-weight: 500;"><a href="mailto:${body.email}" style="color:#10b981;text-decoration:none;">${body.email}</a></div>
                </div>
                <div style="padding: 10px 0; border-bottom: 1px solid #1f2937;">
                  <div class="label" style="font-size: 12px; font-weight: 700; color: #4b5563; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px;">Phone Code / Number</div>
                  <div class="value" style="font-size: 14px; color: #e5e7eb; font-weight: 500;">${body.phoneNumber ? `${body.phoneCountry || ''} ${body.phoneNumber}`.trim() : 'Not Provided'}</div>
                </div>
                <div style="padding: 10px 0; border-bottom: 1px solid #1f2937;">
                  <div class="label" style="font-size: 12px; font-weight: 700; color: #4b5563; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px;">Company Name</div>
                  <div class="value" style="font-size: 14px; color: #e5e7eb; font-weight: 500;">${body.company || 'Not Provided'}</div>
                </div>
                <div style="padding: 10px 0; border-bottom: 1px solid #1f2937;">
                  <div class="label" style="font-size: 12px; font-weight: 700; color: #4b5563; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px;">Role</div>
                  <div class="value" style="font-size: 14px; color: #e5e7eb; font-weight: 500;">${body.role || 'Not Provided'}</div>
                </div>
                <div style="padding: 10px 0 0 0;">
                  <div class="label" style="font-size: 12px; font-weight: 700; color: #4b5563; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px;">How Found Us</div>
                  <div class="value" style="font-size: 14px; color: #e5e7eb; font-weight: 500;">${body.source || 'Not Provided'}</div>
                </div>
              </div>

              <div class="card" style="background-color: #111827; border: 1px solid #1f2937; border-radius: 14px; padding: 24px; margin-bottom: 30px;">
                <h3 style="color:#ffffff;margin-top:0;margin-bottom:20px;font-size:16px;border-bottom:1px solid #1f2937;padding-bottom:10px;"><i class="fas fa-lightbulb" style="color: #10b981; margin-right: 8px;"></i> Project Scope & Details</h3>
                <div style="padding: 10px 0; border-bottom: 1px solid #1f2937;">
                  <div class="label" style="font-size: 12px; font-weight: 700; color: #4b5563; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px;">Services Requested</div>
                  <div class="value-highlight" style="color: #10b981; font-weight: 700; font-size: 14px;">${body.services && body.services.length > 0 ? body.services.join(', ') : 'Not Specified'}</div>
                </div>
                <div style="padding: 10px 0; border-bottom: 1px solid #1f2937;">
                  <div class="label" style="font-size: 12px; font-weight: 700; color: #4b5563; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px;">Target Timeline</div>
                  <div class="value" style="font-size: 14px; color: #e5e7eb; font-weight: 500;">${body.timeline || 'Not Specified'}</div>
                </div>
                <div style="padding: 10px 0; border-bottom: 1px solid #1f2937;">
                  <div class="label" style="font-size: 12px; font-weight: 700; color: #4b5563; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px;">Project Budget</div>
                  <div class="value-highlight" style="color: #10b981; font-weight: 700; font-size: 14px;">${formatBudget(body.budget)}</div>
                </div>
                <div style="padding: 10px 0; border-bottom: 1px solid #1f2937;">
                  <div class="label" style="font-size: 12px; font-weight: 700; color: #4b5563; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px;">Existing Codebase?</div>
                  <div class="value" style="font-size: 14px; color: #e5e7eb; font-weight: 500;">${body.codebase || 'Not Specified'}</div>
                </div>
                <div style="padding: 10px 0 0 0;">
                  <div class="label" style="font-size: 12px; font-weight: 700; color: #4b5563; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px;">NDA Required?</div>
                  <div class="value" style="color: ${body.requestNda ? '#10b981' : '#e5e7eb'}; font-weight: bold; font-size: 14px;">
                    ${body.requestNda ? '✓ YES — Needs NDA signed before discussion' : '✗ No NDA requested initially'}
                  </div>
                </div>

                <div class="label" style="margin-top:20px; font-size: 12px; font-weight: 700; color: #4b5563; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px;">Project Description</div>
                <div class="desc-box" style="background-color: #030712; border-left: 3px solid #10b981; border-radius: 4px; padding: 16px; font-size: 14px; color: #d1d5db; line-height: 1.6; font-style: italic; white-space: pre-wrap; margin-top: 10px;">${body.description || 'No description provided.'}</div>
              </div>

              <div style="text-align: center;">
                <a href="mailto:${body.email}?subject=Corematrix%20Project%20Brief%20-%20Discovery%20Call" class="btn" style="display: inline-block; background-color: #10b981; color: #ffffff !important; text-decoration: none; padding: 12px 28px; font-size: 14px; font-weight: 700; border-radius: 8px; margin-top: 10px; box-shadow: 0 4px 14px 0 rgba(16, 185, 129, 0.4); text-transform: uppercase; letter-spacing: 0.05em;">Reply to Lead</a>
              </div>
            </div>
            <div class="footer" style="background-color: #080c14; padding: 30px; text-align: center; border-top: 1px solid #111827;">
              <p class="footer-text" style="font-size: 12px; color: #4b5563; line-height: 1.8; margin: 0;">
                Lead Submission ID: ${submissionId}<br>
                Submitted at: ${new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })} (IST)
              </p>
              <p class="footer-text" style="margin-top:20px;color:#374151;font-size: 12px;line-height: 1.8; margin-bottom: 0;">
                © ${new Date().getFullYear()} Corematrix Intelligent Digital Solutions.
              </p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

    // 5. Send Professional Auto-Responder Email to Lead (body.email)
    const clientHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>We have received your project details - Corematrix</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
        <style>${emailStyles}</style>
      </head>
      <body style="margin: 0; padding: 0; background-color: #030712;">
        <div style="background-color: #030712; padding: 20px 0; min-height: 100%; width: 100%; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #f3f4f6;">
          <div class="container" style="width: 100% !important; max-width: 650px; margin: 0 auto; background-color: #0b0f19; border: 1px solid #1f2937; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.5);">
            <div class="header" style="padding: 40px 30px; text-align: center; background: linear-gradient(180deg, #0f172a 0%, #0b0f19 100%); background-color: #0b0f19; border-bottom: 1px solid #111827;">
              ${logoAttachment ? '<img src="cid:corematrix-logo" class="logo" style="max-height: 42px; margin-bottom: 20px;" alt="Corematrix Logo" />' : '<h2 style="color:#ffffff;margin:0;">Corematrix</h2>'}
              <div><span class="badge" style="display: inline-block; padding: 6px 14px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color:#10b981;border-color:rgba(16,185,129,0.3);background-color:rgba(16,185,129,0.1); border-radius: 50px; margin-bottom: 15px;">Brief Received</span></div>
              <h1 class="title" style="font-size: 24px; font-weight: 800; color: #ffffff; margin: 0 0 15px 0; line-height: 1.3; margin-bottom:5px;">We have received your brief!</h1>
              <p style="color:#9ca3af;margin:0;font-size:14px;">We are preparing a custom technical roadmap for you.</p>
            </div>
            <div class="content" style="padding: 40px 35px; background-color: #0b0f19;">
              <h2 style="color:#ffffff;font-size:18px;margin-top:0;font-weight:700;">Hello ${body.firstName || 'there'},</h2>
              
              <p style="font-size:15px;color:#d1d5db;line-height:1.6;margin-bottom:25px;">
                Thank you for reaching out and sharing your project vision with <strong>Corematrix</strong>. We have successfully received your project details.
              </p>

              <div class="card" style="background-color:rgba(16,185,129,0.03);border:1px dashed rgba(16,185,129,0.25);margin-bottom:30px; padding: 24px; border-radius: 14px;">
                <p style="margin:0;font-size:14px;color:#e5e7eb;line-height:1.6;text-align:center;">
                  <i class="fas fa-bolt-lightning" style="color: #10b981; margin-right: 6px;"></i> <strong>What happens next?</strong> Our technical architect is already reviewing your brief. You will receive a direct, personal response within <strong>24 hours</strong> with a genuine, value-driven technical perspective tailored to your goals.
                </p>
              </div>

              <h3 style="color:#ffffff;font-size:15px;text-transform:uppercase;letter-spacing:0.05em;margin-top:35px;margin-bottom:20px;border-bottom:1px solid #1f2937;padding-bottom:8px;"><i class="fas fa-map-location-dot" style="color: #10b981; margin-right: 8px;"></i> Our Engagement Blueprint</h3>
              
              <div class="timeline-step" style="padding: 16px 20px; background-color: #111827; border: 1px solid #1f2937; border-radius: 12px; margin-bottom: 12px;">
                <table style="width: 100%; border-collapse: collapse; margin-bottom: 6px;">
                  <tr>
                    <td style="width: 24px; vertical-align: middle; padding: 0;">
                      <div style="width: 22px; height: 22px; line-height: 22px; border-radius: 50%; background-color: #10b981; color: #ffffff; text-align: center; font-size: 11px; font-weight: 800;">1</div>
                    </td>
                    <td style="vertical-align: middle; padding: 0 0 0 10px;">
                      <div style="font-size: 14px; font-weight: 700; color: #ffffff; line-height: 22px;">Brief Technical Review</div>
                    </td>
                  </tr>
                </table>
                <div class="timeline-desc" style="font-size: 12px; color: #9ca3af; margin: 6px 0 0 32px; line-height: 1.5;">We carefully analyze your requirements, proposed timeline, and tech architecture with our engineering squad. (Active)</div>
              </div>
              
              <div class="timeline-step" style="padding: 16px 20px; background-color: #111827; border: 1px solid #1f2937; border-radius: 12px; margin-bottom: 12px;">
                <table style="width: 100%; border-collapse: collapse; margin-bottom: 6px;">
                  <tr>
                    <td style="width: 24px; vertical-align: middle; padding: 0;">
                      <div style="width: 22px; height: 22px; line-height: 22px; border-radius: 50%; background-color: #10b981; color: #ffffff; text-align: center; font-size: 11px; font-weight: 800;">2</div>
                    </td>
                    <td style="vertical-align: middle; padding: 0 0 0 10px;">
                      <div style="font-size: 14px; font-weight: 700; color: #ffffff; line-height: 22px;">Personal Technical Outreach</div>
                    </td>
                  </tr>
                </table>
                <div class="timeline-desc" style="font-size: 12px; color: #9ca3af; margin: 6px 0 0 32px; line-height: 1.5;">We reach out via email within 24 business hours to share initial thoughts and schedule a Discovery Call.</div>
              </div>
              
              <div class="timeline-step" style="padding: 16px 20px; background-color: #111827; border: 1px solid #1f2937; border-radius: 12px; margin-bottom: 12px;">
                <table style="width: 100%; border-collapse: collapse; margin-bottom: 6px;">
                  <tr>
                    <td style="width: 24px; vertical-align: middle; padding: 0;">
                      <div style="width: 22px; height: 22px; line-height: 22px; border-radius: 50%; background-color: #10b981; color: #ffffff; text-align: center; font-size: 11px; font-weight: 800;">3</div>
                    </td>
                    <td style="vertical-align: middle; padding: 0 0 0 10px;">
                      <div style="font-size: 14px; font-weight: 700; color: #ffffff; line-height: 22px;">Low-Friction Discovery Call</div>
                    </td>
                  </tr>
                </table>
                <div class="timeline-desc" style="font-size: 12px; color: #9ca3af; margin: 6px 0 0 32px; line-height: 1.5;">A brief, deeply technical session to align on exact scope, deliverables, risk assessments, and architecture.</div>
              </div>
              
              <div class="timeline-step" style="padding: 16px 20px; background-color: #111827; border: 1px solid #1f2937; border-radius: 12px; margin-bottom: 12px;">
                <table style="width: 100%; border-collapse: collapse; margin-bottom: 6px;">
                  <tr>
                    <td style="width: 24px; vertical-align: middle; padding: 0;">
                      <div style="width: 22px; height: 22px; line-height: 22px; border-radius: 50%; background-color: #10b981; color: #ffffff; text-align: center; font-size: 11px; font-weight: 800;">4</div>
                    </td>
                    <td style="vertical-align: middle; padding: 0 0 0 10px;">
                      <div style="font-size: 14px; font-weight: 700; color: #ffffff; line-height: 22px;">Comprehensive Proposal</div>
                    </td>
                  </tr>
                </table>
                <div class="timeline-desc" style="font-size: 12px; color: #9ca3af; margin: 6px 0 0 32px; line-height: 1.5;">Within 48–72 hours of our call, you receive a full, transparent technical proposal outlining pricing, team structures, and milestones.</div>
              </div>
            </div>

            <div class="content" style="padding: 0 35px 40px 35px; background-color: #0b0f19;">
              <h3 style="color:#ffffff;font-size:15px;text-transform:uppercase;letter-spacing:0.05em;margin-top:40px;margin-bottom:20px;border-bottom:1px solid #1f2937;padding-bottom:8px;"><i class="fas fa-circle-info" style="color: #10b981; margin-right: 8px;"></i> About Corematrix</h3>
              <p style="font-size:14px;color:#9ca3af;line-height:1.6;margin-bottom:20px;">
                Corematrix is a remote-first, premium digital product engineering firm. We construct state-of-the-art products, scale systems, and embed elite development capacity for forward-thinking organizations worldwide.
              </p>
              
              <div style="margin-top:15px;">
                <div style="padding:12px 0; border-bottom:1px solid #1f2937;">
                  <div style="color:#ffffff;font-size:14px;font-weight:700;margin-bottom:5px;"><i class="fas fa-brain" style="color: #10b981; margin-right: 8px;"></i> AI & Intelligent Systems</div>
                  <div style="font-size:12px;color:#9ca3af;line-height:1.6;">Bespoke LLMs, intelligent workflow automation agents, predictive data layers, and custom neural design.</div>
                </div>
                <div style="padding:12px 0; border-bottom:1px solid #1f2937;">
                  <div style="color:#ffffff;font-size:14px;font-weight:700;margin-bottom:5px;"><i class="fas fa-laptop-code" style="color: #10b981; margin-right: 8px;"></i> High-Scale Web & Mobile</div>
                  <div style="font-size:12px;color:#9ca3af;line-height:1.6;">Modern, beautiful architectures engineered with Next.js, React Native, high responsiveness, and microsecond performance.</div>
                </div>
                <div style="padding:12px 0; border-bottom:1px solid #1f2937;">
                  <div style="color:#ffffff;font-size:14px;font-weight:700;margin-bottom:5px;"><i class="fas fa-cloud" style="color: #10b981; margin-right: 8px;"></i> Enterprise SaaS & Platforms</div>
                  <div style="font-size:12px;color:#9ca3af;line-height:1.6;">Secure, robust, cloud-native SaaS platforms engineered to top-tier enterprise standards.</div>
                </div>
                <div style="padding:12px 0 0 0;">
                  <div style="color:#ffffff;font-size:14px;font-weight:700;margin-bottom:5px;"><i class="fas fa-users" style="color: #10b981; margin-right: 8px;"></i> Elite Dedicated Teams</div>
                  <div style="font-size:12px;color:#9ca3af;line-height:1.6;">Specialized squad matching to integrate seamlessly with your product workflows and scale your engineering speed.</div>
                </div>
              </div>

              <div style="margin-top:40px;padding-top:25px;border-top:1px solid #1f2937;font-size:14px;color:#d1d5db;line-height:1.6;">
                We look forward to collaborating and building something extraordinary with you.<br><br>
                To your success,<br>
                <strong>The Corematrix Team</strong>
              </div>
            </div>
            <div class="footer" style="background-color: #080c14; padding: 30px; text-align: center; border-top: 1px solid #111827;">
              <p class="footer-text" style="font-size: 12px; color: #4b5563; line-height: 1.8; margin: 0;">
                Need to add or modify details? Just reply directly to this email.<br>
                Corematrix Digital Product Engineering Hub · Remote-First · Available Globally
              </p>
              <div class="footer-links" style="margin-top: 15px; font-size: 13px;">
                <a href="https://corematrixs.com" class="footer-link" style="color: #10b981; text-decoration: none; margin: 0 10px; font-weight: 600;">Website</a>
                <a href="https://linkedin.com/company/corematrix" class="footer-link" style="color: #10b981; text-decoration: none; margin: 0 10px; font-weight: 600;">LinkedIn</a>
                <a href="https://github.com/corematrix" class="footer-link" style="color: #10b981; text-decoration: none; margin: 0 10px; font-weight: 600;">GitHub</a>
              </div>
              <p class="footer-text" style="margin-top:20px;color:#374151;font-size:11px; margin-bottom: 0; line-height: 1.8;">
                © ${new Date().getFullYear()} Corematrix. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

    // 6. Send the emails in parallel (or sequentionally)
    const fromName = process.env.SMTP_FROM_NAME || 'Core Matrix';
    const fromAddress = process.env.SMTP_FROM_ADDRESS || 'info@corematrixs.com';
    const fromField = `"${fromName}" <${fromAddress}>`;
    const adminEmail = process.env.SUPER_ADMIN_EMAILS || 'info@corematrixs.com';

    const adminMailPromise = transporter.sendMail({
      from: `"Corematrix Portal" <${fromAddress}>`,
      to: adminEmail,
      subject: `New Lead Brief: ${body.fullName} (${body.company || 'Personal'})`,
      text: body.message,
      html: adminHtml,
      attachments: logoAttachment ? [logoAttachment] : [],
    });

    const clientMailPromise = transporter.sendMail({
      from: fromField,
      to: body.email,
      subject: `Project brief received - Corematrix`,
      text: `Hello ${body.firstName || 'there'},\n\nWe have received your project details! Our technical architect is already reviewing them, and a technical leader will contact you with a direct, personal response within 24 hours.\n\nTo your success,\nThe Corematrix Team`,
      html: clientHtml,
      attachments: logoAttachment ? [logoAttachment] : [],
    });

    // We await both emails, but wrap in try/catch so email failures do not roll back a successful database save
    try {
      await Promise.all([adminMailPromise, clientMailPromise]);
      console.log(`Successfully dispatched premium notifications for lead submission ID: ${submissionId}`);
    } catch (mailErr) {
      console.error('Email dispatch failed:', mailErr);
      // Non-blocking: database submission succeeded, so we still proceed
    }

    return res.status(201).json({ ok: true, id: submissionId });
  } catch (err: any) {
    console.error('Contact submit error:', err);
    return res.status(500).json({
      error: 'Internal Server Error',
      message: err?.message || String(err),
      stack: err?.stack,
    });
  }
}
