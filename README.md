# RHC Solutions — Website

High-performance Next.js site with an integrated file-based CMS, admin dashboard, and production-ready configuration.

## Overview

- Framework: Next.js 15 (App Router)
- Styling: Tailwind CSS + custom cyber theme
- Auth: NextAuth (Credentials provider)
- CMS: JSON files in `cms-data/`
- Admin: Protected UI under `/admin`

## Quick Start (Development)

Prerequisites:

- Node.js 18.18+ (LTS recommended)
- npm (or pnpm/yarn if you prefer)

Install and run:

```powershell
npm install
npm run dev
```

Notes:

- Dev server runs on [http://localhost:3003](http://localhost:3003)
- Sign in at [http://localhost:3003/admin/login](http://localhost:3003/admin/login)
  - Email: [admin@rhcsolutions.com](mailto:admin@rhcsolutions.com)
  - Password: admin123

## Production

Build and start:

```powershell
npm run build
npm start
```

Notes:

- Default port: 3000 ([http://localhost:3000](http://localhost:3000))
- Set environment variables in `.env` or `.env.production`:

```env
NEXTAUTH_SECRET=change-me
NEXTAUTH_URL=https://your-domain.com
```

Hosting options:

- Vercel (recommended for Next.js)
- Railway / Render (simple Node hosting)
- Docker behind Nginx (expose port 3000)

## Docker

Build image:

```bash
docker build -t rhcsolutions/web .
```

Run container (mount `cms-data` for persistence):

```bash
docker run --name rhc-web \
  -p 3000:3000 \
  -e NEXTAUTH_SECRET=change-me \
  -e NEXTAUTH_URL=http://localhost:3000 \
  -v ${PWD}/cms-data:/app/cms-data \
  rhcsolutions/web
```

### Docker Compose

```bash
docker compose up --build -d
```

Notes:

- Content persists in the bind-mounted `cms-data/` folder
- App listens on port 3000 inside the container

## Nginx Reverse Proxy (Recommended)

Use Nginx in front for TLS, caching and gzip.

- Compose file: [docker-compose.nginx.yml](docker-compose.nginx.yml)
- Config: [nginx/default.conf](nginx/default.conf)

Steps:

1. Update `server_name` in the Nginx config to your domain
2. Place TLS certs in `nginx/certs/` as `fullchain.pem` and `privkey.pem`
3. Start both services:

```bash
docker compose -f docker-compose.yml -f docker-compose.nginx.yml up --build -d
```

Notes:

- If you don’t have certs yet, point DNS and use a companion (e.g., Caddy/LetsEncrypt container) or temporarily comment SSL lines and serve HTTP first.
- The web app is only exposed internally; Nginx publishes ports 80/443 to the host.

## Vercel (Option)

1. Push this repo to GitHub
2. Import in Vercel → Framework: Next.js
3. Environment Variables:
   - `NEXTAUTH_SECRET` (required)
   - `NEXTAUTH_URL` = your domain
4. Deploy

If you need to keep `cms-data/` persistent in Vercel, use an external store (S3/R2/DB). The local file CMS is best for single-host deployments like Docker/Railway.
This repo includes a minimal `vercel.json` to use Node 18 for API routes.

## Features

### Admin Dashboard (`/admin`)

- Pages editor (blocks: hero, cards, cta, markdown)
- Navigation and settings manager
- Theme controls (colors, typography)
- Media and users management
- SEO tools
- Forms & Leads (see below)

### Public Site

- Home, Services, About, Careers, Contact and more
- SEO-friendly metadata, robots and sitemap

## Forms & Leads

Where data lives:

- `cms-data/forms.json` stores captured submissions

Admin UI capabilities:

- View leads in a table (Name, Email, Company, Message, Date, Status)
- Click a row or the “View” button to open an editable modal
- Edit and save fields: name, email, company, message, status, internal notes

API endpoints:

- GET `/api/forms` → list submissions
- PUT `/api/forms` → update submission

  Request body:

  ```json
  { "id": "<submission-id>", "updates": { "status": "Reviewed", "notes": "Called back" } }
  ```

- DELETE `/api/forms?id=<submission-id>` → delete submission

## Environment

Create `.env.local` (development) and set secrets as needed:

```env
NEXTAUTH_SECRET=dev-secret
NEXTAUTH_URL=http://localhost:3003
```

Optional:

- `NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX` (Google Analytics 4)

## Troubleshooting

- Leaflet “window is not defined”: fixed by dynamically importing Leaflet on the client in `src/components/InteractiveWorldMap.tsx`.
- 404 for `/about` or `/services/virtual-office-support`: redirects added to the correct pages.

## Scripts

```powershell
npm run dev     # Start dev server on 3003
npm run build   # Build production
npm start       # Run production on 3000
npm run lint    # Lint
```

## Tech Stack

- Next.js ^15.5.x (App Router)
- React 19
- Tailwind CSS 3
- NextAuth 4
- Framer Motion, React Icons
