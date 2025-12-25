'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { FaBars, FaTimes, FaChevronDown } from 'react-icons/fa';

const BOOKING_URL = "https://outlook.office.com/bookwithme/user/3b3090bb02994e5085e163adf76b191b@rhcsolutions.com/meetingtype/pJ4cLjK2VUKjf_7-AdLjwg2?anonymous&ep=mlink";

import { SiteSettings } from '@/lib/cms/database';

interface HeaderProps {
  settings?: SiteSettings;
}

export default function Header({ settings }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const pathname = usePathname();

  // Typography scale state
  const [typeScale, setTypeScale] = useState<number>(1);

  useEffect(() => {
    try {
      const stored = typeof window !== 'undefined' ? localStorage.getItem('typeScale') : null;
      const parsed = stored ? Number(stored) : null;
      const initial = parsed && !Number.isNaN(parsed) ? parsed : 1;
      setTypeScale(initial);
      if (typeof document !== 'undefined') {
        document.documentElement.style.setProperty('--type-scale', String(initial));
      }
    } catch (e) {
      // ignore
    }
  }, []);

  const applyTypeScale = (scale: number) => {
    setTypeScale(scale);
    try {
      if (typeof document !== 'undefined') {
        document.documentElement.style.setProperty('--type-scale', String(scale));
      }
      localStorage.setItem('typeScale', String(scale));
    } catch (e) {}
  };

  const siteName = settings?.siteName || "RHC Solutions";
  const tagline = settings?.tagline || "We Just Do IT";
  const navLinks = settings?.navigation || [
    { id: '1', label: 'Home', url: '/' },
    { id: '2', label: 'About', url: '/about-us' },
    {
      id: '3', label: 'Services', url: '/services', children: [
        { label: 'IT Consulting', url: '/services/it-consulting' },
        { label: 'Cloud Infrastructure', url: '/services/cloud-infrastructure' },
        { label: 'Cyber Security', url: '/services/cyber-security' },
        { label: 'Business Continuity', url: '/services/business-continuity' },
        { label: 'Virtual Office Support', url: '/services/virtual-office' },
      ] as any
    }, // Cast to any to avoid type mismatch with differing structure if needed, or refine SiteSettings type
    { id: '4', label: 'Clients', url: '/clients' },
    { id: '5', label: 'Partners', url: '/partners' },
    { id: '6', label: 'Careers', url: '/careers' },
    { id: '7', label: 'Contact', url: '/contact' },
  ];


  return (
    <header
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${isScrolled
        ? 'bg-dark/95 backdrop-blur-md border-b border-dark-border py-2 shadow-[0_4px_20px_rgba(0,217,255,0.1)]'
        : 'bg-dark/80 backdrop-blur-sm py-4'
        }`}
    >
      <nav className="container-custom">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex flex-col items-start group">
            <div className="flex items-center space-x-3">
              <Image
                src="/logo.png"
                alt={`${siteName} Logo`}
                width={40}
                height={40}
                className="transition-transform duration-300 group-hover:scale-110"
              />
              <div className="text-text-primary font-bold text-2xl md:text-3xl transition-all duration-300 font-mono">
                {siteName.split(' ')[0]} <span className="text-gradient group-hover:opacity-80">{siteName.split(' ').slice(1).join(' ')}</span>
              </div>
            </div>
            <div className="text-xs md:text-sm text-accent font-mono mt-1 tracking-wider">
              &gt; {tagline}
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            {navLinks.map((link) => (
              <div key={link.id} className="relative group">
                {link.children && link.children.length > 0 ? (
                  <>
                    <Link
                      href={link.url}
                      className={`flex items-center space-x-1 font-medium transition-colors ${pathname.startsWith(link.url)
                        ? 'text-cyber-blue'
                        : 'text-text-secondary hover:text-cyber-blue'
                        }`}
                    >
                      <span>{link.label}</span>
                      <FaChevronDown className="text-xs" />
                    </Link>
                    <div className="absolute left-0 mt-2 w-64 bg-dark-card border border-dark-border shadow-[0_8px_32px_rgba(0,217,255,0.15)] rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                      <div className="py-2">
                        {link.children?.map((child: any) => (
                          <Link
                            key={child.url}
                            href={child.url}
                            className={`block px-4 py-2 text-sm transition-all duration-300 ${pathname === child.url
                              ? 'bg-gradient-to-r from-cyber-blue to-cyber-cyan text-dark font-bold'
                              : 'text-text-secondary hover:text-cyber-blue hover:bg-dark-lighter hover:pl-6'
                              }`}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <Link
                    href={link.url}
                    className={`font-medium transition-colors relative group/link ${pathname === link.url
                      ? 'text-cyber-blue'
                      : 'text-text-secondary hover:text-cyber-blue'
                      }`}
                  >
                    {link.label}
                    <span className={`absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-accent transition-all duration-300 group-hover/link:w-full ${pathname === link.url ? 'w-full' : ''
                      }`} />
                  </Link>
                )}
              </div>
            ))}
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Book a Meeting
            </a>
            {/* Type scale controls - small / normal / large */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => applyTypeScale(0.9)}
                aria-label="Smaller text"
                className={`px-2 py-1 rounded ${typeScale === 0.9 ? 'bg-dark-lighter' : 'hover:bg-dark-lighter'}`}
              >
                A-
              </button>
              <button
                onClick={() => applyTypeScale(1)}
                aria-label="Normal text"
                className={`px-2 py-1 rounded ${typeScale === 1 ? 'bg-dark-lighter' : 'hover:bg-dark-lighter'}`}
              >
                A
              </button>
              <button
                onClick={() => applyTypeScale(1.1)}
                aria-label="Larger text"
                className={`px-2 py-1 rounded ${typeScale === 1.1 ? 'bg-dark-lighter' : 'hover:bg-dark-lighter'}`}
              >
                A+
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-2xl text-cyber-blue hover:text-cyber-cyan transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-dark-border bg-dark-card/50 rounded-lg p-4">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <div key={link.id}>
                  {link.children && link.children.length > 0 ? (
                    <>
                      <button
                        type="button"
                        onClick={() => setIsServicesOpen(!isServicesOpen)}
                        className="flex items-center justify-between w-full font-medium text-text-secondary hover:text-cyber-blue transition-colors"
                      >
                        <span>{link.label}</span>
                        <FaChevronDown
                          className={`text-xs transition-transform duration-300 ${isServicesOpen ? 'rotate-180' : ''
                            }`}
                        />
                      </button>
                      {isServicesOpen && (
                        <div className="ml-4 mt-2 space-y-2 pl-4 border-l-2 border-cyber-blue/30">
                          {link.children?.map((child: any) => (
                            <Link
                              key={child.url}
                              href={child.url}
                              className="block text-sm text-text-muted hover:text-cyber-cyan transition-colors"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      href={link.url}
                      className="block font-medium text-text-secondary hover:text-cyber-blue transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  )}
                </div>
              ))}
              {/* Mobile type scale controls */}
              <div className="flex items-center justify-center space-x-2 mt-4">
                <button onClick={() => applyTypeScale(0.9)} aria-label="Smaller text" className={`px-3 py-2 rounded ${typeScale === 0.9 ? 'bg-dark-lighter' : 'hover:bg-dark-lighter'}`}>A-</button>
                <button onClick={() => applyTypeScale(1)} aria-label="Normal text" className={`px-3 py-2 rounded ${typeScale === 1 ? 'bg-dark-lighter' : 'hover:bg-dark-lighter'}`}>A</button>
                <button onClick={() => applyTypeScale(1.1)} aria-label="Larger text" className={`px-3 py-2 rounded ${typeScale === 1.1 ? 'bg-dark-lighter' : 'hover:bg-dark-lighter'}`}>A+</button>
              </div>

              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-center mt-4"
              >
                <span>Book a Meeting</span>
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
