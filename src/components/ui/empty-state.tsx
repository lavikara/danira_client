import { cn } from '@/utils/helpers';
import { Button } from '@/components/ui/button';

type EmptyStateSize = 'sm' | 'md' | 'lg';
type EmptyStateColor =
  | 'blue'
  | 'green'
  | 'orange'
  | 'purple'
  | 'red'
  | 'teal'
  | 'pink'
  | 'indigo'
  | 'gray';

export interface EmptyStateProps {
  icon: string;
  title: string;
  description?: string;
  actions?: [EmptyStateAction] | [EmptyStateAction, EmptyStateAction];
  color?: EmptyStateColor;
  size?: EmptyStateSize;
  className?: string;
  card?: boolean;
}

interface EmptyStateAction {
  label: string;
  onClick?: () => void;
  href?: string;
  icon?: string;
  variant?: 'primary' | 'ghost';
}

const ICON_SIZE: Record<EmptyStateSize, string> = {
  sm: 'h-12 w-12 text-[22px]',
  md: 'h-16 w-16 text-[28px]',
  lg: 'h-20 w-20 text-[34px]',
};

const TITLE_SIZE: Record<EmptyStateSize, string> = {
  sm: 'text-[14px]',
  md: 'text-[16px]',
  lg: 'text-[18px]',
};

const PADDING: Record<EmptyStateSize, string> = {
  sm: 'py-8  px-6',
  md: 'py-12 px-8',
  lg: 'py-16 px-10',
};

