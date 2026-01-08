import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { RevenueDataPoint } from '../types';

interface RevenueChartProps {
  data: RevenueDataPoint[];
  title?: string;
}

const RevenueChart: React.FC<RevenueChartProps> = ({ data, title = "Revenue Growth" }) => {
  return (
    <div className="lg:col-span-2 p-6 rounded-xl bg-card-dark border border-border-dark shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-white">{title}</h3>
          <p className="text-sm text-text-secondary">Real-time performance metrics</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-1.5 rounded-lg hover:bg-white/5 text-text-secondary transition-colors">
            <span className="material-symbols-outlined text-lg">download</span>
          </button>
          <button className="p-1.5 rounded-lg hover:bg-white/5 text-text-secondary transition-colors">
            <span className="material-symbols-outlined text-lg">more_horiz</span>
          </button>
        </div>
      </div>
      
      <div className="h-80 w-full mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2b6cee" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#2b6cee" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#2a3140" vertical={false} />
            <XAxis 
              dataKey="month" 
              stroke="#64748b" 
              fontSize={12} 
              tickLine={false} 
              axisLine={false}
              dy={10}
            />
            <YAxis 
              stroke="#64748b" 
              fontSize={12} 
              tickLine={false} 
              axisLine={false}
              tickFormatter={(value) => `$${value >= 1000 ? (value/1000).toFixed(0) + 'k' : value}`}
            />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1e232e', border: '1px solid #2a3140', borderRadius: '8px' }}
              itemStyle={{ color: '#fff' }}
              labelStyle={{ color: '#9da6b9', marginBottom: '4px' }}
              formatter={(value: number) => [`$${value.toLocaleString()}`, 'Revenue']}
            />
            <Area 
              type="monotone" 
              dataKey="revenue" 
              stroke="#2b6cee" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorRevenue)" 
              dot={{ r: 4, fill: '#2b6cee', strokeWidth: 2, stroke: '#1e232e' }}
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RevenueChart;