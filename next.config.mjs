/** @type {import('next').NextConfig} */
const nextConfig = {
  // NOTE: Static export is DISABLED to enable CMS API routes
  // For production with CMS, deploy to a server environment (Vercel, Railway, etc.)
  // For static-only builds without CMS, uncomment the next two lines:
  // output: 'export',
  // distDir: 'out',
  
  output: 'standalone',

  images: {
    unoptimized: true, // Required for static export, Cloudflare will optimize
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  
  // Performance optimizations
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  
  // Environment variable prefix for client-side access
  env: {
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'https://rhcsolutions.com',
  },
};

export default nextConfig;
