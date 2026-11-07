import React from 'react';

/**
 * GRANTLY PROGRESS BAR
 * Smooth, accessible bar with percentage and step labels.
 */

export const ProgressBar = ({
  value = 0,
  max = 100,
  label,
  showPercentage = true,
  size = 'md',
  color = 'coral', // 'coral' | 'gold' | 'success'
  className = '',
}) => {
  const percentage = Math.min(Math.max(Math.round((value / max) * 100), 0), 100);

  const heights = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  };

  const colors = {
    coral: 'bg-[var(--primary)]',
    gold: 'bg-[var(--gold)]',
    success: 'bg-[var(--success)]',
  };

  return (
    <div className={`w-full space-y-1.5 ${className}`}>
      {(label || showPercentage) && (
        <div className="flex items-center justify-between text-xs font-semibold text-[var(--text-secondary)]">
          {label && <span>{label}</span>}
          {showPercentage && (
            <span className="font-mono text-[var(--text-primary)]">{percentage}%</span>
          )}
        </div>
      )}
      <div
        className={`w-full overflow-hidden rounded-full bg-[var(--surface-secondary)] ${
          heights[size] || heights.md
        }`}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
      >
        <div
          className={`h-full rounded-full transition-all duration-400 ease-out ${
            colors[color] || colors.coral
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;

