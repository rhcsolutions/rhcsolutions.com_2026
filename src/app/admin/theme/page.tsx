'use client';
import { useState, useEffect } from 'react';
import AdminShell from '@/components/admin/AdminShell';
import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import { FaPalette, FaSave, FaTimes } from 'react-icons/fa';

const fontOptions = [
  { label: 'Inter, system-ui, sans-serif', value: 'Inter, system-ui, sans-serif' },
  { label: 'Space Grotesk, system-ui, sans-serif', value: 'Space Grotesk, system-ui, sans-serif' },
  { label: 'Roboto, system-ui, sans-serif', value: 'Roboto, system-ui, sans-serif' },
  { label: 'Poppins, system-ui, sans-serif', value: 'Poppins, system-ui, sans-serif' },
  { label: 'Open Sans, system-ui, sans-serif', value: 'Open Sans, system-ui, sans-serif' },
  { label: 'JetBrains Mono, monospace', value: 'JetBrains Mono, monospace' },
  { label: 'Fira Code, monospace', value: 'Fira Code, monospace' },
  { label: 'Source Code Pro, monospace', value: 'Source Code Pro, monospace' },
];

interface ThemeColors {
  primary: string;
  primaryDark: string;
  secondary: string;
  accent: string;
  success: string;
  error: string;
  warning: string;
  info: string;
}

interface ThemeFonts {
  primary: string;
  secondary: string;
  mono: string;
}

interface Theme {
  colors: ThemeColors;
  fonts: ThemeFonts;
  borderRadius: string;
  shadowIntensity: 'light' | 'medium' | 'heavy';
  updatedAt: string;
  updatedBy?: string;
}

