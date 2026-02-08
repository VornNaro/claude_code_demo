'use client';

import { useState, useMemo, useCallback } from 'react';
import { Product, FilterState } from '@/types';
import { getAllProducts } from '@/lib/products';
import { PAGE_SIZE } from '@/lib/constants';

const allProducts = getAllProducts();

function filterProducts(products: Product[], filters: FilterState): Product[] {
  let result = products;

  if (filters.searchQuery) {
    const q = filters.searchQuery.toLowerCase();
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    );
  }

  if (filters.categories.length > 0) {
    result = result.filter((p) => filters.categories.includes(p.category));
  }

  result = result.filter(
    (p) => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
  );

  switch (filters.sortBy) {
    case 'price-asc':
      result = [...result].sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      result = [...result].sort((a, b) => b.price - a.price);
      break;
    case 'rating':
      result = [...result].sort((a, b) => b.rating - a.rating);
      break;
    case 'newest':
      result = [...result].sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
      break;
    case 'featured':
    default:
      result = [...result].sort(
        (a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0)
      );
      break;
  }

  return result;
}

export function useProducts(filters: FilterState) {
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => filterProducts(allProducts, filters), [filters]);

  const products = useMemo(
    () => filtered.slice(0, page * PAGE_SIZE),
    [filtered, page]
  );

  const hasMore = products.length < filtered.length;

  const loadMore = useCallback(() => {
    if (hasMore) setPage((p) => p + 1);
  }, [hasMore]);

  const resetPage = useCallback(() => setPage(1), []);

  return { products, hasMore, loadMore, totalCount: filtered.length, resetPage };
}
