/**
 * Extended recommendation type for the AI Recommendations page.
 * Enriches the basic Recommendation from dashboard.ts with
 * priority, confidence, cost estimates, scheme alignment, and AI reasoning.
 */
export interface AIRecommendation {
  id: string;
  title: string;
  description: string;
  category: string;
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  confidenceScore: number; // 0–100
  estimatedCost: string;   // e.g. "₹12.5L"
  impactedCitizens: number;
  schemeAlignment: string[]; // e.g. ["PM Awas Yojana", "Smart Cities"]
  aiReasoning: string;
  complaintCount: number;
  trend: 'up' | 'down' | 'stable';
  trendValue: string; // e.g. "+23%"
  timeframe: string;  // e.g. "Next 30 days"
  status: 'New' | 'In Review' | 'Approved' | 'Implemented';
}

export interface RecommendationsSummary {
  totalRecommendations: number;
  criticalCount: number;
  highCount: number;
  avgConfidence: number;
  lastUpdated: string;
}
