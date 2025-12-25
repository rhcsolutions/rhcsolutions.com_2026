# Deployment Guide

Deploy RHC Solutions to production. Choose your platform below.

## Prerequisites

- Node.js 18+ installed locally
- Git repository pushed to GitHub/GitLab/Bitbucket
- Environment variables ready (see README.md)
- Production domain configured

## Option 1: Vercel (Recommended)

Best Next.js integration with automatic deployments and global CDN.

1. Go to [vercel.com](https://vercel.com) → Import repository
2. Select project, confirm Next.js preset
3. Add environment variables (Settings → Environment Variables):
   - `NEXTAUTH_SECRET` — Random secret (generate with `openssl rand -hex 32`)
   - `NEXTAUTH_URL` — `https://rhcsolutions.com`
   - `SMTP_*` vars (optional for email)
   - `CLOUDFLARE_*` vars (optional for CDN purge)
4. Click Deploy
5. Go to Settings → Domains, add `rhcsolutions.com` and `www.rhcsolutions.com`
6. Update DNS CNAME as instructed

**Auto-deploys**: Push to main branch → live instantly. Preview deploys on PR.

## Option 2: Railway

Simple platform with built-in HTTPS and custom domains.

1. Go to [railway.app](https://railway.app) → Create New Project → GitHub
2. Select repository
3. Go to Variables → add your env vars
4. Railway auto-deploys on push
5. Go to Settings → Domains → add `rhcsolutions.com`
6. Update DNS CNAME

**Cost**: Metered usage (typically $5–20/mo)

## Option 3: Cloudflare Pages

Fast, global deployment with Cloudflare's CDN (via wrangler.toml).

1. Ensure `wrangler.toml` is configured
2. Install Wrangler: `npm install -g @cloudflare/wrangler`
3. Run `wrangler login`
4. Run `npm run build` then `wrangler pages deploy .next`
5. Or use Cloudflare Dashboard → Pages → Connect Git for auto-deploys

**Note**: Ensure `public/` and `cms-data/` persist; Cloudflare Pages is for static exports.

## Option 4: Docker (Self-Hosted)

For AWS, DigitalOcean, or your own VPS.

1. Build image: `docker build -t rhcsolutions-website .`
2. Run:
   ```bash
   docker run -d -p 3000:3000 \
     -e NEXTAUTH_SECRET=your-secret \
     -e NEXTAUTH_URL=https://rhcsolutions.com \
     -v /path/to/cms-data:/app/cms-data \
     -v /path/to/public:/app/public \
     rhcsolutions-website
   ```
3. Set up Nginx reverse proxy + SSL (Let's Encrypt)

## Post-Deploy Checklist

- [ ] Test admin login at `/admin/login`
- [ ] Test media upload to `/admin/media`
- [ ] Test robots/sitemap editors
- [ ] Verify Cloudflare cache purge (if enabled)
- [ ] Check email sending (if SMTP configured)
- [ ] Verify 2FA setup for admin users
- [ ] Test contact form submission
- [ ] Ensure `cms-data/` and `public/` persist in backups
   ```

4. **Create `.env.local`**:
   ```bash
   cp .env.local.example .env.local
   # Edit .env.local with your values
   ```

5. **Build for production**:
   ```bash
   npm run build
   ```

6. **Install PM2**:
   ```bash
   npm install -g pm2
   ```

7. **Start application**:
   ```bash
   pm2 start npm --name "rhcsolutions" -- start
   pm2 startup
   pm2 save
   ```

8. **Set up Nginx reverse proxy** (same as Docker option above)

9. **Configure SSL** with Let's Encrypt (same as Docker option above)

---

### Option 5: Cloudflare Pages

> **Note**: The CMS requires server-side functionality. For Cloudflare Pages deployment, see [CLOUDFLARE.md](./CLOUDFLARE.md) for the static export approach and limitations.

---

## 🌐 DNS Configuration

### For Vercel/Railway
Follow the platform-specific DNS instructions provided in their dashboard.

### For Self-Hosted (VPS/Docker)
Add these DNS records at your domain registrar:

```
Type    Name    Value               TTL
A       @       [Your Server IP]    3600
A       www     [Your Server IP]    3600
```

Or use CNAME for www:
```
Type    Name    Value               TTL
A       @       [Your Server IP]    3600
CNAME   www     rhcsolutions.com    3600
```

## 🔒 SSL/HTTPS

- **Vercel/Railway**: Automatic SSL included
- **Self-hosted**: Use Let's Encrypt (free):
  ```bash
  sudo apt install certbot python3-certbot-nginx
  sudo certbot --nginx -d rhcsolutions.com -d www.rhcsolutions.com
  ```

## 📊 Environment Variables

### Required Variables

```env
# Google Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Google Tag Manager (optional)
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX

# Authentication
NEXTAUTH_SECRET=your-random-secret-key-min-32-chars
NEXTAUTH_URL=https://rhcsolutions.com
```

### Generating NEXTAUTH_SECRET

```bash
openssl rand -base64 32
```

## ✅ Post-Deployment Checklist

After deploying, verify the following:

- [ ] Website loads at your domain
- [ ] HTTPS/SSL certificate is active
- [ ] All pages load correctly (Home, About, Services, etc.)
- [ ] Navigation works properly
- [ ] Admin panel accessible at `/admin`
- [ ] Google Analytics tracking works
- [ ] Contact form/booking links work
- [ ] Mobile responsiveness verified
- [ ] SEO metadata present (view page source)
- [ ] Sitemap accessible at `/sitemap.xml`
- [ ] Robots.txt accessible at `/robots.txt`

## 📈 Monitoring & Analytics

### Google Analytics Setup

1. Create GA4 property at [analytics.google.com](https://analytics.google.com)
2. Copy Measurement ID (G-XXXXXXXXXX)
3. Add to environment variables
4. Deploy and verify tracking in GA Real-Time reports

### Google Search Console

1. Visit [search.google.com/search-console](https://search.google.com/search-console)
2. Add property for `rhcsolutions.com`
3. Verify ownership (DNS TXT record or HTML file)
4. Submit sitemap: `https://rhcsolutions.com/sitemap.xml`

### Performance Monitoring

- **Vercel**: Built-in analytics and Web Vitals
- **Railway**: Application metrics in dashboard
- **Self-hosted**: Use tools like PM2 monitoring or New Relic

## 🐛 Troubleshooting

### Build Fails

```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

### Port Already in Use

```bash
# Kill process on port 3000
# Linux/Mac:
lsof -ti:3000 | xargs kill -9

# Windows:
netstat -ano | findstr :3000
taskkill /PID [PID_NUMBER] /F
```

### Environment Variables Not Working

- Ensure variables start with `NEXT_PUBLIC_` for client-side access
- Restart dev server after changing `.env.local`
- For production, set variables in hosting platform dashboard
- Clear build cache: `rm -rf .next`

### Images Not Loading

- Ensure images are in `public` folder
- Use correct paths: `/image.png` not `./image.png`
- Check Next.js Image component configuration
- Verify image optimization settings in `next.config.mjs`

### Admin Panel Not Accessible

- Verify `NEXTAUTH_SECRET` is set
- Check `NEXTAUTH_URL` matches your domain
- Clear browser cookies and try again
- Check server logs for authentication errors

## 🔄 Continuous Deployment

### GitHub Actions (Example)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - run: npm test
      # Add deployment steps for your platform
```

## 📞 Support Resources

- **Next.js Documentation**: https://nextjs.org/docs
- **Vercel Support**: https://vercel.com/support
- **Railway Documentation**: https://docs.railway.app
- **Docker Documentation**: https://docs.docker.com

## 🎉 Success!

Your RHC Solutions website should now be live and accessible. For any issues, refer to the troubleshooting section or contact support.
