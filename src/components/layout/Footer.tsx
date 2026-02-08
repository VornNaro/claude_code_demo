import Link from 'next/link';
import { CATEGORIES } from '@/lib/constants';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-white font-bold text-lg mb-4">SAMSUNG</h3>
            <p className="text-sm leading-relaxed">
              Discover the latest Samsung products. From smartphones to TVs,
              find everything you need in one place.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Products</h4>
            <ul className="space-y-2">
              {CATEGORIES.map((cat) => (
                <li key={cat.value}>
                  <Link
                    href={`/search?categories=${cat.value}`}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Account</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/cart"
                  className="text-sm hover:text-white transition-colors"
                >
                  Cart
                </Link>
              </li>
              <li>
                <Link
                  href="/wishlist"
                  className="text-sm hover:text-white transition-colors"
                >
                  Wishlist
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Samsung Store Demo. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
