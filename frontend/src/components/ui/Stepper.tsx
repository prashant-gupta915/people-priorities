import React from 'react';
import clsx from 'clsx';

export interface StepperProps {
  steps: string[];
  currentStep: number; // 0-indexed
  className?: string;
}

export const Stepper: React.FC<StepperProps> = ({ steps, currentStep, className }) => {
  return (
    <div className={clsx("flex items-center justify-center w-full max-w-2xl mx-auto my-8", className)}>
      {steps.map((step, index) => {
        const isActive = index === currentStep;
        const isCompleted = index < currentStep;
        
        return (
          <React.Fragment key={step}>
            <div className="flex flex-col items-center">
              <div 
                className={clsx(
                  "w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold border-2 transition-colors",
                  isActive ? "bg-primary border-primary text-white" : 
                  isCompleted ? "bg-primary border-primary text-white" : 
                  "bg-gray-100 border-gray-200 text-muted"
                )}
              >
                {index + 1}
              </div>
            </div>
            
            {index < steps.length - 1 && (
              <div 
                className={clsx(
                  "flex-1 h-0.5 mx-4 transition-colors",
                  isCompleted ? "bg-primary" : "bg-gray-200"
                )}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};
