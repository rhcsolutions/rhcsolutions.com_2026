'use client';
import { useState } from 'react';
import AdminShell from '@/components/admin/AdminShell';
import { FaEnvelope, FaPhone, FaComment, FaDownload } from 'react-icons/fa';

export default function FormsManagement() {
  const [activeTab, setActiveTab] = useState('submissions');

  const submissions = [
    { id: 1, form: 'Contact Form', name: 'John Doe', email: 'john@example.com', date: '2025-12-16', status: 'New' },
    { id: 2, form: 'Quote Request', name: 'Jane Smith', email: 'jane@example.com', date: '2025-12-15', status: 'Reviewed' },
    { id: 3, form: 'Contact Form', name: 'Bob Johnson', email: 'bob@example.com', date: '2025-12-14', status: 'Replied' },
  ];

  return (
    <AdminShell title="Forms Management">
      <div className="mb-8">
        <h1 className="heading-xl text-gradient mb-2">Forms Management</h1>
        <p className="text-text-secondary">Manage form submissions and settings</p>
      </div>

      {/* Tabs */}
      <div className="flex space-x-4 mb-6 border-b border-dark-border">
        <button
          onClick={() => setActiveTab('submissions')}
          className={`px-6 py-3 font-semibold transition-colors ${
            activeTab === 'submissions'
              ? 'text-cyber-green border-b-2 border-cyber-green'
              : 'text-text-secondary hover:text-text-primary'
          }`}
        >
          Submissions
        </button>
        <button
          onClick={() => setActiveTab('settings')}
          className={`px-6 py-3 font-semibold transition-colors ${
            activeTab === 'settings'
              ? 'text-cyber-green border-b-2 border-cyber-green'
              : 'text-text-secondary hover:text-text-primary'
          }`}
        >
          Settings
        </button>
      </div>

      {activeTab === 'submissions' && (
        <>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="card-cyber p-6">
              <FaEnvelope className="text-3xl text-cyber-green mb-3" />
              <h3 className="text-2xl font-bold text-text-primary">127</h3>
              <p className="text-text-secondary text-sm">Total Submissions</p>
            </div>
            <div className="card-cyber p-6">
              <FaComment className="text-3xl text-cyber-cyan mb-3" />
              <h3 className="text-2xl font-bold text-text-primary">23</h3>
              <p className="text-text-secondary text-sm">New (Unread)</p>
            </div>
            <div className="card-cyber p-6">
              <FaPhone className="text-3xl text-cyber-blue mb-3" />
              <h3 className="text-2xl font-bold text-text-primary">45</h3>
              <p className="text-text-secondary text-sm">Quote Requests</p>
            </div>
            <div className="card-cyber p-6">
              <FaDownload className="text-3xl text-cyber-purple mb-3" />
              <h3 className="text-2xl font-bold text-text-primary">89%</h3>
              <p className="text-text-secondary text-sm">Response Rate</p>
            </div>
          </div>

          {/* Submissions Table */}
          <div className="card-cyber overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-dark-lighter">
                  <tr>
                    <th className="text-left p-4 text-text-primary font-semibold">Form</th>
                    <th className="text-left p-4 text-text-primary font-semibold">Name</th>
                    <th className="text-left p-4 text-text-primary font-semibold">Email</th>
                    <th className="text-left p-4 text-text-primary font-semibold">Date</th>
                    <th className="text-left p-4 text-text-primary font-semibold">Status</th>
                    <th className="text-right p-4 text-text-primary font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {submissions.map((sub) => (
                    <tr key={sub.id} className="border-t border-dark-border hover:bg-dark-lighter transition-colors">
                      <td className="p-4 text-text-primary">{sub.form}</td>
                      <td className="p-4 text-text-secondary">{sub.name}</td>
                      <td className="p-4 text-text-secondary font-mono text-sm">{sub.email}</td>
                      <td className="p-4 text-text-secondary">{sub.date}</td>
                      <td className="p-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          sub.status === 'New' ? 'bg-cyber-green/20 text-cyber-green' :
                          sub.status === 'Reviewed' ? 'bg-cyber-cyan/20 text-cyber-cyan' :
                          'bg-cyber-blue/20 text-cyber-blue'
                        }`}>
                          {sub.status}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <button className="btn-secondary py-2 px-4">View</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {activeTab === 'settings' && (
        <div className="card-cyber p-8">
          <h2 className="heading-md text-gradient mb-6">Form Settings</h2>
          <div className="space-y-6">
            <div>
              <label className="block text-text-primary font-semibold mb-2">Notification Email</label>
              <input
                type="email"
                defaultValue="info@rhcsolutions.com"
                className="w-full bg-dark-card border-2 border-dark-border rounded-lg py-3 px-4 text-text-primary 
                         focus:border-cyber-green focus:outline-none"
              />
              <p className="text-text-muted text-sm mt-2">Email address for form submission notifications</p>
            </div>

            <div>
              <label className="block text-text-primary font-semibold mb-2">Auto-Response</label>
              <textarea
                rows={4}
                defaultValue="Thank you for contacting RHC Solutions. We'll get back to you within 24 hours."
                className="w-full bg-dark-card border-2 border-dark-border rounded-lg py-3 px-4 text-text-primary 
                         focus:border-cyber-green focus:outline-none"
              />
              <p className="text-text-muted text-sm mt-2">Automatic response sent to form submitters</p>
            </div>

            <div className="flex items-center space-x-3">
              <input type="checkbox" id="spam-protection" className="w-5 h-5" defaultChecked />
              <label htmlFor="spam-protection" className="text-text-primary">Enable spam protection (reCAPTCHA)</label>
            </div>

            <div className="flex items-center space-x-3">
              <input type="checkbox" id="save-submissions" className="w-5 h-5" defaultChecked />
              <label htmlFor="save-submissions" className="text-text-primary">Save submissions to database</label>
            </div>

            <button className="btn-primary mt-6">Save Settings</button>
          </div>
        </div>
      )}
    </AdminShell>
  );
}
