'use client';

import { useState } from 'react';
import { SlidersHorizontal, X } from 'lucide-react';
import { FilterState, ProductCategory, SortOption } from '@/types';
import { CategoryFilter } from './CategoryFilter';
import { PriceRangeFilter } from './PriceRangeFilter';
import { SortSelect } from './SortSelect';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

interface FilterMobileProps {
  filters: FilterState;
  onToggleCategory: (cat: ProductCategory) => void;
  onPriceChange: (range: [number, number]) => void;
  onSortChange: (sort: SortOption) => void;
  onReset: () => void;
}

export function FilterMobile({
  filters,
  onToggleCategory,
  onPriceChange,
  onSortChange,
  onReset,
}: FilterMobileProps) {
  const [open, setOpen] = useState(false);
  const activeCount =
    filters.categories.length +
    (filters.priceRange[0] > 0 || filters.priceRange[1] < 1000000 ? 1 : 0);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="lg:hidden flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-medium hover:border-samsung-blue transition-colors cursor-pointer"
      >
        <SlidersHorizontal className="w-4 h-4" />
        Filters
        {activeCount > 0 && (
          <span className="bg-samsung-blue text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {activeCount}
          </span>
        )}
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Slide-in panel */}
      <div
        className={cn(
          'fixed bottom-0 left-0 right-0 bg-white z-50 rounded-t-3xl shadow-xl transform transition-transform duration-300 lg:hidden max-h-[80vh] overflow-y-auto',
          open ? 'translate-y-0' : 'translate-y-full'
        )}
      >
        <div className="sticky top-0 bg-white flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-bold">Filters</h2>
          <button
            onClick={() => setOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-full cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-4 space-y-6">
          <SortSelect value={filters.sortBy} onChange={onSortChange} />
          <CategoryFilter
            selected={filters.categories}
            onChange={onToggleCategory}
          />
          <PriceRangeFilter value={filters.priceRange} onChange={onPriceChange} />
          <div className="flex gap-3">
            <Button variant="outline" className="flex-1" onClick={onReset}>
              Reset
            </Button>
            <Button className="flex-1" onClick={() => setOpen(false)}>
              Apply
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
