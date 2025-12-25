# RHC Solutions — Source

This repository contains the Next.js site and a small file-based CMS used by the admin UI.

Quick start (local):

```powershell
pnpm install
pnpm dev
```

Notes:

- Content is stored in `cms-data/*.json` for simple editing and backups.
- Admin UI is under `/admin` and requires authentication via NextAuth.
- Use `public/robots.txt` and `public/sitemap.xml` for SEO; admin pages can edit/regenerate them.

For detailed deploy steps see `DEPLOYMENT.md`.
