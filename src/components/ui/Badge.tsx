import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'sale' | 'new';
  className?: string;
}

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold',
        variant === 'default' && 'bg-gray-100 text-gray-800',
        variant === 'sale' && 'bg-red-500 text-white',
        variant === 'new' && 'bg-samsung-blue text-white',
        className
      )}
    >
      {children}
    </span>
  );
}
