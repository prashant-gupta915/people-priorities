"use client";

import React from "react";
import { SparklesIcon, CpuChipIcon } from "@heroicons/react/24/outline";

const liveInsights = [
  { dot: 'bg-red-500', text: 'Water supply crisis escalating' },
  { dot: 'bg-amber-400', text: 'Road accident risk — NH-48' },
  { dot: 'bg-emerald-500', text: 'Vaccination coverage +12%' },
];

const suggestedPrompts = [
  "Which sectors need immediate attention?",
  "Predict monsoon infrastructure risks",
];

export default function CopilotPanel() {
  return (
    <aside className="hidden lg:flex flex-col w-[320px] flex-shrink-0 h-screen bg-[#F9FAFB] border-l border-[#E5E7EB]">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-[#E5E7EB]">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center h-10 w-10 rounded-full bg-[#4F46E5] text-white">
            <CpuChipIcon className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-[#111827]">AI Copilot</h2>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[11px] font-semibold text-emerald-600">Reasoning active</span>
            </div>
          </div>
        </div>
        <div className="px-2 py-1 rounded-full bg-[#EEF2FF] text-[#4F46E5] text-[10px] font-bold">
          GPT-4o
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-6 space-y-8">
        
        {/* Live Insights */}
        <div>
          <h3 className="text-[11px] font-bold text-[#6B7280] uppercase tracking-wider mb-4">
            Live Insights
          </h3>
          <ul className="space-y-4">
            {liveInsights.map((insight, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className={`h-2.5 w-2.5 rounded-full mt-1 flex-shrink-0 ${insight.dot}`} />
                <span className="text-sm font-medium text-[#111827]">{insight.text}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* AI Summary Card */}
        <div className="bg-white rounded-2xl border border-[#E5E7EB] p-4 shadow-sm flex gap-3 items-start">
          <div className="flex items-center justify-center h-6 w-6 rounded-full bg-[#EEF2FF] text-[#4F46E5] flex-shrink-0">
            <SparklesIcon className="h-3.5 w-3.5" />
          </div>
          <p className="text-[13px] text-[#4B5563] leading-relaxed font-medium">
            Good morning! I&apos;ve analysed 12,482 complaints across Rampur West. Water supply issues in Sector 7B need immediate attention — 847 overlapping complaints detected in the last 48 hours.
          </p>
        </div>

        {/* Suggested Prompts */}
        <div>
          <h3 className="text-[11px] font-bold text-[#6B7280] uppercase tracking-wider mb-3">
            Suggested
          </h3>
          <ul className="space-y-2">
            {suggestedPrompts.map((prompt, idx) => (
              <li key={idx}>
                <button className="w-full text-left px-4 py-3 rounded-xl border border-[#E5E7EB] bg-white text-[13px] font-medium text-[#4B5563] hover:border-[#4F46E5] hover:text-[#4F46E5] transition-colors shadow-sm">
                  {prompt}
                </button>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </aside>
  );
}
