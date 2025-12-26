'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { motion } from 'framer-motion';
import { 
  FaHome, FaFileAlt, FaImages, FaUsers, FaCog, FaChartLine, 
  FaBars, FaTimes, FaSignOutAlt, FaEdit, FaCookie, FaSearch, FaBriefcase, FaPalette
} from 'react-icons/fa';

interface AdminShellProps {
  children: React.ReactNode;
  title: string;
}

export default function AdminShell({ children, title }: AdminShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, status } = useSession();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [themeSaving, setThemeSaving] = useState(false);

  const navigation = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: FaHome },
    { name: 'Analytics', href: '/admin/analytics', icon: FaChartLine },
    { name: 'Pages', href: '/admin/pages', icon: FaFileAlt },
    { name: 'Media', href: '/admin/media', icon: FaImages },
    { name: 'Jobs', href: '/admin/jobs', icon: FaBriefcase },
    { name: 'Forms', href: '/admin/forms', icon: FaEdit },
    { name: 'Users', href: '/admin/users', icon: FaUsers },
    { name: 'SEO', href: '/admin/seo', icon: FaSearch },
    { name: 'Cookie Settings', href: '/admin/cookies', icon: FaCookie },
    { name: 'Theme Settings', href: '/admin/settings#theme-settings', icon: FaPalette },
    { name: 'Settings', href: '/admin/settings', icon: FaCog },
  ];

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/admin/login' });
  };

  return (
    <div className="min-h-screen bg-dark text-text-primary">
      {/* Top Navigation Bar */}
      <nav className="bg-dark-card border-b border-dark-border fixed w-full top-0 z-50">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left side */}
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="hidden lg:block p-2 rounded-lg text-text-secondary hover:text-cyber-green hover:bg-dark-lighter transition-colors"
              >
                <FaBars className="text-xl" />
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg text-text-secondary hover:text-cyber-green hover:bg-dark-lighter transition-colors"
              >
                {mobileMenuOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
              </button>
              <div className="ml-4">
                <h1 className="text-xl font-bold">
                  <span className="text-gradient">RHC</span> Admin
                </h1>
                <p className="text-xs text-text-muted font-mono hidden sm:block">&gt; {title}</p>
              </div>
            </div>

            {/* Right side */}
            <div className="flex items-center space-x-4">
              {session?.user && (
                <div className="hidden md:flex items-center space-x-2 text-sm">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-semibold">
                    {session.user.name?.charAt(0) || 'U'}
                  </div>
                  <div>
                    <p className="text-text-primary font-medium">{session.user.name}</p>
                    <p className="text-text-muted text-xs">{session.user.email}</p>
                  </div>
                </div>
              )}
              <Link
                href="/"
                target="_blank"
                className="text-text-secondary hover:text-cyber-cyan transition-colors text-sm hidden sm:block"
              >
                View Site →
              </Link>
              <select
                onChange={async (e) => {
                  const preset = e.target.value;
                  let theme: any = null;
                  if (preset === 'default') return;
                  if (preset === 'dark') {
                    theme = { colors: { primary: '#00FF41', primaryDark: '#050607', secondary: '#00F0FF', accent: '#00AAFF', success: '#00FF88', error: '#FF4458', warning: '#FFB800', info: '#00F0FF' }, fonts: { primary: 'Inter, system-ui, sans-serif', secondary: 'Space Grotesk, system-ui, sans-serif', mono: 'JetBrains Mono, monospace' }, borderRadius: '0.5rem', shadowIntensity: 'medium' };
                  } else if (preset === 'brand') {
                    theme = { colors: { primary: '#0ea5a2', primaryDark: '#072d2d', secondary: '#7dd3fc', accent: '#06b6d4', success: '#10b981', error: '#ef4444', warning: '#f59e0b', info: '#3b82f6' }, fonts: { primary: 'Inter, system-ui, sans-serif', secondary: 'Space Grotesk, system-ui, sans-serif', mono: 'JetBrains Mono, monospace' }, borderRadius: '0.5rem', shadowIntensity: 'medium' };
                  }
                  if (theme) {
                    setThemeSaving(true);
                    try {
                      const res = await fetch('/api/cms/theme', { method: 'PUT', credentials: 'include', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(theme) });
                      if (res.ok) {
                        alert(`✓ Theme "${preset}" applied successfully!`);
                        console.log(`[AdminShell] Theme preset "${preset}" applied`);
                      } else {
                        const msg = await res.text();
                        console.error(`[AdminShell] Theme apply failed: ${msg || res.status}`);
                        alert(`Failed to apply theme: ${res.status}. Check auth or permissions.`);
                      }
                    } catch (e) {
                      console.error('[AdminShell] Theme apply error:', e);
                      alert('Failed to apply theme. Check browser console.');
                    } finally {
                      setThemeSaving(false);
                    }
                  }
                }}
                disabled={themeSaving}
                className="hidden sm:block bg-dark-card border border-dark-border text-text-secondary rounded px-2 py-1 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <option value="default">{themeSaving ? 'Saving...' : 'Theme'}</option>
                <option value="brand">Brand</option>
                <option value="dark">Dark</option>
              </select>
              <Link
                href="/admin/theme"
                title="Open full theme editor"
                className="hidden sm:block text-text-secondary hover:text-cyber-cyan transition-colors text-sm"
              >
                Edit →
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-dark-lighter hover:bg-cyber-red/20 
                         text-text-secondary hover:text-cyber-red transition-all"
              >
                <FaSignOutAlt />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar - Desktop */}
      <aside
        className={`hidden lg:block fixed left-0 top-16 h-[calc(100vh-4rem)] bg-dark-card border-r border-dark-border 
                   transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-20'} overflow-y-auto`}
      >
        <nav className="p-4 space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-cyber-green to-cyber-cyan text-dark font-bold shadow-glow-cyber-green'
                    : 'text-text-secondary hover:text-cyber-green hover:bg-dark-lighter'
                }`}
              >
                <Icon className="text-xl flex-shrink-0" />
                {sidebarOpen && <span className="whitespace-nowrap">{item.name}</span>}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ x: -300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -300, opacity: 0 }}
          className="lg:hidden fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-dark-card border-r border-dark-border z-40 overflow-y-auto"
        >
          <nav className="p-4 space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-cyber-green to-cyber-cyan text-dark font-bold'
                      : 'text-text-secondary hover:text-cyber-green hover:bg-dark-lighter'
                  }`}
                >
                  <Icon className="text-xl" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </motion.div>
      )}

      {/* Main Content */}
      <main
        className={`pt-16 transition-all duration-300 ${
          sidebarOpen ? 'lg:ml-64' : 'lg:ml-20'
        }`}
      >
        <div className="p-4 sm:p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
