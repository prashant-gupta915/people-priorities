"use client";

import React from 'react';
import { CheckIcon } from '@heroicons/react/24/solid';

interface ProgressStepperProps {
  currentStep: number; // 0-indexed
  steps: string[];
}

export default function ProgressStepper({ currentStep, steps }: ProgressStepperProps) {
  return (
    <div className="w-full flex justify-center items-center py-4">
      <div className="flex items-center gap-0">
        {steps.map((label, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;
          const isUpcoming = index > currentStep;

          return (
            <React.Fragment key={index}>
              {/* Circle */}
              <div className="flex flex-col items-center">
                <div
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center text-[15px] font-bold z-10 transition-all duration-300 shadow-sm
                    ${isCompleted ? 'bg-[#10B981] text-white' : ''}
                    ${isCurrent ? 'bg-[#4F46E5] text-white ring-4 ring-[#4F46E5]/20' : ''}
                    ${isUpcoming ? 'bg-[#F3F4F6] text-[#9CA3AF] border border-[#E5E7EB]' : ''}
                  `}
                >
                  {isCompleted ? (
                    <CheckIcon className="w-5 h-5" />
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>
              </div>

              {/* Connector line */}
              {index < steps.length - 1 && (
                <div
                  className={`w-16 sm:w-24 h-0.5 mx-0 transition-colors duration-300 ${
                    isCompleted ? 'bg-[#10B981]' : 'bg-[#E5E7EB]'
                  }`}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
