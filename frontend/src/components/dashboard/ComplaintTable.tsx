import React from 'react';
import { Complaint } from '../../types/dashboard';
import { motion } from 'framer-motion';

interface ComplaintTableProps {
  data: Complaint[];
}

export default function ComplaintTable({ data }: ComplaintTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-[#E5E7EB] bg-[#F9FAFB]">
            <th className="px-5 py-3 text-[10px] font-bold text-[#64748B] uppercase tracking-wider">ID</th>
            <th className="px-5 py-3 text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Title & Category</th>
            <th className="px-5 py-3 text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Status</th>
            <th className="px-5 py-3 text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Priority</th>
            <th className="px-5 py-3 text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Date</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#E5E7EB] bg-white">
          {data.map((c) => (
            <motion.tr 
              key={c.id} 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="hover:bg-[#F8FAFC] transition-colors group cursor-pointer"
            >
              <td className="px-5 py-4 whitespace-nowrap text-sm font-medium text-[#64748B]">#{c.id}</td>
              <td className="px-5 py-4">
                <div className="text-sm font-bold text-[#111827] group-hover:text-[#2563EB] transition-colors">{c.title}</div>
                <div className="text-[11px] font-medium text-[#64748B] mt-0.5">{c.category}</div>
              </td>
              <td className="px-5 py-4 whitespace-nowrap">
                <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold ${
                  c.status === 'Resolved' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' :
                  c.status === 'In Progress' ? 'bg-amber-50 text-amber-600 border border-amber-100' :
                  'bg-blue-50 text-blue-600 border border-blue-100'
                }`}>
                  {c.status}
                </span>
              </td>
              <td className="px-5 py-4 whitespace-nowrap">
                <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-semibold ${
                  c.priority === 'High' ? 'bg-red-50 text-red-600 border border-red-100' :
                  c.priority === 'Medium' ? 'bg-amber-50 text-amber-600 border border-amber-100' :
                  'bg-gray-50 text-gray-600 border border-gray-200'
                }`}>
                  {c.priority === 'High' && <span className="h-1.5 w-1.5 rounded-full bg-red-500" />}
                  {c.priority === 'Medium' && <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />}
                  {c.priority === 'Low' && <span className="h-1.5 w-1.5 rounded-full bg-gray-400" />}
                  {c.priority}
                </span>
              </td>
              <td className="px-5 py-4 whitespace-nowrap text-xs font-medium text-[#64748B]">
                {c.date || 'Today'}
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
