"use client";

import React, { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapIcon,
  SparklesIcon,
  FireIcon,
  ExclamationTriangleIcon,
  XMarkIcon,
  ArrowPathIcon,
  BoltIcon,
  MagnifyingGlassIcon,
  MapPinIcon,
  AdjustmentsHorizontalIcon,
} from '@heroicons/react/24/outline';
import { useHeatmapData } from '../../hooks/useHeatmapData';
import type { HeatmapPoint } from '../../types/analytics';
import type { EnrichedPoint } from './IntelligenceMap';

// ── Dynamic import (SSR-safe Leaflet) ────────────────────────────────────────
const IntelligenceMap = dynamic(() => import('./IntelligenceMap'), {
  ssr: false,
  loading: () => <MapSkeleton />,
});

// ── Category filter chips (matches Figma spec) ───────────────────────────────
type CategoryFilter = 'Roads' | 'Water' | 'Electricity' | 'Healthcare' | 'Education';

const CATEGORY_CHIPS: {
  key: CategoryFilter;
  emoji: string;
  color: string;
  activeColor: string;
  dot: string;
}[] = [
  {
    key: 'Roads',
    emoji: '🛣️',
    color: 'bg-white text-[#374151] border-[#E5E7EB]',
    activeColor: 'bg-[#FFFBEB] text-[#B45309] border-[#FCD34D]',
    dot: '#F59E0B',
  },
  {
    key: 'Water',
    emoji: '💧',
    color: 'bg-white text-[#374151] border-[#E5E7EB]',
    activeColor: 'bg-[#EFF6FF] text-[#1D4ED8] border-[#93C5FD]',
    dot: '#3B82F6',
  },
  {
    key: 'Electricity',
    emoji: '⚡',
    color: 'bg-white text-[#374151] border-[#E5E7EB]',
    activeColor: 'bg-[#FEFCE8] text-[#A16207] border-[#FDE047]',
    dot: '#FBBF24',
  },
  {
    key: 'Healthcare',
    emoji: '🏥',
    color: 'bg-white text-[#374151] border-[#E5E7EB]',
    activeColor: 'bg-[#FEF2F2] text-[#B91C1C] border-[#FCA5A5]',
    dot: '#EF4444',
  },
  {
    key: 'Education',
    emoji: '📚',
    color: 'bg-white text-[#374151] border-[#E5E7EB]',
    activeColor: 'bg-[#F5F3FF] text-[#6D28D9] border-[#C4B5FD]',
    dot: '#8B5CF6',
  },
];

// Maps filter key → actual category value from the API
const FILTER_TO_CATEGORY: Record<CategoryFilter, string[]> = {
  Roads: ['Road'],
  Water: ['Water'],
  Electricity: ['Electricity'],
  Healthcare: ['Healthcare'],
  Education: ['Education'],
};

// ── Legend data ──────────────────────────────────────────────────────────────
const LEGEND_ITEMS = [
  { color: '#3B82F6', label: 'Water' },
  { color: '#F59E0B', label: 'Road' },
  { color: '#EF4444', label: 'Healthcare' },
  { color: '#8B5CF6', label: 'Education' },
  { color: '#FBBF24', label: 'Electricity' },
  { color: '#10B981', label: 'Sanitation' },
  { color: '#06B6D4', label: 'Drainage' },
  { color: '#6B7280', label: 'Others' },
];

// ── AI hotspot data ──────────────────────────────────────────────────────────
const AI_HOTSPOTS = [
  {
    zone: 'Sector 7B',
    issue: 'Water supply failure cluster',
    count: 847,
    severity: 'critical' as const,
    trend: '+67%',
  },
  {
    zone: 'NH-48 Corridor',
    issue: 'Road degradation — 18 potholes/km',
    count: 312,
    severity: 'high' as const,
    trend: '+23%',
  },
  {
    zone: 'Rural Blocks 3–5',
    issue: 'Healthcare access gap',
    count: 198,
    severity: 'high' as const,
    trend: '+4%',
  },
  {
    zone: 'Wards 3, 7 & 9',
    issue: 'Street lighting failures',
    count: 145,
    severity: 'medium' as const,
    trend: '-8%',
  },
];

