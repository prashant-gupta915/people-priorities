"use client";

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ResponsiveContainer,
  AreaChart, Area,
  BarChart as RBarChart, Bar,
  LineChart as RLineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip,
  PieChart as RPieChart, Pie, Cell, Legend,
} from 'recharts';
import {
  DocumentChartBarIcon,
  SparklesIcon,
  ArrowDownTrayIcon,
  ShareIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
  FunnelIcon,
  CalendarDaysIcon,
  ExclamationTriangleIcon,
  ArrowPathIcon,
  CheckCircleIcon,
  ClockIcon,
  ChatBubbleLeftRightIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
} from '@heroicons/react/24/outline';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

// ─── Types ───────────────────────────────────────────────────────────────────
type DateRange = '7d' | '30d' | '90d' | '6m' | '1y';
type Category = 'All' | 'Water' | 'Road' | 'Healthcare' | 'Education' | 'Electricity' | 'Sanitation';

// ─── Static data ─────────────────────────────────────────────────────────────
const COMPLAINT_TREND = [
  { month: 'Jan', complaints: 820, resolved: 640 },
  { month: 'Feb', complaints: 932, resolved: 798 },
  { month: 'Mar', complaints: 1100, resolved: 890 },
  { month: 'Apr', complaints: 980, resolved: 840 },
  { month: 'May', complaints: 1250, resolved: 1010 },
  { month: 'Jun', complaints: 1380, resolved: 1120 },
  { month: 'Jul', complaints: 1520, resolved: 1260 },
];

const RESOLUTION_DATA = [
  { month: 'Jan', rate: 78 },
  { month: 'Feb', rate: 81 },
  { month: 'Mar', rate: 80 },
  { month: 'Apr', rate: 85 },
  { month: 'May', rate: 83 },
  { month: 'Jun', rate: 88 },
  { month: 'Jul', rate: 91 },
];

const CATEGORY_DATA = [
  { name: 'Water', value: 2847, color: '#3B82F6' },
  { name: 'Road', value: 2312, color: '#F59E0B' },
  { name: 'Healthcare', value: 1984, color: '#EF4444' },
  { name: 'Education', value: 1120, color: '#8B5CF6' },
  { name: 'Electricity', value: 980, color: '#FBBF24' },
  { name: 'Sanitation', value: 879, color: '#10B981' },
  { name: 'Others', value: 360, color: '#6B7280' },
];

const MONTHLY_REPORTS = [
  {
    id: 'rep-007', month: 'July 2025', complaints: 1520, resolved: 1260,
    rate: 83, trend: 'up', size: '2.4 MB', generated: 'Jul 8, 2025',
    highlights: ['Water crises in Sector 7B peaked', '83% resolution rate — best in 6 months'],
  },
  {
    id: 'rep-006', month: 'June 2025', complaints: 1380, resolved: 1120,
    rate: 81, trend: 'up', size: '2.1 MB', generated: 'Jul 1, 2025',
    highlights: ['Road complaints up 23% pre-monsoon', 'LED lighting project 65% complete'],
  },
  {
    id: 'rep-005', month: 'May 2025', complaints: 1250, resolved: 1010,
    rate: 80, trend: 'stable', size: '1.9 MB', generated: 'Jun 1, 2025',
    highlights: ['Healthcare access gap flagged in rural blocks', 'Avg resolution time: 4.2 days'],
  },
  {
    id: 'rep-004', month: 'April 2025', complaints: 980, resolved: 840,
    rate: 85, trend: 'up', size: '1.7 MB', generated: 'May 1, 2025',
    highlights: ['Highest resolution rate this quarter', 'Sanitation scheme approved for 3 wards'],
  },
  {
    id: 'rep-003', month: 'March 2025', complaints: 1100, resolved: 890,
    rate: 80, trend: 'down', size: '1.8 MB', generated: 'Apr 1, 2025',
    highlights: ['Water pipeline replacement tendered', 'AI accuracy reached 91%'],
  },
  {
    id: 'rep-002', month: 'February 2025', complaints: 932, resolved: 798,
    rate: 81, trend: 'stable', size: '1.6 MB', generated: 'Mar 1, 2025',
    highlights: ['LED project commenced', 'Citizen app adoption +34%'],
  },
];