export default function ThemeManagement() {
  const { data: session } = useSession();
  const [theme, setTheme] = useState<Theme | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<Theme | null>(null);

  useEffect(() => {
    fetchTheme();
  }, []);

  const fetchTheme = async () => {
    try {
      const res = await fetch('/api/cms/theme', {
        credentials: 'include',
        cache: 'no-store',
      });
      if (res.ok) {
        const data = await res.json();
        setTheme(data);
        setFormData(data);
      }
    } catch (error) {
      console.error('Failed to fetch theme:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;

    setSaving(true);
    try {
      const res = await fetch('/api/cms/theme', {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const updated = await res.json();
        setTheme(updated);
        setFormData(updated);
        alert('✓ Theme saved successfully!');
      } else {
        const message = await res.text();
        alert(`Failed to save theme: ${message || res.status}`);
      }
    } catch (error) {
      console.error('Save failed:', error);
      alert('Failed to save theme');
    } finally {
      setSaving(false);
    }
  };

  if (loading || !formData) {
    return (
      <AdminShell title="Theme Management">
        <div className="text-center p-8">Loading theme...</div>
      </AdminShell>
    );
  }

  return (
    <AdminShell title="Theme Management">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="heading-xl text-gradient mb-2">Theme Settings</h1>
          <p className="text-text-secondary">Manage colors, fonts, and visual appearance</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form */}
        <div className="lg:col-span-2 space-y-8">
          <form onSubmit={handleSave} className="space-y-8">
            {/* Colors Section */}
            <div className="card-cyber p-6">
              <h2 className="heading-lg text-gradient mb-6 flex items-center gap-2">
                <FaPalette /> Colors
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(formData.colors).map(([key, value]) => {
                  const safeValue = /^#([0-9a-fA-F]{3}){1,2}$/i.test(value) ? value : '#000000';
                  return (
                  <div key={key}>
                    <label className="block text-text-primary font-semibold mb-2 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        value={safeValue}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            colors: { ...formData.colors, [key]: e.target.value },
                          })
                        }
                        className="w-24 md:w-28 h-12 rounded-lg border-2 border-dark-border cursor-pointer bg-dark-card"
                      />
                      <input
                        type="text"
                        value={value}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            colors: { ...formData.colors, [key]: e.target.value },
                          })
                        }
                        className="flex-1 bg-dark border-2 border-dark-border rounded-lg px-3 py-2 text-text-primary font-mono"
                      />
                    </div>
                  </div>
                  );
                })}
              </div>
            </div>

            {/* Fonts Section */}
            <div className="card-cyber p-6">
              <h2 className="heading-lg text-gradient mb-6">Fonts</h2>
              <div className="space-y-4">
                {Object.entries(formData.fonts).map(([key, value]) => (
                  <div key={key} className="space-y-2">
                    <label className="block text-text-primary font-semibold mb-1 capitalize">
                      {key} Font
                    </label>

                    {/* Dropdown selector */}
                    <select
                      value={fontOptions.find((opt) => opt.value === value)?.value || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          fonts: { ...formData.fonts, [key]: e.target.value },
                        })
                      }
                      className="w-full bg-dark border-2 border-dark-border rounded-lg px-4 py-3 text-text-primary"
                    >
                      <option value="">Choose a font</option>
                      {fontOptions.map((opt) => (
                        <option key={`${key}-${opt.value}`} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>

                    {/* Freeform input */}
                    <input
                      type="text"
                      value={value}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          fonts: { ...formData.fonts, [key]: e.target.value },
                        })
                      }
                      className="w-full bg-dark border-2 border-dark-border rounded-lg px-4 py-3 text-text-primary"
                      placeholder="Custom font family (e.g., Inter, system-ui, sans-serif)"
                    />

                    {/* Inline preview */}
                    <div
                      className="p-3 bg-dark border border-dark-border rounded text-text-primary text-sm"
                      style={{ fontFamily: value }}
                    >
                      The quick brown fox jumps over the lazy dog
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Other Settings */}
            <div className="card-cyber p-6">
              <h2 className="heading-lg text-gradient mb-6">Other Settings</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-text-primary font-semibold mb-2">Border Radius</label>
                  <input
                    type="text"
                    value={formData.borderRadius}
                    onChange={(e) => setFormData({ ...formData, borderRadius: e.target.value })}
                    className="w-full bg-dark border-2 border-dark-border rounded-lg px-4 py-3 text-text-primary"
                    placeholder="e.g., 0.5rem"
                  />
                </div>

                <div>
                  <label className="block text-text-primary font-semibold mb-2">Shadow Intensity</label>
                  <select
                    value={formData.shadowIntensity}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        shadowIntensity: e.target.value as 'light' | 'medium' | 'heavy',
                      })
                    }
                    className="w-full bg-dark border-2 border-dark-border rounded-lg px-4 py-3 text-text-primary"
                  >
                    <option value="light">Light</option>
                    <option value="medium">Medium</option>
                    <option value="heavy">Heavy</option>
                  </select>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={saving}
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              <FaSave />
              <span>{saving ? 'Saving...' : 'Save Theme'}</span>
            </button>
          </form>
        </div>

        {/* Preview Panel */}
        <div className="card-cyber p-6 h-fit sticky top-20">
          <h2 className="heading-lg text-gradient mb-6">Preview</h2>
          
          {/* Color Swatches */}
          <div className="mb-6">
            <p className="text-text-secondary text-sm mb-3">Color Palette</p>
            <div className="space-y-2">
              {Object.entries(formData.colors).map(([key, value]) => (
                <div key={key} className="flex items-center gap-2">
                  <div
                    className="w-8 h-8 rounded border border-dark-border"
                    style={{ backgroundColor: value }}
                  />
                  <span className="text-text-secondary text-sm capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Typography Preview */}
          <div className="mb-6 border-t border-dark-border pt-6">
            <p className="text-text-secondary text-sm mb-3">Typography</p>
            <div className="space-y-3">
              <div style={{ fontFamily: formData.fonts.primary }}>
                <p className="text-text-muted text-xs">Primary Font</p>
                <p className="text-text-primary">The quick brown fox jumps</p>
              </div>
              <div style={{ fontFamily: formData.fonts.secondary }}>
                <p className="text-text-muted text-xs">Secondary Font</p>
                <p className="text-text-primary">The quick brown fox jumps</p>
              </div>
              <div style={{ fontFamily: formData.fonts.mono }}>
                <p className="text-text-muted text-xs">Mono Font</p>
                <p className="text-text-primary text-sm">const x = 42;</p>
              </div>
            </div>
          </div>

          {/* Last Updated */}
          <div className="text-xs text-text-muted border-t border-dark-border pt-4">
            <p>Last updated: {new Date(formData.updatedAt).toLocaleString()}</p>
            {formData.updatedBy && <p>By: {formData.updatedBy}</p>}
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
