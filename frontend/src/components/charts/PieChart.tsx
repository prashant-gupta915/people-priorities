"use client";
import React from 'react';
import { PieChart as RechartsPieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

export default function PieChart({ data }: { data: Array<{ name: string; complaints: number }> }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Distribution</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsPieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="complaints"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: '#f9fafb' }}
            />
            <Legend />
          </RechartsPieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
