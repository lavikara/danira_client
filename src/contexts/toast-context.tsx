'use client';

import { createContext, useContext, type ReactNode } from 'react';
import { useToast, type ToastOptions } from '@/hooks/useToast';
import { Toaster, type ToastPosition } from '@/components/dashboard/toaster';

interface ToastContextValue {
  toast: (options: ToastOptions) => string;
  success: (title: string, options?: Omit<ToastOptions, 'title' | 'variant'>) => string;
  error: (title: string, options?: Omit<ToastOptions, 'title' | 'variant'>) => string;
  warning: (title: string, options?: Omit<ToastOptions, 'title' | 'variant'>) => string;
  info: (title: string, options?: Omit<ToastOptions, 'title' | 'variant'>) => string;
  primary: (title: string, options?: Omit<ToastOptions, 'title' | 'variant'>) => string;
  dismiss: (id: string) => void;
  dismissAll: () => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

interface ToastProviderProps {
  children: ReactNode;
  position?: ToastPosition;
  maxVisible?: number;
}

/**
 * Wrap your app (or a section of it) with ToastProvider, then call
 * useToastContext() anywhere in the tree to fire toasts.
 *
 * Usage in layout.tsx:
 *   <ToastProvider position="bottom-right">
 *     {children}
 *   </ToastProvider>
 */
export function ToastProvider({
  children,
  position = 'top-right',
  maxVisible = 5,
}: ToastProviderProps) {
  const { toasts, toast, dismiss, dismissAll, success, error, warning, info, primary } = useToast();

  return (
    <ToastContext.Provider
      value={{ toast, dismiss, dismissAll, success, error, warning, info, primary }}
    >
      {children}
      <Toaster toasts={toasts} onDismiss={dismiss} position={position} maxVisible={maxVisible} />
    </ToastContext.Provider>
  );
}

/** Call inside any child of <ToastProvider> to fire toasts. */
export function useToastContext(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error('useToastContext must be used within a <ToastProvider>');
  }
  return ctx;
}
