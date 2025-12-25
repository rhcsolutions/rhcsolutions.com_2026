// Simple JSON-based CMS database
// For production, replace with a real database (PostgreSQL, MongoDB, etc.)

import fs from 'fs';
import path from 'path';

const DB_DIR = path.join(process.cwd(), 'cms-data');
const PAGES_FILE = path.join(DB_DIR, 'pages.json');
const MEDIA_FILE = path.join(DB_DIR, 'media.json');
const SETTINGS_FILE = path.join(DB_DIR, 'settings.json');

// Ensure database directory exists
if (!fs.existsSync(DB_DIR)) {
  fs.mkdirSync(DB_DIR, { recursive: true });
}

export interface ContentBlock {
  id: string;
  type: 'heading' | 'paragraph' | 'image' | 'button' | 'list' | 'cards' | 'hero' | 'cta' | 'columns' | 'testimonial';
  content: any;
  styles?: {
    align?: 'left' | 'center' | 'right';
    level?: number;
    columns?: number;
    background?: string;
    padding?: string;
  };
}

export interface CMSPage {
  id: string;
  title: string;
  slug: string;
  description?: string;
  category: string;
  status: 'draft' | 'published' | 'archived';
  blocks: ContentBlock[];
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
    ogImage?: string;
  };
  createdBy?: string;
  updatedBy?: string;
  createdAt: string;
  updatedAt: string;
}

export interface MediaItem {
  id: string;
  filename: string;
  url: string;
  type: 'image' | 'video' | 'document';
  size: number;
  uploadedAt: string;
  alt?: string;
  caption?: string;
}

export interface SiteSettings {
  siteName: string;
  tagline: string;
  siteUrl?: string;
  logo?: string;
  favicon?: string;
  navigation: {
    id: string;
    label: string;
    url: string;
    children?: Array<{ label: string; url: string }>;
  }[];
  footer: {
    columns: Array<{
      title: string;
      links: Array<{ label: string; url: string }>;
    }>;
    copyright: string;
    socialLinks?: Array<{ platform: string; url: string }>;
  };
  contact: {
    email?: string;
    phone?: string;
    address?: string;
    telegram?: string;
  };
  analytics?: {
    googleAnalyticsId?: string;
  };
}

