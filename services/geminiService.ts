import { KPI_STATS, REVENUE_CHART_DATA } from "../constants";

/**
 * Simulates an AI analysis of dashboard data locally.
 * This allows the app to run without an external API key.
 */
export const generateDashboardInsights = async () => {
  // Simulate processing delay for a more realistic "AI" feel
  await new Promise(resolve => setTimeout(resolve, 1200));
  
  const stats = KPI_STATS;
  const topMetric = stats.reduce((prev, current) => (prev.change > current.change) ? prev : current);

  return `
• Strategic Growth: The ${topMetric.label} is currently leading performance with a ${topMetric.change}% increase. This suggests strong product-market fit in recent feature releases.
• Customer Retention: Your churn rate has stabilized at 2.1%. Focus on the "Pro Plan" cohort where engagement is currently 15% higher than average.
• Revenue Forecast: Based on the current trend of $124,500 total revenue, we project a 5-8% increase in the next quarter if current acquisition costs remain stable.
  `.trim();
};
