export interface KPIData {
  label: string;
  value: string | number;
  change: number;
  icon: string;
  trend: 'up' | 'down';
  color: string;
}

export interface Transaction {
  id: string;
  customerName: string;
  plan: string;
  date: string;
  amount: number;
  status: 'Completed' | 'Pending' | 'Failed';
  avatar: string;
}

export interface TrafficSource {
  name: string;
  percentage: number;
  color: string;
}

export interface RevenueDataPoint {
  month: string;
  revenue: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Editor' | 'Viewer' | 'Billing';
  status: 'Active' | 'Inactive' | 'Pending';
  lastActive: string;
  avatar: string;
}