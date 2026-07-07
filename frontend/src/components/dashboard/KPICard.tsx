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
  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-[#E5E7EB] flex flex-col h-full">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-[11px] font-semibold text-[#6B7280] uppercase tracking-wider">{title}</h3>
        {Icon && (
          <div className={`p-1.5 rounded-md bg-gray-50 ${iconColor}`}>
            <Icon className="h-5 w-5" />
          </div>
        )}
      </div>
      
      <div className="text-3xl font-bold text-[#111827]">{value}</div>

      {/* Sparkline area */}
      <div className="h-12 w-full mt-2 mb-2">
        {sparklineData && sparklineData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={sparklineData}>
              <defs>
                <linearGradient id={`color-${title.replace(/\s+/g, '')}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={sparklineColor} stopOpacity={0.2} />
                  <stop offset="95%" stopColor={sparklineColor} stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke={sparklineColor} 
                fillOpacity={1} 
                fill={`url(#color-${title.replace(/\s+/g, '')})`} 
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <div className="w-full h-full border-b-2 border-dashed border-gray-200" />
        )}
      </div>

      {trend && (
        <div className="flex items-center gap-1.5 mt-auto">
          {trendUp ? (
            <ArrowTrendingUpIcon className="h-3.5 w-3.5 text-emerald-500" />
          ) : (
            <ArrowTrendingDownIcon className="h-3.5 w-3.5 text-red-500" />
          )}
          <span className={`text-xs font-semibold ${trendUp ? 'text-emerald-600' : 'text-red-500'}`}>
            {trend}
          </span>
          <span className="text-xs text-[#6B7280]">{trendLabel}</span>
        </div>
      )}
    </div>
  );
};

export default KPICard;
