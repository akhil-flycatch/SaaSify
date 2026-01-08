import React, { useState } from 'react';
import Sidebar from './components/Sidebar.tsx';
import Header from './components/Header.tsx';
import DashboardView from './components/DashboardView.tsx';
import AnalyticsView from './components/AnalyticsView.tsx';
import UsersView from './components/UsersView.tsx';
import ReportsView from './components/ReportsView.tsx';
import BillingView from './components/BillingView.tsx';
import SettingsView from './components/SettingsView.tsx';
import LoginView from './components/LoginView.tsx';

export type ViewType = 'dashboard' | 'analytics' | 'users' | 'reports' | 'billing' | 'settings';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeView, setActiveView] = useState<ViewType>('dashboard');
  const [dateRange, setDateRange] = useState('Last 30 Days');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => setIsLoggedIn(false);

  if (!isLoggedIn) {
    return <LoginView onLogin={handleLogin} />;
  }

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return <DashboardView dateRange={dateRange} />;
      case 'analytics':
        return <AnalyticsView dateRange={dateRange} />;
      case 'users':
        return <UsersView />;
      case 'reports':
        return <ReportsView />;
      case 'billing':
        return <BillingView />;
      case 'settings':
        return <SettingsView />;
      default:
        return (
          <div className="flex flex-col items-center justify-center h-full text-center p-12">
            <div className="bg-card-dark p-8 rounded-2xl border border-border-dark max-w-md">
              <span className="material-symbols-outlined text-6xl text-slate-600 mb-4">construction</span>
              <h2 className="text-2xl font-bold mb-2">Under Construction</h2>
              <p className="text-text-secondary">The {activeView} module is currently being optimized for your enterprise needs.</p>
              <button 
                onClick={() => setActiveView('dashboard')}
                className="mt-6 px-6 py-2 bg-primary text-white rounded-lg font-bold hover:bg-blue-600 transition-all"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen w-full bg-background-dark text-white overflow-hidden font-display">
      <Sidebar 
        activeView={activeView} 
        onActiveViewChange={(view) => {
          setActiveView(view);
          setIsSidebarOpen(false); // Close sidebar on mobile after selection
        }} 
        onLogout={handleLogout}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      
      <main className="flex-1 flex flex-col h-full overflow-hidden">
        <Header 
          activeView={activeView} 
          dateRange={dateRange} 
          onDateRangeChange={setDateRange}
          onToggleSidebar={() => setIsSidebarOpen(true)}
        />
        
        <div className="flex-1 overflow-y-auto scroll-smooth">
          {renderContent()}
          <div className="h-12"></div>
        </div>
      </main>
    </div>
  );
};

export default App;