// ── Mock enrichment ──────────────────────────────────────────────────────────
const WARD_NAMES = [
  'Ward 3', 'Ward 7', 'Ward 9', 'Ward 12',
  'Ward 14', 'Ward 21', 'Ward 6', 'Sector 7B',
];
const COMPLAINT_TITLES: Record<string, string[]> = {
  Water: ['Burst pipe — no supply', 'Contaminated water complaint', 'Low water pressure issue'],
  Road: ['Pothole hazard on main road', 'Road damage near school', 'Flooded underpass blocked'],
  Healthcare: ['PHC doctor absent', 'Medicine stock out at clinic', 'Ambulance not available'],
  Education: ['Mid-day meal not served', 'Teacher shortage in school', 'Broken furniture — classroom'],
  Electricity: ['Street light out — 3 weeks', 'Power cut 8+ hours daily', 'Transformer failure'],
  Sanitation: ['Open drain overflow', 'Garbage not collected', 'Public toilet non-functional'],
  Drainage: ['Blocked storm drain', 'Sewage overflow in lane', 'Waterlogging near market'],
  Employment: ['MGNREGA work not started', 'Wages unpaid for 2 months'],
  Others: ['General infrastructure complaint', 'Encroachment on public land'],
};

function enrichPoint(p: HeatmapPoint, idx: number): EnrichedPoint {
  const titles = COMPLAINT_TITLES[p.category] ?? COMPLAINT_TITLES['Others'];
  const title = titles[idx % titles.length];
  const wardIdx = idx % WARD_NAMES.length;
  const daysAgo = (idx % 14) + 1;
  const submittedAt = `${daysAgo} day${daysAgo > 1 ? 's' : ''} ago`;
  return {
    ...p,
    id: `point-${idx}`,
    title,
    ward: WARD_NAMES[wardIdx],
    submittedAt,
  };
}

// ── Loading skeleton ──────────────────────────────────────────────────────────
function MapSkeleton() {
  return (
    <div className="w-full h-full bg-[#E5E7EB] flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#E0E7FF] via-[#F3F4F6] to-[#E0E7FF] animate-pulse" />
      <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="map-grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#6B7280" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#map-grid)" />
      </svg>
      <div className="relative z-10 flex flex-col items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-[#4F46E5]/20 flex items-center justify-center">
          <MapIcon className="w-8 h-8 text-[#4F46E5] animate-pulse" />
        </div>
        <p className="text-[14px] font-semibold text-[#6B7280]">Loading Intelligence Map…</p>
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="w-2 h-2 rounded-full bg-[#4F46E5] animate-bounce"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Empty state ───────────────────────────────────────────────────────────────
function EmptyState({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="w-full h-full bg-[#F9FAFB] flex flex-col items-center justify-center gap-4">
      <div className="w-20 h-20 rounded-full bg-[#EEF2FF] flex items-center justify-center">
        <MapPinIcon className="w-10 h-10 text-[#4F46E5]" />
      </div>
      <h3 className="text-[18px] font-bold text-[#111827]">No map data available</h3>
      <p className="text-[14px] text-[#6B7280] text-center max-w-[320px]">
        No geo-tagged complaints found. Data will appear once citizens submit location-enabled complaints.
      </p>
      <button
        onClick={onRetry}
        className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#4F46E5] text-white text-[13px] font-semibold hover:bg-[#4338CA] transition-colors shadow-sm"
      >
        <ArrowPathIcon className="w-4 h-4" />
        Refresh
      </button>
    </div>
  );
}

// ── Error state ───────────────────────────────────────────────────────────────
function ErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="w-full h-full bg-[#FFF9F9] flex flex-col items-center justify-center gap-4">
      <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center">
        <ExclamationTriangleIcon className="w-10 h-10 text-red-500" />
      </div>
      <h3 className="text-[18px] font-bold text-[#111827]">Failed to load map data</h3>
      <p className="text-[14px] text-[#6B7280] text-center max-w-[320px]">
        Could not fetch complaint locations. Please check your connection and try again.
      </p>
      <button
        onClick={onRetry}
        className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-red-500 text-white text-[13px] font-semibold hover:bg-red-600 transition-colors shadow-sm"
      >
        <ArrowPathIcon className="w-4 h-4" />
        Retry
      </button>
    </div>
  );
}

// ── Severity dot colour ──────────────────────────────────────────────────────
function severityStyles(severity: 'critical' | 'high' | 'medium') {
  if (severity === 'critical') return { icon: 'text-red-500', bg: 'bg-red-50', badge: 'bg-red-100 text-red-700' };
  if (severity === 'high') return { icon: 'text-orange-500', bg: 'bg-orange-50', badge: 'bg-orange-100 text-orange-700' };
  return { icon: 'text-yellow-500', bg: 'bg-yellow-50', badge: 'bg-yellow-100 text-yellow-700' };
}

