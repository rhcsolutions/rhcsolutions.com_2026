// Simple JSON-based CMS database
// For production, replace with a real database (PostgreSQL, MongoDB, etc.)

import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const DB_DIR = path.join(process.cwd(), 'cms-data');
const PAGES_FILE = path.join(DB_DIR, 'pages.json');
const MEDIA_FILE = path.join(DB_DIR, 'media.json');
const SETTINGS_FILE = path.join(DB_DIR, 'settings.json');
const USERS_FILE = path.join(DB_DIR, 'users.json');
const FORMS_FILE = path.join(DB_DIR, 'forms.json');

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

export interface FormConfig {
  id: string;
  name: string;
  placement?: {
    pageSlug: string;
    position: 'top' | 'bottom';
  };
  settings: {
    notificationEmail?: string;
    autoResponse?: string;
    enableWhatsApp?: boolean;
    enableTelegram?: boolean;
  };
  fields: Array<{
    id: string;
    label: string;
    type: 'text' | 'email' | 'textarea' | 'select' | 'checkbox' | 'tel';
    required: boolean;
    placeholder?: string;
    options?: string[];
  }>;
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
  cloudflare?: {
    apiToken?: string;
    zoneId?: string;
  };
  forms: FormConfig[]; // New multi-form support
  // Deprecated: formBuilder is replaced by forms array
  formBuilder?: {
    settings?: {
      notificationEmail?: string;
      autoResponse?: string;
      enableWhatsApp?: boolean;
      enableTelegram?: boolean;
    };
    contactForm: Array<{
      id: string;
      label: string;
      type: 'text' | 'email' | 'textarea' | 'select' | 'checkbox';
      required: boolean;
      placeholder?: string;
      options?: string[];
    }>;
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
    },
    forms: [
      {
        id: 'contact_form_default',
        name: 'Contact Form',
        placement: { pageSlug: '/contact', position: 'bottom' },
        settings: {
          notificationEmail: 'info@rhcsolutions.com',
          autoResponse: 'Thank you for your message. We will get back to you shortly.',
          enableWhatsApp: false,
          enableTelegram: false
        },
        fields: [
          { id: 'name', label: 'Name', type: 'text', required: true, placeholder: 'John Doe' },
          { id: 'email', label: 'Email', type: 'email', required: true, placeholder: 'john@company.com' },
          { id: 'company', label: 'Company', type: 'text', required: false, placeholder: 'Your Company Inc. (optional)' },
          { id: 'message', label: 'Message', type: 'textarea', required: true, placeholder: 'Tell us about your project or inquiry...' }
        ]
      }
    ]
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
      // simple in-memory cache to reduce fs reads
      if ((this as any)._pagesCache && Date.now() - ((this as any)._pagesCacheAt || 0) < 2000) {
        return (this as any)._pagesCache;
      }
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

      // Auto-detect actual page routes under src/app and add any missing pages
      try {
        const APP_DIR = path.join(process.cwd(), 'src', 'app');
        const ignore = new Set(['api', 'admin', 'components', 'layout', 'middleware.ts', 'globals.css']);

        const walk = (dir: string, rel = ''): string[] => {
          const results: string[] = [];
          if (!fs.existsSync(dir)) return results;
          const entries = fs.readdirSync(dir, { withFileTypes: true });
          for (const ent of entries) {
            if (ignore.has(ent.name)) continue;
            const full = path.join(dir, ent.name);
            const newRel = rel ? `${rel}/${ent.name}` : ent.name;
            if (ent.isDirectory()) {
              // If directory contains a page.tsx or page.ts file, consider it a route
              const pageTsx = path.join(full, 'page.tsx');
              const pageTs = path.join(full, 'page.ts');
              if (fs.existsSync(pageTsx) || fs.existsSync(pageTs)) {
                results.push(newRel);
              }
              // Recurse to find nested routes
              results.push(...walk(full, newRel));
            }
          }
          return results;
        };

        const detected = walk(APP_DIR).map(p => `/${p}`);
        for (const slug of detected) {
          // normalize root
          if (slug === '/page' || slug === '/index') continue;
          // convert '/page' like cases
          if (slug === '/page') continue;
          if (!pages.find(p => p.slug === slug) && slug !== '/') {
            const now = new Date().toISOString();
            const id = slug.replace(/\//g, '-').replace(/^-/, '') || Date.now().toString();
            const title = slug.split('/').filter(Boolean).map(s => s.replace(/-/g, ' ')).map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' - ');
            pages.push({
              id,
              title: title || slug,
              slug,
              description: `${title || slug} page`,
              category: 'Auto-detected',
              status: 'published',
              blocks: [],
              seo: { metaTitle: title || slug, metaDescription: `${title || slug} - RHC Solutions` },
              createdBy: 'system',
              updatedBy: 'system',
              createdAt: now,
              updatedAt: now,
            });
            mutated = true;
          }
        }
      } catch (err) {
        console.error('Error detecting app routes for pages sync:', err);
      }

