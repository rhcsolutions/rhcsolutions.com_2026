# Deployment Guide

Complete guide for deploying the RHC Solutions website to various hosting platforms.

## 📋 Prerequisites

- Node.js 18+ installed
- Git repository (for automated deployments)
- Environment variables configured
- Production domain ready (optional)

## 🚀 Deployment Options

### Option 1: Vercel (Recommended)

Vercel provides the best integration with Next.js and offers automatic deployments.

#### Initial Setup

1. **Push code to Git repository** (GitHub, GitLab, or Bitbucket)

2. **Deploy to Vercel**:
   - Visit [vercel.com](https://vercel.com) and sign in
   - Click "New Project"
   - Import your repository
   - Configure project:
     - Framework Preset: Next.js
     - Build Command: `npm run build`
     - Output Directory: `.next`
     - Install Command: `npm install`

3. **Set environment variables**:
   ```
   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
   NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
   NEXTAUTH_SECRET=your-secret-key
   NEXTAUTH_URL=https://rhcsolutions.com
   ```

4. **Deploy**: Click "Deploy" and wait for build to complete

#### Custom Domain

1. Go to Project Settings → Domains
2. Add `rhcsolutions.com` and `www.rhcsolutions.com`
3. Update DNS records as instructed by Vercel
4. SSL certificate is automatically provisioned

#### Automatic Deployments

- **Production**: Pushes to `main` branch auto-deploy to production
- **Preview**: Pull requests create preview deployments
- **Rollback**: Instant rollback to previous deployments

---

### Option 2: Railway

Railway offers simple deployment with automatic HTTPS and custom domains.

1. **Install Railway CLI**:
   ```bash
   npm install -g @railway/cli
   ```

2. **Login and initialize**:
   ```bash
   railway login
   railway init
   ```

3. **Set environment variables**:
   ```bash
   railway variables set NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
   railway variables set NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
   railway variables set NEXTAUTH_SECRET=your-secret-key
   ```

4. **Deploy**:
   ```bash
   railway up
   ```

5. **Add custom domain**:
   - Go to Railway dashboard → Settings → Domains
   - Add `rhcsolutions.com`
   - Update DNS CNAME record

---

### Option 3: Docker

Deploy using Docker containers on any platform (AWS, DigitalOcean, etc.)

1. **Build Docker image**:
   ```bash
   docker build -t rhcsolutions-website .
   ```

2. **Run container**:
   ```bash
   docker run -d \
     -p 3000:3000 \
     -e NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX \
     -e NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX \
     -e NEXTAUTH_SECRET=your-secret-key \
     -e NEXTAUTH_URL=https://rhcsolutions.com \
     --name rhcsolutions \
     rhcsolutions-website
   ```

3. **Set up reverse proxy** (Nginx example):
   ```nginx
   server {
       listen 80;
       server_name rhcsolutions.com www.rhcsolutions.com;
       
       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

4. **Set up SSL with Let's Encrypt**:
   ```bash
   sudo certbot --nginx -d rhcsolutions.com -d www.rhcsolutions.com
   ```

---

### Option 4: Traditional VPS/Dedicated Server

Deploy on your own server with PM2 process manager.

1. **Install Node.js 18+** on your server

2. **Clone repository**:
   ```bash
   git clone https://github.com/your-org/rhcsolutions-website.git
   cd rhcsolutions-website
   ```

3. **Install dependencies**:
   ```bash
   npm install
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
