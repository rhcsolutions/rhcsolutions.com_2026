import { NextRequest, NextResponse } from 'next/server';
import { CMSDatabase } from '@/lib/cms/database';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const apiToken = process.env.CLOUDFLARE_API_TOKEN || CMSDatabase.getSettings()?.cloudflareApiToken;
    const zoneId = body.zoneId || CMSDatabase.getSettings()?.cloudflareZoneId;
    if (!apiToken || !zoneId) return NextResponse.json({ error: 'Missing Cloudflare config' }, { status: 400 });

    const res = await fetch(`https://api.cloudflare.com/client/v4/zones/${zoneId}/purge_cache`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${apiToken}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ purge_everything: true })
    });
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error purging Cloudflare:', error);
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
