"use client";

import { useState } from "react";
import { cn } from "@/utils/helpers";

export function ToggleSwitch({ defaultOn = false }: { defaultOn?: boolean }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <button
      onClick={() => setOn((v) => !v)}
      aria-pressed={on}
      aria-label="Toggle"
      className={cn(
        "relative h-[22px] w-[40px] shrink-0 rounded-full transition-colors duration-200",
        on ? "bg-primary" : "bg-[var(--border)]",
      )}
    >
      <span
        className={cn(
          "absolute top-[3px] h-4 w-4 rounded-full shadow-sm transition-transform duration-200 bg-white",
          on ? "translate-x-[20px]" : "translate-x-[3px]",
        )}
      />
    </button>
  );
}
