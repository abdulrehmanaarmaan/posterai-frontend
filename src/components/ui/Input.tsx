import type {
  InputHTMLAttributes,
} from 'react';

interface InputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  hint?: string;
}

export default function Input({
  label,
  error,
  hint,
  id,
  className = '',
  ...props
}: InputProps) {
  const inputId =
    id ?? props.name ?? label.toLowerCase().replace(/\s+/g, '-');

  const descriptionId = `${inputId}-description`;
  const errorId = `${inputId}-error`;

  return (
    <div className="space-y-2">
      <label
        htmlFor={inputId}
        className="block text-sm font-medium text-slate-900"
      >
        {label}
      </label>

      <input
        id={inputId}
        aria-invalid={Boolean(error)}
        aria-describedby={
          error
            ? errorId
            : hint
              ? descriptionId
              : undefined
        }
        className={[
          'block min-h-11 w-full rounded-lg border bg-white px-3.5 py-2.5',
          'text-sm text-slate-900 outline-none transition',
          'placeholder:text-slate-400',
          'focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20',
          error
            ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
            : 'border-slate-300',
          className,
        ].join(' ')}
        {...props}
      />

      {hint && !error && (
        <p
          id={descriptionId}
          className="text-xs text-slate-500"
        >
          {hint}
        </p>
      )}

      {error && (
        <p
          id={errorId}
          className="text-xs font-medium text-red-600"
        >
          {error}
        </p>
      )}
    </div>
  );
}