import { NextRequest, NextResponse } from 'next/server';
import { CMSDatabase } from '@/lib/cms/database';
import fs from 'fs';
import path from 'path';

const PUBLIC_IMAGES = path.join(process.cwd(), 'public', 'images');

export async function GET() {
  try {
    let items = CMSDatabase.getMedia();
    // If media.json is empty, scan public/images and seed
    if ((!items || items.length === 0) && fs.existsSync(PUBLIC_IMAGES)) {
      const files = fs.readdirSync(PUBLIC_IMAGES);
      items = files.map(f => ({ id: Date.now().toString() + '-' + f, filename: f, url: `/images/${f}`, type: 'image', size: 0, uploadedAt: new Date().toISOString() }));
      // persist
      try { fs.writeFileSync(path.join(process.cwd(), 'cms-data', 'media.json'), JSON.stringify(items, null, 2)); } catch(e){}
    }
    return NextResponse.json(items);
  } catch (error) {
    console.error('Error fetching media:', error);
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const item = CMSDatabase.addMedia(body);
    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    console.error('Error adding media:', error);
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 });
    const ok = CMSDatabase.deleteMedia(id);
    return NextResponse.json({ success: ok });
  } catch (error) {
    console.error('Error deleting media:', error);
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
