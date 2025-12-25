import { NextResponse } from 'next/server';
import { CMSDatabase } from '@/lib/cms/database';

export async function GET() {
  try {
    const jobs = CMSDatabase.getJobs();

    // Filter out invisible jobs if needed, but for now return all or filter client side
    // In production, you might want separate endpoints for admin vs public
    const publicJobs = jobs.filter((job: any) => job.visible !== false);

    return NextResponse.json(publicJobs);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch jobs' }, { status: 500 });
  }
}
