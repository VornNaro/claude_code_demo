export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  price: number; // in cents
  originalPrice?: number; // in cents, for sale items
  description: string;
  specs: Record<string, string>;
  images: string[];
  colors: ProductColor[];
  rating: number;
  reviewCount: number;
  inStock: boolean;
  isNew?: boolean;
  isFeatured?: boolean;
}

export interface ProductColor {
  name: string;
  hex: string;
}

export type ProductCategory =
  | 'smartphones'
  | 'tablets'
  | 'tvs'
  | 'watches'
  | 'earbuds'
  | 'laptops';

export interface CartItem {
  productId: string;
  color: string;
  quantity: number;
}

export type SortOption =
  | 'featured'
  | 'price-asc'
  | 'price-desc'
  | 'rating'
  | 'newest';

export interface FilterState {
  categories: ProductCategory[];
  priceRange: [number, number]; // in cents
  sortBy: SortOption;
  searchQuery: string;
}
