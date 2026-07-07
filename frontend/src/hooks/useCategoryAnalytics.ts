import { useQuery } from '@tanstack/react-query';
import api from '../lib/api';
import { CategoryCount } from '../types/analytics';

export const useCategoryAnalytics = () => {
  return useQuery({
    queryKey: ['analytics', 'categories'],
    queryFn: async () => {
      const { data } = await api.get<CategoryCount[]>('/analytics/categories');
      return data;
    },
    refetchInterval: 30000,
  });
};
