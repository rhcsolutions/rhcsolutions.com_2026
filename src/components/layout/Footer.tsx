import Link from 'next/link';
import { FaLinkedin, FaFacebook, FaInstagram, FaPhone, FaEnvelope, FaTelegram, FaWhatsapp } from 'react-icons/fa';

import { SiteSettings } from '@/lib/cms/database';

interface FooterProps {
  settings?: SiteSettings;
}

export default function Footer({ settings }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const siteName = settings?.siteName || "RHC Solutions";
  const tagline = settings?.tagline || "We Just Do IT";
  const contact = settings?.contact;

  // Default fallbacks if no settings or columns
  const footerColumns = settings?.footer?.columns || [
    {
      title: 'Quick Links',
      links: [
        { label: 'Home', url: '/' },
        { label: 'About Us', url: '/about-us' },
        { label: 'Services', url: '/services' },
        { label: 'Careers', url: '/careers' },
        { label: 'Contact', url: '/contact' },
      ]
    },
    {
      title: 'Our Services',
      links: [
        { label: 'Professional Services', url: '/services/professional-services' },
        { label: 'Cloud & Infrastructure', url: '/services/cloud-infrastructure' },
        { label: 'Cyber Security', url: '/services/cyber-security' },
        { label: 'Business Continuity', url: '/services/business-continuity' },
      ]
    }
  ];

  return (
    <footer className="bg-dark-lighter border-t border-dark-border">
      <div className="container-custom py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold mb-4 text-text-primary font-mono">
              {siteName.split(' ')[0]} <span className="text-gradient">{siteName.split(' ').slice(1).join(' ')}</span>
            </h3>
            <p className="text-sm text-cyber-green font-mono mb-3">
              &gt; {tagline}
            </p>
            <p className="text-text-secondary mb-4">
              Since 1994, delivering professional IT consulting and services.
            </p>
          </div>

          {/* Dynamic Columns */}
          {footerColumns.map((col, idx) => (
            <div key={idx}>
              <h4 className="text-lg font-semibold mb-4 text-text-primary">{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.url}>
                    <Link
                      href={link.url}
                      className="text-text-secondary hover:text-cyber-blue transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-text-primary">Contact Us</h4>
            <ul className="space-y-3">
              {contact?.phone && (
                <li className="flex items-center space-x-2">
                  <FaPhone className="text-cyber-blue" />
                  <a href={`tel:${contact.phone}`} className="text-text-secondary hover:text-cyber-blue transition-colors">
                    {contact.phone}
                  </a>
                </li>
              )}
              {contact?.email && (
                <li className="flex items-center space-x-2">
                  <FaEnvelope className="text-cyber-cyan" />
                  <a href={`mailto:${contact.email}`} className="text-text-secondary hover:text-cyber-cyan transition-colors">
                    {contact.email}
                  </a>
                </li>
              )}
              {contact?.telegram && (
                <li className="flex items-center space-x-2">
                  <FaTelegram className="text-cyber-cyan" />
                  <a href={`https://t.me/${contact.telegram.replace('@', '')}`} className="text-text-secondary hover:text-cyber-cyan transition-colors text-sm">
                    {contact.telegram}
                  </a>
                </li>
              )}
            </ul>

            {/* Social Icons */}
            <div className="flex space-x-4 mt-6">
              {settings?.footer?.socialLinks?.map(social => (
                <a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-2xl text-text-secondary hover:text-cyber-blue transition-all duration-300 hover:shadow-[0_0_10px_rgba(0,217,255,0.5)] capitalize"
                  aria-label={social.platform}
                  title={social.platform}
                >
                  {social.platform === 'linkedin' && <FaLinkedin />}
                  {social.platform === 'facebook' && <FaFacebook />}
                  {social.platform === 'instagram' && <FaInstagram />}
                  {social.platform === 'twitter' && <FaTwitter />}
                </a>
              ))}
              {!settings?.footer?.socialLinks && (
                <>
                  <a href="#" className="text-2xl text-text-secondary" aria-label="LinkedIn" title="LinkedIn"><FaLinkedin /></a>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-dark-border">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row justify-between items-center text-text-muted text-sm">
            <p>&copy; {currentYear} {siteName}. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="hover:text-cyber-cyan transition-colors">
                Privacy Policy
              </Link>
              <Link href="/cookies" className="hover:text-cyber-cyan transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Helper to avoid missing import errors if FaTwitter is not imported
import { FaTwitter } from 'react-icons/fa';

