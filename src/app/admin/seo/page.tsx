'use client';
import AdminShell from '@/components/admin/AdminShell';
import { FaSearch, FaRobot, FaSitemap, FaGoogle } from 'react-icons/fa';

export default function SEOManagement() {
  return (
    <AdminShell title="SEO Management">
      <div className="mb-8">
        <h1 className="heading-xl text-gradient mb-2">SEO Settings</h1>
        <p className="text-text-secondary">Optimize your website for search engines</p>
      </div>

      {/* Global SEO Settings */}
      <div className="card-cyber p-8 mb-8">
        <h2 className="heading-md text-gradient mb-6">Global SEO Settings</h2>
        <div className="space-y-6">
          <div>
            <label className="block text-text-primary font-semibold mb-2">Site Title</label>
            <input
              type="text"
              defaultValue="RHC Solutions - Professional IT Consulting Since 1994"
              className="w-full bg-dark-card border-2 border-dark-border rounded-lg py-3 px-4 text-text-primary 
                       focus:border-cyber-green focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-text-primary font-semibold mb-2">Meta Description</label>
            <textarea
              rows={3}
              defaultValue="Expert IT consulting and professional services. Cloud infrastructure, cyber security, business continuity, and virtual office support since 1994."
              className="w-full bg-dark-card border-2 border-dark-border rounded-lg py-3 px-4 text-text-primary 
                       focus:border-cyber-green focus:outline-none"
            />
            <p className="text-text-muted text-sm mt-2">Recommended: 150-160 characters</p>
          </div>

          <div>
            <label className="block text-text-primary font-semibold mb-2">Keywords</label>
            <input
              type="text"
              defaultValue="IT consulting, cyber security, cloud infrastructure, professional services"
              className="w-full bg-dark-card border-2 border-dark-border rounded-lg py-3 px-4 text-text-primary 
                       focus:border-cyber-green focus:outline-none"
            />
            <p className="text-text-muted text-sm mt-2">Comma-separated keywords</p>
          </div>
        </div>
      </div>

      {/* Social Media & Open Graph */}
      <div className="card-cyber p-8 mb-8">
        <h2 className="heading-md text-gradient mb-6">Social Media (Open Graph)</h2>
        <div className="space-y-6">
          <div>
            <label className="block text-text-primary font-semibold mb-2">OG Title</label>
            <input
              type="text"
              defaultValue="RHC Solutions | Professional IT Consulting"
              className="w-full bg-dark-card border-2 border-dark-border rounded-lg py-3 px-4 text-text-primary 
                       focus:border-cyber-cyan focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-text-primary font-semibold mb-2">OG Description</label>
            <textarea
              rows={2}
              defaultValue="We Just Do IT - Professional IT consulting services since 1994. Cloud, security, and business continuity solutions."
              className="w-full bg-dark-card border-2 border-dark-border rounded-lg py-3 px-4 text-text-primary 
                       focus:border-cyber-cyan focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-text-primary font-semibold mb-2">OG Image URL</label>
            <input
              type="text"
              defaultValue="/logo.png"
              className="w-full bg-dark-card border-2 border-dark-border rounded-lg py-3 px-4 text-text-primary 
                       focus:border-cyber-cyan focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Technical SEO */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="card-cyber p-6">
          <div className="flex items-center space-x-3 mb-4">
            <FaRobot className="text-3xl text-cyber-green" />
            <h3 className="text-xl font-bold text-text-primary">Robots.txt</h3>
          </div>
          <p className="text-text-secondary text-sm mb-4">Configure search engine crawling rules</p>
          <a href="/robots.txt" target="_blank" className="btn-secondary py-2 px-4 inline-block">
            View robots.txt
          </a>
        </div>

        <div className="card-cyber p-6">
          <div className="flex items-center space-x-3 mb-4">
            <FaSitemap className="text-3xl text-cyber-cyan" />
            <h3 className="text-xl font-bold text-text-primary">XML Sitemap</h3>
          </div>
          <p className="text-text-secondary text-sm mb-4">Auto-generated sitemap for search engines</p>
          <a href="/sitemap.xml" target="_blank" className="btn-secondary py-2 px-4 inline-block">
            View sitemap.xml
          </a>
        </div>
      </div>

      {/* Google Integration */}
      <div className="card-cyber p-8">
        <div className="flex items-start space-x-4 mb-6">
          <FaGoogle className="text-4xl text-cyber-blue flex-shrink-0 mt-1" />
          <div>
            <h2 className="text-xl font-bold text-text-primary mb-2">Google Services</h2>
            <p className="text-text-secondary">Integration with Google Search Console and Analytics</p>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-text-primary font-semibold mb-2">Google Tag Manager ID</label>
            <input
              type="text"
              defaultValue={process.env.NEXT_PUBLIC_GTM_ID || 'GTM-XXXXXXX'}
              className="w-full bg-dark-card border-2 border-dark-border rounded-lg py-3 px-4 text-text-primary font-mono
                       focus:border-cyber-blue focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-text-primary font-semibold mb-2">Google Analytics 4 ID</label>
            <input
              type="text"
              defaultValue={process.env.NEXT_PUBLIC_GA4_ID || 'G-XXXXXXXXXX'}
              className="w-full bg-dark-card border-2 border-dark-border rounded-lg py-3 px-4 text-text-primary font-mono
                       focus:border-cyber-blue focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-text-primary font-semibold mb-2">Google Search Console Verification</label>
            <input
              type="text"
              placeholder="google-site-verification=xxxxx"
              className="w-full bg-dark-card border-2 border-dark-border rounded-lg py-3 px-4 text-text-primary font-mono
                       focus:border-cyber-blue focus:outline-none"
            />
          </div>

          <div className="flex space-x-4">
            <a 
              href="https://search.google.com/search-console" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-secondary py-2 px-6 flex items-center space-x-2"
            >
              <FaSearch />
              <span>Open Search Console</span>
            </a>
            <a 
              href="https://analytics.google.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-secondary py-2 px-6 flex items-center space-x-2"
            >
              <FaGoogle />
              <span>Open Analytics</span>
            </a>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="mt-8 flex justify-end">
        <button className="btn-primary px-8 py-3">Save SEO Settings</button>
      </div>
    </AdminShell>
  );
}
