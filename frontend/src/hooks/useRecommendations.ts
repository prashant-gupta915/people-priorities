import { useQuery } from '@tanstack/react-query';
import api from '../lib/api';
import type { AIRecommendation, RecommendationsSummary } from '../types/recommendations';

// ---------------------------------------------------------------------------
// Enriched mock data — mirrors the Figma design
// The backend AI insights endpoint is a stub; we enrich with realistic data
// so the page is fully functional while the backend is being completed.
// ---------------------------------------------------------------------------
const MOCK_RECOMMENDATIONS: AIRecommendation[] = [
  {
    id: 'rec-001',
    title: 'Upgrade Water Supply Infrastructure in Sector 7B',
    description:
      'High complaint density around Sector 7B water pipelines. 847 overlapping complaints in the last 48 hours point to systemic pipe failures.',
    category: 'Water',
    priority: 'Critical',
    confidenceScore: 94,
    estimatedCost: '₹28.4L',
    impactedCitizens: 12482,
    schemeAlignment: ['Jal Jeevan Mission', 'AMRUT 2.0'],
    aiReasoning:
      'Complaint frequency has risen 67% in 30 days. Geo-clustering reveals 3 burst-pipe epicentres within 500m. Cross-referencing with municipal maintenance logs shows last major repair was 7 years ago — significantly past the 5-year recommended cycle.',
    complaintCount: 847,
    trend: 'up',
    trendValue: '+67%',
    timeframe: 'Immediate',
    status: 'New',
  },
  {
    id: 'rec-002',
    title: 'Resurface NH-48 Access Road — Ward 12',
    description:
      'Pothole density on the NH-48 feeder road has crossed the safety threshold. Risk of vehicular accidents is high during monsoon.',
    category: 'Road',
    priority: 'High',
    confidenceScore: 88,
    estimatedCost: '₹15.2L',
    impactedCitizens: 6200,
    schemeAlignment: ['PMGSY', 'Smart Cities Mission'],
    aiReasoning:
      'Road-related complaints constitute 32% of all open tickets. Satellite imagery analysis shows 18 potholes per km — triple the acceptable limit. Accident risk model predicts 2.3× increase in incidents if unaddressed before monsoon.',
    complaintCount: 312,
    trend: 'up',
    trendValue: '+23%',
    timeframe: 'Next 30 days',
    status: 'In Review',
  },
  {
    id: 'rec-003',
    title: 'Deploy Mobile Health Units — Rural Blocks',
    description:
      'Healthcare access complaints from 5 rural blocks indicate severe doctor-to-patient ratio issues.',
    category: 'Healthcare',
    priority: 'High',
    confidenceScore: 79,
    estimatedCost: '₹8.7L',
    impactedCitizens: 3840,
    schemeAlignment: ['Ayushman Bharat', 'NHM'],
    aiReasoning:
      'Average distance to nearest PHC is 22km in these blocks. Complaint sentiment analysis shows acute distress signals. Cross-referencing vaccination coverage data reveals +12% gap vs district average.',
    complaintCount: 198,
    trend: 'stable',
    trendValue: '+4%',
    timeframe: 'Next 60 days',
    status: 'Approved',
  },
  {
    id: 'rec-004',
    title: 'Repair Street Lighting — 14 km Network',
    description:
      'Electricity complaints cluster around non-functional streetlights. Night safety concerns raised by 400+ citizens.',
    category: 'Electricity',
    priority: 'Medium',
    confidenceScore: 72,
    estimatedCost: '₹4.1L',
    impactedCitizens: 2100,
    schemeAlignment: ['DDUGJY', 'Smart Cities Mission'],
    aiReasoning:
      'Time-series analysis shows complaints spike after 8 PM — strong correlation with streetlight failure. 14km of affected network identified. LED replacement would reduce maintenance cost by 40% over 5 years.',
    complaintCount: 145,
    trend: 'down',
    trendValue: '-8%',
    timeframe: 'Next 45 days',
    status: 'New',
  },
  {
    id: 'rec-005',
    title: 'Construct Sanitation Facilities — 3 Wards',
    description:
      'Open defecation complaints and lack of public sanitation in Wards 3, 7, and 9 remain unresolved despite prior escalations.',
    category: 'Sanitation',
    priority: 'Medium',
    confidenceScore: 81,
    estimatedCost: '₹6.3L',
    impactedCitizens: 1950,
    schemeAlignment: ['Swachh Bharat Mission', 'SBM-G'],
    aiReasoning:
      'Disease outbreak risk index is elevated in these wards based on monsoon proximity and existing complaint patterns. NGO coordination data suggests 3 construction-ready sites are available.',
    complaintCount: 89,
    trend: 'stable',
    trendValue: '0%',
    timeframe: 'Next 90 days',
    status: 'In Review',
  },
  {
    id: 'rec-006',
    title: 'Expand Mid-Day Meal Coverage — Government Schools',
    description:
      'Education complaints flag disruptions in mid-day meal delivery in 8 schools, impacting attendance rates.',
    category: 'Education',
    priority: 'Low',
    confidenceScore: 65,
    estimatedCost: '₹2.8L',
    impactedCitizens: 820,
    schemeAlignment: ['PM POSHAN', 'Samagra Shiksha'],
    aiReasoning:
      'Attendance data from district education office correlates meal disruptions with 15% drop in attendance on affected days. Supply chain analysis identifies 2 supplier bottlenecks.',
    complaintCount: 42,
    trend: 'down',
    trendValue: '-12%',
    timeframe: 'Next 90 days',
    status: 'Implemented',
  },
];

