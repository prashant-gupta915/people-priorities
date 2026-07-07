import { useQuery } from '@tanstack/react-query';
import api from '../lib/api';
import { PriorityCount } from '../types/analytics';

export const usePriorityAnalytics = () => {
  return useQuery({
    queryKey: ['analytics', 'priority'],
    queryFn: async () => {
      const { data } = await api.get<PriorityCount[]>('/analytics/priority');
      return data;
    },
    refetchInterval: 30000,
  });
};
