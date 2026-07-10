'use client';

import { usePathname } from 'next/navigation';
import { PAGE_META } from '@/lib/nav-config';
import { useSidebar } from '@/contexts/sidebar-context';
import { useTheme } from '@/contexts/theme-context';
import { useLoggedInUser } from '@/store/userStore';
import { LoadingSvg } from '@/components/ui/loading-svg';
import { cn, abbreviate, capitalize } from '@/utils/helpers';

export function Topbar() {
  const { collapsed, setMobileOpen } = useSidebar();
  const { theme, toggleTheme, mounted } = useTheme();
  const pathname = usePathname();
  const meta = PAGE_META[pathname] ?? { title: 'EduAdmin Pro', subtitle: '' };

  const { user, isLoading } = useLoggedInUser();

  return (
    <header
      style={{
        backgroundColor: 'var(--surface)',
        borderBottomColor: 'var(--border)',
        color: 'var(--t1)',
      }}
      className={cn(
        'fixed top-0 right-0 left-0 z-100 flex h-17 items-center gap-3.5',
        'border-b px-4 sm:px-6',
        'transition-[left] duration-300 ease-in-out',
        collapsed ? 'md:left-17' : 'md:left-65',
      )}
    >
      {/* Mobile hamburger */}
      <button
        style={{ color: 'var(--t2)' }}
        className="flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:bg-surface-2 hover:text-t1! md:hidden"
        onClick={() => setMobileOpen(true)}
        aria-label="Open menu"
      >
        <i className="bi bi-list text-xl" />
      </button>

      {/* Page title */}
      <div className="min-w-0">
        <h2 style={{ color: 'var(--t1)' }} className="truncate text-[15px] font-bold leading-tight">
          {meta.title}
        </h2>
        <span style={{ color: 'var(--t3)' }} className="hidden text-[11.5px] sm:block">
          {meta.subtitle}
        </span>
      </div>

      {/* Search */}
      <div className="relative ml-2 hidden max-w-85 flex-1 lg:block">
        <i
          style={{ color: 'var(--t3)' }}
          className="bi bi-search absolute top-1/2 left-3 -translate-y-1/2 text-[14px]"
        />
        <input
          type="text"
          placeholder="Search students, staff, classes…"
          style={{
            backgroundColor: 'var(--bg)',
            borderColor: 'var(--border)',
            color: 'var(--t1)',
          }}
          className={cn(
            'w-full rounded-[10px] border-[1.5px]',
            'py-2 pl-9 pr-3.5 text-[13px] placeholder:text-t3',
            'outline-none transition-all duration-150',
            'focus:border-primary focus:shadow-[0_0_0_3px_rgba(37,99,235,.12)]',
          )}
        />
      </div>

      {/* Right actions */}
      <div className="ml-auto flex items-center gap-0.5">
        <IconBtn label="Calendar">
          <i className="bi bi-calendar3" />
        </IconBtn>
        <IconBtn label="Messages" badge={3}>
          <i className="bi bi-chat" />
        </IconBtn>
        <IconBtn label="Notifications" badge={5}>
          <i className="bi bi-bell" />
        </IconBtn>

        <div
          style={{ backgroundColor: 'var(--border)' }}
          className="mx-1.5 hidden h-5.5 w-px sm:block"
        />

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          aria-label={mounted && theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          style={{
            backgroundColor: 'var(--bg)',
            borderColor: 'var(--border)',
            color: 'var(--t2)',
          }}
          className="relative flex h-9.5 w-9.5 items-center justify-center rounded-[10px] border-[1.5px] text-[17px] transition-all duration-150 hover:border-primary hover:text-primary cursor-pointer"
        >
          {/* Show a stable placeholder until mounted to avoid hydration mismatch */}
          {!mounted ? (
            <i className="bi bi-moon" />
          ) : theme === 'dark' ? (
            <i className="bi bi-sun" />
          ) : (
            <i className="bi bi-moon" />
          )}
        </button>

        {/* User chip */}
        {isLoading ? (
          <div className="w-full w-38!  h-13 flex justify-center items-center">
            <LoadingSvg />
          </div>
        ) : (
          <div className="ml-1 hidden cursor-pointer items-center gap-2.5 rounded-[10px] px-2.5 py-1.5 transition-colors hover:bg-surface-2 sm:flex">
            <div className="text-right">
              <p
                style={{ color: 'var(--t1)' }}
                className="text-[13px] font-semibold whitespace-nowrap"
              >
                {capitalize(`${user?.firstName} ${user?.lastName}`)}
              </p>
              <p style={{ color: 'var(--t3)' }} className="text-[11px]">
                {user?.designation
                  ? capitalize(`${user?.designation}`)
                  : capitalize(`${user?.role}`)}
              </p>
            </div>
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-linear-to-br from-primary to-purple text-xs font-bold text-white">
              {abbreviate(`${user?.firstName} ${user?.lastName}`)}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

function IconBtn({
  children,
  label,
  badge,
}: {
  children: React.ReactNode;
  label: string;
  badge?: number;
}) {
  return (
    <button
      aria-label={label}
      style={{ color: 'var(--t2)' }}
      className="relative flex h-9.5 w-9.5 items-center justify-center rounded-[10px] text-[18px] transition-colors duration-150 hover:bg-surface-2 hover:text-t1!"
    >
      {children}
      {badge !== undefined && (
        <span className="absolute top-1.5 right-1.5 flex h-3.75 w-3.75 items-center justify-center rounded-full border-2 border-surface bg-red text-[8.5px] font-bold text-white">
          {badge}
        </span>
      )}
    </button>
  );
}
