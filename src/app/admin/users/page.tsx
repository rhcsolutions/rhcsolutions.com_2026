'use client';
import { useState, useEffect } from 'react';
import AdminShell from '@/components/admin/AdminShell';
import { FaUser, FaUserPlus, FaShieldAlt, FaTrash, FaEdit } from 'react-icons/fa';

export default function UsersManagement() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [twoFAModalOpen, setTwoFAModalOpen] = useState(false);
  const [twoFAModalUser, setTwoFAModalUser] = useState<any | null>(null);
  const [twoFASecret, setTwoFASecret] = useState<string | null>(null);
  const [twoFAUri, setTwoFAUri] = useState<string | null>(null);
  const [otpInput, setOtpInput] = useState('');
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => { fetchUsers(); }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/cms/users');
      if (res.ok) setUsers(await res.json());
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete user?')) return;
    await fetch(`/api/cms/users?id=${id}`, { method: 'DELETE' });
    fetchUsers();
  };

  const handleAdd = async () => {
    const name = prompt('Name');
    const email = prompt('Email');
    if (!name || !email) return;
    await fetch('/api/cms/users', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name, email, role: 'Editor', status: 'Active' }) });
    fetchUsers();
  };

  const roles = [
    { name: 'Administrator', permissions: ['Full access', 'User management', 'Site settings', 'Analytics'], color: 'cyber-red' },
    { name: 'Editor', permissions: ['Content management', 'Media upload', 'Form submissions'], color: 'cyber-green' },
    { name: 'Viewer', permissions: ['View analytics', 'View content', 'Read-only access'], color: 'cyber-cyan' },
  ];

  const open2FAModal = async (user: any) => {
    setTwoFAModalUser(user);
    setTwoFAModalOpen(true);
    setTwoFASecret(null);
    setTwoFAUri(null);
    setOtpInput('');
  };

  const generateSecret = async () => {
    if (!twoFAModalUser) return;
    setActionLoading(true);
    try {
      const res = await fetch('/api/cms/users/2fa', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: String(twoFAModalUser.id) }) });
      if (res.ok) {
        const data = await res.json();
        setTwoFASecret(data.secret || null);
        setTwoFAUri(data.uri || null);
      } else {
        alert('Failed to generate secret');
      }
    } catch (e) { console.error(e); alert('Error'); }
    finally { setActionLoading(false); }
  };

  const verifyAndEnable = async () => {
    if (!twoFAModalUser) return;
    setActionLoading(true);
    try {
      const res = await fetch('/api/cms/users/2fa', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: String(twoFAModalUser.id), token: otpInput }) });
      if (res.ok) {
        alert('2FA enabled');
        setTwoFAModalOpen(false);
        fetchUsers();
      } else {
        const d = await res.json();
        alert('Verification failed: ' + (d?.error || 'invalid'));
      }
    } catch (e) { console.error(e); alert('Error'); }
    finally { setActionLoading(false); }
  };

  const disable2FA = async (id: string) => {
    if (!confirm('Disable 2FA for this user?')) return;
    try {
      const res = await fetch(`/api/cms/users/2fa?id=${id}`, { method: 'DELETE' });
      if (res.ok) { alert('2FA disabled'); fetchUsers(); }
      else { alert('Failed to disable 2FA'); }
    } catch (e) { console.error(e); alert('Error'); }
  };

  return (
    <AdminShell title="Users Management">
      <div className="mb-8">
        <h1 className="heading-xl text-gradient mb-2">Users & Roles</h1>
        <p className="text-text-secondary">Manage user accounts and permissions</p>
      </div>

      {/* Quick Actions */}
      <div className="flex space-x-4 mb-8">
        <button className="btn-primary flex items-center space-x-2">
          <FaUserPlus />
          <span>Add New User</span>
        </button>
        <button className="btn-secondary flex items-center space-x-2">
          <FaShieldAlt />
          <span>Manage Roles</span>
        </button>
      </div>

      {/* Users Table */}
      <div className="card-cyber overflow-hidden mb-8">
        <div className="p-6 border-b border-dark-border">
          <h2 className="text-xl font-bold text-text-primary">All Users</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-dark-lighter">
              <tr>
                <th className="text-left p-4 text-text-primary font-semibold">Name</th>
                <th className="text-left p-4 text-text-primary font-semibold">Email</th>
                <th className="text-left p-4 text-text-primary font-semibold">Role</th>
                <th className="text-left p-4 text-text-primary font-semibold">Status</th>
                <th className="text-left p-4 text-text-primary font-semibold">Last Login</th>
                <th className="text-right p-4 text-text-primary font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-t border-dark-border hover:bg-dark-lighter transition-colors">
                  <td className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-cyber-green to-cyber-cyan rounded-full flex items-center justify-center">
                        <FaUser className="text-dark" />
                      </div>
                      <span className="text-text-primary font-semibold">{user.name}</span>
                    </div>
                  </td>
                  <td className="p-4 text-text-secondary font-mono text-sm">{user.email}</td>
                  <td className="p-4">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-cyber-green/20 text-cyber-green">
                      {user.role}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-cyber-cyan/20 text-cyber-cyan">
                      {user.status}
                    </span>
                  </td>
                  <td className="p-4 text-text-secondary text-sm">{user.lastLogin}</td>
                  <td className="p-4">
                    <div className="flex items-center justify-end space-x-2">
                      <button onClick={() => open2FAModal(user)} className="px-3 py-1 bg-dark-card rounded text-sm">Manage 2FA</button>
                      <button className="p-2 text-cyber-green hover:bg-cyber-green/20 rounded transition-colors">
                        <FaEdit />
                      </button>
                      <button className="p-2 text-cyber-red hover:bg-cyber-red/20 rounded transition-colors">
                        <FaTrash />
                      </button>
                      {user.twoFAEnabled ? (
                        <button onClick={() => disable2FA(String(user.id))} className="p-2 text-yellow-400 hover:bg-yellow-400/10 rounded transition-colors">Disable 2FA</button>
                      ) : null}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Roles Grid */}
      <div>
        <h2 className="heading-md text-gradient mb-6">Roles & Permissions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        </div>
      </div>
      <TwoFAModal open={twoFAModalOpen} onClose={() => setTwoFAModalOpen(false)} user={twoFAModalUser} secret={twoFASecret} uri={twoFAUri} otp={otpInput} setOtp={setOtpInput} onGenerate={generateSecret} onVerify={verifyAndEnable} loading={actionLoading} />
    </AdminShell>
  );
}

