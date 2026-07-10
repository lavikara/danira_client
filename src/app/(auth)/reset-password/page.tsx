'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';
import { patch } from '@/app/api/apiClient';
import { AuthShell, AuthButton, AuthPageToast } from '@/components/auth/auth-shell';
import { ResetPasswordFormData } from '@/types/definitions';
import { useToastContext } from '@/contexts/toast-context';
import { cn } from '@/utils/helpers';

/* ── Password strength helper ── */
function getStrength(pw: string): {
  score: number;
  label: string;
  color: string;
} {
  let score = 0;
  if (pw.length >= 8) score++;
  if (pw.length >= 12) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  const levels = [
    { label: '', color: 'bg-border' },
    { label: 'Weak', color: 'bg-red' },
    { label: 'Fair', color: 'bg-orange' },
    { label: 'Good', color: 'bg-yellow-400' },
    { label: 'Strong', color: 'bg-green' },
    { label: 'Very Strong', color: 'bg-teal' },
  ];
  return { score, ...levels[score] };
}

function ResetPasswordContent() {
  const params = useSearchParams();
  const token = params.get('token') ?? '';

  const [newPw, setNewPw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [showNew, setShowNew] = useState(false);
  const [showConf, setShowConf] = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const { error } = useToastContext();

  const strength = getStrength(newPw);
  const mismatch = confirmPw.length > 0 && newPw !== confirmPw;
  const canSubmit = newPw.length >= 8 && newPw === confirmPw;

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!canSubmit) return;
    const payload: ResetPasswordFormData = {
      token,
      newPassword: newPw,
    };
    setLoading(true);
    const response = await patch('/api/auth/resetPassword', payload);
    if (response.success) {
      setLoading(false);
      setDone(true);
    } else {
      setLoading(false);
      error('Password reset failed', {
        description: response.error,
      });
    }
  };

  if (done) {
    return (
      <AuthPageToast
        title="Password updated!"
        subtitle="You can now sign in with your new password"
        message="Your password has been set successfully. Use it to sign in to your dashboard."
        cta={{ href: '/login', title: 'Go to Sign In' }}
      />
    );
  }

  return (
    <AuthShell title="Set your new password" subtitle="Create a secure password to continue.">
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        {/* New password */}
        <div>
          <label htmlFor="new_pw" className="mb-1.5 block text-[12.5px] font-semibold text-t2">
            New Password
          </label>
          <div className="relative">
            <input
              id="new_pw"
              type={showNew ? 'text' : 'password'}
              value={newPw}
              onChange={(e) => setNewPw(e.target.value)}
              placeholder="Min. 8 characters"
              autoComplete="new-password"
              className="w-full rounded-[9px] border-[1.5px] border-border bg-bg px-3.5 py-2.5 pr-10 text-[13.5px] text-t1 placeholder:text-t3 outline-none transition-all focus:border-primary focus:bg-surface focus:shadow-[0_0_0_3px_rgba(37,99,235,.1)]"
            />
            <button
              type="button"
              tabIndex={-1}
              onClick={() => setShowNew((v) => !v)}
              className="absolute top-1/2 right-3 -translate-y-1/2 text-[16px] text-t3 hover:text-t2"
            >
              <i className={showNew ? 'bi bi-eye-slash' : 'bi bi-eye'} />
            </button>
          </div>

          {/* Strength bar */}
          {newPw.length > 0 && (
            <div className="mt-2">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className={cn(
                      'h-[3px] flex-1 rounded-full transition-colors duration-300',
                      i <= strength.score ? strength.color : 'bg-border',
                    )}
                  />
                ))}
              </div>
              {strength.label && (
                <p className="mt-1 text-[11px] text-t3">
                  Strength:{' '}
                  <span
                    className={cn(
                      'font-semibold',
                      strength.score <= 1
                        ? 'text-red'
                        : strength.score === 2
                          ? 'text-orange'
                          : strength.score === 3
                            ? 'text-yellow-500'
                            : 'text-green',
                    )}
                  >
                    {strength.label}
                  </span>
                </p>
              )}
            </div>
          )}

          <p className="mt-1 text-[11px] text-t3">
            Use 8+ characters with uppercase, numbers, and symbols.
          </p>
        </div>

        {/* Confirm password */}
        <div>
          <label htmlFor="confirm_pw" className="mb-1.5 block text-[12.5px] font-semibold text-t2">
            Confirm New Password
          </label>
          <div className="relative">
            <input
              id="confirm_pw"
              type={showConf ? 'text' : 'password'}
              value={confirmPw}
              onChange={(e) => setConfirmPw(e.target.value)}
              placeholder="Re-enter your new password"
              autoComplete="new-password"
              className={cn(
                'w-full rounded-[9px] border-[1.5px] bg-bg px-3.5 py-2.5 pr-10 text-[13.5px] text-t1 placeholder:text-t3 outline-none transition-all',
                mismatch
                  ? 'border-red focus:border-red focus:shadow-[0_0_0_3px_rgba(239,68,68,.1)]'
                  : 'border-border focus:border-primary focus:bg-surface focus:shadow-[0_0_0_3px_rgba(37,99,235,.1)]',
              )}
            />
            <button
              type="button"
              tabIndex={-1}
              onClick={() => setShowConf((v) => !v)}
              className="absolute top-1/2 right-3 -translate-y-1/2 text-[16px] text-t3 hover:text-t2"
            >
              <i className={showConf ? 'bi bi-eye-slash' : 'bi bi-eye'} />
            </button>
          </div>
          {mismatch && (
            <p className="mt-1 flex items-center gap-1 text-[11.5px] text-red">
              <i className="bi bi-exclamation-circle" />
              Passwords do not match
            </p>
          )}
          {!mismatch && confirmPw.length > 0 && newPw === confirmPw && (
            <p className="mt-1 flex items-center gap-1 text-[11.5px] text-green">
              <i className="bi bi-check-circle" />
              Passwords match
            </p>
          )}
        </div>

        {/* Requirements checklist */}
        <div className="rounded-[9px] border border-border-light bg-surface-2 px-4 py-3">
          <p className="mb-2 text-[11.5px] font-semibold text-t2">Password requirements:</p>
          <div className="flex flex-col gap-1">
            {[
              { label: 'At least 8 characters', met: newPw.length >= 8 },
              { label: 'One uppercase letter (A–Z)', met: /[A-Z]/.test(newPw) },
              { label: 'One number (0–9)', met: /[0-9]/.test(newPw) },
              {
                label: 'One special character (!@#…)',
                met: /[^A-Za-z0-9]/.test(newPw),
              },
            ].map((req) => (
              <div key={req.label} className="flex items-center gap-2">
                <i
                  className={cn(
                    'text-[13px]',
                    req.met ? 'bi bi-check-circle-fill text-green' : 'bi bi-circle text-t3',
                  )}
                />
                <span className={cn('text-[11.5px]', req.met ? 'text-t1' : 'text-t3')}>
                  {req.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <AuthButton loading={loading}>
          <span
            className={cn('flex items-center justify-center gap-2', !canSubmit && 'opacity-50')}
          >
            <i className="bi bi-lock-fill" />
            Set New Password
          </span>
        </AuthButton>

        <p className="text-center text-[12px] text-t3">
          Already have your credentials?{' '}
          <Link href="/login" className="font-semibold text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </form>
    </AuthShell>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <AuthShell title="Loading…" subtitle="Please wait">
          <div className="h-[300px] animate-pulse rounded-xl bg-border-light" />
        </AuthShell>
      }
    >
      <ResetPasswordContent />
    </Suspense>
  );
}
