'use client';

import { Button } from '@/components/ui/Button';
import { formatCurrency } from '@/lib/utils';
import { TAX_RATE } from '@/lib/constants';

interface CartSummaryProps {
  subtotal: number;
  itemCount: number;
}

export function CartSummary({ subtotal, itemCount }: CartSummaryProps) {
  const tax = Math.round(subtotal * TAX_RATE);
  const total = subtotal + tax;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4 sticky top-24">
      <h2 className="text-lg font-bold">Order Summary</h2>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-500">Subtotal ({itemCount} items)</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Estimated Tax</span>
          <span>{formatCurrency(tax)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Shipping</span>
          <span className="text-green-600 font-medium">Free</span>
        </div>
      </div>
      <div className="border-t pt-4 flex justify-between text-lg font-bold">
        <span>Total</span>
        <span>{formatCurrency(total)}</span>
      </div>
      <Button className="w-full" size="lg">
        Proceed to Checkout
      </Button>
      <p className="text-xs text-center text-gray-400">
        This is a demo store. No real purchases will be made.
      </p>
    </div>
  );
}
