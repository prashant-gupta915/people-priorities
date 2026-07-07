"use client";

import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import {
  BeakerIcon,
  TruckIcon,
  HeartIcon,
  AcademicCapIcon,
  ArchiveBoxIcon,
  BoltIcon,
} from '@heroicons/react/24/outline';
import type { ComplaintForm } from './Wizard';

const CATEGORIES = [
  { id: 'Water', label: 'Water Supply', icon: BeakerIcon, color: '#3B82F6' },
  { id: 'Road', label: 'Roads & Transport', icon: TruckIcon, color: '#F59E0B' },
  { id: 'Healthcare', label: 'Healthcare', icon: HeartIcon, color: '#EF4444' },
  { id: 'Education', label: 'Education', icon: AcademicCapIcon, color: '#8B5CF6' },
  { id: 'Waste', label: 'Sanitation', icon: ArchiveBoxIcon, color: '#10B981' },
  { id: 'Electricity', label: 'Electricity', icon: BoltIcon, color: '#F59E0B' },
];

export default function Step2Category() {
  const {
    control,
    formState: { errors },
  } = useFormContext<ComplaintForm>();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-[22px] font-bold text-[#111827]">Select Issue Category</h2>
        <p className="text-[15px] text-[#6B7280] mt-1">
          What type of problem are you reporting?
        </p>
      </div>

      <Controller
        name="category"
        control={control}
        render={({ field: { onChange, value } }) => (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const isSelected = value === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => onChange(cat.id)}
                  className={`
                    flex flex-col items-center justify-center gap-3 p-5 rounded-[16px] border-2 transition-all duration-200 text-center
                    ${
                      isSelected
                        ? 'border-[#4F46E5] bg-[#EEF2FF] shadow-md'
                        : 'border-[#E5E7EB] bg-white hover:border-[#C7D2FE] hover:bg-[#F9FAFB]'
                    }
                  `}
                >
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: isSelected ? '#EEF2FF' : '#F9FAFB' }}
                  >
                    <Icon
                      className="w-6 h-6"
                      style={{ color: isSelected ? '#4F46E5' : cat.color }}
                    />
                  </div>
                  <span
                    className={`text-[14px] font-semibold leading-tight ${
                      isSelected ? 'text-[#4F46E5]' : 'text-[#374151]'
                    }`}
                  >
                    {cat.label}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      />

      {errors.category && (
        <p className="text-[13px] font-semibold text-red-500">
          {errors.category.message as string}
        </p>
      )}
    </div>
  );
}
