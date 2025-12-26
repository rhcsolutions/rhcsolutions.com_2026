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

const fontSizeOptions = [
  '12px',
  '14px',
  '16px',
  '18px',
  '20px',
  '22px',
  '24px',
  '28px',
  '32px',
  '36px',
  '40px',
];

const colorOptions = [
  { label: 'Neon Green', value: '#00FF41' },
  { label: 'Neon Cyan', value: '#00F0FF' },
  { label: 'Neon Blue', value: '#00AAFF' },
  { label: 'Neon Red', value: '#FF4458' },
  { label: 'Neon Yellow', value: '#FFB800' },
  { label: 'Neon Purple', value: '#BB86FC' },
  { label: 'Success Green', value: '#00FF88' },
  { label: 'Dark Black', value: '#0A0E27' },
  { label: 'Dark Lighter', value: '#1A1F3A' },
  { label: 'Dark Card', value: '#151B2F' },
  { label: 'Gray Secondary', value: '#8892A6' },
  { label: 'White', value: '#E8E8E8' },
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

interface ThemeFontSizes {
  primary: string;
  secondary: string;
  mono: string;
}

interface ButtonStyles {
  fontFamily: string;
  fontSize: string;
  fontWeight: string;
  paddingX: string;
  paddingY: string;
  borderRadius: string;
  primaryBg: string;
  primaryHoverBg: string;
  primaryText: string;
  outlineBorder: string;
  outlineText: string;
  outlineHoverBg: string;
}

interface Theme {
  colors: ThemeColors;
  fonts: ThemeFonts;
  fontSizes: ThemeFontSizes;
  buttonStyles?: ButtonStyles;
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

  // Apply theme CSS variables to document root for real-time preview
  const applyThemeCSSVariables = (themeData: Theme) => {
    const root = document.documentElement;
    // Fonts
    root.style.setProperty('--font-primary-family', themeData.fonts?.primary || 'Inter, system-ui, sans-serif');
    root.style.setProperty('--font-secondary-family', themeData.fonts?.secondary || 'Space Grotesk, system-ui, sans-serif');
    root.style.setProperty('--font-mono-family', themeData.fonts?.mono || 'JetBrains Mono, Courier New, monospace');
    root.style.setProperty('--font-primary-size', themeData.fontSizes?.primary || '16px');
    root.style.setProperty('--font-secondary-size', themeData.fontSizes?.secondary || '16px');
    root.style.setProperty('--font-mono-size', themeData.fontSizes?.mono || '14px');
    // Colors
    root.style.setProperty('--color-primary', themeData.colors?.primary || '#00FF41');
    root.style.setProperty('--color-primary-dark', themeData.colors?.primaryDark || '#0A0E27');
    root.style.setProperty('--color-secondary', themeData.colors?.secondary || '#00F0FF');
    root.style.setProperty('--color-accent', themeData.colors?.accent || '#00AAFF');
    root.style.setProperty('--color-success', themeData.colors?.success || '#00FF88');
    root.style.setProperty('--color-error', themeData.colors?.error || '#FF4458');
    root.style.setProperty('--color-warning', themeData.colors?.warning || '#FFB800');
    root.style.setProperty('--color-info', themeData.colors?.info || '#00F0FF');
    // Scale
    const primaryPx = parseFloat(themeData.fontSizes?.primary || '16px');
    const scale = isNaN(primaryPx) ? 1 : primaryPx / 16;
    root.style.setProperty('--type-scale', String(scale));
    // Buttons
    if (themeData.buttonStyles) {
      root.style.setProperty('--btn-font-family', themeData.buttonStyles.fontFamily || 'inherit');
      root.style.setProperty('--btn-font-size', themeData.buttonStyles.fontSize || '16px');
      root.style.setProperty('--btn-font-weight', themeData.buttonStyles.fontWeight || 'bold');
      root.style.setProperty('--btn-padding-x', themeData.buttonStyles.paddingX || '2rem');
      root.style.setProperty('--btn-padding-y', themeData.buttonStyles.paddingY || '1rem');
      root.style.setProperty('--btn-border-radius', themeData.buttonStyles.borderRadius || '0.5rem');
      root.style.setProperty('--btn-primary-bg', themeData.buttonStyles.primaryBg || 'linear-gradient(to right, var(--color-primary), var(--color-secondary))');
      root.style.setProperty('--btn-primary-hover-bg', themeData.buttonStyles.primaryHoverBg || 'linear-gradient(to right, var(--color-secondary), var(--color-primary))');
      root.style.setProperty('--btn-primary-text', themeData.buttonStyles.primaryText || '#0A0E27');
      root.style.setProperty('--btn-outline-border', themeData.buttonStyles.outlineBorder || 'var(--color-secondary)');
      root.style.setProperty('--btn-outline-text', themeData.buttonStyles.outlineText || 'var(--color-secondary)');
      root.style.setProperty('--btn-outline-hover-bg', themeData.buttonStyles.outlineHoverBg || 'var(--color-secondary)');
    }
  };

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
        const fontSizes: ThemeFontSizes = {
          primary: (data as any)?.fontSizes?.primary || '16px',
          secondary: (data as any)?.fontSizes?.secondary || '16px',
          mono: (data as any)?.fontSizes?.mono || '14px',
        };
        const buttonStyles: ButtonStyles = {
          fontFamily: (data as any)?.buttonStyles?.fontFamily || 'inherit',
          fontSize: (data as any)?.buttonStyles?.fontSize || '16px',
          fontWeight: (data as any)?.buttonStyles?.fontWeight || 'bold',
          paddingX: (data as any)?.buttonStyles?.paddingX || '2rem',
          paddingY: (data as any)?.buttonStyles?.paddingY || '1rem',
          borderRadius: (data as any)?.buttonStyles?.borderRadius || '0.5rem',
          primaryBg: (data as any)?.buttonStyles?.primaryBg || 'linear-gradient(to right, var(--color-primary), var(--color-secondary))',
          primaryHoverBg: (data as any)?.buttonStyles?.primaryHoverBg || 'linear-gradient(to right, var(--color-secondary), var(--color-primary))',
          primaryText: (data as any)?.buttonStyles?.primaryText || '#0A0E27',
          outlineBorder: (data as any)?.buttonStyles?.outlineBorder || 'var(--color-secondary)',
          outlineText: (data as any)?.buttonStyles?.outlineText || 'var(--color-secondary)',
          outlineHoverBg: (data as any)?.buttonStyles?.outlineHoverBg || 'var(--color-secondary)',
        };
        const hydrated = { ...data, fontSizes, buttonStyles } as Theme;
        setTheme(hydrated);
        setFormData(hydrated);
        applyThemeCSSVariables(hydrated);
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
      } else {
        const message = await res.text();
        console.error(`Failed to save theme: ${message || res.status}`);
      }
    } catch (error) {
      console.error('Save failed:', error);
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
                {Object.entries(formData.colors).map(([key, value]) => (
                  <div key={key}>
                    <label className="block text-text-primary font-semibold mb-2 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </label>
                    <div className="space-y-2">
                      <div className="flex gap-3 items-center">
                        <div
                          className="w-12 h-12 rounded-lg border-2 border-dark-border flex-shrink-0"
                          style={{ backgroundColor: value }}
                        />
                        <select
                          value={colorOptions.find((opt) => opt.value === value)?.value || ''}
                          onChange={(e) => {
                            const updated = {
                              ...formData,
                              colors: { ...formData.colors, [key]: e.target.value },
                            };
                            setFormData(updated);
                            applyThemeCSSVariables(updated);
                          }}
                          className="flex-1 bg-dark border-2 border-dark-border rounded-lg px-4 py-3 text-text-primary"
                        >
                          <option value="">Choose preset</option>
                          {colorOptions.map((opt) => (
                            <option key={`${key}-${opt.value}`} value={opt.value}>
                              {opt.label}
                            </option>
                          ))}
                        </select>
                      </div>
                      <input
                        type="text"
                        value={value}
                        onChange={(e) => {
                          const updated = {
                            ...formData,
                            colors: { ...formData.colors, [key]: e.target.value },
                          };
                          setFormData(updated);
                          applyThemeCSSVariables(updated);
                        }}
                        placeholder="#00FF41 or custom color"
                        className="w-full bg-dark border-2 border-dark-border rounded-lg px-4 py-2 text-text-primary text-sm font-mono"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Fonts Section */}
              <div className="card-cyber p-6">
              <h2 className="heading-lg text-gradient mb-6">Fonts</h2>
              <div className="space-y-6">
                {Object.entries(formData.fonts).map(([key, value]) => (
                  <div key={key} className="space-y-2">
                    <label className="block text-text-primary font-semibold mb-1 capitalize">
                      {key} Font
                    </label>

                    {/* Font select + size inline */}
                    <div className="flex items-center gap-3">
                      <select
                        value={fontOptions.find((opt) => opt.value === value)?.value || ''}
                        onChange={(e) => {
                          const updated = {
                            ...formData,
                            fonts: { ...formData.fonts, [key]: e.target.value },
                          };
                          setFormData(updated);
                          applyThemeCSSVariables(updated);
                        }}
                        className="flex-1 bg-dark border-2 border-dark-border rounded-lg px-4 py-3 text-text-primary"
                      >
                        <option value="">Choose a font</option>
                        {fontOptions.map((opt) => (
                          <option key={`${key}-${opt.value}`} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                      <select
                        value={formData.fontSizes?.[key as keyof ThemeFontSizes] || ''}
                        onChange={(e) => {
                          const updated = {
                            ...formData,
                            fontSizes: {
                              ...formData.fontSizes,
                              [key]: e.target.value,
                            },
                          };
                          setFormData(updated);
                          applyThemeCSSVariables(updated);
                        }}
                        className="w-32 bg-dark border-2 border-dark-border rounded-lg px-3 py-2 text-text-primary"
                        aria-label={`${key} font size`}
                      >
                        <option value="">Size</option>
                        {fontSizeOptions.map((sz) => (
                          <option key={`${key}-${sz}`} value={sz}>
                            {sz}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Inline preview */}
                    <div
                      className="p-3 bg-dark border border-dark-border rounded text-text-primary text-sm"
                      style={{ fontFamily: value, fontSize: formData.fontSizes?.[key as keyof ThemeFontSizes] || '16px' }}
                    >
                      The quick brown fox jumps over the lazy dog
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Button Styles Section */}
            <div className="card-cyber p-6">
              <h2 className="heading-lg text-gradient mb-6">Button Styles</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-text-primary font-semibold mb-2">Button Font Family</label>
                  <select
                    value={formData.buttonStyles?.fontFamily || 'inherit'}
                    onChange={(e) => {
                      const updated = {
                        ...formData,
                        buttonStyles: { ...formData.buttonStyles!, fontFamily: e.target.value },
                      };
                      setFormData(updated);
                      applyThemeCSSVariables(updated);
                    }}
                    className="w-full bg-dark border-2 border-dark-border rounded-lg px-4 py-3 text-text-primary"
                  >
                    <option value="inherit">Inherit from Primary</option>
                    {fontOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-text-primary font-semibold mb-2">Button Font Size</label>
                  <select
                    value={formData.buttonStyles?.fontSize || '16px'}
                    onChange={(e) => {
                      const updated = {
                        ...formData,
                        buttonStyles: { ...formData.buttonStyles!, fontSize: e.target.value },
                      };
                      setFormData(updated);
                      applyThemeCSSVariables(updated);
                    }}
                    className="w-full bg-dark border-2 border-dark-border rounded-lg px-4 py-3 text-text-primary"
                  >
                    {fontSizeOptions.map((sz) => (
                      <option key={sz} value={sz}>
                        {sz}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-text-primary font-semibold mb-2">Font Weight</label>
                  <select
                    value={formData.buttonStyles?.fontWeight || 'bold'}
                    onChange={(e) => {
                      const updated = {
                        ...formData,
                        buttonStyles: { ...formData.buttonStyles!, fontWeight: e.target.value },
                      };
                      setFormData(updated);
                      applyThemeCSSVariables(updated);
                    }}
                    className="w-full bg-dark border-2 border-dark-border rounded-lg px-4 py-3 text-text-primary"
                  >
                    <option value="normal">Normal (400)</option>
                    <option value="500">Medium (500)</option>
                    <option value="600">Semi-Bold (600)</option>
                    <option value="bold">Bold (700)</option>
                    <option value="800">Extra Bold (800)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-text-primary font-semibold mb-2">Border Radius</label>
                  <input
                    type="text"
                    value={formData.buttonStyles?.borderRadius || '0.5rem'}
                    onChange={(e) => {
                      const updated = {
                        ...formData,
                        buttonStyles: { ...formData.buttonStyles!, borderRadius: e.target.value },
                      };
                      setFormData(updated);
                      applyThemeCSSVariables(updated);
                    }}
                    placeholder="0.5rem"
                    className="w-full bg-dark border-2 border-dark-border rounded-lg px-4 py-3 text-text-primary"
                  />
                </div>

                <div>
                  <label className="block text-text-primary font-semibold mb-2">Horizontal Padding</label>
                  <input
                    type="text"
                    value={formData.buttonStyles?.paddingX || '2rem'}
                    onChange={(e) => {
                      const updated = {
                        ...formData,
                        buttonStyles: { ...formData.buttonStyles!, paddingX: e.target.value },
                      };
                      setFormData(updated);
                      applyThemeCSSVariables(updated);
                    }}
                    placeholder="2rem"
                    className="w-full bg-dark border-2 border-dark-border rounded-lg px-4 py-3 text-text-primary"
                  />
                </div>

                <div>
                  <label className="block text-text-primary font-semibold mb-2">Vertical Padding</label>
                  <input
                    type="text"
                    value={formData.buttonStyles?.paddingY || '1rem'}
                    onChange={(e) => {
                      const updated = {
                        ...formData,
                        buttonStyles: { ...formData.buttonStyles!, paddingY: e.target.value },
                      };
                      setFormData(updated);
                      applyThemeCSSVariables(updated);
                    }}
                    placeholder="1rem"
                    className="w-full bg-dark border-2 border-dark-border rounded-lg px-4 py-3 text-text-primary"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-text-primary font-semibold mb-2">Primary Button Background</label>
                  <input
                    type="text"
                    value={formData.buttonStyles?.primaryBg || 'linear-gradient(to right, var(--color-primary), var(--color-secondary))'}
                    onChange={(e) => {
                      const updated = {
                        ...formData,
                        buttonStyles: { ...formData.buttonStyles!, primaryBg: e.target.value },
                      };
                      setFormData(updated);
                      applyThemeCSSVariables(updated);
                    }}
                    placeholder="CSS gradient or color"
                    className="w-full bg-dark border-2 border-dark-border rounded-lg px-4 py-3 text-text-primary font-mono text-sm"
                  />
                </div>

                <div>
                  <label className="block text-text-primary font-semibold mb-2">Primary Button Text Color</label>
                  <input
                    type="text"
                    value={formData.buttonStyles?.primaryText || '#0A0E27'}
                    onChange={(e) => {
                      const updated = {
                        ...formData,
                        buttonStyles: { ...formData.buttonStyles!, primaryText: e.target.value },
                      };
                      setFormData(updated);
                      applyThemeCSSVariables(updated);
                    }}
                    placeholder="#0A0E27"
                    className="w-full bg-dark border-2 border-dark-border rounded-lg px-4 py-3 text-text-primary font-mono"
                  />
                </div>

                <div>
                  <label className="block text-text-primary font-semibold mb-2">Outline Button Border Color</label>
                  <input
                    type="text"
                    value={formData.buttonStyles?.outlineBorder || 'var(--color-secondary)'}
                    onChange={(e) => {
                      const updated = {
                        ...formData,
                        buttonStyles: { ...formData.buttonStyles!, outlineBorder: e.target.value },
                      };
                      setFormData(updated);
                      applyThemeCSSVariables(updated);
                    }}
                    placeholder="var(--color-secondary)"
                    className="w-full bg-dark border-2 border-dark-border rounded-lg px-4 py-3 text-text-primary font-mono"
                  />
                </div>

                <div>
                  <label className="block text-text-primary font-semibold mb-2">Outline Button Text Color</label>
                  <input
                    type="text"
                    value={formData.buttonStyles?.outlineText || 'var(--color-secondary)'}
                    onChange={(e) => {
                      const updated = {
                        ...formData,
                        buttonStyles: { ...formData.buttonStyles!, outlineText: e.target.value },
                      };
                      setFormData(updated);
                      applyThemeCSSVariables(updated);
                    }}
                    placeholder="var(--color-secondary)"
                    className="w-full bg-dark border-2 border-dark-border rounded-lg px-4 py-3 text-text-primary font-mono"
                  />
                </div>

                <div>
                  <label className="block text-text-primary font-semibold mb-2">Outline Hover Background</label>
                  <input
                    type="text"
                    value={formData.buttonStyles?.outlineHoverBg || 'var(--color-secondary)'}
                    onChange={(e) => {
                      const updated = {
                        ...formData,
                        buttonStyles: { ...formData.buttonStyles!, outlineHoverBg: e.target.value },
                      };
                      setFormData(updated);
                      applyThemeCSSVariables(updated);
                    }}
                    placeholder="var(--color-secondary)"
                    className="w-full bg-dark border-2 border-dark-border rounded-lg px-4 py-3 text-text-primary font-mono"
                  />
                </div>
              </div>

              {/* Button Preview */}
              <div className="mt-6 pt-6 border-t border-dark-border">
                <p className="text-text-secondary text-sm mb-4">Button Preview</p>
                <div className="flex gap-4 flex-wrap">
                  <button className="btn-primary">Primary Button</button>
                  <button className="btn-outline">Outline Button</button>
                </div>
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
