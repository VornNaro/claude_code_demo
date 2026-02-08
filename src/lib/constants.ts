import { ProductCategory, SortOption } from '@/types';

export const SITE_CONFIG = {
  name: 'Samsung Store',
  description: 'Shop the latest Samsung products',
  currency: 'USD',
};

export const PAGE_SIZE = 12;

export const CATEGORIES: { value: ProductCategory; label: string; icon: string }[] = [
  { value: 'smartphones', label: 'Smartphones', icon: 'Smartphone' },
  { value: 'tablets', label: 'Tablets', icon: 'Tablet' },
  { value: 'tvs', label: 'TVs', icon: 'Tv' },
  { value: 'watches', label: 'Watches', icon: 'Watch' },
  { value: 'earbuds', label: 'Earbuds', icon: 'Headphones' },
  { value: 'laptops', label: 'Laptops', icon: 'Laptop' },
];

export const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'newest', label: 'Newest' },
];

export const TAX_RATE = 0.08;
