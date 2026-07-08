"use client";
import { MagnifyingGlassIcon, BellIcon, CpuChipIcon } from '@heroicons/react/24/outline';
import { usePathname } from 'next/navigation';
import { useCopilot } from '@/context/CopilotContext';

export default function Header() {
  const pathname = usePathname();
  const { isOpen, toggle } = useCopilot();

  let title = 'Command Center';
  if (pathname?.includes('/citizen')) title = 'Citizen Portal';
  else if (pathname?.includes('/intelligence')) title = 'Intelligence Map';
  else if (pathname?.includes('/recommendations')) title = 'AI Recommendations';
  else if (pathname?.includes('/projects')) title = 'Projects & Monitoring';
  else if (pathname?.includes('/reports')) title = 'Reports & Analytics';
  else if (pathname?.includes('/alerts')) title = 'Alerts & Notifications';

  return (
    <header className="sticky top-0 z-20 flex flex-shrink-0 h-[60px] items-center justify-between bg-white px-6 border-b border-[#E5E7EB]" style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* Page Title */}
      <h1 className="text-[17px] font-bold text-[#111827] tracking-tight whitespace-nowrap">{title}</h1>

      {/* Center: Search */}
      <div className="flex-1 flex justify-center px-8 max-w-2xl mx-auto">
        <div className="relative w-full max-w-[500px]">
          <MagnifyingGlassIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#9CA3AF]" />
          <input
            type="text"
            placeholder="Search complaints, projects, schemes..."
            className="w-full pl-10 pr-4 py-2 h-9 rounded-full border border-[#E5E7EB] bg-[#F9FAFB] text-[13px] font-medium text-[#374151] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/30 focus:border-[#4F46E5] placeholder-[#9CA3AF] transition-all"
          />
        </div>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-3 flex-shrink-0">
        {/* AI Active pill */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#E5E7EB] shadow-sm">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[12px] font-semibold text-[#111827]">AI Active</span>
        </div>

        {/* Bell */}
        <button className="relative flex items-center justify-center h-9 w-9 rounded-full text-[#6B7280] hover:bg-[#F3F4F6] transition-colors border border-[#E5E7EB]">
          <BellIcon className="h-5 w-5" />
          <span className="absolute top-0 right-0 flex items-center justify-center h-4 w-4 rounded-full bg-red-500 text-white text-[9px] font-bold ring-2 ring-white">
            3
          </span>
        </button>

        {/* AI Copilot toggle */}
        <button
          onClick={toggle}
          title={isOpen ? 'Hide AI Copilot' : 'Show AI Copilot'}
          className={`relative flex items-center justify-center h-9 w-9 rounded-full transition-all border shadow-sm ${
            isOpen
              ? 'bg-[#4F46E5] text-white border-[#4F46E5] hover:bg-[#4338CA]'
              : 'bg-white text-[#6B7280] border-[#E5E7EB] hover:bg-[#EEF2FF] hover:text-[#4F46E5] hover:border-[#4F46E5]'
          }`}
        >
          <CpuChipIcon className="h-5 w-5" />
        </button>

        {/* Avatar */}
        <button className="flex items-center justify-center h-9 w-9 rounded-full bg-[#4F46E5] text-white font-bold text-[13px] hover:opacity-90 shadow-sm transition-opacity">
          SV
        </button>
      </div>
    </header>
  );
}
