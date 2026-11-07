import React from 'react';
import { Button } from './Button';

/**
 * GRANTLY EMPTY STATE COMPONENT
 * Directional illustration & message for zero-data states with accessible actions.
 */

export const EmptyState = ({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
  className = '',
}) => {
  return (
    <div
      role="region"
      aria-label={title || 'No data available'}
      className={`flex flex-col items-center justify-center text-center p-8 sm:p-12 rounded-[var(--radius-lg)] border border-dashed border-[var(--border)] bg-[var(--surface)]/50 ${className}`}
    >
      {Icon && (
        <div
          className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--peach-tint)] text-[var(--primary)] mb-4"
          aria-hidden="true"
        >
          <Icon className="h-7 w-7" />
        </div>
      )}
      <h3 className="heading-card text-[var(--text-primary)]">{title}</h3>
      {description && (
        <p className="mt-1.5 text-sm text-[var(--text-secondary)] max-w-sm">
          {description}
        </p>
      )}
      {actionLabel && onAction && (
        <div className="mt-6">
          <Button variant="primary" onClick={onAction}>
            {actionLabel}
          </Button>
        </div>
      )}
    </div>
  );
};

export default EmptyState;
