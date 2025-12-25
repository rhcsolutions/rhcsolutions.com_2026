 'use client';
import { useState, useEffect } from 'react';
import AdminShell from '@/components/admin/AdminShell';
import { FaCookie, FaCheck, FaTimes, FaShieldAlt } from 'react-icons/fa';

export default function CookieSettings() {
  const [settings, setSettings] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchSettings(); }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/cms/settings');
      if (res.ok) setSettings(await res.json());
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  const save = async () => {
    try {
      await fetch('/api/cms/settings', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(settings) });
      alert('Saved');
    } catch (e) { console.error(e); alert('Save failed'); }
  };

  if (loading || !settings) return (
    <AdminShell title="Cookie Settings"><div className="p-6">Loading...</div></AdminShell>
  );

  // ensure cookieConsent object
  settings.cookieConsent = settings.cookieConsent || { bannerMessage: '', position: 'Bottom', style: 'Bar', showBanner: true, categories: {} };

  const update = (patch: any) => setSettings({ ...settings, cookieConsent: { ...settings.cookieConsent, ...patch } });

  return (
    <AdminShell title="Cookie Settings">
      <div className="mb-8">
        <h1 className="heading-xl text-gradient mb-2">GDPR Cookie Management</h1>
        <p className="text-text-secondary">Configure cookie consent and compliance settings</p>
      </div>

      {/* Cookie Banner Settings */}
      <div className="card-cyber p-8 mb-8">
        <div className="flex items-start space-x-4 mb-6">
          <FaCookie className="text-4xl text-cyber-green flex-shrink-0 mt-1" />
          <div>
            <h2 className="text-xl font-bold text-text-primary mb-2">Cookie Consent Banner</h2>
            <p className="text-text-secondary mb-6">Manage how visitors consent to cookies on your website</p>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-text-primary font-semibold mb-2">Banner Message</label>
            <textarea
              rows={3}
              value={settings.cookieConsent.bannerMessage || ''}
              onChange={(e) => update({ bannerMessage: e.target.value })}
              className="w-full bg-dark-card border-2 border-dark-border rounded-lg py-3 px-4 text-text-primary 
                       focus:border-cyber-green focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-text-primary font-semibold mb-2">Banner Position</label>
              <select value={settings.cookieConsent.position} onChange={(e) => update({ position: e.target.value })} className="w-full bg-dark-card border-2 border-dark-border rounded-lg py-3 px-4 text-text-primary 
                               focus:border-cyber-cyan focus:outline-none">
                <option>Bottom</option>
                <option>Top</option>
                <option>Center Modal</option>
              </select>
            </div>
            <div>
              <label className="block text-text-primary font-semibold mb-2">Banner Style</label>
              <select value={settings.cookieConsent.style} onChange={(e) => update({ style: e.target.value })} className="w-full bg-dark-card border-2 border-dark-border rounded-lg py-3 px-4 text-text-primary 
                               focus:border-cyber-cyan focus:outline-none">
                <option>Bar</option>
                <option>Box</option>
                <option>Full Width</option>
              </select>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <input type="checkbox" id="show-banner" className="w-5 h-5" checked={settings.cookieConsent.showBanner} onChange={(e) => update({ showBanner: e.target.checked })} />
            <label htmlFor="show-banner" className="text-text-primary">Display cookie consent banner</label>
          </div>
        </div>
      </div>

      {/* Cookie Categories */}
      <div className="card-cyber p-8 mb-8">
        <h2 className="heading-md text-gradient mb-6">Cookie Categories</h2>
          <div className="space-y-4">
            {[
              { key: 'essential', name: 'Essential Cookies', description: 'Required for basic site functionality', required: true },
              { key: 'analytics', name: 'Analytics Cookies', description: 'Help us understand how visitors interact with the website', required: false },
              { key: 'marketing', name: 'Marketing Cookies', description: 'Used for advertising and retargeting', required: false },
              { key: 'functional', name: 'Functional Cookies', description: 'Remember your preferences and personalize content', required: false },
            ].map((category, idx) => {
              const enabled = settings.cookieConsent.categories[category.key] ?? (category.required ? true : false);
              return (
                <div key={idx} className="flex items-center justify-between p-4 bg-dark-lighter rounded-lg">
                  <div className="flex-1">
                    <h3 className="text-text-primary font-semibold mb-1 flex items-center space-x-2">
                      <span>{category.name}</span>
                      {category.required && (
                        <span className="text-xs px-2 py-1 bg-cyber-red/20 text-cyber-red rounded-full">Required</span>
                      )}
                    </h3>
                    <p className="text-text-secondary text-sm">{category.description}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    {enabled ? (
                      <FaCheck className="text-cyber-green text-xl" />
                    ) : (
                      <FaTimes className="text-cyber-red text-xl" />
                    )}
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" checked={enabled} disabled={category.required} onChange={(e) => setSettings({ ...settings, cookieConsent: { ...settings.cookieConsent, categories: { ...settings.cookieConsent.categories, [category.key]: e.target.checked } } })} />
                      <div className={`w-11 h-6 bg-dark-card rounded-full peer peer-checked:bg-cyber-green transition-colors ${category.required ? 'opacity-50 cursor-not-allowed' : ''}`}>
                        <div className="w-5 h-5 bg-white rounded-full transform transition-transform peer-checked:translate-x-5 translate-x-0.5 translate-y-0.5" />
                      </div>
                    </label>
                  </div>
                </div>
              );
            })}
          </div>
      </div>

      {/* Compliance & Privacy */}
      <div className="card-cyber p-8">
        <div className="flex items-start space-x-4 mb-6">
          <FaShieldAlt className="text-4xl text-cyber-cyan flex-shrink-0 mt-1" />
          <div>
            <h2 className="text-xl font-bold text-text-primary mb-2">Privacy & Compliance</h2>
            <p className="text-text-secondary mb-6">Ensure your website meets GDPR and privacy regulations</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <input type="checkbox" id="gdpr-compliant" className="w-5 h-5" defaultChecked />
            <label htmlFor="gdpr-compliant" className="text-text-primary">Enable GDPR compliance mode</label>
          </div>
          <div className="flex items-center space-x-3">
            <input type="checkbox" id="do-not-track" className="w-5 h-5" defaultChecked />
            <label htmlFor="do-not-track" className="text-text-primary">Respect Do Not Track browser settings</label>
          </div>
          <div className="flex items-center space-x-3">
            <input type="checkbox" id="auto-delete" className="w-5 h-5" />
            <label htmlFor="auto-delete" className="text-text-primary">Automatically delete cookies after 30 days</label>
          </div>
          <div className="flex items-center space-x-3">
            <input type="checkbox" id="consent-log" className="w-5 h-5" defaultChecked />
            <label htmlFor="consent-log" className="text-text-primary">Log consent actions for compliance</label>
          </div>
        </div>

        <div className="mt-6 p-4 bg-dark-lighter rounded-lg border border-cyber-cyan/30">
          <p className="text-sm text-text-secondary">
            <strong className="text-cyber-cyan">Privacy Policy Link:</strong> Make sure your privacy policy is up to date and linked in the cookie banner.
            <a href="/privacy" target="_blank" className="text-cyber-green hover:underline ml-2">View Privacy Policy →</a>
          </p>
        </div>
      </div>

      {/* Save Button */}
      <div className="mt-8 flex justify-end">
        <button onClick={save} className="btn-primary px-8 py-3">Save Cookie Settings</button>
      </div>
    </AdminShell>
  );
}
