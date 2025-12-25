'use client';
import AdminShell from '@/components/admin/AdminShell';
import { FaChartLine, FaUsers, FaDesktop, FaMobile, FaGlobeAmericas } from 'react-icons/fa';

export default function AnalyticsPage() {
  return (
    <AdminShell title="Analytics">
      <div className="mb-8">
        <h1 className="heading-xl text-gradient mb-2">Google Analytics 4</h1>
        <p className="text-text-secondary">Comprehensive website analytics and tracking</p>
      </div>

      {/* GA4 Integration Notice */}
      <div className="card-cyber p-8 mb-8 border-l-4 border-cyber-green">
        <div className="flex items-start space-x-4">
          <FaChartLine className="text-4xl text-cyber-green flex-shrink-0 mt-1" />
          <div>
            <h2 className="text-xl font-bold text-text-primary mb-2">Google Analytics 4 Integration</h2>
            <p className="text-text-secondary mb-4">
              Your website is connected to Google Analytics 4. View detailed analytics reports directly in your Google Analytics dashboard.
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

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="card-cyber p-6">
          <FaUsers className="text-3xl text-cyber-green mb-3" />
          <h3 className="text-2xl font-bold text-text-primary">12,547</h3>
          <p className="text-text-secondary">Total Users (30d)</p>
        </div>
        <div className="card-cyber p-6">
          <FaDesktop className="text-3xl text-cyber-cyan mb-3" />
          <h3 className="text-2xl font-bold text-text-primary">58.3%</h3>
          <p className="text-text-secondary">Desktop Traffic</p>
        </div>
        <div className="card-cyber p-6">
          <FaMobile className="text-3xl text-cyber-blue mb-3" />
          <h3 className="text-2xl font-bold text-text-primary">35.2%</h3>
          <p className="text-text-secondary">Mobile Traffic</p>
        </div>
        <div className="card-cyber p-6">
          <FaGlobeAmericas className="text-3xl text-cyber-purple mb-3" />
          <h3 className="text-2xl font-bold text-text-primary">47</h3>
          <p className="text-text-secondary">Countries</p>
        </div>
      </div>

      {/* Features List */}
      <div className="card-dark p-8">
        <h2 className="heading-md text-gradient mb-6">Available Analytics Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            'Real-time user tracking',
            'Page views and events',
            'Conversion tracking',
            'User demographics',
            'Traffic sources analysis',
            'Device and browser stats',
            'Geographic distribution',
            'Custom event tracking',
            'E-commerce tracking (if enabled)',
            'Goal completions',
            'Session recordings',
            'Heatmaps and click tracking'
          ].map((feature, idx) => (
            <div key={idx} className="flex items-center space-x-3 p-3 bg-dark-lighter rounded-lg">
              <div className="w-2 h-2 bg-cyber-green rounded-full" />
              <span className="text-text-secondary">{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </AdminShell>
  );
}
