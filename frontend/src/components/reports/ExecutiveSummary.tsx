"use client";
import { FC } from 'react';
import { motion } from 'framer-motion';
import KPICard from '@/components/dashboard/KPICard';
import { useMockReportSummary } from '@/utils/mockReportData'; // Updated import

const ExecutiveSummary: FC = () => {
  const summary = useMockReportSummary();
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm p-6"
    >
      <h2 className="text-lg font-bold text-[#111827] mb-4">Executive Summary</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        <KPICard title="Total Complaints" value={summary.total} iconColor="text-[#2563EB]" />
        <KPICard title="Resolved" value={summary.resolved} iconColor="text-[#10B981]" />
        <KPICard title="Pending" value={summary.pending} iconColor="text-[#EF4444]" />
        <KPICard title="High Priority" value={summary.highPriority} iconColor="text-[#8B5CF6]" />
        <KPICard title="AI Confidence" value={summary.aiConfidence} iconColor="text-[#F59E0B]" />
        <KPICard title="Generated" value={summary.timestamp} iconColor="text-[#64748B]" />
      </div>
    </motion.div>
  );
};

export default ExecutiveSummary;