function iconStyle(color: EmptyStateColor): React.CSSProperties {
  if (color === 'gray') return { backgroundColor: 'var(--border-light)', color: 'var(--t3)' };
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

export function EmptyState({
  icon,
  title,
  description,
  actions,
  color = 'blue',
  size = 'md',
  className,
  card = false,
}: EmptyStateProps) {
  return (
    <div
      style={
        card
          ? {
              backgroundColor: 'var(--surface)',
              borderColor: 'var(--border-light)',
            }
          : undefined
      }
      className={cn(
        'flex flex-col items-center justify-center text-center',
        PADDING[size],
        card && 'rounded-2xl border shadow-card',
        className,
      )}
    >
      <div
        style={iconStyle(color)}
        className={cn('mb-4 flex items-center justify-center rounded-2xl', ICON_SIZE[size])}
      >
        <i className={icon} />
      </div>

      <p style={{ color: 'var(--t1)' }} className={cn('font-bold', TITLE_SIZE[size])}>
        {title}
      </p>
      {description && (
        <p style={{ color: 'var(--t2)' }} className="mt-2 max-w-95 text-[13px] leading-relaxed">
          {description}
        </p>
      )}

      {actions && actions.length > 0 && (
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2.5">
          {actions.map((action, idx) => {
            const variant = action.variant ?? (idx === 0 ? 'primary' : 'ghost');
            if (action.href) {
              return (
                <a key={action.label} href={action.href}>
                  <Button variant={variant} size="sm">
                    {action.icon && <i className={action.icon} />}
                    {action.label}
                  </Button>
                </a>
              );
            }
            return (
              <Button key={action.label} variant={variant} size="sm" onClick={action.onClick}>
                {action.icon && <i className={action.icon} />}
                {action.label}
              </Button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export function EmptyTableRow({
  colSpan,
  icon = 'bi-inbox',
  message = 'No records found',
}: {
  colSpan: number;
  icon?: string;
  message?: string;
}) {
  return (
    <tr>
      <td colSpan={colSpan}>
        <div className="flex flex-col items-center justify-center gap-2 py-10 text-center">
          <div
            style={{
              backgroundColor: 'var(--border-light)',
              color: 'var(--t3)',
            }}
            className="flex h-12 w-12 items-center justify-center rounded-xl text-[22px]"
          >
            <i className={icon} />
          </div>
          <p style={{ color: 'var(--t2)' }} className="text-[13px] font-semibold">
            {message}
          </p>
          <p style={{ color: 'var(--t3)' }} className="text-[12px]">
            Try adjusting your filters or adding new data.
          </p>
        </div>
      </td>
    </tr>
  );
}

export function EmptySearch({
  query,
  onClear,
  className,
}: {
  query?: string;
  onClear?: () => void;
  className?: string;
}) {
  return (
    <EmptyState
      icon="bi-search"
      color="gray"
      title={query ? `No results for "${query}"` : 'No results found'}
      description="Try different keywords, check your spelling, or clear the filters."
      actions={
        onClear
          ? [
              {
                label: 'Clear Search',
                icon: 'bi-x-circle',
                onClick: onClear,
                variant: 'ghost',
              },
            ]
          : undefined
      }
      className={className}
    />
  );
}

export function EmptyNotifications({ className }: { className?: string }) {
  return (
    <EmptyState
      icon="bi-bell-slash"
      color="gray"
      size="sm"
      title="You're all caught up"
      description="No new notifications right now."
      className={className}
    />
  );
}

export function EmptyStudents({ onAdd, onImport }: { onAdd?: () => void; onImport?: () => void }) {
  return (
    <EmptyState
      card
      icon="bi-people"
      color="blue"
      size="lg"
      title="No students enrolled yet"
      description="Start building your student directory by adding students one at a time or importing a CSV file."
      actions={[
        { label: 'Add Student', icon: 'bi-person-plus-fill', onClick: onAdd },
        {
          label: 'Import CSV',
          icon: 'bi-upload',
          onClick: onImport,
          variant: 'ghost',
        },
      ]}
    />
  );
}
export function EmptyStaffs({ onAdd }: { onAdd?: () => void }) {
  return (
    <EmptyState
      card
      icon="bi-person-workspace"
      color="green"
      size="lg"
      title="No Staff on record"
      description="Add your teaching staff to assign classes, track workload, and manage lesson schedules."
      actions={[{ label: 'Add Teacher', icon: 'bi-person-plus-fill', onClick: onAdd }]}
    />
  );
}
export function EmptyParents({ onAdd }: { onAdd?: () => void }) {
  return (
    <EmptyState
      card
      icon="bi-heart"
      color="pink"
      size="lg"
      title="No parents registered"
      description="Register parents to track ward information, communicate fee updates, and schedule meetings."
      actions={[{ label: 'Add Parent', icon: 'bi-person-plus-fill', onClick: onAdd }]}
    />
  );
}
export function EmptyAttendance({ onMark }: { onMark?: () => void }) {
  return (
    <EmptyState
      card
      icon="bi-calendar-check"
      color="orange"
      size="lg"
      title="No attendance recorded today"
      description="No check-ins have been logged. Start marking attendance for each class to track presence."
      actions={[{ label: 'Mark Attendance', icon: 'bi-check2-square', onClick: onMark }]}
    />
  );
}
export function EmptyClasses({ onCreate }: { onCreate?: () => void }) {
  return (
    <EmptyState
      card
      icon="bi-journal-bookmark"
      color="blue"
      size="lg"
      title="No classes created yet"
      description="Create classes and assign form teachers, subjects, and rooms to build your academic structure."
      actions={[
        {
          label: 'Create Class',
          icon: 'bi-plus-circle-fill',
          onClick: onCreate,
        },
      ]}
    />
  );
}
export function EmptyTimetable({ onCreate }: { onCreate?: () => void }) {
  return (
    <EmptyState
      card
      icon="bi-clock"
      color="teal"
      size="lg"
      title="No timetable scheduled"
      description="Build your class timetable by assigning subjects, teachers, and time slots to each class."
      actions={[
        {
          label: 'Build Timetable',
          icon: 'bi-pencil-square',
          onClick: onCreate,
        },
      ]}
    />
  );
}
export function EmptyExams({ onSchedule }: { onSchedule?: () => void }) {
  return (
    <EmptyState
      card
      icon="bi-award"
      color="purple"
      size="lg"
      title="No exams scheduled"
      description="Schedule upcoming exams and upload results to track student academic performance by subject."
      actions={[
        {
          label: 'Schedule Exam',
          icon: 'bi-calendar-plus',
          onClick: onSchedule,
        },
        { label: 'Upload Results', icon: 'bi-upload', variant: 'ghost' },
      ]}
    />
  );
}
export function EmptyExamResults() {
  return (
    <EmptyState
      card
      icon="bi-clipboard-data"
      color="purple"
      size="md"
      title="No results uploaded yet"
      description="Upload exam score sheets to generate subject-level performance summaries."
      actions={[{ label: 'Upload Results', icon: 'bi-upload' }]}
    />
  );
}
export function EmptyFees({ onRecord }: { onRecord?: () => void }) {
  return (
    <EmptyState
      card
      icon="bi-credit-card"
      color="green"
      size="lg"
      title="No fee records found"
      description="Record student fee payments to track collections, outstanding balances, and payment trends."
      actions={[
        {
          label: 'Record Payment',
          icon: 'bi-plus-circle-fill',
          onClick: onRecord,
        },
        { label: 'Generate Invoice', icon: 'bi-receipt', variant: 'ghost' },
      ]}
    />
  );
}
export function EmptyLibrary({ onAdd }: { onAdd?: () => void }) {
  return (
    <EmptyState
      card
      icon="bi-book"
      color="indigo"
      size="lg"
      title="Library catalog is empty"
      description="Add books to your library catalog to track copies, manage lending records, and identify overdue returns."
      actions={[{ label: 'Add Book', icon: 'bi-plus-circle-fill', onClick: onAdd }]}
    />
  );
}
export function EmptyBorrowRecords() {
  return (
    <EmptyState
      icon="bi-bookmark"
      color="indigo"
      size="sm"
      title="No active borrowing records"
      description="Students who borrow books will appear here."
    />
  );
}
export function EmptyOverdueBooks() {
  return (
    <EmptyState
      icon="bi-check2-circle"
      color="green"
      size="sm"
      title="No overdue books"
      description="All borrowed books have been returned on time."
    />
  );
}
export function EmptyHostel({ onAdd }: { onAdd?: () => void }) {
  return (
    <EmptyState
      card
      icon="bi-building"
      color="orange"
      size="lg"
      title="No hostel rooms configured"
      description="Set up blocks and rooms to manage boarding student accommodation and occupancy."
      actions={[{ label: 'Add Room', icon: 'bi-plus-circle-fill', onClick: onAdd }]}
    />
  );
}
export function EmptyTransport({ onAdd }: { onAdd?: () => void }) {
  return (
    <EmptyState
      card
      icon="bi-bus-front"
      color="teal"
      size="lg"
      title="No bus routes set up"
      description="Add bus routes and assign drivers to manage student transportation and fee collection."
      actions={[{ label: 'Add Route', icon: 'bi-plus-circle-fill', onClick: onAdd }]}
    />
  );
}
export function EmptyNotificationsPage({ onCreate }: { onCreate?: () => void }) {
  return (
    <EmptyState
      card
      icon="bi-megaphone"
      color="blue"
      size="lg"
      title="No announcements sent yet"
      description="Send school-wide announcements to students, parents, and staff. Track delivery and open rates here."
      actions={[
        {
          label: 'New Announcement',
          icon: 'bi-megaphone-fill',
          onClick: onCreate,
        },
      ]}
    />
  );
}
export function EmptyAnalytics() {
  return (
    <EmptyState
      card
      icon="bi-bar-chart-line"
      color="purple"
      size="lg"
      title="Not enough data yet"
      description="Analytics will appear here once students, attendance, fees, and exam data have been recorded."
      actions={[
        {
          label: 'Go to Dashboard',
          icon: 'bi-speedometer2',
          href: '/',
          variant: 'ghost',
        },
      ]}
    />
  );
}
export function EmptyMeetings() {
  return (
    <EmptyState
      icon="bi-calendar-x"
      color="gray"
      size="sm"
      title="No meetings today"
      description="Schedule parent meetings to appear here."
      actions={[{ label: 'Schedule Meeting', icon: 'bi-plus', variant: 'ghost' }]}
    />
  );
}
export function EmptyEvents({ onAdd }: { onAdd?: () => void }) {
  return (
    <EmptyState
      icon="bi-calendar2-event"
      color="orange"
      size="sm"
      title="No upcoming events"
      description="Add events to the school calendar to keep everyone informed."
      actions={[
        {
          label: 'Add Event',
          icon: 'bi-plus',
          onClick: onAdd,
          variant: 'ghost',
        },
      ]}
    />
  );
}
export function EmptyRecentActivity() {
  return (
    <EmptyState
      icon="bi-activity"
      color="gray"
      size="sm"
      title="No recent activity"
      description="Staff activity will show up here as teachers log attendance and upload results."
    />
  );
}
