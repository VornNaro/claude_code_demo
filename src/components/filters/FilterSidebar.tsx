'use client';

import { FilterState, ProductCategory, SortOption } from '@/types';
import { CategoryFilter } from './CategoryFilter';
import { PriceRangeFilter } from './PriceRangeFilter';
import { SortSelect } from './SortSelect';

interface FilterSidebarProps {
  filters: FilterState;
  onToggleCategory: (cat: ProductCategory) => void;
  onPriceChange: (range: [number, number]) => void;
  onSortChange: (sort: SortOption) => void;
  onReset: () => void;
}

export function FilterSidebar({
  filters,
  onToggleCategory,
  onPriceChange,
  onSortChange,
  onReset,
}: FilterSidebarProps) {
  const hasFilters =
    filters.categories.length > 0 ||
    filters.priceRange[0] > 0 ||
    filters.priceRange[1] < 1000000 ||
    filters.sortBy !== 'featured';

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold">Filters</h2>
        {hasFilters && (
          <button
            onClick={onReset}
            className="text-sm text-samsung-blue hover:underline cursor-pointer"
          >
            Reset
          </button>
        )}
      </div>
      <SortSelect value={filters.sortBy} onChange={onSortChange} />
      <CategoryFilter
        selected={filters.categories}
        onChange={onToggleCategory}
      />
      <PriceRangeFilter value={filters.priceRange} onChange={onPriceChange} />
    </div>
  );
}
