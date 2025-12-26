import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
// @ts-ignore: allow side-effect import of global CSS without type declarations
import "./globals.css";
import LayoutWrapper from "@/components/LayoutWrapper";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import GoogleTagManager from "@/components/GoogleTagManager";
import SessionProvider from "@/components/auth/SessionProvider";
import fs from 'fs';
import path from 'path';

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

// Fetch settings once for metadata (in a real server component we can just do this)
// Note: importing database here creates file headers during build, which is fine
import { CMSDatabase } from "@/lib/cms/database";
const settings = CMSDatabase.getSettings();

// Read theme JSON to apply fonts and sizes as CSS variables
function readTheme() {
  try {
    const themeFile = path.join(process.cwd(), 'cms-data', 'theme.json');
    if (!fs.existsSync(themeFile)) return null;
    const raw = fs.readFileSync(themeFile, 'utf-8');
    const data = JSON.parse(raw);
    const fonts = data.fonts || {
      primary: 'Inter, system-ui, sans-serif',
      secondary: 'Space Grotesk, system-ui, sans-serif',
      mono: 'JetBrains Mono, Courier New, monospace',
    };
    const fontSizes = data.fontSizes || {
      primary: '16px',
      secondary: '16px',
      mono: '14px',
    };
    return { fonts, fontSizes };
  } catch {
    return null;
  }
}

export const metadata: Metadata = {
  metadataBase: new URL('https://rhcsolutions.com'),
  title: {
    default: `${settings.siteName} - ${settings.tagline}`,
    template: `%s | ${settings.siteName}`
  },
  description: "Since 1994, RHC Solutions provides expert IT consulting, cloud infrastructure, cyber security, business continuity, and professional services. We Just Do IT.",
  keywords: ["IT consulting", "cloud infrastructure", "cyber security", "business continuity", "IT support", "project management", "AWS", "Azure", "GCP"],
  authors: [{ name: settings.siteName }],
  alternates: {
    canonical: settings.siteUrl || 'https://rhcsolutions.com',
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: settings.siteUrl || "https://rhcsolutions.com",
    siteName: settings.siteName,
    title: `${settings.siteName} - ${settings.tagline}`,
    description: "Since 1994, RHC Solutions provides expert IT consulting, cloud infrastructure, cyber security, business continuity, and professional services.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: settings.siteName
      }
    ]
  },
  icons: {
    icon: '/logo.png', // Using logo as favicon
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
  twitter: {
    card: "summary_large_image",
    title: `${settings.siteName} - ${settings.tagline}`,
    description: "Since 1994, RHC Solutions provides expert IT consulting, cloud infrastructure, cyber security, and business continuity services.",
    images: ["/og-image.jpg"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      ['max-snippet']: -1,
      ['max-image-preview']: 'large',
      ['max-video-preview']: -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Re-fetch to ensure fresh data on render if cached
  const currentSettings = CMSDatabase.getSettings();
  const theme = readTheme();
  const primaryPx = theme?.fontSizes?.primary || '16px';
  const scale = (() => {
    const n = parseFloat(primaryPx);
    return isNaN(n) ? 1 : n / 16;
  })();

  const styleVars: React.CSSProperties = {
    ['--type-scale' as any]: String(scale),
    ['--font-primary-family' as any]: theme?.fonts?.primary || 'Inter, system-ui, sans-serif',
    ['--font-secondary-family' as any]: theme?.fonts?.secondary || 'Space Grotesk, system-ui, sans-serif',
    ['--font-mono-family' as any]: theme?.fonts?.mono || 'JetBrains Mono, Courier New, monospace',
    ['--font-primary-size' as any]: theme?.fontSizes?.primary || '16px',
    ['--font-secondary-size' as any]: theme?.fontSizes?.secondary || '16px',
    ['--font-mono-size' as any]: theme?.fontSizes?.mono || '14px',
  };

  return (
    <html lang="en" className="dark">
      <body style={styleVars} className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} font-sans bg-dark text-text-primary antialiased`}>
        {/* Organization & WebSite JSON-LD for SEO/AI crawlers */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: currentSettings.siteName,
              url: currentSettings.siteUrl || 'https://rhcsolutions.com',
              logo: (currentSettings.logo as any) || '/logo.png',
              sameAs: (currentSettings.footer?.socialLinks || []).map((s: any) => s.url),
              contactPoint: currentSettings.contact?.email
                ? [{ '@type': 'ContactPoint', email: currentSettings.contact.email }]
                : undefined,
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: currentSettings.siteName,
              url: currentSettings.siteUrl || 'https://rhcsolutions.com',
              potentialAction: {
                '@type': 'SearchAction',
                target: `${currentSettings.siteUrl || 'https://rhcsolutions.com'}/search?q={search_term_string}`,
                'query-input': 'required name=search_term_string',
              },
            }),
          }}
        />
        <GoogleAnalytics />
        <GoogleTagManager />
        <SessionProvider>
          <LayoutWrapper settings={currentSettings}>
            {children}
          </LayoutWrapper>
        </SessionProvider>
      </body>
    </html>
  );
}