const CATEGORY_REPORTS = [
  { category: 'Water', total: 2847, resolved: 2284, pending: 563, avgDays: 3.2, color: '#3B82F6' },
  { category: 'Road', total: 2312, resolved: 1780, pending: 532, avgDays: 5.8, color: '#F59E0B' },
  { category: 'Healthcare', total: 1984, resolved: 1620, pending: 364, avgDays: 2.9, color: '#EF4444' },
  { category: 'Education', total: 1120, resolved: 980, pending: 140, avgDays: 4.1, color: '#8B5CF6' },
  { category: 'Electricity', total: 980, resolved: 850, pending: 130, avgDays: 1.8, color: '#FBBF24' },
  { category: 'Sanitation', total: 879, resolved: 700, pending: 179, avgDays: 6.2, color: '#10B981' },
];

const DATE_RANGES: { key: DateRange; label: string }[] = [
  { key: '7d', label: '7 days' },
  { key: '30d', label: '30 days' },
  { key: '90d', label: '90 days' },
  { key: '6m', label: '6 months' },
  { key: '1y', label: '1 year' },
];

const CATEGORIES: Category[] = ['All', 'Water', 'Road', 'Healthcare', 'Education', 'Electricity', 'Sanitation'];

// ─── Custom Tooltip ───────────────────────────────────────────────────────────
function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ name: string; value: number; color: string }>; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-[#E5E7EB] rounded-xl shadow-lg px-3.5 py-2.5 text-[12px]">
      <p className="font-bold text-[#374151] mb-1.5">{label}</p>
      {payload.map((p) => (
        <div key={p.name} className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
          <span className="text-[#6B7280]">{p.name}:</span>
          <span className="font-bold text-[#111827]">{p.value}</span>
        </div>
      ))}
    </div>
  );
}

