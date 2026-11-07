import React from 'react';
import { motion } from 'framer-motion';

/**
 * GRANTLY BUTTON SYSTEM
 * Visual identity: Deep Coral actions, Soft Peach secondary surfaces
 */

const VARIANTS = {
  primary:
    'bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)] active:bg-[var(--terracotta)] shadow-[0_4px_14px_rgba(219,105,92,0.25)] hover:shadow-[0_6px_20px_rgba(219,105,92,0.35)] hover:-translate-y-0.5 active:translate-y-0 border border-transparent',
  secondary:
    'bg-[var(--surface-secondary)] text-[var(--text-primary)] hover:bg-[var(--peach-tint)] hover:text-[var(--primary)] border border-transparent hover:border-[var(--coral)] hover:-translate-y-0.5 active:translate-y-0',
  outline:
    'bg-transparent text-[var(--text-primary)] border border-[var(--border)] hover:border-[var(--primary)] hover:text-[var(--primary)] hover:bg-[var(--peach-tint)]/40 hover:-translate-y-0.5 active:translate-y-0',
  ghost:
    'bg-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--peach-tint)]/60 border border-transparent',
  danger:
    'bg-[var(--danger)] text-white hover:bg-[#b04a44] shadow-[0_4px_14px_rgba(198,91,85,0.25)] border border-transparent hover:-translate-y-0.5 active:translate-y-0',
};

const SIZES = {
  sm: 'px-3 py-1.5 text-[13px] font-semibold rounded-[var(--radius-sm)] gap-1.5 min-h-[34px] leading-snug',
  md: 'px-4.5 py-2 text-[14px] md:text-[15px] font-semibold rounded-[var(--radius-md)] gap-2 min-h-[40px] leading-snug',
  lg: 'px-6 py-3 text-[15px] md:text-[16px] font-semibold rounded-[var(--radius-md)] gap-2.5 min-h-[48px] leading-snug',
};

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  loading = false,
  icon: Icon,
  iconPosition = 'left',
  type = 'button',
  onClick,
  ...props
}) => {
  const baseClasses =
    'inline-flex items-center justify-center font-body font-semibold tracking-[-0.01em] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--coral)] focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none select-none cursor-pointer';

  return (
    <motion.button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      whileHover={{ y: disabled || loading ? 0 : -1 }}
      whileTap={{ scale: disabled || loading ? 1 : 0.97 }}
      className={`${baseClasses} ${VARIANTS[variant] || VARIANTS.primary} ${
        SIZES[size] || SIZES.md
      } ${className}`}
      {...props}
    >
      {loading ? (
        <svg
          className="animate-spin -ml-0.5 h-4 w-4 text-current shrink-0"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="3.5"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      ) : Icon && iconPosition === 'left' ? (
        <Icon className="h-4 w-4 shrink-0" />
      ) : null}

      <span>{children}</span>

      {!loading && Icon && iconPosition === 'right' ? (
        <Icon className="h-4 w-4 shrink-0" />
      ) : null}
    </motion.button>
  );
};

export const PrimaryButton = (props) => <Button variant="primary" {...props} />;
export const SecondaryButton = (props) => <Button variant="secondary" {...props} />;
export const OutlineButton = (props) => <Button variant="outline" {...props} />;
export const GhostButton = (props) => <Button variant="ghost" {...props} />;

export const IconButton = ({
  icon: Icon,
  label,
  variant = 'ghost',
  size = 'md',
  className = '',
  ...props
}) => {
  const iconSizes = {
    sm: 'p-1.5 h-8 w-8 rounded-[var(--radius-sm)]',
    md: 'p-2 h-10 w-10 rounded-[var(--radius-md)]',
    lg: 'p-2.5 h-12 w-12 rounded-[var(--radius-lg)]',
  };

  return (
    <Button
      variant={variant}
      className={`!p-0 flex items-center justify-center shrink-0 ${iconSizes[size] || iconSizes.md} ${className}`}
      aria-label={label}
      title={label}
      {...props}
    >
      {Icon && <Icon className="h-4 w-4 shrink-0" />}
    </Button>
  );
};

export default Button;
