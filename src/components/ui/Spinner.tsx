interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  label?: string;
}

const sizes = {
  sm: 'size-4 border-2',
  md: 'size-6 border-2',
  lg: 'size-8 border-[3px]',
};

export default function Spinner({
  size = 'md',
  label = 'Loading',
}: SpinnerProps) {
  return (
    <output
      aria-label={label}
      className={[
        'inline-block animate-spin rounded-full border-current border-t-transparent',
        sizes[size],
      ].join(' ')}
    />
  );
}