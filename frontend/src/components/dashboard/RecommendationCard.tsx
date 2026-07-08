import { FC } from 'react';
import { ArrowRightIcon, CpuChipIcon } from '@heroicons/react/24/outline';

interface RecommendationCardProps {
  text: string;
  description?: string;
  impact?: string;
}

const RecommendationCard: FC<RecommendationCardProps> = ({ text, description, impact }) => {
  const isHigh = impact === 'High';
  const isCritical = impact === 'Critical';
  
  const priorityNum = isCritical ? 'P1' : isHigh ? 'P2' : 'P3';
  const priorityBg = isCritical ? 'bg-red-600' : isHigh ? 'bg-amber-500' : 'bg-blue-500';
  const impactLabel = isCritical ? 'Critical' : isHigh ? 'High' : 'Medium';
  const impactBadgeBg = isCritical ? 'bg-red-50 border-red-200 text-red-600' : isHigh ? 'bg-amber-50 border-amber-200 text-amber-600' : 'bg-blue-50 border-blue-200 text-blue-600';
  const confidence = isCritical ? '94%' : isHigh ? '89%' : '87%';
  const beneficiaries = isCritical ? '23,500' : isHigh ? '41,200' : '18,900';
  const estCost = isCritical ? '₹2.4 Cr' : isHigh ? '₹8.7 Cr' : '₹3.1 Cr';
  const scheme = isCritical ? 'Jal Jeevan ...' : isHigh ? 'PMGSY' : 'PMAY';
  const timeline = isCritical ? '3 months' : isHigh ? '6 months' : '4 months';

  return (
    <div className="bg-white rounded-2xl border border-[#E5E7EB] p-5 shadow-sm hover:shadow-md transition-shadow duration-200">
      {/* Top Row: Priority pill + Confidence */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          {/* Priority Circle */}
          <div className={`flex items-center justify-center h-7 w-7 rounded-full ${priorityBg} text-white text-[11px] font-extrabold flex-shrink-0`}>
            {priorityNum}
          </div>
          {/* Impact Badge */}
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full border text-[11px] font-bold ${impactBadgeBg}`}>
            {impactLabel}
          </span>
        </div>
        {/* Confidence chip */}
        <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#F3F4F6] border border-[#E5E7EB]">
          <CpuChipIcon className="h-3 w-3 text-[#4F46E5]" strokeWidth={2} />
          <span className="text-[11px] font-bold text-[#4F46E5]">{confidence}</span>
        </div>
      </div>

      {/* Title */}
      <h4 className="text-[15px] font-bold text-[#111827] mb-1.5 leading-snug">{text}</h4>
      {/* Description */}
      <p className="text-[12px] font-medium text-[#6B7280] mb-4 leading-relaxed">
        {description || 'AI detected overlapping complaints about service issues.'}
      </p>

      {/* 2×2 Stats Grid */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div>
          <div className="text-[10px] font-semibold text-[#9CA3AF] mb-0.5">Beneficiaries</div>
          <div className="text-[13px] font-bold text-[#111827]">{beneficiaries}</div>
        </div>
        <div>
          <div className="text-[10px] font-semibold text-[#9CA3AF] mb-0.5">Est. Cost</div>
          <div className="text-[13px] font-bold text-[#111827]">{estCost}</div>
        </div>
        <div>
          <div className="text-[10px] font-semibold text-[#9CA3AF] mb-0.5">Scheme</div>
          <div className="text-[13px] font-bold text-[#111827]">{scheme}</div>
        </div>
        <div>
          <div className="text-[10px] font-semibold text-[#9CA3AF] mb-0.5">Timeline</div>
          <div className="text-[13px] font-bold text-[#111827]">{timeline}</div>
        </div>
      </div>

      {/* CTA Button */}
      <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#4F46E5] text-white text-[13px] font-bold hover:opacity-90 transition-opacity shadow-sm">
        View Full Analysis
        <ArrowRightIcon className="h-3.5 w-3.5" strokeWidth={2.5} />
      </button>
    </div>
  );
};

export default RecommendationCard;