// ── Main View ─────────────────────────────────────────────────────────────────
export default function IntelligenceMapView() {
  const { data: rawPoints, isLoading, error, refetch } = useHeatmapData();

  // Which category filters are active (empty = show all)
  const [activeCategories, setActiveCategories] = useState<CategoryFilter[]>([]);
  // Heatmap overlay toggle
  const [showHeatmap, setShowHeatmap] = useState(true);
  // Panels
  const [showAIPanel, setShowAIPanel] = useState(true);
  const [showLegend, setShowLegend] = useState(true);
  const [selectedPoint, setSelectedPoint] = useState<EnrichedPoint | null>(null);
  // Search
  const [searchQuery, setSearchQuery] = useState('');

  const enrichedPoints = useMemo<EnrichedPoint[]>(
    () => (rawPoints ?? []).map((p, i) => enrichPoint(p, i)),
    [rawPoints]
  );

  // Compute active category strings to pass into map
  const activeCategoryValues = useMemo<string[]>(() => {
    if (activeCategories.length === 0) return []; // empty = show all
    return activeCategories.flatMap((k) => FILTER_TO_CATEGORY[k]);
  }, [activeCategories]);

  // Search-filtered points for the selected complaint panel & stats
  const searchFilteredPoints = useMemo(() => {
    if (!searchQuery.trim()) return enrichedPoints;
    const q = searchQuery.toLowerCase();
    return enrichedPoints.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.ward.toLowerCase().includes(q)
    );
  }, [enrichedPoints, searchQuery]);

  function toggleCategory(key: CategoryFilter) {
    setActiveCategories((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  }

  function clearFilters() {
    setActiveCategories([]);
    setSearchQuery('');
  }

  const totalPoints = searchFilteredPoints.length;
  const criticalCount = searchFilteredPoints.filter((p) => p.priority === 'Critical').length;
  const hasActiveFilter = activeCategories.length > 0 || searchQuery.trim() !== '';

  return (
    <div className="relative w-full h-full" style={{ fontFamily: 'Inter, sans-serif' }}>

      {/* ── Map (fills entire area) ──────────────────────────────────── */}
      <div className="absolute inset-0">
        {isLoading ? (
          <MapSkeleton />
        ) : error ? (
          <ErrorState onRetry={() => refetch()} />
        ) : enrichedPoints.length === 0 ? (
          <EmptyState onRetry={() => refetch()} />
        ) : (
          <IntelligenceMap
            points={enrichedPoints}
            activeCategoryValues={activeCategoryValues}
            searchQuery={searchQuery}
            showHeatmap={showHeatmap}
            onMarkerClick={setSelectedPoint}
          />
        )}
      </div>

      {/* ── Top control bar ──────────────────────────────────────────── */}
      <div className="absolute top-0 left-0 right-0 z-[1001] pointer-events-none">
        <div className="flex flex-col gap-2 px-4 pt-3 pb-2">

          {/* Row 1: Title pill + Search + Toggles */}
          <div className="flex items-center gap-2 pointer-events-auto flex-wrap">
            {/* Title */}
            <div className="flex items-center gap-2.5 bg-white/95 backdrop-blur-sm border border-[#E5E7EB] rounded-2xl px-3.5 py-2 shadow-md flex-shrink-0">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#7C3AED] to-[#4F46E5] flex items-center justify-center shadow-sm">
                <MapIcon className="w-4 h-4 text-white" />
              </div>
              <div className="leading-tight">
                <h1 className="text-[13px] font-extrabold text-[#111827]">Intelligence Map</h1>
                <p className="text-[10px] text-[#6B7280] font-medium">
                  {totalPoints} locations · {criticalCount} critical
                </p>
              </div>
            </div>

            {/* Search bar */}
            <div className="flex-1 min-w-[180px] max-w-[320px] relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF] pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search complaints, wards…"
                className="w-full h-[38px] pl-9 pr-3 rounded-xl bg-white/95 backdrop-blur-sm border border-[#E5E7EB] shadow-md text-[13px] text-[#111827] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/30 focus:border-[#4F46E5] transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-[#374151] transition-colors"
                >
                  <XMarkIcon className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Right: Heatmap toggle + AI Analysis + Legend */}
            <div className="flex items-center gap-1.5 ml-auto flex-shrink-0">
              <button
                onClick={() => setShowHeatmap((v) => !v)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border shadow-md text-[12px] font-semibold transition-all ${
                  showHeatmap
                    ? 'bg-[#FFF7ED] text-[#C2410C] border-[#FDBA74]'
                    : 'bg-white/90 backdrop-blur-sm border-[#E5E7EB] text-[#6B7280] hover:bg-[#F3F4F6]'
                }`}
              >
                <span className="text-sm">🌡️</span>
                Heatmap
              </button>
              <button
                onClick={() => setShowAIPanel((v) => !v)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border shadow-md text-[12px] font-semibold transition-all ${
                  showAIPanel
                    ? 'bg-[#EEF2FF] text-[#4F46E5] border-[#C7D2FE]'
                    : 'bg-white/90 backdrop-blur-sm border-[#E5E7EB] text-[#6B7280] hover:bg-[#F3F4F6]'
                }`}
              >
                <SparklesIcon className="w-3.5 h-3.5" />
                AI Analysis
              </button>
              <button
                onClick={() => setShowLegend((v) => !v)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border shadow-md text-[12px] font-semibold transition-all ${
                  showLegend
                    ? 'bg-[#F0FDF4] text-[#15803D] border-[#86EFAC]'
                    : 'bg-white/90 backdrop-blur-sm border-[#E5E7EB] text-[#6B7280] hover:bg-[#F3F4F6]'
                }`}
              >
                <AdjustmentsHorizontalIcon className="w-3.5 h-3.5" />
                Legend
              </button>
            </div>
          </div>

          {/* Row 2: Category filter chips */}
          <div className="flex items-center gap-2 flex-wrap pointer-events-auto">
            <div className="flex items-center gap-1.5 bg-white/90 backdrop-blur-sm border border-[#E5E7EB] rounded-xl px-3 py-1.5 shadow-md flex-wrap">
              <span className="text-[11px] font-bold text-[#9CA3AF] uppercase tracking-wide mr-0.5">
                Filter:
              </span>
              {CATEGORY_CHIPS.map((chip) => {
                const isActive = activeCategories.includes(chip.key);
                return (
                  <button
                    key={chip.key}
                    onClick={() => toggleCategory(chip.key)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[12px] font-semibold border transition-all ${
                      isActive ? chip.activeColor : chip.color
                    }`}
                  >
                    {isActive && (
                      <span
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ backgroundColor: chip.dot }}
                      />
                    )}
                    <span>{chip.emoji}</span>
                    {chip.key}
                  </button>
                );
              })}
              {hasActiveFilter && (
                <button
                  onClick={clearFilters}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#F3F4F6] text-[#6B7280] hover:bg-[#E5E7EB] transition-colors border border-[#E5E7EB]"
                >
                  <XMarkIcon className="w-3 h-3" />
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── AI Hotspot Analysis panel (bottom-left) ──────────────────── */}
      <AnimatePresence>
        {showAIPanel && !isLoading && !error && enrichedPoints.length > 0 && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
            className="absolute bottom-6 left-4 z-[1000] w-[296px] bg-white/97 backdrop-blur-md rounded-2xl border border-[#E5E7EB] shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-[#F3F4F6] bg-gradient-to-r from-[#EEF2FF] to-white">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-[#4F46E5] flex items-center justify-center">
                  <SparklesIcon className="w-3.5 h-3.5 text-white" />
                </div>
                <span className="text-[13px] font-bold text-[#111827]">AI Hotspot Analysis</span>
              </div>
              <button
                onClick={() => setShowAIPanel(false)}
                className="text-[#9CA3AF] hover:text-[#374151] transition-colors"
                aria-label="Close AI panel"
              >
                <XMarkIcon className="w-4 h-4" />
              </button>
            </div>

            {/* Hotspot list */}
            <div className="px-4 py-3 space-y-3">
              {AI_HOTSPOTS.map((hs, i) => {
                const s = severityStyles(hs.severity);
                return (
                  <div key={i} className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${s.bg}`}>
                      <FireIcon className={`w-4 h-4 ${s.icon}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1 mb-0.5">
                        <p className="text-[12px] font-bold text-[#111827] truncate">{hs.zone}</p>
                        <div className="flex items-center gap-1 flex-shrink-0">
                          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${s.badge}`}>
                            {hs.count}
                          </span>
                          <span className={`text-[10px] font-semibold ${
                            hs.trend.startsWith('+') ? 'text-red-500' : 'text-green-500'
                          }`}>
                            {hs.trend}
                          </span>
                        </div>
                      </div>
                      <p className="text-[11px] text-[#6B7280] leading-tight">{hs.issue}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Footer */}
            <div className="px-4 pb-3 pt-1 border-t border-[#F9FAFB]">
              <div className="flex items-center gap-1.5 text-[11px] text-[#9CA3AF]">
                <BoltIcon className="w-3 h-3 text-[#4F46E5]" />
                <span>Updated 2 min ago · AI confidence 91%</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Selected complaint popup (bottom-center) ─────────────────── */}
      <AnimatePresence>
        {selectedPoint && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[1000] w-[340px] bg-white/98 backdrop-blur-md rounded-2xl border border-[#E5E7EB] shadow-2xl overflow-hidden"
          >
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-[#F3F4F6]">
              <div className="flex items-center gap-2">
                <MapPinIcon className="w-4 h-4 text-[#4F46E5]" />
                <span className="text-[11px] font-bold text-[#6B7280] uppercase tracking-wide">
                  Complaint Details
                </span>
              </div>
              <button
                onClick={() => setSelectedPoint(null)}
                className="text-[#9CA3AF] hover:text-[#374151] transition-colors"
                aria-label="Close"
              >
                <XMarkIcon className="w-4 h-4" />
              </button>
            </div>
            <div className="px-4 py-3 space-y-2.5">
              <p className="text-[14px] font-bold text-[#111827] leading-snug">
                {selectedPoint.title}
              </p>
              <div className="flex flex-wrap gap-1.5">
                <span
                  className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold text-white"
                  style={{
                    backgroundColor: {
                      Water: '#3B82F6',
                      Road: '#F59E0B',
                      Healthcare: '#EF4444',
                      Education: '#8B5CF6',
                      Electricity: '#FBBF24',
                      Sanitation: '#10B981',
                      Drainage: '#06B6D4',
                    }[selectedPoint.category] ?? '#6B7280',
                  }}
                >
                  {selectedPoint.category}
                </span>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                    selectedPoint.priority === 'Critical'
                      ? 'bg-red-100 text-red-700'
                      : selectedPoint.priority === 'High'
                      ? 'bg-orange-100 text-orange-700'
                      : selectedPoint.priority === 'Medium'
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-green-100 text-green-700'
                  }`}
                >
                  {selectedPoint.priority}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-gray-100 text-gray-600">
                  {selectedPoint.status}
                </span>
              </div>
              <div className="flex items-center justify-between text-[12px]">
                <span className="text-[#374151] font-medium">{selectedPoint.ward}</span>
                <span className="text-[#9CA3AF]">{selectedPoint.submittedAt}</span>
              </div>
              <p className="text-[11px] text-[#9CA3AF] font-mono">
                {selectedPoint.latitude.toFixed(4)}°N, {selectedPoint.longitude.toFixed(4)}°E
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Legend (bottom-right) ─────────────────────────────────────── */}
      <AnimatePresence>
        {showLegend && !isLoading && !error && enrichedPoints.length > 0 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
            className="absolute bottom-6 right-16 z-[1000] bg-white/97 backdrop-blur-md rounded-2xl border border-[#E5E7EB] shadow-2xl px-4 py-3 min-w-[160px]"
          >
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-[11px] font-bold text-[#6B7280] uppercase tracking-wide">
                Legend
              </span>
              <button
                onClick={() => setShowLegend(false)}
                className="text-[#9CA3AF] hover:text-[#374151] transition-colors ml-4"
                aria-label="Close legend"
              >
                <XMarkIcon className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Categories */}
            <div className="space-y-1.5">
              {LEGEND_ITEMS.map((item) => (
                <div key={item.label} className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-[11px] font-medium text-[#374151]">{item.label}</span>
                </div>
              ))}
            </div>

            {/* Priority scale */}
            <div className="mt-3 pt-2.5 border-t border-[#F3F4F6]">
              <p className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-wide mb-2">
                Priority
              </p>
              <div className="space-y-1">
                {[
                  { label: 'Critical', cls: 'bg-red-500', size: 'w-3.5' },
                  { label: 'High', cls: 'bg-orange-400', size: 'w-3' },
                  { label: 'Medium', cls: 'bg-yellow-400', size: 'w-2.5' },
                  { label: 'Low', cls: 'bg-green-400', size: 'w-2' },
                ].map((p) => (
                  <div key={p.label} className="flex items-center gap-2">
                    <span className={`${p.size} ${p.size} ${p.cls} rounded-full flex-shrink-0`} />
                    <span className="text-[11px] text-[#6B7280]">{p.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
