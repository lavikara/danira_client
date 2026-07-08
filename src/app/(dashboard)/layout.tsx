import { SidebarProvider } from '@/contexts/sidebar-context';
import { AuthProvider } from '@/contexts/auth-context';
import ClientRouteGuard from '@/components/auth/client-route-guard';
import { getLoggedInUserAction } from '@/app/(dashboard)/actions/userActions';
import { AppShell } from '@/components/layout/app-shell';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  // const loggedInUser = await getLoggedInUserAction();
  return (
    // <AuthProvider>
    //   <ClientRouteGuard>
    <SidebarProvider>
      <AppShell>{children}</AppShell>
    </SidebarProvider>
    //   </ClientRouteGuard>
    // </AuthProvider>
  );
}
