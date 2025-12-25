import { NextRequest, NextResponse } from 'next/server';
import { CMSDatabase } from '@/lib/cms/database';

// GET /api/cms/settings - Get site settings
export async function GET() {
  try {
    const settings = CMSDatabase.getSettings();
    return NextResponse.json(settings);
  } catch (error) {
    console.error('Error fetching settings:', error);
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 });
  }
}

// PUT /api/cms/settings - Update site settings
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const updatedSettings = CMSDatabase.updateSettings(body);
    return NextResponse.json(updatedSettings);
  } catch (error) {
    console.error('Error updating settings:', error);
    return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 });
  }
}
