# Deployment Manifest - 2026.rhcsolutions.com
# Generated: 2025-12-28

## Target Environment
- **Domain:** 2026.rhcsolutions.com
- **Platform:** CloudPanel (Linux)
- **Proxy:** Cloudflare → CloudPanel → Next.js
- **Port:** 3000 (internal)
- **SSL:** Let's Encrypt (via CloudPanel)

## Pre-Deployment Status
✅ Project cleaned (node_modules, .next, logs removed)
✅ Environment configured (.env.production)
✅ Nginx config ready (nginx/cloudpanel.conf)
✅ Deployment scripts ready (deploy.sh, cleanup.ps1/sh)
✅ Documentation complete (QUICKSTART_DEPLOY.md)

## Required Actions Before Deploy
⚠️ CRITICAL: Generate and set NEXTAUTH_SECRET in .env.production
   Command: openssl rand -base64 32

## Deployment Files Checklist
- [x] .env.production (⚠️ UPDATE NEXTAUTH_SECRET)
- [x] nginx/cloudpanel.conf
- [x] deploy.sh
- [x] cleanup.ps1 / cleanup.sh
- [x] docker-compose.yml
- [x] docker-compose.nginx.yml
- [x] Dockerfile
- [x] package.json
- [x] next.config.mjs
- [x] cms-data/ (with initial content)

## Configuration Status
- [x] Telegram bots configured
- [x] Booking URL set
- [x] Site URL configured for 2026.rhcsolutions.com
- [ ] NEXTAUTH_SECRET (MUST UPDATE)
- [ ] Google Analytics (optional)
- [ ] reCAPTCHA (optional)

## Deployment Method
**Recommended:** SSH + deploy.sh script

```bash
# 1. Upload files
rsync -avz --exclude 'node_modules' --exclude '.next' \
  ./ user@server:/home/cloudpanel/htdocs/2026.rhcsolutions.com/

# 2. Deploy
ssh user@server
cd /home/cloudpanel/htdocs/2026.rhcsolutions.com
chmod +x deploy.sh
./deploy.sh

# 3. Configure Nginx (CloudPanel UI)
# Copy content from nginx/cloudpanel.conf
# Paste in: CloudPanel → Site → Vhost Editor
```

## Post-Deployment Verification
- [ ] Site accessible: https://2026.rhcsolutions.com
- [ ] Admin login works: https://2026.rhcsolutions.com/admin/login
- [ ] Contact form → Telegram notification
- [ ] Job application → Telegram notification
- [ ] SSL certificate valid
- [ ] All pages load correctly
- [ ] Static assets cached properly

## Admin Access
**URL:** https://2026.rhcsolutions.com/admin/login
**Default Credentials:**
- Email: admin@rhcsolutions.com
- Password: admin123

⚠️ **SECURITY:** Change password immediately after first login!

## Monitoring Commands
```bash
# Application status
pm2 status

# View logs
pm2 logs rhc-2026

# Monitor performance
pm2 monit

# Nginx status
sudo systemctl status nginx

# Check running on port 3000
curl http://localhost:3000
```

## Rollback Plan
If deployment fails:
1. Check logs: `pm2 logs rhc-2026 --err`
2. Restart: `pm2 restart rhc-2026`
3. Rebuild: `npm run build && pm2 restart rhc-2026`
4. Full reset: Stop PM2, delete .next, rebuild

## Support Contacts
- GitHub: rhcsolutions/rhcsolutions.com_2026
- Documentation: README.md, QUICKSTART_DEPLOY.md

## Change Log
- 2025-12-28: Initial deployment preparation
  - CloudPanel configuration
  - Nginx reverse proxy setup
  - Cloudflare IP trust
  - PM2 process management
  - Telegram notifications
  - CMS with editable content

---
**Status:** READY FOR DEPLOYMENT ✅
**Next:** Generate NEXTAUTH_SECRET and deploy!
