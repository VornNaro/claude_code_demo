'use client';

import Link from 'next/link';
import { ShoppingCart, ArrowLeft } from 'lucide-react';
import { useCartStore } from '@/stores/cartStore';
import { useHydration } from '@/hooks/useHydration';
import { getProductById } from '@/lib/products';
import { CartItem } from '@/components/cart/CartItem';
import { CartSummary } from '@/components/cart/CartSummary';
import { Button } from '@/components/ui/Button';

export default function CartPage() {
  const hydrated = useHydration();
  const items = useCartStore((s) => s.items);
  const clear = useCartStore((s) => s.clear);

  if (!hydrated) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-8">Shopping Cart</h1>
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-28 bg-gray-200 rounded-2xl" />
          ))}
        </div>
      </div>
    );
  }

  const cartProducts = items
    .map((item) => ({
      item,
      product: getProductById(item.productId),
    }))
    .filter((entry) => entry.product !== undefined);

  const subtotal = cartProducts.reduce(
    (sum, { item, product }) => sum + product!.price * item.quantity,
    0
  );

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
        <p className="text-gray-500 mb-8">
          Looks like you haven&apos;t added any products yet.
        </p>
        <Link href="/">
          <Button>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Continue Shopping
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Shopping Cart ({totalItems})</h1>
        <button
          onClick={clear}
          className="text-sm text-gray-500 hover:text-red-500 transition-colors cursor-pointer"
        >
          Clear All
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart items */}
        <div className="lg:col-span-2 space-y-3">
          {cartProducts.map(({ item, product }) => (
            <CartItem
              key={`${item.productId}-${item.color}`}
              item={item}
              product={product!}
            />
          ))}
        </div>

        {/* Summary */}
        <CartSummary subtotal={subtotal} itemCount={totalItems} />
      </div>
    </div>
  );
}
