'use client';

import {
  OCCASIONS,
} from '@/constants/occasions';

interface OccasionFilterProps {
  value: string;
  onChange: (
    value: string
  ) => void;
}

export default function OccasionFilter({
  value,
  onChange,
}: OccasionFilterProps) {
  return (
    <div className="flex items-center gap-3">
      <label
        htmlFor="occasion-filter"
        className="sr-only"
      >
        Filter templates by occasion
      </label>

      <select
        id="occasion-filter"
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="min-h-10 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20"
      >
        <option value="">
          All occasions
        </option>

        {OCCASIONS.map((item) => (
          <option
            key={item.value}
            value={item.value}
          >
            {item.label}
          </option>
        ))}
      </select>
    </div>
  );
}