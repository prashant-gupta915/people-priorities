import React from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  pill?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', pill = false, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed';
    
    const variants = {
      primary: 'bg-gradient-to-r from-brand-purple to-brand-indigo text-white hover:opacity-90 shadow-sm',
      secondary: 'bg-white text-foreground border border-border hover:bg-gray-50 shadow-sm',
      outline: 'border-2 border-primary text-primary hover:bg-primary/10',
      ghost: 'text-muted hover:bg-gray-100 hover:text-foreground',
    };
    
    const sizes = {
      sm: 'h-8 px-3 text-sm',
      md: 'h-10 px-4 py-2 text-sm',
      lg: 'h-12 px-8 py-3 text-base',
    };

    const rounded = pill ? 'rounded-pill' : 'rounded-lg';

    return (
      <button
        ref={ref}
        className={twMerge(clsx(baseStyles, variants[variant], sizes[size], rounded, className))}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';
