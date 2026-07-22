export default function Loading() {
  return (
    <div className="animate-pulse">
      <div className="mb-5 flex items-start justify-between gap-3">
        <div>
          <div className="h-5 w-48 rounded-md bg-border-light" />
          <div className="mt-2 h-3 w-64 rounded-md bg-border-light" />
        </div>
        <div className="flex gap-2.5">
          <div className="h-9 w-24 rounded-[9px] bg-border-light" />
          <div className="h-9 w-28 rounded-[9px] bg-border-light" />
        </div>
      </div>

      <div className="mb-5 grid grid-cols-2 gap-3.75 sm:grid-cols-3 lg:grid-cols-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-32.5 rounded-2xl border border-border-light bg-surface p-4">
            <div className="h-11 w-11 rounded-[11px] bg-border-light" />
            <div className="mt-4 h-5 w-16 rounded-md bg-border-light" />
            <div className="mt-2 h-3 w-20 rounded-md bg-border-light" />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4.5 lg:grid-cols-[1.5fr_1fr]">
        <div className="h-80 rounded-2xl border border-border-light bg-surface p-5">
          <div className="h-4 w-40 rounded-md bg-border-light" />
          <div className="mt-6 h-57.5 rounded-md bg-border-light" />
        </div>
        <div className="h-80 rounded-2xl border border-border-light bg-surface p-5">
          <div className="h-4 w-32 rounded-md bg-border-light" />
          <div className="mt-6 h-57.5 rounded-md bg-border-light" />
        </div>
      </div>
    </div>
  );
}
