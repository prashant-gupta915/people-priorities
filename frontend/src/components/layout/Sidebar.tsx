"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Squares2X2Icon, 
  MapIcon, 
  LightBulbIcon, 
  UserGroupIcon, 
  ChartBarIcon, 
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
  { name: 'Reports', href: '/reports', icon: DocumentTextIcon },
  { name: 'Alerts & Notifications', href: '/alerts', icon: BellIcon, badge: 3 },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <nav className="hidden md:flex flex-col w-[260px] flex-shrink-0 h-screen bg-[#F9FAFB] border-r border-[#E5E7EB]">
      <div className="flex flex-col items-start px-6 py-5 border-b border-[#E5E7EB]">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#7C3AED] to-[#4F46E5] flex items-center justify-center shadow-sm">
            <SparklesIcon className="h-5 w-5 text-white" strokeWidth={2} />
          </div>
          <div className="leading-tight">
            <div className="text-sm font-bold text-[#111827] tracking-tight">People&apos;s Priorities</div>
            <div className="text-[10px] font-semibold text-[#6B7280] uppercase tracking-widest">AI Constituency OS</div>
          </div>
        </div>
      </div>
      
      <ul className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <li key={item.name}>
              <Link 
                href={item.href} 
                className={`flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-[#EEF2FF] text-[#4F46E5] font-semibold' 
                    : 'text-[#4B5563] hover:bg-[#F3F4F6] font-medium'
                }`}
              >
                <div className="flex items-center">
                  <item.icon className="h-5 w-5 mr-3" strokeWidth={isActive ? 2 : 1.5} />
                  <span className="text-sm">{item.name}</span>
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

      <div className="px-4 pb-6 space-y-4">
        {/* AI System Score Widget */}
        <div className="bg-[#EEF2FF] rounded-2xl p-4 border border-[#C7D2FE]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold text-[#4B5563] uppercase tracking-wider">AI System Score</span>
            <SparklesIcon className="h-4 w-4 text-[#4F46E5]" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-extrabold text-[#111827]">94</span>
            <span className="text-sm font-semibold text-[#6B7280]">/100</span>
          </div>
          <div className="mt-2 w-full bg-[#C7D2FE] h-1.5 rounded-full overflow-hidden">
            <div className="bg-[#4F46E5] h-full w-[94%] rounded-full" />
          </div>
          <p className="text-[10px] font-semibold text-emerald-600 mt-2">↑ 3 pts from last week</p>
        </div>

        {/* User Profile */}
        <div className="flex items-center gap-3 px-2 pt-2">
          <div className="flex items-center justify-center h-10 w-10 rounded-full bg-[#4F46E5] text-white font-semibold shadow-sm">
            SV
          </div>
          <div>
            <p className="text-sm font-bold text-[#111827]">Secretary Verma</p>
            <p className="text-xs font-medium text-[#6B7280]">Rampur West MLA</p>
          </div>
        </div>
      </div>
    </nav>
  );
}
