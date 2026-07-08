"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Squares2X2Icon, 
  MapIcon, 
  LightBulbIcon, 
  UserGroupIcon, 
  ChartBarIcon, 
  PresentationChartBarIcon, 
  DocumentTextIcon, 
  BellIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Command Center', href: '/dashboard', icon: Squares2X2Icon },
  { name: 'Intelligence Map', href: '/intelligence', icon: MapIcon },
  { name: 'AI Recommendations', href: '/recommendations', icon: LightBulbIcon },
  { name: 'Citizen Portal', href: '/citizen', icon: UserGroupIcon },
  { name: 'Projects & Monitoring', href: '/projects', icon: ChartBarIcon },
  { name: 'Reports & Analytics', href: '/reports', icon: PresentationChartBarIcon },
  { name: 'Alerts & Notificati...', href: '/alerts', icon: BellIcon, badge: 3 },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <nav className="hidden md:flex flex-col w-[260px] flex-shrink-0 h-screen bg-white border-r border-[#E5E7EB]" style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-[18px] border-b border-[#E5E7EB]">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#7C3AED] to-[#4F46E5] flex items-center justify-center shadow-sm flex-shrink-0">
          <SparklesIcon className="h-5 w-5 text-white" strokeWidth={2} />
        </div>
        <div className="leading-tight">
          <div className="text-[14px] font-bold text-[#111827] tracking-tight">People&apos;s Priorities</div>
          <div className="text-[10px] font-semibold text-[#6B7280] uppercase tracking-widest">AI Constituency OS</div>
        </div>
      </div>
      
      {/* Navigation */}
      <ul className="flex-1 px-3 py-5 space-y-0.5 overflow-y-auto">
        {navigation.map((item) => {
          const isActive = pathname === item.href || (pathname === '/' && item.href === '/dashboard');
          return (
            <li key={item.name}>
              <Link 
                href={item.href} 
                className={`flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-150 ${
                  isActive 
                    ? 'bg-[#EFF6FF] text-[#2563EB]' 
                    : 'text-[#374151] hover:bg-[#F9FAFB] hover:text-[#111827]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <item.icon 
                    className={`h-5 w-5 flex-shrink-0 ${isActive ? 'text-[#2563EB]' : 'text-[#6B7280]'}`} 
                    strokeWidth={isActive ? 2 : 1.5} 
                  />
                  <span className={`text-[14px] ${isActive ? 'font-semibold' : 'font-medium'}`}>
                    {item.name}
                  </span>
                </div>
                {item.badge && (
                  <span className="flex items-center justify-center h-5 min-w-[20px] px-1.5 rounded-full bg-red-500 text-white text-[10px] font-bold">
                    {item.badge}
                  </span>
                )}
              </Link>
            </li>
          );
        })}
      </ul>

      <div className="px-4 pb-5 space-y-4 border-t border-[#E5E7EB] pt-4">
        {/* AI System Score Widget */}
        <div className="bg-[#EEF2FF] rounded-2xl p-4 border border-[#C7D2FE]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider">AI System Score</span>
            <SparklesIcon className="h-4 w-4 text-[#4F46E5]" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-[28px] font-extrabold text-[#111827] leading-none">94</span>
            <span className="text-[13px] font-semibold text-[#6B7280]">/100</span>
          </div>
          <div className="mt-2.5 w-full bg-[#C7D2FE] h-1.5 rounded-full overflow-hidden">
            <div className="bg-[#4F46E5] h-full w-[94%] rounded-full" />
          </div>
          <p className="text-[11px] font-semibold text-emerald-600 mt-2">↑ 3 pts from last week</p>
        </div>

        {/* User Profile */}
        <Link href="/profile" className="flex items-center gap-3 px-2 py-2 rounded-xl hover:bg-[#F9FAFB] transition-colors group cursor-pointer -mx-1">
          <div className="flex items-center justify-center h-9 w-9 rounded-full bg-[#4F46E5] text-white font-bold text-sm shadow-sm flex-shrink-0 group-hover:opacity-90 transition-opacity">
            SV
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[13px] font-bold text-[#111827] truncate group-hover:text-[#4F46E5] transition-colors">Secretary Verma</p>
            <p className="text-[11px] font-medium text-[#6B7280] truncate">Rampur West MLA</p>
          </div>
        </Link>
      </div>
    </nav>
  );
}
