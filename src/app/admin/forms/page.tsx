"use client";
import { useState, useEffect } from 'react';
import AdminShell from '@/components/admin/AdminShell';
import { FaEnvelope, FaPhone, FaComment, FaDownload } from 'react-icons/fa';

export default function FormsManagement() {
  const [activeTab, setActiveTab] = useState('submissions');
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchSubs(); }, []);

  const fetchSubs = async () => {
    try {
      const res = await fetch('/api/forms');
      if (res.ok) setSubmissions(await res.json());
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete submission?')) return;
    await fetch(`/api/forms?id=${id}`, { method: 'DELETE' });
    fetchSubs();
  };

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
              {/* Real data only: show table below; remove hardcoded stats */}

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
                  {submissions.length === 0 && (
                    <tr>
                      <td className="p-4 text-text-secondary" colSpan={6}>No submissions yet.</td>
                    </tr>
                  )}
                  {submissions.map((sub) => (
                    <tr key={sub.id} className="border-t border-dark-border hover:bg-dark-lighter transition-colors">
                      <td className="p-4 text-text-primary">{sub.form || sub.type || 'Contact'}</td>
                      <td className="p-4 text-text-secondary">{sub.name || sub.fullName || '-'}</td>
                      <td className="p-4 text-text-secondary font-mono text-sm">{sub.email || '-'}</td>
                      <td className="p-4 text-text-secondary">{sub.date || sub.receivedAt || '-'}</td>
                      <td className="p-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          (sub.status || 'Received') === 'New' ? 'bg-cyber-green/20 text-cyber-green' :
                          (sub.status || 'Received') === 'Reviewed' ? 'bg-cyber-cyan/20 text-cyber-cyan' :
                          'bg-cyber-blue/20 text-cyber-blue'
                        }`}>
                          {sub.status || 'Received'}
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
