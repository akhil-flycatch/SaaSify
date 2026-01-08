import { KPIData, RevenueDataPoint } from '../types.ts';
import { KPI_STATS } from '../constants.ts';

export const getStatsForRange = (range: string): KPIData[] => {
  let multiplier = 1;
  switch (range) {
    case 'Today': multiplier = 0.04; break;
    case 'Yesterday': multiplier = 0.05; break;
    case 'Last 7 Days': multiplier = 0.22; break;
    case 'Last 30 Days': multiplier = 1; break;
    case 'This Month': multiplier = 0.9; break;
    case 'All Time': multiplier = 5.5; break;
  }

  return KPI_STATS.map(stat => {
    const baseValue = typeof stat.value === 'string' 
      ? parseFloat(stat.value.replace(/[$,%]/g, '')) 
      : stat.value;
    
    let newValue: string | number = baseValue * multiplier;
    const variance = 0.9 + Math.random() * 0.2;
    newValue = newValue * variance;
    
    if (stat.label.includes('Revenue')) {
      newValue = `$${Math.floor(newValue).toLocaleString()}`;
    } else if (stat.label.includes('Rate')) {
      newValue = `${(baseValue * (0.85 + Math.random() * 0.3)).toFixed(1)}%`;
    } else {
      newValue = Math.floor(newValue).toLocaleString();
    }

    return {
      ...stat,
      value: newValue,
      change: parseFloat((stat.change * (0.6 + Math.random() * 0.8)).toFixed(1))
    };
  });
};

export const getChartDataForRange = (range: string): RevenueDataPoint[] => {
  if (range === 'Today' || range === 'Yesterday') {
    return Array.from({ length: 12 }, (_, i) => ({
      month: `${i * 2}:00`,
      revenue: Math.floor(Math.random() * 4000) + 1000
    }));
  }

  if (range === 'Last 7 Days') {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    return days.map(day => ({
      month: day,
      revenue: Math.floor(Math.random() * 12000) + 8000
    }));
  }

  if (range === 'Last 30 Days' || range === 'This Month') {
    return Array.from({ length: 15 }, (_, i) => ({
      month: `Day ${i * 2 + 1}`,
      revenue: Math.floor(Math.random() * 15000) + 25000
    }));
  }

  if (range === 'All Time') {
    return ['2020', '2021', '2022', '2023', '2024'].map(year => ({
      month: year,
      revenue: Math.floor(Math.random() * 500000) + 200000
    }));
  }

  return [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ].map(m => ({
    month: m,
    revenue: Math.floor(Math.random() * 40000) + 20000
  }));
};

export const getAnalyticsDataForRange = (range: string) => {
  let count = 7;
  if (range === 'Today' || range === 'Yesterday') count = 12;
  if (range === 'Last 30 Days') count = 15;

  return Array.from({ length: count }, (_, i) => ({
    name: range.includes('Today') ? `${i*2}h` : `P${i+1}`,
    new: Math.floor(Math.random() * 100) + 20,
    active: Math.floor(Math.random() * 500) + 150,
  }));
};