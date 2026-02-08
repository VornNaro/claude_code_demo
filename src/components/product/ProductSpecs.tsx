'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProductSpecsProps {
  specs: Record<string, string>;
}

export function ProductSpecs({ specs }: ProductSpecsProps) {
  const [expanded, setExpanded] = useState(false);
  const entries = Object.entries(specs);
  const visible = expanded ? entries : entries.slice(0, 4);

  return (
    <div className="border border-gray-200 rounded-2xl overflow-hidden">
      <h3 className="text-lg font-semibold px-6 py-4 bg-gray-50">
        Specifications
      </h3>
      <div className="divide-y divide-gray-100">
        {visible.map(([key, value]) => (
          <div key={key} className="flex px-6 py-3 text-sm">
            <span className="w-1/3 text-gray-500 font-medium">{key}</span>
            <span className="w-2/3 text-gray-900">{value}</span>
          </div>
        ))}
      </div>
      {entries.length > 4 && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center justify-center gap-1 py-3 text-sm text-samsung-blue font-medium hover:bg-blue-50 transition-colors cursor-pointer"
        >
          {expanded ? 'Show Less' : `Show All (${entries.length})`}
          <ChevronDown
            className={cn(
              'w-4 h-4 transition-transform',
              expanded && 'rotate-180'
            )}
          />
        </button>
      )}
    </div>
  );
}
