import { Badge } from "@/components/ui/badge";
import { EmptyEvents } from "@/components/ui/empty-state";

interface EventItem {
  day: string;
  month: string;
  title: string;
  meta: string;
  tag: "orange" | "green" | "red" | "purple";
  tagLabel: string;
}

export function EventsList({ events }: { events: EventItem[] }) {
  if (events.length === 0) return <EmptyEvents />;
  return (
    <div>
      {events.map((e, i) => (
        <div key={i} className="flex items-start gap-3 border-b py-2.5 last:border-b-0" style={{ borderBottomColor: "var(--border-light)" }}>
          <div className="flex h-[42px] w-[42px] shrink-0 flex-col items-center justify-center rounded-[10px]" style={{ backgroundColor: "var(--color-primary-50)" }}>
            <div className="text-base font-extrabold leading-none text-primary">{e.day}</div>
            <div className="text-[9.5px] font-bold tracking-wide text-primary uppercase">{e.month}</div>
          </div>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <div className="text-[13px] font-semibold" style={{ color: "var(--t1)" }}>{e.title}</div>
              <Badge color={e.tag} className="text-[10px]">{e.tagLabel}</Badge>
            </div>
            <div className="mt-0.5 text-[11.5px]" style={{ color: "var(--t3)" }}>{e.meta}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

interface AIItem { dot: string; text: string; }

export function AIInsightsCard({ title, subtitle, items }: { title: string; subtitle: string; items: AIItem[] }) {
  return (
    <div className="rounded-2xl bg-gradient-to-br from-[#0F172A] to-[#1e3a8a] p-5 text-white">
      <div className="mb-4 flex items-center gap-2.5">
        <i className="bi bi-cpu text-[22px] text-white/70" />
        <div>
          <div className="text-[14.5px] font-bold">{title}</div>
          <div className="text-[11px] text-white/40">{subtitle}</div>
        </div>
        <div className="ml-auto flex items-center gap-1.5 rounded-md border border-white/15 bg-white/10 px-2.5 py-0.5 text-[11px] font-semibold text-white/80">
          <i className="bi bi-stars text-xs" />AI Powered
        </div>
      </div>
      {items.length === 0 ? (
        <div className="rounded-xl bg-white/[0.06] py-8 text-center">
          <i className="bi bi-cpu text-[28px] text-white/30" />
          <p className="mt-2 text-[12.5px] text-white/40">No insights yet. Add more data to generate AI predictions.</p>
        </div>
      ) : (
        <div>
          {items.map((item, i) => (
            <div key={i} className="flex items-start gap-2.5 border-b border-white/[0.08] py-2.5 last:border-b-0">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: item.dot }} />
              <div className="text-[12.5px] leading-relaxed text-white/75">{item.text}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
