'use client';

import Link from 'next/link';
import { Heart, ShoppingCart } from 'lucide-react';
import { useCartStore } from '@/stores/cartStore';
import { useWishlistStore } from '@/stores/wishlistStore';
import { useHydration } from '@/hooks/useHydration';
import { SearchBar } from './SearchBar';
import { MobileNav } from './MobileNav';
import { CATEGORIES } from '@/lib/constants';

export function Header() {
  const hydrated = useHydration();
  const cartItems = useCartStore((s) => s.items);
  const wishlistIds = useWishlistStore((s) => s.ids);

  const totalCartItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Left: Mobile nav + Logo */}
          <div className="flex items-center gap-2">
            <MobileNav />
            <Link href="/" className="text-xl font-bold text-samsung-blue">
              SAMSUNG
            </Link>
          </div>

          {/* Center: Category nav (desktop) */}
          <nav className="hidden lg:flex items-center gap-1">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.value}
                href={`/search?categories=${cat.value}`}
                className="px-3 py-2 text-sm text-gray-600 hover:text-samsung-blue rounded-lg hover:bg-blue-50 transition-colors"
              >
                {cat.label}
              </Link>
            ))}
          </nav>

          {/* Right: Search, Wishlist, Cart */}
          <div className="flex items-center gap-1">
            <SearchBar />
            <Link
              href="/wishlist"
              className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {hydrated && wishlistIds.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-samsung-blue text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                  {wishlistIds.length}
                </span>
              )}
            </Link>
            <Link
              href="/cart"
              className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Cart"
            >
              <ShoppingCart className="w-5 h-5" />
              {hydrated && totalCartItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-samsung-blue text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                  {totalCartItems > 99 ? '99+' : totalCartItems}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
