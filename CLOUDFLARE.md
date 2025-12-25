# Cloudflare Pages Deployment Guide

## Prerequisites
- Node.js 20+
- Cloudflare account
- Wrangler CLI installed globally: `npm install -g wrangler`

## Local Development
```bash
npm install
npm run dev
```

## Build for Cloudflare Pages
```bash
npm run pages:build
```

## Preview Locally with Cloudflare Workers
```bash
npm run preview
```

## Deploy to Cloudflare Pages

### Method 1: Using Wrangler CLI
```bash
# First time: login to Cloudflare
wrangler login

# Deploy
npm run pages:deploy
```

### Method 2: Using Cloudflare Dashboard (Git Integration)
1. Go to Cloudflare Dashboard > Pages
2. Create a new project
3. Connect your Git repository (GitHub, GitLab, etc.)
4. Configure build settings:
   - **Build command**: `npm run pages:build`
   - **Build output directory**: `.vercel/output/static`
   - **Node version**: `20`

## Environment Variables

### Required for Production
Set these in Cloudflare Pages Dashboard > Settings > Environment Variables:

```
# Google reCAPTCHA
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_recaptcha_site_key
RECAPTCHA_SECRET_KEY=your_recaptcha_secret_key

# Telegram Bot
TELEGRAM_BOT_TOKEN=your_bot_token
TELEGRAM_CHAT_ID=your_chat_id

# Google Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=your_ga_measurement_id

# Google Tag Manager
NEXT_PUBLIC_GTM_ID=your_gtm_id

# Site URL
NEXT_PUBLIC_SITE_URL=https://rhcsolutions.com
```

## Performance Optimizations Applied

### 1. Static Asset Caching
- Aggressive caching for static assets (1 year)
- Image optimization via Cloudflare CDN
- Font preloading and caching

### 2. Security Headers
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- CSP headers for XSS protection
- HSTS ready (uncomment in _headers when ready)

### 3. Build Optimizations
- SWC minification enabled
- Compression enabled
- React strict mode for development safety

### 4. Edge Runtime
- API routes run on Cloudflare Workers
- Global distribution for low latency
- Serverless architecture with no cold starts

## Custom Configurations

### Headers (_headers)
Custom headers for security and caching are configured in `_headers` file.

### Redirects (_redirects)
URL redirects and rewrites are configured in `_redirects` file.

### Wrangler (wrangler.toml)
Cloudflare Workers configuration for local development and deployment.

## Troubleshooting

### Build Fails
- Ensure Node.js version is 20+
- Clear cache: `rm -rf .next .vercel node_modules && npm install`
- Check environment variables are set

### API Routes Not Working
- Verify `nodejs_compat` flag is enabled in wrangler.toml
- Check Cloudflare Workers logs in dashboard
- Ensure environment variables are set in Cloudflare

### Images Not Loading
- Images are set to unoptimized mode for Cloudflare
- Cloudflare will handle optimization automatically
- Ensure image paths are correct

## Monitoring
- View logs: Cloudflare Dashboard > Pages > Project > Logs
- Analytics: Cloudflare Dashboard > Pages > Project > Analytics
- Workers Analytics: Cloudflare Dashboard > Workers & Pages > Analytics

## Costs
- Cloudflare Pages: Free tier includes 500 builds/month
- Cloudflare Workers: Free tier includes 100,000 requests/day
- No bandwidth charges on free tier

## Additional Resources
- [Cloudflare Pages Documentation](https://developers.cloudflare.com/pages/)
- [Next.js on Cloudflare Pages](https://developers.cloudflare.com/pages/framework-guides/nextjs/)
- [Wrangler CLI Documentation](https://developers.cloudflare.com/workers/wrangler/)
