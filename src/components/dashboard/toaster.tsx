'use client';

import type { Toast } from '@/hooks/useToast';
import { ToastItem } from './toast-item';

export type ToastPosition =
  | 'top-right'
  | 'top-left'
  | 'top-center'
  | 'bottom-right'
  | 'bottom-left'
  | 'bottom-center';

interface ToasterProps {
  toasts: Toast[];
  onDismiss: (id: string) => void;
  position?: ToastPosition;
  maxVisible?: number;
}

const POSITION_CLASS: Record<ToastPosition, string> = {
  'top-right': 'toaster--top-right',
  'top-left': 'toaster--top-left',
  'top-center': 'toaster--top-center',
  'bottom-right': 'toaster--bottom-right',
  'bottom-left': 'toaster--bottom-left',
  'bottom-center': 'toaster--bottom-center',
};

export function Toaster({
  toasts,
  onDismiss,
  position = 'bottom-right',
  maxVisible = 5,
}: ToasterProps) {
  const visible = toasts.slice(-maxVisible);

  if (visible.length === 0) return null;

  return (
    <div aria-label="Notifications" className={['toaster', POSITION_CLASS[position]].join(' ')}>
      {visible.map((t) => (
        <ToastItem key={t.id} toast={t} onDismiss={onDismiss} />
      ))}
    </div>
  );
}
