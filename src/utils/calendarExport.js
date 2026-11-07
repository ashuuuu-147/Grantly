/**
 * GRANTLY CLIENT-SIDE ICALENDAR (.ICS) EXPORT ENGINE
 * 100% Client-Side. Generates valid standard iCalendar files for 
 * Google Calendar, Apple Calendar, and Microsoft Outlook.
 */

export const exportScholarshipToICS = (scholarship) => {
  if (!scholarship || !scholarship.deadline) return;

  const deadlineDate = new Date(scholarship.deadline);
  const year = deadlineDate.getFullYear();
  const month = String(deadlineDate.getMonth() + 1).padStart(2, '0');
  const day = String(deadlineDate.getDate()).padStart(2, '0');
  const dtStr = `${year}${month}${day}T235959Z`;

  const title = scholarship.title || scholarship.name || 'Scholarship Opportunity';
  const amount = (scholarship.awardAmount || scholarship.amount || 0).toLocaleString();
  const provider = scholarship.provider || 'Funding Body';

  const icsLines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//GRANTLY//Scholarship Deadline Calendar//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `SUMMARY:GRANTLY Deadline: ${title}`,
    `DESCRIPTION:Application deadline for ${title} ($${amount}) by ${provider}. Track your checklist on GRANTLY.`,
    `DTSTART:${dtStr}`,
    `DTEND:${dtStr}`,
    `UID:grantly-${scholarship.id || Date.now()}@grantly.app`,
    'STATUS:CONFIRMED',
    'BEGIN:VALARM',
    'TRIGGER:-P3D',
    'DESCRIPTION:Reminder: 3 Days Remaining for Scholarship Application',
    'ACTION:DISPLAY',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ];

  const blob = new Blob([icsLines.join('\r\n')], { type: 'text/calendar;charset=utf-8' });
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

export const exportAllDeadlinesToICS = (scholarships = []) => {
  if (!scholarships.length) return;

  const events = scholarships.map((sch) => {
    const deadlineDate = new Date(sch.deadline);
    const year = deadlineDate.getFullYear();
    const month = String(deadlineDate.getMonth() + 1).padStart(2, '0');
    const day = String(deadlineDate.getDate()).padStart(2, '0');
    const dtStr = `${year}${month}${day}T235959Z`;

    const title = sch.title || sch.name || 'Scholarship Opportunity';
    const amount = (sch.awardAmount || sch.amount || 0).toLocaleString();

    return [
      'BEGIN:VEVENT',
      `SUMMARY:GRANTLY Deadline: ${title}`,
      `DESCRIPTION:Award amount $${amount} offered by ${sch.provider}. Managed via GRANTLY Platform.`,
      `DTSTART:${dtStr}`,
      `DTEND:${dtStr}`,
      `UID:grantly-${sch.id}@grantly.app`,
      'STATUS:CONFIRMED',
      'BEGIN:VALARM',
      'TRIGGER:-P3D',
      'DESCRIPTION:Reminder: Scholarship Deadline in 3 Days',
      'ACTION:DISPLAY',
      'END:VALARM',
      'END:VEVENT',
    ].join('\r\n');
  });

  const fullIcs = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//GRANTLY//All Deadlines Calendar//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    ...events,
    'END:VCALENDAR',
  ].join('\r\n');

  const blob = new Blob([fullIcs], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'grantly_all_deadlines.ics');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export default {
  exportScholarshipToICS,
  exportAllDeadlinesToICS,
};

