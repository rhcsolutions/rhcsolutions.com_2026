"use client";
import { useEffect, useState } from 'react';
import AdminShell from '@/components/admin/AdminShell';
import { FaChartLine } from 'react-icons/fa';

export default function AnalyticsPage() {
  const [gaId, setGaId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/api/cms/settings', { cache: 'no-store', credentials: 'include' });
        if (res.ok) {
          const json = await res.json();
          setGaId(json.analytics?.googleAnalyticsId || null);
        }
      } catch (e) {
        // ignore
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <AdminShell title="Analytics">
      <div className="mb-8">
        <h1 className="heading-xl text-gradient mb-2">Google Analytics 4</h1>
        <p className="text-text-secondary">View real analytics in your GA dashboard. No fake stats shown here.</p>
      </div>

      {/* GA4 Integration Notice */}
      <div className="card-cyber p-8 mb-8 border-l-4 border-cyber-green">
        <div className="flex items-start space-x-4">
          <FaChartLine className="text-4xl text-cyber-green flex-shrink-0 mt-1" />
          <div>
            <h2 className="text-xl font-bold text-text-primary mb-2">Google Analytics 4 Integration</h2>
            {loading ? (
              <p className="text-text-secondary">Loading configuration…</p>
            ) : gaId ? (
              <>
                <p className="text-text-secondary mb-4">Tracking ID configured: <span className="font-mono">{gaId}</span></p>
                <a href="https://analytics.google.com/" target="_blank" rel="noopener noreferrer" className="btn-primary inline-block">
                  Open Google Analytics →
                </a>
              </>
            ) : (
              <p className="text-text-secondary">No GA4 ID configured. Add `googleAnalyticsId` in Settings to enable tracking.</p>
            )}
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
