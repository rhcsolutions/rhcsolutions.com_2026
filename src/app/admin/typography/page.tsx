'use client';
import { useState, useEffect } from 'react';
import AdminShell from '@/components/admin/AdminShell';
import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import { FaFont, FaSave } from 'react-icons/fa';

interface TypographyStyle {
  fontSize: string;
  lineHeight: string;
  fontWeight: string;
  letterSpacing: string;
}

interface Typography {
  headings: {
    h1: TypographyStyle;
    h2: TypographyStyle;
    h3: TypographyStyle;
    h4: TypographyStyle;
  };
  body: TypographyStyle;
  small: TypographyStyle;
  updatedAt: string;
  updatedBy?: string;
}

export default function TypographyManagement() {
  const { data: session } = useSession();
  const [typography, setTypography] = useState<Typography | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<Typography | null>(null);

  useEffect(() => {
    fetchTypography();
  }, []);

  const fetchTypography = async () => {
    try {
      const res = await fetch('/api/cms/typography', {
        credentials: 'include',
        cache: 'no-store',
      });
      if (res.ok) {
        const data = await res.json();
        setTypography(data);
        setFormData(data);
      }
    } catch (error) {
      console.error('Failed to fetch typography:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;

    setSaving(true);
    try {
      const res = await fetch('/api/cms/typography', {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const updated = await res.json();
        setTypography(updated);
        alert('✓ Typography saved successfully!');
      } else {
        alert('Failed to save typography');
      }
    } catch (error) {
      console.error('Save failed:', error);
      alert('Failed to save typography');
    } finally {
      setSaving(false);
    }
  };

  const updateStyle = (category: string, style: TypographyStyle) => {
    if (!formData) return;
    if (category === 'body' || category === 'small') {
      setFormData({ ...formData, [category]: style });
    } else {
      setFormData({
        ...formData,
        headings: { ...formData.headings, [category]: style },
      });
    }
  };

  if (loading || !formData) {
    return (
      <AdminShell title="Typography Management">
        <div className="text-center p-8">Loading typography...</div>
      </AdminShell>
    );
  }

  const headings = [
    { key: 'h1', label: 'Heading 1' },
    { key: 'h2', label: 'Heading 2' },
    { key: 'h3', label: 'Heading 3' },
    { key: 'h4', label: 'Heading 4' },
  ];

  return (
    <AdminShell title="Typography Management">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="heading-xl text-gradient mb-2">Typography Settings</h1>
          <p className="text-text-secondary">Manage font sizes, weights, and text styles</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form */}
        <div className="lg:col-span-2 space-y-6">
          <form onSubmit={handleSave} className="space-y-6">
            {/* Headings */}
            <div className="card-cyber p-6">
              <h2 className="heading-lg text-gradient mb-6 flex items-center gap-2">
                <FaFont /> Headings
              </h2>
              <div className="space-y-6">
                {headings.map(({ key, label }) => {
                  const style = formData.headings[key as keyof typeof formData.headings];
                  return (
                    <motion.div
                      key={key}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-dark-lighter rounded-lg border border-dark-border"
                    >
                      <h3 className="text-text-primary font-semibold mb-4">{label}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <label className="text-text-secondary text-sm">Font Size</label>
                          <input
                            type="text"
                            value={style.fontSize}
                            onChange={(e) =>
                              updateStyle(key, { ...style, fontSize: e.target.value })
                            }
                            className="w-full bg-dark border-2 border-dark-border rounded px-3 py-2 text-text-primary text-sm"
                            placeholder="e.g., 48px"
                          />
                        </div>
                        <div>
                          <label className="text-text-secondary text-sm">Line Height</label>
                          <input
                            type="text"
                            value={style.lineHeight}
                            onChange={(e) =>
                              updateStyle(key, { ...style, lineHeight: e.target.value })
                            }
                            className="w-full bg-dark border-2 border-dark-border rounded px-3 py-2 text-text-primary text-sm"
                            placeholder="e.g., 3rem"
                          />
                        </div>
                        <div>
                          <label className="text-text-secondary text-sm">Font Weight</label>
                          <input
                            type="text"
                            value={style.fontWeight}
                            onChange={(e) =>
                              updateStyle(key, { ...style, fontWeight: e.target.value })
                            }
                            className="w-full bg-dark border-2 border-dark-border rounded px-3 py-2 text-text-primary text-sm"
                            placeholder="e.g., 700"
                          />
                        </div>
                        <div>
                          <label className="text-text-secondary text-sm">Letter Spacing</label>
                          <input
                            type="text"
                            value={style.letterSpacing}
                            onChange={(e) =>
                              updateStyle(key, { ...style, letterSpacing: e.target.value })
                            }
                            className="w-full bg-dark border-2 border-dark-border rounded px-3 py-2 text-text-primary text-sm"
                            placeholder="e.g., -0.01em"
                          />
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Body Text */}
            <div className="card-cyber p-6">
              <h2 className="heading-lg text-gradient mb-6">Body Text</h2>
              <div className="p-4 bg-dark-lighter rounded-lg border border-dark-border">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="text-text-secondary text-sm">Font Size</label>
                    <input
                      type="text"
                      value={formData.body.fontSize}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          body: { ...formData.body, fontSize: e.target.value },
                        })
                      }
                      className="w-full bg-dark border-2 border-dark-border rounded px-3 py-2 text-text-primary text-sm"
                      placeholder="e.g., 16px"
                    />
                  </div>
                  <div>
                    <label className="text-text-secondary text-sm">Line Height</label>
                    <input
                      type="text"
                      value={formData.body.lineHeight}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          body: { ...formData.body, lineHeight: e.target.value },
                        })
                      }
                      className="w-full bg-dark border-2 border-dark-border rounded px-3 py-2 text-text-primary text-sm"
                      placeholder="e.g., 1.6rem"
                    />
                  </div>
                  <div>
                    <label className="text-text-secondary text-sm">Font Weight</label>
                    <input
                      type="text"
                      value={formData.body.fontWeight}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          body: { ...formData.body, fontWeight: e.target.value },
                        })
                      }
                      className="w-full bg-dark border-2 border-dark-border rounded px-3 py-2 text-text-primary text-sm"
                      placeholder="e.g., 400"
                    />
                  </div>
                  <div>
                    <label className="text-text-secondary text-sm">Letter Spacing</label>
                    <input
                      type="text"
                      value={formData.body.letterSpacing}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          body: { ...formData.body, letterSpacing: e.target.value },
                        })
                      }
                      className="w-full bg-dark border-2 border-dark-border rounded px-3 py-2 text-text-primary text-sm"
                      placeholder="e.g., 0em"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Small Text */}
            <div className="card-cyber p-6">
              <h2 className="heading-lg text-gradient mb-6">Small Text</h2>
              <div className="p-4 bg-dark-lighter rounded-lg border border-dark-border">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="text-text-secondary text-sm">Font Size</label>
                    <input
                      type="text"
                      value={formData.small.fontSize}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          small: { ...formData.small, fontSize: e.target.value },
                        })
                      }
                      className="w-full bg-dark border-2 border-dark-border rounded px-3 py-2 text-text-primary text-sm"
                      placeholder="e.g., 14px"
                    />
                  </div>
                  <div>
                    <label className="text-text-secondary text-sm">Line Height</label>
                    <input
                      type="text"
                      value={formData.small.lineHeight}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          small: { ...formData.small, lineHeight: e.target.value },
                        })
                      }
                      className="w-full bg-dark border-2 border-dark-border rounded px-3 py-2 text-text-primary text-sm"
                      placeholder="e.g., 1.25rem"
                    />
                  </div>
                  <div>
                    <label className="text-text-secondary text-sm">Font Weight</label>
                    <input
                      type="text"
                      value={formData.small.fontWeight}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          small: { ...formData.small, fontWeight: e.target.value },
                        })
                      }
                      className="w-full bg-dark border-2 border-dark-border rounded px-3 py-2 text-text-primary text-sm"
                      placeholder="e.g., 400"
                    />
                  </div>
                  <div>
                    <label className="text-text-secondary text-sm">Letter Spacing</label>
                    <input
                      type="text"
                      value={formData.small.letterSpacing}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          small: { ...formData.small, letterSpacing: e.target.value },
                        })
                      }
                      className="w-full bg-dark border-2 border-dark-border rounded px-3 py-2 text-text-primary text-sm"
                      placeholder="e.g., 0em"
                    />
                  </div>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={saving}
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              <FaSave />
              <span>{saving ? 'Saving...' : 'Save Typography'}</span>
            </button>
          </form>
        </div>

        {/* Preview Panel */}
        <div className="card-cyber p-6 h-fit sticky top-20">
          <h2 className="heading-lg text-gradient mb-6">Preview</h2>
          <div className="space-y-6">
            {headings.map(({ key, label }) => {
              const style = formData.headings[key as keyof typeof formData.headings];
              return (
                <div key={key}>
                  <p className="text-text-secondary text-xs mb-2">{label}</p>
                  <div
                    style={{
                      fontSize: style.fontSize,
                      lineHeight: style.lineHeight,
                      fontWeight: style.fontWeight,
                      letterSpacing: style.letterSpacing,
                    }}
                    className="text-text-primary"
                  >
                    The quick brown fox
                  </div>
                </div>
              );
            })}

            <div className="border-t border-dark-border pt-6">
              <p className="text-text-secondary text-xs mb-2">Body Text</p>
              <div
                style={{
                  fontSize: formData.body.fontSize,
                  lineHeight: formData.body.lineHeight,
                  fontWeight: formData.body.fontWeight,
                  letterSpacing: formData.body.letterSpacing,
                }}
                className="text-text-primary"
              >
                The quick brown fox jumps over the lazy dog. This is body text.
              </div>
            </div>

            <div className="border-t border-dark-border pt-6">
              <p className="text-text-secondary text-xs mb-2">Small Text</p>
              <div
                style={{
                  fontSize: formData.small.fontSize,
                  lineHeight: formData.small.lineHeight,
                  fontWeight: formData.small.fontWeight,
                  letterSpacing: formData.small.letterSpacing,
                }}
                className="text-text-secondary"
              >
                This is small text used for captions and labels.
              </div>
            </div>

            <div className="text-xs text-text-muted border-t border-dark-border pt-4">
              <p>Last updated: {new Date(formData.updatedAt).toLocaleString()}</p>
              {formData.updatedBy && <p>By: {formData.updatedBy}</p>}
            </div>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
