/**
 * GRANTLY LOCAL ELIGIBILITY MATCHING ENGINE
 * 
 * 100% Client-side JavaScript matching algorithm that calculates criteria 
 * alignment between a student academic profile and scholarship rules.
 */

export const RESULT_CATEGORIES = {
  MATCH: 'MATCH',
  POSSIBLE_MATCH: 'POSSIBLE_MATCH',
  NOT_MATCHING: 'NOT_CURRENTLY_MATCHING',
};

/**
 * Normalizes GPA to an approximate percentage on a 100 scale for comparison.
 * e.g., 4.0 -> 100%, 3.8 -> 95%, 3.5 -> 88%, 3.0 -> 75%
 * @param {number|string} gpa - Student GPA
 * @returns {number} Score percentage (0 - 100)
 */
export const gpaToPercentage = (gpa) => {
  if (gpa === null || gpa === undefined) return 75;
  const num = typeof gpa === 'number' ? gpa : parseFloat(String(gpa).trim());
  if (isNaN(num)) return 75;

  // Already a percentage if greater than 10
  if (num > 10) {
    return Math.max(0, Math.min(100, Math.round(num)));
  }

  if (num <= 0) return 0;
  // Standard conversion from 4.0 scale
  return Math.max(0, Math.min(100, Math.round((num / 4.0) * 100)));
};

/**
 * Evaluates a single scholarship against a student profile rubric.
 * @param {Object} scholarship - Scholarship program definition
 * @param {Object} profile - Student credentials
 * @returns {Object} Structured match evaluation report
 */
