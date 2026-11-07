/**
 * Formatting helpers for currencies, dates, deadlines, and text.
 */

/**
 * Format number to USD currency representation.
 * @param {number} amount
 * @returns {string} e.g. "$25,000"
 */
export const formatCurrency = (amount) => {
  if (typeof amount !== 'number' || isNaN(amount)) return '$0';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);
};

/**
 * Format ISO or date string to readable format.
 * @param {string|Date} dateString
 * @param {Intl.DateTimeFormatOptions} options
 * @returns {string} e.g. "October 15, 2026"
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
 * Calculate days remaining until a deadline.
 * @param {string|Date} deadline
 * @returns {{ days: number, label: string, isUrgent: boolean, isPast: boolean }}
 */
export const getDaysRemaining = (deadline) => {
  if (!deadline) {
    return { days: 0, label: 'No deadline', isUrgent: false, isPast: false };
  }

  const targetDate = new Date(deadline);
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
 * Truncate long strings with ellipsis.
 */
export const truncateText = (text, maxLength = 100) => {
  if (!text || text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trim()}...`;
};

