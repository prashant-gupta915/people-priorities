"use client";

import React from 'react';
import { useFormContext } from 'react-hook-form';
import { ComplaintWizardFormData } from '../../types/citizen';
import {
  TagIcon,
  DocumentTextIcon,
  MapPinIcon,
  PhotoIcon,
  MicrophoneIcon,
} from '@heroicons/react/24/outline';

interface ReviewRowProps {
  label: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
}

function ReviewRow({ label, value, icon: Icon }: ReviewRowProps) {
  return (
    <div className="flex items-start gap-4 py-4 border-b border-[#F3F4F6] last:border-0">
      <div className="w-9 h-9 rounded-[10px] bg-[#F3F4F6] flex items-center justify-center flex-shrink-0 mt-0.5">
        <Icon className="w-5 h-5 text-[#6B7280]" />
      </div>
      <div>
        <p className="text-[12px] font-semibold text-[#9CA3AF] uppercase tracking-wide mb-0.5">
          {label}
        </p>
        <p className="text-[15px] font-medium text-[#111827] leading-snug">{value}</p>
      </div>
    </div>
  );
}

export default function Step5Review() {
  const { getValues } = useFormContext<ComplaintWizardFormData>();
  const data = getValues() as ComplaintWizardFormData & {
    images?: File[];
    audio?: File | null;
    latitude?: number;
    longitude?: number;
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-[22px] font-bold text-[#111827]">Review Your Complaint</h2>
        <p className="text-[15px] text-[#6B7280] mt-1">
          Please verify the details below before submitting.
        </p>
      </div>

      <div className="rounded-[16px] border border-[#E5E7EB] bg-white overflow-hidden shadow-sm">
        <div className="px-6 py-4 bg-[#F9FAFB] border-b border-[#E5E7EB]">
          <p className="text-[13px] font-bold text-[#374151] uppercase tracking-wide">
            Complaint Summary
          </p>
        </div>
        <div className="px-6">
          <ReviewRow
            label="Category"
            value={data.category || 'Not selected'}
            icon={TagIcon}
          />
          <ReviewRow
            label="Description"
            value={data.description || 'No description provided'}
            icon={DocumentTextIcon}
          />
          <ReviewRow
            label="Photos"
            value={
              data.images?.length
                ? `${data.images.length} photo(s) attached`
                : 'No photos attached'
            }
            icon={PhotoIcon}
          />
          <ReviewRow
            label="Voice Note"
            value={data.audio ? 'Voice note recorded' : 'No voice note'}
            icon={MicrophoneIcon}
          />
          <ReviewRow
            label="Location"
            value={
              data.latitude && data.longitude
                ? `${data.latitude.toFixed(5)}, ${data.longitude.toFixed(5)}`
                : 'No location selected'
            }
            icon={MapPinIcon}
          />
        </div>
      </div>

      {/* AI note */}
      <div className="flex items-start gap-3 px-4 py-3.5 rounded-[12px] bg-[#EEF2FF] border border-[#C7D2FE]">
        <div className="w-8 h-8 rounded-full bg-[#4F46E5] flex items-center justify-center flex-shrink-0 mt-0.5">
          <span className="text-white text-[12px] font-bold">AI</span>
        </div>
        <p className="text-[13px] text-[#3730A3] leading-relaxed">
          AI will analyse and prioritise your complaint instantly after submission.
        </p>
      </div>
    </div>
  );
}
