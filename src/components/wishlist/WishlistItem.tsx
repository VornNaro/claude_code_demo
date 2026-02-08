'use client';

import Link from 'next/link';
import { ShoppingCart, X, Star } from 'lucide-react';
import { Product } from '@/types';
import { Button } from '@/components/ui/Button';
import { ProductImage } from '@/components/product/ProductImage';
import { useCartStore } from '@/stores/cartStore';
import { useWishlistStore } from '@/stores/wishlistStore';
import { formatCurrency } from '@/lib/utils';
import { showToast } from '@/components/ui/Toast';

interface WishlistItemProps {
  product: Product;
}

export function WishlistItem({ product }: WishlistItemProps) {
  const addItem = useCartStore((s) => s.addItem);
  const toggle = useWishlistStore((s) => s.toggle);

  const handleAddToCart = () => {
    addItem(product.id, product.colors[0]?.name || 'Default');
    showToast(`${product.name} added to cart`);
  };

  const handleRemove = () => {
    toggle(product.id);
    showToast('Removed from wishlist');
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100/80 shadow-sm p-4 group relative">
      <button
        onClick={handleRemove}
        className="absolute top-3 right-3 p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors cursor-pointer z-10"
        aria-label="Remove from wishlist"
      >
        <X className="w-4 h-4" />
      </button>

      <Link href={`/product/${product.id}`} className="block">
        <div className="aspect-square rounded-xl mb-3 overflow-hidden">
          <ProductImage
            src={product.images[0]}
            alt={product.name}
            category={product.category}
            size="md"
            className="rounded-xl group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        <p className="text-xs text-gray-500 uppercase tracking-wide">
          {product.category}
        </p>
        <h3 className="font-medium text-sm mt-1 line-clamp-2 group-hover:text-samsung-blue transition-colors">
          {product.name}
        </h3>

        <div className="flex items-center gap-1 mt-1">
          <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
          <span className="text-xs text-gray-600">{product.rating}</span>
        </div>

        <div className="flex items-center gap-2 mt-2">
          <span className="font-bold">{formatCurrency(product.price)}</span>
          {product.originalPrice && (
            <span className="text-sm text-gray-400 line-through">
              {formatCurrency(product.originalPrice)}
            </span>
          )}
        </div>
      </Link>

      <Button
        onClick={handleAddToCart}
        variant="outline"
        size="sm"
        className="w-full mt-3 gap-1.5"
      >
        <ShoppingCart className="w-4 h-4" />
        Add to Cart
      </Button>
    </div>
  );
}
