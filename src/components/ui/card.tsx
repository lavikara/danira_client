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