// ─── KPI chip ─────────────────────────────────────────────────────────────────
function KpiChip({ label, value, sub, color, icon }: { label: string; value: string; sub: string; color: string; icon: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm px-4 py-3.5 flex items-center gap-3">
      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${color}18` }}>
        <span style={{ color }}>{icon}</span>
      </div>
      <div className="min-w-0">
        <p className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-wide truncate">{label}</p>
        <p className="text-[20px] font-extrabold text-[#111827] leading-tight">{value}</p>
        <p className="text-[10px] text-[#9CA3AF] truncate">{sub}</p>
      </div>
    </div>
  );
}

// ─── Loading skeleton ─────────────────────────────────────────────────────────
function Skeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-10 w-72 rounded-xl bg-gray-200" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[...Array(4)].map((_, i) => <div key={i} className="h-20 rounded-2xl bg-gray-200" />)}
      </div>
      <div className="h-64 rounded-2xl bg-gray-200" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="h-64 rounded-2xl bg-gray-200" />
        <div className="h-64 rounded-2xl bg-gray-200" />
      </div>
    </div>
  );
}

// ─── Empty state ──────────────────────────────────────────────────────────────
function EmptyState({ onClear }: { onClear: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="w-16 h-16 rounded-full bg-[#EEF2FF] flex items-center justify-center mb-4">
        <DocumentChartBarIcon className="w-8 h-8 text-[#4F46E5]" />
      </div>
      <h3 className="text-[18px] font-bold text-[#111827] mb-1">No reports found</h3>
      <p className="text-[14px] text-[#6B7280] mb-6 max-w-sm">No reports match your search or filters. Try adjusting the date range or category.</p>
      <Button variant="secondary" pill onClick={onClear}>Clear filters</Button>
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
      <h3 className="text-[18px] font-bold text-[#111827] mb-1">Failed to load reports</h3>
      <p className="text-[14px] text-[#6B7280] mb-6 max-w-sm">Could not fetch report data. Please try again.</p>
      <Button variant="primary" pill onClick={onRetry}>
        <ArrowPathIcon className="w-4 h-4 mr-1.5" />Retry
      </Button>
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────
export default function ReportsView() {
  const [search, setSearch] = useState('');
  const [dateRange, setDateRange] = useState<DateRange>('6m');
  const [category, setCategory] = useState<Category>('All');
  const [isLoading] = useState(false);
  const [isError] = useState(false);

  const filteredMonthly = useMemo(() => {
    let list = MONTHLY_REPORTS;
    const q = search.toLowerCase().trim();
    if (q) list = list.filter(r => r.month.toLowerCase().includes(q) || r.highlights.some(h => h.toLowerCase().includes(q)));
    return list;
  }, [search]);

  const filteredCategory = useMemo(() => {
    if (category === 'All') return CATEGORY_REPORTS;
    return CATEGORY_REPORTS.filter(r => r.category === category);
  }, [category]);

  function clearAll() { setSearch(''); setDateRange('6m'); setCategory('All'); }
  function handleExport(type: 'PDF' | 'CSV') { alert(`Exporting as ${type}… (connect to backend endpoint)`); }
  function handleShare() { navigator.clipboard?.writeText(window.location.href); alert('Report link copied to clipboard!'); }

  if (isLoading) return <Skeleton />;
  if (isError) return <ErrorState onRetry={() => {}} />;

  const totalComplaints = COMPLAINT_TREND.reduce((s, d) => s + d.complaints, 0);
  const totalResolved = COMPLAINT_TREND.reduce((s, d) => s + d.resolved, 0);
  const avgRate = Math.round(RESOLUTION_DATA.reduce((s, d) => s + d.rate, 0) / RESOLUTION_DATA.length);

  return (
    <div className="space-y-6" style={{ fontFamily: 'Inter, sans-serif' }}>

      {/* ── Page header ─────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#7C3AED] to-[#4F46E5] flex items-center justify-center shadow-sm">
            <DocumentChartBarIcon className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-[22px] font-extrabold text-[#111827] tracking-tight">Reports & Insights</h1>
            <p className="text-[13px] text-[#6B7280]">AI-generated analytics, complaint trends, and resolution performance</p>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Button variant="secondary" size="sm" pill onClick={() => handleExport('PDF')} className="gap-1.5">
            <ArrowDownTrayIcon className="w-3.5 h-3.5" />PDF
          </Button>
          <Button variant="secondary" size="sm" pill onClick={() => handleExport('CSV')} className="gap-1.5">
            <ArrowDownTrayIcon className="w-3.5 h-3.5" />CSV
          </Button>
          <Button variant="primary" size="sm" pill onClick={handleShare} className="gap-1.5">
            <ShareIcon className="w-3.5 h-3.5" />Share
          </Button>
        </div>
      </div>

      {/* ── KPI row ──────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <KpiChip label="Total Complaints" value={totalComplaints.toLocaleString()} sub="Last 7 months" color="#4F46E5" icon={<ChatBubbleLeftRightIcon className="w-5 h-5" />} />
        <KpiChip label="Total Resolved" value={totalResolved.toLocaleString()} sub="Last 7 months" color="#10B981" icon={<CheckCircleIcon className="w-5 h-5" />} />
        <KpiChip label="Avg. Resolution Rate" value={`${avgRate}%`} sub="Monthly average" color="#F59E0B" icon={<ArrowTrendingUpIcon className="w-5 h-5" />} />
        <KpiChip label="Avg. Resolution Time" value="4.2 days" sub="Across all categories" color="#8B5CF6" icon={<ClockIcon className="w-5 h-5" />} />
      </div>

      {/* ── AI-generated summary card ──────────────────────────────── */}
      <Card className="border-[#C7D2FE] bg-gradient-to-r from-[#EEF2FF] to-white">
        <CardContent className="p-5">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#4F46E5] flex items-center justify-center flex-shrink-0 shadow-sm">
              <SparklesIcon className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1.5">
                <h2 className="text-[14px] font-bold text-[#111827]">AI-Generated Summary</h2>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#4F46E5] text-white">July 2025</span>
              </div>
              <p className="text-[13px] text-[#374151] leading-relaxed">
                Complaint volume increased <strong>10.1%</strong> month-on-month to 1,520 in July — primarily driven by water supply failures in Sector 7B (+67%) and pre-monsoon road degradation in Ward 12. Despite the surge, the resolution rate improved to <strong>83%</strong> (best in 6 months), with average resolution time down to <strong>4.2 days</strong>. AI confidence in priority scoring reached <strong>91%</strong>. Immediate attention required for the 563 unresolved water complaints.
              </p>
              <div className="flex flex-wrap gap-2 mt-3">
                {['Water crisis ↑67%', 'Resolution rate ↑3%', 'AI confidence 91%', '563 unresolved'].map((tag) => (
                  <Badge key={tag} variant="outline" className="text-[11px] px-2 py-0.5 border-[#C7D2FE] text-[#4F46E5] bg-white">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ── Filters + Search ─────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <MagnifyingGlassIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search reports, highlights…"
            className="w-full h-10 pl-10 pr-9 rounded-xl border border-[#E5E7EB] bg-white text-[13px] text-[#111827] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/30 focus:border-[#4F46E5] transition-all shadow-sm"
          />
          {search && (
            <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-[#374151]">
              <XMarkIcon className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Date range */}
        <div className="flex items-center gap-1.5 bg-white border border-[#E5E7EB] rounded-xl shadow-sm px-3 h-10 flex-shrink-0">
          <CalendarDaysIcon className="w-4 h-4 text-[#9CA3AF]" />
          {DATE_RANGES.map(d => (
            <button
              key={d.key}
              onClick={() => setDateRange(d.key)}
              className={`px-2.5 py-1 rounded-lg text-[12px] font-semibold transition-all ${
                dateRange === d.key ? 'bg-[#4F46E5] text-white' : 'text-[#6B7280] hover:bg-[#F3F4F6]'
              }`}
            >
              {d.label}
            </button>
          ))}
        </div>

        {/* Category filter */}
        <div className="flex items-center gap-1.5 bg-white border border-[#E5E7EB] rounded-xl shadow-sm px-3 h-10 flex-shrink-0">
          <FunnelIcon className="w-4 h-4 text-[#9CA3AF]" />
          <select
            value={category}
            onChange={e => setCategory(e.target.value as Category)}
            className="h-full bg-transparent text-[13px] text-[#374151] font-medium focus:outline-none appearance-none cursor-pointer pr-1"
          >
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>

      {/* ── Charts row ──────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Complaint trends (2/3 width) */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <h2 className="text-[14px] font-bold text-[#111827]">Complaint Trends</h2>
              <div className="flex items-center gap-3 text-[11px]">
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm bg-[#4F46E5]" />Received</span>
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm bg-[#10B981]" />Resolved</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={COMPLAINT_TREND} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="fillComplaints" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.18} />
                      <stop offset="95%" stopColor="#4F46E5" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="fillResolved" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.18} />
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="complaints" name="Received" stroke="#4F46E5" strokeWidth={2} fill="url(#fillComplaints)" dot={false} />
                  <Area type="monotone" dataKey="resolved" name="Resolved" stroke="#10B981" strokeWidth={2} fill="url(#fillResolved)" dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Category breakdown pie (1/3) */}
        <Card>
          <CardHeader>
            <h2 className="text-[14px] font-bold text-[#111827]">Category Breakdown</h2>
          </CardHeader>
          <CardContent>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <RPieChart>
                  <Pie data={CATEGORY_DATA} cx="50%" cy="45%" innerRadius={52} outerRadius={78} dataKey="value" paddingAngle={2}>
                    {CATEGORY_DATA.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                  </Pie>
                  <Tooltip formatter={(v: number) => [v.toLocaleString(), 'Complaints']} contentStyle={{ fontSize: 12, borderRadius: 10 }} />
                  <Legend iconSize={8} iconType="circle" wrapperStyle={{ fontSize: 11 }} />
                </RPieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ── Resolution performance chart ─────────────────────────────── */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <h2 className="text-[14px] font-bold text-[#111827]">Resolution Performance (%)</h2>
            <span className="text-[12px] font-semibold text-emerald-600 flex items-center gap-1">
              <ArrowTrendingUpIcon className="w-3.5 h-3.5" />+13 pts over 7 months
            </span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-44">
            <ResponsiveContainer width="100%" height="100%">
              <RBarChart data={RESOLUTION_DATA} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
                <YAxis domain={[70, 95]} tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} unit="%" />
                <Tooltip formatter={(v: number) => [`${v}%`, 'Resolution Rate']} contentStyle={{ fontSize: 12, borderRadius: 10 }} />
                <Bar dataKey="rate" name="Resolution Rate" radius={[4, 4, 0, 0]}>
                  {RESOLUTION_DATA.map((entry, i) => (
                    <Cell key={i} fill={entry.rate >= 85 ? '#10B981' : entry.rate >= 80 ? '#4F46E5' : '#F59E0B'} />
                  ))}
                </Bar>
              </RBarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* ── Category-wise report table ───────────────────────────────── */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <h2 className="text-[14px] font-bold text-[#111827]">Category-wise Performance</h2>
            <Badge variant="default" className="text-[11px]">{filteredCategory.length} categories</Badge>
          </div>
        </CardHeader>
        <div className="overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="border-b border-[#F3F4F6]">
                <th className="text-left px-6 py-3 text-[11px] font-bold text-[#9CA3AF] uppercase tracking-wide">Category</th>
                <th className="text-right px-4 py-3 text-[11px] font-bold text-[#9CA3AF] uppercase tracking-wide">Total</th>
                <th className="text-right px-4 py-3 text-[11px] font-bold text-[#9CA3AF] uppercase tracking-wide">Resolved</th>
                <th className="text-right px-4 py-3 text-[11px] font-bold text-[#9CA3AF] uppercase tracking-wide">Pending</th>
                <th className="text-right px-4 py-3 text-[11px] font-bold text-[#9CA3AF] uppercase tracking-wide">Avg. Days</th>
                <th className="px-6 py-3 text-[11px] font-bold text-[#9CA3AF] uppercase tracking-wide">Resolution</th>
              </tr>
            </thead>
            <tbody>
              {filteredCategory.map((row) => {
                const rate = Math.round((row.resolved / row.total) * 100);
                return (
                  <tr key={row.category} className="border-b border-[#F9FAFB] hover:bg-[#F9FAFB] transition-colors">
                    <td className="px-6 py-3.5">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: row.color }} />
                        <span className="font-semibold text-[#111827]">{row.category}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 text-right font-medium text-[#374151]">{row.total.toLocaleString()}</td>
                    <td className="px-4 py-3.5 text-right text-emerald-600 font-semibold">{row.resolved.toLocaleString()}</td>
                    <td className="px-4 py-3.5 text-right text-red-500 font-semibold">{row.pending.toLocaleString()}</td>
                    <td className="px-4 py-3.5 text-right text-[#374151]">{row.avgDays}d</td>
                    <td className="px-6 py-3.5">
                      <div className="flex items-center gap-2 min-w-[120px]">
                        <div className="flex-1 h-1.5 bg-[#F3F4F6] rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all"
                            style={{ width: `${rate}%`, backgroundColor: rate >= 85 ? '#10B981' : rate >= 75 ? '#4F46E5' : '#F59E0B' }}
                          />
                        </div>
                        <span className="text-[12px] font-bold text-[#374151] w-8 text-right">{rate}%</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {/* ── Monthly reports section ──────────────────────────────────── */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-[16px] font-bold text-[#111827]">Monthly Reports</h2>
          <span className="text-[12px] text-[#9CA3AF]">{filteredMonthly.length} reports</span>
        </div>

        {filteredMonthly.length === 0 ? (
          <EmptyState onClear={clearAll} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <AnimatePresence mode="popLayout">
              {filteredMonthly.map((rep) => (
                <motion.div
                  key={rep.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card className="hover:shadow-lg transition-shadow group">
                    <CardContent className="p-5">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-[14px] font-bold text-[#111827] group-hover:text-[#4F46E5] transition-colors">
                            {rep.month}
                          </h3>
                          <p className="text-[11px] text-[#9CA3AF] mt-0.5">Generated {rep.generated}</p>
                        </div>
                        <div className="flex items-center gap-1">
                          {rep.trend === 'up' ? (
                            <ArrowTrendingUpIcon className="w-4 h-4 text-red-400" />
                          ) : rep.trend === 'down' ? (
                            <ArrowTrendingDownIcon className="w-4 h-4 text-green-500" />
                          ) : (
                            <span className="text-[#9CA3AF] text-lg">—</span>
                          )}
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="grid grid-cols-3 gap-2 mb-3">
                        <div className="text-center px-2 py-1.5 rounded-lg bg-[#F9FAFB] border border-[#F3F4F6]">
                          <p className="text-[18px] font-extrabold text-[#111827]">{rep.complaints.toLocaleString()}</p>
                          <p className="text-[9px] font-bold text-[#9CA3AF] uppercase tracking-wide">Total</p>
                        </div>
                        <div className="text-center px-2 py-1.5 rounded-lg bg-emerald-50 border border-emerald-100">
                          <p className="text-[18px] font-extrabold text-emerald-700">{rep.resolved.toLocaleString()}</p>
                          <p className="text-[9px] font-bold text-emerald-400 uppercase tracking-wide">Resolved</p>
                        </div>
                        <div className="text-center px-2 py-1.5 rounded-lg bg-[#EEF2FF] border border-[#C7D2FE]">
                          <p className="text-[18px] font-extrabold text-[#4F46E5]">{rep.rate}%</p>
                          <p className="text-[9px] font-bold text-[#4F46E5]/60 uppercase tracking-wide">Rate</p>
                        </div>
                      </div>

                      {/* Highlights */}
                      <ul className="space-y-1 mb-4">
                        {rep.highlights.map((h, i) => (
                          <li key={i} className="flex items-start gap-1.5 text-[11px] text-[#6B7280]">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#4F46E5] mt-1 flex-shrink-0" />
                            {h}
                          </li>
                        ))}
                      </ul>

                      {/* Actions */}
                      <div className="flex items-center gap-2 pt-3 border-t border-[#F3F4F6]">
                        <button
                          onClick={() => handleExport('PDF')}
                          className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-[11px] font-semibold bg-[#EEF2FF] text-[#4F46E5] hover:bg-[#4F46E5] hover:text-white transition-all"
                        >
                          <ArrowDownTrayIcon className="w-3.5 h-3.5" />PDF
                        </button>
                        <button
                          onClick={() => handleExport('CSV')}
                          className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-[11px] font-semibold bg-[#F3F4F6] text-[#374151] hover:bg-[#374151] hover:text-white transition-all"
                        >
                          <ArrowDownTrayIcon className="w-3.5 h-3.5" />CSV
                        </button>
                        <button
                          onClick={handleShare}
                          className="w-9 h-9 rounded-xl text-[#9CA3AF] hover:bg-[#F3F4F6] flex items-center justify-center transition-colors"
                          title="Share"
                        >
                          <ShareIcon className="w-4 h-4" />
                        </button>
                        <span className="text-[10px] text-[#9CA3AF] ml-1">{rep.size}</span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
