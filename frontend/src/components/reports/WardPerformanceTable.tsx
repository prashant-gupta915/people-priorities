// src/components/reports/WardPerformanceTable.tsx
"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { TableCellsIcon } from '@heroicons/react/24/outline';

const WardPerformanceTable: React.FC = () => {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm p-5"
    >
      <h3 className="text-lg font-bold text-[#111827] mb-4 flex items-center gap-2">
        <TableCellsIcon className="h-5 w-5 text-[#4F46E5]" /> Ward Performance
      </h3>
      <p className="text-sm text-[#6B7280]">Table of ward performance metrics will be displayed here.</p>
    </motion.div>
  );
};

export default WardPerformanceTable;
