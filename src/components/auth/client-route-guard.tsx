// components/ClientRouteGuard.tsx
'use client';

import { useAuth } from '@/contexts/auth-context';
import { useRouter, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function ClientRouteGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  const [done, setDone] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (
      !isLoading &&
      !isAuthenticated &&
      !['/forgot-password', '/signup', '/reset-password'].includes(pathname)
    ) {
      router.replace('/login');
    }
    if (!isLoading && isAuthenticated) {
      router.replace('/');
    }
  }, [isAuthenticated, isLoading, pathname, router]);

  if (isLoading) {
    setTimeout(() => {
      setDone(true);
    }, 100);
    return <></>;
  }

  if (done) {
    return <>{children}</>;
  }
}
