'use client';

import { create } from 'zustand';
import { FilterState, ProductCategory, SortOption } from '@/types';

interface FilterStore extends FilterState {
  setCategories: (categories: ProductCategory[]) => void;
  toggleCategory: (category: ProductCategory) => void;
  setPriceRange: (range: [number, number]) => void;
  setSortBy: (sort: SortOption) => void;
  setSearchQuery: (query: string) => void;
  reset: () => void;
}

const initialState: FilterState = {
  categories: [],
  priceRange: [0, 1000000],
  sortBy: 'featured',
  searchQuery: '',
};

export const useFilterStore = create<FilterStore>()((set) => ({
  ...initialState,
  setCategories: (categories) => set({ categories }),
  toggleCategory: (category) =>
    set((state) => ({
      categories: state.categories.includes(category)
        ? state.categories.filter((c) => c !== category)
        : [...state.categories, category],
    })),
  setPriceRange: (priceRange) => set({ priceRange }),
  setSortBy: (sortBy) => set({ sortBy }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  reset: () => set(initialState),
}));
