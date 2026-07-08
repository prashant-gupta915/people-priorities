"use client";
import { FC } from 'react';
import { ArrowTrendingUpIcon, ArrowTrendingDownIcon } from '@heroicons/react/24/outline';
import { ResponsiveContainer, AreaChart, Area } from 'recharts';

interface KPICardProps {
  title: string;
  value: string | number;
  icon?: React.ElementType;
  iconColor?: string;
  trend?: string;
  trendUp?: boolean;
  trendLabel?: string;
  sparklineData?: Array<{ value: number }>;
  sparklineColor?: string;
}

const KPICard: FC<KPICardProps> = ({ 
  title, 
  value, 
  icon: Icon, 
  iconColor = 'text-[#4F46E5]',
  trend,
  trendUp = true,
  trendLabel = 'vs last month',
  sparklineData,
  sparklineColor = '#4F46E5'
}) => {
  const gradientId = `spark-${title.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9-]/g, '')}`;
  
  return (
    <div className="bg-white rounded-2xl border border-[#E5E7EB] p-5 shadow-sm flex flex-col overflow-hidden hover:shadow-md transition-shadow duration-200">
      {/* Top Row: Label + Icon */}
      <div className="flex items-start justify-between mb-1">
        <span className="text-[10px] font-bold text-[#6B7280] uppercase tracking-widest leading-none">
          {title}
        </span>
        {Icon && (
          <div className={`flex-shrink-0 ${iconColor} opacity-80`}>
            <Icon className="h-5 w-5" strokeWidth={1.5} />
          </div>
        )}
      </div>

      {/* Big Value */}
      <div className="text-[28px] font-extrabold text-[#111827] tracking-tight leading-none mt-2">
        {value}
      </div>

      {/* Sparkline */}
      <div className="h-12 w-full mt-3 -mx-1">
        {sparklineData && sparklineData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={sparklineData} margin={{ top: 2, right: 0, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={sparklineColor} stopOpacity={0.25} />
                  <stop offset="95%" stopColor={sparklineColor} stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="value"
                stroke={sparklineColor}
                fillOpacity={1}
                fill={`url(#${gradientId})`}
                strokeWidth={1.5}
                dot={false}
                isAnimationActive={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <div className="w-full h-full" />
        )}
      </div>

      {/* Trend Footer */}
      {trend && (
        <div className="flex items-center gap-1 mt-2">
          {trendUp ? (
            <ArrowTrendingUpIcon className="h-3.5 w-3.5 text-emerald-500 flex-shrink-0" strokeWidth={2} />
          ) : (
            <ArrowTrendingDownIcon className="h-3.5 w-3.5 text-red-500 flex-shrink-0" strokeWidth={2} />
          )}
          <span className={`text-[11px] font-bold ${trendUp ? 'text-emerald-600' : 'text-red-500'}`}>
            {trend}
          </span>
          <span className="text-[11px] font-medium text-[#9CA3AF]">{trendLabel}</span>
        </div>
      )}
    </div>
  );
};

export default KPICard;
