import { cn } from "@/utils/helpers";

type BadgeColor =
  | "green"
  | "red"
  | "orange"
  | "blue"
  | "purple"
  | "teal"
  | "gray"
  | "pink"
  | "indigo";

export function Badge({
  color = "gray",
  children,
  className,
}: {
  color?: BadgeColor;
  children: React.ReactNode;
  className?: string;
}) {
  // Use inline styles so dark-mode CSS variable overrides are picked up at runtime
  const bgVar =
    color === "blue" ? "var(--color-primary-50)" : `var(--${color}-bg)`;
  const textVar =
    color === "blue"
      ? "var(--color-primary-700, #1d4ed8)"
      : `var(--${color}-text)`;
  const dotColor =
    color === "blue" ? "var(--color-primary)" : `var(--${color}-text)`;

  // gray override — use border-light / t3
  const style: React.CSSProperties =
    color === "gray"
      ? { backgroundColor: "var(--border-light)", color: "var(--t2)" }
      : { backgroundColor: bgVar, color: textVar };

  return (
    <span
      style={style}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md px-2.5 py-0.5 text-[11px] font-semibold whitespace-nowrap",
        className,
      )}
    >
      <span
        className="h-1.5 w-1.5 rounded-full shrink-0"
        style={{ backgroundColor: color === "gray" ? "var(--t3)" : dotColor }}
      />
      {children}
    </span>
  );
}

export function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{ backgroundColor: "var(--border-light)", color: "var(--t2)" }}
      className="inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-medium"
    >
      {children}
    </span>
  );
}
