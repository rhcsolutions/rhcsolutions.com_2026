
import { NextResponse } from 'next/server';
import { CMSDatabase } from '@/lib/cms/database';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const pages = CMSDatabase.getPages();
        const media = CMSDatabase.getMedia();
        const forms = CMSDatabase.getForms();
        // Assuming users logic exists or simply mocking it based on the file content seen earlier
        // which showed basic user management.
        const users = CMSDatabase.getUsers();

        const stats = {
            pagesCount: pages.length,
            mediaCount: media.length,
            submissionsCount: forms.length,
            usersCount: users.length,
            recentSubmissions: forms.slice(-5).reverse(), // Get last 5 submissions
        };

        return NextResponse.json(stats);
    } catch (error) {
        console.error('Error fetching analytics stats:', error);
        return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
    }
}
