import type {
  ButtonHTMLAttributes,
} from 'react';

type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'danger'
  | 'ghost';

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  loading?: boolean;
}

const variants: Record<
  ButtonVariant,
  string
> = {
  primary:
    'bg-teal-700 text-white hover:bg-teal-800 focus-visible:ring-teal-600',

  secondary:
    'border border-slate-300 bg-white text-slate-900 hover:bg-slate-50 focus-visible:ring-slate-400',

  danger:
    'bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500',

  ghost:
    'bg-transparent text-slate-700 hover:bg-slate-100 focus-visible:ring-slate-400',
};

export default function Button({
  children,
  variant = 'primary',
  loading = false,
  disabled,
  className = '',
  ...props
}: ButtonProps) {
  return (
    <button
      type="button"
      disabled={disabled || loading}
      className={[
        'inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-4 py-2.5',
        'text-sm font-semibold transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
        'disabled:pointer-events-none disabled:opacity-60',
        variants[variant],
        className,
      ].join(' ')}
      {...props}
    >
      {loading ? (
        <>
          <span
            aria-hidden="true"
            className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent"
          />

          <span>Processing...</span>
        </>
      ) : (
        children
      )}
    </button>
  );
}