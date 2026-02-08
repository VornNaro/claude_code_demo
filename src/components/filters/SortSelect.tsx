'use client';

import { SortOption } from '@/types';
import { SORT_OPTIONS } from '@/lib/constants';

interface SortSelectProps {
  value: SortOption;
  onChange: (sort: SortOption) => void;
}

export function SortSelect({ value, onChange }: SortSelectProps) {
  return (
    <div>
      <h3 className="text-sm font-semibold mb-3">Sort By</h3>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as SortOption)}
        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white focus:outline-none focus:border-samsung-blue cursor-pointer"
      >
        {SORT_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
