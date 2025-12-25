import { NextRequest, NextResponse } from 'next/server';
import { CMSDatabase } from '@/lib/cms/database';
import { getToken } from 'next-auth/jwt';

// GET /api/cms/pages - Get all pages
// GET /api/cms/pages?slug=/about - Get page by slug
export async function GET(request: NextRequest) {
  try {
    console.log('[API] GET /api/cms/pages');
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');
    const id = searchParams.get('id');

    if (id) {
      const page = CMSDatabase.getPage(id);
      if (!page) {
        return NextResponse.json({ error: 'Page not found' }, { status: 404 });
      }
      return NextResponse.json(page);
    }

    if (slug) {
      const page = CMSDatabase.getPageBySlug(slug);
      if (!page) {
        return NextResponse.json({ error: 'Page not found' }, { status: 404 });
      }
      return NextResponse.json(page);
    }

    const pages = CMSDatabase.getPages();
    return NextResponse.json(pages);
  } catch (error) {
    console.error('Error fetching pages:', error);
    return NextResponse.json({ error: 'Failed to fetch pages' }, { status: 500 });
  }
}

// POST /api/cms/pages - Create new page
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const token = await getToken({ req: request as any, secret: process.env.NEXTAUTH_SECRET });
    const email = token && (token as any).email ? (token as any).email : 'admin';
    const newPage = CMSDatabase.createPage({ ...body, createdBy: body.createdBy || email, updatedBy: email });
    return NextResponse.json(newPage, { status: 201 });
  } catch (error) {
    console.error('Error creating page:', error);
    return NextResponse.json({ error: 'Failed to create page' }, { status: 500 });
  }
}

// PUT /api/cms/pages - Update existing page
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const token = await getToken({ req: request as any, secret: process.env.NEXTAUTH_SECRET });
    const email = token && (token as any).email ? (token as any).email : 'admin';
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json({ error: 'Page ID is required' }, { status: 400 });
    }

    const updatedPage = CMSDatabase.updatePage(id, { ...updates, updatedBy: email });
    
    if (!updatedPage) {
      return NextResponse.json({ error: 'Page not found' }, { status: 404 });
    }

    return NextResponse.json(updatedPage);
  } catch (error) {
    console.error('Error updating page:', error);
    return NextResponse.json({ error: 'Failed to update page' }, { status: 500 });
  }
}

// DELETE /api/cms/pages?id=123 - Delete page
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Page ID is required' }, { status: 400 });
    }

    const deleted = CMSDatabase.deletePage(id);
    
    if (!deleted) {
      return NextResponse.json({ error: 'Page not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting page:', error);
    return NextResponse.json({ error: 'Failed to delete page' }, { status: 500 });
  }
}
