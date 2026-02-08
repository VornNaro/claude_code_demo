'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { CATEGORIES } from '@/lib/constants';
import { cn } from '@/lib/utils';

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="lg:hidden p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
        aria-label="Open menu"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Drawer */}
      <div
        className={cn(
          'fixed top-0 left-0 h-full w-72 bg-white z-50 transform transition-transform duration-300 lg:hidden shadow-xl',
          open ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <span className="text-lg font-bold text-samsung-blue">Samsung</span>
          <button
            onClick={() => setOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-full cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <nav className="p-4">
          <ul className="space-y-1">
            <li>
              <Link
                href="/"
                onClick={() => setOpen(false)}
                className="block px-4 py-3 rounded-xl hover:bg-gray-100 font-medium transition-colors"
              >
                Home
              </Link>
            </li>
            {CATEGORIES.map((cat) => (
              <li key={cat.value}>
                <Link
                  href={`/search?categories=${cat.value}`}
                  onClick={() => setOpen(false)}
                  className="block px-4 py-3 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  {cat.label}
                </Link>
              </li>
            ))}
            <li className="border-t mt-4 pt-4">
              <Link
                href="/wishlist"
                onClick={() => setOpen(false)}
                className="block px-4 py-3 rounded-xl hover:bg-gray-100 transition-colors"
              >
                Wishlist
              </Link>
            </li>
            <li>
              <Link
                href="/cart"
                onClick={() => setOpen(false)}
                className="block px-4 py-3 rounded-xl hover:bg-gray-100 transition-colors"
              >
                Cart
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
