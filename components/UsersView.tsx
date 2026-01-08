import React, { useState } from 'react';
import { MOCK_USERS } from '../constants';
import { User } from '../types';

const StatusBadge: React.FC<{ status: User['status'] }> = ({ status }) => {
  const styles = {
    Active: 'bg-emerald-500/10 text-emerald-500',
    Inactive: 'bg-slate-500/10 text-slate-500',
    Pending: 'bg-amber-500/10 text-amber-500',
  };

  return (
    <span className={`px-2 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider ${styles[status]}`}>
      {status}
    </span>
  );
};

const RoleBadge: React.FC<{ role: User['role'] }> = ({ role }) => {
  const styles = {
    Admin: 'bg-primary/10 text-primary',
    Editor: 'bg-purple-500/10 text-purple-500',
    Viewer: 'bg-slate-500/10 text-slate-400',
    Billing: 'bg-orange-500/10 text-orange-500',
  };

  return (
    <span className={`px-2 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider ${styles[role]}`}>
      {role}
    </span>
  );
};

const UsersView: React.FC = () => {
  const [users, setUsers] = useState<User[]>(MOCK_USERS);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'Viewer' as User['role']
  });

  const openAddModal = () => {
    setEditingUser(null);
    setFormData({ name: '', email: '', role: 'Viewer' });
    setIsModalOpen(true);
  };

  const openEditModal = (user: User) => {
    setEditingUser(user);
    setFormData({ name: user.name, email: user.email, role: user.role });
    setIsModalOpen(true);
  };

  const handleSaveUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    if (editingUser) {
      // Update existing user
      setUsers(users.map(u => u.id === editingUser.id ? { 
        ...u, 
        name: formData.name, 
        email: formData.email, 
        role: formData.role 
      } : u));
    } else {
      // Add new user
      const newUser: User = {
        id: (Math.max(0, ...users.map(u => parseInt(u.id))) + 1).toString(),
        name: formData.name,
        email: formData.email,
        role: formData.role,
        status: 'Active',
        lastActive: 'Just now',
        avatar: `https://i.pravatar.cc/150?u=${encodeURIComponent(formData.email)}`
      };
      setUsers([newUser, ...users]);
    }
    
    setIsModalOpen(false);
  };

  const handleDeleteUser = (id: string) => {
    if (confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(u => u.id !== id));
    }
  };

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 animate-in fade-in duration-500">
      <div className="max-w-[1600px] mx-auto space-y-6">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white">User Management</h1>
            <p className="text-text-secondary text-sm">Manage team members and their access permissions</p>
          </div>
          <button 
            onClick={openAddModal}
            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-primary text-white rounded-xl font-bold hover:bg-blue-600 transition-all shadow-lg shadow-primary/20"
          >
            <span className="material-symbols-outlined text-lg">person_add</span>
            Add New User
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between bg-card-dark p-4 rounded-xl border border-border-dark">
          <div className="flex flex-1 items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-xl">search</span>
              <input 
                type="text"
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-background-dark border border-border-dark rounded-lg text-sm text-white focus:ring-primary focus:border-primary outline-none transition-all"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button title="Export" className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg border border-border-dark transition-all">
              <span className="material-symbols-outlined text-xl">file_download</span>
            </button>
          </div>
        </div>

        <div className="bg-card-dark rounded-xl border border-border-dark overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-white/5 border-b border-border-dark">
                  <th className="py-4 px-6 text-[11px] font-bold text-slate-500 uppercase tracking-widest">User</th>
                  <th className="py-4 px-6 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Role</th>
                  <th className="py-4 px-6 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Status</th>
                  <th className="py-4 px-6 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Last Active</th>
                  <th className="py-4 px-6 text-[11px] font-bold text-slate-500 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <tr key={user.id} className="group hover:bg-white/[0.02] transition-colors">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <img src={user.avatar} className="size-10 rounded-full border border-white/10 object-cover bg-slate-800" />
                          <div className="min-w-0">
                            <p className="text-sm font-bold text-white group-hover:text-primary transition-colors truncate">{user.name}</p>
                            <p className="text-xs text-text-secondary truncate">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6"><RoleBadge role={user.role} /></td>
                      <td className="py-4 px-6"><StatusBadge status={user.status} /></td>
                      <td className="py-4 px-6 text-xs text-slate-400 font-medium">{user.lastActive}</td>
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => openEditModal(user)} className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-all" title="Edit">
                            <span className="material-symbols-outlined text-lg">edit</span>
                          </button>
                          <button onClick={() => handleDeleteUser(user.id)} className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all" title="Delete">
                            <span className="material-symbols-outlined text-lg">delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan={5} className="py-12 text-center text-text-secondary italic">No users found.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background-dark/80 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => setIsModalOpen(false)}>
          <div className="bg-card-dark w-full max-w-md rounded-2xl border border-border-dark shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 border-b border-border-dark flex items-center justify-between">
              <h2 className="text-xl font-bold">{editingUser ? 'Edit User' : 'Add New User'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white"><span className="material-symbols-outlined">close</span></button>
            </div>
            <form onSubmit={handleSaveUser} className="p-6 space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Full Name</label>
                <input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-background-dark border border-border-dark rounded-lg px-4 py-2.5 text-sm text-white focus:ring-primary focus:border-primary outline-none" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Email Address</label>
                <input type="email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full bg-background-dark border border-border-dark rounded-lg px-4 py-2.5 text-sm text-white focus:ring-primary focus:border-primary outline-none" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Assigned Role</label>
                <select value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value as User['role']})} className="w-full bg-background-dark border border-border-dark rounded-lg px-4 py-2.5 text-sm text-white focus:ring-primary focus:border-primary outline-none">
                  <option value="Viewer">Viewer</option>
                  <option value="Editor">Editor</option>
                  <option value="Billing">Billing</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>
              <div className="pt-4 flex gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 px-4 py-2.5 bg-white/5 hover:bg-white/10 text-white rounded-xl font-bold border border-border-dark">Cancel</button>
                <button type="submit" className="flex-1 px-4 py-2.5 bg-primary hover:bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-primary/20">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersView;