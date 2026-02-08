'use client';

import Link from 'next/link';
import { Heart, Star } from 'lucide-react';
import { Product } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { ProductImage } from '@/components/product/ProductImage';
import { useWishlistStore } from '@/stores/wishlistStore';
import { useHydration } from '@/hooks/useHydration';
import { formatCurrency, getDiscountPercentage, cn } from '@/lib/utils';
import { showToast } from '@/components/ui/Toast';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const hydrated = useHydration();
  const toggle = useWishlistStore((s) => s.toggle);
  const isInWishlist = useWishlistStore((s) => s.isInWishlist(product.id));

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggle(product.id);
    showToast(
      isInWishlist ? 'Removed from wishlist' : 'Added to wishlist'
    );
  };

  return (
    <Link
      href={`/product/${product.id}`}
      className="group bg-white rounded-2xl p-4 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-xl border border-gray-100/80 block"
    >
      <div className="relative aspect-square rounded-xl mb-3 overflow-hidden">
        <ProductImage
          src={product.images[0]}
          alt={product.name}
          category={product.category}
          size="md"
          className="rounded-xl group-hover:scale-105 transition-transform duration-300"
        />

        {/* Badges */}
        <div className="absolute top-2 left-2 flex gap-1">
          {product.isNew && <Badge variant="new">New</Badge>}
          {product.originalPrice && (
            <Badge variant="sale">
              -{getDiscountPercentage(product.originalPrice, product.price)}%
            </Badge>
          )}
        </div>

        {/* Wishlist button */}
        <button
          onClick={handleWishlistToggle}
          className={cn(
            'absolute top-2 right-2 p-2 rounded-full transition-all cursor-pointer',
            'bg-white/80 backdrop-blur-sm hover:bg-white shadow-sm',
            hydrated && isInWishlist && 'text-red-500'
          )}
          aria-label={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart
            className="w-4 h-4"
            fill={hydrated && isInWishlist ? 'currentColor' : 'none'}
          />
        </button>
      </div>

      {/* Product info */}
      <div className="space-y-1.5">
        <p className="text-xs text-gray-500 uppercase tracking-wide">
          {product.category}
        </p>
        <h3 className="font-medium text-sm leading-tight line-clamp-2 group-hover:text-samsung-blue transition-colors">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1">
          <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
          <span className="text-xs text-gray-600">
            {product.rating} ({product.reviewCount.toLocaleString()})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 pt-1">
          <span className="font-bold text-base">
            {formatCurrency(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-gray-400 line-through">
              {formatCurrency(product.originalPrice)}
            </span>
          )}
        </div>

        {/* Color swatches */}
        {product.colors.length > 1 && (
          <div className="flex gap-1 pt-1">
            {product.colors.slice(0, 4).map((color) => (
              <span
                key={color.name}
                className="w-3.5 h-3.5 rounded-full border border-gray-200"
                style={{ backgroundColor: color.hex }}
                title={color.name}
              />
            ))}
            {product.colors.length > 4 && (
              <span className="text-xs text-gray-400">
                +{product.colors.length - 4}
              </span>
            )}
          </div>
        )}
      </div>
    </Link>
  );
}
