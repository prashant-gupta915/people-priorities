"use client";
import { MagnifyingGlassIcon, BellIcon } from '@heroicons/react/24/outline';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();
  let title = 'Command Center';
  if (pathname?.includes('/citizen')) title = 'Citizen Portal';
  else if (pathname?.includes('/intelligence')) title = 'Intelligence Map';
  else if (pathname?.includes('/recommendations')) title = 'AI Recommendations';
  else if (pathname?.includes('/projects')) title = 'Projects & Monitoring';
  else if (pathname?.includes('/reports')) title = 'Reports';
  else if (pathname?.includes('/alerts')) title = 'Alerts & Notifications';

  return (
    <header className="flex flex-shrink-0 items-center justify-between bg-white px-6 py-3 border-b border-[#E5E7EB]">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold text-[#111827]">{title}</h1>
      </div>
      <div className="flex items-center space-x-5">
        <div className="relative flex items-center">
          <MagnifyingGlassIcon className="absolute left-3 h-4 w-4 text-[#6B7280]" />
          <input
            type="text"
            placeholder="Search complaints, projects, schemes..."
            className="pl-9 pr-4 py-2 w-72 rounded-full border border-[#E5E7EB] bg-[#F9FAFB] text-sm focus:outline-none focus:ring-1 focus:ring-[#4F46E5] placeholder-[#6B7280]"
          />
        </div>
        
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-100">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-semibold text-emerald-600 tracking-wide">AI Active</span>
        </div>

        <button className="relative p-2 rounded-full text-[#6B7280] hover:bg-[#F3F4F6] border border-[#E5E7EB]">
          <BellIcon className="h-5 w-5" />
          <span className="absolute top-0 right-0 block h-4 w-4 rounded-full bg-red-500 text-white text-[10px] font-bold text-center leading-4 ring-2 ring-white">
            3
          </span>
        </button>

        <button className="flex items-center justify-center h-9 w-9 rounded-full bg-[#4F46E5] text-white font-semibold text-sm hover:opacity-90">
          SV
        </button>
      </div>
    </header>
  );
}
