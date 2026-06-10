const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

// Load environment variables from the parent directory .env
require('dotenv').config({ path: path.join(__dirname, '../.env') });

async function testEmail() {
  console.log('Testing SMTP Transporter with environment variables...');

  const host = process.env.SMTP_HOST || 'smtp.hostinger.com';
  const port = Number(process.env.SMTP_PORT) || 465;
  const secure = process.env.SMTP_SECURE === 'true';
  const user = process.env.SMTP_USER || 'info@corematrixs.com';
  const pass = process.env.SMTP_PASSWORD || 'Corematix@123#';
  const fromAddress = process.env.SMTP_FROM_ADDRESS || 'info@corematrixs.com';
  const adminEmail = process.env.SUPER_ADMIN_EMAILS || 'info@corematrixs.com';

  console.log(`Configuring transporter: host=${host}, port=${port}, secure=${secure}, user=${user}`);

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user,
      pass,
    },
  });

  try {
    // Verify connection configuration
    await transporter.verify();
    console.log('✅ SMTP connection verified successfully!');

    // Mock Send Email to check actual delivery
    console.log(`Sending test email to ${adminEmail}...`);
    
    const info = await transporter.sendMail({
      from: `"Corematrix Test" <${fromAddress}>`,
      to: adminEmail,
      subject: '⚡ Corematrix SMTP Configuration Test Success',
      text: 'Congratulations! The Hostinger SMTP credentials and Nodemailer integration have been configured successfully and are fully working.',
      html: `
        <div style="background-color: #0b0f19; color: #ffffff; padding: 40px; border-radius: 12px; font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #1f2937;">
          <h2 style="color: #10b981; margin-top: 0;">⚡ SMTP Verification Complete</h2>
          <p style="color: #d1d5db; line-height: 1.6;">The SMTP settings are 100% correct. Nodemailer has successfully authenticated and verified the Hostinger credentials.</p>
          <hr style="border-color: #1f2937; margin: 20px 0;">
          <p style="font-size: 12px; color: #6b7280; margin: 0;">Corematrix Digital Product Engineering Hub · Automated Verification System</p>
        </div>
      `
    });

    console.log('✅ Test email sent successfully!');
    console.log('Message ID:', info.messageId);
  } catch (error) {
    console.error('❌ SMTP connection or send failed:', error);
  }
}

testEmail();
