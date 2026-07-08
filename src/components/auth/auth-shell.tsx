'use client';

import Link from 'next/link';
import { useTheme } from '@/contexts/theme-context';
import { cn } from '@/utils/helpers';

export function AuthShell({
  children,
  title,
  subtitle,
}: {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}) {
  const { theme, toggleTheme, mounted } = useTheme();

  return (
    <div style={{ backgroundColor: 'var(--bg)' }} className="relative min-h-screen">
      {/* Blobs */}
      <div
        aria-hidden
        className="pointer-events-none fixed -top-32 -left-32 h-[480px] w-[480px] rounded-full opacity-[0.06] blur-[100px] bg-primary"
      />
      <div
        aria-hidden
        className="pointer-events-none fixed -right-32 -bottom-32 h-[400px] w-[400px] rounded-full opacity-[0.04] blur-[100px] bg-purple"
      />

      {/* Fixed top bar */}
      <div
        style={{
          backgroundColor: 'var(--bg)',
          borderBottomColor: 'var(--border)',
        }}
        className="fixed top-0 left-0 right-0 z-50 flex h-14 items-center justify-between border-b px-4 sm:px-6"
      >
        <Link
          href="/login"
          className="flex items-center gap-2.5 transition-opacity hover:opacity-80"
        >
          <div className="flex h-[34px] w-[34px] items-center justify-center rounded-[9px] bg-primary text-[16px] text-white shadow-[0_2px_10px_rgba(37,99,235,.4)]">
            <i className="bi bi-mortarboard-fill" />
          </div>
          <span style={{ color: 'var(--t1)' }} className="text-[15px] font-bold tracking-tight">
            EduAdmin Pro
          </span>
        </Link>

        <button
          onClick={toggleTheme}
          aria-label="Toggle theme"
          style={{
            borderColor: 'var(--border)',
            backgroundColor: 'var(--surface)',
            color: 'var(--t2)',
          }}
          className="flex h-9 w-9 items-center justify-center rounded-[9px] border text-[15px] transition-all hover:border-primary hover:text-primary cursor-pointer"
        >
          {!mounted ? (
            <i className="bi bi-moon" />
          ) : theme === 'dark' ? (
            <i className="bi bi-sun" />
          ) : (
            <i className="bi bi-moon" />
          )}
        </button>
      </div>

      {/* Content */}
      <div className="flex min-h-screen flex-col items-center justify-center px-4 pb-12 pt-24">
        <div className="w-full max-w-[460px]">
          <div className="mb-5 text-center">
            <h1
              style={{ color: 'var(--t1)' }}
              className="text-[22px] font-extrabold tracking-tight"
            >
              {title}
            </h1>
            <p style={{ color: 'var(--t2)' }} className="mt-1.5 text-[13.5px]">
              {subtitle}
            </p>
          </div>
          <div
            style={{
              backgroundColor: 'var(--surface)',
              borderColor: 'var(--border)',
            }}
            className="w-full rounded-2xl border p-6 shadow-card sm:p-8"
          >
            {children}
          </div>
        </div>
        <p style={{ color: 'var(--t3)' }} className="mt-8 text-center text-[12px]">
          © {new Date().getFullYear()} EduAdmin Pro · All rights reserved
        </p>
      </div>
    </div>
  );
}

