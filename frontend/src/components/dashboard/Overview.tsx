"use client";

import React from 'react';
import KPICard from './KPICard';
import ComplaintTable from './ComplaintTable';
import RecommendationCard from './RecommendationCard';
import BarChart from '../charts/BarChart';
import LineChart from '../charts/LineChart';
import PieChart from '../charts/PieChart';
import dynamic from 'next/dynamic';
import { complaints, recommendations } from '../../utils/mockData';
import { useAnalyticsSummary } from '../../hooks/useAnalyticsSummary';
import { useCategoryAnalytics } from '../../hooks/useCategoryAnalytics';
import { usePriorityAnalytics } from '../../hooks/usePriorityAnalytics';
import { useTrendAnalytics } from '../../hooks/useTrendAnalytics';
import { 
  ChatBubbleLeftRightIcon, 
  ExclamationTriangleIcon, 
  UsersIcon, 
  CpuChipIcon, 
  PresentationChartLineIcon 
} from '@heroicons/react/24/outline';

const HeatmapComponent = dynamic(() => import('../heatmap/HeatmapComponent'), { ssr: false });

export default function Overview() {
  const { data: summary, isLoading: isLoadingSummary, error: summaryError } = useAnalyticsSummary();
  const { data: categories, isLoading: isLoadingCategories, error: categoriesError } = useCategoryAnalytics();
  const { data: priorities, isLoading: isLoadingPriorities, error: prioritiesError } = usePriorityAnalytics();
  const { data: trends, isLoading: isLoadingTrends, error: trendsError } = useTrendAnalytics('daily');

  const isLoading = isLoadingSummary || isLoadingCategories || isLoadingPriorities || isLoadingTrends;
  const error = summaryError || categoriesError || prioritiesError || trendsError;

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#4F46E5]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col h-full items-center justify-center">
        <div className="text-red-500 mb-4 font-medium">Failed to load analytics data</div>
        <button 
          onClick={() => window.location.reload()}
          className="px-5 py-2.5 bg-[#4F46E5] text-white rounded-xl hover:opacity-90 font-medium"
        >
          Retry
        </button>
      </div>
    );
  }

  const categoryData = categories?.map(c => ({ name: c.category, complaints: c.count })) || [];
  const priorityData = priorities?.map(p => ({ name: p.priority, complaints: p.count })) || [];
  const trendData = trends?.map(t => ({ name: t.date, complaints: t.count })) || [];

  // Mock sparkline data
  const sparkline1 = [5, 10, 8, 15, 12, 20, 18].map(v => ({ value: v }));
  const sparkline2 = [20, 18, 22, 19, 15, 12, 10].map(v => ({ value: v }));
  const sparkline3 = [10, 15, 13, 18, 16, 21, 25].map(v => ({ value: v }));
  const sparkline4 = [8, 12, 10, 15, 18, 22, 26].map(v => ({ value: v }));
  const sparkline5 = [5, 9, 8, 12, 11, 15, 14].map(v => ({ value: v }));

  return (
    <div className="space-y-6">
      
      {/* Welcome Banner */}
      <div className="bg-[#F9FAFB] rounded-2xl border border-[#E5E7EB] p-6 shadow-sm relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 relative z-10">
          <div>
            <h1 className="text-2xl sm:text-[28px] font-bold text-[#111827] flex items-center gap-2">
              Good Morning, Secretary Verma <span className="text-2xl">👋</span>
            </h1>
            <p className="text-sm sm:text-base text-[#6B7280] mt-1.5">
              Here&apos;s what AI discovered in your constituency today.
            </p>
            
            <div className="flex flex-wrap gap-6 sm:gap-10 mt-6">
              <div>
                <div className="text-[11px] font-semibold text-[#6B7280] uppercase tracking-wider mb-1">New today</div>
                <div className="text-2xl font-bold text-[#111827]">83</div>
                <div className="text-[11px] font-medium text-emerald-600 mt-1">+12 vs yesterday</div>
              </div>
              <div>
                <div className="text-[11px] font-semibold text-[#6B7280] uppercase tracking-wider mb-1">Resolution rate</div>
                <div className="text-2xl font-bold text-[#111827]">81%</div>
                <div className="text-[11px] font-medium text-emerald-600 mt-1">+3% this week</div>
              </div>
              <div>
                <div className="text-[11px] font-semibold text-[#6B7280] uppercase tracking-wider mb-1">AI confidence avg</div>
                <div className="text-2xl font-bold text-[#111827]">91%</div>
                <div className="text-[11px] font-medium text-emerald-600 mt-1">High accuracy</div>
              </div>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-white border border-[#E5E7EB] shadow-sm self-start">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-semibold text-[#111827]">Live Analysis Running</span>
          </div>
        </div>
        
        {/* Subtle background glow */}
        <div className="absolute -right-20 -top-20 w-[400px] h-[400px] bg-gradient-to-bl from-[#7C3AED]/5 to-[#4F46E5]/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        <KPICard 
          title="Total Complaints" 
          value={summary?.totalComplaints || 12482} 
          icon={ChatBubbleLeftRightIcon}
          iconColor="text-[#3B82F6]"
          trend="+8.2%"
          trendUp={true}
          sparklineData={sparkline1}
          sparklineColor="#3B82F6"
        />
        <KPICard 
          title="Open / High Priority" 
          value={summary?.openComplaints || 1248} 
          icon={ExclamationTriangleIcon}
          iconColor="text-[#EF4444]"
          trend="-3.1%"
          trendUp={false}
          sparklineData={sparkline2}
          sparklineColor="#EF4444"
        />
        <KPICard 
          title="In Progress" 
          value={summary?.inProgressComplaints || 2300} 
          icon={UsersIcon}
          iconColor="text-[#8B5CF6]"
          trend="+12.4%"
          trendUp={true}
          sparklineData={sparkline3}
          sparklineColor="#8B5CF6"
        />
        <KPICard 
          title="Resolved" 
          value={summary?.resolvedComplaints || 8400} 
          icon={CpuChipIcon}
          iconColor="text-[#10B981]"
          trend="+15.6%"
          trendUp={true}
          sparklineData={sparkline4}
          sparklineColor="#10B981"
        />
        <KPICard 
          title="Deleted / Archived" 
          value={summary?.deletedComplaints || 18} 
          icon={PresentationChartLineIcon}
          iconColor="text-[#F59E0B]"
          trend="+5.3%"
          trendUp={true}
          sparklineData={sparkline5}
          sparklineColor="#F59E0B"
        />
      </div>

      {/* Main Charts & Map */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm p-5 h-[400px]">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-[#111827]">Constituency Intelligence Map</h2>
          </div>
          <div className="h-[320px] rounded-xl overflow-hidden border border-[#E5E7EB]">
            <HeatmapComponent />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-[400px]">
           <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm p-4 overflow-hidden">
             {categoryData.length > 0 ? (
               <BarChart data={categoryData} />
             ) : (
               <div className="h-full flex items-center justify-center text-sm text-[#6B7280]">No Category Data</div>
             )}
           </div>
           
           <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm p-4 overflow-hidden">
             {priorityData.length > 0 ? (
               <PieChart data={priorityData} />
             ) : (
               <div className="h-full flex items-center justify-center text-sm text-[#6B7280]">No Priority Data</div>
             )}
           </div>

           <div className="md:col-span-2 bg-white rounded-2xl border border-[#E5E7EB] shadow-sm p-4 overflow-hidden h-[184px]">
             {trendData.length > 0 ? (
               <LineChart data={trendData} />
             ) : (
               <div className="h-full flex items-center justify-center text-sm text-[#6B7280]">No Trend Data</div>
             )}
           </div>
        </div>
      </div>

      {/* Tables & Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-[#E5E7EB] shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-[#E5E7EB]">
            <h2 className="text-base font-bold text-[#111827]">Recent Complaints</h2>
          </div>
          <div className="p-0">
             <ComplaintTable data={complaints} />
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm p-5 overflow-y-auto max-h-[500px]">
          <h2 className="text-base font-bold text-[#111827] mb-4">AI Recommendations</h2>
          <div className="space-y-3">
            {recommendations.map((rec) => (
              <RecommendationCard key={rec.id} text={rec.title} />
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
