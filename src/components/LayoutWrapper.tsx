'use client';
import { usePathname } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CookieConsent from '@/components/CookieConsent';
import { SiteSettings } from '@/lib/cms/database';
import { useTheme } from '@/lib/useTheme';

interface LayoutWrapperProps {
  children: React.ReactNode;
  settings?: SiteSettings;
}

export default function LayoutWrapper({ children, settings }: LayoutWrapperProps) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');
  useTheme(); // Apply theme CSS variables on client mount

  // Admin routes: no Header/Footer/CookieConsent
  if (isAdminRoute) {
    return <main className="min-h-screen bg-dark">{children}</main>;
  }

  // Regular routes: with Header/Footer/CookieConsent
  return (
    <>
      <Header settings={settings} />
      <main className="min-h-screen bg-dark">
        {children}
      </main>
      <Footer settings={settings} />
      <CookieConsent />
    </>
  );
}
