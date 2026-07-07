"use client";

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MagnifyingGlassIcon,
  XMarkIcon,
  FunnelIcon,
  ChevronUpDownIcon,
  CheckCircleIcon,
  ClockIcon,
  CalendarDaysIcon,
  CurrencyRupeeIcon,
  BuildingOffice2Icon,
  SparklesIcon,
  ExclamationTriangleIcon,
  ArrowPathIcon,
  Squares2X2Icon,
  ListBulletIcon,
  ArrowTrendingUpIcon,
  ArrowUpIcon,
} from '@heroicons/react/24/outline';
import { CheckCircleIcon as CheckCircleSolid } from '@heroicons/react/24/solid';
import { Card, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

// ─── Types ──────────────────────────────────────────────────────────────────
type ProjectStatus = 'Planned' | 'In Progress' | 'Completed' | 'On Hold';
type ProjectPriority = 'Critical' | 'High' | 'Medium' | 'Low';

interface Milestone {
  label: string;
  date: string;
  done: boolean;
}

interface Project {
  id: string;
  title: string;
  description: string;
  status: ProjectStatus;
  priority: ProjectPriority;
  aiPriorityScore: number; // 0-100
  department: string;
  category: string;
  budget: {
    total: string;
    spent: string;
    percentUsed: number;
  };
  progress: number; // 0-100
  startDate: string;
  endDate: string;
  milestones: Milestone[];
  beneficiaries: number;
  schemeAlignment: string[];
  tags: string[];
}

// ─── Mock data ───────────────────────────────────────────────────────────────
const PROJECTS: Project[] = [
  {
    id: 'proj-001',
    title: 'Sector 7B Water Pipeline Replacement',
    description: 'Full replacement of 12.4 km of corroded water supply pipelines serving 12,482 residents.',
    status: 'In Progress',
    priority: 'Critical',
    aiPriorityScore: 96,
    department: 'Public Works',
    category: 'Water',
    budget: { total: '₹28.4L', spent: '₹11.3L', percentUsed: 40 },
    progress: 38,
    startDate: 'Mar 2025',
    endDate: 'Aug 2025',
    milestones: [
      { label: 'Site survey complete', date: 'Mar 15', done: true },
      { label: 'Tender awarded', date: 'Apr 02', done: true },
      { label: 'Phase 1 excavation', date: 'May 20', done: true },
      { label: 'Phase 2 laying', date: 'Jun 30', done: false },
      { label: 'Testing & commissioning', date: 'Aug 10', done: false },
    ],
    beneficiaries: 12482,
    schemeAlignment: ['Jal Jeevan Mission', 'AMRUT 2.0'],
    tags: ['Infrastructure', 'Urgent'],
  },
  {
    id: 'proj-002',
    title: 'NH-48 Access Road Resurfacing — Ward 12',
    description: 'Resurfacing 8.6 km of feeder road with anti-skid bituminous mix to eliminate pothole hazard.',
    status: 'In Progress',
    priority: 'High',
    aiPriorityScore: 88,
    department: 'Roads & Highways',
    category: 'Road',
    budget: { total: '₹15.2L', spent: '₹6.1L', percentUsed: 40 },
    progress: 52,
    startDate: 'Apr 2025',
    endDate: 'Jul 2025',
    milestones: [
      { label: 'Traffic study', date: 'Apr 05', done: true },
      { label: 'Material procurement', date: 'Apr 22', done: true },
      { label: '4 km resurfaced', date: 'May 31', done: true },
      { label: 'Remaining 4.6 km', date: 'Jun 28', done: false },
      { label: 'Road markings & signage', date: 'Jul 10', done: false },
    ],
    beneficiaries: 6200,
    schemeAlignment: ['PMGSY', 'Smart Cities Mission'],
    tags: ['Monsoon-ready', 'Safety'],
  },
  {
    id: 'proj-003',
    title: 'Mobile Health Units — Rural Blocks 3–5',
    description: 'Deployment of 4 mobile health units with telemedicine capability across 5 underserved blocks.',
    status: 'Planned',
    priority: 'High',
    aiPriorityScore: 79,
    department: 'Health & Family Welfare',
    category: 'Healthcare',
    budget: { total: '₹8.7L', spent: '₹0.9L', percentUsed: 10 },
    progress: 10,
    startDate: 'Jul 2025',
    endDate: 'Oct 2025',
    milestones: [
      { label: 'Vehicle procurement', date: 'Jul 05', done: false },
      { label: 'Equipment installation', date: 'Jul 25', done: false },
      { label: 'Staff training', date: 'Aug 10', done: false },
      { label: 'Pilot run — Block 3', date: 'Sep 01', done: false },
      { label: 'Full deployment', date: 'Oct 01', done: false },
    ],
    beneficiaries: 3840,
    schemeAlignment: ['Ayushman Bharat', 'NHM'],
    tags: ['Healthcare', 'Rural'],
  },
  {
    id: 'proj-004',
    title: 'LED Street Lighting — 14 km Network',
    description: 'Replacing 420 sodium-vapour streetlights with energy-efficient LED fixtures.',
    status: 'In Progress',
    priority: 'Medium',
    aiPriorityScore: 72,
    department: 'Electricity Board',
    category: 'Electricity',
    budget: { total: '₹4.1L', spent: '₹2.5L', percentUsed: 61 },
    progress: 65,
    startDate: 'Feb 2025',
    endDate: 'Jun 2025',
    milestones: [
      { label: 'Audit completed', date: 'Feb 10', done: true },
      { label: 'LED procurement', date: 'Feb 28', done: true },
      { label: '200 units installed', date: 'Apr 15', done: true },
      { label: '420 units installed', date: 'Jun 05', done: false },
      { label: 'Smart-dimmer activation', date: 'Jun 20', done: false },
    ],
    beneficiaries: 2100,
    schemeAlignment: ['DDUGJY', 'Smart Cities Mission'],
    tags: ['Energy', 'Safety'],
  },
  {
    id: 'proj-005',
    title: 'Sanitation Facilities — Wards 3, 7 & 9',
    description: 'Construction of 18 community toilet blocks with biogas digesters in 3 open-defecation-free target wards.',
    status: 'Planned',
    priority: 'Medium',
    aiPriorityScore: 81,
    department: 'Urban Local Body',
    category: 'Sanitation',
    budget: { total: '₹6.3L', spent: '₹0.3L', percentUsed: 5 },
    progress: 5,
    startDate: 'Aug 2025',
    endDate: 'Dec 2025',
    milestones: [
      { label: 'Site identification', date: 'Aug 01', done: false },
      { label: 'Design approval', date: 'Aug 20', done: false },
      { label: 'Phase 1 (6 blocks)', date: 'Sep 30', done: false },
      { label: 'Phase 2 (12 blocks)', date: 'Nov 30', done: false },
      { label: 'Inauguration', date: 'Dec 15', done: false },
    ],
    beneficiaries: 1950,
    schemeAlignment: ['Swachh Bharat Mission', 'SBM-G'],
    tags: ['Sanitation', 'ODF'],
  },
  {
    id: 'proj-006',
    title: 'Mid-Day Meal Supply Chain Improvement',
    description: 'Digitising procurement and delivery tracking for mid-day meal program across 8 government schools.',
    status: 'Completed',
    priority: 'Low',
    aiPriorityScore: 65,
    department: 'District Education Office',
    category: 'Education',
    budget: { total: '₹2.8L', spent: '₹2.6L', percentUsed: 93 },
    progress: 100,
    startDate: 'Jan 2025',
    endDate: 'Apr 2025',
    milestones: [
      { label: 'Supplier audit', date: 'Jan 10', done: true },
      { label: 'Software deployment', date: 'Feb 01', done: true },
      { label: 'Staff training', date: 'Feb 20', done: true },
      { label: 'Live tracking go-live', date: 'Mar 01', done: true },
      { label: 'Review & closure', date: 'Apr 15', done: true },
    ],
    beneficiaries: 820,
    schemeAlignment: ['PM POSHAN', 'Samagra Shiksha'],
    tags: ['Education', 'Completed'],
  },
];

// ─── Config ──────────────────────────────────────────────────────────────────
const STATUS_CONFIG: Record<ProjectStatus, { bg: string; text: string; dot: string; icon: React.ReactNode }> = {
  'Planned': {
    bg: 'bg-blue-50', text: 'text-blue-700', dot: 'bg-blue-400',
    icon: <CalendarDaysIcon className="w-3.5 h-3.5" />,
  },
  'In Progress': {
    bg: 'bg-amber-50', text: 'text-amber-700', dot: 'bg-amber-400',
    icon: <ClockIcon className="w-3.5 h-3.5" />,
  },
  'Completed': {
    bg: 'bg-emerald-50', text: 'text-emerald-700', dot: 'bg-emerald-500',
    icon: <CheckCircleSolid className="w-3.5 h-3.5" />,
  },
  'On Hold': {
    bg: 'bg-gray-100', text: 'text-gray-600', dot: 'bg-gray-400',
    icon: <ExclamationTriangleIcon className="w-3.5 h-3.5" />,
  },
};

const PRIORITY_CONFIG: Record<ProjectPriority, { bar: string; badge: string }> = {
  Critical: { bar: 'bg-red-500', badge: 'bg-red-50 text-red-700 ring-red-200' },
  High:     { bar: 'bg-orange-400', badge: 'bg-orange-50 text-orange-700 ring-orange-200' },
  Medium:   { bar: 'bg-yellow-400', badge: 'bg-yellow-50 text-yellow-700 ring-yellow-200' },
  Low:      { bar: 'bg-green-400', badge: 'bg-green-50 text-green-700 ring-green-200' },
};

const CATEGORY_COLORS: Record<string, string> = {
  Water: '#3B82F6',
  Road: '#F59E0B',
  Healthcare: '#EF4444',
  Education: '#8B5CF6',
  Electricity: '#FBBF24',
  Sanitation: '#10B981',
};

const STATUS_FILTERS: Array<ProjectStatus | 'All'> = ['All', 'Planned', 'In Progress', 'Completed'];
const SORT_OPTIONS = [
  { value: 'ai-score', label: 'AI Priority Score' },
  { value: 'progress', label: 'Progress' },
  { value: 'budget', label: 'Budget Used' },
  { value: 'title', label: 'Name' },
] as const;
type SortOption = typeof SORT_OPTIONS[number]['value'];

// ─── Summary KPIs ─────────────────────────────────────────────────────────────
function SummaryHeader({ projects }: { projects: Project[] }) {
  const total = projects.length;
  const inProgress = projects.filter(p => p.status === 'In Progress').length;
  const completed = projects.filter(p => p.status === 'Completed').length;
  const planned = projects.filter(p => p.status === 'Planned').length;
  const totalBeneficiaries = projects.reduce((s, p) => s + p.beneficiaries, 0);
  const avgProgress = Math.round(projects.reduce((s, p) => s + p.progress, 0) / projects.length);

  const kpis = [
    { label: 'Total Projects', value: String(total), color: '#4F46E5', sub: 'All statuses' },
    { label: 'In Progress', value: String(inProgress), color: '#F59E0B', sub: `${planned} planned` },
    { label: 'Completed', value: String(completed), color: '#10B981', sub: 'This quarter' },
    { label: 'Avg. Progress', value: `${avgProgress}%`, color: '#4F46E5', sub: 'Across active' },
    { label: 'Beneficiaries', value: totalBeneficiaries.toLocaleString(), color: '#8B5CF6', sub: 'Citizens impacted' },
  ];

  return (
    <div className="space-y-4 mb-6">
      {/* Page title */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#7C3AED] to-[#4F46E5] flex items-center justify-center shadow-sm">
            <ArrowTrendingUpIcon className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-[22px] font-extrabold text-[#111827] tracking-tight">Projects & Monitoring</h1>
            <p className="text-[13px] text-[#6B7280]">Track government schemes, budgets, and delivery milestones</p>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#EEF2FF] border border-[#C7D2FE]">
          <SparklesIcon className="w-4 h-4 text-[#4F46E5]" />
          <span className="text-[12px] font-semibold text-[#4F46E5]">AI-prioritised view</span>
        </div>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {kpis.map((k) => (
          <div key={k.label} className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm px-4 py-3.5 flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: `${k.color}18` }}
            >
              <ArrowUpIcon className="w-4 h-4" style={{ color: k.color }} />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-wide truncate">{k.label}</p>
              <p className="text-[19px] font-extrabold text-[#111827] leading-tight">{k.value}</p>
              <p className="text-[10px] text-[#9CA3AF] truncate">{k.sub}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Progress bar ─────────────────────────────────────────────────────────────
function ProgressBar({ value, color }: { value: number; color: string }) {
  return (
    <div className="w-full h-1.5 bg-[#F3F4F6] rounded-full overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="h-full rounded-full"
        style={{ backgroundColor: color }}
      />
    </div>
  );
}

// ─── Budget bar ───────────────────────────────────────────────────────────────
function BudgetBar({ pct }: { pct: number }) {
  const color = pct >= 90 ? '#EF4444' : pct >= 70 ? '#F59E0B' : '#10B981';
  return (
    <div className="w-full h-1.5 bg-[#F3F4F6] rounded-full overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${pct}%` }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="h-full rounded-full"
        style={{ backgroundColor: color }}
      />
    </div>
  );
}

// ─── Milestone timeline ───────────────────────────────────────────────────────
function MilestoneTimeline({ milestones }: { milestones: Milestone[] }) {
  return (
    <div className="space-y-2">
      {milestones.map((m, i) => (
        <div key={i} className="flex items-center gap-2.5">
          <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 border-2 ${
            m.done ? 'bg-[#10B981] border-[#10B981]' : 'bg-white border-[#D1D5DB]'
          }`}>
            {m.done && <CheckCircleIcon className="w-3 h-3 text-white" />}
          </div>
          {/* Connector line except last */}
          <span className={`text-[12px] ${m.done ? 'text-[#374151] font-medium' : 'text-[#9CA3AF]'} flex-1 truncate`}>
            {m.label}
          </span>
          <span className="text-[11px] text-[#9CA3AF] flex-shrink-0">{m.date}</span>
        </div>
      ))}
    </div>
  );
}

// ─── Project Card ─────────────────────────────────────────────────────────────
function ProjectCard({ project }: { project: Project }) {
  const [expanded, setExpanded] = useState(false);
  const st = STATUS_CONFIG[project.status];
  const pr = PRIORITY_CONFIG[project.priority];
  const catColor = CATEGORY_COLORS[project.category] ?? '#6B7280';
  const progressColor = project.progress === 100 ? '#10B981' : project.priority === 'Critical' ? '#EF4444' : '#4F46E5';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="hover:shadow-lg transition-shadow duration-200 group">
        <CardContent className="p-5">
          {/* Row 1: badges */}
          <div className="flex items-start justify-between gap-2 mb-3">
            <div className="flex items-center gap-1.5 flex-wrap">
              {/* Status */}
              <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold ${st.bg} ${st.text}`}>
                {st.icon}
                {project.status}
              </span>
              {/* Priority */}
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold ring-1 ${pr.badge}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${PRIORITY_CONFIG[project.priority].bar}`} />
                {project.priority}
              </span>
              {/* Category dot */}
              <span
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-gray-100 text-gray-700"
              >
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: catColor }} />
                {project.category}
              </span>
            </div>
            {/* AI score */}
            <div className="flex flex-col items-center flex-shrink-0">
              <div
                className="w-10 h-10 rounded-full border-[3px] flex items-center justify-center"
                style={{ borderColor: project.aiPriorityScore >= 85 ? '#10B981' : project.aiPriorityScore >= 70 ? '#F59E0B' : '#EF4444' }}
              >
                <span className="text-[11px] font-extrabold text-[#111827]">{project.aiPriorityScore}</span>
              </div>
              <span className="text-[9px] font-bold text-[#9CA3AF] uppercase tracking-wide mt-0.5">AI</span>
            </div>
          </div>

          {/* Title & description */}
          <h3 className="text-[15px] font-bold text-[#111827] leading-snug mb-1 group-hover:text-[#4F46E5] transition-colors">
            {project.title}
          </h3>
          <p className="text-[13px] text-[#6B7280] leading-relaxed mb-4 line-clamp-2">
            {project.description}
          </p>

          {/* Progress */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-bold text-[#6B7280] uppercase tracking-wide">Progress</span>
              <span className="text-[13px] font-bold text-[#111827]">{project.progress}%</span>
            </div>
            <ProgressBar value={project.progress} color={progressColor} />
          </div>

          {/* Metrics grid */}
          <div className="grid grid-cols-2 gap-2.5 mb-4">
            {/* Budget */}
            <div className="bg-[#F9FAFB] rounded-xl p-3 border border-[#E5E7EB]">
              <div className="flex items-center gap-1.5 mb-1">
                <CurrencyRupeeIcon className="w-3.5 h-3.5 text-[#9CA3AF]" />
                <span className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-wide">Budget</span>
              </div>
              <p className="text-[14px] font-bold text-[#111827]">{project.budget.total}</p>
              <div className="mt-1.5">
                <BudgetBar pct={project.budget.percentUsed} />
              </div>
              <p className="text-[10px] text-[#9CA3AF] mt-1">{project.budget.spent} spent ({project.budget.percentUsed}%)</p>
            </div>

            {/* Department + dates */}
            <div className="bg-[#F9FAFB] rounded-xl p-3 border border-[#E5E7EB]">
              <div className="flex items-center gap-1.5 mb-1">
                <BuildingOffice2Icon className="w-3.5 h-3.5 text-[#9CA3AF]" />
                <span className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-wide">Dept.</span>
              </div>
              <p className="text-[12px] font-semibold text-[#374151] leading-tight">{project.department}</p>
              <div className="flex items-center gap-1 mt-2">
                <CalendarDaysIcon className="w-3 h-3 text-[#9CA3AF]" />
                <span className="text-[11px] text-[#6B7280]">{project.startDate} → {project.endDate}</span>
              </div>
            </div>
          </div>

          {/* Scheme badges */}
          {project.schemeAlignment.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-3">
              <span className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-wide self-center">Schemes:</span>
              {project.schemeAlignment.map((s) => (
                <Badge key={s} variant="outline" className="text-[10px] px-2 py-0.5 border-[#C7D2FE] text-[#4F46E5] bg-[#EEF2FF]">
                  {s}
                </Badge>
              ))}
            </div>
          )}

          {/* Expand toggle */}
          <button
            onClick={() => setExpanded((v) => !v)}
            className="w-full flex items-center justify-between py-2.5 px-3.5 rounded-xl bg-[#F9FAFB] border border-[#E5E7EB] hover:bg-[#F3F4F6] transition-colors text-left"
          >
            <span className="text-[12px] font-semibold text-[#374151]">
              📍 {milestoneLabel(project.milestones)} · {project.beneficiaries.toLocaleString()} beneficiaries
            </span>
            <span className="text-[11px] font-semibold text-[#4F46E5]">
              {expanded ? 'Hide timeline ↑' : 'View timeline ↓'}
            </span>
          </button>

          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.22 }}
                className="overflow-hidden"
              >
                <div className="mt-3 p-4 rounded-xl bg-[#F9FAFB] border border-[#E5E7EB]">
                  <p className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-wide mb-3">Milestones</p>
                  <MilestoneTimeline milestones={project.milestones} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function milestoneLabel(milestones: Milestone[]): string {
  const done = milestones.filter(m => m.done).length;
  return `${done}/${milestones.length} milestones`;
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <Card>
      <CardContent className="p-5">
        <div className="animate-pulse space-y-4">
          <div className="flex gap-2">
            <div className="h-6 w-20 rounded-full bg-gray-200" />
            <div className="h-6 w-16 rounded-full bg-gray-200" />
            <div className="h-6 w-16 rounded-full bg-gray-200" />
          </div>
          <div className="h-5 w-3/4 rounded bg-gray-200" />
          <div className="h-4 w-full rounded bg-gray-100" />
          <div className="h-2 w-full rounded-full bg-gray-200" />
          <div className="grid grid-cols-2 gap-2">
            <div className="h-20 rounded-xl bg-gray-100" />
            <div className="h-20 rounded-xl bg-gray-100" />
          </div>
          <div className="h-10 rounded-xl bg-gray-100" />
        </div>
      </CardContent>
    </Card>
  );
}

// ─── Empty state ──────────────────────────────────────────────────────────────
function EmptyState({ onClear }: { onClear: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="w-16 h-16 rounded-full bg-[#EEF2FF] flex items-center justify-center mb-4">
        <Squares2X2Icon className="w-8 h-8 text-[#4F46E5]" />
      </div>
      <h3 className="text-[18px] font-bold text-[#111827] mb-1">No projects found</h3>
      <p className="text-[14px] text-[#6B7280] mb-6 max-w-sm">
        No projects match your current filters. Try a different status or search term.
      </p>
      <Button variant="secondary" pill onClick={onClear}>
        Clear filters
      </Button>
    </div>
  );
}

// ─── Error state ──────────────────────────────────────────────────────────────
function ErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mb-4">
        <ExclamationTriangleIcon className="w-8 h-8 text-red-500" />
      </div>
      <h3 className="text-[18px] font-bold text-[#111827] mb-1">Failed to load projects</h3>
      <p className="text-[14px] text-[#6B7280] mb-6 max-w-sm">
        Unable to fetch project data. Check your connection and try again.
      </p>
      <Button variant="primary" pill onClick={onRetry}>
        <ArrowPathIcon className="w-4 h-4 mr-1.5" />
        Retry
      </Button>
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────
export default function ProjectsView() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<ProjectStatus | 'All'>('All');
  const [sortBy, setSortBy] = useState<SortOption>('ai-score');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isLoading] = useState(false);   // simulate live data; swap for real hook
  const [isError] = useState(false);

  const filtered = useMemo(() => {
    let list = [...PROJECTS];

    if (statusFilter !== 'All') list = list.filter(p => p.status === statusFilter);

    const q = search.toLowerCase().trim();
    if (q) {
      list = list.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.department.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      );
    }

    list.sort((a, b) => {
      if (sortBy === 'ai-score') return b.aiPriorityScore - a.aiPriorityScore;
      if (sortBy === 'progress') return b.progress - a.progress;
      if (sortBy === 'budget') return b.budget.percentUsed - a.budget.percentUsed;
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      return 0;
    });

    return list;
  }, [search, statusFilter, sortBy]);

  function clearAll() {
    setSearch('');
    setStatusFilter('All');
  }

  if (isError) return <ErrorState onRetry={() => {}} />;

  return (
    <div className="space-y-5" style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* Summary header */}
      {isLoading ? (
        <div className="animate-pulse space-y-3">
          <div className="h-10 w-64 rounded-xl bg-gray-200" />
          <div className="grid grid-cols-5 gap-3">
            {[...Array(5)].map((_, i) => <div key={i} className="h-20 rounded-2xl bg-gray-200" />)}
          </div>
        </div>
      ) : (
        <SummaryHeader projects={PROJECTS} />
      )}

      {/* Controls bar */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        {/* Search */}
        <div className="relative flex-1 min-w-0">
          <MagnifyingGlassIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search projects, departments, categories…"
            className="w-full h-10 pl-10 pr-9 rounded-xl border border-[#E5E7EB] bg-white text-[13px] text-[#111827] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/30 focus:border-[#4F46E5] transition-all shadow-sm"
          />
          {search && (
            <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-[#374151]">
              <XMarkIcon className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Sort */}
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <ChevronUpDownIcon className="w-4 h-4 text-[#9CA3AF]" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="h-10 pl-2 pr-7 rounded-xl border border-[#E5E7EB] bg-white text-[13px] text-[#374151] font-medium focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/30 focus:border-[#4F46E5] transition-all shadow-sm appearance-none cursor-pointer"
          >
            {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>

        {/* View toggle */}
        <div className="flex items-center bg-white border border-[#E5E7EB] rounded-xl shadow-sm overflow-hidden flex-shrink-0">
          <button
            onClick={() => setViewMode('grid')}
            className={`w-10 h-10 flex items-center justify-center transition-colors ${viewMode === 'grid' ? 'bg-[#EEF2FF] text-[#4F46E5]' : 'text-[#9CA3AF] hover:bg-[#F3F4F6]'}`}
            aria-label="Grid view"
          >
            <Squares2X2Icon className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`w-10 h-10 flex items-center justify-center transition-colors ${viewMode === 'list' ? 'bg-[#EEF2FF] text-[#4F46E5]' : 'text-[#9CA3AF] hover:bg-[#F3F4F6]'}`}
            aria-label="List view"
          >
            <ListBulletIcon className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Status filter chips */}
      <div className="flex items-center gap-2 flex-wrap">
        <FunnelIcon className="w-4 h-4 text-[#9CA3AF] flex-shrink-0" />
        {STATUS_FILTERS.map((f) => {
          const isActive = statusFilter === f;
          const cfg = f !== 'All' ? STATUS_CONFIG[f] : null;
          return (
            <button
              key={f}
              onClick={() => setStatusFilter(f)}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[12px] font-semibold border transition-all ${
                isActive
                  ? f === 'All'
                    ? 'bg-[#4F46E5] text-white border-[#4F46E5] shadow-sm'
                    : `${cfg!.bg} ${cfg!.text} border-current`
                  : 'bg-white text-[#6B7280] border-[#E5E7EB] hover:bg-[#F3F4F6]'
              }`}
            >
              {cfg && <span className={`w-2 h-2 rounded-full ${cfg.dot}`} />}
              {f}
              {f !== 'All' && (
                <span className="ml-0.5 text-[10px] opacity-70">
                  {PROJECTS.filter(p => p.status === f).length}
                </span>
              )}
            </button>
          );
        })}
        {(search || statusFilter !== 'All') && (
          <button onClick={clearAll} className="text-[12px] font-semibold text-[#9CA3AF] hover:text-[#374151] flex items-center gap-1 transition-colors">
            <XMarkIcon className="w-3.5 h-3.5" />
            Clear
          </button>
        )}
      </div>

      {/* Results count */}
      <p className="text-[12px] text-[#9CA3AF] font-medium">
        Showing <span className="font-bold text-[#374151]">{filtered.length}</span> of {PROJECTS.length} projects
        {sortBy === 'ai-score' && <span className="ml-1">· sorted by AI priority</span>}
      </p>

      {/* Cards / list */}
      {isLoading ? (
        <div className={viewMode === 'grid' ? 'grid grid-cols-1 lg:grid-cols-2 gap-5' : 'space-y-4'}>
          {[...Array(4)].map((_, i) => <SkeletonCard key={i} />)}
        </div>
      ) : filtered.length === 0 ? (
        <EmptyState onClear={clearAll} />
      ) : (
        <div className={viewMode === 'grid' ? 'grid grid-cols-1 lg:grid-cols-2 gap-5' : 'space-y-4'}>
          <AnimatePresence mode="popLayout">
            {filtered.map(p => <ProjectCard key={p.id} project={p} />)}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
