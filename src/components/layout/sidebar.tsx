'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV_SECTIONS } from '@/lib/nav-config';
import { useSidebar } from '@/contexts/sidebar-context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useToastContext } from '@/contexts/toast-context';
import { cn, abbreviate, capitalize } from '@/utils/helpers';
import { LoadingSvg } from '@/components/ui/loading-svg';
import { useLoggedInUser } from '@/store/userStore';

export function Sidebar() {
  const { collapsed, toggleSidebar, mobileOpen, setMobileOpen } = useSidebar();
  const pathname = usePathname();

  const router = useRouter();
  const { error } = useToastContext();
  const { user, isLoading, fetchLoggedInUser } = useLoggedInUser();

  useEffect(() => {
    fetchLoggedInUser({
      onError: (errorMessage) => {
        error('User not found', { description: errorMessage });
      },
    });
  }, [fetchLoggedInUser, error]);

  const handleLogout = async () => {
    const res = await fetch('/api/auth/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    const logout = await res.json();
    if (logout.success) router.replace('/login');
  };

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-150 bg-black/40 backdrop-blur-sm md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* ── Sidebar panel ── */}
      <aside
        style={{
          backgroundColor: 'var(--sidebar-bg)',
          borderRightColor: 'var(--sidebar-border)',
        }}
        className={cn(
          'fixed top-0 left-0 z-200 flex h-screen flex-col',
          'border-r shadow-sidebar',
          /* No overflow-hidden here — it was clipping the toggle button */
          'transition-[width,transform] duration-300 ease-in-out',
          collapsed ? 'w-17' : 'w-65',
          'md:translate-x-0',
          mobileOpen ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        {/* ── Logo header ── */}
        <div
          style={{ borderBottomColor: 'var(--sidebar-border)' }}
          className="relative flex h-17 shrink-0 items-center border-b px-3 overflow-hidden"
        >
          {/* Mortarboard — always visible */}
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-primary text-[18px] text-white shadow-[0_2px_8px_rgba(37,99,235,.35)]">
            <i className="bi bi-mortarboard-fill" />
          </div>

          {/* Brand text — fades/slides out when collapsed */}
          <div
            className={cn(
              'ml-2.5 min-w-0 transition-all duration-300',
              collapsed ? 'w-0 opacity-0' : 'w-30 opacity-100',
            )}
          >
            <p
              style={{ color: 'var(--sidebar-text)' }}
              className="truncate text-[15px] font-bold tracking-tight"
            >
              EduAdmin Pro
            </p>
            <p
              style={{ color: 'var(--sidebar-label)' }}
              className="truncate text-[9.5px] font-medium uppercase tracking-widest"
            >
              Management System
            </p>
          </div>
        </div>

        {/* ── Nav ── */}
        <nav className="flex-1 overflow-y-auto overflow-x-hidden px-2 py-3">
          {NAV_SECTIONS.map((section) => (
            <div key={section.label} className="mb-1">
              <div
                style={{ color: 'var(--sidebar-label)' }}
                className={cn(
                  'mb-0.5 px-2 pt-2.5 pb-0.5 text-[9.5px] font-bold uppercase tracking-[1.4px] whitespace-nowrap transition-all duration-200',
                  collapsed && 'h-0 overflow-hidden py-0 opacity-0',
                )}
              >
                {section.label}
              </div>

              {section.items.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.key}
                    href={item.href}
                    title={item.label}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      'group mb-0.5 flex items-center gap-2.5 rounded-[9px] px-2.5 py-2.25',
                      'transition-all duration-150',
                      active
                        ? 'bg-primary shadow-[0_2px_10px_rgba(37,99,235,.28)]'
                        : 'hover:bg-sidebar-hover',
                    )}
                  >
                    <i
                      style={active ? { color: '#fff' } : { color: 'var(--sidebar-text-sub)' }}
                      className={cn(
                        item.icon,
                        'w-5 shrink-0 text-center text-[16px] transition-colors duration-150',
                        !active && 'group-hover:text-sidebar-text!',
                      )}
                    />
                    <span
                      style={active ? { color: '#fff' } : { color: 'var(--sidebar-text-sub)' }}
                      className={cn(
                        'flex-1 truncate text-[13px] font-medium transition-all duration-200',
                        !active && 'group-hover:text-sidebar-text!',
                        collapsed ? 'w-0 overflow-hidden opacity-0' : 'opacity-100',
                      )}
                    >
                      {item.label}
                    </span>

                    {item.badge && !collapsed && (
                      <span
                        className={cn(
                          'shrink-0 rounded-full px-1.5 py-px text-[10px] font-bold',
                          active ? 'bg-white/25 text-white' : 'bg-primary/10 text-primary',
                        )}
                      >
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>

        {/* ── User footer ── */}
        <div style={{ borderTopColor: 'var(--sidebar-border)' }} className="shrink-0 border-t p-2">
          {isLoading ? (
            <div className="w-full h-13 flex justify-center items-center">
              <LoadingSvg />
            </div>
          ) : (
            <div className="flex items-center gap-2.5 rounded-[9px] px-2.5 py-2 transition-colors hover:bg-sidebar-hover cursor-pointer">
              <div className="flex h-8.5 w-8.5 shrink-0 items-center justify-center rounded-[9px] bg-linear-to-br from-primary to-purple text-xs font-bold text-white">
                {abbreviate(`${user?.firstName} ${user?.lastName}`)}
              </div>
              <div
                className={cn(
                  'min-w-0 transition-all duration-200',
                  collapsed ? 'w-0 overflow-hidden opacity-0' : 'opacity-100',
                )}
              >
                <p
                  style={{ color: 'var(--sidebar-text)' }}
                  className="truncate text-[13px] font-semibold"
                >
                  {capitalize(`${user?.firstName} ${user?.lastName}`)}
                </p>
                <p style={{ color: 'var(--sidebar-label)' }} className="text-[11px]">
                  {user?.designation
                    ? capitalize(`${user?.designation}`)
                    : capitalize(`${user?.role}`)}
                </p>
              </div>
            </div>
          )}

          <button
            className="mt-0.5 flex w-full items-center gap-2.5 rounded-[9px] px-2.5 py-2 text-left transition-colors hover:bg-red/8 cursor-pointer"
            onClick={() => {
              handleLogout();
            }}
          >
            <i className="bi bi-box-arrow-right w-5 shrink-0 text-center text-[16px] text-red/60" />
            <span
              style={{ color: 'var(--sidebar-text-sub)' }}
              className={cn(
                'truncate text-[13px] transition-all duration-200',
                collapsed ? 'w-0 overflow-hidden opacity-0' : 'opacity-100',
              )}
            >
              Log Out
            </span>
          </button>
        </div>
      </aside>

      {/* ── Toggle button — floats on the RIGHT EDGE of the sidebar, outside overflow ──
          Rendered outside <aside> entirely so it is never clipped.
          Positioned fixed, tracks the sidebar width via CSS transition.          */}
      <button
        onClick={toggleSidebar}
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        style={{
          backgroundColor: 'var(--sidebar-bg)',
          borderColor: 'var(--sidebar-border)',
          color: 'var(--sidebar-text-sub)',
          left: collapsed ? 'calc(68px - 14px)' : 'calc(260px - 14px)',
        }}
        className={cn(
          'fixed top-8.5 z-201 -translate-y-1/2',
          'hidden md:flex',
          'h-7 w-7 items-center justify-center cursor-pointer',
          'rounded-full border-2 shadow-md',
          'transition-[left] duration-300 ease-in-out',
          'hover:border-primary hover:text-primary hover:bg-surface',
          collapsed && 'rotate-180',
        )}
      >
        <i className="bi bi-chevron-left text-[12px] font-bold" />
      </button>
    </>
  );
}
