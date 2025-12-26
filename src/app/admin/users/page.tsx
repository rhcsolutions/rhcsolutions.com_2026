'use client';
import { useState, useEffect } from 'react';
import QRCodeDisplay from '@/components/QRCodeDisplay';
import AdminShell from '@/components/admin/AdminShell';
import { FaUser, FaUserPlus, FaShieldAlt, FaTrash, FaEdit, FaCopy, FaCheck } from 'react-icons/fa';

export default function UsersManagement() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [twoFAModalOpen, setTwoFAModalOpen] = useState(false);
  const [twoFAModalUser, setTwoFAModalUser] = useState<any | null>(null);
  const [twoFASecret, setTwoFASecret] = useState<string | null>(null);
  const [twoFAUri, setTwoFAUri] = useState<string | null>(null);
  const [otpInput, setOtpInput] = useState('');
  const [actionLoading, setActionLoading] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editModalUser, setEditModalUser] = useState<any | null>(null);
  const [editFormData, setEditFormData] = useState({ name: '', email: '', role: '', status: '' });
  const [passwordTab, setPasswordTab] = useState<'none' | 'set' | 'reset'>('none');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Fetch users on mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/cms/users');
        const data = await response.json();
        setUsers(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const openTwoFAModal = async (user: any) => {
    setTwoFAModalUser(user);
    setOtpInput('');
    try {
      const response = await fetch('/api/cms/users/2fa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: user.id }),
      });
      if (!response.ok) {
        const msg = await response.text();
        
        return;
      }
      const data = await response.json();
      setTwoFASecret(data.secret);
      setTwoFAUri(data.uri);
      setTwoFAModalOpen(true);
    } catch (error) {
      console.error('Error generating 2FA:', error);
      
    }
  };

  const verifyTwoFA = async () => {
    setActionLoading(true);
    try {
      const response = await fetch('/api/cms/users/2fa', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: twoFAModalUser.id, token: otpInput }),
      });
      if (response.ok) {
        
        setTwoFAModalOpen(false);
        setTwoFAModalUser(null);
        setTwoFASecret(null);
        setTwoFAUri(null);
        setOtpInput('');
        // Refresh users
        const usersResponse = await fetch('/api/cms/users');
        const usersData = await usersResponse.json();
        setUsers(Array.isArray(usersData) ? usersData : []);
      } else {
        const msg = await response.text();
        
      }
    } catch (error) {
      console.error('Error verifying 2FA:', error);
      
    } finally {
      setActionLoading(false);
    }
  };

  const openEditModal = (user: any) => {
    setEditModalUser(user);
    setEditFormData({ name: user.name, email: user.email, role: user.role, status: user.status });
    setPasswordTab('none');
    setNewPassword('');
    setConfirmPassword('');
    setEditModalOpen(true);
  };

  const handleEditSave = async () => {
    setActionLoading(true);
    try {
      const response = await fetch(`/api/cms/users?id=${editModalUser.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editFormData),
      });
      if (response.ok) {
        
        setEditModalOpen(false);
        setEditModalUser(null);
        const usersResponse = await fetch('/api/cms/users');
        const usersData = await usersResponse.json();
        setUsers(Array.isArray(usersData) ? usersData : []);
      } else {
        
      }
    } catch (error) {
      console.error('Error updating user:', error);
      
    } finally {
      setActionLoading(false);
    }
  };

  const sendPasswordReset = async () => {
    if (!editModalUser?.email) {
      
      return;
    }
    
    setActionLoading(true);
    try {
      const response = await fetch('/api/cms/users/reset/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: editModalUser.email }),
      });
      if (response.ok) {
        
        setPasswordTab('none');
      } else {
        
      }
    } catch (error) {
      console.error('Error sending reset email:', error);
      
    } finally {
      setActionLoading(false);
    }
  };

  const setPasswordDirectly = async () => {
    if (newPassword.length < 6) {
      
      return;
    }
    
    if (newPassword !== confirmPassword) {
      
      return;
    }

    setActionLoading(true);
    try {
      const response = await fetch(`/api/cms/users?id=${editModalUser.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: newPassword }),
      });
      if (response.ok) {
        
        setNewPassword('');
        setConfirmPassword('');
        setPasswordTab('none');
      } else {
        
      }
    } catch (error) {
      console.error('Error setting password:', error);
      
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this user?')) {
      try {
        const response = await fetch(`/api/cms/users?id=${id}`, { method: 'DELETE' });
        if (response.ok) {
          
          setUsers(users.filter(u => u.id !== id));
        } else {
          
        }
      } catch (error) {
        console.error('Error deleting user:', error);
        
      }
    }
  };

  if (loading) return <AdminShell title="Users Management"><div className="p-8 text-text-primary">Loading users...</div></AdminShell>;

  return (
    <AdminShell title="Users Management">
      <div className="p-6 space-y-8">
        <div>
          <h1 className="heading-xl text-gradient mb-2 flex items-center gap-3">
            <FaUser /> Users Management
          </h1>
          <p className="text-text-secondary">Manage administrator and user accounts</p>
        </div>

        <div className="card-cyber p-6">
          <h2 className="heading-lg text-gradient mb-6">Users List</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-dark-border">
                <tr>
                  <th className="px-4 py-3 text-left text-text-primary font-semibold">Name</th>
                  <th className="px-4 py-3 text-left text-text-primary font-semibold">Email</th>
                  <th className="px-4 py-3 text-left text-text-primary font-semibold">Role</th>
                  <th className="px-4 py-3 text-left text-text-primary font-semibold">Status</th>
                  <th className="px-4 py-3 text-left text-text-primary font-semibold">2FA</th>
                  <th className="px-4 py-3 text-left text-text-primary font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b border-dark-border hover:bg-dark-lighter transition-colors">
                    <td className="px-4 py-3 text-text-primary">{user.name}</td>
                    <td className="px-4 py-3 text-text-secondary">{user.email}</td>
                    <td className="px-4 py-3 text-cyber-green font-medium uppercase text-xs">{user.role}</td>
                    <td className="px-4 py-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${user.status === 'active' ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-red-500/20 text-red-400 border border-red-500/30'}`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => openTwoFAModal(user)}
                        className="btn-outline text-sm py-2 px-3 flex items-center gap-2 whitespace-nowrap"
                      >
                        <FaShieldAlt className="text-sm" /> Setup
                      </button>
                    </td>
                    <td className="px-4 py-3 flex gap-2">
                      <button
                        onClick={() => openEditModal(user)}
                        className="btn-outline text-sm py-2 px-3 flex items-center gap-2"
                      >
                        <FaEdit className="text-sm" /> Edit
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="relative border-2 border-red-500/50 text-red-400 px-3 py-2 rounded-lg overflow-hidden transition-all duration-300 inline-flex items-center justify-center gap-2 text-sm hover:bg-red-500/10"
                      >
                        <FaTrash className="text-sm" /> Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 2FA Modal */}
      {twoFAModalOpen && twoFAModalUser && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="card-cyber p-8 max-w-md w-full border border-dark-border">
            <h2 className="heading-lg text-gradient mb-2">Setup Two-Factor Auth</h2>
            <p className="text-text-secondary mb-6">User: <span className="text-text-primary font-semibold">{twoFAModalUser.name}</span></p>
            
            {twoFAUri && (
              <div className="mb-6 p-4 bg-dark-lighter border border-dark-border rounded-lg">
                <p className="text-sm text-text-secondary mb-3">Scan with authenticator app:</p>
                <QRCodeDisplay value={twoFAUri} size={200} />
                <div className="mt-4 p-3 bg-dark border border-dark-border rounded break-all text-xs text-text-muted font-mono">
                  Secret: {twoFASecret}
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(twoFASecret || '');
                    }}
                    className="ml-2 text-cyber-green hover:text-cyber-cyan transition-colors inline-flex items-center gap-1"
                  >
                    <FaCopy className="text-xs" />
                  </button>
                </div>
              </div>
            )}

            <input
              type="text"
              placeholder="Enter 6-digit code"
              value={otpInput}
              onChange={(e) => setOtpInput(e.target.value)}
              className="w-full px-4 py-3 bg-dark border-2 border-dark-border rounded-lg mb-4 text-center text-lg tracking-widest text-text-primary font-mono focus:border-cyber-green focus:outline-none"
              maxLength={6}
            />

            <button
              onClick={verifyTwoFA}
              disabled={actionLoading || otpInput.length !== 6}
              className="w-full btn-primary mb-2 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {actionLoading ? 'Verifying...' : 'Verify & Enable'}
            </button>

            <button
              onClick={() => {
                setTwoFAModalOpen(false);
                setTwoFAModalUser(null);
              }}
              className="w-full btn-outline py-3"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {editModalOpen && editModalUser && (
        <EditUserModal
          user={editModalUser}
          formData={editFormData}
          setFormData={setEditFormData}
          onSave={handleEditSave}
          onClose={() => {
            setEditModalOpen(false);
            setEditModalUser(null);
          }}
          actionLoading={actionLoading}
          passwordTab={passwordTab}
          setPasswordTab={setPasswordTab}
          newPassword={newPassword}
          setNewPassword={setNewPassword}
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
          onSetPassword={setPasswordDirectly}
          onResetPassword={sendPasswordReset}
        />
      )}
    </AdminShell>
  );
}

