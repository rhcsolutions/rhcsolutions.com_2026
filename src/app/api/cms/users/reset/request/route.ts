import { NextRequest, NextResponse } from 'next/server';
import { CMSDatabase } from '@/lib/cms/database';
import { sendEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;
    if (!email) return NextResponse.json({ error: 'email required' }, { status: 400 });
    const token = CMSDatabase.generateResetToken(email);
    if (!token) return NextResponse.json({ error: 'User not found' }, { status: 404 });

    const siteUrl = process.env.NEXTAUTH_URL || `http://localhost:3003`;
    const resetLink = `${siteUrl}/admin/reset?token=${token}`;

    // Send email (REQUIRED in production)
    const smtpConfigured = process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS;
    
    if (!smtpConfigured) {
      // In development without SMTP, log the link but don't return token to client
      console.log(`[DEV] Reset link for ${email}: ${resetLink}`);
      return NextResponse.json({ 
        success: true, 
        message: 'Reset email would be sent. Configure SMTP or check server logs for dev link.' 
      });
    }

    try {
      await sendEmail({
        to: email,
        subject: 'Password reset for RHC Solutions',
        text: `Use this link to reset your password: ${resetLink}`,
        html: `<p>Use this link to reset your password:</p><p><a href="${resetLink}">${resetLink}</a></p>`
      });
      return NextResponse.json({ success: true, message: 'Reset email sent' });
    } catch (mailErr) {
      console.error('SMTP send failed:', mailErr);
      return NextResponse.json({ error: 'Failed to send reset email' }, { status: 500 });
    }
  } catch (error) {
    console.error('Error requesting reset:', error);
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
