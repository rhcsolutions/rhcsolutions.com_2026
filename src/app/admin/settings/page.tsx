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
  navigation?: Array<{
    id: string;
    label: string;
    url: string;
    children?: Array<{ label: string; url: string }>;
  }>;
};

type ThemeColors = {
  primary: string;
  primaryDark: string;
  secondary: string;
  accent: string;
  success: string;
  error: string;
  warning: string;
  info: string;
};

type ThemeFonts = {
  primary: string;
  secondary: string;
  mono: string;
};

type Theme = {
  colors: ThemeColors;
  fonts: ThemeFonts;
  borderRadius: string;
  shadowIntensity: "none" | "low" | "medium" | "high";
  updatedAt?: string;
  updatedBy?: string;
};

export default function SettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<Settings | null>(null);
  const [theme, setTheme] = useState<Theme | null>(null);
  const [themeForm, setThemeForm] = useState<Theme | null>(null);

  useEffect(() => {
    fetchSettings();
    fetchTheme();
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
        navigation: (data.navigation || []) as any,
      });
    } catch (e) {
      console.error("Failed to load settings", e);
    } finally {
      setLoading(false);
    }
  };

  const fetchTheme = async () => {
    try {
      const res = await fetch("/api/cms/theme", {
        credentials: "include",
        cache: "no-store",
      });
      if (res.ok) {
        const data = await res.json();
        setTheme(data);
        setThemeForm(data);
      }
    } catch (e) {
      console.error("Failed to load theme", e);
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
        navigation: form.navigation || [],
      };
      const res = await fetch("/api/cms/settings", {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const text = await res.text();
        
        return;
      }
      await fetchSettings();
      
    } catch (e) {
      console.error("Save settings failed", e);
      
    } finally {
      setSaving(false);
    }
  };

  const handleSaveTheme = async () => {
    if (!themeForm) return;
    setSaving(true);
    try {
      const res = await fetch("/api/cms/theme", {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(themeForm),
      });
      if (res.ok) {
        const updated = await res.json();
        setTheme(updated);
        setThemeForm(updated);
        
      } else {
        const msg = await res.text();
        
      }
    } catch (e) {
      console.error("Save theme failed", e);
      
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
      <div id="theme-settings" className="card-cyber p-8 mb-8">
        <div className="flex items-center space-x-3 mb-6">
          <FaPalette className="text-3xl text-cyber-purple" />
          <h2 className="text-xl font-bold text-text-primary">Theme Settings</h2>
        </div>

        {themeForm && (
          <div className="space-y-8">
            {/* Colors Section */}
            <div>
              <h3 className="text-lg font-semibold text-text-primary mb-4">Colors</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Primary Color */}
                <div>
                  <label className="block text-text-primary font-medium mb-2">Primary</label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="color"
                      value={themeForm.colors.primary}
                      onChange={(e) => setThemeForm({
                        ...themeForm,
                        colors: { ...themeForm.colors, primary: e.target.value }
                      })}
                      className="w-12 h-12 rounded border-2 border-dark-border cursor-pointer"
                    />
                    <input
                      type="text"
                      value={themeForm.colors.primary}
                      onChange={(e) => setThemeForm({
                        ...themeForm,
                        colors: { ...themeForm.colors, primary: e.target.value }
                      })}
                      className="flex-1 bg-dark-card border-2 border-dark-border rounded py-2 px-3 text-text-primary text-sm
                               focus:border-cyber-purple focus:outline-none"
                      placeholder="#hex"
                    />
                  </div>
                </div>

                {/* Primary Dark Color */}
                <div>
                  <label className="block text-text-primary font-medium mb-2">Primary Dark</label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="color"
                      value={themeForm.colors.primaryDark}
                      onChange={(e) => setThemeForm({
                        ...themeForm,
                        colors: { ...themeForm.colors, primaryDark: e.target.value }
                      })}
                      className="w-12 h-12 rounded border-2 border-dark-border cursor-pointer"
                    />
                    <input
                      type="text"
                      value={themeForm.colors.primaryDark}
                      onChange={(e) => setThemeForm({
                        ...themeForm,
                        colors: { ...themeForm.colors, primaryDark: e.target.value }
                      })}
                      className="flex-1 bg-dark-card border-2 border-dark-border rounded py-2 px-3 text-text-primary text-sm
                               focus:border-cyber-purple focus:outline-none"
                      placeholder="#hex"
                    />
                  </div>
                </div>

                {/* Secondary Color */}
                <div>
                  <label className="block text-text-primary font-medium mb-2">Secondary</label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="color"
                      value={themeForm.colors.secondary}
                      onChange={(e) => setThemeForm({
                        ...themeForm,
                        colors: { ...themeForm.colors, secondary: e.target.value }
                      })}
                      className="w-12 h-12 rounded border-2 border-dark-border cursor-pointer"
                    />
                    <input
                      type="text"
                      value={themeForm.colors.secondary}
                      onChange={(e) => setThemeForm({
                        ...themeForm,
                        colors: { ...themeForm.colors, secondary: e.target.value }
                      })}
                      className="flex-1 bg-dark-card border-2 border-dark-border rounded py-2 px-3 text-text-primary text-sm
                               focus:border-cyber-purple focus:outline-none"
                      placeholder="#hex"
                    />
                  </div>
                </div>

                {/* Accent Color */}
                <div>
                  <label className="block text-text-primary font-medium mb-2">Accent</label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="color"
                      value={themeForm.colors.accent}
                      onChange={(e) => setThemeForm({
                        ...themeForm,
                        colors: { ...themeForm.colors, accent: e.target.value }
                      })}
                      className="w-12 h-12 rounded border-2 border-dark-border cursor-pointer"
                    />
                    <input
                      type="text"
                      value={themeForm.colors.accent}
                      onChange={(e) => setThemeForm({
                        ...themeForm,
                        colors: { ...themeForm.colors, accent: e.target.value }
                      })}
                      className="flex-1 bg-dark-card border-2 border-dark-border rounded py-2 px-3 text-text-primary text-sm
                               focus:border-cyber-purple focus:outline-none"
                      placeholder="#hex"
                    />
                  </div>
                </div>

                {/* Success Color */}
                <div>
                  <label className="block text-text-primary font-medium mb-2">Success</label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="color"
                      value={themeForm.colors.success}
                      onChange={(e) => setThemeForm({
                        ...themeForm,
                        colors: { ...themeForm.colors, success: e.target.value }
                      })}
                      className="w-12 h-12 rounded border-2 border-dark-border cursor-pointer"
                    />
                    <input
                      type="text"
                      value={themeForm.colors.success}
                      onChange={(e) => setThemeForm({
                        ...themeForm,
                        colors: { ...themeForm.colors, success: e.target.value }
                      })}
                      className="flex-1 bg-dark-card border-2 border-dark-border rounded py-2 px-3 text-text-primary text-sm
                               focus:border-cyber-purple focus:outline-none"
                      placeholder="#hex"
                    />
                  </div>
                </div>

                {/* Error Color */}
                <div>
                  <label className="block text-text-primary font-medium mb-2">Error</label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="color"
                      value={themeForm.colors.error}
                      onChange={(e) => setThemeForm({
                        ...themeForm,
                        colors: { ...themeForm.colors, error: e.target.value }
                      })}
                      className="w-12 h-12 rounded border-2 border-dark-border cursor-pointer"
                    />
                    <input
                      type="text"
                      value={themeForm.colors.error}
                      onChange={(e) => setThemeForm({
                        ...themeForm,
                        colors: { ...themeForm.colors, error: e.target.value }
                      })}
                      className="flex-1 bg-dark-card border-2 border-dark-border rounded py-2 px-3 text-text-primary text-sm
                               focus:border-cyber-purple focus:outline-none"
                      placeholder="#hex"
                    />
                  </div>
                </div>

                {/* Warning Color */}
                <div>
                  <label className="block text-text-primary font-medium mb-2">Warning</label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="color"
                      value={themeForm.colors.warning}
                      onChange={(e) => setThemeForm({
                        ...themeForm,
                        colors: { ...themeForm.colors, warning: e.target.value }
                      })}
                      className="w-12 h-12 rounded border-2 border-dark-border cursor-pointer"
                    />
                    <input
                      type="text"
                      value={themeForm.colors.warning}
                      onChange={(e) => setThemeForm({
                        ...themeForm,
                        colors: { ...themeForm.colors, warning: e.target.value }
                      })}
                      className="flex-1 bg-dark-card border-2 border-dark-border rounded py-2 px-3 text-text-primary text-sm
                               focus:border-cyber-purple focus:outline-none"
                      placeholder="#hex"
                    />
                  </div>
                </div>

                {/* Info Color */}
                <div>
                  <label className="block text-text-primary font-medium mb-2">Info</label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="color"
                      value={themeForm.colors.info}
                      onChange={(e) => setThemeForm({
                        ...themeForm,
                        colors: { ...themeForm.colors, info: e.target.value }
                      })}
                      className="w-12 h-12 rounded border-2 border-dark-border cursor-pointer"
                    />
                    <input
                      type="text"
                      value={themeForm.colors.info}
                      onChange={(e) => setThemeForm({
                        ...themeForm,
                        colors: { ...themeForm.colors, info: e.target.value }
                      })}
                      className="flex-1 bg-dark-card border-2 border-dark-border rounded py-2 px-3 text-text-primary text-sm
                               focus:border-cyber-purple focus:outline-none"
                      placeholder="#hex"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Fonts Section */}
            <div>
              <h3 className="text-lg font-semibold text-text-primary mb-4">Fonts</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Primary Font */}
                <div>
                  <label className="block text-text-primary font-medium mb-2">Primary Font</label>
                  <input
                    type="text"
                    value={themeForm.fonts.primary}
                    onChange={(e) => setThemeForm({
                      ...themeForm,
                      fonts: { ...themeForm.fonts, primary: e.target.value }
                    })}
                    className="w-full bg-dark-card border-2 border-dark-border rounded py-2 px-3 text-text-primary
                             focus:border-cyber-purple focus:outline-none mb-2"
                    placeholder="e.g., Inter, sans-serif"
                  />
                  <div 
                    className="p-3 bg-dark-card border border-dark-border rounded text-text-primary"
                    style={{ fontFamily: themeForm.fonts.primary }}
                  >
                    The quick brown fox jumps over the lazy dog
                  </div>
                </div>

                {/* Secondary Font */}
                <div>
                  <label className="block text-text-primary font-medium mb-2">Secondary Font</label>
                  <input
                    type="text"
                    value={themeForm.fonts.secondary}
                    onChange={(e) => setThemeForm({
                      ...themeForm,
                      fonts: { ...themeForm.fonts, secondary: e.target.value }
                    })}
                    className="w-full bg-dark-card border-2 border-dark-border rounded py-2 px-3 text-text-primary
                             focus:border-cyber-purple focus:outline-none mb-2"
                    placeholder="e.g., Roboto, sans-serif"
                  />
                  <div 
                    className="p-3 bg-dark-card border border-dark-border rounded text-text-primary"
                    style={{ fontFamily: themeForm.fonts.secondary }}
                  >
                    The quick brown fox jumps over the lazy dog
                  </div>
                </div>

                {/* Mono Font */}
                <div>
                  <label className="block text-text-primary font-medium mb-2">Mono Font</label>
                  <input
                    type="text"
                    value={themeForm.fonts.mono}
                    onChange={(e) => setThemeForm({
                      ...themeForm,
                      fonts: { ...themeForm.fonts, mono: e.target.value }
                    })}
                    className="w-full bg-dark-card border-2 border-dark-border rounded py-2 px-3 text-text-primary
                             focus:border-cyber-purple focus:outline-none mb-2"
                    placeholder="e.g., Fira Code, monospace"
                  />
                  <div 
                    className="p-3 bg-dark-card border border-dark-border rounded text-text-primary"
                    style={{ fontFamily: themeForm.fonts.mono }}
                  >
                    The quick brown fox jumps over the lazy dog
                  </div>
                </div>
              </div>
            </div>

            {/* Sizes Section */}
            <div>
              <h3 className="text-lg font-semibold text-text-primary mb-4">Sizes & Effects</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Border Radius */}
                <div>
                  <label className="block text-text-primary font-medium mb-2">Border Radius</label>
                  <input
                    type="text"
                    value={themeForm.borderRadius}
                    onChange={(e) => setThemeForm({
                      ...themeForm,
                      borderRadius: e.target.value
                    })}
                    className="w-full bg-dark-card border-2 border-dark-border rounded py-2 px-3 text-text-primary
                             focus:border-cyber-purple focus:outline-none"
                    placeholder="e.g., 0.5rem or 8px"
                  />
                  <p className="text-sm text-text-secondary mt-1">Controls corner roundness of elements</p>
                </div>

                {/* Shadow Intensity */}
                <div>
                  <label className="block text-text-primary font-medium mb-2">Shadow Intensity</label>
                  <select
                    value={themeForm.shadowIntensity}
                    onChange={(e) => setThemeForm({
                      ...themeForm,
                      shadowIntensity: e.target.value as 'none' | 'low' | 'medium' | 'high'
                    })}
                    className="w-full bg-dark-card border-2 border-dark-border rounded py-2 px-3 text-text-primary
                             focus:border-cyber-purple focus:outline-none"
                  >
                    <option value="none">None</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                  <p className="text-sm text-text-secondary mt-1">Controls depth and shadow effects</p>
                </div>
              </div>
            </div>

            {/* Save Theme Button */}
            <div className="flex justify-end pt-4 border-t border-dark-border">
              <button
                type="button"
                onClick={handleSaveTheme}
                disabled={saving}
                className="btn-primary px-6 py-2"
              >
                {saving ? "Saving..." : "Save Theme"}
              </button>
            </div>
          </div>
        )}

        {!themeForm && (
          <div className="text-center text-text-secondary py-8">
            Loading theme settings...
          </div>
        )}
      </div>

      {/* Top Navigation Management */}
      <div className="card-cyber p-8 mb-8">
        <div className="flex items-center space-x-3 mb-6">
          <FaShieldAlt className="text-3xl text-cyber-green" />
          <h2 className="text-xl font-bold text-text-primary">Top Navigation</h2>
        </div>
        <p className="text-text-secondary mb-4">Add, remove, or edit menu items shown in the header. Manage Services submenu entries like CIOaaS/CISOaaS.</p>

        <div className="space-y-6">
          {(form.navigation || []).map((item, idx) => (
            <div key={item.id || idx} className="bg-dark-card border border-dark-border rounded-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm text-text-primary mb-1">Label</label>
                  <input
                    type="text"
                    value={item.label}
                    onChange={(e) => {
                      const nav = [...(form.navigation || [])];
                      nav[idx] = { ...item, label: e.target.value };
                      setForm({ ...(form as any), navigation: nav });
                    }}
                    className="w-full bg-dark-card border border-dark-border rounded px-3 py-2 text-text-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm text-text-primary mb-1">URL</label>
                  <input
                    type="text"
                    value={item.url}
                    onChange={(e) => {
                      const nav = [...(form.navigation || [])];
                      nav[idx] = { ...item, url: e.target.value };
                      setForm({ ...(form as any), navigation: nav });
                    }}
                    placeholder="/services"
                    className="w-full bg-dark-card border border-dark-border rounded px-3 py-2 text-text-primary"
                  />
                </div>
                <div className="flex items-end justify-between">
                  <button
                    className="btn-secondary"
                    onClick={() => {
                      const nav = (form.navigation || []).filter((_, i) => i !== idx);
                      setForm({ ...(form as any), navigation: nav });
                    }}
                  >
                    Remove Item
                  </button>
                  <div className="flex gap-2">
                    <button
                      className="px-3 py-2 rounded bg-dark-lighter hover:bg-dark border border-dark-border text-sm"
                      onClick={() => {
                        const nav = [...(form.navigation || [])];
                        if (idx > 0) {
                          const it = nav.splice(idx, 1)[0];
                          nav.splice(idx - 1, 0, it);
                          setForm({ ...(form as any), navigation: nav });
                        }
                      }}
                    >
                      Move Up
                    </button>
                    <button
                      className="px-3 py-2 rounded bg-dark-lighter hover:bg-dark border border-dark-border text-sm"
                      onClick={() => {
                        const nav = [...(form.navigation || [])];
                        if (idx < nav.length - 1) {
                          const it = nav.splice(idx, 1)[0];
                          nav.splice(idx + 1, 0, it);
                          setForm({ ...(form as any), navigation: nav });
                        }
                      }}
                    >
                      Move Down
                    </button>
                    <button
                      className="px-3 py-2 rounded bg-dark-lighter hover:bg-dark border border-dark-border text-sm"
                      onClick={() => {
                        const nav = [...(form.navigation || [])];
                        const it = nav.splice(idx, 1)[0];
                        nav.unshift(it);
                        setForm({ ...(form as any), navigation: nav });
                      }}
                    >
                      Move First
                    </button>
                    <button
                      className="px-3 py-2 rounded bg-dark-lighter hover:bg-dark border border-dark-border text-sm"
                      onClick={() => {
                        const nav = [...(form.navigation || [])];
                        const it = nav.splice(idx, 1)[0];
                        nav.push(it);
                        setForm({ ...(form as any), navigation: nav });
                      }}
                    >
                      Move Last
                    </button>
                  </div>
                </div>
              </div>

              {/* Children (submenu) */}
              <div className="mt-4">
                <div className="text-sm text-text-secondary mb-2">Submenu Items</div>
                {(item.children || []).map((child, cidx) => (
                  <div key={child.url + cidx} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2">
                    <input
                      type="text"
                      value={child.label}
                      onChange={(e) => {
                        const nav = [...(form.navigation || [])];
                        const children = [...(item.children || [])];
                        children[cidx] = { ...child, label: e.target.value };
                        nav[idx] = { ...item, children };
                        setForm({ ...(form as any), navigation: nav });
                      }}
                      placeholder="Label"
                      className="w-full bg-dark-card border border-dark-border rounded px-3 py-2 text-text-primary"
                    />
                    <input
                      type="text"
                      value={child.url}
                      onChange={(e) => {
                        const nav = [...(form.navigation || [])];
                        const children = [...(item.children || [])];
                        children[cidx] = { ...child, url: e.target.value };
                        nav[idx] = { ...item, children };
                        setForm({ ...(form as any), navigation: nav });
                      }}
                      placeholder="/services/cioaas"
                      className="w-full bg-dark-card border border-dark-border rounded px-3 py-2 text-text-primary"
                    />
                    <div className="flex items-center">
                      <button
                        className="text-cyber-red hover:bg-cyber-red/20 px-3 py-2 rounded"
                        onClick={() => {
                          const nav = [...(form.navigation || [])];
                          const children = (item.children || []).filter((_, i) => i !== cidx);
                          nav[idx] = { ...item, children };
                          setForm({ ...(form as any), navigation: nav });
                        }}
                      >
                        Remove
                      </button>
                      <button
                        className="ml-2 px-3 py-2 rounded bg-dark-lighter hover:bg-dark border border-dark-border text-sm"
                        onClick={() => {
                          const nav = [...(form.navigation || [])];
                          const children = [...(item.children || [])];
                          if (cidx > 0) {
                            const it = children.splice(cidx, 1)[0];
                            children.splice(cidx - 1, 0, it);
                            nav[idx] = { ...item, children };
                            setForm({ ...(form as any), navigation: nav });
                          }
                        }}
                      >
                        Up
                      </button>
                      <button
                        className="ml-2 px-3 py-2 rounded bg-dark-lighter hover:bg-dark border border-dark-border text-sm"
                        onClick={() => {
                          const nav = [...(form.navigation || [])];
                          const children = [...(item.children || [])];
                          if (cidx < children.length - 1) {
                            const it = children.splice(cidx, 1)[0];
                            children.splice(cidx + 1, 0, it);
                            nav[idx] = { ...item, children };
                            setForm({ ...(form as any), navigation: nav });
                          }
                        }}
                      >
                        Down
                      </button>
                    </div>
                  </div>
                ))}

                <div className="flex flex-wrap gap-2 mt-2">
                  <button
                    className="btn-secondary"
                    onClick={() => {
                      const nav = [...(form.navigation || [])];
                      const children = [...(item.children || [])];
                      children.push({ label: 'CIOaaS', url: '/services/cioaas' });
                      nav[idx] = { ...item, children };
                      setForm({ ...(form as any), navigation: nav });
                    }}
                  >
                    Add CIOaaS
                  </button>
                  <button
                    className="btn-secondary"
                    onClick={() => {
                      const nav = [...(form.navigation || [])];
                      const children = [...(item.children || [])];
                      children.push({ label: 'CISOaaS', url: '/services/cisoaas' });
                      nav[idx] = { ...item, children };
                      setForm({ ...(form as any), navigation: nav });
                    }}
                  >
                    Add CISOaaS
                  </button>
                  <button
                    className="btn-secondary"
                    onClick={() => {
                      const nav = [...(form.navigation || [])];
                      const children = [...(item.children || [])];
                      children.push({ label: 'IT Consulting', url: '/services/it-consulting' });
                      nav[idx] = { ...item, children };
                      setForm({ ...(form as any), navigation: nav });
                    }}
                  >
                    Add IT Consulting
                  </button>
                  <button
                    className="btn-secondary"
                    onClick={() => {
                      const nav = [...(form.navigation || [])];
                      const children = [...(item.children || [])];
                      children.push({ label: 'Virtual Office', url: '/services/virtual-office' });
                      nav[idx] = { ...item, children };
                      setForm({ ...(form as any), navigation: nav });
                    }}
                  >
                    Add Virtual Office
                  </button>
                  <button
                    className="btn-secondary"
                    onClick={() => {
                      const nav = [...(form.navigation || [])];
                      const children = [...(item.children || [])];
                      children.push({ label: 'New Item', url: '/' });
                      nav[idx] = { ...item, children };
                      setForm({ ...(form as any), navigation: nav });
                    }}
                  >
                    Add Custom
                  </button>
                </div>
              </div>
            </div>
          ))}

          <div className="flex items-center gap-2">
            <button
              className="btn-secondary"
              onClick={() => {
                const nav = [...(form.navigation || [])];
                nav.push({ id: Date.now().toString(), label: 'New', url: '/', children: [] });
                setForm({ ...(form as any), navigation: nav });
              }}
            >
              Add Top Item
            </button>
            <button onClick={handleSave} className="btn-primary">Save Navigation</button>
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
