/**
 * GRANTLY SECURITY & DATA SANITIZATION UTILITIES
 * Enterprise-grade XSS mitigation, input sanitization, safe URL handling,
 * regex escaping, and defensive schema validators.
 */

const HTML_ENTITY_MAP = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
  '/': '&#x2F;',
};

/**
 * Escapes HTML characters in untrusted strings to prevent XSS.
 * @param {unknown} input - Input to sanitize
 * @returns {string} Sanitized string
 */
export const sanitizeHtml = (input) => {
  if (input === null || input === undefined) return '';
  const str = String(input);
  return str.replace(/[&<>"'/]/g, (char) => HTML_ENTITY_MAP[char] || char);
};

/**
 * Strips dangerous control characters and enforces length bounds.
 * @param {unknown} input - Raw string input
 * @param {number} [maxLength=500] - Maximum allowed length
 * @returns {string} Clean, trimmed string
 */
export const sanitizeString = (input, maxLength = 500) => {
  if (input === null || input === undefined) return '';
  const str = String(input);
  // Remove ASCII control characters except newline and tab
  const cleaned = str.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');
  return cleaned.trim().slice(0, maxLength);
};

/**
 * Escapes special characters for safe inclusion in dynamic RegExp objects.
 * Prevents Regular Expression Denial of Service (ReDoS) and regex injection.
 * @param {string} str - Raw query string
 * @returns {string} Escaped string safe for RegExp construction
 */
export const escapeRegex = (str) => {
  if (!str || typeof str !== 'string') return '';
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

/**
 * Validates external and internal URLs against malicious protocols.
 * Explicitly rejects javascript:, data:, vbscript:, and file: schemes.
 * Only permits valid http: and https: protocols or relative paths.
 * @param {string} url - URL string to inspect
 * @returns {boolean} Whether the URL is safe to render in an href attribute
 */
export const isValidSafeUrl = (url) => {
  if (!url || typeof url !== 'string') return false;
  const trimmed = url.trim();

  // Block javascript:, vbscript:, data: regardless of casing/spacing
  const dangerousPattern = /^(?:javascript|data|vbscript|file):/i;
  if (dangerousPattern.test(trimmed)) return false;

  // Allow relative URLs starting with /
  if (trimmed.startsWith('/') && !trimmed.startsWith('//')) return true;

  try {
    const parsed = new URL(trimmed);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
};

/**
 * Returns a safe URL for href attributes; falls back to '#' if unsafe.
 * @param {string} url - Target URL
 * @param {string} [fallback='#'] - Fallback URL
 * @returns {string}
 */
export const getSafeUrl = (url, fallback = '#') => {
  return isValidSafeUrl(url) ? url.trim() : fallback;
};

/**
 * Validates and normalizes User Profile objects against expected schema.
 * Rejects or repairs corrupted structures from localStorage.
 * @param {unknown} data - Untrusted stored profile object
 * @param {Object} fallback - Default mockUser fallback
 * @returns {Object} Validated profile object
 */
export const validateUserProfile = (data, fallback) => {
  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    return fallback;
  }

  const sanitized = { ...fallback };

  if (typeof data.name === 'string') sanitized.name = sanitizeString(data.name, 100);
  if (typeof data.email === 'string') sanitized.email = sanitizeString(data.email, 120);
  if (typeof data.collegeName === 'string') sanitized.collegeName = sanitizeString(data.collegeName, 120);
  if (typeof data.university === 'string') sanitized.university = sanitizeString(data.university, 120);
  if (typeof data.educationLevel === 'string') sanitized.educationLevel = sanitizeString(data.educationLevel, 80);
  if (typeof data.course === 'string') sanitized.course = sanitizeString(data.course, 100);
  if (typeof data.major === 'string') sanitized.major = sanitizeString(data.major, 100);
  if (typeof data.academicYear === 'string') sanitized.academicYear = sanitizeString(data.academicYear, 60);
  if (typeof data.state === 'string') sanitized.state = sanitizeString(data.state, 80);

  // Numeric bounds checking
  if (typeof data.gpa === 'number' && !isNaN(data.gpa)) {
    sanitized.gpa = Math.max(0, Math.min(4.0, parseFloat(data.gpa.toFixed(2))));
  }
  if (typeof data.academicPercentage === 'number' && !isNaN(data.academicPercentage)) {
    sanitized.academicPercentage = Math.max(0, Math.min(100, Math.round(data.academicPercentage)));
  }
  if (typeof data.annualIncome === 'number' && !isNaN(data.annualIncome)) {
    sanitized.annualIncome = Math.max(0, Math.min(1000000, Math.round(data.annualIncome)));
  }

  return sanitized;
};

/**
 * Validates an array of application objects from localStorage.
 * @param {unknown} data - Stored applications array
 * @param {Array} fallback - Default mockApplications
 * @returns {Array} Validated application items
 */
export const validateApplicationsList = (data, fallback = []) => {
  if (!Array.isArray(data)) return fallback;

  return data
    .filter((item) => item && typeof item === 'object' && !Array.isArray(item) && item.id)
    .map((app) => ({
      id: sanitizeString(app.id, 50),
      scholarshipId: sanitizeString(app.scholarshipId || app.id, 50),
      title: sanitizeString(app.title || 'Scholarship Opportunity', 150),
      provider: sanitizeString(app.provider || 'Funding Body', 120),
      awardAmount: typeof app.awardAmount === 'number' ? Math.max(0, app.awardAmount) : 25000,
      amount: typeof app.awardAmount === 'number' ? Math.max(0, app.awardAmount) : 25000,
      status: ['Saved', 'In Progress', 'Submitted', 'Approved', 'Rejected'].includes(app.status)
        ? app.status
        : 'In Progress',
      deadline: sanitizeString(app.deadline || '', 20),
      progress: typeof app.progress === 'number' ? Math.max(0, Math.min(100, app.progress)) : 20,
      lastUpdated: sanitizeString(app.lastUpdated || new Date().toISOString().split('T')[0], 20),
      notes: sanitizeString(app.notes || '', 2000),
      documents: Array.isArray(app.documents)
        ? app.documents.map((doc) => ({
            name: sanitizeString(doc?.name || 'Document', 120),
            completed: Boolean(doc?.completed),
            required: Boolean(doc?.required),
          }))
        : [],
    }));
};

/**
 * Validates an array of saved scholarship IDs.
 * @param {unknown} data - Stored saved IDs
 * @param {Array<string>} fallback - Default IDs
 * @returns {Array<string>} Validated array of string IDs
 */
export const validateSavedIds = (data, fallback = []) => {
  if (!Array.isArray(data)) return fallback;
  return data
    .filter((id) => typeof id === 'string' && id.trim().length > 0)
    .map((id) => sanitizeString(id, 50));
};
