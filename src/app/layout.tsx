import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
// @ts-ignore: allow side-effect import of global CSS without type declarations
import "./globals.css";
import LayoutWrapper from "@/components/LayoutWrapper";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import GoogleTagManager from "@/components/GoogleTagManager";
import SessionProvider from "@/components/auth/SessionProvider";
import JsonLd from "@/components/JsonLd";

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

export const metadata: Metadata = {
  metadataBase: new URL('https://rhcsolutions.com'),
  title: {
    default: `${settings.siteName} - ${settings.tagline}`,
    template: `%s | ${settings.siteName}`
  },
  description: "Since 1994, RHC Solutions provides expert IT consulting, cloud infrastructure, cyber security, business continuity, and professional services. We Just Do IT.",
  keywords: ["IT consulting", "cloud infrastructure", "cyber security", "business continuity", "IT support", "project management", "AWS", "Azure", "GCP"],
  authors: [{ name: settings.siteName }],
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
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Re-fetch to ensure fresh data on render if cached
  const currentSettings = CMSDatabase.getSettings();

  return (
    <html lang="en" className="dark">
      <body className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} font-sans bg-dark text-text-primary antialiased`}>
        <GoogleAnalytics />
        <GoogleTagManager />
        <SessionProvider>
          <JsonLd settings={currentSettings} />
          <LayoutWrapper settings={currentSettings}>
            {children}
          </LayoutWrapper>
        </SessionProvider>
      </body>
    </html>
  );
}
