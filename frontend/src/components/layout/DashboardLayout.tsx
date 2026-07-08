import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import CopilotPanel from './CopilotPanel';

interface DashboardLayoutProps {
  children: React.ReactNode;
  noPadding?: boolean;
}

export default function DashboardLayout({ children, noPadding = false }: DashboardLayoutProps) {
  return (
    <div className="flex h-screen bg-white overflow-hidden text-[#111827]" style={{ fontFamily: 'Inter, sans-serif' }}>
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden relative bg-[#F8FAFC]">
        {/* Subtle radial gradient background as in Figma */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 60% 50% at 50% -10%, rgba(79,70,229,0.08) 0%, transparent 70%)',
          }}
        />
        <Header />
        {noPadding ? (
          <main className="flex-1 overflow-hidden relative z-0">
            {children}
          </main>
        ) : (
          <main className="flex-1 overflow-y-auto p-6 lg:p-8 relative z-0">
            <div className="max-w-[1400px] mx-auto">
              {children}
            </div>
          </main>
        )}
      </div>
      <CopilotPanel />
    </div>
  );
}
