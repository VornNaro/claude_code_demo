'use client';

import { useState } from 'react';
import { Product } from '@/types';
import { ProductImage } from '@/components/product/ProductImage';

interface ProductGalleryProps {
  product: Product;
}

export function ProductGallery({ product }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <div className="space-y-3">
      {/* Main image */}
      <div className="aspect-square rounded-2xl overflow-hidden">
        <ProductImage
          src={product.images[selectedIndex]}
          alt={product.name}
          category={product.category}
          size="lg"
          className="rounded-2xl"
          priority
        />
      </div>

      {/* Thumbnail strip */}
      {product.images.length > 1 && (
        <div className="flex gap-2">
          {product.images.map((img, i) => (
            <button
              key={i}
              onClick={() => setSelectedIndex(i)}
              className={`w-16 h-16 rounded-xl overflow-hidden border-2 cursor-pointer transition-colors ${
                i === selectedIndex
                  ? 'border-samsung-blue'
                  : 'border-transparent hover:border-gray-300'
              }`}
            >
              <ProductImage
                src={img}
                alt={`${product.name} view ${i + 1}`}
                category={product.category}
                size="sm"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
