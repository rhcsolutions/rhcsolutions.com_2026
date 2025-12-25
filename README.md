# RHC Solutions Website

Modern, professional website for RHC Solutions built with Next.js 14, featuring a dark cyber-themed design, comprehensive admin CMS, and full careers pipeline.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Configure environment**:
   ```bash
   cp .env.local.example .env.local
   ```
   
   Edit `.env.local` and add your configuration:
   ```env
   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
   NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
   ```

3. **Run development server**:
   ```bash
   npm run dev
   ```
   
   Visit [http://localhost:3003](http://localhost:3003)

4. **Build for production**:
   ```bash
   npm run build
   npm start
   ```

## 🎯 Features

### Public Website
- **Home** - Hero section with company overview and key statistics
- **About** - Company history, mission, and values
- **Services** - Comprehensive service offerings with detailed pages
- **Clients** - Client portfolio and testimonials
- **Partners** - Technology partnerships (AWS, Microsoft, Google Cloud)
- **Careers** - Job listings with application form
- **Contact** - Contact information and meeting booking

### Admin CMS
- **Dashboard** - Overview and analytics
- **Content Management** - Pages, media, and forms
- **User Management** - Roles and permissions
- **Job Management** - Create, edit, and manage job postings
- **Application Review** - Review and manage job applications
- **SEO Tools** - Meta tags and optimization
- **Settings** - Site configuration

### Careers Pipeline
- Public job board with live listings
- Application form with validation (name, email, phone, LinkedIn, cover letter)
- HR admin panel for job CRUD operations
- Application review system with status workflow
- Filtering and search capabilities

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: React Icons
- **Animations**: Framer Motion
- **Authentication**: NextAuth.js
- **Analytics**: Google Analytics 4 & Google Tag Manager

## 📁 Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── (public)/          # Public pages
│   ├── admin/             # Admin CMS routes
│   ├── api/               # API routes
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── layout/           # Header, Footer, Navigation
│   ├── admin/            # Admin UI components
│   └── ui/               # Reusable UI components
└── lib/                   # Utilities and helpers

public/                    # Static assets
├── logo.png              # Company logo
└── images/               # Image assets
```

## ⚙️ Configuration

### Contact Information
Update contact details in:
- `src/components/layout/Footer.tsx`
- `src/app/contact/page.tsx`

### Booking Links
Search for `outlook.office.com/bookwithme/user/` to update meeting booking URLs

### Theme & Colors
Modify `tailwind.config.ts` for color scheme customization

### Analytics
Set up Google Analytics and Tag Manager IDs in `.env.local`:
```env
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
```

## 🚀 Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for comprehensive deployment instructions including:
- Vercel (recommended)
- Railway
- Docker
- Traditional hosting

For Cloudflare Pages deployment, see [CLOUDFLARE.md](./CLOUDFLARE.md)

## 📚 Additional Documentation

- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Complete deployment guide
- **[CMS_README.md](./CMS_README.md)** - Admin CMS user guide
- **[CLOUDFLARE.md](./CLOUDFLARE.md)** - Cloudflare Pages deployment
- **[TELEGRAM_SETUP.md](./TELEGRAM_SETUP.md)** - Telegram integration setup

## 🔐 Admin Access

Default admin credentials (change immediately in production):
- Email: `admin@rhcsolutions.com`
- Password: Set during first deployment

Access the admin panel at `/admin`

## 🧪 Development

### Available Scripts

```bash
npm run dev          # Start development server (port 3003)
npm run build        # Build for production
npm start            # Start production server
npm run lint         # Run ESLint
```

### Environment Variables

Required:
- `NEXT_PUBLIC_GA_ID` - Google Analytics measurement ID

Optional:
- `NEXT_PUBLIC_GTM_ID` - Google Tag Manager ID
- `NEXTAUTH_SECRET` - NextAuth secret for authentication
- `NEXTAUTH_URL` - Base URL for authentication

## 📞 Support

- **Email**: info@rhcsolutions.com
- **Phone**: +1 (917) 628-2365
- **Website**: https://rhcsolutions.com

## 📝 License

© 2025 RHC Solutions. All rights reserved.
