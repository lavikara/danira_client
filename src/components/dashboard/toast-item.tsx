'use client';

import { useEffect, useRef, useState } from 'react';
import type { Toast } from '@/hooks/useToast';

interface ToastItemProps {
  toast: Toast;
  onDismiss: (id: string) => void;
}

const VARIANT_CONFIG = {
  success: {
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="8" r="7.5" stroke="currentColor" strokeWidth="1.25" />
        <path
          d="M5 8.5l2 2 4-4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    // EduAdmin Pro: --green:#10B981 / --green-bg:#ECFDF5 / --green-text:#065F46
    containerClass: 'toast--success',
    progressClass: 'toast__progress--success',
  },
  error: {
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="8" r="7.5" stroke="currentColor" strokeWidth="1.25" />
        <path
          d="M5.5 5.5l5 5M10.5 5.5l-5 5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
    // EduAdmin Pro: --red:#EF4444 / --red-bg:#FEF2F2 / --red-text:#991B1B
    containerClass: 'toast--error',
    progressClass: 'toast__progress--error',
  },
  warning: {
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path
          d="M8 2L14.5 13.5H1.5L8 2z"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinejoin="round"
        />
        <path d="M8 6.5v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="8" cy="11" r="0.75" fill="currentColor" />
      </svg>
    ),
    // EduAdmin Pro: --orange:#F59E0B / --orange-bg:#FFFBEB / --orange-text:#92400E
    containerClass: 'toast--warning',
    progressClass: 'toast__progress--warning',
  },
  info: {
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="8" r="7.5" stroke="currentColor" strokeWidth="1.25" />
        <path d="M8 7v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="8" cy="5" r="0.75" fill="currentColor" />
      </svg>
    ),
    // EduAdmin Pro: --teal:#06B6D4 / --teal-bg:#ECFEFF / --teal-text:#164E63
    containerClass: 'toast--info',
    progressClass: 'toast__progress--info',
  },
  primary: {
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="8" r="7.5" stroke="currentColor" strokeWidth="1.25" />
        <path
          d="M6 8l1.5 1.5L10.5 6"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    // EduAdmin Pro: --primary:#2563EB / --primary-50:#EFF6FF
    containerClass: 'toast--primary',
    progressClass: 'toast__progress--primary',
  },
} as const;

export function ToastItem({ toast, onDismiss }: ToastItemProps) {
  const [visible, setVisible] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const startTimeRef = useRef<number>(0);
  const remainingRef = useRef<number>(toast.duration ?? 4500);
  const config = VARIANT_CONFIG[toast.variant];

  const startTimer = () => {
    startTimeRef.current = Date.now();
    timerRef.current = setTimeout(() => {
      handleDismiss();
    }, remainingRef.current);
  };

  const pauseTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      remainingRef.current -= Date.now() - startTimeRef.current;
    }
  };

  const handleDismiss = () => {
    setLeaving(true);
    setTimeout(() => onDismiss(toast.id), 280);
  };

  useEffect(() => {
    // Trigger enter animation after mount
    const frame = requestAnimationFrame(() => {
      requestAnimationFrame(() => setVisible(true));
    });
    startTimer();

    return () => {
      cancelAnimationFrame(frame);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleMouseEnter = () => {
    setPaused(true);
    pauseTimer();
  };

  const handleMouseLeave = () => {
    setPaused(false);
    startTimer();
  };

  const duration = toast.duration ?? 4500;

  return (
    <div
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      className={[
        'toast',
        config.containerClass,
        visible && !leaving ? 'toast--visible' : '',
        leaving ? 'toast--leaving' : '',
      ]
        .filter(Boolean)
        .join(' ')}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Icon */}
      <div className="toast__icon">{config.icon}</div>

      {/* Content */}
      <div className="toast__content">
        <p className="toast__title">{toast.title}</p>
        {toast.description && <p className="toast__description">{toast.description}</p>}
        {toast.action && (
          <button
            className="toast__action"
            onClick={() => {
              toast.action!.onClick();
              handleDismiss();
            }}
          >
            {toast.action.label}
          </button>
        )}
      </div>

      {/* Close button */}
      <button className="toast__close" onClick={handleDismiss} aria-label="Dismiss notification">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path
            d="M2 2l10 10M12 2L2 12"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
          />
        </svg>
      </button>

      {/* Progress bar */}
      <div className="toast__progress-track">
        <div
          className={['toast__progress', config.progressClass].join(' ')}
          style={{
            animationDuration: `${duration}ms`,
            animationPlayState: paused ? 'paused' : 'running',
          }}
        />
      </div>
    </div>
  );
}
