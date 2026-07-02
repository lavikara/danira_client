import { cn } from "@/utils/helpers";

const DAY_LABELS = ["S", "M", "T", "W", "T", "F", "S"];

export function CalendarWidget({
  monthLabel,
  today,
  startOffset,
  eventDays,
}: {
  monthLabel: string;
  today: number;
  startOffset: number;
  eventDays: number[];
}) {
  const leadingDays = Array.from(
    { length: startOffset },
    (_, i) => 30 - startOffset + i + 1,
  );
  const monthDays = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <div className="p-4">
      <div className="mb-3 flex items-center justify-between">
        <span
          className="text-[13.5px] font-bold"
          style={{ color: "var(--t1)" }}
        >
          {monthLabel}
        </span>
        <div className="flex gap-0.5">
          {["bi-chevron-left", "bi-chevron-right"].map((icon) => (
            <button
              key={icon}
              style={{ color: "var(--t2)" }}
              className="flex h-[26px] w-[26px] items-center justify-center rounded-md text-[14px] hover:bg-[var(--surface-2)]"
            >
              <i className={`bi ${icon}`} />
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-7 gap-0.5">
        {DAY_LABELS.map((d, i) => (
          <div
            key={i}
            className="py-1 text-center text-[10px] font-bold uppercase"
            style={{ color: "var(--t3)" }}
          >
            {d}
          </div>
        ))}
        {leadingDays.map((d) => (
          <div
            key={`lead-${d}`}
            className="py-1.5 text-center text-xs font-medium"
            style={{ color: "var(--border)" }}
          >
            {d}
          </div>
        ))}
        {monthDays.map((d) => {
          const isToday = d === today;
          const hasEvent = eventDays.includes(d);
          return (
            <div
              key={d}
              className={cn(
                "relative cursor-pointer rounded-md py-1.5 text-center text-xs font-medium transition-all hover:bg-[var(--surface-2)]",
                isToday && "!bg-primary font-bold text-white",
              )}
              style={isToday ? undefined : { color: "var(--t2)" }}
            >
              {d}
              {hasEvent && (
                <span
                  className={cn(
                    "absolute bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full",
                    isToday ? "bg-white" : "bg-orange",
                  )}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