      if (mutated) {
        fs.writeFileSync(PAGES_FILE, JSON.stringify(pages, null, 2));
        (this as any)._pagesCache = pages;
        (this as any)._pagesCacheAt = Date.now();
      }

      (this as any)._pagesCache = pages;
      (this as any)._pagesCacheAt = Date.now();
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

  // Users
  static getUsers(): any[] {
    try {
      if (!fs.existsSync(USERS_FILE)) {
        fs.writeFileSync(USERS_FILE, JSON.stringify([{ id: '1', name: 'Admin User', email: 'admin@rhcsolutions.com', role: 'Administrator', status: 'Active', lastLogin: new Date().toISOString(), passwordHash: '', twoFAEnabled: false }], null, 2));
      }
      const data = fs.readFileSync(USERS_FILE, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error reading users:', error);
      return [];
    }
  }

  static createUser(user: any): any {
    const users = this.getUsers();
    // if password present, hash it
    let passwordHash = '';
    if (user.password) {
      const salt = crypto.randomBytes(16).toString('hex');
      const derived = crypto.scryptSync(user.password, salt, 64).toString('hex');
      passwordHash = `${salt}$${derived}`;
    }
    const newUser = { ...user, id: Date.now().toString(), createdAt: new Date().toISOString(), passwordHash, twoFAEnabled: false };
    users.push(newUser);
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
    return newUser;
  }

  static updateUser(id: string, updates: any): any | null {
    const users = this.getUsers();
    const idx = users.findIndex(u => u.id === id);
    if (idx === -1) return null;
    // handle password change
    if (updates.password) {
      const salt = crypto.randomBytes(16).toString('hex');
      const derived = crypto.scryptSync(updates.password, salt, 64).toString('hex');
      updates.passwordHash = `${salt}$${derived}`;
      delete updates.password;
    }
    users[idx] = { ...users[idx], ...updates, updatedAt: new Date().toISOString() };
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
    return users[idx];
  }

  static deleteUser(id: string): boolean {
    const users = this.getUsers();
    const filtered = users.filter(u => u.id !== id);
    if (filtered.length === users.length) return false;
    fs.writeFileSync(USERS_FILE, JSON.stringify(filtered, null, 2));
    return true;
  }

  // Forms
  static getForms(): any[] {
    try {
      if (!fs.existsSync(FORMS_FILE)) {
        fs.writeFileSync(FORMS_FILE, JSON.stringify([], null, 2));
      }
      const data = fs.readFileSync(FORMS_FILE, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error reading forms:', error);
      return [];
    }
  }

  static addForm(entry: any): any {
    const forms = this.getForms();
    const newEntry = { ...entry, id: Date.now().toString(), receivedAt: new Date().toISOString() };
    forms.push(newEntry);
    fs.writeFileSync(FORMS_FILE, JSON.stringify(forms, null, 2));
    return newEntry;
  }

  // Password reset and 2FA helpers
  static generateResetToken(email: string): string | null {
    const users = this.getUsers();
    const idx = users.findIndex(u => u.email === email);
    if (idx === -1) return null;
    const token = crypto.randomBytes(20).toString('hex');
    users[idx].resetToken = token;
    users[idx].resetExpires = Date.now() + 1000 * 60 * 60; // 1 hour
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
    return token;
  }

  static verifyResetToken(token: string): any | null {
    const users = this.getUsers();
    const u = users.find(u => u.resetToken === token && u.resetExpires && u.resetExpires > Date.now());
    return u || null;
  }

  static completeReset(token: string, newPassword: string): boolean {
    const users = this.getUsers();
    const idx = users.findIndex(u => u.resetToken === token && u.resetExpires && u.resetExpires > Date.now());
    if (idx === -1) return false;
    const salt = crypto.randomBytes(16).toString('hex');
    const derived = crypto.scryptSync(newPassword, salt, 64).toString('hex');
    users[idx].passwordHash = `${salt}$${derived}`;
    delete users[idx].resetToken;
    delete users[idx].resetExpires;
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
    return true;
  }

  static setTwoFASecret(userId: string, secret: string) {
    const users = this.getUsers();
    const idx = users.findIndex(u => u.id === userId);
    if (idx === -1) return false;
    users[idx].twoFASecret = secret;
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
    return true;
  }

  static toggleTwoFA(userId: string, enabled: boolean) {
    const users = this.getUsers();
    const idx = users.findIndex(u => u.id === userId);
    if (idx === -1) return false;
    users[idx].twoFAEnabled = enabled;
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
    return true;
  }

  static deleteForm(id: string): boolean {
    const forms = this.getForms();
    const filtered = forms.filter(f => f.id !== id);
    if (filtered.length === forms.length) return false;
    fs.writeFileSync(FORMS_FILE, JSON.stringify(filtered, null, 2));
    return true;
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

  static saveJobs(jobs: any[]): void {
    try {
      const jobsFile = path.join(DB_DIR, 'jobs.json');
      fs.writeFileSync(jobsFile, JSON.stringify(jobs, null, 2));
    } catch (error) {
      console.error('Error saving jobs:', error);
      throw error;
    }
  }
}
