'use client';
import { useState, useEffect } from 'react';
import AdminShell from '@/components/admin/AdminShell';
import { FaChartLine, FaFileAlt, FaImages, FaEnvelope, FaUsers } from 'react-icons/fa';

export default function AnalyticsPage() {
  const [stats, setStats] = useState({
    pagesCount: 0,
    mediaCount: 0,
    submissionsCount: 0,
    usersCount: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/analytics/stats');
      if (res.ok) {
        setStats(await res.json());
      }
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminShell title="Analytics">
      <div className="mb-8">
        <h1 className="heading-xl text-gradient mb-2">System Analytics</h1>
        <p className="text-text-secondary">Overview of CMS content and activity</p>
      </div>

      {/* GA4 Integration Notice */}
      <div className="card-cyber p-8 mb-8 border-l-4 border-cyber-green">
        <div className="flex items-start space-x-4">
          <FaChartLine className="text-4xl text-cyber-green flex-shrink-0 mt-1" />
          <div>
            <h2 className="text-xl font-bold text-text-primary mb-2">Google Analytics 4 Integration</h2>
            <p className="text-text-secondary mb-4">
              Your website is connected to Google Analytics 4. View detailed traffic, user behavior, and conversion reports directly in your Google Analytics dashboard.
            </p>
            <a
              href="https://analytics.google.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-block"
            >
              Open Google Analytics →
            </a>
          </div>
        </div>
      </div>

      {/* CMS Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="card-cyber p-6">
          <FaFileAlt className="text-3xl text-cyber-blue mb-3" />
          <h3 className="text-2xl font-bold text-text-primary">
            {loading ? '...' : stats.pagesCount}
          </h3>
          <p className="text-text-secondary">Total Pages</p>
        </div>
        <div className="card-cyber p-6">
          <FaImages className="text-3xl text-cyber-cyan mb-3" />
          <h3 className="text-2xl font-bold text-text-primary">
            {loading ? '...' : stats.mediaCount}
          </h3>
          <p className="text-text-secondary">Media Items</p>
        </div>
        <div className="card-cyber p-6">
          <FaEnvelope className="text-3xl text-cyber-green mb-3" />
          <h3 className="text-2xl font-bold text-text-primary">
            {loading ? '...' : stats.submissionsCount}
          </h3>
          <p className="text-text-secondary">Form Submissions</p>
        </div>
        <div className="card-cyber p-6">
          <FaUsers className="text-3xl text-cyber-purple mb-3" />
          <h3 className="text-2xl font-bold text-text-primary">
            {loading ? '...' : stats.usersCount}
          </h3>
          <p className="text-text-secondary">Admin Users</p>
        </div>
      </div>
    </AdminShell>
  );
}
