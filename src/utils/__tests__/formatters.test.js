import { describe, it, expect } from 'vitest';
import {
  formatCurrency,
  formatDate,
  getDaysRemaining,
  truncateText,
} from '../formatters';

describe('formatters - formatCurrency', () => {
  it('formats positive integers to standard USD currency format', () => {
    expect(formatCurrency(50000)).toBe('$50,000');
    expect(formatCurrency(1250)).toBe('$1,250');
    expect(formatCurrency(0)).toBe('$0');
  });

  it('handles invalid numbers or undefined gracefully', () => {
    expect(formatCurrency(NaN)).toBe('$0');
    expect(formatCurrency(null)).toBe('$0');
    expect(formatCurrency('abc')).toBe('$0');
  });
});

describe('formatters - formatDate', () => {
  it('formats valid ISO dates', () => {
    const formatted = formatDate('2026-12-15');
    expect(formatted).toContain('2026');
    expect(formatted).toContain('Dec');
  });

  it('handles null, undefined, or invalid dates', () => {
    expect(formatDate(null)).toBe('N/A');
    expect(formatDate(undefined)).toBe('N/A');
    expect(formatDate('not-a-date')).toBe('Invalid date');
  });
});

describe('formatters - getDaysRemaining', () => {
  it('calculates urgency and remaining days for future deadlines', () => {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 5);

    const result = getDaysRemaining(futureDate.toISOString());
    expect(result.days).toBe(5);
    expect(result.isUrgent).toBe(true);
    expect(result.isPast).toBe(false);
  });

  it('flags deadlines beyond 7 days as non-urgent', () => {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 30);

    const result = getDaysRemaining(futureDate.toISOString());
    expect(result.days).toBe(30);
    expect(result.isUrgent).toBe(false);
    expect(result.isPast).toBe(false);
  });

  it('flags expired deadlines properly', () => {
    const pastDate = new Date();
    pastDate.setDate(pastDate.getDate() - 3);

    const result = getDaysRemaining(pastDate.toISOString());
    expect(result.isPast).toBe(true);
    expect(result.label).toBe('Expired');
  });

  it('handles missing deadline gracefully', () => {
    const result = getDaysRemaining(null);
    expect(result.label).toBe('No deadline');
  });
});

describe('formatters - truncateText', () => {
  it('truncates text beyond maximum length with ellipsis', () => {
    const text = 'The quick brown fox jumps over the lazy dog';
    expect(truncateText(text, 15)).toBe('The quick brown...');
  });

  it('returns original string when length is within bounds', () => {
    const text = 'Short text';
    expect(truncateText(text, 50)).toBe('Short text');
  });

  it('handles empty or non-string values', () => {
    expect(truncateText(null)).toBe('');
    expect(truncateText('')).toBe('');
  });
});
