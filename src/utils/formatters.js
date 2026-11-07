/**
 * GRANTLY FORMATTING UTILITIES
 * Pure formatting helpers for currency, dates, deadlines, and safe string truncations.
 */

/**
 * Format number to USD currency representation.
 * @param {number|unknown} amount
 * @returns {string} e.g. "$25,000"
 */
export const formatCurrency = (amount) => {
  const numeric = typeof amount === 'number' ? amount : parseFloat(String(amount));
  if (isNaN(numeric) || numeric === null || numeric === undefined) return '$0';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(numeric);
};

/**
 * Format ISO or date string to readable format.
 * @param {string|Date|unknown} dateString
 * @param {Intl.DateTimeFormatOptions} [options]
 * @returns {string} e.g. "Oct 15, 2026"
 */
export const formatDate = (dateString, options = {}) => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return 'Invalid date';

  const defaultOptions = {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    ...options,
  };

  return new Intl.DateTimeFormat('en-US', defaultOptions).format(date);
};

/**
 * Calculate days remaining until a deadline and urgency indicators.
 * @param {string|Date|unknown} deadline
 * @returns {{ days: number, label: string, isUrgent: boolean, isPast: boolean }}
 */
export const getDaysRemaining = (deadline) => {
  if (!deadline) {
    return { days: 0, label: 'No deadline', isUrgent: false, isPast: false };
  }

  const targetDate = new Date(deadline);
  if (isNaN(targetDate.getTime())) {
    return { days: 0, label: 'Invalid date', isUrgent: false, isPast: false };
  }

  const now = new Date();
  const diffTime = targetDate.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) {
    return { days: Math.abs(diffDays), label: 'Expired', isUrgent: false, isPast: true };
  }

  if (diffDays === 0) {
    return { days: 0, label: 'Due today', isUrgent: true, isPast: false };
  }

  return {
    days: diffDays,
    label: `${diffDays} day${diffDays === 1 ? '' : 's'} left`,
    isUrgent: diffDays <= 7,
    isPast: false,
  };
};

/**
 * Safely truncate long strings with ellipsis.
 * @param {string|unknown} text
 * @param {number} [maxLength=100]
 * @returns {string}
 */
export const truncateText = (text, maxLength = 100) => {
  if (!text || typeof text !== 'string') return '';
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trim()}...`;
};
