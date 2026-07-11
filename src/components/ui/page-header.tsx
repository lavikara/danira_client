import { LoadingSvg } from '@/components/ui/loading-svg';

export function PageHeader({
  title,
  subtitle,
  loading,
  actions,
}: {
  title: string;
  subtitle?: string;
  loading?: boolean;
  actions?: React.ReactNode;
}) {
  return (
    <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
      {loading ? (
        <div className="w-full h-13 flex  items-center">
          <LoadingSvg />
        </div>
      ) : (
        <div className="min-w-0">
          <h1
            style={{ color: 'var(--t1)' }}
            className="truncate text-[19px] font-extrabold tracking-tight sm:text-[21px]"
          >
            {title}
          </h1>
          {subtitle && (
            <p
              style={{ color: 'var(--t2)' }}
              className="mt-0.5 truncate text-[12.5px] sm:text-[13px]"
            >
              {subtitle}
            </p>
          )}
        </div>
      )}
      {actions && <div className="flex shrink-0 flex-wrap items-center gap-2">{actions}</div>}
    </div>
  );
}
