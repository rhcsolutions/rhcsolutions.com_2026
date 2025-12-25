import nodemailer from 'nodemailer';

// Validate SMTP config once at module load
function validateSMTPConfig() {
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  
  const configured = host && port && user && pass;
  
  if (process.env.NODE_ENV === 'production' && !configured) {
    console.error('❌ PRODUCTION: SMTP not configured. Email features will fail. Set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS env vars.');
  } else if (!configured && process.env.NODE_ENV !== 'development') {
    console.warn('⚠️  SMTP not configured. Email features disabled. For password resets, set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS.');
  }
  
  return configured;
}

const smtpConfigured = validateSMTPConfig();

export async function sendEmail(opts: { to: string; subject: string; text?: string; html?: string; from?: string }) {
  if (!smtpConfigured) {
    throw new Error('SMTP not configured');
  }

  const host = process.env.SMTP_HOST!;
  const port = parseInt(process.env.SMTP_PORT!);
  const user = process.env.SMTP_USER!;
  const pass = process.env.SMTP_PASS!;
  const from = opts.from || process.env.FROM_EMAIL || `no-reply@${process.env.NEXT_PUBLIC_SITE_DOMAIN || 'localhost'}`;

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass }
  });

  try {
    const info = await transporter.sendMail({
      from,
      to: opts.to,
      subject: opts.subject,
      text: opts.text,
      html: opts.html
    });
    return info;
  } catch (error) {
    console.error('Failed to send email:', error);
    throw error;
  }
}