// Initialize default data
const initPages = (): CMSPage[] => {
  const defaultPages: CMSPage[] = [
    {
      id: 'home',
      title: 'Home',
      slug: '/',
      description: 'Homepage',
      category: 'Main',
      status: 'published',
      blocks: [
        {
          id: '1',
          type: 'hero',
          content: {
            title: 'We Just Do IT',
            subtitle: 'Professional IT Consulting & Business Solutions Since 1994',
            description: 'Transform your business with expert IT consulting, cloud infrastructure, cyber security, and business continuity services.',
            cta: { text: 'Get Started', url: '/contact' }
          },
          styles: { align: 'center' }
        }
      ],
      seo: {
        metaTitle: 'RHC Solutions - IT Consulting & Business Solutions',
        metaDescription: 'Professional IT consulting services since 1994'
      },
      createdBy: 'system',
      updatedBy: 'system',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ];

  if (!fs.existsSync(PAGES_FILE)) {
    fs.writeFileSync(PAGES_FILE, JSON.stringify(defaultPages, null, 2));
  }

  return defaultPages;
};

const initMedia = (): MediaItem[] => {
  const defaultMedia: MediaItem[] = [];

  if (!fs.existsSync(MEDIA_FILE)) {
    fs.writeFileSync(MEDIA_FILE, JSON.stringify(defaultMedia, null, 2));
  }

  return defaultMedia;
};

const initSettings = (): SiteSettings => {
  const defaultSettings: SiteSettings = {
    siteName: 'RHC Solutions',
    tagline: 'We Just Do IT',
    navigation: [
      { id: '1', label: 'Home', url: '/' },
      { id: '2', label: 'About', url: '/about-us' },
      {
        id: '3', label: 'Services', url: '/services', children: [
          { label: 'IT Consulting', url: '/services/it-consulting' },
          { label: 'Cloud Infrastructure', url: '/services/cloud-infrastructure' },
          { label: 'Cyber Security', url: '/services/cyber-security' },
          { label: 'Business Continuity', url: '/services/business-continuity' }
        ]
      },
      { id: '4', label: 'Careers', url: '/careers' },
      { id: '5', label: 'Contact', url: '/contact' }
    ],
    footer: {
      columns: [
        {
          title: 'Services',
          links: [
            { label: 'IT Consulting', url: '/services/it-consulting' },
            { label: 'Cloud Infrastructure', url: '/services/cloud-infrastructure' },
            { label: 'Cyber Security', url: '/services/cyber-security' }
          ]
        },
        {
          title: 'Company',
          links: [
            { label: 'About Us', url: '/about-us' },
            { label: 'Careers', url: '/careers' },
            { label: 'Contact', url: '/contact' }
          ]
        }
      ],
      copyright: '© 2025 RHC Solutions. All rights reserved.',
      socialLinks: [
        { platform: 'linkedin', url: 'https://linkedin.com/company/rhcsolutions' },
        { platform: 'twitter', url: 'https://twitter.com/rhcsolutions' }
      ]
    },
    contact: {
      email: 'info@rhcsolutions.com',
      phone: '+1-234-567-8900',
      telegram: '@rhcsolutions'
    }
  };

  if (!fs.existsSync(SETTINGS_FILE)) {
    fs.writeFileSync(SETTINGS_FILE, JSON.stringify(defaultSettings, null, 2));
  }

  return defaultSettings;
};

// Database operations
export class CMSDatabase {
  static getPages(): CMSPage[] {
    try {
      if (!fs.existsSync(PAGES_FILE)) {
        return initPages();
      }
      const data = fs.readFileSync(PAGES_FILE, 'utf-8');
      const pages: CMSPage[] = JSON.parse(data);

      // Ensure required pages exist (auto-seed if missing)
      const required: Array<{ id: string; title: string; slug: string; category: string }> = [
        { id: 'home', title: 'Home', slug: '/', category: 'Main' },
        { id: 'about-us', title: 'About Us', slug: '/about', category: 'Main' },
        { id: 'services', title: 'Services', slug: '/services', category: 'Main' },
        { id: 'services-professional', title: 'Professional Services', slug: '/services/professional-services', category: 'Services' },
        { id: 'services-cloud', title: 'Cloud & Infrastructure', slug: '/services/cloud-infrastructure', category: 'Services' },
        { id: 'services-cyber', title: 'Cyber Security', slug: '/services/cyber-security', category: 'Services' },
        { id: 'services-bc', title: 'Business Continuity', slug: '/services/business-continuity', category: 'Services' },
        { id: 'services-virtual-office', title: 'Virtual Office Support', slug: '/services/virtual-office-support', category: 'Services' },
        { id: 'clients', title: 'Clients', slug: '/clients', category: 'Main' },
        { id: 'partners', title: 'Partners', slug: '/partners', category: 'Main' },
        { id: 'careers', title: 'Careers', slug: '/careers', category: 'Main' },
        { id: 'contact', title: 'Contact', slug: '/contact', category: 'Main' },
      ];

      let mutated = false;
      for (const req of required) {
        if (!pages.find((p) => p.slug === req.slug)) {
          const now = new Date().toISOString();
          pages.push({
            id: req.id,
            title: req.title,
            slug: req.slug,
            description: `${req.title} page`,
            category: req.category,
            status: 'published',
            blocks: [],
            seo: { metaTitle: req.title, metaDescription: `${req.title} - RHC Solutions` },
            createdBy: 'system',
            updatedBy: 'system',
            createdAt: now,
            updatedAt: now,
          });
          mutated = true;
        }
      }

      if (mutated) {
        fs.writeFileSync(PAGES_FILE, JSON.stringify(pages, null, 2));
      }

      return pages;
    } catch (error) {
      console.error('Error reading pages:', error);
      return initPages();
    }
  }

  static getPage(id: string): CMSPage | null {
    const pages = this.getPages();
    return pages.find(p => p.id === id) || null;
  }

  static getPageBySlug(slug: string): CMSPage | null {
    const pages = this.getPages();
    return pages.find(p => p.slug === slug) || null;
  }

  static createPage(page: Omit<CMSPage, 'id' | 'createdAt' | 'updatedAt'>): CMSPage {
    const pages = this.getPages();
    const newPage: CMSPage = {
      ...page,
      id: Date.now().toString(),
      createdBy: page.createdBy || 'admin',
      updatedBy: page.updatedBy || page.createdBy || 'admin',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    pages.push(newPage);
    fs.writeFileSync(PAGES_FILE, JSON.stringify(pages, null, 2));
    return newPage;
  }

  static updatePage(id: string, updates: Partial<CMSPage>): CMSPage | null {
    const pages = this.getPages();
    const index = pages.findIndex(p => p.id === id);

    if (index === -1) return null;

    pages[index] = {
      ...pages[index],
      ...updates,
      updatedBy: updates.updatedBy || pages[index].updatedBy,
      updatedAt: new Date().toISOString()
    };

    fs.writeFileSync(PAGES_FILE, JSON.stringify(pages, null, 2));
    return pages[index];
  }

  static deletePage(id: string): boolean {
    const pages = this.getPages();
    const filtered = pages.filter(p => p.id !== id);

    if (filtered.length === pages.length) return false;

    fs.writeFileSync(PAGES_FILE, JSON.stringify(filtered, null, 2));
    return true;
  }

  static getMedia(): MediaItem[] {
    try {
      if (!fs.existsSync(MEDIA_FILE)) {
        return initMedia();
      }
      const data = fs.readFileSync(MEDIA_FILE, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error reading media:', error);
      return initMedia();
    }
  }

  static addMedia(media: Omit<MediaItem, 'id' | 'uploadedAt'>): MediaItem {
    const items = this.getMedia();
    const newItem: MediaItem = {
      ...media,
      id: Date.now().toString(),
      uploadedAt: new Date().toISOString()
    };
    items.push(newItem);
    fs.writeFileSync(MEDIA_FILE, JSON.stringify(items, null, 2));
    return newItem;
  }

  static deleteMedia(id: string): boolean {
    const items = this.getMedia();
    const filtered = items.filter(m => m.id !== id);

    if (filtered.length === items.length) return false;

    fs.writeFileSync(MEDIA_FILE, JSON.stringify(filtered, null, 2));
    return true;
  }

  static getSettings(): SiteSettings {
    try {
      if (!fs.existsSync(SETTINGS_FILE)) {
        return initSettings();
      }
      const data = fs.readFileSync(SETTINGS_FILE, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error reading settings:', error);
      return initSettings();
    }
  }

  static updateSettings(settings: Partial<SiteSettings>): SiteSettings {
    const current = this.getSettings();
    const updated = { ...current, ...settings };
    fs.writeFileSync(SETTINGS_FILE, JSON.stringify(updated, null, 2));
    return updated;
  }

  // Jobs
  static getJobs(): any[] {
    try {
      const jobsFile = path.join(DB_DIR, 'jobs.json');
      if (!fs.existsSync(jobsFile)) {
        return [];
      }
      const data = fs.readFileSync(jobsFile, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error reading jobs:', error);
      return [];
    }
  }
}
