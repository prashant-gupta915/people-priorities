"use client";
import React from 'react';
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function BarChart({ data }: { data: Array<{ name: string; complaints: number }> }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Complaints by Month</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsBarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="name" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip
              contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: '#f9fafb' }}
              itemStyle={{ color: '#60a5fa' }}
            />
            <Bar dataKey="complaints" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          </RechartsBarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
