import React from 'react';

/**
 * GRANTLY BADGE SYSTEM
 * Color tokens: Coral, Peach, Gold, Success, Warning, Danger, Neutral
 */

const VARIANTS = {
  coral:
    'bg-[var(--peach-tint)] text-[var(--primary)] border border-[var(--coral)]/40',
  peach:
    'bg-[var(--surface-secondary)] text-[var(--text-primary)] border border-[var(--border)]',
  gold:
    'bg-[#FFF7E8] text-[#9A6715] border border-[var(--gold)]/40',
  success:
    'bg-[#EAF5F0] text-[var(--success)] border border-[var(--success)]/40',
  warning:
    'bg-[#FDF5E8] text-[var(--warning)] border border-[var(--warning)]/40',
  danger:
    'bg-[#FDF0EF] text-[var(--danger)] border border-[var(--danger)]/40',
  neutral:
    'bg-[var(--surface-secondary)]/50 text-[var(--text-secondary)] border border-[var(--border)]',
};

const SIZES = {
  sm: 'px-2 py-0.5 text-[11px]',
  md: 'px-2.5 py-1 text-xs',
  lg: 'px-3 py-1.5 text-xs font-semibold',
};

export const Badge = ({
  children,
  variant = 'coral',
  size = 'md',
  dot = false,
  className = '',
  ...props
}) => {
  return (
    <span
      className={`inline-flex items-center gap-1.5 font-medium rounded-[var(--radius-pill)] tracking-wide font-sans select-none ${
        VARIANTS[variant] || VARIANTS.coral
      } ${SIZES[size] || SIZES.md} ${className}`}
      {...props}
    >
      {dot && (
        <span
          className="h-1.5 w-1.5 rounded-full bg-current shrink-0 opacity-80"
          aria-hidden="true"
        />
      )}
      {children}
    </span>
  );
};

export const StatusBadge = ({ status, className = '' }) => {
  const statusMap = {
    'Submitted': { variant: 'success', label: 'Submitted' },
    'In Progress': { variant: 'coral', label: 'In Progress' },
    'Awarded': { variant: 'gold', label: 'Awarded' },
    'Under Review': { variant: 'warning', label: 'Under Review' },
    'Not Started': { variant: 'neutral', label: 'Not Started' },
    'Rejected': { variant: 'danger', label: 'Closed' },
  };

  const config = statusMap[status] || { variant: 'neutral', label: status };

  return (
    <Badge variant={config.variant} dot className={className}>
      {config.label}
    </Badge>
  );
};

export default Badge;
