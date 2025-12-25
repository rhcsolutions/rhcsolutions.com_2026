import { NextRequest, NextResponse } from 'next/server';
import { CMSDatabase } from '@/lib/cms/database';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { token, password } = body;
    if (!token || !password) return NextResponse.json({ error: 'Missing' }, { status: 400 });
    const ok = CMSDatabase.completeReset(token, password);
    if (!ok) return NextResponse.json({ error: 'Invalid or expired token' }, { status: 400 });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error completing reset:', error);
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
