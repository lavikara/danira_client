'use client';

import { useState, useCallback, useRef } from 'react';

export type ToastVariant = 'success' | 'error' | 'warning' | 'info' | 'primary';

export interface Toast {
  id: string;
  title: string;
  description?: string;
  variant: ToastVariant;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export interface ToastOptions {
  title: string;
  description?: string;
  variant?: ToastVariant;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const counterRef = useRef(0);

  const toast = useCallback((options: ToastOptions) => {
    const id = `toast-${++counterRef.current}-${Date.now()}`;
    const newToast: Toast = {
      id,
      title: options.title,
      description: options.description,
      variant: options.variant ?? 'info',
      duration: options.duration ?? 4500,
      action: options.action,
    };

    setToasts((prev) => [...prev, newToast]);
    return id;
  }, []);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const dismissAll = useCallback(() => {
    setToasts([]);
  }, []);

  // Convenience methods matching EduAdmin Pro's colour variants
  const success = useCallback(
    (title: string, options?: Omit<ToastOptions, 'title' | 'variant'>) =>
      toast({ ...options, title, variant: 'success' }),
    [toast],
  );

  const error = useCallback(
    (title: string, options?: Omit<ToastOptions, 'title' | 'variant'>) =>
      toast({ ...options, title, variant: 'error' }),
    [toast],
  );

  const warning = useCallback(
    (title: string, options?: Omit<ToastOptions, 'title' | 'variant'>) =>
      toast({ ...options, title, variant: 'warning' }),
    [toast],
  );

  const info = useCallback(
    (title: string, options?: Omit<ToastOptions, 'title' | 'variant'>) =>
      toast({ ...options, title, variant: 'info' }),
    [toast],
  );

  const primary = useCallback(
    (title: string, options?: Omit<ToastOptions, 'title' | 'variant'>) =>
      toast({ ...options, title, variant: 'primary' }),
    [toast],
  );

  return {
    toasts,
    toast,
    dismiss,
    dismissAll,
    success,
    error,
    warning,
    info,
    primary,
  };
}
