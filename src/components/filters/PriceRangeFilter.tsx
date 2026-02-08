'use client';

import { useState, useEffect } from 'react';

interface PriceRangeFilterProps {
  value: [number, number];
  onChange: (range: [number, number]) => void;
}

export function PriceRangeFilter({ value, onChange }: PriceRangeFilterProps) {
  const [min, setMin] = useState(String(value[0] / 100));
  const [max, setMax] = useState(String(value[1] / 100));

  useEffect(() => {
    setMin(String(value[0] / 100));
    setMax(String(value[1] / 100));
  }, [value]);

  const handleApply = () => {
    const minCents = Math.max(0, Math.round(Number(min) * 100));
    const maxCents = Math.max(minCents, Math.round(Number(max) * 100));
    onChange([minCents, maxCents]);
  };

  return (
    <div>
      <h3 className="text-sm font-semibold mb-3">Price Range</h3>
      <div className="flex items-center gap-2">
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
            $
          </span>
          <input
            type="number"
            value={min}
            onChange={(e) => setMin(e.target.value)}
            onBlur={handleApply}
            min="0"
            placeholder="Min"
            className="w-full pl-7 pr-2 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-samsung-blue"
          />
        </div>
        <span className="text-gray-400">-</span>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
            $
          </span>
          <input
            type="number"
            value={max}
            onChange={(e) => setMax(e.target.value)}
            onBlur={handleApply}
            min="0"
            placeholder="Max"
            className="w-full pl-7 pr-2 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-samsung-blue"
          />
        </div>
      </div>
    </div>
  );
}
