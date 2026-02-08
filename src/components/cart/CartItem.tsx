'use client';

import Link from 'next/link';
import { Trash2 } from 'lucide-react';
import { CartItem as CartItemType, Product } from '@/types';
import { QuantitySelector } from '@/components/ui/QuantitySelector';
import { ProductImage } from '@/components/product/ProductImage';
import { useCartStore } from '@/stores/cartStore';
import { formatCurrency } from '@/lib/utils';

interface CartItemProps {
  item: CartItemType;
  product: Product;
}

export function CartItem({ item, product }: CartItemProps) {
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);

  const color = product.colors.find((c) => c.name === item.color);

  return (
    <div className="flex gap-4 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
      {/* Product image */}
      <Link
        href={`/product/${product.id}`}
        className="w-24 h-24 shrink-0 rounded-xl overflow-hidden"
      >
        <ProductImage
          src={product.images[0]}
          alt={product.name}
          category={product.category}
          size="sm"
          className="rounded-xl"
        />
      </Link>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <Link
          href={`/product/${product.id}`}
          className="font-medium text-sm hover:text-samsung-blue transition-colors line-clamp-1"
        >
          {product.name}
        </Link>
        {color && (
          <div className="flex items-center gap-1.5 mt-1">
            <span
              className="w-3 h-3 rounded-full border border-gray-200"
              style={{ backgroundColor: color.hex }}
            />
            <span className="text-xs text-gray-500">{item.color}</span>
          </div>
        )}
        <p className="text-sm font-bold mt-2">
          {formatCurrency(product.price * item.quantity)}
        </p>
      </div>

      {/* Quantity + Remove */}
      <div className="flex flex-col items-end justify-between">
        <button
          onClick={() => removeItem(item.productId, item.color)}
          className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
          aria-label="Remove item"
        >
          <Trash2 className="w-4 h-4" />
        </button>
        <QuantitySelector
          quantity={item.quantity}
          onChange={(q) => updateQuantity(item.productId, item.color, q)}
        />
      </div>
    </div>
  );
}