export function AuthInput({
  label,
  id,
  type = 'text',
  placeholder,
  autoComplete,
  hint,
  showToggle = false,
  value,
  onToggle,
  onChange,
  readOnly,
  required = true,
}: {
  label: string;
  id: string;
  type?: string;
  placeholder?: string;
  showToggle?: boolean;
  autoComplete?: string;
  hint?: string;
  value?: string | null;
  onToggle?: (data: boolean) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  readOnly?: boolean;
  required?: boolean;
}) {
  return (
    <div className="relative">
      <label
        htmlFor={id}
        style={{ color: 'var(--t2)' }}
        className="mb-1.5 block text-[12.5px] font-semibold"
      >
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        value={value ?? ''}
        onChange={onChange}
        required={required}
        readOnly={readOnly}
        style={{
          backgroundColor: 'var(--bg)',
          borderColor: 'var(--border)',
          color: 'var(--t1)',
        }}
        className={cn(
          'w-full rounded-[9px] border-[1.5px] px-3.5 py-2.5 text-[13.5px] placeholder:text-t3',
          'outline-none transition-all duration-150',
          ' focus:shadow-[0_0_0_3px_rgba(37,99,235,.1)]',
          readOnly && 'cursor-not-allowed',
        )}
      />
      {showToggle && (
        <i
          style={{
            backgroundColor: 'var(--bg)',
            borderColor: 'var(--border)',
            color: 'var(--t1)',
          }}
          className={
            hint
              ? 'absolute bottom-6 right-4 bi bi-toggle-off cursor-pointer'
              : 'absolute bottom-2 right-4 bi bi-toggle-off cursor-pointer'
          }
          onClick={() => onToggle?.(false)}
        ></i>
      )}
      {hint && (
        <p style={{ color: 'var(--t2)' }} className="-mt-0.5 text-[10px]">
          <i className="bi bi-info-circle-fill"></i> {hint}
        </p>
      )}
    </div>
  );
}

export function AuthSelectInput({
  label,
  id,
  defaultOption,
  list,
  autoComplete,
  hint,
  showToggle = false,
  showCaret = true,
  required = true,
  value,
  onToggle,
  onChange,
}: {
  label: string;
  id: string;
  defaultOption: string;
  list: string[];
  autoComplete?: string;
  hint?: string;
  showToggle?: boolean;
  showCaret?: boolean;
  required?: boolean;
  value?: string;
  onToggle?: (data: boolean) => void;
  onChange?: React.ChangeEventHandler<HTMLSelectElement>;
}) {
  return (
    <div className="relative">
      <label
        htmlFor={id}
        style={{ color: 'var(--t2)' }}
        className="mb-1.5 block text-[12.5px] font-semibold"
      >
        {label}
      </label>
      <select
        id={id}
        name={id}
        value={value}
        autoComplete={autoComplete}
        onChange={onChange}
        required={required}
        style={{
          backgroundColor: 'var(--bg)',
          borderColor: 'var(--border)',
          color: 'var(--t1)',
        }}
        className={cn(
          `w-full rounded-[9px] border-[1.5px] px-3.5 py-2.5 text-[13.5px] appearance-none ${
            value === '' ? 'text-t3!' : 'text-t1!'
          }`,
          'outline-none transition-all duration-150',
          ' focus:shadow-[0_0_0_3px_rgba(37,99,235,.1)]',
        )}
      >
        <option value="" disabled>
          {defaultOption}
        </option>
        {list.map((data) => (
          <option key={data} value={data}>
            {data}
          </option>
        ))}
      </select>
      {showCaret && (
        <i
          style={{
            color: 'var(--t3)',
          }}
          className={
            hint
              ? 'absolute bottom-10 right-2 bi bi-caret-down-fill text-t3 cursor-pointer'
              : 'absolute bottom-2 right-2 bi bi-caret-down-fill cursor-pointer'
          }
        ></i>
      )}
      {showToggle && (
        <i
          className={
            hint
              ? 'absolute bottom-6 right-4 bi bi-toggle-on cursor-pointer'
              : 'absolute bottom-2 right-4 bi bi-toggle-on cursor-pointer'
          }
          onClick={() => onToggle?.(true)}
        ></i>
      )}

      {hint && (
        <p style={{ color: 'var(--t2)' }} className="-mt-0.5 text-[10px]">
          <i className="bi bi-info-circle-fill"></i> {hint}
        </p>
      )}
    </div>
  );
}

