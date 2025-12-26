import { NextRequest, NextResponse } from 'next/server';
import { CMSDatabase } from '@/lib/cms/database';
import { generateBase32Secret, otpauthURI, verifyTotp } from '@/lib/totp';

async function generateSecret(id: string) {
  const secret = generateBase32Secret();
  CMSDatabase.setTwoFASecret(id, secret);
  const user = CMSDatabase.getUsers().find(u => u.id === id);
  const uri = otpauthURI(secret, user?.email || user?.name || `user-${id}`, 'RHC');
  return { secret, uri };
}

// GET /api/cms/users/2fa?id= - generate secret (compatibility)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'User id required' }, { status: 400 });
    const payload = await generateSecret(id);
    return NextResponse.json(payload);
  } catch (error) {
    console.error('Error generating 2FA secret (GET):', error);
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}

// POST /api/cms/users/2fa - generate secret for user (body: { id })
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { id } = body;
    if (!id) return NextResponse.json({ error: 'User id required' }, { status: 400 });
    const payload = await generateSecret(id);
    return NextResponse.json(payload);
  } catch (error) {
    console.error('Error generating 2FA secret:', error);
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}

// PUT /api/cms/users/2fa - verify and enable (body: { id, token })
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, token } = body;
    if (!id || !token) return NextResponse.json({ error: 'Missing' }, { status: 400 });
    const user = CMSDatabase.getUsers().find(u => u.id === id);
    if (!user || !user.twoFASecret) return NextResponse.json({ error: 'User or secret not found' }, { status: 404 });
    const ok = verifyTotp(user.twoFASecret, token);
    if (!ok) return NextResponse.json({ error: 'Invalid token' }, { status: 400 });
    CMSDatabase.toggleTwoFA(id, true);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error enabling 2FA:', error);
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}

// DELETE /api/cms/users/2fa?id= - disable
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 });
    CMSDatabase.toggleTwoFA(id, false);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error disabling 2FA:', error);
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