function TwoFAModal({ open, onClose, user, secret, uri, otp, setOtp, onGenerate, onVerify, loading }:
  { open: boolean; onClose: () => void; user: any; secret: string | null; uri: string | null; otp: string; setOtp: (v: string) => void; onGenerate: () => void; onVerify: () => void; loading: boolean }) {
  if (!open || !user) return null;
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-dark border border-cyber-green rounded-lg w-full max-w-2xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">Manage 2FA — {user.name}</h3>
          <button onClick={onClose} className="text-text-secondary">Close</button>
        </div>
        <div className="space-y-4">
          <p className="text-text-secondary">Generate a TOTP secret and scan with Google Authenticator or similar.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-text-muted">Secret</label>
              <div className="p-3 bg-dark-card rounded mt-1 break-all">{secret || '—'}</div>
            </div>
            <div>
              <label className="text-sm text-text-muted">Provisioning URI</label>
              <div className="p-3 bg-dark-card rounded mt-1 break-all">{uri || '—'}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={onGenerate} disabled={loading} className="btn-primary">Generate Secret</button>
            <input value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="Enter code from app" className="bg-dark-card border border-dark-border rounded px-3 py-2" />
            <button onClick={onVerify} disabled={loading} className="btn-secondary">Verify & Enable</button>
          </div>
        </div>
      </div>
    </div>
  );
}

