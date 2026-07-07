import { useQuery } from '@tanstack/react-query';
import api from '../lib/api';
import { AnalyticsSummary } from '../types/analytics';

export const useAnalyticsSummary = () => {
  return useQuery({
    queryKey: ['analytics', 'summary'],
    queryFn: async () => {
      const { data } = await api.get<AnalyticsSummary>('/analytics/summary');
      return data;
    },
    refetchInterval: 30000, // Refetch every 30 seconds
  });
};
