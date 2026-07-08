// src/components/reports/BudgetOverview.tsx
"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ChartBarIcon } from '@heroicons/react/24/outline';
import { useMockReportSummary } from '@/utils/mockReportData';

const BudgetOverview: React.FC = () => {
  const summary = useMockReportSummary();
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm p-5"
    >
      <h3 className="text-lg font-bold text-[#111827] mb-4 flex items-center gap-2">
        <ChartBarIcon className="h-5 w-5 text-[#4F46E5]" /> Budget Overview
      </h3>
      <div className="space-y-2 text-sm text-[#6B7280]">
        <p>Total Complaints: {summary.total}</p>
        <p>Resolved: {summary.resolved}</p>
        <p>Pending: {summary.pending}</p>
        <p>High Priority: {summary.highPriority}</p>
        <p>AI Confidence: {summary.aiConfidence}</p>
        <p>Last Updated: {summary.timestamp}</p>
      </div>
    </motion.div>
  );
};

export default BudgetOverview;
