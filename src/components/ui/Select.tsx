import {
  forwardRef,
  type SelectHTMLAttributes,
} from "react";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps
  extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
  error?: string;
}

const Select = forwardRef<
  HTMLSelectElement,
  SelectProps
>(
  (
    {
      label,
      options,
      error,
      id,
      className = "",
      ...props
    },
    ref,
  ) => {
    return (
      <div className="space-y-1.5">
        {label && (
          <label
            htmlFor={id}
            className="block text-sm font-medium text-slate-700"
          >
            {label}
          </label>
        )}

        <select
          ref={ref}
          id={id}
          className={[
            "block min-h-10 w-full rounded-lg border bg-white px-3.5 py-2.5",
            "text-sm text-slate-900 outline-none",
            "focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20",
            error
              ? "border-red-500"
              : "border-slate-300",
            className,
          ].join(" ")}
          {...props}
        >
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </select>

        {error && (
          <p className="text-xs font-medium text-red-600">
            {error}
          </p>
        )}
      </div>
    );
  },
);

Select.displayName = "Select";

export default Select;