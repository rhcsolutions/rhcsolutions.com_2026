# CloudPanel Deployment Guide

This guide assumes you have CloudPanel running on a Linux host behind Cloudflare.

## Prerequisites

- CloudPanel server (Ubuntu 22.04 LTS recommended)
- Docker & Docker Compose installed
- Domain with Cloudflare DNS
- SSH access to the server

## Steps

### 1. Deploy via CloudPanel Dashboard

1. Log into CloudPanel → **Applications** → **Add Application** or **Docker**
2. Choose Node.js / Docker runtime
3. Link the GitHub repo or upload the code

### 2. Environment Variables

In CloudPanel, set application environment variables:

```bash
NODE_ENV=production
NEXTAUTH_SECRET=<generate-a-random-string>
NEXTAUTH_URL=https://your-domain.com
```

### 3. Build & Deploy

Option A: CloudPanel's built-in deploy
- CloudPanel may auto-build and run `npm install` + `npm run build`

Option B: Manual Docker Compose (SSH)

```bash
cd /path/to/app
docker compose -f docker-compose.yml -f docker-compose.nginx.yml up --build -d
```

### 4. CloudPanel Nginx Integration

CloudPanel typically manages `/etc/nginx/conf.d/` or sites under `/etc/nginx/sites-available/`.

- If CloudPanel auto-creates Nginx config, you may not need our custom `nginx/default.conf`.
- Alternatively, replace CloudPanel's auto-generated config with ours and reload Nginx:

```bash
sudo cp nginx/default.conf /etc/nginx/conf.d/default.conf
sudo systemctl reload nginx
```

### 5. SSL Certificates

CloudPanel usually manages Let's Encrypt certs automatically via Certbot.

- Point your `nginx/default.conf` to CloudPanel's cert storage:

  ```bash
  ssl_certificate /etc/letsencrypt/live/your-domain/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/your-domain/privkey.pem;
  ```

### 6. Cloudflare Settings

In Cloudflare dashboard:

- **DNS**: Point your domain to your CloudPanel server's IP
- **SSL/TLS**: Set to "Full (strict)" if your server has valid cert (Let's Encrypt via CloudPanel)
- **Page Rules** (optional): Cache everything, aggressive caching for `/_next/static`

### Troubleshooting

- **Port 80/443 blocked**: CloudPanel may run its own reverse proxy. Check CloudPanel docs or update the port in `docker-compose.nginx.yml`.
- **Cert not renewing**: Ensure CloudPanel's Certbot renewal runs. Check logs: `sudo journalctl -u certbot-renewal`
- **Real IP not correct**: CloudPanel's Nginx should already trust Cloudflare IPs if you use our config with `set_real_ip_from` directives.

### Persist Data

Mount `cms-data/` as a volume in CloudPanel's Docker settings or via `docker-compose.yml`:

```yaml
volumes:
  - /data/cms:/app/cms-data
```

This ensures form submissions and CMS edits survive container restarts.

## Monitoring

Use CloudPanel's dashboard to:

- View application logs
- Monitor resource usage
- Manage domains and SSL

Or SSH and check Docker logs:

```bash
docker logs rhcsolutions-web
docker logs rhcsolutions-nginx
```
