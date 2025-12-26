# RHC Solutions — Website

Modern, high-performance Next.js 16.1.1 website for RHC Solutions with an integrated CMS, admin dashboard, and production-proven load handling.

## Overview

- **Framework**: Next.js 16.1.1 with Turbopack (dev) & optimized production build
- **CMS**: File-based JSON system (`cms-data/`) with admin UI
- **Authentication**: NextAuth.js with Credentials provider
- **Styling**: Tailwind CSS with dark cyberpunk theme
- **SEO**: Metadata API, JSON-LD structured data, dynamic robots.txt & sitemap
- **Performance**: 100% success rate at 10 concurrent users (128ms avg latency), stable at 1000 concurrent

## Quick Start

### Development

`powershell
npm install
npm run dev
`

Server runs on `http://localhost:3003` with Turbopack hot reload.

### Production

`powershell
npm run build
npm start
`

Production server runs on `http://localhost:3000` (default port).

## Project Structure

`
src/
├── app/                    # Next.js app router
│   ├── admin/             # Protected admin UI (requires auth)
│   │   ├── pages/        # CMS page editor
│   │   ├── settings/     # Site settings, navigation, theme
│   │   ├── forms/        # Form submissions
│   │   ├── analytics/    # GA integration
│   │   └── ...
│   ├── api/              # API routes (CMS endpoints, auth)
│   └── [pages]/          # Public pages (home, services, contact, etc.)
├── components/           # Reusable React components
│   ├── cms/             # CMS rendering components
│   ├── layout/          # Header, Footer
│   └── admin/           # Admin UI components
├── lib/                 # Utilities (auth config, CMS database)
└── middleware.ts        # Protected routes
cms-data/
├── pages.json          # CMS page content
├── settings.json       # Site settings, navigation, contact info
├── theme.json          # Colors, fonts, styling
├── jobs.json           # Job listings
├── forms.json          # Form submissions
└── ...
`

## Features

### Admin Dashboard (`/admin`)

Protected by NextAuth. Features include:

- **Page Editor**: Edit page blocks (hero, cards, cta, markdown)
- **Navigation Manager**: Add/remove/reorder top menu items and service submenus
- **Settings**: Site name, tagline, contact info, social links
- **Theme Customization**: Colors, fonts, border radius, shadow intensity
- **Form Submissions**: View real user submissions from contact/forms
- **Analytics**: View GA4 tracking ID and link to GA dashboard
- **Media Manager**: Upload and manage media assets (Cloudflare R2)
- **User Management**: Admin user management with 2FA support

### Public Site

- Home with hero, services overview, clients, testimonials
- Service pages (IT Consulting, Cloud Infrastructure, Cyber Security, Business Continuity, Professional Services, Virtual Office, CIOaaS, CISOaaS)
- About Us, Careers, Contact pages
- Dynamic pages via CMS
- Cookie consent banner
- SEO optimized with canonical URLs, JSON-LD, and robots.txt

## Content Management

### CMS Structure

All content stored in `cms-data/` as JSON files:

`json
// cms-data/pages.json
{
  "homepage": {
    "blocks": [
      { "type": "hero", "title": "...", "subtitle": "..." },
      { "type": "cards", "title": "Services", "items": [...] },
      { "type": "cta", "title": "...", "button": {...} }
    ]
  }
}

// cms-data/settings.json
{
  "siteName": "RHC Solutions",
  "navigation": [
    { "id": "home", "label": "Home", "url": "/" },
    { "id": "services", "label": "Services", "url": "/services", "children": [...] }
  ],
  "contact": { "email": "...", "phone": "...", "telegram": "..." }
}
`

## Performance & Load Testing

### Load Test Results

**Simple Load Test** (10 concurrent, 10 requests each):

- Total Requests: 100
- Success Rate: 100%
- Avg Latency: 128ms
- Min/Max: 122ms / 138ms

**Heavy Load Test** (1000 concurrent, 30 seconds):

- Total Requests: 1,748
- Success Rate: 100% (zero errors/timeouts)
- Avg Latency: 18,949ms
- Throughput: 2.8+ MB/sec
- Status: ✅ Production-ready

See [LOAD_TEST_REPORT.md](./LOAD_TEST_REPORT.md) for detailed results and recommendations.

## Quick Start - Load Testing

Start production server and load test:

`powershell
npm run build
npm start


node load-test-simple.js      # 10 concurrent connections
node load-test.js             # 1000 concurrent connections (autocannon)
`

## SEO & AI Crawlers

- **Canonical URLs**: Prevents duplicate content issues
- **JSON-LD Schema**: Organization, WebSite, Service, and SearchAction structured data
- **Robots.txt**: Explicitly allows GPTBot, Googlebot, Bingbot for AI/search indexing
- **Dynamic Sitemap**: Auto-generated from routes
- **Metadata**: OpenGraph, Twitter, mobile-optimized

## Authentication

NextAuth.js credentials provider with filesystem-based user store:

`typescript
// Sign in at /admin/login
email: admin@rhcsolutions.com
password: (set in cms-data/users.json, bcrypt-hashed)
`

Features:

- JWT sessions
- Protected API routes
- Admin middleware enforcement
- 2FA support for user accounts

## Deployment

### Recommended Hosting

- **Vercel**: Direct Next.js support, edge functions
- **Railway**: Simple Node.js deployment
- **Coolify**: Self-hosted Docker/Kubernetes
- **Cloudflare Pages** + **Workers**: Requires serverless API adapter

### Environment Variables

`env
NEXTAUTH_URL=https://yourdomain.com
NEXTAUTH_SECRET=(openssl rand -base64 32)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX  # Optional: Google Analytics
`

For full deployment instructions see [DEPLOYMENT.md](./DEPLOYMENT.md).

## Development Commands

`powershell
npm run dev          # Start dev server on port 3003
npm run build        # Build production bundle
npm start            # Start production server
npm run lint         # Run ESLint


node scripts/hash-password.ts  # Hash a password for user management
`

## Technology Stack

- **Next.js 16.1.1**: React framework with app router & Turbopack
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling
- **NextAuth.js**: Authentication & session management
- **Framer Motion**: Smooth animations
- **React Icons**: Icon library (Font Awesome, Feather, etc.)
- **Tiptap**: Rich text editor (admin)

## Important Files

- `src/lib/auth/config.ts` - NextAuth configuration
- `src/lib/cms/database.ts` - CMS file operations
- `cms-data/*.json` - Content & configuration
- `LOAD_TEST_REPORT.md` - Load testing results
- `DEPLOYMENT.md` - Deployment guide
- `TELEGRAM_SETUP.md` - Telegram integration

## Security Notes

- Protect `/admin` routes: require authentication
- Keep `cms-data/` and `node_modules/` in `.gitignore`
- Use strong `NEXTAUTH_SECRET` in production
- Enable 2FA for sensitive admin accounts
- Validate all user input (forms use sanitization)

## Support & Issues

For questions or issues:

1. Check `DEPLOYMENT.md` for setup/deployment problems
2. Review `LOAD_TEST_REPORT.md` for performance insights
3. See `cms-data/*.json` for content structure examples
4. Check auth config in `src/lib/auth/config.ts`