export const evaluateScholarshipEligibility = (scholarship, profile = {}) => {
  if (!scholarship || typeof scholarship !== 'object') {
    return {
      scholarshipId: 'unknown',
      scholarship: null,
      category: RESULT_CATEGORIES.NOT_MATCHING,
      matchScore: 0,
      reasonsForMatch: [],
      missingCriteria: ['Invalid scholarship record.'],
    };
  }

  const reasonsForMatch = [];
  const missingCriteria = [];
  const safeProfile = profile && typeof profile === 'object' ? profile : {};

  // 1. Education Level Check
  const profileLevel = String(safeProfile.educationLevel || safeProfile.role || '').trim();
  const schLevel = String(scholarship.educationLevel || '').trim();
  const levelMatches =
    !schLevel ||
    schLevel === 'All Levels' ||
    schLevel.toLowerCase() === profileLevel.toLowerCase() ||
    (profileLevel.toLowerCase().includes('undergraduate') && schLevel.toLowerCase().includes('undergraduate'));

  if (levelMatches) {
    reasonsForMatch.push(`Your education level (${profileLevel || 'Enrolled'}) meets the target requirement.`);
  } else {
    missingCriteria.push(`Targeted for ${schLevel} (Current: ${profileLevel || 'Unspecified'}).`);
  }

  // 2. Course / Major Check
  const profileCourse = String(safeProfile.course || safeProfile.major || '').trim().toLowerCase();
  const coursesList = Array.isArray(scholarship.eligibleCourses) ? scholarship.eligibleCourses : [];
  const courseMatches =
    coursesList.length === 0 ||
    coursesList.some((c) => c.toLowerCase() === 'all major courses') ||
    coursesList.some((c) => {
      const target = c.toLowerCase();
      return profileCourse && (target.includes(profileCourse) || profileCourse.includes(target));
    });

  if (courseMatches) {
    reasonsForMatch.push(`Your course (${safeProfile.course || safeProfile.major || 'All Majors'}) is recognized as eligible.`);
  } else {
    missingCriteria.push(`Requires enrollment in: ${coursesList.slice(0, 3).join(', ')}.`);
  }

  // 3. Academic Percentage / Marks Check
  let studentPercentage = typeof safeProfile.academicPercentage === 'number'
    ? safeProfile.academicPercentage
    : gpaToPercentage(safeProfile.gpa);
  studentPercentage = Math.max(0, Math.min(100, studentPercentage));

  const minRequiredMarks = typeof scholarship.minimumMarks === 'number' ? scholarship.minimumMarks : 75;
  const marksMatch = studentPercentage >= minRequiredMarks;

  if (marksMatch) {
    reasonsForMatch.push(`Your academic score (~${studentPercentage}%) exceeds the ${minRequiredMarks}% baseline requirement.`);
  } else {
    missingCriteria.push(`Minimum academic score of ${minRequiredMarks}% required (Your score: ~${studentPercentage}%).`);
  }

  // 4. Household Income Check
  let studentIncome = 65000;
  if (typeof safeProfile.annualIncome === 'number' && !isNaN(safeProfile.annualIncome)) {
    studentIncome = safeProfile.annualIncome;
  } else if (safeProfile.annualHouseholdIncome || safeProfile.annualIncome) {
    const rawIncome = String(safeProfile.annualHouseholdIncome || safeProfile.annualIncome);
    const digitsOnly = rawIncome.replace(/[^0-9]/g, '');
    if (digitsOnly) studentIncome = parseInt(digitsOnly, 10);
  }

  const maxAllowedIncome = typeof scholarship.maximumIncome === 'number' ? scholarship.maximumIncome : 150000;
  const incomeMatches = studentIncome <= maxAllowedIncome;

  if (incomeMatches) {
    reasonsForMatch.push(`Household income falls within the permissible limit (≤ $${maxAllowedIncome.toLocaleString()}).`);
  } else {
    missingCriteria.push(`Maximum household income cap of $${maxAllowedIncome.toLocaleString()} exceeded.`);
  }

  // 5. Eligible State / Region Check
  const profileState = String(safeProfile.state || safeProfile.country || 'California').trim().toLowerCase();
  const statesList = Array.isArray(scholarship.eligibleStates) ? scholarship.eligibleStates : [];
  const stateMatches =
    statesList.length === 0 ||
    statesList.some((s) => s.toLowerCase().includes('all states') || s.toLowerCase().includes('global')) ||
    statesList.some((s) => s.toLowerCase() === profileState);

  if (stateMatches) {
    reasonsForMatch.push(`Your region (${safeProfile.state || 'Global/All States'}) is eligible.`);
  } else {
    missingCriteria.push(`Restricted to candidates in: ${statesList.join(', ')}.`);
  }

  // Categorization Logic
  let category;
  if (missingCriteria.length === 0) {
    category = RESULT_CATEGORIES.MATCH;
  } else if (missingCriteria.length === 1 && reasonsForMatch.length >= 3) {
    category = RESULT_CATEGORIES.POSSIBLE_MATCH;
  } else {
    category = RESULT_CATEGORIES.NOT_MATCHING;
  }

  // Composite Match Score (bounded 45% - 99%)
  const totalFactors = reasonsForMatch.length + missingCriteria.length;
  const ratio = totalFactors > 0 ? reasonsForMatch.length / totalFactors : 0.5;
  const matchScore = Math.min(Math.max(Math.round(ratio * 100), 45), 99);

  return {
    scholarshipId: scholarship.id,
    scholarship,
    category,
    matchScore,
    reasonsForMatch,
    missingCriteria,
  };
};

/**
 * Runs eligibility matching across all scholarships in the catalog.
 * @param {Array} scholarships - Catalog of programs
 * @param {Object} profile - Student credentials
 * @returns {{ matched: Array, possible: Array, notMatching: Array, totalChecked: number }}
 */
export const runEligibilityBatchMatch = (scholarships = [], profile = {}) => {
  const safeList = Array.isArray(scholarships) ? scholarships : [];
  const matched = [];
  const possible = [];
  const notMatching = [];

  safeList.forEach((scholarship) => {
    const result = evaluateScholarshipEligibility(scholarship, profile);
    if (result.category === RESULT_CATEGORIES.MATCH) {
      matched.push(result);
    } else if (result.category === RESULT_CATEGORIES.POSSIBLE_MATCH) {
      possible.push(result);
    } else {
      notMatching.push(result);
    }
  });

  // Sort by highest award in each category
  const sortByAward = (a, b) =>
    (b.scholarship?.awardAmount || b.scholarship?.amount || 0) -
    (a.scholarship?.awardAmount || a.scholarship?.amount || 0);

  matched.sort(sortByAward);
  possible.sort(sortByAward);
  notMatching.sort(sortByAward);

  return {
    totalChecked: safeList.length,
    matched,
    possible,
    notMatching,
  };
};
