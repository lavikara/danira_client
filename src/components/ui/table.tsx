import { cn } from '@/utils/helpers';
import type { PaginationMeta } from '@/types/definitions';

export function Table({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">{children}</table>
    </div>
  );
}

export function THead({ children }: { children: React.ReactNode }) {
  return (
    <thead>
      <tr>{children}</tr>
    </thead>
  );
}

export function TH({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <th
      style={{ borderBottomColor: 'var(--border-light)', color: 'var(--t3)' }}
      className={cn(
        'border-b-2 px-3.5 py-2.5 text-left text-[11px] font-bold uppercase tracking-wide whitespace-nowrap',
        className,
      )}
    >
      {children}
    </th>
  );
}

export function TBody({ children }: { children: React.ReactNode }) {
  return <tbody>{children}</tbody>;
}

export function TableSkeleton({ rows = 5, columns = 8 }: { rows?: number; columns?: number }) {
  return (
    <tbody>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <tr
          key={rowIndex}
          className="border-b transition-colors last:border-b-0"
          style={{ borderBottomColor: 'var(--border-light)' }}
        >
          <td className="px-3.5 py-2.5 align-middle">
            <div
              className="h-2.5 w-6 animate-pulse rounded-full"
              style={{ backgroundColor: 'var(--surface-2)' }}
            />
          </td>
          {Array.from({ length: columns - 1 }).map((_, columnIndex) => (
            <td key={columnIndex} className="px-3.5 py-2.5 align-middle">
              <div
                className="h-2.5 animate-pulse rounded-full"
                style={{
                  width:
                    columnIndex === 1
                      ? '70%'
                      : columnIndex === 2
                        ? '55%'
                        : columnIndex === 3
                          ? '45%'
                          : '60%',
                  backgroundColor: 'var(--surface-2)',
                }}
              />
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}

export function TR({ children }: { children: React.ReactNode }) {
  return (
    <tr
      className="cursor-pointer border-b transition-colors last:border-b-0 hover:bg-surface-2"
      style={{ borderBottomColor: 'var(--border-light)' }}
    >
      {children}
    </tr>
  );
}

export function TD({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <td
      style={{ color: 'var(--t1)' }}
      className={cn('px-3.5 py-2.5 align-middle text-[13px]', className)}
    >
      {children}
    </td>
  );
}

export function Pagination({
  pagination,
  onPageChange,
  onLimitChange,
  limitOptions = [10, 20, 40, 80, 100],
  className,
}: {
  pagination?: PaginationMeta | null;
  onPageChange?: (page: number) => void;
  onLimitChange?: (limit: number) => void;
  limitOptions?: number[];
  className?: string;
}) {
  const safePagination: PaginationMeta = {
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0,
    hasNextPage: false,
    hasPrevPage: false,
    ...(pagination ?? {}),
  };

  const { page, limit, total, totalPages, hasNextPage, hasPrevPage } = safePagination;
  const safeTotalPages = Math.max(1, totalPages || 1);
  const currentPage = Math.min(Math.max(page || 1, 1), safeTotalPages);
  const currentLimit = limit || 20;

  const getPageNumbers = () => {
    const pages: number[] = [];
    const maxVisible = 5;
    let start = Math.max(1, currentPage - 2);
    let end = Math.min(safeTotalPages, start + maxVisible - 1);

    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i += 1) {
      pages.push(i);
    }

    return pages;
  };
  if (!limit) return;
  const startItem = total === 0 ? 0 : (currentPage - 1) * limit + 1;
  const endItem = total === 0 ? 0 : Math.min(currentPage * limit, total);

  return (
    <div
      className={cn(
        'mt-3 flex flex-wrap items-center justify-between gap-3 border-t px-3.5 py-3 text-[12px] font-medium',
        className,
      )}
      style={{ borderTopColor: 'var(--border-light)', color: 'var(--t3)' }}
    >
      <div className="flex flex-wrap items-center gap-2">
        <span>
          Showing {startItem}-{endItem} of {total}
        </span>
        <label className="flex items-center gap-1.5">
          <span className="text-[11px] uppercase tracking-wide">Rows</span>
          <select
            value={currentLimit}
            onChange={(event) => onLimitChange?.(Number(event.target.value))}
            style={{
              borderColor: 'var(--border)',
              backgroundColor: 'var(--surface)',
              color: 'var(--t2)',
            }}
            className="rounded-lg border px-2 py-1.5 text-[12px] font-semibold outline-none cursor-pointer hover:border-primary"
          >
            {limitOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="flex items-center gap-2">
        <button
          type="button"
          disabled={!hasPrevPage}
          onClick={() => onPageChange?.(currentPage - 1)}
          style={{
            borderColor: 'var(--border)',
            backgroundColor: 'var(--surface)',
            color: hasPrevPage ? 'var(--t2)' : 'var(--t3)',
            opacity: hasPrevPage ? 1 : 0.6,
          }}
          className="rounded-lg border px-2.5 py-1.5 text-[12px] font-semibold transition-colors cursor-pointer disabled:cursor-not-allowed hover:border-primary"
        >
          Prev
        </button>

        {getPageNumbers().map((pageNumber) => (
          <button
            key={pageNumber}
            type="button"
            onClick={() => onPageChange?.(pageNumber)}
            style={{
              borderColor: pageNumber === currentPage ? 'var(--primary)' : 'var(--border)',
              backgroundColor: pageNumber === currentPage ? 'var(--primary-50)' : 'var(--surface)',
              color: pageNumber === currentPage ? 'var(--primary)' : 'var(--t2)',
              cursor: pageNumber === currentPage ? 'not-allowed' : 'pointer',
            }}
            className="min-w-8 rounded-lg border px-2 py-1.5 text-[12px] font-semibold transition-colors hover:border-primary"
          >
            {pageNumber}
          </button>
        ))}

        <button
          type="button"
          disabled={!hasNextPage}
          onClick={() => onPageChange?.(currentPage + 1)}
          style={{
            borderColor: 'var(--border)',
            backgroundColor: 'var(--surface)',
            color: hasNextPage ? 'var(--t2)' : 'var(--t3)',
            opacity: hasNextPage ? 1 : 0.6,
          }}
          className="rounded-lg border px-2.5 py-1.5 text-[12px] font-semibold transition-colors cursor-pointer disabled:cursor-not-allowed hover:border-primary"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export const defaultPaginationMeta: PaginationMeta = {
  page: 1,
  limit: 20,
  total: 0,
  totalPages: 0,
  hasNextPage: false,
  hasPrevPage: false,
};

export function ActionButtons() {
  return (
    <div className="flex gap-1">
      <button
        style={{
          borderColor: 'var(--border)',
          backgroundColor: 'var(--surface)',
          color: 'var(--t2)',
        }}
        className="rounded-lg border px-2 py-1 text-[13px] transition-colors hover:border-primary hover:bg-(--primary-50) hover:text-primary"
      >
        <i className="bi bi-eye hover:text-primary cursor-pointer" />
      </button>
      <button
        style={{
          borderColor: 'var(--border)',
          backgroundColor: 'var(--surface)',
          color: 'var(--t2)',
        }}
        className="rounded-lg border px-2 py-1 text-[13px] transition-colors hover:border-primary hover:bg-(--primary-50) hover:text-primary"
      >
        <i className="bi bi-pencil hover:text-primary cursor-pointer" />
      </button>
    </div>
  );
}
