'use client';

import { ProductCategory } from '@/types';
import { CATEGORIES } from '@/lib/constants';

interface CategoryFilterProps {
  selected: ProductCategory[];
  onChange: (category: ProductCategory) => void;
}

export function CategoryFilter({ selected, onChange }: CategoryFilterProps) {
  return (
    <div>
      <h3 className="text-sm font-semibold mb-3">Category</h3>
      <div className="space-y-2">
        {CATEGORIES.map((cat) => (
          <label
            key={cat.value}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <input
              type="checkbox"
              checked={selected.includes(cat.value)}
              onChange={() => onChange(cat.value)}
              className="w-4 h-4 rounded border-gray-300 text-samsung-blue focus:ring-samsung-blue cursor-pointer"
            />
            <span className="text-sm text-gray-700 group-hover:text-samsung-blue transition-colors">
              {cat.label}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}
