"use client";
import { useState, useEffect } from 'react';
import AdminShell from '@/components/admin/AdminShell';
import { FaEnvelope, FaPhone, FaComment, FaDownload } from 'react-icons/fa';

export default function FormsManagement() {
  const [activeTab, setActiveTab] = useState('submissions');
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selected, setSelected] = useState<any | null>(null);
  const [edit, setEdit] = useState<any | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => { fetchSubs(); }, []);

  const fetchSubs = async () => {
    setError('');
    try {
      const res = await fetch('/api/forms');
      if (res.ok) {
        setSubmissions(await res.json());
      } else {
        setError('Failed to load submissions');
      }
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
            {loading && (
              <div className="p-4 text-text-secondary">Loading submissions…</div>
            )}
            {error && !loading && (
              <div className="p-4 text-red-400">{error}</div>
            )}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-dark-lighter">
                  <tr>
                    <th className="text-left p-4 text-text-primary font-semibold">Form</th>
                    <th className="text-left p-4 text-text-primary font-semibold">Name</th>
                    <th className="text-left p-4 text-text-primary font-semibold">Email</th>
                    <th className="text-left p-4 text-text-primary font-semibold">Company</th>
                    <th className="text-left p-4 text-text-primary font-semibold">Message</th>
                    <th className="text-left p-4 text-text-primary font-semibold">Date</th>
                    <th className="text-left p-4 text-text-primary font-semibold">Status</th>
                    <th className="text-right p-4 text-text-primary font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {!loading && !error && submissions.length === 0 && (
                    <tr>
                      <td className="p-4 text-text-secondary" colSpan={6}>No submissions yet.</td>
                    </tr>
                  )}
                  {submissions.map((sub) => {
                    const formName = sub.form || sub.type || sub.payload?.type || 'Contact';
                    const name = sub.name || sub.fullName || sub.payload?.name || '-';
                    const email = sub.email || sub.payload?.email || '-';
                    const company = sub.company || sub.payload?.company || '-';
                    const message = sub.message || sub.payload?.message || '-';
                    const date = sub.date || sub.receivedAt || '-';
                    const status = sub.status || 'Received';
                    return (
                    <tr
                      key={sub.id}
                      className="border-t border-dark-border hover:bg-dark-lighter transition-colors cursor-pointer"
                      onClick={() => setSelected(sub)}
                    >
                      <td className="p-4 text-text-primary">{formName}</td>
                      <td className="p-4 text-text-secondary">{name}</td>
                      <td className="p-4 text-text-secondary font-mono text-sm">{email}</td>
                      <td className="p-4 text-text-secondary">{company}</td>
                      <td className="p-4 text-text-secondary truncate max-w-[220px]" title={message}>{message}</td>
                      <td className="p-4 text-text-secondary">{date}</td>
                      <td className="p-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          status === 'New' ? 'bg-cyber-green/20 text-cyber-green' :
                          status === 'Reviewed' ? 'bg-cyber-cyan/20 text-cyber-cyan' :
                          'bg-cyber-blue/20 text-cyber-blue'
                        }`}>
                          {status}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <button
                          type="button"
                          className="btn-secondary py-2 px-4"
                          onClick={(e) => { e.stopPropagation(); setSelected(sub); setEdit(sub); }}
                        >
                          View
                        </button>
                      </td>
                    </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Detail Modal */}
          {selected && (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-60">
              <div className="bg-dark-card border border-dark-border rounded-xl shadow-xl w-full max-w-3xl max-h-[85vh] overflow-hidden">
                <div className="flex items-center justify-between px-6 py-4 border-b border-dark-border">
                  <div>
                    <p className="text-text-muted text-sm">Lead</p>
                    <h3 className="text-lg font-semibold text-text-primary">{selected.form || selected.type || selected.payload?.type || 'Contact'}</h3>
                  </div>
                  <button
                    className="text-text-secondary hover:text-cyber-green transition-colors"
                    onClick={() => { setSelected(null); setEdit(null); }}
                    aria-label="Close"
                  >
                    ✕
                  </button>
                </div>
                <div className="p-6 space-y-4 overflow-y-auto">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-text-muted text-sm">Name</label>
                      <input
                        className="input-cyber w-full"
                        value={edit?.name || edit?.fullName || edit?.payload?.name || ''}
                        onChange={(e) => setEdit((prev: any) => ({ ...prev, name: e.target.value }))}
                      />
                    </div>
                    <div>
                      <label className="text-text-muted text-sm">Email</label>
                      <input
                        className="input-cyber w-full"
                        value={edit?.email || edit?.payload?.email || ''}
                        onChange={(e) => setEdit((prev: any) => ({ ...prev, email: e.target.value }))}
                      />
                    </div>
                    <div>
                      <label className="text-text-muted text-sm">Company</label>
                      <input
                        className="input-cyber w-full"
                        value={edit?.company || edit?.payload?.company || ''}
                        onChange={(e) => setEdit((prev: any) => ({ ...prev, company: e.target.value }))}
                      />
                    </div>
                    <div>
                      <label className="text-text-muted text-sm">Status</label>
                      <select
                        className="input-cyber w-full"
                        value={edit?.status || 'Received'}
                        onChange={(e) => setEdit((prev: any) => ({ ...prev, status: e.target.value }))}
                      >
                        <option>Received</option>
                        <option>New</option>
                        <option>Reviewed</option>
                        <option>Contacted</option>
                        <option>Closed</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-text-muted text-sm">Message</label>
                    <textarea
                      className="input-cyber w-full min-h-[120px]"
                      value={edit?.message || edit?.payload?.message || ''}
                      onChange={(e) => setEdit((prev: any) => ({ ...prev, message: e.target.value }))}
                    />
                  </div>

                  <div>
                    <label className="text-text-muted text-sm">Notes (internal)</label>
                    <textarea
                      className="input-cyber w-full min-h-[80px]"
                      value={edit?.notes || ''}
                      onChange={(e) => setEdit((prev: any) => ({ ...prev, notes: e.target.value }))}
                      placeholder="Add follow-up notes"
                    />
                  </div>

                  <div className="flex justify-between items-center text-sm text-text-muted">
                    <span>Received: {selected.receivedAt || selected.date || '-'}</span>
                    <div className="space-x-3">
                      <button
                        className="btn-secondary"
                        type="button"
                        onClick={() => setEdit(selected)}
                        disabled={saving}
                      >
                        Reset
                      </button>
                      <button
                        className="btn-primary"
                        type="button"
                        disabled={saving}
                        onClick={async () => {
                          if (!edit) return;
                          setSaving(true);
                          try {
                            const res = await fetch('/api/forms', {
                              method: 'PUT',
                              headers: { 'Content-Type': 'application/json' },
                              body: JSON.stringify({ id: selected.id, updates: edit }),
                            });
                            if (res.ok) {
                              await fetchSubs();
                              const updated = await res.json();
                              setSelected(updated);
                              setEdit(updated);
                            }
                          } catch (e) { console.error(e); }
                          finally { setSaving(false); }
                        }}
                      >
                        {saving ? 'Saving…' : 'Save changes'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
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
