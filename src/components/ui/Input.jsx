import React, { forwardRef } from 'react';
import { Search } from 'lucide-react';

/**
 * GRANTLY FORM CONTROLS
 * Accessible form elements with explicit labels, aria-invalid, aria-describedby,
 * error alerts, and coral focus states.
 */

export const FormLabel = ({ children, htmlFor, required = false, className = '' }) => (
  <label
    htmlFor={htmlFor}
    className={`block text-[13px] font-medium text-[var(--text-primary)] mb-1.5 font-body ${className}`}
  >
    {children}
    {required && <span className="text-[var(--danger)] ml-1 font-semibold" aria-hidden="true">*</span>}
  </label>
);

export const TextInput = forwardRef(
  (
    {
      label,
      error,
      helperText,
      icon: Icon,
      required = false,
      className = '',
      id,
      type = 'text',
      ...props
    },
    ref
  ) => {
    const inputId = id || (label ? label.toLowerCase().replace(/[^a-z0-9]/g, '-') : undefined);
    const errorId = error && inputId ? `${inputId}-error` : undefined;
    const helperId = helperText && inputId ? `${inputId}-helper` : undefined;
    const describedBy = [errorId, helperId].filter(Boolean).join(' ') || undefined;

    return (
      <div className="w-full">
        {label && (
          <FormLabel htmlFor={inputId} required={required}>
            {label}
          </FormLabel>
        )}
        <div className="relative">
          {Icon && (
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-[var(--text-muted)]" aria-hidden="true">
              <Icon className="h-4 w-4" />
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            type={type}
            required={required}
            aria-invalid={Boolean(error)}
            aria-describedby={describedBy}
            className={`block w-full rounded-[var(--radius-md)] border bg-[var(--surface)] px-3.5 py-2.5 font-body text-[14px] text-[var(--text-primary)] transition-all placeholder:text-[var(--text-muted)] placeholder:font-normal focus:outline-none focus:ring-2 focus:ring-[var(--coral)]/25 focus:border-[var(--coral)] ${
              Icon ? 'pl-10' : ''
            } ${
              error
                ? 'border-[var(--danger)] focus:border-[var(--danger)] focus:ring-[var(--danger)]/25'
                : 'border-[var(--border)] hover:border-[var(--text-muted)]'
            } ${className}`}
            {...props}
          />
        </div>
        {error && (
          <p
            id={errorId}
            role="alert"
            className="font-body text-[12px] md:text-[13px] text-[var(--danger)] mt-1.5 font-medium"
          >
            {error}
          </p>
        )}
        {helperText && !error && (
          <p
            id={helperId}
            className="font-body text-[12px] md:text-[13px] text-[var(--text-secondary)] mt-1.5"
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);
TextInput.displayName = 'TextInput';

export const Input = TextInput;

export const SearchInput = forwardRef(
  ({ placeholder = 'Search scholarships, grants, providers...', className = '', ...props }, ref) => {
    return (
      <TextInput
        ref={ref}
        type="search"
        icon={Search}
        placeholder={placeholder}
        className={className}
        {...props}
      />
    );
  }
);
SearchInput.displayName = 'SearchInput';

export const SelectInput = forwardRef(
  ({ label, options = [], error, helperText, id, required = false, className = '', ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/[^a-z0-9]/g, '-') : undefined);
    const errorId = error && inputId ? `${inputId}-error` : undefined;
    const helperId = helperText && inputId ? `${inputId}-helper` : undefined;
    const describedBy = [errorId, helperId].filter(Boolean).join(' ') || undefined;

    return (
      <div className="w-full">
        {label && <FormLabel htmlFor={inputId} required={required}>{label}</FormLabel>}
        <div className="relative">
          <select
            ref={ref}
            id={inputId}
            required={required}
            aria-invalid={Boolean(error)}
            aria-describedby={describedBy}
            className={`block w-full appearance-none rounded-[var(--radius-md)] border bg-[var(--surface)] px-3.5 py-2.5 font-body text-[14px] text-[var(--text-primary)] transition-all focus:outline-none focus:ring-2 focus:ring-[var(--coral)]/25 focus:border-[var(--coral)] pr-10 cursor-pointer ${
              error
                ? 'border-[var(--danger)]'
                : 'border-[var(--border)] hover:border-[var(--text-muted)]'
            } ${className}`}
            {...props}
          >
            {options.map((opt) => (
              <option
                key={typeof opt === 'string' ? opt : opt.value}
                value={typeof opt === 'string' ? opt : opt.value}
              >
                {typeof opt === 'string' ? opt : opt.label}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-[var(--text-muted)]" aria-hidden="true">
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        {error && (
          <p
            id={errorId}
            role="alert"
            className="font-body text-[12px] md:text-[13px] text-[var(--danger)] mt-1.5 font-medium"
          >
            {error}
          </p>
        )}
        {helperText && !error && (
          <p
            id={helperId}
            className="font-body text-[12px] md:text-[13px] text-[var(--text-secondary)] mt-1.5"
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);
SelectInput.displayName = 'SelectInput';

export const Checkbox = forwardRef(
  ({ label, sublabel, id, checked, onChange, disabled, className = '', ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/[^a-z0-9]/g, '-') : undefined);

    return (
      <label
        htmlFor={inputId}
        className={`flex items-start gap-3 select-none cursor-pointer group ${
          disabled ? 'opacity-50 pointer-events-none' : ''
        } ${className}`}
      >
        <div className="relative flex items-center pt-0.5">
          <input
            ref={ref}
            id={inputId}
            type="checkbox"
            checked={checked}
            onChange={onChange}
            disabled={disabled}
            className="peer h-4 w-4 rounded-[4px] border border-[var(--border)] bg-[var(--surface)] text-[var(--primary)] transition-all focus:ring-2 focus:ring-[var(--coral)]/25 focus:ring-offset-0 checked:bg-[var(--primary)] checked:border-[var(--primary)]"
            {...props}
          />
        </div>
        <div>
          {label && (
            <span className="block text-sm font-medium text-[var(--text-primary)] group-hover:text-[var(--primary)] transition-colors">
              {label}
            </span>
          )}
          {sublabel && <span className="block text-xs text-[var(--text-muted)]">{sublabel}</span>}
        </div>
      </label>
    );
  }
);
Checkbox.displayName = 'Checkbox';

export const RadioButton = forwardRef(
  ({ label, sublabel, name, value, checked, onChange, disabled, className = '', id, ...props }, ref) => {
    const inputId = id || `${name}-${value}`;

    return (
      <label
        htmlFor={inputId}
        className={`flex items-start gap-3 select-none cursor-pointer group ${
          disabled ? 'opacity-50 pointer-events-none' : ''
        } ${className}`}
      >
        <div className="relative flex items-center pt-0.5">
          <input
            ref={ref}
            id={inputId}
            type="radio"
            name={name}
            value={value}
            checked={checked}
            onChange={onChange}
            disabled={disabled}
            className="h-4 w-4 border border-[var(--border)] bg-[var(--surface)] text-[var(--primary)] transition-all focus:ring-2 focus:ring-[var(--coral)]/25 focus:ring-offset-0 checked:border-[var(--primary)] checked:bg-[var(--primary)]"
            {...props}
          />
        </div>
        <div>
          {label && (
            <span className="block text-sm font-medium text-[var(--text-primary)] group-hover:text-[var(--primary)] transition-colors">
              {label}
            </span>
          )}
          {sublabel && <span className="block text-xs text-[var(--text-muted)]">{sublabel}</span>}
        </div>
      </label>
    );
  }
);
RadioButton.displayName = 'RadioButton';

export default Input;
