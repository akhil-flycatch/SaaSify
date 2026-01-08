
import React from 'react';
import { KPIData } from '../types';

const KPICard: React.FC<{ data: KPIData }> = ({ data }) => {
  const isPositive = data.trend === 'up';
  
  return (
    <div className="p-5 rounded-xl bg-card-dark border border-border-dark shadow-sm hover:shadow-md transition-all group">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-2 rounded-lg ${
          data.color === 'emerald' ? 'bg-emerald-500/10 text-emerald-500' :
          data.color === 'blue' ? 'bg-blue-500/10 text-blue-500' :
          data.color === 'orange' ? 'bg-orange-500/10 text-orange-500' :
          'bg-purple-500/10 text-purple-500'
        }`}>
          <span className="material-symbols-outlined">{data.icon}</span>
        </div>
        <span className={`flex items-center text-xs font-bold px-2 py-1 rounded-full ${
          isPositive ? 'text-emerald-500 bg-emerald-500/10' : 'text-orange-500 bg-orange-500/10'
        }`}>
          <span className="material-symbols-outlined text-sm mr-0.5">
            {isPositive ? 'trending_up' : 'trending_down'}
          </span>
          {isPositive ? '+' : ''}{data.change}%
        </span>
      </div>
      <p className="text-text-secondary text-sm font-medium">{data.label}</p>
      <h3 className={`text-white text-2xl font-bold mt-1 transition-colors ${
          data.color === 'emerald' ? 'group-hover:text-emerald-500' :
          data.color === 'blue' ? 'group-hover:text-blue-500' :
          data.color === 'orange' ? 'group-hover:text-orange-500' :
          'group-hover:text-purple-500'
      }`}>
        {data.value}
      </h3>
      <p className="text-slate-400 text-xs mt-1">vs. last month</p>
    </div>
  );
};

export default KPICard;
