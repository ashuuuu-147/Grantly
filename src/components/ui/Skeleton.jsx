import React from 'react';

/**
 * GRANTLY SKELETON LOADER
 * Shimmer pulse placeholder for loading states.
 */

export const Skeleton = ({
  className = '',
  variant = 'text', // 'text' | 'circular' | 'rectangular'
  width,
  height,
}) => {
  const variantStyles = {
    text: 'h-4 w-full rounded-[var(--radius-sm)]',
    circular: 'rounded-full shrink-0',
    rectangular: 'rounded-[var(--radius-md)]',
  };

  const style = {
    ...(width ? { width } : {}),
    ...(height ? { height } : {}),
  };

  return (
    <div
      style={style}
      className={`animate-grantly-shimmer ${
        variantStyles[variant] || variantStyles.rectangular
      } ${className}`}
      aria-hidden="true"
    />
  );
};

export const SkeletonCard = () => (
  <div className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-6 space-y-4">
    <div className="flex items-center justify-between">
      <Skeleton width="80px" height="24px" className="rounded-full" />
      <Skeleton width="32px" height="32px" variant="circular" />
    </div>
    <Skeleton width="70%" height="22px" />
    <Skeleton width="40%" height="16px" />
    <div className="pt-4 border-t border-[var(--border)] flex justify-between items-center">
      <Skeleton width="100px" height="24px" />
      <Skeleton width="80px" height="32px" />
    </div>
  </div>
);

export const SkeletonLoader = Skeleton;

export default Skeleton;

