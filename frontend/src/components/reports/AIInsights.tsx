// src/components/reports/AIInsights.tsx
"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { SparklesIcon } from '@heroicons/react/24/outline';

const AIInsights: React.FC = () => {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm p-5"
    >
      <h3 className="text-lg font-bold text-[#111827] mb-4 flex items-center gap-2">
        <SparklesIcon className="h-5 w-5 text-[#4F46E5]" /> AI Insights
      </h3>
      <p className="text-sm text-[#6B7280]">AI-driven recommendations will appear here.</p>
    </motion.div>
  );
};

export default AIInsights;
