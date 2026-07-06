'use client';

import { AuthProvider } from '@/contexts/auth-context';
import ClientRouteGuard from '@/components/auth/client-route-guard';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <ClientRouteGuard>{children}</ClientRouteGuard>
    </AuthProvider>
  );
}
