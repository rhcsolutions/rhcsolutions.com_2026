# 🔧 Troubleshooting Guide

## npm: command not found

**Problem:** `./deploy.sh: line 42: npm: command not found`

**Solution:** Node.js is not installed on your CloudPanel server.

```bash
# Step 1: Install Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Step 2: Verify installation
node -v  # Should show v18.x.x
npm -v   # Should show version number

# Step 3: Re-run deployment
cd /home/admin_2026_rhcsolutions_com/htdocs/2026.rhcsolutions.com
./deploy.sh
```

## Directory not found

**Problem:** `./deploy.sh: line 28: cd: /home/cloudpanel/htdocs/2026.rhcsolutions.com: No such directory`

**Solution:** CloudPanel uses a different directory structure.

Find your actual directory:
```bash
# Login to CloudPanel server
find /home -name "2026.rhcsolutions.com" -type d

# Or check where CloudPanel created your domain:
ls /home/*/htdocs/
```

Then run from the correct directory:
```bash
cd /path/to/your/actual/directory
./deploy.sh
```

## Port already in use

**Problem:** PM2 app won't start, port 3000 already in use

```bash
# Find what's using port 3000
sudo lsof -i :3000

# Kill the process
sudo kill -9 <PID>

# Or change port in next.config.mjs and .env.production
PORT=3001 npm start
```

## npm install fails

**Problem:** `npm install` returns errors

Solutions:
```bash
# Clear npm cache
npm cache clean --force

# Remove node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install --production
```

## Build fails

**Problem:** `npm run build` returns errors

```bash
# Check Node version (must be 18+)
node -v

# Update npm
npm install -g npm@latest

# Try build with verbose output
npm run build -- --verbose

# Check disk space
df -h

# Check available memory
free -h
```

## PM2 not starting app

**Problem:** PM2 starts but app crashes immediately

```bash
# Check PM2 logs
pm2 logs rhc-2026

# Check if .env.production exists and has correct values
cat .env.production

# Try starting manually
npm start

# Check if port 3000 is accessible
netstat -tulpn | grep 3000
```

## Nginx 502 Bad Gateway

**Problem:** Site shows "502 Bad Gateway" error

**Possible causes:**
1. Node.js app not running: `pm2 status`
2. App listening on wrong port: Check `next.config.mjs`
3. Nginx can't connect to localhost:3000
4. Connection refused from upstream

**Solutions:**
```bash
# Check if app is running
pm2 status

# Restart app
pm2 restart rhc-2026

# Check app logs
pm2 logs rhc-2026

# Verify app is listening
netstat -tulpn | grep 3000

# Check Nginx error logs (on CloudPanel)
tail -f /var/log/nginx/error.log

# Check CloudPanel Nginx config syntax
sudo nginx -t
```

## SSL Certificate Error

**Problem:** Site shows SSL certificate warning or error

**Solution:**
1. CloudPanel automatically generates Let's Encrypt certificates
2. If not generated:
   - Open CloudPanel UI → Your Site → SSL
   - Click "Generate Let's Encrypt Certificate"
   - Wait 2-3 minutes for generation

```bash
# Check certificate validity
openssl s_client -connect 2026.rhcsolutions.com:443

# Check certificate expiry
openssl x509 -in /etc/ssl/certs/2026.rhcsolutions.com.crt -text -noout
```

## Telegram notifications not working

**Problem:** Contact form submits but no Telegram message

**Checklist:**
1. Verify bot token in `.env.production`: `TELEGRAM_BOT_TOKEN`
2. Verify chat ID: `TELEGRAM_CHAT_ID`
3. Check bot has permission to send messages
4. Check CloudPanel firewall allows outbound HTTPS

```bash
# Test Telegram API directly
curl -X POST https://api.telegram.org/bot{BOT_TOKEN}/sendMessage \
  -d chat_id={CHAT_ID} \
  -d text="Test message"

# Check app logs
pm2 logs rhc-2026
```

## Contact form returns 500 error

**Problem:** Form submission fails with 500 error

```bash
# Check app logs for details
pm2 logs rhc-2026 | tail -50

# Test API endpoint directly
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","subject":"Test","message":"Hello"}'

# Check .env.production has required variables
cat .env.production
```

## High memory usage

**Problem:** App consuming too much memory

```bash
# Check memory usage
pm2 monit

# Check Node.js memory limit
node --max-old-space-size=512 node_modules/.bin/next start

# Or set in PM2 config:
pm2 start npm --name "rhc-2026" -- start --max-old-space-size=512
```

## Stuck deployment

**Problem:** `./deploy.sh` hangs during npm install or build

```bash
# Kill the hung process
pkill -f "npm install"
pkill -f "next build"

# Check disk space (needs at least 500MB)
df -h

# Try again with verbose output
npm install --verbose
npm run build -- --verbose
```

## How to Check Logs

```bash
# PM2 app logs (realtime)
pm2 logs rhc-2026

# Last 100 lines
pm2 logs rhc-2026 | tail -100

# Save logs to file
pm2 logs rhc-2026 > app.log 2>&1

# CloudPanel Nginx access logs
tail -f /var/log/nginx/access.log

# CloudPanel Nginx error logs
tail -f /var/log/nginx/error.log

# System messages
journalctl -n 50 -f
```

## Quick Diagnostics Command

Run this to check server status:

```bash
echo "=== Node.js ===" && node -v && npm -v
echo "=== App Status ===" && pm2 status
echo "=== Port 3000 ===" && netstat -tulpn | grep 3000 || echo "Not listening"
echo "=== Disk Space ===" && df -h /
echo "=== Memory ===" && free -h
echo "=== Recent Logs ===" && pm2 logs rhc-2026 | tail -20
```

## Getting Help

If you're stuck:
1. Run the diagnostics command above
2. Check the relevant section in this guide
3. Review PM2 logs: `pm2 logs rhc-2026`
4. Check CloudPanel dashboard for system issues
5. Verify `.env.production` has all required variables
6. Ensure Node.js 18+ is installed
