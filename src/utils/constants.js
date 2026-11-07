/**
 * Platform-wide constants and configuration.
 */

export const APP_NAME = 'GRANTLY';
export const APP_TAGLINE = 'Curated Scholarship Intelligence for Global Scholars';

export const ROUTES = {
  HOME: '/',
  DASHBOARD: '/dashboard',
  EXPLORE: '/explore',
  SCHOLARSHIP_DETAIL: (id = ':id') => `/scholarship/${id}`,
  ELIGIBILITY: '/eligibility',
  APPLICATIONS: '/applications',
  SAVED: '/saved',
  DEADLINES: '/deadlines',
  PROFILE: '/profile',
  SETTINGS: '/settings',
};

export const SCHOLARSHIP_TYPES = [
  'Merit-Based',
  'Need-Based',
  'STEM & Research',
  'International / Study Abroad',
  'Underrepresented Minority',
  'Women in Tech',
  'Athletic',
];

export const APPLICATION_STATUS = {
  NOT_STARTED: 'Not Started',
  IN_PROGRESS: 'In Progress',
  SUBMITTED: 'Submitted',
  UNDER_REVIEW: 'Under Review',
  AWARDED: 'Awarded',
  REJECTED: 'Rejected',
};

export const EDUCATION_LEVELS = [
  'High School Senior',
  'Undergraduate (Freshman/Sophomore)',
  'Undergraduate (Junior/Senior)',
  'Master\'s Degree',
  'Ph.D. / Doctoral Candidate',
  'Postdoctoral / Researcher',
];

