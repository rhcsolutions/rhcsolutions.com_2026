# CMS — Content Management Guide

Manage your site content, users, and settings via the admin dashboard.

## Admin Dashboard Access

**URL**: `/admin/` (requires login via `/admin/login`)

### Default Login

Create your first admin user via the `/api/cms/users` endpoint or by directly editing `cms-data/users.json`.

## Pages

**URL**: `/admin/pages`

- **Create**: Click "New Page", add title, slug, and blocks
- **Edit**: Click a page to open the editor
- **Blocks**: Hero, Heading, Paragraph, Button, Image, List, Cards, Columns, Testimonial
- **Publish**: Set status to "published" to make live
- **SEO**: Each page has fields for meta title, description, and open graph image

**Data**: Stored in `cms-data/pages.json`

## Media

**URL**: `/admin/media`

- **Upload**: Drag-drop images or click to browse (JPG, PNG, GIF, WebP)
- **Files**: Stored in `public/images/`
- **Metadata**: Stored in `cms-data/media.json`
- **Delete**: Click trash icon to remove

## Users

**URL**: `/admin/users`

- **Add User**: Enter name and email, system generates temp password
- **2FA (TOTP)**: Click "Manage 2FA", scan QR with Google Authenticator or Authy
- **Password Reset**: Use `/api/cms/users/reset/request` to email reset link
- **Delete**: Confirm deletion (removes user immediately)

**Data**: Stored in `cms-data/users.json` (passwords are hashed with scrypt)

## Forms & Contact Submissions

**URL**: `/admin/forms`

- View all contact form submissions
- Each entry shows name, email, message, timestamp
- Delete individual submissions

**Data**: Stored in `cms-data/forms.json`

## Robots & Sitemap

**URLs**: `/admin/robots`, `/admin/sitemap`

### Robots Editor

- Edit `public/robots.txt` directly
- Add Ahrefs verification HTML file for SEO auditing
- Changes deploy immediately

### Sitemap Generator

- Auto-discovers all pages in your site
- Generates `public/sitemap.xml`
- Click "Regenerate" to update after adding pages

## Settings

**URL**: `/admin/settings`

- Site name, tagline, logo
- Navigation menu configuration
- Footer links and copyright
- Contact email/phone
- Google Analytics ID

**Data**: Stored in `cms-data/settings.json`

## Analytics

**URL**: `/admin/analytics`

- View page views, bounce rate, user sessions (if Google Analytics connected)
- Requires `NEXT_PUBLIC_GA_ID` environment variable

## Dashboard

**URL**: `/admin/dashboard`

- Quick stats overview
- Recent activity
- Cloudflare cache purge button (if configured)

## Data Storage

All content is stored as JSON in `cms-data/`:

```
cms-data/
├── pages.json         # All pages + blocks
├── media.json         # Image metadata
├── users.json         # User accounts (passwords hashed)
├── forms.json         # Contact submissions
├── jobs.json          # Job postings
├── settings.json      # Site-wide config
└── theme.json         # Theme/styling prefs
```

For production, migrate to a real database (PostgreSQL, MongoDB, etc.) by modifying `src/lib/cms/database.ts`.
   - Click **"Upload Files"**
3. Files are saved to `/public/uploads/`
4. Click any media to:
   - View details
   - Copy URL
   - Download
   - Delete

### Managing Settings

1. Go to `/admin/settings`
2. Use tabs:
   - **General** - Site name, logo, analytics
   - **Navigation** - Main menu links
   - **Footer** - Footer links and copyright
   - **Contact** - Email, phone, address
3. Click **"Save Changes"**

## 💻 Integration with Pages

### Option 1: CMS-Only Page

```tsx
// src/app/[slug]/page.tsx
import { CMSDatabase } from '@/lib/cms/database';

export default async function CMSPage({ params }) {
  const page = CMSDatabase.getPageBySlug(`/${params.slug}`);
  
  return (
    <div>
      {page.blocks.map((block) => (
        // Render blocks
      ))}
    </div>
  );
}
```

### Option 2: Hybrid (Existing + CMS)

```tsx
// src/app/about-us/page.tsx
import { CMSDatabase } from '@/lib/cms/database';
import ExistingComponent from '@/components/ExistingComponent';

export default async function AboutPage() {
  const cmsContent = CMSDatabase.getPageBySlug('/about-us');
  
  return (
    <>
      <ExistingComponent />
      {cmsContent?.blocks.map(block => renderBlock(block))}
    </>
  );
}
```

