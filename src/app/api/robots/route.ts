import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const PUBLIC_DIR = path.join(process.cwd(), 'public');
const ROBOTS_FILE = path.join(PUBLIC_DIR, 'robots.txt');

export async function GET() {
  try {
    if (!fs.existsSync(ROBOTS_FILE)) {
      // default robots
      const def = `User-agent: *\nDisallow:`;
      fs.writeFileSync(ROBOTS_FILE, def);
    }
    const content = fs.readFileSync(ROBOTS_FILE, 'utf-8');
    return new NextResponse(content, { status: 200, headers: { 'Content-Type': 'text/plain' } });
  } catch (error) {
    console.error('Error reading robots:', error);
    return NextResponse.json({ error: 'Failed to read robots' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.text();
    fs.writeFileSync(ROBOTS_FILE, body, 'utf-8');
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error writing robots:', error);
    return NextResponse.json({ error: 'Failed to write robots' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  // allow creating verification files for Ahrefs: accept JSON { ahrefs: 'code' }
  try {
    const body = await request.json();
    if (body?.ahrefs) {
      const file = path.join(PUBLIC_DIR, `ahrefs-site-verification-${body.ahrefs}.html`);
      fs.writeFileSync(file, `<html><head><meta name="ahrefs-site-verification" content="${body.ahrefs}" /></head><body>Ahrefs verification</body></html>`);
      return NextResponse.json({ success: true, file: `/ahrefs-site-verification-${body.ahrefs}.html` });
    }
    return NextResponse.json({ error: 'No action' }, { status: 400 });
  } catch (error) {
    console.error('Error in robots POST:', error);
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
