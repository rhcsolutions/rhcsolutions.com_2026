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

  if (loading) return <AdminShell title="Users Management"><div>Loading users...</div></AdminShell>;

  return (
    <AdminShell title="Users Management">
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
          <FaUser className="text-blue-500" />
          Users Management
        </h1>

        <div className="grid gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Users List</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-100 border-b">
                  <tr>
                    <th className="px-4 py-2 text-left">Name</th>
                    <th className="px-4 py-2 text-left">Email</th>
                    <th className="px-4 py-2 text-left">Role</th>
                    <th className="px-4 py-2 text-left">Status</th>
                    <th className="px-4 py-2 text-left">2FA</th>
                    <th className="px-4 py-2 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-2">{user.name}</td>
                      <td className="px-4 py-2">{user.email}</td>
                      <td className="px-4 py-2 text-blue-600 font-medium">{user.role}</td>
                      <td className="px-4 py-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="px-4 py-2">
                        <button
                          onClick={() => openTwoFAModal(user)}
                          className="bg-purple-500 text-white px-3 py-1 rounded hover:bg-purple-600 flex items-center gap-1"
                        >
                          <FaShieldAlt /> Setup
                        </button>
                      </td>
                      <td className="px-4 py-2 flex gap-2">
                        <button
                          onClick={() => openEditModal(user)}
                          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 flex items-center gap-1"
                        >
                          <FaEdit /> Edit
                        </button>
                        <button
                          onClick={() => handleDelete(user.id)}
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 flex items-center gap-1"
                        >
                          <FaTrash /> Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* 2FA Modal */}
      {twoFAModalOpen && twoFAModalUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">Setup Two-Factor Authentication</h2>
            <p className="text-gray-600 mb-4">For: {twoFAModalUser.name}</p>
            
            {twoFAUri && (
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">Scan with your authenticator app:</p>
                <QRCodeDisplay value={twoFAUri} size={200} />
                <div className="mt-4 p-2 bg-gray-100 rounded break-all text-xs">
                  Secret: {twoFASecret}
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(twoFASecret || '');
                      
                    }}
                    className="ml-2 text-blue-500 hover:text-blue-700"
                  >
                    <FaCopy />
                  </button>
                </div>
              </div>
            )}

            <input
              type="text"
              placeholder="Enter 6-digit code"
              value={otpInput}
              onChange={(e) => setOtpInput(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded mb-4 text-center text-lg tracking-widest"
              maxLength={6}
            />

            <button
              onClick={verifyTwoFA}
              disabled={actionLoading || otpInput.length !== 6}
              className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 disabled:bg-gray-400"
            >
              {actionLoading ? 'Verifying...' : 'Verify & Enable'}
            </button>

            <button
              onClick={() => {
                setTwoFAModalOpen(false);
                setTwoFAModalUser(null);
              }}
              className="w-full mt-2 bg-gray-300 text-gray-800 py-2 rounded hover:bg-gray-400"
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">Edit User</h2>

        {/* Basic User Info */}
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Role</label>
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>

        {/* Password Management Section */}
        <div className="border-t pt-4">
          <h3 className="text-lg font-semibold mb-3">Password Management</h3>
          
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setPasswordTab('set')}
              className={`flex-1 px-3 py-2 rounded text-sm font-medium transition ${
                passwordTab === 'set'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Set Password
            </button>
            <button
              onClick={() => setPasswordTab('reset')}
              className={`flex-1 px-3 py-2 rounded text-sm font-medium transition ${
                passwordTab === 'reset'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Send Reset Email
            </button>
          </div>

          {/* Set Password Form */}
          {passwordTab === 'set' && (
            <div className="space-y-3 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Minimum 6 characters"
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm password"
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                />
              </div>

              <button
                onClick={onSetPassword}
                disabled={actionLoading || !newPassword || !confirmPassword}
                className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 disabled:bg-gray-400 font-medium"
              >
                {actionLoading ? 'Setting...' : 'Set Password'}
              </button>
            </div>
          )}

          {/* Send Reset Email Form */}
          {passwordTab === 'reset' && (
            <div className="space-y-3 mb-4">
              <p className="text-sm text-gray-600">
                Send a password reset email to: <strong>{user.email}</strong>
              </p>
              <button
                onClick={onResetPassword}
                disabled={actionLoading}
                className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 disabled:bg-gray-400 font-medium"
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
            className="flex-1 bg-blue-500 text-white py-2 rounded hover:bg-blue-600 disabled:bg-gray-400 font-medium"
          >
            {actionLoading ? 'Saving...' : 'Save Changes'}
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-gray-300 text-gray-800 py-2 rounded hover:bg-gray-400 font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
