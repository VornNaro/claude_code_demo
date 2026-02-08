'use client';

import Link from 'next/link';
import { HeroBanner } from '@/components/ui/HeroBanner';
import { ProductGrid } from '@/components/product/ProductGrid';
import { useProducts } from '@/hooks/useProducts';
import { CATEGORIES } from '@/lib/constants';
import { Smartphone, Tablet, Tv, Watch, Headphones, Laptop } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  Smartphone: <Smartphone className="w-6 h-6" />,
  Tablet: <Tablet className="w-6 h-6" />,
  Tv: <Tv className="w-6 h-6" />,
  Watch: <Watch className="w-6 h-6" />,
  Headphones: <Headphones className="w-6 h-6" />,
  Laptop: <Laptop className="w-6 h-6" />,
};

export default function HomePage() {
  const { products, hasMore, loadMore, totalCount } = useProducts({
    categories: [],
    priceRange: [0, 1000000],
    sortBy: 'featured',
    searchQuery: '',
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-10">
      {/* Hero */}
      <HeroBanner />

      {/* Category Quick Links */}
      <section className="text-center">
        <h2 className="text-xl font-bold mb-4">Shop by Category</h2>
        <div className="flex justify-center gap-3 flex-wrap">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.value}
              href={`/search?categories=${cat.value}`}
              className="flex flex-col items-center gap-2 min-w-[80px] p-4 bg-white rounded-2xl border border-gray-100 hover:border-samsung-blue hover:shadow-md transition-all group"
            >
              <span className="text-gray-500 group-hover:text-samsung-blue transition-colors">
                {iconMap[cat.icon]}
              </span>
              <span className="text-xs font-medium text-gray-600 group-hover:text-samsung-blue whitespace-nowrap">
                {cat.label}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* All Products with Infinite Scroll */}
      <section>
        <h2 className="text-xl font-bold mb-4">All Products</h2>
        <ProductGrid
          products={products}
          hasMore={hasMore}
          loadMore={loadMore}
          totalCount={totalCount}
        />
      </section>
    </div>
  );
}
