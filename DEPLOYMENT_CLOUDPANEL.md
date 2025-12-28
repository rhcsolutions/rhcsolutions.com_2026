# CloudPanel Deployment Guide - 2026.rhcsolutions.com

## Pre-Deployment Checklist

### 1. Generate NextAuth Secret
```bash
openssl rand -base64 32
```
Copy the output and update `.env.production` → `NEXTAUTH_SECRET`

### 2. Update Environment Variables
Edit `.env.production`:
- ✅ `NEXTAUTH_SECRET` - Use the generated secret above
- ✅ `NEXTAUTH_URL=https://2026.rhcsolutions.com`
- ✅ `NEXT_PUBLIC_SITE_URL=https://2026.rhcsolutions.com`
- ⚠️ Update GA/GTM IDs if you have them
- ⚠️ Update reCAPTCHA keys if needed

### 3. Verify Telegram Bot Tokens
The `.env.production` file includes your Telegram bot tokens:
- Resume/Careers bot: Active ✅
- Contact form bot: Active ✅

## CloudPanel Deployment Steps

### Option 1: Direct Node.js Deployment

1. **SSH into CloudPanel server:**
   ```bash
   ssh user@your-cloudpanel-server
   ```

2. **Navigate to site directory:**
   ```bash
   cd /home/cloudpanel/htdocs/2026.rhcsolutions.com
   ```

3. **Clone or upload your code:**
   ```bash
   git clone https://github.com/rhcsolutions/rhcsolutions.com_2026.git .
   # OR upload via SFTP
   ```

4. **Install dependencies:**
   ```bash
   npm install --production
   ```

5. **Copy environment file:**
   ```bash
   cp .env.production .env
   ```

6. **Build the application:**
   ```bash
   npm run build
   ```

7. **Start with PM2 (CloudPanel manages this):**
   ```bash
   pm2 start npm --name "rhc-2026" -- start
   pm2 save
   pm2 startup
   ```

8. **Configure Nginx:**
   - Copy `nginx/cloudpanel.conf` content
   - In CloudPanel UI: go to your site → Vhost Editor
   - Replace the content with the config from `nginx/cloudpanel.conf`
   - Click "Save"

9. **SSL Certificate:**
   - CloudPanel will auto-generate Let's Encrypt certificate
   - Or import existing certificate through CloudPanel UI

### Option 2: Docker Deployment (Recommended)

1. **Install Docker and Docker Compose on CloudPanel:**
   ```bash
   curl -fsSL https://get.docker.com | sh
   sudo usermod -aG docker $USER
   ```

2. **Navigate to site directory:**
   ```bash
   cd /home/cloudpanel/htdocs/2026.rhcsolutions.com
   ```

3. **Upload files and environment:**
   ```bash
   # Upload via git or SFTP
   cp .env.production .env
   ```

4. **Build and run with Docker Compose:**
   ```bash
   docker compose up --build -d
   ```

5. **Configure Nginx in CloudPanel:**
   - Use `nginx/cloudpanel.conf`
   - Update proxy_pass to point to `localhost:3000`
   - Save and reload

## Post-Deployment

### Verify Deployment
```bash
# Check if app is running
curl http://localhost:3000

# Check PM2 status (if using PM2)
pm2 status

# Check Docker status (if using Docker)
docker ps
docker logs rhcsolutions-web
```

### Test the site
- Visit https://2026.rhcsolutions.com
- Test contact form → Check Telegram
- Submit a job application → Check Telegram
- Test admin login: https://2026.rhcsolutions.com/admin/login

### Monitor Logs
```bash
# PM2 logs
pm2 logs rhc-2026

# Docker logs
docker logs -f rhcsolutions-web

# Nginx logs
tail -f /var/log/nginx/access.log
tail -f /var/log/nginx/error.log
```

## Troubleshooting

### Port 3000 already in use
```bash
# Find and kill process
lsof -ti:3000 | xargs kill -9

# Or use different port in docker-compose.yml
```

### Environment variables not loading
```bash
# Verify .env file exists and has correct values
cat .env | grep NEXTAUTH

# Restart application
pm2 restart rhc-2026
# OR
docker compose restart
```

### Nginx 502 Bad Gateway
```bash
# Check if app is running
curl http://localhost:3000

# Check firewall
sudo ufw status
sudo ufw allow 3000

# Restart services
pm2 restart all
docker compose restart
sudo systemctl restart nginx
```

### SSL Certificate Issues
- Ensure DNS points to CloudPanel server
- Wait 5-10 minutes for Let's Encrypt validation
- Check CloudPanel logs: `/var/log/cloudpanel/`

## Security Checklist

- ✅ Change default admin password in CMS
- ✅ NEXTAUTH_SECRET is strong and unique
- ✅ Firewall allows only 80/443 (not 3000 externally)
- ✅ SSL certificate is valid
- ✅ Real client IPs tracked via Cloudflare headers
- ✅ Telegram bots secured with tokens

## Maintenance

### Update application
```bash
git pull origin master
npm install
npm run build
pm2 restart rhc-2026
# OR
docker compose up --build -d
```

### Backup CMS data
```bash
# Backup cms-data folder
tar -czf cms-data-backup-$(date +%Y%m%d).tar.gz cms-data/

# Download to local machine
scp user@server:/path/to/backup.tar.gz ./
```

### Monitor performance
```bash
# PM2 monitoring
pm2 monit

# Docker stats
docker stats
```

## Support
For issues, check:
- CloudPanel documentation
- CLOUDPANEL.md in this repo
- README.md for general setup info
