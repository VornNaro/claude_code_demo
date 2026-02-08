'use client';

import Image from 'next/image';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const CATEGORY_GRADIENTS: Record<string, string> = {
  smartphones: 'from-indigo-50 to-blue-100',
  tablets: 'from-slate-50 to-gray-100',
  tvs: 'from-gray-100 to-slate-200',
  watches: 'from-violet-50 to-purple-100',
  earbuds: 'from-sky-50 to-cyan-100',
  laptops: 'from-zinc-50 to-stone-100',
};

const CATEGORY_ICONS: Record<string, string> = {
  smartphones: '/products/icons/smartphone.svg',
  tablets: '/products/icons/tablet.svg',
  tvs: '/products/icons/tv.svg',
  watches: '/products/icons/watch.svg',
  earbuds: '/products/icons/earbuds.svg',
  laptops: '/products/icons/laptop.svg',
};

interface ProductImageProps {
  src: string;
  alt: string;
  category: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  priority?: boolean;
}

export function ProductImage({
  src,
  alt,
  category,
  className,
  size = 'md',
  priority = false,
}: ProductImageProps) {
  const [error, setError] = useState(false);
  const gradient = CATEGORY_GRADIENTS[category] || 'from-gray-50 to-gray-100';
  const iconSrc = CATEGORY_ICONS[category] || CATEGORY_ICONS.smartphones;

  const sizeClasses = {
    sm: 'w-full h-full',
    md: 'w-full h-full',
    lg: 'w-full h-full',
  };

  const iconSizes = {
    sm: 40,
    md: 80,
    lg: 140,
  };

  if (error || !src || src.startsWith('/products/') && !src.startsWith('/products/icons/')) {
    return (
      <div
        className={cn(
          `bg-gradient-to-br ${gradient} flex items-center justify-center`,
          sizeClasses[size],
          className
        )}
      >
        <Image
          src={iconSrc}
          alt={alt}
          width={iconSizes[size]}
          height={iconSizes[size]}
          className="opacity-40"
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        `bg-gradient-to-br ${gradient} flex items-center justify-center relative`,
        sizeClasses[size],
        className
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={size === 'lg' ? '50vw' : size === 'md' ? '25vw' : '100px'}
        className="object-contain p-2"
        priority={priority}
        onError={() => setError(true)}
      />
    </div>
  );
}
