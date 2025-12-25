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

export async function POST(request: Request) {
  try {
    const job = await request.json();
    
    // Add default fields if not provided
    const newJob = {
      id: Date.now().toString(),
      title: job.title || 'New Job',
      department: job.department || '',
      locationType: job.locationType || 'remote',
      type: job.type || 'Full-time',
      description: job.description || '',
      requirements: job.requirements || '',
      visible: job.visible !== undefined ? job.visible : true,
      postedDate: job.postedDate || new Date().toISOString().split('T')[0],
      applicants: job.applicants || 0,
      city: job.city || '',
      country: job.country || '',
      createdBy: 'admin@rhcsolutions.com',
      updatedBy: 'admin@rhcsolutions.com',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...job
    };
    
    const jobs = CMSDatabase.getJobs();
    if (Array.isArray(jobs)) {
      jobs.push(newJob);
      CMSDatabase.saveJobs(jobs);
    } else {
      CMSDatabase.saveJobs([newJob]);
    }
    
    return NextResponse.json(newJob, { status: 201 });
  } catch (error) {
    console.error('Error creating job:', error);
    return NextResponse.json({ error: 'Failed to create job', details: String(error) }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const data = await request.json();
    
    // Handle both single job and array of jobs
    const jobs = Array.isArray(data) ? data : [data];
    
    CMSDatabase.saveJobs(jobs);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving jobs:', error);
    return NextResponse.json({ error: 'Failed to save jobs', details: String(error) }, { status: 500 });
  }
}
