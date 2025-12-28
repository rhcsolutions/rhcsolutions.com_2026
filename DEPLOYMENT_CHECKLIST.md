# Deployment Checklist for 2026.rhcsolutions.com

## ✅ Pre-Deployment

- [ ] Generate `NEXTAUTH_SECRET`: `openssl rand -base64 32`
- [ ] Update `.env.production` with correct values:
  - [ ] `NEXTAUTH_SECRET` (from above)
  - [ ] `NEXTAUTH_URL=https://2026.rhcsolutions.com`
  - [ ] `NEXT_PUBLIC_SITE_URL=https://2026.rhcsolutions.com`
- [ ] Verify Telegram bot tokens are correct
- [ ] Test build locally: `npm run build`

## 🚀 Deployment

### Quick Deployment (Recommended)
```bash
# 1. Upload files to CloudPanel server
scp -r ./* user@server:/home/cloudpanel/htdocs/2026.rhcsolutions.com/

# 2. SSH into server
ssh user@server

# 3. Run deployment script
cd /home/cloudpanel/htdocs/2026.rhcsolutions.com
chmod +x deploy.sh
./deploy.sh
```

### Manual Deployment
```bash
cd /home/cloudpanel/htdocs/2026.rhcsolutions.com
npm install --production
cp .env.production .env
npm run build
pm2 start npm --name "rhc-2026" -- start
pm2 save
```

## 🔧 Nginx Configuration

1. Copy content from `nginx/cloudpanel.conf`
2. In CloudPanel UI:
   - Go to your site → Vhost Editor
   - Paste the config
   - Update SSL certificate paths if needed
   - Click "Save"

## ✅ Post-Deployment Verification

- [ ] Site loads: https://2026.rhcsolutions.com
- [ ] Admin login works: https://2026.rhcsolutions.com/admin/login
  - Default: admin@rhcsolutions.com / admin123 (CHANGE THIS!)
- [ ] Contact form submits to Telegram
- [ ] Job application submits to Telegram
- [ ] All pages load without errors
- [ ] Static assets load correctly
- [ ] SSL certificate is valid

## 🔒 Security

- [ ] Change default admin password
- [ ] Verify firewall only allows 80/443
- [ ] Confirm `NEXTAUTH_SECRET` is strong
- [ ] SSL certificate is valid and auto-renewing
- [ ] Cloudflare DNS configured correctly

## 📊 Monitoring

```bash
# Check application status
pm2 status

# View logs
pm2 logs rhc-2026

# Monitor resources
pm2 monit

# Test application
curl http://localhost:3000
```

## 🐛 Troubleshooting

### App not starting
```bash
pm2 logs rhc-2026 --err
```

### Port already in use
```bash
lsof -ti:3000 | xargs kill -9
pm2 restart rhc-2026
```

### Nginx 502
```bash
# Check if app is running
curl http://localhost:3000

# Restart everything
pm2 restart all
sudo systemctl restart nginx
```

## 📝 Important Files

- `.env.production` - Production environment variables
- `nginx/cloudpanel.conf` - Nginx configuration
- `deploy.sh` - Automated deployment script
- `DEPLOYMENT_CLOUDPANEL.md` - Detailed deployment guide

## 🎯 Quick Commands

```bash
# Restart app
pm2 restart rhc-2026

# View logs
pm2 logs rhc-2026

# Update app
cd /home/cloudpanel/htdocs/2026.rhcsolutions.com
git pull
npm install
npm run build
pm2 restart rhc-2026

# Backup CMS data
tar -czf cms-backup-$(date +%Y%m%d).tar.gz cms-data/
```
