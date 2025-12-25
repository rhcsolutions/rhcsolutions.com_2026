'use client';
import { useState } from 'react';
import AdminShell from '@/components/admin/AdminShell';
import { FaUser, FaUserPlus, FaShieldAlt, FaTrash, FaEdit } from 'react-icons/fa';

export default function UsersManagement() {
  const [users] = useState([
    { id: 1, name: 'Admin User', email: 'admin@rhcsolutions.com', role: 'Administrator', status: 'Active', lastLogin: '2025-12-16' },
    { id: 2, name: 'Editor User', email: 'editor@rhcsolutions.com', role: 'Editor', status: 'Active', lastLogin: '2025-12-15' },
    { id: 3, name: 'Viewer User', email: 'viewer@rhcsolutions.com', role: 'Viewer', status: 'Active', lastLogin: '2025-12-14' },
  ]);

  const roles = [
    { name: 'Administrator', permissions: ['Full access', 'User management', 'Site settings', 'Analytics'], color: 'cyber-red' },
    { name: 'Editor', permissions: ['Content management', 'Media upload', 'Form submissions'], color: 'cyber-green' },
    { name: 'Viewer', permissions: ['View analytics', 'View content', 'Read-only access'], color: 'cyber-cyan' },
  ];

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
                      <button className="p-2 text-cyber-green hover:bg-cyber-green/20 rounded transition-colors">
                        <FaEdit />
                      </button>
                      <button className="p-2 text-cyber-red hover:bg-cyber-red/20 rounded transition-colors">
                        <FaTrash />
                      </button>
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
          {roles.map((role, idx) => (
            <div key={idx} className="card-cyber p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className={`text-xl font-bold text-${role.color}`}>{role.name}</h3>
                <FaShieldAlt className={`text-2xl text-${role.color}`} />
              </div>
              <ul className="space-y-2">
                {role.permissions.map((perm, pIdx) => (
                  <li key={pIdx} className="flex items-center space-x-2 text-text-secondary text-sm">
                    <div className={`w-2 h-2 bg-${role.color} rounded-full`} />
                    <span>{perm}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </AdminShell>
  );
}
