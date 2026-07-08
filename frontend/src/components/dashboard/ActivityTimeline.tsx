import React from 'react';
import { motion } from 'framer-motion';

const activities = [
  {
    id: 1,
    title: 'AI detected complaint cluster — Sector 7B',
    time: '10:32 AM',
    color: 'bg-purple-500',
  },
  {
    id: 2,
    title: 'New complaint submitted: Water shortage, Ward 12',
    time: '09:15 AM',
    color: 'bg-blue-500',
  },
  {
    id: 3,
    title: 'Road repair project completed — Zone C',
    time: 'Yesterday',
    color: 'bg-emerald-500',
  },
  {
    id: 4,
    title: 'AI generated monthly constituency report',
    time: '2 days ago',
    color: 'bg-purple-500',
  },
  {
    id: 5,
    title: '₹4.2 Cr street lighting project approved',
    time: '3 days ago',
    color: 'bg-emerald-500',
  },
];

export default function ActivityTimeline() {
  return (
    <div className="bg-[#F9FAFB] rounded-2xl border border-[#E5E7EB] p-6 shadow-sm h-full">
      <h2 className="text-base font-bold text-[#111827] mb-6">Activity Timeline</h2>
      <div className="relative border-l-2 border-[#E5E7EB] ml-3 space-y-6">
        {activities.map((activity, index) => (
          <motion.div 
            key={activity.id} 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative pl-6"
          >
            {/* Timeline Dot */}
            <div className={`absolute -left-[9px] top-1.5 w-4 h-4 rounded-full border-4 border-[#F9FAFB] ${activity.color} shadow-sm z-10`}></div>
            
            {/* Content */}
            <div className="flex flex-col">
              <h4 className="text-sm font-semibold text-[#111827]">{activity.title}</h4>
              <span className="text-[11px] font-medium text-[#64748B] mt-0.5">{activity.time}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
