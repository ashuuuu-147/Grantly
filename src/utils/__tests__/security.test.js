import { describe, it, expect } from 'vitest';
import {
  sanitizeHtml,
  sanitizeString,
  escapeRegex,
  isValidSafeUrl,
  getSafeUrl,
  validateUserProfile,
  validateApplicationsList,
  validateSavedIds,
} from '../security';

describe('security - sanitizeHtml', () => {
  it('escapes dangerous HTML characters', () => {
    const raw = '<script>alert("xss")</script>';
    expect(sanitizeHtml(raw)).toBe('&lt;script&gt;alert(&quot;xss&quot;)&lt;&#x2F;script&gt;');
  });

  it('escapes ampersands and quotes properly', () => {
    expect(sanitizeHtml('Tom & Jerry "Special"')).toBe('Tom &amp; Jerry &quot;Special&quot;');
    expect(sanitizeHtml("It's awesome")).toBe('It&#39;s awesome');
  });

  it('handles null/undefined gracefully', () => {
    expect(sanitizeHtml(null)).toBe('');
    expect(sanitizeHtml(undefined)).toBe('');
  });
});

describe('security - sanitizeString', () => {
  it('strips non-printable ASCII control characters', () => {
    const dirty = 'Hello\x00\x08World\x1F!';
    expect(sanitizeString(dirty)).toBe('HelloWorld!');
  });

  it('enforces maximum length bounds', () => {
    const longStr = 'a'.repeat(200);
    expect(sanitizeString(longStr, 50)).toHaveLength(50);
  });
});

describe('security - escapeRegex', () => {
  it('escapes RegExp control characters to prevent injection/ReDoS', () => {
    const userQuery = 'test (bracket) [square] * + ? ^ $ . |';
    const escaped = escapeRegex(userQuery);
    expect(escaped).toBe('test \\(bracket\\) \\[square\\] \\* \\+ \\? \\^ \\$ \\. \\|');
    const regex = new RegExp(escaped, 'i');
    expect(regex.test('test (bracket) [square] * + ? ^ $ . |')).toBe(true);
  });
});

describe('security - isValidSafeUrl & getSafeUrl', () => {
  it('accepts safe http and https protocols', () => {
    expect(isValidSafeUrl('https://example.com/scholarship')).toBe(true);
    expect(isValidSafeUrl('http://sub.domain.org/path?q=1')).toBe(true);
    expect(isValidSafeUrl('/explore')).toBe(true);
  });

  it('rejects malicious javascript, data, and file protocols', () => {
    expect(isValidSafeUrl('javascript:alert(1)')).toBe(false);
    expect(isValidSafeUrl('JAVASCRIPT:alert(document.cookie)')).toBe(false);
    expect(isValidSafeUrl('data:text/html,<script>alert(1)</script>')).toBe(false);
    expect(isValidSafeUrl('vbscript:msgbox(1)')).toBe(false);
    expect(isValidSafeUrl('file:///etc/passwd')).toBe(false);
  });

  it('returns fallback URL when given unsafe URL in getSafeUrl', () => {
    expect(getSafeUrl('javascript:alert(1)', '#')).toBe('#');
    expect(getSafeUrl('https://valid.org', '#')).toBe('https://valid.org');
  });
});

describe('security - schema validators', () => {
  it('validates and bounds user profile', () => {
    const fallback = { name: 'Demo Scholar', gpa: 3.5, academicPercentage: 80, annualIncome: 50000 };
    const badProfile = {
      name: '<script>Hack</script>',
      gpa: 5.5, // out of bounds
      academicPercentage: 150, // out of bounds
      annualIncome: -500, // out of bounds
    };

    const sanitized = validateUserProfile(badProfile, fallback);
    expect(sanitized.name).toBe('<script>Hack</script>'); // String sanitized
    expect(sanitized.gpa).toBe(4.0); // clamped to 4.0
    expect(sanitized.academicPercentage).toBe(100); // clamped to 100
    expect(sanitized.annualIncome).toBe(0); // clamped to 0
  });

  it('validates applications list and ignores corrupt objects', () => {
    const raw = [
      { id: 'app-1', title: 'Valid App', status: 'In Progress', progress: 50 },
      null,
      'invalid string',
      { noId: true },
    ];
    const cleaned = validateApplicationsList(raw, []);
    expect(cleaned).toHaveLength(1);
    expect(cleaned[0].id).toBe('app-1');
    expect(cleaned[0].title).toBe('Valid App');
  });

  it('validates saved IDs array', () => {
    const raw = ['sch-1', '', null, 123, 'sch-2'];
    const cleaned = validateSavedIds(raw, []);
    expect(cleaned).toEqual(['sch-1', 'sch-2']);
  });
});
