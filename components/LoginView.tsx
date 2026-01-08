import React, { useState } from 'react';

interface LoginViewProps {
  onLogin: () => void;
}

const LoginView: React.FC<LoginViewProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('jane@saasify.com');
  const [password, setPassword] = useState('••••••••');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API delay
    setTimeout(() => {
      onLogin();
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background-dark p-6">
      <div className="max-w-md w-full animate-in fade-in zoom-in-95 duration-500">
        <div className="text-center mb-8">
          <div className="bg-primary/10 size-16 rounded-2xl flex items-center justify-center text-primary mx-auto mb-6">
            <span className="material-symbols-outlined text-4xl">grid_view</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Welcome back</h1>
          <p className="text-text-secondary mt-2">Sign in to your SaaSify account to continue</p>
        </div>

        <div className="bg-card-dark p-8 rounded-3xl border border-border-dark shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Email Address</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-xl">mail</span>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-background-dark border border-border-dark rounded-xl pl-11 pr-4 py-3 text-sm text-white focus:ring-primary focus:border-primary outline-none transition-all"
                  placeholder="name@company.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Password</label>
                <button type="button" className="text-xs font-bold text-primary hover:underline">Forgot?</button>
              </div>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-xl">lock</span>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-background-dark border border-border-dark rounded-xl pl-11 pr-4 py-3 text-sm text-white focus:ring-primary focus:border-primary outline-none transition-all"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <div className="flex items-center gap-2 py-2">
              <input type="checkbox" id="remember" className="rounded bg-background-dark border-border-dark text-primary focus:ring-primary focus:ring-offset-background-dark" />
              <label htmlFor="remember" className="text-sm text-slate-400">Remember this device</label>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-primary hover:bg-blue-600 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <span className="size-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              ) : (
                <>Sign In <span className="material-symbols-outlined text-lg">login</span></>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-border-dark text-center">
            <p className="text-sm text-slate-400">
              Don't have an account? <button className="text-primary font-bold hover:underline">Contact Sales</button>
            </p>
          </div>
        </div>
        
        <p className="text-center text-slate-600 text-xs mt-12">
          &copy; 2024 SaaSify Enterprise Suite. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default LoginView;