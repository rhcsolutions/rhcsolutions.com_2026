# 🚀 Quick Start - Deploy to 2026.rhcsolutions.com

## Before You Start

**Prerequisites on CloudPanel server:**
1. Node.js 20.x+ (LTS, install if missing - 18.x is EOL)
2. npm (comes with Node.js)
3. PM2 (will be installed by script)

**Install Node.js on CloudPanel (Ubuntu/Debian):**
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
node -v   # Verify installation (should show v20.x or higher)
npm -v
```

**Generate NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```

Update this value in `.env.production` → `NEXTAUTH_SECRET=YOUR_GENERATED_SECRET`

## 📦 Upload Files

Upload the entire project to your CloudPanel server:

```bash
# Via SFTP or rsync
rsync -avz --exclude 'node_modules' --exclude '.next' ./ user@server:/home/cloudpanel/htdocs/2026.rhcsolutions.com/
```

## ⚡ Quick Deploy

SSH into your CloudPanel server and run:

```bash
cd /home/cloudpanel/htdocs/2026.rhcsolutions.com
chmod +x deploy.sh
./deploy.sh
```

That's it! The script will:
- Install all dependencies (including devDependencies for Next.js build)
- Build the application
- Start with PM2

## 🌐 Configure Nginx

1. Open CloudPanel → Your Site → Vhost Editor
2. Copy content from `nginx/cloudpanel.conf`
3. Paste into Vhost Editor
4. Click "Save"
5. SSL certificate will auto-generate via Let's Encrypt

## ✅ Verify

Visit: https://2026.rhcsolutions.com

Admin: https://2026.rhcsolutions.com/admin/login
- Email: admin@rhcsolutions.com
- Password: admin123 (CHANGE THIS IMMEDIATELY!)

## 📚 Full Documentation

- **DEPLOYMENT_CHECKLIST.md** - Step-by-step checklist
- **DEPLOYMENT_CLOUDPANEL.md** - Complete deployment guide
- **CLOUDPANEL.md** - CloudPanel-specific configuration

## 🆘 Troubleshooting

```bash
# Check app status
pm2 status

# View logs
pm2 logs rhc-2026

# Restart app
pm2 restart rhc-2026

# Restart Nginx
sudo systemctl restart nginx
```

## 📞 Support

If you encounter issues:
1. Check logs: `pm2 logs rhc-2026`
2. Verify environment: `cat .env`
3. Test locally: `curl http://localhost:3000`

---

**Site:** 2026.rhcsolutions.com  
**Admin:** /admin/login  
**Environment:** Production
