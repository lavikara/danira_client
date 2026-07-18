'use client';

import { ReactNode } from 'react';
import { Sidebar } from './sidebar';
import { Topbar } from './topbar';
import { useSidebar } from '@/contexts/sidebar-context';
import { cn } from '@/utils/helpers';

export function AppShell({ children }: { children: ReactNode }) {
  const { collapsed } = useSidebar();

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg)' }}>
      <Sidebar />
      <Topbar />
      <main
        className={cn(
          'mt-17 min-h-[calc(100vh-68px)] p-4 transition-[margin-left] duration-300 sm:p-6',
          collapsed ? 'md:ml-17' : 'md:ml-65',
        )}
      >
        <div className="animate-fade-up">{children}</div>
      </main>
    </div>
  );
}
