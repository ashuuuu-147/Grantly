import { describe, it, expect } from 'vitest';
import {
  gpaToPercentage,
  evaluateScholarshipEligibility,
  runEligibilityBatchMatch,
  RESULT_CATEGORIES,
} from '../matchingEngine';

describe('matchingEngine - gpaToPercentage', () => {
  it('converts 4.0 scale to percentage accurately', () => {
    expect(gpaToPercentage(4.0)).toBe(100);
    expect(gpaToPercentage(3.8)).toBe(95);
    expect(gpaToPercentage(3.0)).toBe(75);
    expect(gpaToPercentage(2.0)).toBe(50);
  });

  it('handles percentage values directly if greater than 10', () => {
    expect(gpaToPercentage(88)).toBe(88);
    expect(gpaToPercentage('92%')).toBe(92);
  });

  it('handles edge cases and invalid input gracefully', () => {
    expect(gpaToPercentage(null)).toBe(75);
    expect(gpaToPercentage(undefined)).toBe(75);
    expect(gpaToPercentage('invalid')).toBe(75);
    expect(gpaToPercentage(0)).toBe(0);
    expect(gpaToPercentage(-1)).toBe(0);
  });
});

describe('matchingEngine - evaluateScholarshipEligibility', () => {
  const sampleScholarship = {
    id: 'sch-test',
    title: 'Test Tech Fellowship',
    educationLevel: 'Undergraduate (Junior/Senior)',
    eligibleCourses: ['Computer Science', 'Data Science'],
    minimumMarks: 80,
    maximumIncome: 100000,
    eligibleStates: ['California', 'New York'],
    awardAmount: 20000,
  };

  it('returns MATCH when all criteria are satisfied', () => {
    const profile = {
      educationLevel: 'Undergraduate (Junior/Senior)',
      course: 'Computer Science',
      academicPercentage: 90,
      annualIncome: 70000,
      state: 'California',
    };

    const result = evaluateScholarshipEligibility(sampleScholarship, profile);
    expect(result.category).toBe(RESULT_CATEGORIES.MATCH);
    expect(result.missingCriteria.length).toBe(0);
    expect(result.reasonsForMatch.length).toBe(5);
    expect(result.matchScore).toBeGreaterThanOrEqual(90);
  });

  it('returns POSSIBLE_MATCH when exactly one minor criterion is missing but most match', () => {
    const profile = {
      educationLevel: 'Undergraduate (Junior/Senior)',
      course: 'Computer Science',
      academicPercentage: 72, // Below 80 requirement
      annualIncome: 60000,
      state: 'California',
    };

    const result = evaluateScholarshipEligibility(sampleScholarship, profile);
    expect(result.category).toBe(RESULT_CATEGORIES.POSSIBLE_MATCH);
    expect(result.missingCriteria.length).toBe(1);
    expect(result.missingCriteria[0]).toContain('Minimum academic score');
  });

  it('returns NOT_CURRENTLY_MATCHING when multiple criteria fail', () => {
    const profile = {
      educationLevel: 'Master\'s Degree',
      course: 'History',
      academicPercentage: 70,
      annualIncome: 150000,
      state: 'Florida',
    };

    const result = evaluateScholarshipEligibility(sampleScholarship, profile);
    expect(result.category).toBe(RESULT_CATEGORIES.NOT_MATCHING);
    expect(result.missingCriteria.length).toBeGreaterThanOrEqual(3);
  });

  it('handles null/undefined scholarship gracefully', () => {
    const result = evaluateScholarshipEligibility(null, {});
    expect(result.category).toBe(RESULT_CATEGORIES.NOT_MATCHING);
    expect(result.matchScore).toBe(0);
  });
});

describe('matchingEngine - runEligibilityBatchMatch', () => {
  const catalog = [
    {
      id: 'sch-1',
      title: 'High Award Grant',
      educationLevel: 'Undergraduate',
      eligibleCourses: ['All Major Courses'],
      minimumMarks: 70,
      maximumIncome: 150000,
      awardAmount: 50000,
    },
    {
      id: 'sch-2',
      title: 'Doctoral Only Grant',
      educationLevel: 'Ph.D. / Doctoral Candidate',
      eligibleCourses: ['Physics'],
      minimumMarks: 95,
      maximumIncome: 50000,
      awardAmount: 30000,
    },
  ];

  it('correctly categorizes and sorts batch results', () => {
    const profile = {
      educationLevel: 'Undergraduate (Junior/Senior)',
      course: 'Computer Science',
      academicPercentage: 85,
      annualIncome: 65000,
    };

    const batch = runEligibilityBatchMatch(catalog, profile);
    expect(batch.totalChecked).toBe(2);
    expect(batch.matched.length).toBe(1);
    expect(batch.matched[0].scholarship.id).toBe('sch-1');
    expect(batch.notMatching.length).toBe(1);
    expect(batch.notMatching[0].scholarship.id).toBe('sch-2');
  });
});
