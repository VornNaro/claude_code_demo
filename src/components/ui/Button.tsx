'use client';

import { cn } from '@/lib/utils';
import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-full font-medium transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed',
        variant === 'primary' &&
          'bg-samsung-blue text-white hover:bg-samsung-blue-dark',
        variant === 'outline' &&
          'border-2 border-samsung-blue text-samsung-blue hover:bg-samsung-blue hover:text-white',
        variant === 'ghost' &&
          'text-gray-600 hover:bg-gray-100',
        size === 'sm' && 'px-4 py-1.5 text-sm',
        size === 'md' && 'px-6 py-2.5 text-sm',
        size === 'lg' && 'px-8 py-3 text-base',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
