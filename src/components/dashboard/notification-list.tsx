import { EmptyNotifications } from "@/components/ui/empty-state";

interface NotifItem {
  icon: string;
  bg: string;
  iconColor: string;
  text: string;
  time: string;
}

export function NotificationList({ items }: { items: NotifItem[] }) {
  if (items.length === 0) return <EmptyNotifications />;
  return (
    <div className="flex flex-col">
      {items.map((n, i) => (
        <div key={i} className="flex gap-2.5 border-b py-2.5 last:border-b-0" style={{ borderBottomColor: "var(--border-light)" }}>
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[9px]" style={{ backgroundColor: n.bg }}>
            <i className={n.icon} style={{ color: n.iconColor }} />
          </div>
          <div>
            <div className="text-[12.5px] leading-relaxed [&_strong]:font-semibold" style={{ color: "var(--t2)" }}
              dangerouslySetInnerHTML={{ __html: n.text }} />
            <div className="mt-0.5 text-[11px]" style={{ color: "var(--t3)" }}>{n.time}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
