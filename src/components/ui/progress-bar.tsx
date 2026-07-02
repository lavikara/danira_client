export function ProgressBar({ pct, color, className }: { pct: number; color: string; className?: string }) {
  return (
    <div
      style={{ backgroundColor: "var(--border-light)" }}
      className={`h-[5px] flex-1 overflow-hidden rounded-full ${className ?? ""}`}
    >
      <div
        className="h-full rounded-full transition-all"
        style={{ width: `${Math.min(100, Math.max(0, pct))}%`, backgroundColor: color }}
      />
    </div>
  );
}

export function ProgressRow({ label, value, pct, color }: { label: string; value: string | number; pct: number; color: string }) {
  return (
    <div>
      <div className="mb-1 flex justify-between">
        <span style={{ color: "var(--t2)" }} className="text-[13px]">{label}</span>
        <span className="font-bold" style={{ color }}>{value}</span>
      </div>
      <ProgressBar pct={pct} color={color} />
    </div>
  );
}

export function StatBar({ pct, color }: { pct: number; color: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="min-w-[32px] text-right text-[12.5px] font-bold" style={{ color }}>{pct}%</span>
      <ProgressBar pct={pct} color={color} />
    </div>
  );
}
