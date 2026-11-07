import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { scaleIn } from '../animations/variants';

/**
 * GRANTLY DROPDOWN OVERLAY
 */

export const Dropdown = ({
  trigger,
  label = 'Select',
  items = [],
  onSelect,
  align = 'right',
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`relative inline-block text-left ${className}`} ref={dropdownRef}>
      {trigger ? (
        <div onClick={() => setIsOpen(!isOpen)}>{trigger}</div>
      ) : (
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex items-center gap-2 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] px-3.5 py-2 text-sm font-semibold text-[var(--text-primary)] hover:border-[var(--coral)] transition-colors cursor-pointer"
        >
          <span>{label}</span>
          <ChevronDown className="h-4 w-4 text-[var(--text-muted)]" />
        </button>
      )}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={scaleIn}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={`absolute z-40 mt-2 w-56 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] p-1.5 shadow-[var(--shadow-hover)] ${
              align === 'right' ? 'right-0' : 'left-0'
            }`}
          >
            {items.map((item, index) => {
              if (item.divider) {
                return (
                  <div key={index} className="my-1 border-t border-[var(--border)]" />
                );
              }
              const Icon = item.icon;
              return (
                <button
                  key={index}
                  onClick={() => {
                    if (onSelect) onSelect(item);
                    if (item.onClick) item.onClick();
                    setIsOpen(false);
                  }}
                  className={`flex w-full items-center gap-2.5 rounded-[var(--radius-sm)] px-3 py-2 text-xs font-semibold transition-colors cursor-pointer ${
                    item.danger
                      ? 'text-[var(--danger)] hover:bg-[#FDF0EF]'
                      : 'text-[var(--text-primary)] hover:bg-[var(--surface-secondary)] hover:text-[var(--primary)]'
                  }`}
                >
                  {Icon && <Icon className="h-4 w-4 shrink-0" />}
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

