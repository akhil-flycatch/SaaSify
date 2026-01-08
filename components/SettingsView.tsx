import React, { useState } from 'react';

const SettingsView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'notifications'>('profile');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      alert('Settings saved successfully!');
    }, 1000);
  };

  const tabs = [
    { id: 'profile', label: 'My Profile', icon: 'person' },
    { id: 'security', label: 'Security', icon: 'shield' },
    { id: 'notifications', label: 'Notifications', icon: 'notifications' },
  ];

  return (
    <div className="p-6 animate-in fade-in duration-500">
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Settings</h1>
          <p className="text-text-secondary text-sm">Manage your personal information and preferences</p>
        </div>

        <div className="flex items-center gap-1 border-b border-border-dark overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-6 py-4 text-sm font-bold transition-all border-b-2 whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-primary text-primary bg-primary/5'
                  : 'border-transparent text-slate-500 hover:text-white hover:bg-white/5'
              }`}
            >
              <span className="material-symbols-outlined text-lg">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        <div className="bg-card-dark rounded-2xl border border-border-dark overflow-hidden">
          <form onSubmit={handleSave} className="p-8 space-y-8">
            {activeTab === 'profile' && (
              <div className="space-y-6 animate-in slide-in-from-left-4 duration-300">
                <div className="flex items-center gap-6 pb-6 border-b border-white/5">
                  <div 
                    className="size-24 rounded-2xl bg-center bg-cover bg-no-repeat border-4 border-white/10 shadow-lg"
                    style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCboaxy-QEck6D30X7xVkQ22Sdwm3AxWyrNq3hN08OHA9oirK0F9l5cDPtW698mlKvMAdBuOFKfd3vieYtnASO3KU3w8s5Nosaa_hIa7HUOm4aiVzMO9L1iuoe8lNil3kwoERIWVZixelAEP-OvCYQKMMJxG4FndR6j5TZ51GFareHDuAQIqp4ajoHY8UWZgPFZVPJ1cL14EZOHt2iho1rfv1FAVydQmCVnoUy9mBJQIB5bwRlSCmEJp9ofB1i83xkx5ko-CwrnTHOR")' }}
                  >
                    <button type="button" className="absolute bottom-0 right-0 size-8 bg-primary rounded-lg flex items-center justify-center text-white border-2 border-card-dark translate-x-1 translate-y-1">
                      <span className="material-symbols-outlined text-sm">edit</span>
                    </button>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Profile Photo</h3>
                    <p className="text-sm text-text-secondary">JPG, GIF or PNG. Max size 2MB.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Full Name</label>
                    <input defaultValue="Jane Doe" type="text" className="w-full bg-background-dark border border-border-dark rounded-xl px-4 py-3 text-sm text-white focus:ring-primary focus:border-primary outline-none" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Email Address</label>
                    <input defaultValue="jane@saasify.com" type="email" className="w-full bg-background-dark border border-border-dark rounded-xl px-4 py-3 text-sm text-white focus:ring-primary focus:border-primary outline-none" />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Bio</label>
                    <textarea rows={3} defaultValue="Senior Product Designer and System Administrator for the SaaSify platform." className="w-full bg-background-dark border border-border-dark rounded-xl px-4 py-3 text-sm text-white focus:ring-primary focus:border-primary outline-none resize-none"></textarea>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-6 animate-in slide-in-from-left-4 duration-300">
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-white">Change Password</h3>
                  <div className="space-y-4 max-w-md">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Current Password</label>
                      <input type="password" placeholder="••••••••" className="w-full bg-background-dark border border-border-dark rounded-xl px-4 py-3 text-sm text-white focus:ring-primary focus:border-primary outline-none" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">New Password</label>
                      <input type="password" placeholder="••••••••" className="w-full bg-background-dark border border-border-dark rounded-xl px-4 py-3 text-sm text-white focus:ring-primary focus:border-primary outline-none" />
                    </div>
                  </div>
                </div>
                
                <div className="pt-6 border-t border-white/5 space-y-4">
                  <h3 className="text-lg font-bold text-white">Two-Factor Authentication</h3>
                  <div className="flex items-center justify-between p-4 bg-primary/5 rounded-xl border border-primary/20">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-primary">verified_user</span>
                      <div>
                        <p className="text-sm font-bold text-white">Secure your account</p>
                        <p className="text-xs text-slate-400">Two-factor authentication is currently disabled.</p>
                      </div>
                    </div>
                    <button type="button" className="px-4 py-2 bg-primary text-white text-xs font-bold rounded-lg hover:bg-blue-600 transition-colors">Enable</button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="space-y-6 animate-in slide-in-from-left-4 duration-300">
                <h3 className="text-lg font-bold text-white">Email Preferences</h3>
                <div className="space-y-4">
                  {[
                    { title: 'Security alerts', desc: 'Get notified about new logins and security updates.' },
                    { title: 'Payment notifications', desc: 'Receive emails for successful payments and invoices.' },
                    { title: 'System announcements', desc: 'Major updates and maintenance windows.' },
                    { title: 'Weekly analytics', desc: 'A summary of your platform performance every Monday.' },
                  ].map((item, i) => (
                    <label key={i} className="flex items-center justify-between p-4 hover:bg-white/5 rounded-xl transition-colors cursor-pointer border border-transparent hover:border-white/10">
                      <div className="max-w-md">
                        <p className="text-sm font-bold text-white">{item.title}</p>
                        <p className="text-xs text-slate-500">{item.desc}</p>
                      </div>
                      <div className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked={i < 2} className="sr-only peer" />
                        <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/40 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center justify-end gap-4 pt-6 border-t border-white/5">
              <button type="button" className="px-6 py-2.5 text-sm font-bold text-slate-400 hover:text-white transition-colors">Cancel</button>
              <button 
                type="submit" 
                disabled={isSaving}
                className="px-8 py-2.5 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:bg-blue-600 transition-all flex items-center gap-2"
              >
                {isSaving ? <span className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span> : null}
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SettingsView;