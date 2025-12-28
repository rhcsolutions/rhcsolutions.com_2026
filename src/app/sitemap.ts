import { MetadataRoute } from 'next';
import { CMSDatabase } from '@/lib/cms/database';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://rhcsolutions.com';

  // Get all published pages from CMS
  const pages = CMSDatabase.getPages().filter(page => page.status === 'published');

  const sitemapEntries: MetadataRoute.Sitemap = pages.map(page => ({
    url: `${baseUrl}${page.slug === '/' ? '' : page.slug}`,
    lastModified: new Date(page.updatedAt),
    changeFrequency: page.slug === '/' ? 'weekly' : 'monthly',
    priority: page.slug === '/' ? 1 : 0.8,
  }));

  // Ensure contact page is present and prioritized (if not already in CMS correctly)
  // But CMS auto-detects routes, so it should be there. 
  // We can just rely on CMS data.

  return sitemapEntries;
}
