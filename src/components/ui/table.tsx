import { cn } from "@/utils/helpers";

export function Table({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">{children}</table>
    </div>
  );
}

export function THead({ children }: { children: React.ReactNode }) {
  return (
    <thead>
      <tr>{children}</tr>
    </thead>
  );
}

export function TH({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <th
      style={{ borderBottomColor: "var(--border-light)", color: "var(--t3)" }}
      className={cn(
        "border-b-2 px-3.5 py-2.5 text-left text-[11px] font-bold uppercase tracking-wide whitespace-nowrap",
        className,
      )}
    >
      {children}
    </th>
  );
}

export function TBody({ children }: { children: React.ReactNode }) {
  return <tbody>{children}</tbody>;
}

export function TR({ children }: { children: React.ReactNode }) {
  return (
    <tr
      className="cursor-pointer border-b transition-colors last:border-b-0 hover:bg-[var(--surface-2)]"
      style={{ borderBottomColor: "var(--border-light)" }}
    >
      {children}
    </tr>
  );
}

export function TD({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <td
      style={{ color: "var(--t1)" }}
      className={cn("px-3.5 py-2.5 align-middle text-[13px]", className)}
    >
      {children}
    </td>
  );
}

export function ActionButtons() {
  return (
    <div className="flex gap-1">
      <button
        style={{
          borderColor: "var(--border)",
          backgroundColor: "var(--surface)",
          color: "var(--t2)",
        }}
        className="rounded-lg border px-2 py-1 text-[13px] transition-colors hover:border-primary hover:bg-[var(--primary-50)] hover:text-primary"
      >
        <i className="bi bi-eye" />
      </button>
      <button
        style={{
          borderColor: "var(--border)",
          backgroundColor: "var(--surface)",
          color: "var(--t2)",
        }}
        className="rounded-lg border px-2 py-1 text-[13px] transition-colors hover:border-primary hover:bg-[var(--primary-50)] hover:text-primary"
      >
        <i className="bi bi-pencil" />
      </button>
    </div>
  );
}
