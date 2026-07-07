import React from 'react';
import Wizard from '@/components/citizen/Wizard';
import DashboardLayout from '@/components/layout/DashboardLayout';

export const metadata = {
  title: 'Citizen Portal | People Priority',
  description: 'Submit and track complaints in your city.',
};

export default function CitizenPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col items-center justify-center w-full max-w-3xl mx-auto pt-6 pb-20">
        <div className="text-center space-y-3 mb-10">
          <h1 className="text-3xl md:text-[32px] font-extrabold tracking-tight text-[#111827]">
            Citizen Complaint Portal
          </h1>
          <p className="text-[15px] text-[#6B7280]">
            Submit your concern. AI will analyse and prioritise it instantly.
          </p>
        </div>
        
        <div className="w-full">
          <Wizard />
        </div>
      </div>
    </DashboardLayout>
  );
}
