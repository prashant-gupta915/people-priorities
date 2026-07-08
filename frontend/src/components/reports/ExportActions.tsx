// src/components/reports/ExportActions.tsx
"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';

const ExportActions: React.FC = () => {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm p-5 flex items-center justify-between"
    >
      <h3 className="text-lg font-bold text-[#111827]">Export Options</h3>
      <button className="flex items-center gap-2 bg-[#4F46E5] text-white px-4 py-2 rounded-md hover:bg-[#4338CA]">
        <ArrowDownTrayIcon className="h-5 w-5" /> Export PDF
      </button>
    </motion.div>
  );
};

export default ExportActions;
