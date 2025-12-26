import { useEffect, useState } from 'react';

export interface ContentBlock {
  id: string;
  type: 'heading' | 'paragraph' | 'image' | 'button' | 'list' | 'cards' | 'hero' | 'cta' | 'columns' | 'testimonial' | 'richtext';
  content: any;
  styles?: any;
}

export interface CMSPage {
  id: string;
  title: string;
  slug: string;
  blocks: ContentBlock[];
}

export function usePageContent(slug: string) {
  const [page, setPage] = useState<CMSPage | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPage = async () => {
      try {
        const res = await fetch('/api/cms/pages', {
          cache: 'no-store',
          credentials: 'include',
        });
        if (res.ok) {
          const pages = await res.json();
          const foundPage = pages.find((p: any) => p.slug === slug);
          if (foundPage && foundPage.blocks && foundPage.blocks.length > 0) {
            setPage(foundPage);
          }
        }
      } catch (error) {
        console.error('Failed to fetch page:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPage();
  }, [slug]);

  return { page, loading };
}
