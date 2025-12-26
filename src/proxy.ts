import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Allow login page
  if (pathname.startsWith('/admin/login')) {
    return NextResponse.next();
  }

  // Check for session token
  const token = await getToken({ 
    req, 
    secret: process.env.NEXTAUTH_SECRET || 'your-secret-key-change-in-production' 
  });

  // If no token, redirect to login
  if (!token && (pathname.startsWith('/admin') || pathname.startsWith('/api/cms'))) {
    const loginUrl = new URL('/admin/login', req.url);
    loginUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Role-based access control
  const userRole = token && (token as any).role ? (token as any).role : null;

  // jobs_manager: allow Jobs and Theme
  if (userRole === 'jobs_manager') {
    const adminAllowed = [
      '/admin',
      '/admin/jobs',
      '/admin/theme',
      '/admin/theme-settings',
    ];
    const apiAllowed = [
      '/api/cms/jobs',
      '/api/cms/theme',
    ];

    const isAdminPath = pathname.startsWith('/admin');
    const isApiCmsPath = pathname.startsWith('/api/cms');

    const adminOk = adminAllowed.some((p) => pathname === p || pathname.startsWith(p + '/'));
    const apiOk = apiAllowed.some((p) => pathname === p || pathname.startsWith(p + '/'));

    if ((isAdminPath && !adminOk) || (isApiCmsPath && !apiOk)) {
      return NextResponse.json({ error: 'Forbidden: access restricted to jobs and theme management' }, { status: 403 });
    }
  }

  return NextResponse.next();
}

// Protect all /admin routes and /api/cms routes
export const config = {
  matcher: ['/admin/:path*', '/api/cms/:path*'],
};