const MOCK_SUMMARY: RecommendationsSummary = {
  totalRecommendations: MOCK_RECOMMENDATIONS.length,
  criticalCount: MOCK_RECOMMENDATIONS.filter((r) => r.priority === 'Critical').length,
  highCount: MOCK_RECOMMENDATIONS.filter((r) => r.priority === 'High').length,
  avgConfidence: Math.round(
    MOCK_RECOMMENDATIONS.reduce((sum, r) => sum + r.confidenceScore, 0) /
      MOCK_RECOMMENDATIONS.length
  ),
  lastUpdated: new Date().toISOString(),
};

// ---------------------------------------------------------------------------
// Hook — tries real API, falls back to mock data gracefully
// ---------------------------------------------------------------------------
export const useRecommendations = () => {
  return useQuery<AIRecommendation[]>({
    queryKey: ['recommendations'],
    queryFn: async () => {
      try {
        // Try the real AI insights endpoint
        const { data } = await api.get<{
          recommended_actions: string[];
          narrative: string;
          confidence?: number;
        }>('/ai/insights', { params: { constituency_id: 'default' }, timeout: 5000 });

        if (data?.recommended_actions?.length) {
          // Map backend response to our type (partial enrichment)
          return data.recommended_actions.map((action, i) => ({
            ...MOCK_RECOMMENDATIONS[i % MOCK_RECOMMENDATIONS.length],
            id: `api-${i}`,
            title: action,
            aiReasoning: data.narrative || MOCK_RECOMMENDATIONS[0].aiReasoning,
          }));
        }
        // Backend returned empty — use mock
        return MOCK_RECOMMENDATIONS;
      } catch {
        // API not reachable — use rich mock data
        return MOCK_RECOMMENDATIONS;
      }
    },
    staleTime: 60_000,
    refetchInterval: 120_000,
  });
};

export const useRecommendationsSummary = () => {
  return useQuery<RecommendationsSummary>({
    queryKey: ['recommendations', 'summary'],
    queryFn: async () => MOCK_SUMMARY,
    staleTime: 60_000,
  });
};

export { MOCK_RECOMMENDATIONS, MOCK_SUMMARY };
