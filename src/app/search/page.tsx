'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useMemo, Suspense } from 'react';
import { Search } from 'lucide-react';
import { useFilterStore } from '@/stores/filterStore';
import { useProducts } from '@/hooks/useProducts';
import { ProductGrid } from '@/components/product/ProductGrid';
import { FilterSidebar } from '@/components/filters/FilterSidebar';
import { FilterMobile } from '@/components/filters/FilterMobile';
import { ProductCategory } from '@/types';

function SearchContent() {
  const searchParams = useSearchParams();
  const q = searchParams.get('q') || '';
  const categoriesParam = searchParams.get('categories') || '';

  const {
    categories,
    priceRange,
    sortBy,
    searchQuery,
    toggleCategory,
    setCategories,
    setPriceRange,
    setSortBy,
    setSearchQuery,
    reset,
  } = useFilterStore();

  // Sync URL params to store on mount
  useEffect(() => {
    if (q) setSearchQuery(q);
    if (categoriesParam) {
      setCategories(categoriesParam.split(',') as ProductCategory[]);
    }
  }, [q, categoriesParam, setSearchQuery, setCategories]);

  const filters = useMemo(
    () => ({ categories, priceRange, sortBy, searchQuery }),
    [categories, priceRange, sortBy, searchQuery]
  );

  const { products, hasMore, loadMore, totalCount } = useProducts(filters);

  const handleReset = () => {
    reset();
    if (q) setSearchQuery(q);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Search header */}
      {searchQuery && (
        <div className="flex items-center gap-3 mb-8">
          <Search className="w-6 h-6 text-gray-400" />
          <div>
            <h1 className="text-2xl font-bold">
              Results for &quot;{searchQuery}&quot;
            </h1>
            <p className="text-sm text-gray-500">{totalCount} products found</p>
          </div>
        </div>
      )}

      {!searchQuery && categories.length > 0 && (
        <div className="mb-8">
          <h1 className="text-2xl font-bold capitalize">
            {categories.join(', ')}
          </h1>
          <p className="text-sm text-gray-500">{totalCount} products found</p>
        </div>
      )}

      {!searchQuery && categories.length === 0 && (
        <div className="mb-8">
          <h1 className="text-2xl font-bold">All Products</h1>
          <p className="text-sm text-gray-500">{totalCount} products found</p>
        </div>
      )}

      {/* Mobile filter button */}
      <div className="mb-4 lg:hidden">
        <FilterMobile
          filters={filters}
          onToggleCategory={toggleCategory}
          onPriceChange={setPriceRange}
          onSortChange={setSortBy}
          onReset={handleReset}
        />
      </div>

      {/* Two-column layout */}
      <div className="flex gap-8">
        {/* Desktop sidebar */}
        <aside className="hidden lg:block w-64 shrink-0">
          <div className="sticky top-24 bg-white rounded-2xl border border-gray-100 p-6">
            <FilterSidebar
              filters={filters}
              onToggleCategory={toggleCategory}
              onPriceChange={setPriceRange}
              onSortChange={setSortBy}
              onReset={handleReset}
            />
          </div>
        </aside>

        {/* Product grid */}
        <div className="flex-1">
          <ProductGrid
            products={products}
            hasMore={hasMore}
            loadMore={loadMore}
            totalCount={totalCount}
          />
        </div>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="h-8 bg-gray-200 rounded w-64 mb-8 animate-pulse" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="h-80 bg-gray-200 rounded-2xl animate-pulse" />
            ))}
          </div>
        </div>
      }
    >
      <SearchContent />
    </Suspense>
  );
}
