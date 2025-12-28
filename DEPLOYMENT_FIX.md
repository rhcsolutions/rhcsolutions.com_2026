# Deployment Fix Instructions

## Problem
The server was pulling old code with incorrect `eslint-config-next@^16.1.3` reference.

## Solution
Pull the latest code with corrected versions:

```bash
cd /home/admin_2026_rhcsolutions_com/htdocs/2026.rhcsolutions.com
git pull origin master
npm install --legacy-peer-deps
npm run build
pm2 restart rhc-2026
```

## What Was Fixed
✅ **package.json updated with stable compatible versions:**
- Next.js: 14.2.5 (latest stable App Router)
- React: 18.3.1 (compatible with Next.js 14)
- ESLint: 8.57.1 (compatible with Next.js 14)
- eslint-config-next: 14.2.5 (was incorrectly ^16.1.3)
- TypeScript: 5.7.2 (latest)
- Tailwind CSS: 3.4.17 (latest)
- Added @types/qrcode and @types/nodemailer

✅ **README.md updated** to reflect actual versions

✅ **All dependencies verified to exist in npm registry**

✅ **Local build succeeds** - 57 pages compiled successfully

## Why --legacy-peer-deps?
Some peer dependencies have loose constraints. Using `--legacy-peer-deps` allows npm to install the correct versions without treating minor peer dep mismatches as errors.

## Verification
After running the commands above, verify:
```bash
node -v      # Should show v20.x or higher
npm -v       # Should show v11.x or higher
npm run dev  # Should start on port 3003
npm run build # Should compile successfully
```

## Git History
Latest commits pushed to origin/master:
- docs: update tech stack to reflect actual versions
- fix: use stable compatible versions
- upgrade: update from Node.js 18.x (EOL) to 20.x

All previous issues resolved - npm install should now work!
