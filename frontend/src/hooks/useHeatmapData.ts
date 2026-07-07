import { useQuery } from '@tanstack/react-query';
import api from '../lib/api';
import { HeatmapPoint } from '../types/analytics';

export const useHeatmapData = () => {
  return useQuery({
    queryKey: ['analytics', 'heatmap'],
    queryFn: async () => {
      const { data } = await api.get<HeatmapPoint[]>('/analytics/heatmap');
      return data;
    },
    refetchInterval: 30000,
  });
};
