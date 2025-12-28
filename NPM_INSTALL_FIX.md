# Server npm Install Fix

## Problem
Server is still seeing old `eslint-config-next@16.1.1` instead of `eslint-config-next@14.2.5`

## Solution - Complete Clean Install

Run these commands on the CloudPanel server:

```bash
cd /home/admin_2026_rhcsolutions_com/htdocs/2026.rhcsolutions.com

# 1. Verify you're in the right directory
pwd
cat package.json | grep eslint-config-next

# 2. Pull latest code
git pull origin master

# 3. Verify you have the correct version now
cat package.json | grep eslint-config-next
# Should show: "eslint-config-next": "14.2.5",

# 4. If still showing 16.1.1, do a hard reset
git reset --hard HEAD
git pull origin master

# 5. Complete clean install
rm -rf node_modules package-lock.json

# 6. Install with --legacy-peer-deps (for compatibility)
npm install --legacy-peer-deps

# 7. Build
npm run build

# 8. Restart PM2
pm2 restart rhc-2026
```

## What's Correct
Local package.json has:
- `"eslint-config-next": "14.2.5"` ✅
- `"eslint": "^8.57.1"` ✅
- `"next": "14.2.5"` ✅

These versions are compatible and have been tested.

## Why --legacy-peer-deps?
Next.js 14 has loose peer dependency constraints. This flag allows npm to install compatible versions without treating minor peer dependency mismatches as errors.

## If Still Failing
If you still see `eslint-config-next@16.1.1` after pull:
```bash
# Force update package-lock.json
npm install --package-lock-only --legacy-peer-deps
npm install --legacy-peer-deps
```
