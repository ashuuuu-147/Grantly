import React from 'react';
import { motion } from 'framer-motion';

/**
 * GRANTLY CARD SYSTEM
 * Education-Fintech aesthetic: Crisp surfaces, 18-24px radius, soft shadows, 1px subtle borders.
 */

export const BaseCard = ({
  children,
  className = '',
  hover = false,
  as: Component = 'div',
  ...props
}) => {
  return (
    <Component
      className={`rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-6 transition-all duration-200 grantly-card-shadow ${
        hover ? 'hover:-translate-y-1 hover:border-[var(--coral)]/50' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
};

export const Card = BaseCard;

export const GlassCard = ({ children, className = '', hover = false, ...props }) => {
  return (
    <div
      className={`rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)]/85 backdrop-blur-md p-6 transition-all duration-200 grantly-card-shadow ${
        hover ? 'hover:-translate-y-1 hover:border-[var(--coral)]' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export const HighlightCard = ({
  children,
  className = '',
  accent = 'coral', // 'coral' | 'gold' | 'success'
  ...props
}) => {
  const accentBorders = {
    coral: 'border-l-4 border-l-[var(--coral)]',
    gold: 'border-l-4 border-l-[var(--gold)]',
    success: 'border-l-4 border-l-[var(--success)]',
  };

  return (
    <BaseCard
      className={`${accentBorders[accent] || accentBorders.coral} ${className}`}
      {...props}
    >
      {children}
    </BaseCard>
  );
};

export const StatCard = ({
  label,
  value,
  subvalue,
  icon: Icon,
  trend,
  className = '',
}) => {
  return (
    <BaseCard hover className={`flex flex-col justify-between ${className}`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[12px] font-semibold uppercase tracking-wider text-[var(--text-muted)] font-body">
            {label}
          </p>
          <p className="mt-2 text-2xl sm:text-3xl font-heading font-extrabold text-[var(--text-primary)] tracking-tight tabular-nums">
            {value}
          </p>
        </div>
        {Icon && (
          <div className="flex h-11 w-11 items-center justify-center rounded-[var(--radius-md)] bg-[var(--peach-tint)] text-[var(--primary)] border border-[var(--border)]">
            <Icon className="h-5 w-5" />
          </div>
        )}
      </div>
      {(subvalue || trend) && (
        <div className="mt-4 pt-3 border-t border-[var(--border)] flex items-center justify-between text-xs text-[var(--text-secondary)] font-body">
          {subvalue && <span>{subvalue}</span>}
          {trend && (
            <span className="font-semibold text-[var(--success)] flex items-center gap-1 font-body">
              {trend}
            </span>
          )}
        </div>
      )}
    </BaseCard>
  );
};

export const CardHeader = ({ children, className = '' }) => (
  <div className={`mb-4 flex items-center justify-between gap-4 ${className}`}>{children}</div>
);

export const CardTitle = ({ children, className = '' }) => (
  <h3 className={`heading-card text-[var(--text-primary)] ${className}`}>{children}</h3>
);

export const CardDescription = ({ children, className = '' }) => (
  <p className={`text-sm text-[var(--text-secondary)] ${className}`}>{children}</p>
);

export const CardContent = ({ children, className = '' }) => (
  <div className={`space-y-4 ${className}`}>{children}</div>
);

export const CardFooter = ({ children, className = '' }) => (
  <div
    className={`mt-6 pt-4 border-t border-[var(--border)] flex items-center justify-between ${className}`}
  >
    {children}
  </div>
);

export default Card;
