import React from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'outline';
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    const baseStyles = 'inline-flex items-center px-2.5 py-0.5 rounded-pill text-xs font-medium transition-colors';
    
    const variants = {
      default: 'bg-gray-100 text-foreground',
      success: 'bg-green-100 text-green-800',
      warning: 'bg-yellow-100 text-yellow-800',
      danger: 'bg-red-100 text-red-800',
      outline: 'border border-border text-foreground',
    };

    return (
      <span
        ref={ref}
        className={twMerge(clsx(baseStyles, variants[variant], className))}
        {...props}
      />
    );
  }
);
Badge.displayName = 'Badge';
