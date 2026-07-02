"use client";

import Link from "next/link";

interface QuickAction { label: string; icon: string; color: string; href: string; }

const COLOR_STYLE: Record<string, React.CSSProperties> = {
  blue:   { backgroundColor: "var(--color-primary-50)", color: "var(--color-primary)" },
  green:  { backgroundColor: "var(--green-bg)",  color: "var(--color-green)"  },
  orange: { backgroundColor: "var(--orange-bg)", color: "var(--color-orange)" },
  purple: { backgroundColor: "var(--purple-bg)", color: "var(--color-purple)" },
};

export function QuickActions({ actions }: { actions: readonly QuickAction[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {actions.map((a) => (
        <Link key={a.label} href={a.href}
          className="flex flex-col items-center gap-2.5 rounded-xl border p-4 text-center transition-all hover:-translate-y-0.5 hover:border-primary hover:shadow-card"
          style={{ borderColor: "var(--border)", backgroundColor: "var(--surface)" }}
        >
          <div className="flex h-[42px] w-[42px] items-center justify-center rounded-[11px] text-xl"
            style={COLOR_STYLE[a.color] ?? COLOR_STYLE.blue}>
            <i className={a.icon} />
          </div>
          <span className="text-xs font-semibold" style={{ color: "var(--t2)" }}>{a.label}</span>
        </Link>
      ))}
    </div>
  );
}
