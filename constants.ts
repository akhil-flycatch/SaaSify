import { KPIData, Transaction, TrafficSource, RevenueDataPoint, User } from './types.ts';

export const KPI_STATS: KPIData[] = [
  {
    label: 'Total Revenue',
    value: '$124,500',
    change: 12,
    icon: 'attach_money',
    trend: 'up',
    color: 'emerald'
  },
  {
    label: 'New Subscribers',
    value: '340',
    change: 5,
    icon: 'person_add',
    trend: 'up',
    color: 'blue'
  },
  {
    label: 'Churn Rate',
    value: '2.1%',
    change: -0.5,
    icon: 'trending_down',
    trend: 'down',
    color: 'orange'
  },
  {
    label: 'Active Sessions',
    value: '1,204',
    change: 8,
    icon: 'bolt',
    trend: 'up',
    color: 'purple'
  }
];

export const REVENUE_CHART_DATA: RevenueDataPoint[] = [
  { month: 'Jan', revenue: 20000 },
  { month: 'Feb', revenue: 45000 },
  { month: 'Mar', revenue: 38000 },
  { month: 'Apr', revenue: 95000 },
  { month: 'May', revenue: 80000 },
  { month: 'Jun', revenue: 130000 },
  { month: 'Jul', revenue: 115000 },
  { month: 'Aug', revenue: 145000 },
  { month: 'Sep', revenue: 135000 },
  { month: 'Oct', revenue: 175000 },
  { month: 'Nov', revenue: 160000 },
  { month: 'Dec', revenue: 185000 }
];

export const TRAFFIC_SOURCES: TrafficSource[] = [
  { name: 'Direct', percentage: 45, color: 'bg-blue-600' },
  { name: 'Social Media', percentage: 32, color: 'bg-purple-500' },
  { name: 'Organic Search', percentage: 23, color: 'bg-emerald-500' }
];

export const TRANSACTIONS: Transaction[] = [
  {
    id: '1',
    customerName: 'Mark Benson',
    plan: 'Pro Plan',
    date: 'Oct 24, 2023',
    amount: 89.00,
    status: 'Completed',
    avatar: 'https://picsum.photos/seed/mark/100/100'
  },
  {
    id: '2',
    customerName: 'Sarah Jenkins',
    plan: 'Basic Plan',
    date: 'Oct 23, 2023',
    amount: 29.00,
    status: 'Completed',
    avatar: 'https://picsum.photos/seed/sarah/100/100'
  },
  {
    id: '3',
    customerName: 'Kevin Smith',
    plan: 'Enterprise Plan',
    date: 'Oct 23, 2023',
    amount: 499.00,
    status: 'Pending',
    avatar: 'https://picsum.photos/seed/kevin/100/100'
  },
  {
    id: '4',
    customerName: 'Lisa Wong',
    plan: 'Pro Plan',
    date: 'Oct 22, 2023',
    amount: 89.00,
    status: 'Failed',
    avatar: 'https://picsum.photos/seed/lisa/100/100'
  }
];

export const MOCK_USERS: User[] = [
  {
    id: '1',
    name: 'Jane Doe',
    email: 'jane@saasify.com',
    role: 'Admin',
    status: 'Active',
    lastActive: '2 mins ago',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCboaxy-QEck6D30X7xVkQ22Sdwm3AxWyrNq3hN08OHA9oirK0F9l5cDPtW698mlKvMAdBuOFKfd3vieYtnASO3KU3w8s5Nosaa_hIa7HUOm4aiVzMO9L1iuoe8lNil3kwoERIWVZixelAEP-OvCYQKMMJxG4FndR6j5TZ51GFareHDuAQIqp4ajoHY8UWZgPFZVPJ1cL14EZOHt2iho1rfv1FAVydQmCVnoUy9mBJQIB5bwRlSCmEJp9ofB1i83xkx5ko-CwrnTHOR'
  },
  {
    id: '2',
    name: 'Michael Chen',
    email: 'michael.c@enterprise.com',
    role: 'Editor',
    status: 'Active',
    lastActive: '1 hour ago',
    avatar: 'https://i.pravatar.cc/150?u=michael'
  },
  {
    id: '3',
    name: 'Sarah Wilson',
    email: 'sarah.w@startup.io',
    role: 'Viewer',
    status: 'Inactive',
    lastActive: '3 days ago',
    avatar: 'https://i.pravatar.cc/150?u=sarah'
  },
  {
    id: '4',
    name: 'David Miller',
    email: 'david.m@corp.net',
    role: 'Billing',
    status: 'Active',
    lastActive: '5 mins ago',
    avatar: 'https://i.pravatar.cc/150?u=david'
  }
];

export const MOCK_NOTIFICATIONS = [
  { id: 1, title: 'New signup', description: 'A new user has joined the platform.', time: '2 mins ago', icon: 'person_add', color: 'text-blue-500' },
  { id: 2, title: 'Server alert', description: 'API latency has increased by 15%.', time: '1 hour ago', icon: 'error', color: 'text-red-500' },
  { id: 3, title: 'Billing success', description: 'Enterprise payment of $499 received.', time: '5 hours ago', icon: 'payments', color: 'text-emerald-500' },
  { id: 4, title: 'Report ready', description: 'Your monthly analytics report is ready.', time: 'Yesterday', icon: 'description', color: 'text-purple-500' },
];