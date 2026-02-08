'use client';

import { useState } from 'react';
import { Heart, ShoppingCart, Check } from 'lucide-react';
import { Product } from '@/types';
import { Button } from '@/components/ui/Button';
import { QuantitySelector } from '@/components/ui/QuantitySelector';
import { useCartStore } from '@/stores/cartStore';
import { useWishlistStore } from '@/stores/wishlistStore';
import { useHydration } from '@/hooks/useHydration';
import { showToast } from '@/components/ui/Toast';
import { cn } from '@/lib/utils';

interface ProductActionsProps {
  product: Product;
}

export function ProductActions({ product }: ProductActionsProps) {
  const hydrated = useHydration();
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || '');
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  const addItem = useCartStore((s) => s.addItem);
  const toggle = useWishlistStore((s) => s.toggle);
  const isInWishlist = useWishlistStore((s) => s.isInWishlist(product.id));

  const handleAddToCart = () => {
    addItem(product.id, selectedColor, quantity);
    showToast(`${product.name} added to cart`);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  const handleToggleWishlist = () => {
    toggle(product.id);
    showToast(
      isInWishlist ? 'Removed from wishlist' : 'Added to wishlist'
    );
  };

  return (
    <div className="space-y-6">
      {/* Color selector */}
      {product.colors.length > 0 && (
        <div>
          <p className="text-sm font-medium text-gray-700 mb-2">
            Color: <span className="text-gray-900">{selectedColor}</span>
          </p>
          <div className="flex gap-2">
            {product.colors.map((color) => (
              <button
                key={color.name}
                onClick={() => setSelectedColor(color.name)}
                className={cn(
                  'w-10 h-10 rounded-full border-2 transition-all cursor-pointer relative',
                  selectedColor === color.name
                    ? 'border-samsung-blue scale-110'
                    : 'border-gray-200 hover:border-gray-400'
                )}
                style={{ backgroundColor: color.hex }}
                title={color.name}
                aria-label={`Select ${color.name}`}
              >
                {selectedColor === color.name && (
                  <Check
                    className="w-4 h-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    style={{
                      color:
                        color.hex.toLowerCase() > '#888888' ? '#000' : '#fff',
                    }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quantity */}
      <div>
        <p className="text-sm font-medium text-gray-700 mb-2">Quantity</p>
        <QuantitySelector quantity={quantity} onChange={setQuantity} />
      </div>

      {/* Action buttons */}
      <div className="flex gap-3">
        <Button
          onClick={handleAddToCart}
          disabled={!product.inStock}
          className="flex-1 gap-2"
          size="lg"
        >
          {justAdded ? (
            <>
              <Check className="w-5 h-5" />
              Added!
            </>
          ) : (
            <>
              <ShoppingCart className="w-5 h-5" />
              {product.inStock ? 'Add to Cart' : 'Out of Stock'}
            </>
          )}
        </Button>
        <Button
          variant="outline"
          size="lg"
          onClick={handleToggleWishlist}
          className="gap-2"
        >
          <Heart
            className="w-5 h-5"
            fill={hydrated && isInWishlist ? 'currentColor' : 'none'}
          />
        </Button>
      </div>
    </div>
  );
}
