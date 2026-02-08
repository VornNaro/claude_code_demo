'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem } from '@/types';

interface CartStore {
  items: CartItem[];
  addItem: (productId: string, color: string, quantity?: number) => void;
  removeItem: (productId: string, color: string) => void;
  updateQuantity: (productId: string, color: string, quantity: number) => void;
  clear: () => void;
  getTotalItems: () => number;
  getTotalPrice: (getPrice: (id: string) => number) => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (productId, color, quantity = 1) => {
        set((state) => {
          const existing = state.items.find(
            (item) => item.productId === productId && item.color === color
          );
          if (existing) {
            return {
              items: state.items.map((item) =>
                item.productId === productId && item.color === color
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            };
          }
          return { items: [...state.items, { productId, color, quantity }] };
        });
      },
      removeItem: (productId, color) => {
        set((state) => ({
          items: state.items.filter(
            (item) => !(item.productId === productId && item.color === color)
          ),
        }));
      },
      updateQuantity: (productId, color, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId, color);
          return;
        }
        set((state) => ({
          items: state.items.map((item) =>
            item.productId === productId && item.color === color
              ? { ...item, quantity }
              : item
          ),
        }));
      },
      clear: () => set({ items: [] }),
      getTotalItems: () => get().items.reduce((sum, item) => sum + item.quantity, 0),
      getTotalPrice: (getPrice) =>
        get().items.reduce(
          (sum, item) => sum + getPrice(item.productId) * item.quantity,
          0
        ),
    }),
    { name: 'samsung-cart' }
  )
);
