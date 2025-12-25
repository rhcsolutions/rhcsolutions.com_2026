"use client";
import { useState, useEffect } from 'react';
import AdminShell from '@/components/admin/AdminShell';

export default function SitemapPage() {
  const [xml, setXml] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchSitemap(); }, []);

  const fetchSitemap = async () => {
    try {
      const res = await fetch('/api/sitemap');
      if (res.ok) setXml(await res.text());
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  const regen = async () => {
    const res = await fetch('/api/sitemap', { method: 'POST' });
    if (res.ok) { alert('sitemap.xml regenerated'); fetchSitemap(); }
  };

  return (
    <AdminShell title="Sitemap">
      <div className="mb-6">
        <h1 className="heading-xl text-gradient mb-2">sitemap.xml</h1>
        <p className="text-text-secondary">Preview and regenerate sitemap.xml</p>
      </div>
      <div className="card-cyber p-6">
        <div className="mb-4">
          <button onClick={regen} className="btn-primary">Regenerate sitemap</button>
        </div>
        {loading ? <div>Loading...</div> : <pre className="text-xs whitespace-pre-wrap max-h-[60vh] overflow-auto">{xml}</pre>}
      </div>
    </AdminShell>
  );
}
