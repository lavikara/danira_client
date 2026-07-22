import { cn } from '@/utils/helpers';

export function Card({
  children,
  id,
  className,
  onClick,
}: {
  children: React.ReactNode;
  id?: string;
  className?: string;
  onClick?: (id: string) => void;
}) {
  return (
    <div
      style={{
        backgroundColor: 'var(--surface)',
        borderColor: 'var(--border-light)',
      }}
      className={cn('rounded-2xl border shadow-card', className)}
      onClick={() => onClick?.(id as string)}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}) {
  return (
    <div
      style={{ borderBottomColor: 'var(--border-light)' }}
      className="block sm:flex items-center justify-between border-b px-5 py-4"
    >
      <div>
        <p style={{ color: 'var(--t1)' }} className="text-[14.5px] font-bold">
          {title}
        </p>
        {subtitle && (
          <p style={{ color: 'var(--t3)' }} className="mt-0.5 text-xs">
            {subtitle}
          </p>
        )}
      </div>
      {action && <div className="flex items-center gap-2">{action}</div>}
    </div>
  );
}

export function CardBody({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn('p-4 sm:p-5', className)}>{children}</div>;
}

export function CardLoading({ length = 4 }: { length?: number }) {
  return (
    <div className="animate-pulse">
      <div className="mb-5 grid grid-cols-2 gap-3.75 sm:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length }).map((_, i) => (
          <div key={i} className="h-32.5 rounded-2xl border border-border-light bg-surface p-4">
            <div className="h-11 w-11 rounded-[11px] bg-border-light" />
            <div className="mt-4 h-5 w-16 rounded-md bg-border-light" />
            <div className="mt-2 h-3 w-20 rounded-md bg-border-light" />
          </div>
        ))}
      </div>
    </div>
  );
}
