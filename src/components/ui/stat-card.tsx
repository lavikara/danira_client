import { cn } from '@/utils/helpers';
import { Sparkline } from '@/components/charts/sparkline';
import { LoadingSvg } from '@/components/ui/loading-svg';

type StatColor = 'blue' | 'green' | 'orange' | 'purple' | 'red' | 'teal' | 'pink' | 'indigo';

function iconBg(color: StatColor): React.CSSProperties {
  if (color === 'blue')
    return {
      backgroundColor: 'var(--color-primary-50)',
      color: 'var(--color-primary)',
    };
  return {
    backgroundColor: `var(--${color}-bg)`,
    color: `var(--color-${color})`,
  };
}

export function StatCard({
  icon,
  color,
  value,
  loading,
  label,
  trend,
  trendUp,
  spark,
  sparkColor,
  compact,
}: {
  icon: string;
  color: StatColor;
  value: string | undefined;
  label: string;
  loading?: boolean;
  trend?: string;
  trendUp?: boolean;
  spark?: number[];
  sparkColor?: string;
  compact?: boolean;
}) {
  return (
    <div
      style={{
        backgroundColor: 'var(--surface)',
        borderColor: 'var(--border-light)',
      }}
      className={cn(
        'relative overflow-hidden rounded-2xl border shadow-card transition-all hover:-translate-y-0.5 hover:shadow-card-hover',
        compact ? 'p-4' : 'p-4.5',
      )}
    >
      {/* Accent blob */}
      <span
        style={{ backgroundColor: `var(--color-${color})` }}
        className="absolute -top-3.5 -right-3.5 h-18 w-18 rounded-full opacity-[0.07]"
      />

      <div className={cn('flex items-start justify-between', compact ? 'mb-2' : 'mb-3')}>
        <div
          style={iconBg(color)}
          className={cn(
            'flex items-center justify-center rounded-[11px]',
            compact ? 'h-9.5 w-9.5 text-[17px]' : 'h-11 w-11 text-xl',
          )}
        >
          <i className={icon} />
        </div>

        {trend && (
          <div
            style={
              trendUp
                ? {
                    backgroundColor: 'var(--green-bg)',
                    color: 'var(--green-text)',
                  }
                : { backgroundColor: 'var(--red-bg)', color: 'var(--red-text)' }
            }
            className="flex items-center gap-1 rounded-md px-2 py-0.5 text-[11.5px] font-semibold"
          >
            <i className={trendUp ? 'bi bi-arrow-up-right' : 'bi bi-arrow-down-right'} />
            {trend}
          </div>
        )}
      </div>

      <div
        style={{ color: 'var(--t1)' }}
        className={cn(
          'font-extrabold leading-none tracking-tight',
          compact ? 'text-[22px]' : 'text-[26px]',
        )}
      >
        {loading ? <LoadingSvg /> : value}
      </div>
      <div style={{ color: 'var(--t2)' }} className="mt-1.5 text-xs font-medium">
        {label}
      </div>

      {spark && sparkColor && (
        <div className="relative mt-3 h-8.75">
          <Sparkline data={spark} color={sparkColor} />
        </div>
      )}
    </div>
  );
}
