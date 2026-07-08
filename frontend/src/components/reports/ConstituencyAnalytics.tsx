"use client"

import React from 'react';
import { motion } from 'framer-motion';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from 'recharts';
import { useMockAnalytics } from '../../utils/mockReportData'; // placeholder hook

const COLORS = ['#4F46E5', '#7C3AED', '#EC4899', '#F59E0B'];

const ConstituencyAnalytics: React.FC = () => {
  const data = useMockAnalytics(); // expects {trend, categoryDist, wardPerf, resolutionRate, priorityBreakdown}

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm p-5 space-y-6"
    >
      <h3 className="text-lg font-bold text-[#111827]">Constituency Analytics</h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Complaint Trends */}
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data.trend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="complaints" stroke="#4F46E5" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        {/* Category Distribution */}
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data.categoryDist} dataKey="value" nameKey="name" innerRadius={60} outerRadius={80} paddingAngle={5} label>
                {data.categoryDist.map((_entry: any, index: number) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        {/* Ward Performance */}
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data.wardPerf}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="ward" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="complaints" fill="#7C3AED" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        {/* Resolution Rate */}
        <div className="h-64 flex items-center justify-center">
          <ResponsiveContainer width="80%" height="80%">
            <PieChart>
              <Pie data={data.resolutionRate} dataKey="value" nameKey="name" innerRadius={70} outerRadius={90} label>
                {data.resolutionRate.map((_entry: any, index: number) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        {/* Priority Breakdown */}
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data.priorityBreakdown} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="priority" type="category" />
              <Tooltip />
              <Bar dataKey="complaints" fill="#EF4444" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>
  );
};

export default ConstituencyAnalytics;
