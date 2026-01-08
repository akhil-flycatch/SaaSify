import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, LineChart, Line, Legend
} from 'recharts';
import { getAnalyticsDataForRange } from '../services/dataService.ts';

const ACQUISITION_DATA = [
  { name: 'Search', value: 400, color: '#2b6cee' },
  { name: 'Direct', value: 300, color: '#10b981' },
  { name: 'Referral', value: 300, color: '#f59e0b' },
  { name: 'Social', value: 200, color: '#8b5cf6' },
];

interface AnalyticsViewProps {
  dateRange: string;
}

const AnalyticsView: React.FC<AnalyticsViewProps> = ({ dateRange }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(getAnalyticsDataForRange(dateRange));

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setData(getAnalyticsDataForRange(dateRange));
      setIsLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, [dateRange]);

  return (
    <div className={`p-6 transition-all duration-300 ${isLoading ? 'opacity-30 scale-[0.98]' : 'opacity-100 scale-100'}`}>
      <div className="max-w-[1600px] mx-auto space-y-6">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-card-dark p-6 rounded-xl border border-border-dark">
            <p className="text-text-secondary text-sm font-medium">Avg. Session Duration</p>
            <h3 className="text-2xl font-bold mt-1">4m 32s</h3>
            <div className="flex items-center gap-1 text-emerald-500 text-xs font-bold mt-2">
              <span className="material-symbols-outlined text-sm">trending_up</span>
              +12.5%
            </div>
          </div>
          <div className="bg-card-dark p-6 rounded-xl border border-border-dark">
            <p className="text-text-secondary text-sm font-medium">Bounce Rate</p>
            <h3 className="text-2xl font-bold mt-1">42.8%</h3>
            <div className="flex items-center gap-1 text-orange-500 text-xs font-bold mt-2">
              <span className="material-symbols-outlined text-sm">trending_up</span>
              +2.1%
            </div>
          </div>
          <div className="bg-card-dark p-6 rounded-xl border border-border-dark">
            <p className="text-text-secondary text-sm font-medium">Pages per Session</p>
            <h3 className="text-2xl font-bold mt-1">6.4</h3>
            <div className="flex items-center gap-1 text-emerald-500 text-xs font-bold mt-2">
              <span className="material-symbols-outlined text-sm">trending_up</span>
              +0.8%
            </div>
          </div>
          <div className="bg-card-dark p-6 rounded-xl border border-border-dark">
            <p className="text-text-secondary text-sm font-medium">Conversion Rate</p>
            <h3 className="text-2xl font-bold mt-1">3.2%</h3>
            <div className="flex items-center gap-1 text-emerald-500 text-xs font-bold mt-2">
              <span className="material-symbols-outlined text-sm">trending_up</span>
              +1.4%
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-card-dark p-6 rounded-xl border border-border-dark">
            <h3 className="text-lg font-bold mb-6">User Activity Profile</h3>
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2a3140" vertical={false} />
                  <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1e232e', border: '1px solid #2a3140', borderRadius: '8px' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Legend verticalAlign="top" align="right" iconType="circle" wrapperStyle={{ paddingBottom: '20px' }} />
                  <Bar dataKey="active" name="Active Users" fill="#2b6cee" radius={[4, 4, 0, 0]} barSize={20} />
                  <Bar dataKey="new" name="New Signups" fill="#10b981" radius={[4, 4, 0, 0]} barSize={20} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-card-dark p-6 rounded-xl border border-border-dark">
            <h3 className="text-lg font-bold mb-6">Acquisition Channels</h3>
            <div className="h-[350px] flex items-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={ACQUISITION_DATA}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {ACQUISITION_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1e232e', border: '1px solid #2a3140', borderRadius: '8px' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Legend verticalAlign="middle" align="right" layout="vertical" iconType="circle" />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="bg-card-dark p-6 rounded-xl border border-border-dark">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold">Network Latency Simulation ({dateRange})</h3>
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-500/10 text-emerald-500 rounded-full text-xs font-bold">
                <span className="size-2 bg-emerald-500 rounded-full animate-pulse"></span>
                Operational
              </span>
            </div>
          </div>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2a3140" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} hide />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e232e', border: '1px solid #2a3140', borderRadius: '8px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="active" 
                  stroke="#2b6cee" 
                  strokeWidth={2} 
                  dot={{ r: 3, fill: '#2b6cee', strokeWidth: 0 }} 
                  activeDot={{ r: 5, strokeWidth: 0 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AnalyticsView;