import { GoogleGenAI } from "@google/genai";
import { KPI_STATS } from "../constants.ts";

/**
 * Generates real AI insights using Gemini based on current dashboard metrics.
 */
export const generateDashboardInsights = async () => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
    
    const statsSummary = KPI_STATS.map(s => 
      `${s.label}: ${s.value} (${s.change}% ${s.trend === 'up' ? 'increase' : 'decrease'})`
    ).join(', ');

    const prompt = `
      You are an expert business analyst for a SaaS enterprise. 
      Analyze the following real-time performance metrics and provide 3 concise, high-impact strategic insights.
      
      Current Metrics: ${statsSummary}
      
      Requirements:
      - Use professional, data-driven language.
      - Focus on one growth opportunity, one retention/churn observation, and one forward-looking projection.
      - Format as a bulleted list.
      - Do not include conversational filler.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [{ parts: [{ text: prompt }] }],
      config: {
        temperature: 0.7,
        topP: 0.95,
      }
    });

    return response.text || "Insight generation returned an empty result. Please refresh the data.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "• System Insight: Unable to connect to the Intelligence Engine. Please verify your API configuration and ensure your project billing is active.";
  }
};