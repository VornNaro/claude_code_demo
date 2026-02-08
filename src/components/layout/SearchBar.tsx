'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export function SearchBar() {
  const [expanded, setExpanded] = useState(false);
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      setExpanded(false);
      setQuery('');
    }
  };

  return (
    <div className="relative">
      {!expanded && (
        <button
          onClick={() => setExpanded(true)}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
          aria-label="Search"
        >
          <Search className="w-5 h-5" />
        </button>
      )}
      {expanded && (
        <form onSubmit={handleSubmit} className="flex items-center">
          <div
            className={cn(
              'flex items-center bg-gray-100 rounded-full px-4 py-2 gap-2',
              'w-48 md:w-64 lg:w-80'
            )}
          >
            <Search className="w-4 h-4 text-gray-500 shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products..."
              className="bg-transparent outline-none text-sm w-full"
              autoFocus
            />
            <button
              type="button"
              onClick={() => {
                setExpanded(false);
                setQuery('');
              }}
              className="p-0.5 hover:bg-gray-200 rounded-full cursor-pointer"
            >
              <X className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
