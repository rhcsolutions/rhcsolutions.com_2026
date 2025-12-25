# 🎨 Full CMS Documentation

Your site now has a complete Content Management System! Here's everything you need to know.

## 📁 CMS Architecture

### Database Layer (`src/lib/cms/database.ts`)
- **File-based JSON storage** (replace with real DB for production)
- Located in `/cms-data/` directory:
  - `pages.json` - All page content
  - `media.json` - Media library
  - `settings.json` - Site-wide settings

### API Routes (`src/app/api/cms/`)
- **Pages API** (`/api/cms/pages`)
  - GET - Fetch all pages or by slug/id
  - POST - Create new page
  - PUT - Update existing page
  - DELETE - Remove page

- **Media API** (`/api/cms/media`)
  - GET - List all media
  - POST - Upload files
  - DELETE - Remove media

- **Settings API** (`/api/cms/settings`)
  - GET - Fetch site settings
  - PUT - Update settings

## 🎯 Admin Interfaces

### 1. Pages Editor (`/admin/pages`)
**Features:**
- ✨ Visual WYSIWYG editor
- 📝 Multiple block types:
  - **Hero** - Full-width hero sections
  - **Heading** - H1, H2, H3 headings
  - **Paragraph** - Text content
  - **Button** - Call-to-action buttons
  - **Image** - Media embeds
  - **List** - Bullet/numbered lists
  - **Testimonial** - Quote blocks with author
  - **Cards** - Grid layouts
  - **Columns** - Multi-column layouts
- 🎨 Text alignment (left, center, right)
- ⬆️⬇️ Drag to reorder blocks
- 👁️ Live preview
- 📱 Responsive design
- 🔍 Search pages
- 📊 Page status (draft/published/archived)
- 🏷️ Categories and SEO settings

### 2. Media Library (`/admin/media`)
**Features:**
- 📤 Drag-and-drop upload
- 🖼️ Grid view with thumbnails
- 🔍 Search media
- 📋 Copy URLs to clipboard
- 🗑️ Delete media
- 📥 Download files
- 🏷️ Alt text and captions
- 📊 File size and type info

### 3. Site Settings (`/admin/settings`)
**Features:**
- ⚙️ General settings (site name, tagline, logo)
- 🧭 Navigation menu management
- 👣 Footer configuration
- 📧 Contact information
- 📊 Google Analytics integration
- 🔗 Social media links

## 🚀 How to Use

### Creating a New Page

1. Go to `/admin/pages`
2. Click **"New Page"**
3. Enter page details:
   - Title: "About Us"
   - Slug: "/about-us"
   - Status: Draft/Published
   - Category: Main
4. Add content blocks:
   - Click **"Hero"** for header
   - Click **"Heading"** for sections
   - Click **"Text"** for paragraphs
5. Edit each block:
   - Click to select
   - Type in text fields
   - Adjust alignment
   - Reorder with arrows
6. Preview in real-time
7. Click **"Save"**

### Uploading Media

1. Go to `/admin/media`
2. Either:
   - Drag files to drop zone
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
