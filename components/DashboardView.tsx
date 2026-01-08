import React, { useState, useEffect } from 'react';
import KPICard from './KPICard';
import RevenueChart from './RevenueChart';
import TrafficSources from './TrafficSources';
import RecentTransactions from './RecentTransactions';
import { generateDashboardInsights } from '../services/geminiService';
import { getStatsForRange, getChartDataForRange } from '../services/dataService';

interface DashboardViewProps {
  dateRange: string;
}

const DashboardView: React.FC<DashboardViewProps> = ({ dateRange }) => {
  const [insights, setInsights] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Dynamic data states
  const [stats, setStats] = useState(getStatsForRange(dateRange));
  const [chartData, setChartData] = useState(getChartDataForRange(dateRange));

  // Initial load and range changes
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setStats(getStatsForRange(dateRange));
      setChartData(getChartDataForRange(dateRange));
      setIsLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [dateRange]);

  // Real-time "pulsing" update for 'Today' range
  useEffect(() => {
    if (dateRange !== 'Today') return;

    const interval = setInterval(() => {
      // Subtle data variation for "real-time" feel
      setStats(prev => prev.map(s => ({
        ...s,
        value: typeof s.value === 'string' && s.value.startsWith('$') 
          ? `$${(parseInt(s.value.replace(/[$,]/g, '')) + Math.floor(Math.random() * 10)).toLocaleString()}`
          : s.value
      })));
    }, 5000);

    return () => clearInterval(interval);
  }, [dateRange]);

  const handleGenerateInsights = async () => {
    setIsGenerating(true);
    setInsights(null);
    const result = await generateDashboardInsights();
    setInsights(result);
    setIsGenerating(false);
  };

  return (
    <div className={`p-6 transition-all duration-300 ${isLoading ? 'opacity-30 translate-y-2' : 'opacity-100 translate-y-0'}`}>
      <div className="max-w-[1600px] mx-auto space-y-6">
        
        {/* AI Insights Bar */}
        <div className="relative overflow-hidden p-6 rounded-2xl bg-gradient-to-r from-primary/20 to-purple-500/10 border border-white/10 group transition-all">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="bg-primary size-12 rounded-xl flex items-center justify-center text-white shadow-xl shadow-primary/20">
                <span className="material-symbols-outlined text-2xl animate-pulse">auto_awesome</span>
              </div>
              <div>
                <h2 className="text-lg font-bold">AI Business Intelligence</h2>
                <p className="text-sm text-text-secondary">Generating insights for <span className="text-white font-bold">{dateRange}</span></p>
              </div>
            </div>
            <button 
              onClick={handleGenerateInsights}
              disabled={isGenerating}
              className="px-6 py-2.5 bg-primary hover:bg-blue-600 text-white rounded-xl font-bold flex items-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-primary/20"
            >
              {isGenerating ? (
                <>
                  <span className="material-symbols-outlined animate-spin text-xl">refresh</span>
                  Analyzing...
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-xl">temp_preferences_custom</span>
                  Generate Insights
                </>
              )}
            </button>
          </div>

          {insights && (
            <div className="mt-6 pt-6 border-t border-white/10 animate-in fade-in slide-in-from-top-4 duration-500">
              <div className="p-4 bg-white/5 rounded-xl border border-white/5 prose prose-invert max-w-none text-slate-300 text-sm leading-relaxed whitespace-pre-line">
                {insights}
              </div>
            </div>
          )}
        </div>

        {/* KPI Cards Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <KPICard key={`${dateRange}-${stat.label}`} data={stat} />
          ))}
        </div>

        {/* Main Charts Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <RevenueChart data={chartData} title={`Revenue Growth (${dateRange})`} />
          <TrafficSources />
        </div>

        {/* Transactions Section */}
        <RecentTransactions />
      </div>
    </div>
  );
};

export default DashboardView;