### Option 3: Client-Side Fetch

```tsx
'use client';
import { useEffect, useState } from 'react';

export default function DynamicPage() {
  const [content, setContent] = useState(null);
  
  useEffect(() => {
    fetch('/api/cms/pages?slug=/my-page')
      .then(res => res.json())
      .then(setContent);
  }, []);
  
  return <div>{/* Render content */}</div>;
}
```

## 🎨 Block Types Reference

### Hero Block
```typescript
{
  type: 'hero',
  content: {
    title: string,
    subtitle: string,
    cta: { text: string, url: string }
  }
}
```

### Heading Block
```typescript
{
  type: 'heading',
  content: string,
  styles: { level: 1 | 2 | 3, align: 'left' | 'center' | 'right' }
}
```

### Paragraph Block
```typescript
{
  type: 'paragraph',
  content: string,
  styles: { align: 'left' | 'center' | 'right' }
}
```

### Button Block
```typescript
{
  type: 'button',
  content: { text: string, url: string },
  styles: { align: 'left' | 'center' | 'right' }
}
```

### Testimonial Block
```typescript
{
  type: 'testimonial',
  content: { quote: string, author: string, role: string }
}
```

### Cards Block
```typescript
{
  type: 'cards',
  content: {
    cards: Array<{ title: string, description: string, icon: string }>
  },
  styles: { columns: number }
}
```

## 🔒 Security (TODO)

**Current Status:** No authentication
**For Production:**

1. Add authentication library:
```bash
npm install next-auth
```

2. Protect admin routes:
```tsx
// middleware.ts
export function middleware(req) {
  if (req.nextUrl.pathname.startsWith('/admin')) {
    // Check authentication
  }
}
```

3. Secure API routes:
```tsx
// Check auth before CMS operations
if (!isAuthenticated(req)) {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}
```

## 🚀 Production Setup

### 1. Replace File Storage with Real Database

```bash
# Install database client
npm install @prisma/client
# or
npm install mongodb
```

Update `src/lib/cms/database.ts` to use your database.

### 2. Environment Variables

```env
# .env.local
DATABASE_URL=postgresql://...
NEXTAUTH_SECRET=your-secret
NEXTAUTH_URL=https://yourdomain.com
```

### 3. Build & Deploy

```bash
npm run cf:build
npm run cf:deploy
```

## 📊 Database Schema

### Page
```typescript
{
  id: string
  title: string
  slug: string (unique)
  description?: string
  category: string
  status: 'draft' | 'published' | 'archived'
  blocks: ContentBlock[]
  seo?: {
    metaTitle?: string
    metaDescription?: string
    keywords?: string[]
    ogImage?: string
  }
  createdAt: timestamp
  updatedAt: timestamp
}
```

### Media
```typescript
{
  id: string
  filename: string
  url: string
  type: 'image' | 'video' | 'document'
  size: number
  uploadedAt: timestamp
  alt?: string
  caption?: string
}
```

### Settings
```typescript
{
  siteName: string
  tagline: string
  logo?: string
  favicon?: string
  navigation: NavItem[]
  footer: FooterConfig
  contact: ContactInfo
  analytics?: AnalyticsConfig
}
```

## 🎓 Best Practices

1. **Content Strategy**
   - Use draft status while editing
   - Publish when ready
   - Archive old pages

2. **Media Management**
   - Optimize images before upload
   - Use descriptive filenames
   - Add alt text for SEO

3. **Page Structure**
   - Start with Hero
   - Use headings for sections
   - Break content into blocks

4. **SEO**
   - Fill meta titles/descriptions
   - Use heading hierarchy (H1 → H2 → H3)
   - Add keywords

## 🔧 Troubleshooting

### Pages not saving
- Check `/cms-data/` directory exists
- Verify file permissions
- Check browser console for errors

### Media upload fails
- Check `/public/uploads/` exists
- Verify file size limits
- Check file type restrictions

### Preview not updating
- Click on block to select
- Check for JavaScript errors
- Refresh preview panel

## 📚 Next Steps

1. ✅ Test CMS functionality
2. ⚙️ Configure site settings
3. 📝 Create your pages
4. 📸 Upload media
5. 🔒 Add authentication
6. 🗄️ Migrate to real database
7. 🚀 Deploy to production

## 🆘 Support

For issues or questions:
1. Check browser console
2. Review API responses
3. Verify file structure
4. Check permissions

---

**🎉 Congratulations!** Your site now has a full-featured Content Management System!
