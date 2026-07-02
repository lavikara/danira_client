import { avatarColor, initials, cn } from "@/utils/helpers";

export function Avatar({
  name,
  index = 0,
  size = "md",
}: {
  name: string;
  index?: number;
  size?: "sm" | "md";
}) {
  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center rounded-lg font-bold text-white",
        size === "md" ? "h-8 w-8 text-[11.5px]" : "h-7 w-7 text-[10px]",
      )}
      style={{ backgroundColor: avatarColor(index) }}
    >
      {initials(name)}
    </div>
  );
}

export function NameCell({
  name,
  sub,
  index = 0,
}: {
  name: string;
  sub?: string;
  index?: number;
}) {
  return (
    <div className="flex items-center gap-2.5">
      <Avatar name={name} index={index} />
      <div>
        <div
          style={{ color: "var(--t1)" }}
          className="text-[13px] font-semibold"
        >
          {name}
        </div>
        {sub && (
          <div style={{ color: "var(--t3)" }} className="mt-0.5 text-[11.5px]">
            {sub}
          </div>
        )}
      </div>
    </div>
  );
}
