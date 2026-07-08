"use client";
import React from 'react';
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function BarChart({ data }: { data: Array<{ name: string; complaints: number }> }) {
  return (
    <div className="flex-1 flex flex-col min-h-0">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-bold text-[#111827]">Issue Categories</h3>
        <span className="text-[11px] font-semibold text-[#64748B]">Last 7 months</span>
      </div>
      <div className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsBarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="name" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip
              contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: '#f9fafb' }}
              itemStyle={{ color: '#60a5fa' }}
            />
            <Bar dataKey="complaints" fill="#8B5CF6" radius={[4, 4, 0, 0]} barSize={24} />
          </RechartsBarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
