export interface AnalyticsSummary {
  totalComplaints: number;
  openComplaints: number;
  inProgressComplaints: number;
  resolvedComplaints: number;
  deletedComplaints: number;
}

export interface CategoryCount {
  category: string;
  count: number;
}

export interface PriorityCount {
  priority: string;
  count: number;
}

export interface TrendDataPoint {
  date: string;
  count: number;
}

export interface HeatmapPoint {
  latitude: number;
  longitude: number;
  category: string;
  priority: string;
  status: string;
}
