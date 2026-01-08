import React from 'react';
import { ViewType } from '../App.tsx';

const NavItem: React.FC<{ 
  icon: string, 
  label: string, 
  isActive?: boolean, 
  badge?: string,
  onClick?: () => void
}> = ({ icon, label, isActive, badge, onClick }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group ${
      isActive 
        ? 'bg-primary text-white shadow-lg shadow-primary/20' 
        : 'text-text-secondary hover:bg-white/5 hover:text-white'
    }`}
  >
    <span className={`material-symbols-outlined ${isActive ? 'material-symbols-fill' : 'group-hover:scale-110 transition-transform'}`}>
      {icon}
    </span>
    <span className={`text-sm ${isActive ? 'font-semibold' : 'font-medium'}`}>{label}</span>
    {badge && (
      <span className="ml-auto bg-primary/20 text-primary text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
        {badge}
      </span>
    )}
  </button>
);

interface SidebarProps {
  activeView: ViewType;
  onActiveViewChange: (view: ViewType) => void;
  onLogout: () => void;
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, onActiveViewChange, onLogout, isOpen, onClose }) => {
  return (
    <>
      <div 
        className={`fixed inset-0 bg-background-dark/80 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-72 flex flex-col border-r border-border-dark bg-card-dark h-full shrink-0 transition-transform duration-300 ease-in-out lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full p-4 justify-between">
          <div className="flex flex-col gap-8">
            <div className="flex items-center justify-between px-2 pt-2">
              <div className="flex items-center gap-3 cursor-pointer" onClick={() => { onActiveViewChange('dashboard'); onClose(); }}>
                <div className="bg-primary/10 p-2 rounded-lg">
                  <div className="bg-primary size-6 rounded-md flex items-center justify-center text-white">
                    <span className="material-symbols-outlined text-lg">grid_view</span>
                  </div>
                </div>
                <div className="flex flex-col text-left">
                  <h1 className="text-white text-lg font-bold leading-none tracking-tight">SaaSify</h1>
                  <p className="text-text-secondary text-xs font-medium">Enterprise Suite</p>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="lg:hidden p-2 text-slate-500 hover:text-white transition-colors"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <nav className="flex flex-col gap-1.5">
              <p className="px-3 text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Main Menu</p>
              <NavItem icon="dashboard" label="Dashboard" isActive={activeView === 'dashboard'} onClick={() => onActiveViewChange('dashboard')} />
              <NavItem icon="analytics" label="Analytics" isActive={activeView === 'analytics'} onClick={() => onActiveViewChange('analytics')} />
              <NavItem icon="group" label="Users" badge="NEW" isActive={activeView === 'users'} onClick={() => onActiveViewChange('users')} />
              <NavItem icon="description" label="Reports" isActive={activeView === 'reports'} onClick={() => onActiveViewChange('reports')} />
              <NavItem icon="account_balance_wallet" label="Billing" isActive={activeView === 'billing'} onClick={() => onActiveViewChange('billing')} />
            </nav>
          </div>

          <div className="flex flex-col gap-1 border-t border-border-dark pt-4">
            <NavItem icon="settings" label="Settings" isActive={activeView === 'settings'} onClick={() => onActiveViewChange('settings')} />
            <div className="mt-2 flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5 group hover:bg-white/10 transition-colors">
              <div 
                className="bg-center bg-no-repeat bg-cover rounded-full size-10 shrink-0 border-2 border-gray-700 shadow-sm"
                style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCboaxy-QEck6D30X7xVkQ22Sdwm3AxWyrNq3hN08OHA9oirK0F9l5cDPtW698mlKvMAdBuOFKfd3vieYtnASO3KU3w8s5Nosaa_hIa7HUOm4aiVzMO9L1iuoe8lNil3kwoERIWVZixelAEP-OvCYQKMMJxG4FndR6j5TZ51GFareHDuAQIqp4ajoHY8UWZgPFZVPJ1cL14EZOHt2iho1rfv1FAVydQmCVnoUy9mBJQIB5bwRlSCmEJp9ofB1i83xkx5ko-CwrnTHOR")' }}
              />
              <div className="flex-1 flex flex-col overflow-hidden text-left">
                <p className="text-white text-sm font-bold truncate">Jane Doe</p>
                <p className="text-text-secondary text-xs truncate">jane@saasify.com</p>
              </div>
              <button onClick={onLogout} className="ml-auto text-slate-400 hover:text-red-500 transition-colors p-1" title="Logout">
                <span className="material-symbols-outlined text-[20px]">logout</span>
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;