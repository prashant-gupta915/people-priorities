import React from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface PageContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const PageContainer = React.forwardRef<HTMLDivElement, PageContainerProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={twMerge(
          clsx(
            'min-h-screen bg-background relative',
            // Adding a subtle radial blue gradient at the top as mentioned in Figma specs
            'before:absolute before:top-0 before:inset-x-0 before:h-64 before:bg-gradient-to-b before:from-primary/5 before:to-transparent before:-z-10',
            className
          )
        )}
        {...props}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 relative z-10">
          {children}
        </div>
      </div>
    );
  }
);
PageContainer.displayName = 'PageContainer';
