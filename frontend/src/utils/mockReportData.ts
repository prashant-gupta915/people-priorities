// src/utils/mockReportData.ts

/** Mock data hooks for the Reports module */

export interface ReportSummary {
  total: number;
  resolved: number;
  pending: number;
  highPriority: number;
  aiConfidence: string;
  timestamp: string;
}

export const useMockReportSummary = (): ReportSummary => {
  return {
    total: 1248,
    resolved: 1023,
    pending: 225,
    highPriority: 87,
    aiConfidence: '92%',
    timestamp: new Date().toLocaleString(),
  };
};

/** Hook returning analytics data for ConstituencyAnalytics component */
export const useMockAnalytics = () => {
  return {
    trend: [
      { date: 'Jan', complaints: 40 },
      { date: 'Feb', complaints: 55 },
      { date: 'Mar', complaints: 30 },
      { date: 'Apr', complaints: 70 },
      { date: 'May', complaints: 45 },
    ],
    categoryDist: [
      { name: 'Road', value: 40 },
      { name: 'Water', value: 25 },
      { name: 'Electricity', value: 20 },
      { name: 'Sanitation', value: 15 },
    ],
    wardPerf: [
      { ward: 'Ward 1', complaints: 120 },
      { ward: 'Ward 2', complaints: 95 },
      { ward: 'Ward 3', complaints: 80 },
      { ward: 'Ward 4', complaints: 65 },
    ],
    resolutionRate: [
      { name: 'Resolved', value: 70 },
      { name: 'Pending', value: 30 },
    ],
    priorityBreakdown: [
      { priority: 'High', complaints: 80 },
      { priority: 'Medium', complaints: 150 },
      { priority: 'Low', complaints: 200 },
    ],
  };
};
