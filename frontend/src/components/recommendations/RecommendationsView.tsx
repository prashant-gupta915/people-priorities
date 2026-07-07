"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LightBulbIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  MinusIcon,
  FunnelIcon,
  SparklesIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  CurrencyRupeeIcon,
  UsersIcon,
  ClockIcon,
  CheckBadgeIcon,
  ExclamationTriangleIcon,
  DocumentTextIcon,
  ArrowRightIcon,
} from '@heroicons/react/24/outline';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { Card, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { useRecommendations, useRecommendationsSummary } from '../../hooks/useRecommendations';
import type { AIRecommendation } from '../../types/recommendations';

// ─── Priority config ───────────────────────────────────────────────
const PRIORITY_CONFIG: Record<
  AIRecommendation['priority'],
  { bg: string; text: string; dot: string; ring: string }
> = {
  Critical: { bg: 'bg-red-50', text: 'text-red-700', dot: 'bg-red-500', ring: 'ring-red-200' },
  High: { bg: 'bg-orange-50', text: 'text-orange-700', dot: 'bg-orange-500', ring: 'ring-orange-200' },
  Medium: { bg: 'bg-yellow-50', text: 'text-yellow-700', dot: 'bg-yellow-500', ring: 'ring-yellow-200' },
  Low: { bg: 'bg-green-50', text: 'text-green-700', dot: 'bg-green-500', ring: 'ring-green-200' },
};

const STATUS_CONFIG: Record<
  AIRecommendation['status'],
  { bg: string; text: string; icon: React.ComponentType<{ className?: string }> }
> = {
  New: { bg: 'bg-blue-50', text: 'text-blue-700', icon: SparklesIcon },
  'In Review': { bg: 'bg-amber-50', text: 'text-amber-700', icon: ClockIcon },
  Approved: { bg: 'bg-emerald-50', text: 'text-emerald-700', icon: CheckBadgeIcon },
  Implemented: { bg: 'bg-indigo-50', text: 'text-indigo-700', icon: CheckCircleIcon },
};

const CATEGORY_COLORS: Record<string, string> = {
  Water: '#3B82F6',
  Road: '#F59E0B',
  Healthcare: '#EF4444',
  Education: '#8B5CF6',
  Electricity: '#F59E0B',
  Sanitation: '#10B981',
};

const FILTER_OPTIONS = ['All', 'Critical', 'High', 'Medium', 'Low'] as const;

// ─── RecommendationCard ────────────────────────────────────────────
function RecommendationCard({ rec }: { rec: AIRecommendation }) {
  const [expanded, setExpanded] = useState(false);
  const pr = PRIORITY_CONFIG[rec.priority];
  const st = STATUS_CONFIG[rec.status];
  const StIcon = st.icon;
  const catColor = CATEGORY_COLORS[rec.category] ?? '#6B7280';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.25 }}
    >
      <Card className="hover:shadow-lg transition-shadow duration-200 group">
        <CardContent>
          {/* Row 1: priority + status + category */}
          <div className="flex items-center justify-between gap-2 mb-4">
            <div className="flex items-center gap-2 flex-wrap">
              {/* Priority badge */}
              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[12px] font-bold ${pr.bg} ${pr.text} ring-1 ${pr.ring}`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${pr.dot}`} />
                {rec.priority}
              </span>
              {/* Status badge */}
              <span
                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[12px] font-semibold ${st.bg} ${st.text}`}
              >
                <StIcon className="w-3.5 h-3.5" />
                {rec.status}
              </span>
              {/* Category */}
              <span
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[12px] font-semibold bg-gray-100 text-gray-700"
              >
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: catColor }} />
                {rec.category}
              </span>
            </div>
            {/* Confidence */}
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <div className="w-9 h-9 rounded-full border-[3px] flex items-center justify-center" style={{
                borderColor: rec.confidenceScore >= 85 ? '#10B981' : rec.confidenceScore >= 70 ? '#F59E0B' : '#EF4444',
              }}>
                <span className="text-[11px] font-extrabold text-[#111827]">{rec.confidenceScore}</span>
              </div>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-[16px] font-bold text-[#111827] leading-snug mb-1.5 group-hover:text-[#4F46E5] transition-colors">
            {rec.title}
          </h3>
          <p className="text-[14px] text-[#6B7280] leading-relaxed mb-4">{rec.description}</p>

          {/* Metrics row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
            <MetricChip
              icon={<CurrencyRupeeIcon className="w-4 h-4" />}
              label="Est. Cost"
              value={rec.estimatedCost}
            />
            <MetricChip
              icon={<UsersIcon className="w-4 h-4" />}
              label="Citizens"
              value={rec.impactedCitizens.toLocaleString()}
            />
            <MetricChip
              icon={<DocumentTextIcon className="w-4 h-4" />}
              label="Complaints"
              value={String(rec.complaintCount)}
            />
            <MetricChip
              icon={<ClockIcon className="w-4 h-4" />}
              label="Timeframe"
              value={rec.timeframe}
            />
          </div>

          {/* Trend line */}
          <div className="flex items-center gap-2 mb-4">
            {rec.trend === 'up' ? (
              <ArrowTrendingUpIcon className="w-4 h-4 text-red-500" />
            ) : rec.trend === 'down' ? (
              <ArrowTrendingDownIcon className="w-4 h-4 text-green-500" />
            ) : (
              <MinusIcon className="w-4 h-4 text-gray-400" />
            )}
            <span className={`text-[13px] font-semibold ${rec.trend === 'up' ? 'text-red-600' : rec.trend === 'down' ? 'text-green-600' : 'text-gray-500'}`}>
              {rec.trendValue} complaint trend
            </span>
          </div>

          {/* Scheme alignment */}
          {rec.schemeAlignment.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-4">
              <span className="text-[11px] font-bold text-[#9CA3AF] uppercase tracking-wide mr-1 self-center">
                Schemes:
              </span>
              {rec.schemeAlignment.map((s) => (
                <Badge key={s} variant="outline" className="text-[11px] px-2 py-0.5 rounded-md border-[#C7D2FE] text-[#4F46E5] bg-[#EEF2FF]">
                  {s}
                </Badge>
              ))}
            </div>
          )}

          {/* Expand/collapse for AI reasoning */}
          <button
            onClick={() => setExpanded(!expanded)}
            className="w-full flex items-center justify-between py-3 px-4 -mx-0 rounded-xl bg-[#F9FAFB] border border-[#E5E7EB] hover:bg-[#F3F4F6] transition-colors"
          >
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-[#4F46E5] flex items-center justify-center">
                <span className="text-white text-[9px] font-bold">AI</span>
              </div>
              <span className="text-[13px] font-semibold text-[#374151]">AI Reasoning</span>
            </div>
            {expanded ? (
              <ChevronUpIcon className="w-4 h-4 text-[#9CA3AF]" />
            ) : (
              <ChevronDownIcon className="w-4 h-4 text-[#9CA3AF]" />
            )}
          </button>

          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden"
              >
                <div className="mt-3 p-4 rounded-xl bg-[#EEF2FF] border border-[#C7D2FE]">
                  <p className="text-[13px] text-[#3730A3] leading-relaxed">{rec.aiReasoning}</p>
                </div>
                <div className="mt-3 flex justify-end">
                  <Button variant="primary" size="sm" pill className="gap-1.5">
                    View Full Analysis
                    <ArrowRightIcon className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// ─── MetricChip ────────────────────────────────────────────────────
function MetricChip({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-[#F9FAFB] border border-[#E5E7EB]">
      <span className="text-[#9CA3AF]">{icon}</span>
      <div className="min-w-0">
        <p className="text-[10px] font-semibold text-[#9CA3AF] uppercase tracking-wide truncate">
          {label}
        </p>
        <p className="text-[14px] font-bold text-[#111827] truncate">{value}</p>
      </div>
    </div>
  );
}

// ─── Skeleton ──────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <Card>
      <CardContent>
        <div className="animate-pulse space-y-4">
          <div className="flex gap-2">
            <div className="h-6 w-16 rounded-full bg-gray-200" />
            <div className="h-6 w-20 rounded-full bg-gray-200" />
            <div className="h-6 w-16 rounded-full bg-gray-200" />
          </div>
          <div className="h-5 w-3/4 rounded bg-gray-200" />
          <div className="h-4 w-full rounded bg-gray-100" />
          <div className="grid grid-cols-4 gap-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-14 rounded-xl bg-gray-100" />
            ))}
          </div>
          <div className="h-10 w-full rounded-xl bg-gray-100" />
        </div>
      </CardContent>
    </Card>
  );
}

// ─── Main export ───────────────────────────────────────────────────
export default function RecommendationsView() {
  const { data: recommendations, isLoading, error } = useRecommendations();
  const { data: summary } = useRecommendationsSummary();
  const [filter, setFilter] = useState<string>('All');

  const filtered =
    filter === 'All'
      ? recommendations
      : recommendations?.filter((r) => r.priority === filter);

  // ── Loading ──
  if (isLoading) {
    return (
      <div className="space-y-6">
        {/* Header skeleton */}
        <div className="animate-pulse space-y-3">
          <div className="h-8 w-60 rounded-lg bg-gray-200" />
          <div className="h-4 w-96 rounded bg-gray-100" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {[...Array(4)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    );
  }

  // ── Error ──
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mb-4">
          <ExclamationTriangleIcon className="w-8 h-8 text-red-500" />
        </div>
        <h3 className="text-lg font-bold text-[#111827] mb-1">Failed to load recommendations</h3>
        <p className="text-[14px] text-[#6B7280] mb-6 max-w-sm">
          We couldn&apos;t fetch the AI recommendations. Please check your connection and try again.
        </p>
        <Button variant="primary" pill onClick={() => window.location.reload()}>
          Retry
        </Button>
      </div>
    );
  }

  // ── Empty ──
  if (!filtered?.length) {
    return (
      <div className="space-y-6">
        <PageHeader summary={summary} filter={filter} setFilter={setFilter} />
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="w-16 h-16 rounded-full bg-[#EEF2FF] flex items-center justify-center mb-4">
            <LightBulbIcon className="w-8 h-8 text-[#4F46E5]" />
          </div>
          <h3 className="text-lg font-bold text-[#111827] mb-1">No recommendations found</h3>
          <p className="text-[14px] text-[#6B7280] max-w-sm">
            {filter !== 'All'
              ? `No ${filter} priority recommendations at this time. Try a different filter.`
              : 'AI is analysing complaint data. Recommendations will appear once sufficient patterns are detected.'}
          </p>
        </div>
      </div>
    );
  }

  // ── Main ──
  return (
    <div className="space-y-6">
      <PageHeader summary={summary} filter={filter} setFilter={setFilter} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <AnimatePresence mode="popLayout">
          {filtered.map((rec) => (
            <RecommendationCard key={rec.id} rec={rec} />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ─── Page Header ───────────────────────────────────────────────────
function PageHeader({
  summary,
  filter,
  setFilter,
}: {
  summary?: { totalRecommendations: number; criticalCount: number; highCount: number; avgConfidence: number } | null;
  filter: string;
  setFilter: (f: string) => void;
}) {
  return (
    <div className="space-y-5">
      {/* Title row */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5 mb-1">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#7C3AED] to-[#4F46E5] flex items-center justify-center shadow-sm">
              <LightBulbIcon className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-[24px] font-extrabold text-[#111827] tracking-tight">
              AI Recommendations
            </h1>
          </div>
          <p className="text-[14px] text-[#6B7280]">
            Prioritised action items generated from constituency complaint analysis
          </p>
        </div>

        {/* AI confidence badge */}
        {summary && (
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#EEF2FF] border border-[#C7D2FE]">
            <SparklesIcon className="w-4 h-4 text-[#4F46E5]" />
            <span className="text-[13px] font-semibold text-[#4F46E5]">
              Avg. Confidence: {summary.avgConfidence}%
            </span>
          </div>
        )}
      </div>

      {/* KPI row */}
      {summary && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <SummaryChip label="Total" value={String(summary.totalRecommendations)} color="#4F46E5" />
          <SummaryChip label="Critical" value={String(summary.criticalCount)} color="#EF4444" />
          <SummaryChip label="High" value={String(summary.highCount)} color="#F59E0B" />
          <SummaryChip label="Avg. Score" value={`${summary.avgConfidence}%`} color="#10B981" />
        </div>
      )}

      {/* Filter pills */}
      <div className="flex items-center gap-2 flex-wrap">
        <FunnelIcon className="w-4 h-4 text-[#9CA3AF]" />
        {FILTER_OPTIONS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3.5 py-1.5 rounded-full text-[13px] font-semibold transition-all ${
              filter === f
                ? 'bg-[#4F46E5] text-white shadow-sm'
                : 'bg-[#F3F4F6] text-[#6B7280] hover:bg-[#E5E7EB]'
            }`}
          >
            {f}
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Summary chip ──────────────────────────────────────────────────
function SummaryChip({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="flex items-center gap-3 p-4 rounded-2xl bg-white border border-[#E5E7EB] shadow-sm">
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center"
        style={{ backgroundColor: `${color}15` }}
      >
        <LightBulbIcon className="w-5 h-5" style={{ color }} />
      </div>
      <div>
        <p className="text-[11px] font-semibold text-[#9CA3AF] uppercase tracking-wide">{label}</p>
        <p className="text-[20px] font-extrabold text-[#111827] leading-tight">{value}</p>
      </div>
    </div>
  );
}
