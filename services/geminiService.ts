
import { GoogleGenAI } from "@google/genai";
import { KPI_STATS, REVENUE_CHART_DATA } from "../constants";

export const generateDashboardInsights = async () => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const statsString = KPI_STATS.map(s => `${s.label}: ${s.value} (${s.change > 0 ? '+' : ''}${s.change}%)`).join(', ');
  const chartString = REVENUE_CHART_DATA.map(d => `${d.month}: ${d.revenue}`).join(', ');

  const prompt = `
    Analyze this SaaS dashboard data and provide 3 concise, actionable insights for the business owner.
    Current Stats: ${statsString}
    Revenue Trend: ${chartString}
    Keep the tone professional and strategic. Format as a short bulleted list.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: "You are a senior SaaS growth consultant providing executive summaries.",
        temperature: 0.7,
      },
    });

    return response.text;
  } catch (error) {
    console.error("Error generating insights:", error);
    return "Unable to generate insights at this time. Please check your API configuration.";
  }
};