interface EditUserModalProps {
  user: any;
  formData: any;
  setFormData: (data: any) => void;
  onSave: () => void;
  onClose: () => void;
  actionLoading: boolean;
  passwordTab: 'none' | 'set' | 'reset';
  setPasswordTab: (tab: 'none' | 'set' | 'reset') => void;
  newPassword: string;
  setNewPassword: (pwd: string) => void;
  confirmPassword: string;
  setConfirmPassword: (pwd: string) => void;
  onSetPassword: () => void;
  onResetPassword: () => void;
}

function EditUserModal({
  user,
  formData,
  setFormData,
  onSave,
  onClose,
  actionLoading,
  passwordTab,
  setPasswordTab,
  newPassword,
  setNewPassword,
  confirmPassword,
  setConfirmPassword,
  onSetPassword,
  onResetPassword,
}: EditUserModalProps) {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="card-cyber p-8 max-w-md w-full max-h-[90vh] overflow-y-auto border border-dark-border">
        <h2 className="heading-lg text-gradient mb-6">Edit User</h2>

        {/* Basic User Info */}
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-semibold text-text-primary mb-2">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 bg-dark border-2 border-dark-border rounded-lg text-text-primary focus:border-cyber-green focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-text-primary mb-2">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2 bg-dark border-2 border-dark-border rounded-lg text-text-primary focus:border-cyber-green focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-text-primary mb-2">Role</label>
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="w-full px-4 py-2 bg-dark border-2 border-dark-border rounded-lg text-text-primary focus:border-cyber-green focus:outline-none"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-text-primary mb-2">Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full px-4 py-2 bg-dark border-2 border-dark-border rounded-lg text-text-primary focus:border-cyber-green focus:outline-none"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>

        {/* Password Management Section */}
        <div className="border-t border-dark-border pt-6">
          <h3 className="heading-md text-gradient mb-4">Password Management</h3>
          
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setPasswordTab('set')}
              className={`flex-1 px-4 py-2 rounded-lg text-sm font-semibold transition ${
                passwordTab === 'set'
                  ? 'bg-gradient-to-r from-cyber-green to-cyber-cyan text-dark-card'
                  : 'btn-outline'
              }`}
            >
              Set Password
            </button>
            <button
              onClick={() => setPasswordTab('reset')}
              className={`flex-1 px-4 py-2 rounded-lg text-sm font-semibold transition ${
                passwordTab === 'reset'
                  ? 'bg-gradient-to-r from-cyber-green to-cyber-cyan text-dark-card'
                  : 'btn-outline'
              }`}
            >
              Reset Email
            </button>
          </div>

          {/* Set Password Form */}
          {passwordTab === 'set' && (
            <div className="space-y-3 mb-4">
              <div>
                <label className="block text-sm font-semibold text-text-primary mb-2">New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Minimum 6 characters"
                  className="w-full px-4 py-2 bg-dark border-2 border-dark-border rounded-lg text-text-primary focus:border-cyber-green focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-text-primary mb-2">Confirm Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm password"
                  className="w-full px-4 py-2 bg-dark border-2 border-dark-border rounded-lg text-text-primary focus:border-cyber-green focus:outline-none"
                />
              </div>

              <button
                onClick={onSetPassword}
                disabled={actionLoading || !newPassword || !confirmPassword}
                className="w-full btn-primary py-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {actionLoading ? 'Setting...' : 'Set Password'}
              </button>
            </div>
          )}

          {/* Send Reset Email Form */}
          {passwordTab === 'reset' && (
            <div className="space-y-3 mb-4">
              <p className="text-sm text-text-secondary">
                Send a password reset email to: <span className="text-text-primary font-semibold">{user.email}</span>
              </p>
              <button
                onClick={onResetPassword}
                disabled={actionLoading}
                className="w-full btn-outline py-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {actionLoading ? 'Sending...' : 'Send Reset Email'}
              </button>
            </div>
          )}
        </div>

        {/* Modal Actions */}
        <div className="flex gap-2 mt-6">
          <button
            onClick={onSave}
            disabled={actionLoading}
            className="flex-1 btn-primary py-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {actionLoading ? 'Saving...' : 'Save Changes'}
          </button>
          <button
            onClick={onClose}
            className="flex-1 btn-outline py-3"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
