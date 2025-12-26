import { NextRequest, NextResponse } from 'next/server';
import { CMSDatabase } from '@/lib/cms/database';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const forms = CMSDatabase.getForms();
    return NextResponse.json(forms);
  } catch (error) {
    console.error('Error fetching forms:', error);
    return NextResponse.json({ error: 'Failed to fetch forms' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, updates } = body || {};
    if (!id || !updates) return NextResponse.json({ error: 'id and updates are required' }, { status: 400 });

    const updated = CMSDatabase.updateForm(id, updates);
    if (!updated) return NextResponse.json({ error: 'Form not found' }, { status: 404 });
    return NextResponse.json(updated);
  } catch (error) {
    console.error('Error updating form:', error);
    return NextResponse.json({ error: 'Failed to update form' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'Form id required' }, { status: 400 });
    const ok = CMSDatabase.deleteForm(id);
    return NextResponse.json({ success: ok });
  } catch (error) {
    console.error('Error deleting form:', error);
    return NextResponse.json({ error: 'Failed to delete form' }, { status: 500 });
  }
}
