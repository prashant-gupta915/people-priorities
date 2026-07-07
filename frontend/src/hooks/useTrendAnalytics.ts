import { useQuery } from '@tanstack/react-query';
import api from '../lib/api';
import { TrendDataPoint } from '../types/analytics';

type Period = 'daily' | 'weekly' | 'monthly';

export const useTrendAnalytics = (period: Period = 'daily') => {
  return useQuery({
    queryKey: ['analytics', 'trends', period],
    queryFn: async () => {
      const { data } = await api.get<TrendDataPoint[]>('/analytics/trends', {
        params: { period }
      });
      return data;
    },
    refetchInterval: 30000,
  });
};