export function AuthButton({
  children,
  type = 'submit',
  className,
  loading = false,
  onClick,
  ghost = false,
}: {
  children: React.ReactNode;
  type?: 'submit' | 'button';
  className?: string;
  onClick?: () => void;
  loading?: boolean;
  ghost?: boolean;
}) {
  return (
    <button
      type={type}
      disabled={loading}
      onClick={onClick}
      style={{
        backgroundColor: ghost ? 'transparent' : 'var(--btn-bg)',
        color: ghost ? 'var(--t2)' : 'var(--btn-t1)',
        borderColor: ghost ? 'var(--border)' : 'transparent',
      }}
      className={cn(
        'w-full flex justify-center rounded-[9px] border-[1.5px] text-[14px] font-semibold transition-all duration-300 enabled:hover:bg-transparent! hover:border-primary! enabled:hover:text-primary! enabled:hover:shadow-[0_3px_12px_rgba(37,99,235,.3)] cursor-pointer py-2.5 mt-2',
        ghost ? 'shadow-none! bg-transparent  hover:text-primary!' : '',
        loading ? 'cursor-not-allowed!' : '',
        className,
      )}
    >
      {loading && (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="20" height="20">
          <g fill="currentColor" stroke="currentColor" strokeWidth="15">
            <rect width="30" height="30" x="125" y="45">
              <animateTransform
                attributeName="transform"
                type="translate"
                calcMode="spline"
                dur="2"
                values="0 0;0 80;0 80;0 80;-80 80;"
                keySplines=".5 0 .5 1;.5 0 .5 1;.5 0 .5 1;.5 0 .5 1"
                repeatCount="indefinite"
              ></animateTransform>
            </rect>
            <rect width="30" height="30" x="45" y="45">
              <animateTransform
                attributeName="transform"
                type="translate"
                calcMode="spline"
                dur="2"
                values="0 0;0 0;80 0;80 0;80 0;"
                keySplines=".5 0 .5 1;.5 0 .5 1;.5 0 .5 1;.5 0 .5 1"
                repeatCount="indefinite"
              ></animateTransform>
            </rect>
            <rect width="30" height="30" x="45" y="125">
              <animateTransform
                attributeName="transform"
                type="translate"
                calcMode="spline"
                dur="2"
                values="0 0;0 0 ;0 0;0 -80;0 -80;"
                keySplines=".5 0 .5 1;.5 0 .5 1;.5 0 .5 1;.5 0 .5 1"
                repeatCount="indefinite"
              ></animateTransform>
            </rect>
          </g>
        </svg>
      )}
      {!loading && children}
    </button>
  );
}

export function AuthDivider({ label = 'or' }: { label?: string }) {
  return (
    <div className="my-5 flex items-center gap-3">
      <div style={{ backgroundColor: 'var(--border)' }} className="h-px flex-1" />
      <span style={{ color: 'var(--t3)' }} className="text-[11.5px] font-medium">
        {label}
      </span>
      <div style={{ backgroundColor: 'var(--border)' }} className="h-px flex-1" />
    </div>
  );
}

interface CtaButton {
  href: string;
  title: string;
}

interface AuthPageToastProps {
  title: string;
  subtitle: string;
  message: string;
  cta: CtaButton;
}

export function AuthPageToast({ title, subtitle, message, cta }: AuthPageToastProps) {
  return (
    <AuthShell title={title} subtitle={subtitle}>
      <div className="flex flex-col items-center gap-5 py-2">
        <div className="flex h-[72px] w-[72px] items-center justify-center rounded-full bg-green/10">
          <i className="bi bi-check2-circle text-[38px] text-green" />
        </div>
        <div className="w-full rounded-[9px] border border-dashed border-green/30 bg-green/5 px-4 py-3 text-center">
          <p className="text-[12.5px] text-green-text">{message}</p>
        </div>
        <Link
          href={cta.href}
          className={cn(
            'flex w-full items-center justify-center gap-2 rounded-[9px] bg-primary py-2.5',
            'text-[14px] font-bold text-white shadow-[0_3px_12px_rgba(37,99,235,.3)]',
            'transition-all hover:-translate-y-px hover:bg-primary-700',
          )}
        >
          <i className="bi bi-box-arrow-in-right" />
          {cta.title}
        </Link>
      </div>
    </AuthShell>
  );
}
