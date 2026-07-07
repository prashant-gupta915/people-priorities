import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import CopilotPanel from './CopilotPanel';

interface DashboardLayoutProps {
  children: React.ReactNode;
  /** When true, removes the default padding and max-width wrapper (e.g. for full-width map pages) */
  noPadding?: boolean;
}

export default function DashboardLayout({ children, noPadding = false }: DashboardLayoutProps) {
  return (
    <div className="flex h-screen bg-[#F3F4F6] overflow-hidden" style={{ fontFamily: 'Inter, sans-serif' }}>
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden relative">
        <Header />
        {noPadding ? (
          <main className="flex-1 overflow-hidden relative">
            {children}
          </main>
        ) : (
          <main className="flex-1 overflow-y-auto p-6">
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
