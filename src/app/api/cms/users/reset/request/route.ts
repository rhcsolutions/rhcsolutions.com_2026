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

    // try sending email if SMTP configured
    try {
      await sendEmail({
        to: email,
        subject: 'Password reset for RHC Solutions',
        text: `Use this link to reset your password: ${resetLink}`,
        html: `<p>Use this link to reset your password:</p><p><a href="${resetLink}">${resetLink}</a></p>`
      });
      return NextResponse.json({ success: true, sent: true });
    } catch (mailErr) {
      console.warn('SMTP send failed; returning token for dev', mailErr);
      return NextResponse.json({ success: true, token });
    }
  } catch (error) {
    console.error('Error requesting reset:', error);
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
