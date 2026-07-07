"use client";

import React from 'react';
import KPICard from './KPICard';
import AISummaryCard from './AISummaryCard';
import ComplaintTable from './ComplaintTable';
import RecommendationCard from './RecommendationCard';
import BarChart from '../charts/BarChart';
import LineChart from '../charts/LineChart';
import PieChart from '../charts/PieChart';
import dynamic from 'next/dynamic';
import { complaints, recommendations } from '../../utils/mockData';
const HeatmapComponent = dynamic(() => import('../heatmap/HeatmapComponent'), { ssr: false });
import { useAnalyticsSummary } from '../../hooks/useAnalyticsSummary';
import { useCategoryAnalytics } from '../../hooks/useCategoryAnalytics';
import { usePriorityAnalytics } from '../../hooks/usePriorityAnalytics';
import { useTrendAnalytics } from '../../hooks/useTrendAnalytics';

export default function Overview() {
  const { data: summary, isLoading: isLoadingSummary, error: summaryError } = useAnalyticsSummary();
  const { data: categories, isLoading: isLoadingCategories, error: categoriesError } = useCategoryAnalytics();
  const { data: priorities, isLoading: isLoadingPriorities, error: prioritiesError } = usePriorityAnalytics();
  const { data: trends, isLoading: isLoadingTrends, error: trendsError } = useTrendAnalytics('daily');

  const isLoading = isLoadingSummary || isLoadingCategories || isLoadingPriorities || isLoadingTrends;
  const error = summaryError || categoriesError || prioritiesError || trendsError;

  if (isLoading) {
    return (
      <div className="p-6 min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-red-500 mb-4">Failed to load analytics data</div>
        <button 
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700"
        >
          Retry
        </button>
      </div>
    );
  }

  const categoryData = categories?.map(c => ({ name: c.category, complaints: c.count })) || [];
  const priorityData = priorities?.map(p => ({ name: p.priority, complaints: p.count })) || [];
  const trendData = trends?.map(t => ({ name: t.date, complaints: t.count })) || [];

  return (
    <div className="p-6 space-y-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <KPICard title="Total" value={summary?.totalComplaints || 0} bgColor="bg-blue-600" />
        <KPICard title="Open" value={summary?.openComplaints || 0} bgColor="bg-yellow-500" />
        <KPICard title="In Progress" value={summary?.inProgressComplaints || 0} bgColor="bg-indigo-500" />
        <KPICard title="Resolved" value={summary?.resolvedComplaints || 0} bgColor="bg-green-600" />
        <KPICard title="Deleted" value={summary?.deletedComplaints || 0} bgColor="bg-red-500" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {categoryData.length > 0 ? (
          <BarChart data={categoryData} />
        ) : (
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 h-64 flex items-center justify-center">No Category Data</div>
        )}
        
        {trendData.length > 0 ? (
          <LineChart data={trendData} />
        ) : (
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 h-64 flex items-center justify-center">No Trend Data</div>
        )}
        
        {priorityData.length > 0 ? (
          <PieChart data={priorityData} />
        ) : (
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 h-64 flex items-center justify-center">No Priority Data</div>
        )}
        
        <HeatmapComponent />
      </div>

      {/* AI Summary */}
      <AISummaryCard />

      {/* Complaint Table */}
      <ComplaintTable data={complaints} />

      {/* Recommendations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {recommendations.map((rec) => (
          <RecommendationCard key={rec.id} text={rec.title} />
        ))}
      </div>
    </div>
  );
}
