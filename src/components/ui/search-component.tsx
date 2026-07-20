import { useDebounceCallback } from '@/hooks/useDebounce';
import { cn } from '@/utils/helpers';

export const SearchComponent = ({
  id,
  placeholder,
  className,
  autoComplete,
  onSearchInput,
}: {
  id: string;
  onSearchInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  autoComplete?: string;
  className?: string;
  debounceDelay?: number;
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(event);
  };

  const debouncedSearch = useDebounceCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    onSearchInput(event as unknown as React.ChangeEvent<HTMLInputElement>);
  }, 2000);

  return (
    <div className="relative max-w-85 flex-1">
      <i
        style={{ color: 'var(--t3)' }}
        className="bi bi-search absolute top-1/2 left-3 -translate-y-1/2 text-[14px]"
      />
      <input
        id={id}
        name={id}
        type="text"
        placeholder={placeholder}
        autoComplete={autoComplete}
        onChange={handleChange}
        style={{
          backgroundColor: 'var(--bg)',
          borderColor: 'var(--border)',
          color: 'var(--t1)',
        }}
        className={cn(
          'w-full rounded-[10px] border-[1.5px]',
          'py-2 pl-9 pr-3.5 text-[13px] placeholder:text-t3',
          'outline-none transition-all duration-150',
          'focus:border-primary focus:shadow-[0_0_0_3px_rgba(37,99,235,.12)]',
          className,
        )}
      />
    </div>
  );
};
