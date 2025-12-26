import NextAuth from 'next-auth';
import { authOptions } from '@/lib/auth/config';

const handler = NextAuth(authOptions);

// Force Node runtime (fs-based user store) and disable caching so session JSON is returned
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export { handler as GET, handler as POST };
