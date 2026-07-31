import { cn } from '@/utils/helpers';

export function SelectInput({
  label,
  id,
  defaultOption,
  list,
  autoComplete,
  hint,
  showToggle = false,
  showCaret = true,
  required = true,
  value,
  onToggle,
  onChange,
}: {
  id: string;
  list: string[];
  autoComplete?: string;
  defaultOption?: string;
  label?: string;
  hint?: string;
  showToggle?: boolean;
  showCaret?: boolean;
  required?: boolean;
  value?: string;
  onToggle?: (data: boolean) => void;
  onChange?: React.ChangeEventHandler<HTMLSelectElement>;
}) {
  return (
    <div className="relative max-w-85 flex-1">
      {label && (
        <label
          htmlFor={id}
          style={{ color: 'var(--t2)' }}
          className="mb-1.5 block text-[12.5px] font-semibold"
        >
          {label}
        </label>
      )}
      <select
        id={id}
        name={id}
        value={value}
        autoComplete={autoComplete}
        onChange={onChange}
        required={required}
        style={{
          backgroundColor: 'var(--bg)',
          borderColor: 'var(--border)',
          color: 'var(--t1)',
        }}
        className={cn(
          `w-full rounded-[10px] border-[1.5px] px-3.5 py-2 text-[13px] cursor-pointer appearance-none ${
            value === '' ? 'text-t3!' : 'text-t1!'
          }`,
          'outline-none transition-all duration-150',
          ' focus:shadow-[0_0_0_3px_rgba(37,99,235,.1)]',
        )}
      >
        <option value="" disabled>
          {defaultOption}
        </option>
        {list.map((data) => (
          <option key={data} value={data}>
            {data}
          </option>
        ))}
      </select>
      {showCaret && (
        <i
          style={{
            color: 'var(--t3)',
            pointerEvents: 'none',
          }}
          className={
            hint
              ? 'absolute bottom-10 right-2 bi bi-caret-down-fill text-t3 cursor-pointer'
              : 'absolute bottom-1.5 right-2 bi bi-caret-down-fill cursor-pointer'
          }
        ></i>
      )}
      {showToggle && (
        <i
          className={
            hint
              ? 'absolute bottom-6 right-4 bi bi-toggle-on cursor-pointer'
              : 'absolute bottom-2 right-4 bi bi-toggle-on cursor-pointer'
          }
          onClick={() => onToggle?.(true)}
        ></i>
      )}

      {hint && (
        <p style={{ color: 'var(--t2)' }} className="-mt-0.5 text-[10px]">
          <i className="bi bi-info-circle-fill"></i> {hint}
        </p>
      )}
    </div>
  );
}
