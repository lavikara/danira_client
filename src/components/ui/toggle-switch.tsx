'use client';

import { useState } from 'react';
import { cn } from '@/utils/helpers';

export function ToggleSwitch({
  defaultOn = false,
  onToggle,
}: {
  defaultOn?: boolean;
  onToggle: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const [on, setOn] = useState(defaultOn);
  return (
    <button
      onClick={() => setOn((v) => !v)}
      aria-pressed={on}
      aria-label="Toggle"
      className={cn(
        'relative h-5.25 w-10 shrink-0 rounded-full transition-colors duration-200 cursor-pointer',
        on ? 'bg-primary' : 'bg-border',
      )}
    >
      <span
        className={cn(
          'absolute top-[2.8px] left-0 h-4 w-4 rounded-full shadow-sm transition-transform duration-200 bg-white',
          on ? 'translate-x-5.5' : 'translate-x-0',
        )}
      />
    </button>
  );
}
