"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

export default function Step6Success() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="flex flex-col items-center justify-center py-12 text-center space-y-6"
    >
      {/* Animated check */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 220, damping: 16, delay: 0.15 }}
        className="w-24 h-24 rounded-full bg-[#ECFDF5] flex items-center justify-center shadow-lg"
      >
        <CheckCircleIcon className="w-14 h-14 text-[#10B981]" />
      </motion.div>

      {/* Text */}
      <div className="space-y-2 max-w-sm">
        <h2 className="text-[24px] font-bold text-[#111827]">Complaint Submitted!</h2>
        <p className="text-[15px] text-[#6B7280] leading-relaxed">
          Thank you for reporting. Your complaint ID is{' '}
          <span className="font-bold text-[#4F46E5]">
            #CP-{Math.floor(Math.random() * 90000) + 10000}
          </span>
          . AI is analysing it now.
        </p>
      </div>

      {/* Progress badge */}
      <div className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#EEF2FF] border border-[#C7D2FE]">
        <span className="w-2 h-2 rounded-full bg-[#4F46E5] animate-pulse" />
        <span className="text-[13px] font-semibold text-[#4F46E5]">AI Analysis in Progress…</span>
      </div>

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row gap-3 pt-4 w-full max-w-xs">
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="flex-1 px-6 py-3 rounded-full border border-[#E5E7EB] text-[#374151] font-semibold text-[15px] hover:bg-[#F9FAFB] transition"
        >
          New Complaint
        </button>
        <Link
          href="/dashboard"
          className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] text-white font-semibold text-[15px] hover:opacity-90 transition"
        >
          Dashboard
          <ArrowRightIcon className="w-4 h-4" strokeWidth={2.5} />
        </Link>
      </div>
    </motion.div>
  );
}
