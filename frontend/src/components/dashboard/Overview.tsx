"use client";

import React from 'react';
import KPICard from './KPICard';
import ComplaintTable from './ComplaintTable';
import RecommendationCard from './RecommendationCard';
import ActivityTimeline from './ActivityTimeline';
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
      <div className="bg-white rounded-2xl border border-[#E5E7EB] p-7 shadow-sm relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 relative z-10">
          <div>
            <h1 className="text-[28px] font-extrabold text-[#111827] flex items-center gap-2 tracking-tight">
              Good Morning, Secretary Verma <span className="text-3xl">👋</span>
            </h1>
            <p className="text-[15px] text-[#64748B] mt-1 font-medium">
              Here&apos;s what AI discovered in your constituency today.
            </p>
            
            <div className="flex flex-wrap gap-8 sm:gap-14 mt-6">
              <div className="bg-[#F8FAFC] px-4 py-3 rounded-xl border border-[#E5E7EB] min-w-[140px]">
                <div className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider mb-1">New today</div>
                <div className="text-2xl font-extrabold text-[#111827]">83</div>
                <div className="text-[11px] font-bold text-emerald-600 mt-1">+12 vs yesterday</div>
              </div>
              <div className="bg-[#F8FAFC] px-4 py-3 rounded-xl border border-[#E5E7EB] min-w-[140px]">
                <div className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider mb-1">Resolution rate</div>
                <div className="text-2xl font-extrabold text-[#111827]">81%</div>
                <div className="text-[11px] font-bold text-emerald-600 mt-1">+3% this week</div>
              </div>
              <div className="bg-[#F8FAFC] px-4 py-3 rounded-xl border border-[#E5E7EB] min-w-[140px]">
                <div className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider mb-1">AI confidence avg</div>
                <div className="text-2xl font-extrabold text-[#111827]">91%</div>
                <div className="text-[11px] font-bold text-emerald-600 mt-1">High accuracy</div>
              </div>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-[#E5E7EB] shadow-sm">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-semibold text-[#111827]">Live Analysis Running</span>
          </div>
        </div>
        
        <div className="absolute -right-20 -top-20 w-[400px] h-[400px] bg-gradient-to-bl from-[#EEF2FF] to-transparent rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        <KPICard 
          title="Total Complaints" 
          value={summary?.totalComplaints || "12,482"} 
          icon={ChatBubbleLeftRightIcon}
          iconColor="text-[#2563EB]"
          trend="+8.2%"
          trendUp={true}
          sparklineData={sparkline1}
          sparklineColor="#3B82F6"
        />
        <KPICard 
          title="High Priority" 
          value={summary?.openComplaints || "1,248"} 
          icon={ExclamationTriangleIcon}
          iconColor="text-[#EF4444]"
          trend="-3.1%"
          trendUp={false}
          sparklineData={sparkline2}
          sparklineColor="#EF4444"
        />
        <KPICard 
          title="Pop. Impacted" 
          value="2.3L" 
          icon={UsersIcon}
          iconColor="text-[#8B5CF6]"
          trend="+12.4%"
          trendUp={true}
          sparklineData={sparkline3}
          sparklineColor="#8B5CF6"
        />
        <KPICard 
          title="AI Recs" 
          value="42" 
          icon={CpuChipIcon}
          iconColor="text-[#10B981]"
          trend="+15.6%"
          trendUp={true}
          sparklineData={sparkline4}
          sparklineColor="#10B981"
        />
        <KPICard 
          title="Active Projects" 
          value="18" 
          icon={PresentationChartLineIcon}
          iconColor="text-[#F59E0B]"
          trend="+5.3%"
          trendUp={true}
          sparklineData={sparkline5}
          sparklineColor="#F59E0B"
        />
      </div>

      {/* Constituency Intelligence Map */}
      <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm p-6">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#EEF2FF] flex items-center justify-center text-[#4F46E5]">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 4L4 7V20L9 17M9 4L15 7M9 4V17M15 7L20 4V17L15 20M15 7V20M9 17L15 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#111827]">Constituency Intelligence Map</h2>
              <p className="text-[13px] font-medium text-[#64748B]">Rampur West · Updated 2 min ago</p>
            </div>
          </div>
          
          {/* Map Controls */}
          <div className="hidden sm:flex items-center bg-[#F8FAFC] rounded-xl p-1 border border-[#E5E7EB] text-[13px] font-semibold shadow-sm">
            <button className="px-5 py-1.5 rounded-lg bg-white text-[#2563EB] shadow-sm">Complaints</button>
            <button className="px-5 py-1.5 rounded-lg text-[#64748B] hover:text-[#111827] transition-colors">Infrastructure</button>
            <button className="px-5 py-1.5 rounded-lg text-[#64748B] hover:text-[#111827] transition-colors">Heatmap</button>
            <button className="px-5 py-1.5 rounded-lg text-[#64748B] hover:text-[#111827] transition-colors">Roads</button>
          </div>
        </div>
        <div className="h-[480px] rounded-xl overflow-hidden border border-[#E5E7EB] relative z-0">
          <HeatmapComponent />
          
          {/* Mock Floating Legend overlay */}
          <div className="absolute top-4 left-4 z-[400] bg-white rounded-xl shadow border border-[#E5E7EB] p-3">
            <div className="text-[9px] font-bold text-[#64748B] uppercase tracking-widest mb-2">Severity</div>
            <div className="space-y-1.5">
              <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-red-500"></div><span className="text-[11px] font-semibold text-[#111827]">Critical</span></div>
              <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-amber-500"></div><span className="text-[11px] font-semibold text-[#111827]">High</span></div>
              <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-blue-500"></div><span className="text-[11px] font-semibold text-[#111827]">Medium</span></div>
              <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-500"></div><span className="text-[11px] font-semibold text-[#111827]">Low</span></div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Recommendations */}
        <div className="lg:col-span-1 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-bold text-[#111827]">Priority Recommendations</h2>
            <button className="text-[13px] font-bold text-[#2563EB] hover:underline">View all</button>
          </div>
          <div className="space-y-4">
            {recommendations.map((rec) => (
              <RecommendationCard key={rec.id} text={rec.title} description={rec.description} impact={rec.impact} />
            ))}
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Charts Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[340px]">
             <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm p-6 overflow-hidden h-full flex flex-col">
               {trendData.length > 0 ? (
                 <LineChart data={trendData} />
               ) : (
                 <div className="h-full flex items-center justify-center text-sm text-[#64748B]">No Trend Data</div>
               )}
             </div>
             
             <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm p-6 overflow-hidden h-full flex flex-col">
               {categoryData.length > 0 ? (
                 <BarChart data={categoryData} />
               ) : (
                 <div className="h-full flex items-center justify-center text-sm text-[#64748B]">No Category Data</div>
               )}
             </div>
          </div>
          
          {/* Timeline Row */}
          <div className="h-auto">
             <ActivityTimeline />
          </div>
        </div>
      </div>

    </div>
  );
}
