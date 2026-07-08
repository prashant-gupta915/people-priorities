"use client"
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CalendarIcon, FunnelIcon, MapPinIcon, TagIcon, ClipboardIcon } from '@heroicons/react/24/outline';

const ReportFilters: React.FC = () => {
  const [dateRange, setDateRange] = useState('Last 30 days');
  const [ward, setWard] = useState('All');
  const [category, setCategory] = useState('All');
  const [priority, setPriority] = useState('All');
  const [status, setStatus] = useState('All');

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm p-5"
    >
      <h3 className="text-lg font-bold text-[#111827] mb-4">Report Filters</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Date Range */}
        <div className="flex items-center gap-2">
          <CalendarIcon className="h-5 w-5 text-[#4F46E5]" />
          <select
            className="flex-1 rounded border border-[#E5E7EB] p-2 text-sm"
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
          >
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 90 days</option>
            <option>All Time</option>
          </select>
        </div>
        {/* Ward */}
        <div className="flex items-center gap-2">
          <MapPinIcon className="h-5 w-5 text-[#4F46E5]" />
          <select
            className="flex-1 rounded border border-[#E5E7EB] p-2 text-sm"
            value={ward}
            onChange={(e) => setWard(e.target.value)}
          >
            <option>All</option>
            <option>Ward 1</option>
            <option>Ward 2</option>
            <option>Ward 3</option>
          </select>
        </div>
        {/* Category */}
        <div className="flex items-center gap-2">
          <TagIcon className="h-5 w-5 text-[#4F46E5]" />
          <select
            className="flex-1 rounded border border-[#E5E7EB] p-2 text-sm"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>All</option>
            <option>Road</option>
            <option>Water</option>
            <option>Electricity</option>
          </select>
        </div>
        {/* Priority */}
        <div className="flex items-center gap-2">
          <FunnelIcon className="h-5 w-5 text-[#4F46E5]" />
          <select
            className="flex-1 rounded border border-[#E5E7EB] p-2 text-sm"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option>All</option>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>
        {/* Status */}
        <div className="flex items-center gap-2">
          <ClipboardIcon className="h-5 w-5 text-[#4F46E5]" />
          <select
            className="flex-1 rounded border border-[#E5E7EB] p-2 text-sm"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option>All</option>
            <option>Open</option>
            <option>In Progress</option>
            <option>Resolved</option>
          </select>
        </div>
      </div>
    </motion.div>
  );
};

export default ReportFilters;
