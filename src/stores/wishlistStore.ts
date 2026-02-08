'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface WishlistStore {
  ids: string[];
  toggle: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  clear: () => void;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      ids: [],
      toggle: (productId) => {
        set((state) => {
          if (state.ids.includes(productId)) {
            return { ids: state.ids.filter((id) => id !== productId) };
          }
          return { ids: [...state.ids, productId] };
        });
      },
      isInWishlist: (productId) => get().ids.includes(productId),
      clear: () => set({ ids: [] }),
    }),
    { name: 'samsung-wishlist' }
  )
);
