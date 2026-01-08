import React, { useState } from 'react';
import { TRANSACTIONS } from '../constants';
import { Transaction } from '../types';

const StatusBadge: React.FC<{ status: Transaction['status'] }> = ({ status }) => {
  const styles = {
    Completed: 'bg-emerald-500/20 text-emerald-400',
    Pending: 'bg-amber-500/20 text-amber-400',
    Failed: 'bg-red-500/20 text-red-400',
  };

  const dots = {
    Completed: 'bg-emerald-500',
    Pending: 'bg-amber-500',
    Failed: 'bg-red-500',
  };

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[status]}`}>
      <span className={`size-1.5 rounded-full ${dots[status]}`}></span>
      {status}
    </span>
  );
};

const MobileTransactionCard: React.FC<{ tx: Transaction }> = ({ tx }) => (
  <div className="p-4 border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center gap-3">
        <img 
          src={tx.avatar} 
          alt={tx.customerName} 
          className="size-10 rounded-full bg-slate-800 border border-white/10 object-cover"
        />
        <div>
          <p className="text-sm font-bold text-white">{tx.customerName}</p>
          <p className="text-xs text-text-secondary">{tx.plan}</p>
        </div>
      </div>
      <button className="text-slate-400 p-1">
        <span className="material-symbols-outlined text-xl">more_vert</span>
      </button>
    </div>
    
    <div className="grid grid-cols-2 gap-4 mt-2">
      <div>
        <p className="text-[10px] uppercase font-bold text-slate-500 tracking-wider mb-0.5">Amount</p>
        <p className="text-sm font-semibold text-white">${tx.amount.toFixed(2)}</p>
      </div>
      <div className="text-right">
        <p className="text-[10px] uppercase font-bold text-slate-500 tracking-wider mb-0.5">Status</p>
        <StatusBadge status={tx.status} />
      </div>
      <div>
        <p className="text-[10px] uppercase font-bold text-slate-500 tracking-wider mb-0.5">Date</p>
        <p className="text-xs text-slate-400">{tx.date}</p>
      </div>
    </div>
  </div>
);

const RecentTransactions: React.FC = () => {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      alert('Transactions exported successfully as CSV!');
    }, 1200);
  };

  const handleFilter = () => {
    alert('Transaction filters updated. Applying sorting and status logic.');
  };

  return (
    <div className="rounded-xl bg-card-dark border border-border-dark shadow-sm overflow-hidden flex flex-col">
      {/* Header Section */}
      <div className="p-6 border-b border-border-dark flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-white">Recent Transactions</h3>
          <p className="text-sm text-text-secondary">Latest financial activity from users</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={handleFilter}
            className="flex items-center gap-2 pl-3 pr-4 py-2 text-sm font-medium border border-border-dark rounded-lg hover:bg-white/5 text-white transition-colors"
          >
            <span className="material-symbols-outlined text-lg">filter_list</span>
            <span>Filter</span>
          </button>
          <button 
            onClick={handleExport}
            disabled={isExporting}
            className="px-4 py-2 text-sm font-medium bg-primary text-white rounded-lg hover:bg-blue-600 transition-colors shadow-md shadow-primary/20 flex items-center gap-2"
          >
            {isExporting ? <span className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span> : null}
            Export
          </button>
        </div>
      </div>
      
      {/* Table for Desktop / Tablet */}
      <div className="hidden md:block relative overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[700px]">
          <thead>
            <tr className="bg-white/5 border-b border-border-dark">
              <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Customer</th>
              <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Date</th>
              <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Amount</th>
              <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
              <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {TRANSACTIONS.map((tx) => (
              <tr key={tx.id} className="hover:bg-white/5 transition-colors group">
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <img 
                      src={tx.avatar} 
                      alt={tx.customerName} 
                      className="size-8 rounded-full bg-slate-800 object-cover border border-white/5"
                    />
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-white truncate">{tx.customerName}</p>
                      <p className="text-xs text-text-secondary truncate">{tx.plan}</p>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6 text-sm text-slate-400 whitespace-nowrap">{tx.date}</td>
                <td className="py-4 px-6 text-sm font-medium text-white">${tx.amount.toFixed(2)}</td>
                <td className="py-4 px-6">
                  <StatusBadge status={tx.status} />
                </td>
                <td className="py-4 px-6 text-right">
                  <button className="text-slate-400 hover:text-primary transition-colors p-1 rounded hover:bg-white/5">
                    <span className="material-symbols-outlined text-lg">more_vert</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Card List for Mobile */}
      <div className="block md:hidden overflow-y-auto">
        {TRANSACTIONS.map((tx) => (
          <MobileTransactionCard key={tx.id} tx={tx} />
        ))}
      </div>
      
      {/* Pagination / Footer */}
      <div className="p-4 border-t border-border-dark flex flex-col sm:flex-row gap-4 justify-between items-center bg-white/5">
        <span className="text-xs text-text-secondary font-medium">
          Showing <span className="text-white">{TRANSACTIONS.length}</span> of <span className="text-white">24</span> results
        </span>
        <div className="flex gap-2">
          <button className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold rounded-lg border border-border-dark bg-card-dark text-slate-300 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all" disabled>
            <span className="material-symbols-outlined text-sm">chevron_left</span>
            Prev
          </button>
          <button onClick={() => alert('Loading next page...')} className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold rounded-lg border border-border-dark bg-card-dark text-slate-300 hover:bg-white/10 transition-all">
            Next
            <span className="material-symbols-outlined text-sm">chevron_right</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecentTransactions;