import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';

/**
 * GRANTLY TOAST FEEDBACK COMPONENT
 */

const TOAST_ICONS = {
  success: CheckCircle2,
  warning: AlertTriangle,
  danger: AlertCircle,
  info: Info,
};

const TOAST_STYLES = {
  success: 'border-[var(--success)] text-[var(--success)] bg-[#EAF5F0]',
  warning: 'border-[var(--warning)] text-[var(--warning)] bg-[#FDF5E8]',
  danger: 'border-[var(--danger)] text-[var(--danger)] bg-[#FDF0EF]',
  info: 'border-[var(--coral)] text-[var(--primary)] bg-[var(--peach-tint)]',
};

export const Toast = ({
  id,
  type = 'info',
  title,
  message,
  onClose,
  duration = 4000,
}) => {
  const Icon = TOAST_ICONS[type] || TOAST_ICONS.info;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.15 } }}
      className={`pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-[var(--radius-md)] border p-4 shadow-[var(--shadow-hover)] ${
        TOAST_STYLES[type] || TOAST_STYLES.info
      }`}
      role="status"
    >
      <Icon className="h-5 w-5 shrink-0 mt-0.5" />
      <div className="flex-1">
        {title && (
          <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-primary)]">
            {title}
          </h4>
        )}
        <p className="text-sm font-medium text-[var(--text-primary)]">{message}</p>
      </div>
      {onClose && (
        <button
          onClick={() => onClose(id)}
          className="text-[var(--text-muted)] hover:text-[var(--text-primary)] rounded-[var(--radius-sm)] p-1 transition-colors cursor-pointer"
          aria-label="Close toast"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </motion.div>
  );
};

export const ToastContainer = ({ toasts = [], onClose }) => {
  return (
    <div
      aria-live="polite"
      className="pointer-events-none fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full p-4"
    >
      <AnimatePresence>
        {toasts.map((toast) => (
          <Toast key={toast.id} {...toast} onClose={onClose} />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default Toast;

