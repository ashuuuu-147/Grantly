import { describe, it, expect } from 'vitest';
import {
  escapeIcsText,
  generateIcsContent,
  generateAllIcsContent,
} from '../calendarExport';

describe('calendarExport - escapeIcsText', () => {
  it('escapes commas, semicolons, and newlines per RFC 5545', () => {
    const raw = 'Fellowship; Computing, Tech\nApplication';
    expect(escapeIcsText(raw)).toBe('Fellowship\\; Computing\\, Tech\\nApplication');
  });

  it('handles null/undefined gracefully', () => {
    expect(escapeIcsText(null)).toBe('');
  });
});

describe('calendarExport - generateIcsContent', () => {
  it('generates standard RFC 5545 iCalendar content', () => {
    const scholarship = {
      id: 'sch-101',
      title: 'Turing Computing Fellowship',
      provider: 'Future Tech Institute',
      awardAmount: 50000,
      deadline: '2026-12-15',
    };

    const ics = generateIcsContent(scholarship);
    expect(ics).toContain('BEGIN:VCALENDAR');
    expect(ics).toContain('VERSION:2.0');
    expect(ics).toContain('BEGIN:VEVENT');
    expect(ics).toContain('SUMMARY:GRANTLY Deadline: Turing Computing Fellowship');
    expect(ics).toContain('DTSTART:20261215T235959Z');
    expect(ics).toContain('UID:grantly-sch-101@grantly.app');
    expect(ics).toContain('END:VCALENDAR');
  });

  it('returns null for missing or invalid deadline', () => {
    expect(generateIcsContent({ title: 'No Deadline' })).toBeNull();
    expect(generateIcsContent({ deadline: 'invalid-date' })).toBeNull();
  });
});

describe('calendarExport - generateAllIcsContent', () => {
  it('generates multiple VEVENT blocks in a single VCALENDAR', () => {
    const list = [
      { id: 'sch-1', title: 'Grant One', deadline: '2026-11-30', awardAmount: 10000 },
      { id: 'sch-2', title: 'Grant Two', deadline: '2026-12-20', awardAmount: 20000 },
    ];

    const ics = generateAllIcsContent(list);
    expect(ics).toContain('BEGIN:VCALENDAR');
    expect(ics).toContain('SUMMARY:GRANTLY Deadline: Grant One');
    expect(ics).toContain('SUMMARY:GRANTLY Deadline: Grant Two');
    expect(ics.match(/BEGIN:VEVENT/g)).toHaveLength(2);
    expect(ics).toContain('END:VCALENDAR');
  });

  it('returns null for empty lists', () => {
    expect(generateAllIcsContent([])).toBeNull();
  });
});
