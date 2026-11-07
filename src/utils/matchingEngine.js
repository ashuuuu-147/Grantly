/**
 * GRANTLY LOCAL ELIGIBILITY MATCHING ENGINE
 * 
 * 100% Client-side JavaScript matching algorithm that calculates criteria 
 * alignment between student academic profile and scholarship rules.
 */

export const RESULT_CATEGORIES = {
  MATCH: 'MATCH',
  POSSIBLE_MATCH: 'POSSIBLE_MATCH',
  NOT_MATCHING: 'NOT_CURRENTLY_MATCHING',
};

/**
 * Normalizes GPA to an approximate percentage on a 100 scale for comparison.
 * e.g., 4.0 -> 95%, 3.5 -> 85%, 3.0 -> 75%
 */
export const gpaToPercentage = (gpa) => {
  if (!gpa) return 75;
  const num = parseFloat(gpa);
  if (isNaN(num)) return 75;
  if (num > 10) {
    // Already in percentage
    return num;
  }
  // Formula: (GPA / 4.0) * 25 + 70 approx or direct mapping
  return Math.min(Math.round((num / 4.0) * 100), 100);
};

/**
 * Checks a single scholarship against the user profile.
 * @param {Object} scholarship
 * @param {Object} profile
 * @returns {Object} evaluation result
 */
export const evaluateScholarshipEligibility = (scholarship, profile) => {
  const reasonsForMatch = [];
  const missingCriteria = [];

  // 1. Education Level Check
  const profileLevel = profile.educationLevel || profile.role;
  const levelMatches =
    !scholarship.educationLevel ||
    scholarship.educationLevel === 'All Levels' ||
    scholarship.educationLevel.toLowerCase() === (profileLevel || '').toLowerCase() ||
    (profileLevel && profileLevel.includes('Undergraduate') && scholarship.educationLevel.includes('Undergraduate'));

  if (levelMatches) {
    reasonsForMatch.push(`Your education level (${profileLevel || 'Enrolled'}) meets the target requirement.`);
  } else {
    missingCriteria.push(`Targeted for ${scholarship.educationLevel} (Current: ${profileLevel || 'Unspecified'}).`);
  }

  // 2. Course / Major Check
  const profileCourse = profile.course || profile.major || '';
  const courseMatches =
    !scholarship.eligibleCourses ||
    scholarship.eligibleCourses.includes('All Major Courses') ||
    scholarship.eligibleCourses.some(
      (c) =>
        c.toLowerCase().includes(profileCourse.toLowerCase()) ||
        profileCourse.toLowerCase().includes(c.toLowerCase())
    );

  if (courseMatches) {
    reasonsForMatch.push(`Your course (${profileCourse || 'All Majors'}) is recognized as eligible.`);
  } else {
    missingCriteria.push(`Requires enrollment in: ${scholarship.eligibleCourses.slice(0, 3).join(', ')}.`);
  }

  // 3. Academic Percentage / Marks Check
  const studentPercentage = profile.academicPercentage || gpaToPercentage(profile.gpa);
  const minRequiredMarks = scholarship.minimumMarks || 75;
  const marksMatch = studentPercentage >= minRequiredMarks;

  if (marksMatch) {
    reasonsForMatch.push(`Your academic score (~${studentPercentage}%) exceeds the ${minRequiredMarks}% baseline requirement.`);
  } else {
    missingCriteria.push(`Minimum academic score of ${minRequiredMarks}% required (Your score: ~${studentPercentage}%).`);
  }

  // 4. Household Income Check
  let studentIncome = 65000;
  if (typeof profile.annualIncome === 'number') {
    studentIncome = profile.annualIncome;
  } else if (profile.annualIncome) {
    // Parse range e.g. "$50k - $80k"
    const matched = profile.annualIncome.replace(/[^0-9]/g, '');
    if (matched) studentIncome = parseInt(matched, 10);
  }

  const maxAllowedIncome = scholarship.maximumIncome || 150000;
  const incomeMatches = studentIncome <= maxAllowedIncome;

  if (incomeMatches) {
    reasonsForMatch.push(`Household income falls within the permissible limit (≤ $${maxAllowedIncome.toLocaleString()}).`);
  } else {
    missingCriteria.push(`Maximum household income cap of $${maxAllowedIncome.toLocaleString()} exceeded.`);
  }

  // 5. Eligible State Check
  const profileState = profile.state || profile.country || 'California';
  const stateMatches =
    !scholarship.eligibleStates ||
    scholarship.eligibleStates.includes('All States / Global') ||
    scholarship.eligibleStates.some((s) => s.toLowerCase() === profileState.toLowerCase());

  if (stateMatches) {
    reasonsForMatch.push(`Your region (${profileState}) is eligible.`);
  } else {
    missingCriteria.push(`Restricted to candidates in: ${scholarship.eligibleStates.join(', ')}.`);
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

  // Calculate composite match percentage (60 - 99%)
  const matchScore = Math.min(
    Math.max(
      Math.round((reasonsForMatch.length / (reasonsForMatch.length + missingCriteria.length)) * 100),
      45
    ),
    99
  );

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
 * @param {Array} scholarships
 * @param {Object} profile
 * @returns {{ matched: Array, possible: Array, notMatching: Array, totalChecked: number }}
 */
export const runEligibilityBatchMatch = (scholarships = [], profile = {}) => {
  const matched = [];
  const possible = [];
  const notMatching = [];

  scholarships.forEach((scholarship) => {
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
  matched.sort((a, b) => b.scholarship.awardAmount - a.scholarship.awardAmount);
  possible.sort((a, b) => b.scholarship.awardAmount - a.scholarship.awardAmount);
  notMatching.sort((a, b) => b.scholarship.awardAmount - a.scholarship.awardAmount);

  return {
    totalChecked: scholarships.length,
    matched,
    possible,
    notMatching,
  };
};

