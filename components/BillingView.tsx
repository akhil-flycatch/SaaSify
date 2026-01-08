import React from 'react';

const BillingView: React.FC = () => {
  return (
    <div className="p-6 animate-in fade-in duration-500">
      <div className="max-w-[1600px] mx-auto space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Billing & Subscription</h1>
          <p className="text-text-secondary text-sm">Manage your plan, payment methods and view billing history</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Plan Card */}
          <div className="lg:col-span-2 bg-gradient-to-br from-primary/20 to-card-dark p-8 rounded-2xl border border-primary/20 flex flex-col md:flex-row justify-between gap-8 relative overflow-hidden">
            <div className="relative z-10">
              <span className="px-3 py-1 bg-primary text-white text-[10px] font-bold rounded-full uppercase tracking-widest mb-4 inline-block">Current Plan</span>
              <h2 className="text-4xl font-extrabold mb-2">Pro Enterprise</h2>
              <p className="text-slate-300 max-w-sm">Everything in Pro plus unlimited users, advanced security, and custom integrations.</p>
              <div className="mt-8 flex items-baseline gap-2">
                <span className="text-4xl font-bold">$499</span>
                <span className="text-slate-400">/ per month</span>
              </div>
            </div>
            <div className="flex flex-col justify-between items-end relative z-10">
              <div className="text-right">
                <p className="text-sm text-slate-300 mb-1">Next Billing Date</p>
                <p className="font-bold">November 24, 2023</p>
              </div>
              <div className="flex gap-4">
                <button className="px-6 py-2.5 bg-white text-primary font-bold rounded-xl hover:bg-slate-100 transition-all">Upgrade Plan</button>
                <button className="px-6 py-2.5 bg-white/10 text-white font-bold rounded-xl border border-white/20 hover:bg-white/20 transition-all">Cancel</button>
              </div>
            </div>
            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
              <span className="material-symbols-outlined text-[12rem]">account_balance_wallet</span>
            </div>
          </div>

          {/* Payment Method Card */}
          <div className="bg-card-dark p-6 rounded-2xl border border-border-dark">
            <h3 className="font-bold mb-6 flex justify-between items-center">
              Payment Method
              <button className="text-primary text-xs">Edit</button>
            </h3>
            <div className="p-4 bg-white/5 rounded-xl border border-white/5 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-slate-800 p-2 rounded-lg">
                  <span className="material-symbols-outlined text-slate-400">credit_card</span>
                </div>
                <div>
                  <p className="text-sm font-bold">Visa ending in 4242</p>
                  <p className="text-xs text-slate-500">Expiry: 12 / 2025</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span className="material-symbols-outlined text-xs text-emerald-500">check_circle</span>
                Primary method
              </div>
            </div>
            <button className="w-full py-3 bg-white/5 hover:bg-white/10 border border-dashed border-white/20 rounded-xl text-sm font-bold transition-all">
              + Add New Method
            </button>
          </div>
        </div>

        {/* Invoice History */}
        <div className="bg-card-dark rounded-xl border border-border-dark overflow-hidden">
          <div className="p-6 border-b border-border-dark">
            <h3 className="font-bold">Billing History</h3>
          </div>
          <table className="w-full text-left">
            <thead>
              <tr className="bg-white/5 text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                <th className="py-4 px-6">Invoice ID</th>
                <th className="py-4 px-6">Date</th>
                <th className="py-4 px-6">Amount</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-right">Invoice</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {[
                { id: 'INV-2023-001', date: 'Oct 24, 2023', amount: '$499.00', status: 'Paid' },
                { id: 'INV-2023-002', date: 'Sep 24, 2023', amount: '$499.00', status: 'Paid' },
                { id: 'INV-2023-003', date: 'Aug 24, 2023', amount: '$499.00', status: 'Paid' },
              ].map((inv) => (
                <tr key={inv.id} className="hover:bg-white/[0.02]">
                  <td className="py-4 px-6 text-sm font-medium">{inv.id}</td>
                  <td className="py-4 px-6 text-sm text-slate-400">{inv.date}</td>
                  <td className="py-4 px-6 text-sm font-bold">{inv.amount}</td>
                  <td className="py-4 px-6">
                    <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-500 rounded text-[10px] font-bold uppercase">Paid</span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button className="p-1.5 hover:bg-white/10 rounded transition-colors text-slate-400 hover:text-white">
                      <span className="material-symbols-outlined text-lg">download</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BillingView;