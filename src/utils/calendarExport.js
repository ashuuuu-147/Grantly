/**
 * GRANTLY CLIENT-SIDE ICALENDAR (.ICS) EXPORT ENGINE
 * 100% Client-Side. Generates valid RFC 5545 standard iCalendar files for 
 * Google Calendar, Apple Calendar, and Microsoft Outlook.
 */

import { sanitizeString } from './security';

/**
 * Escapes characters for iCalendar format per RFC 5545 section 3.3.11.
 * @param {string} text
 * @returns {string}
 */
export const escapeIcsText = (text) => {
  if (!text) return '';
  return String(text)
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\n/g, '\\n');
};

/**
 * Generates an RFC 5545 compliant VCALENDAR string for a single scholarship.
 * @param {Object} scholarship
 * @returns {string|null}
 */
export const generateIcsContent = (scholarship) => {
  if (!scholarship || !scholarship.deadline) return null;

  const deadlineDate = new Date(scholarship.deadline);
  if (isNaN(deadlineDate.getTime())) return null;

  const year = deadlineDate.getFullYear();
  const month = String(deadlineDate.getMonth() + 1).padStart(2, '0');
  const day = String(deadlineDate.getDate()).padStart(2, '0');
  const dtStr = `${year}${month}${day}T235959Z`;

  const title = scholarship.title || scholarship.name || 'Scholarship Opportunity';
  const amount = (scholarship.awardAmount || scholarship.amount || 0).toLocaleString();
  const provider = scholarship.provider || 'Funding Body';
  const cleanId = sanitizeString(scholarship.id || 'grant', 30);

  const icsLines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//GRANTLY//Scholarship Deadline Calendar//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `SUMMARY:GRANTLY Deadline: ${escapeIcsText(title)}`,
    `DESCRIPTION:${escapeIcsText(`Application deadline for ${title} ($${amount}) by ${provider}. Track your checklist on GRANTLY.`)}`,
    `DTSTART:${dtStr}`,
    `DTEND:${dtStr}`,
    `UID:grantly-${cleanId}@grantly.app`,
    'STATUS:CONFIRMED',
    'BEGIN:VALARM',
    'TRIGGER:-P3D',
    'DESCRIPTION:Reminder: 3 Days Remaining for Scholarship Application',
    'ACTION:DISPLAY',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ];

  return icsLines.join('\r\n');
};

/**
 * Generates an RFC 5545 compliant VCALENDAR string for an array of scholarships.
 * @param {Array<Object>} scholarships
 * @returns {string|null}
 */
export const generateAllIcsContent = (scholarships = []) => {
  if (!Array.isArray(scholarships) || !scholarships.length) return null;

  const events = [];

  scholarships.forEach((sch) => {
    if (!sch?.deadline) return;
    const deadlineDate = new Date(sch.deadline);
    if (isNaN(deadlineDate.getTime())) return;

    const year = deadlineDate.getFullYear();
    const month = String(deadlineDate.getMonth() + 1).padStart(2, '0');
    const day = String(deadlineDate.getDate()).padStart(2, '0');
    const dtStr = `${year}${month}${day}T235959Z`;

    const title = sch.title || sch.name || 'Scholarship Opportunity';
    const amount = (sch.awardAmount || sch.amount || 0).toLocaleString();
    const cleanId = sanitizeString(sch.id || 'grant', 30);

    events.push(
      [
        'BEGIN:VEVENT',
        `SUMMARY:GRANTLY Deadline: ${escapeIcsText(title)}`,
        `DESCRIPTION:${escapeIcsText(`Award amount $${amount} offered by ${sch.provider || 'Funding Body'}. Managed via GRANTLY Platform.`)}`,
        `DTSTART:${dtStr}`,
        `DTEND:${dtStr}`,
        `UID:grantly-${cleanId}@grantly.app`,
        'STATUS:CONFIRMED',
        'BEGIN:VALARM',
        'TRIGGER:-P3D',
        'DESCRIPTION:Reminder: Scholarship Deadline in 3 Days',
        'ACTION:DISPLAY',
        'END:VALARM',
        'END:VEVENT',
      ].join('\r\n')
    );
  });

  if (!events.length) return null;

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//GRANTLY//All Deadlines Calendar//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    ...events,
    'END:VCALENDAR',
  ].join('\r\n');
};

/**
 * Trigger file download for a single scholarship deadline.
 * @param {Object} scholarship
 */
export const exportScholarshipToICS = (scholarship) => {
  const content = generateIcsContent(scholarship);
  if (!content || typeof window === 'undefined' || typeof document === 'undefined') return;

  const title = scholarship.title || scholarship.name || 'scholarship';
  const blob = new Blob([content], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  const safeFilename = title.replace(/[^a-z0-9]/gi, '_').toLowerCase();
  link.setAttribute('download', `${safeFilename}_deadline.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

/**
 * Trigger file download for all scholarship deadlines.
 * @param {Array<Object>} scholarships
 */
export const exportAllDeadlinesToICS = (scholarships = []) => {
  const content = generateAllIcsContent(scholarships);
  if (!content || typeof window === 'undefined' || typeof document === 'undefined') return;

  const blob = new Blob([content], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'grantly_all_deadlines.ics');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
