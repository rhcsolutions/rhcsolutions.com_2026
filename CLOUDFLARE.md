# Cloudflare Integration

Use Cloudflare CDN for DNS, caching, and optional DDoS protection.

## DNS & Domain

1. Point your domain to Cloudflare nameservers in your registrar
2. Add DNS records in Cloudflare Dashboard:
   - `A` record: your-ip (or CNAME to Vercel/Railway/etc.)
   - `CNAME` www → your-ip
3. Enable SSL/TLS (Automatic)
4. Set up Page Rules for caching static assets

## Cache Purge API

The site includes an API endpoint to purge Cloudflare cache from the admin dashboard.

### Setup

1. Create a Cloudflare API token at [dash.cloudflare.com](https://dash.cloudflare.com) → Account → API Tokens
   - Create token with "Cache Purge" and "Zone Read" permissions
2. Add to `.env.local`:
   ```env
   CLOUDFLARE_API_TOKEN=your-api-token
   CLOUDFLARE_ZONE_ID=your-zone-id
   ```
3. Or add via admin dashboard `/admin/settings`

### Usage

Go to `/admin/dashboard` and click "Purge Cache" to clear all cached pages.

Alternatively, POST to `/api/cloudflare/purge`:

```bash
curl -X POST https://your-site.com/api/cloudflare/purge \
  -H "Content-Type: application/json"
```

## Security

- Enable "Under Attack Mode" if you see suspicious traffic
- Set up WAF rules to block bots
- Enable DDoS protection (automatic on Free tier)

## Performance

- **Caching**: Set Page Rules to cache HTML, CSS, JS, images
- **Minification**: Enable in Cloudflare dashboard
- **Compression**: Brotli enabled automatically

## File Configuration

- `_headers` — Custom response headers (caching, security)
- `_redirects` — URL redirects and rewrites
- `wrangler.toml` — Cloudflare Workers config (used if deploying to Pages)

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
