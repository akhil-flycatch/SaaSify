import React, { useState, useRef, useEffect } from 'react';
import { ViewType } from '../App.tsx';
import { MOCK_NOTIFICATIONS } from '../constants.ts';
import DatePicker from './DatePicker.tsx';

interface HeaderProps {
  activeView: ViewType;
  dateRange: string;
  onDateRangeChange: (range: string) => void;
  onToggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ activeView, dateRange, onDateRangeChange, onToggleSidebar }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchVal, setSearchVal] = useState('');
  const notificationRef = useRef<HTMLDivElement>(null);

  const viewLabels: Record<ViewType, string> = {
    dashboard: 'Dashboard',
    analytics: 'Analytics',
    users: 'Users',
    reports: 'Reports',
    billing: 'Billing',
    settings: 'Settings'
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && searchVal.trim()) {
      alert(`Searching for "${searchVal}" in ${viewLabels[activeView]}...`);
      setSearchVal('');
    }
  };

  return (
    <header className="h-18 px-6 py-4 flex items-center justify-between border-b border-border-dark bg-background-dark/80 backdrop-blur-md sticky top-0 z-20">
      <div className="flex items-center gap-2">
        <button 
          onClick={onToggleSidebar}
          className="lg:hidden p-2 -ml-2 text-slate-500 hover:text-white transition-colors"
        >
          <span className="material-symbols-outlined">menu</span>
        </button>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-text-secondary font-medium hidden sm:inline">Overview</span>
          <span className="material-symbols-outlined text-base text-slate-400 hidden sm:inline">chevron_right</span>
          <span className="text-white font-bold bg-white/10 px-2 py-0.5 rounded text-xs uppercase tracking-tight">{viewLabels[activeView]}</span>
        </div>
      </div>

      <div className="flex items-center gap-3 sm:gap-4">
        <div className="hidden md:flex items-center w-64 lg:w-80 h-10 rounded-lg bg-card-dark border border-transparent focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/20 transition-all overflow-hidden">
          <div className="pl-3 pr-2 text-slate-400">
            <span className="material-symbols-outlined text-[20px]">search</span>
          </div>
          <input 
            className="w-full bg-transparent border-none text-sm text-white placeholder-slate-500 focus:ring-0 px-0 h-full" 
            placeholder={`Search ${activeView}...`} 
            type="text" 
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
            onKeyDown={handleSearch}
          />
          <div className="pr-3 text-slate-400 text-xs border-l border-white/10 pl-2 hidden lg:block uppercase font-bold tracking-tighter">Enter</div>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-3">
          <DatePicker dateRange={dateRange} onDateRangeChange={onDateRangeChange} />

          <div className="relative" ref={notificationRef}>
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className={`relative p-2 rounded-lg transition-colors ${showNotifications ? 'bg-primary/20 text-primary' : 'text-text-secondary hover:bg-white/10'}`}
            >
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-2.5 right-2.5 size-2 bg-red-500 rounded-full border border-background-dark"></span>
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-card-dark border border-border-dark rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                <div className="p-4 border-b border-border-dark flex items-center justify-between bg-white/[0.02]">
                  <h3 className="font-bold text-sm">Notifications</h3>
                  <button onClick={() => setShowNotifications(false)} className="text-[10px] text-primary font-bold uppercase hover:underline">Mark all as read</button>
                </div>
                <div className="max-h-[400px] overflow-y-auto divide-y divide-white/5">
                  {MOCK_NOTIFICATIONS.map((n) => (
                    <div key={n.id} onClick={() => setShowNotifications(false)} className="p-4 hover:bg-white/[0.02] cursor-pointer transition-colors flex gap-3">
                      <span className={`material-symbols-outlined ${n.color}`}>{n.icon}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold truncate">{n.title}</p>
                        <p className="text-xs text-slate-400 line-clamp-2 mt-0.5">{n.description}</p>
                        <p className="text-[10px] text-slate-500 mt-2 font-medium">{n.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-3 bg-white/[0.02] border-t border-border-dark text-center">
                  <button className="text-xs font-bold text-slate-400 hover:text-white transition-colors">See all notifications</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;