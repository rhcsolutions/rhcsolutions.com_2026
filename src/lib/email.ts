import nodemailer from 'nodemailer';

export async function sendEmail(opts: { to: string; subject: string; text?: string; html?: string; from?: string }) {
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT) : undefined;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = opts.from || process.env.FROM_EMAIL || `no-reply@${process.env.NEXT_PUBLIC_SITE_DOMAIN || 'localhost'}`;

  if (!host || !port || !user || !pass) {
    console.warn('SMTP not configured; skipping sendEmail');
    return false;
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass }
  });

  const info = await transporter.sendMail({ from, to: opts.to, subject: opts.subject, text: opts.text, html: opts.html });
  return info;
}
