import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { CMSDatabase } from '@/lib/cms/database';

const PUBLIC_DIR = path.join(process.cwd(), 'public');
const SITEMAP_FILE = path.join(PUBLIC_DIR, 'sitemap.xml');

function buildSitemap(pages: any[]) {
  const urls = pages.filter(p => p.status === 'published').map(p => {
    const loc = p.slug === '/' ? '/' : p.slug;
    const lastmod = p.updatedAt || p.createdAt || new Date().toISOString();
    return `<url><loc>${loc}</loc><lastmod>${new Date(lastmod).toISOString()}</lastmod><changefreq>monthly</changefreq><priority>0.7</priority></url>`;
  }).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`;
}

export async function GET() {
  try {
    if (fs.existsSync(SITEMAP_FILE)) {
      const content = fs.readFileSync(SITEMAP_FILE, 'utf-8');
      return new NextResponse(content, { headers: { 'Content-Type': 'application/xml' } });
    }
    const pages = CMSDatabase.getPages();
    const xml = buildSitemap(pages);
    fs.writeFileSync(SITEMAP_FILE, xml, 'utf-8');
    return new NextResponse(xml, { headers: { 'Content-Type': 'application/xml' } });
  } catch (error) {
    console.error('Error reading/generating sitemap:', error);
    return NextResponse.json({ error: 'Failed to generate sitemap' }, { status: 500 });
  }
}

export async function POST() {
  try {
    const pages = CMSDatabase.getPages();
    const xml = buildSitemap(pages);
    fs.writeFileSync(SITEMAP_FILE, xml, 'utf-8');
    return NextResponse.json({ success: true, file: '/sitemap.xml' });
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
