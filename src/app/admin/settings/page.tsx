"use client";
import { useEffect, useState } from "react";
import AdminShell from "@/components/admin/AdminShell";
import { FaCog, FaEnvelope, FaGlobe, FaPalette, FaShieldAlt } from "react-icons/fa";

type SocialLink = { platform: string; url: string };
type Settings = {
  siteName: string;
  tagline: string;
  siteUrl?: string;
  contact: {
    email?: string;
    phone?: string;
    address?: string;
    telegram?: string;
  };
  footer?: {
    socialLinks?: SocialLink[];
  };
};

export default function SettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<Settings | null>(null);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch("/api/cms/settings", {
        credentials: "include",
        cache: "no-store",
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      const social = (data.footer?.socialLinks || []) as SocialLink[];
      setForm({
        siteName: data.siteName || "",
        tagline: data.tagline || "",
        siteUrl: data.siteUrl || "https://rhcsolutions.com",
        contact: {
          email: data.contact?.email || "",
          phone: data.contact?.phone || "",
          address: data.contact?.address || "",
          telegram: data.contact?.telegram || "",
        },
        footer: {
          socialLinks: social,
        },
      });
    } catch (e) {
      console.error("Failed to load settings", e);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!form) return;
    setSaving(true);
    try {
      const payload = {
        siteName: form.siteName,
        tagline: form.tagline,
        siteUrl: form.siteUrl,
        contact: {
          email: form.contact?.email,
          phone: form.contact?.phone,
          address: form.contact?.address,
          telegram: form.contact?.telegram,
        },
        footer: {
          socialLinks: form.footer?.socialLinks || [],
        },
      };
      const res = await fetch("/api/cms/settings", {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const text = await res.text();
        alert(`Save failed: ${text || res.status}`);
        return;
      }
      await fetchSettings();
      alert("✓ Settings saved");
    } catch (e) {
      console.error("Save settings failed", e);
      alert("Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  const resetChanges = () => {
    fetchSettings();
  };

  if (loading || !form) {
    return (
      <AdminShell title="Settings">
        <div className="p-8 text-text-secondary">Loading settings...</div>
      </AdminShell>
    );
  }

  return (
    <AdminShell title="Settings">
      <div className="mb-8">
        <h1 className="heading-xl text-gradient mb-2">Site Settings</h1>
        <p className="text-text-secondary">Configure your website settings and preferences</p>
      </div>

      {/* General Settings */}
      <div className="card-cyber p-8 mb-8">
        <div className="flex items-center space-x-3 mb-6">
          <FaCog className="text-3xl text-cyber-green" />
          <h2 className="text-xl font-bold text-text-primary">General Settings</h2>
        </div>
        <div className="space-y-6">
          <div>
            <label className="block text-text-primary font-semibold mb-2">Site Name</label>
            <input
              type="text"
              value={form.siteName}
              onChange={(e) => setForm({ ...form, siteName: e.target.value })}
              className="w-full bg-dark-card border-2 border-dark-border rounded-lg py-3 px-4 text-text-primary 
                       focus:border-cyber-green focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-text-primary font-semibold mb-2">Tagline</label>
            <input
              type="text"
              value={form.tagline}
              onChange={(e) => setForm({ ...form, tagline: e.target.value })}
              className="w-full bg-dark-card border-2 border-dark-border rounded-lg py-3 px-4 text-text-primary 
                       focus:border-cyber-green focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-text-primary font-semibold mb-2">Site URL</label>
            <input
              type="url"
              value={form.siteUrl || ""}
              onChange={(e) => setForm({ ...form, siteUrl: e.target.value })}
              className="w-full bg-dark-card border-2 border-dark-border rounded-lg py-3 px-4 text-text-primary 
                       focus:border-cyber-green focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-text-primary font-semibold mb-2">Admin Email</label>
            <input
              type="email"
              value={form.contact?.email || ""}
              onChange={(e) => setForm({ ...form, contact: { ...(form.contact || {}), email: e.target.value } })}
              className="w-full bg-dark-card border-2 border-dark-border rounded-lg py-3 px-4 text-text-primary 
                       focus:border-cyber-green focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="card-cyber p-8 mb-8">
        <div className="flex items-center space-x-3 mb-6">
          <FaEnvelope className="text-3xl text-cyber-cyan" />
          <h2 className="text-xl font-bold text-text-primary">Contact Information</h2>
        </div>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-text-primary font-semibold mb-2">Phone Number</label>
              <input
                type="tel"
                value={form.contact?.phone || ""}
                onChange={(e) => setForm({ ...form, contact: { ...(form.contact || {}), phone: e.target.value } })}
                className="w-full bg-dark-card border-2 border-dark-border rounded-lg py-3 px-4 text-text-primary 
                         focus:border-cyber-cyan focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-text-primary font-semibold mb-2">Contact Email</label>
              <input
                type="email"
                value={form.contact?.email || ""}
                onChange={(e) => setForm({ ...form, contact: { ...(form.contact || {}), email: e.target.value } })}
                className="w-full bg-dark-card border-2 border-dark-border rounded-lg py-3 px-4 text-text-primary 
                         focus:border-cyber-cyan focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-text-primary font-semibold mb-2">Business Address</label>
            <textarea
              rows={3}
              value={form.contact?.address || ""}
              onChange={(e) => setForm({ ...form, contact: { ...(form.contact || {}), address: e.target.value } })}
              className="w-full bg-dark-card border-2 border-dark-border rounded-lg py-3 px-4 text-text-primary 
                       focus:border-cyber-cyan focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-text-primary font-semibold mb-2">Telegram Handle</label>
            <input
              type="text"
              placeholder="@yourhandle"
              value={form.contact?.telegram || ""}
              onChange={(e) => setForm({ ...form, contact: { ...(form.contact || {}), telegram: e.target.value } })}
              className="w-full bg-dark-card border-2 border-dark-border rounded-lg py-3 px-4 text-text-primary 
                       focus:border-cyber-cyan focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-text-primary font-semibold mb-2">LinkedIn URL</label>
              <input
                type="url"
                value={(form.footer?.socialLinks || []).find(s => s.platform === 'linkedin')?.url || ""}
                onChange={(e) => {
                  const links = [...(form.footer?.socialLinks || [])];
                  const idx = links.findIndex(l => l.platform === 'linkedin');
                  if (idx >= 0) links[idx] = { platform: 'linkedin', url: e.target.value };
                  else links.push({ platform: 'linkedin', url: e.target.value });
                  setForm({ ...form, footer: { ...(form.footer || {}), socialLinks: links } });
                }}
                className="w-full bg-dark-card border-2 border-dark-border rounded-lg py-3 px-4 text-text-primary 
                         focus:border-cyber-cyan focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-text-primary font-semibold mb-2">Facebook URL</label>
              <input
                type="url"
                value={(form.footer?.socialLinks || []).find(s => s.platform === 'facebook')?.url || ""}
                onChange={(e) => {
                  const links = [...(form.footer?.socialLinks || [])];
                  const idx = links.findIndex(l => l.platform === 'facebook');
                  if (idx >= 0) links[idx] = { platform: 'facebook', url: e.target.value };
                  else links.push({ platform: 'facebook', url: e.target.value });
                  setForm({ ...form, footer: { ...(form.footer || {}), socialLinks: links } });
                }}
                className="w-full bg-dark-card border-2 border-dark-border rounded-lg py-3 px-4 text-text-primary 
                         focus:border-cyber-cyan focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Regional Settings */}
      <div className="card-cyber p-8 mb-8">
        <div className="flex items-center space-x-3 mb-6">
          <FaGlobe className="text-3xl text-cyber-blue" />
          <h2 className="text-xl font-bold text-text-primary">Regional Settings</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-text-primary font-semibold mb-2">Timezone</label>
            <select className="w-full bg-dark-card border-2 border-dark-border rounded-lg py-3 px-4 text-text-primary 
                             focus:border-cyber-blue focus:outline-none">
              <option>America/New_York (EST)</option>
              <option>America/Los_Angeles (PST)</option>
              <option>Europe/London (GMT)</option>
              <option>Asia/Tokyo (JST)</option>
            </select>
          </div>
          <div>
            <label className="block text-text-primary font-semibold mb-2">Date Format</label>
            <select className="w-full bg-dark-card border-2 border-dark-border rounded-lg py-3 px-4 text-text-primary 
                             focus:border-cyber-blue focus:outline-none">
              <option>MM/DD/YYYY</option>
              <option>DD/MM/YYYY</option>
              <option>YYYY-MM-DD</option>
            </select>
          </div>
          <div>
            <label className="block text-text-primary font-semibold mb-2">Language</label>
            <select className="w-full bg-dark-card border-2 border-dark-border rounded-lg py-3 px-4 text-text-primary 
                             focus:border-cyber-blue focus:outline-none">
              <option>English (US)</option>
              <option>English (UK)</option>
              <option>Spanish</option>
              <option>French</option>
            </select>
          </div>
        </div>
      </div>

      {/* Theme Settings */}
      <div className="card-cyber p-8 mb-8">
        <div className="flex items-center space-x-3 mb-6">
          <FaPalette className="text-3xl text-cyber-purple" />
          <h2 className="text-xl font-bold text-text-primary">Theme & Appearance</h2>
        </div>
        <div className="space-y-6">
          <div>
            <label className="block text-text-primary font-semibold mb-2">Current Theme</label>
            <select className="w-full bg-dark-card border-2 border-dark-border rounded-lg py-3 px-4 text-text-primary 
                             focus:border-cyber-purple focus:outline-none">
              <option>Terminal Green (Current)</option>
              <option>Cyber Blue</option>
              <option>Purple Haze</option>
              <option>Matrix</option>
            </select>
          </div>

          <div className="flex items-center space-x-3">
            <input type="checkbox" id="dark-mode" className="w-5 h-5" defaultChecked />
            <label htmlFor="dark-mode" className="text-text-primary">Enable dark mode (recommended)</label>
          </div>

          <div className="flex items-center space-x-3">
            <input type="checkbox" id="animations" className="w-5 h-5" defaultChecked />
            <label htmlFor="animations" className="text-text-primary">Enable page animations</label>
          </div>
        </div>
      </div>

      {/* Security Settings */}
      <div className="card-cyber p-8 mb-8">
        <div className="flex items-center space-x-3 mb-6">
          <FaShieldAlt className="text-3xl text-cyber-red" />
          <h2 className="text-xl font-bold text-text-primary">Security & Maintenance</h2>
        </div>
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <input type="checkbox" id="ssl" className="w-5 h-5" defaultChecked />
            <label htmlFor="ssl" className="text-text-primary">Force HTTPS (SSL)</label>
          </div>
          <div className="flex items-center space-x-3">
            <input type="checkbox" id="two-factor" className="w-5 h-5" defaultChecked />
            <label htmlFor="two-factor" className="text-text-primary">Enable two-factor authentication for admin</label>
          </div>
          <div className="flex items-center space-x-3">
            <input type="checkbox" id="auto-backup" className="w-5 h-5" defaultChecked />
            <label htmlFor="auto-backup" className="text-text-primary">Enable automatic backups</label>
          </div>
          <div className="flex items-center space-x-3">
            <input type="checkbox" id="maintenance" className="w-5 h-5" />
            <label htmlFor="maintenance" className="text-text-primary">Enable maintenance mode</label>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={resetChanges}
          className="btn-secondary px-6 py-3"
        >
          Reset Unsaved Changes
        </button>
        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="btn-primary px-8 py-3"
        >
          {saving ? "Saving..." : "Save All Settings"}
        </button>
      </div>
    </AdminShell>
  );
}
