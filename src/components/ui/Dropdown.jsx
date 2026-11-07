import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { scaleIn } from '../animations/variants';

/**
 * GRANTLY ACCESSIBLE DROPDOWN MENU
 * Implements WAI-ARIA Menu pattern with Escape key handling, keyboard focus, and aria attributes.
 */

export const Dropdown = ({
  trigger,
  label = 'Select',
  items = [],
  onSelect,
  align = 'right',
  className = '',
  id = 'grantly-dropdown',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const triggerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const triggerId = `${id}-trigger`;
  const menuId = `${id}-menu`;

  return (
    <div className={`relative inline-block text-left ${className}`} ref={dropdownRef}>
      {trigger ? (
        <div
          onClick={() => setIsOpen(!isOpen)}
          aria-haspopup="menu"
          aria-expanded={isOpen}
          aria-controls={menuId}
          id={triggerId}
        >
          {trigger}
        </div>
      ) : (
        <button
          ref={triggerRef}
          type="button"
          id={triggerId}
          aria-haspopup="menu"
          aria-expanded={isOpen}
          aria-controls={menuId}
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex items-center gap-2 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] px-3.5 py-2 text-sm font-semibold text-[var(--text-primary)] hover:border-[var(--coral)] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--coral)]"
        >
          <span>{label}</span>
          <ChevronDown
            className={`h-4 w-4 text-[var(--text-muted)] transition-transform duration-200 ${
              isOpen ? 'rotate-180' : ''
            }`}
            aria-hidden="true"
          />
        </button>
      )}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id={menuId}
            role="menu"
            aria-labelledby={triggerId}
            variants={scaleIn}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={`absolute z-40 mt-2 w-56 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] p-1.5 shadow-[var(--shadow-hover)] focus:outline-none ${
              align === 'right' ? 'right-0' : 'left-0'
            }`}
          >
            {items.map((item, index) => {
              if (item.divider) {
                return (
                  <div key={index} role="separator" className="my-1 border-t border-[var(--border)]" />
                );
              }
              const Icon = item.icon;
              return (
                <button
                  key={index}
                  type="button"
                  role="menuitem"
                  onClick={() => {
                    if (onSelect) onSelect(item);
                    if (item.onClick) item.onClick();
                    setIsOpen(false);
                    triggerRef.current?.focus();
                  }}
                  className={`flex w-full items-center gap-2.5 rounded-[var(--radius-sm)] px-3 py-2 text-xs font-semibold transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--coral)] ${
                    item.danger
                      ? 'text-[var(--danger)] hover:bg-[#FDF0EF]'
                      : 'text-[var(--text-primary)] hover:bg-[var(--surface-secondary)] hover:text-[var(--primary)]'
                  }`}
                >
                  {Icon && <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dropdown;
