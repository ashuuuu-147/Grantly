import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Clock,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Sliders,
  Award,
  Bookmark,
  BookmarkCheck,
  Info,
  Calendar,
  DollarSign,
  GraduationCap,
  BookOpen,
} from 'lucide-react';
import {
  BaseCard,
  CardHeader,
  CardTitle,
  CardContent,
  PrimaryButton,
  OutlineButton,
  SecondaryButton,
  Badge,
  TextInput,
  SelectInput,
  ProgressBar,
} from '../components/ui';
import FadeIn from '../components/animations/FadeIn';
import { useApp } from '../context/AppContext';
import { runEligibilityBatchMatch, RESULT_CATEGORIES } from '../utils/matchingEngine';
import { formatCurrency, formatDate, getDaysRemaining } from '../utils/formatters';
import { EDUCATION_LEVELS, ROUTES } from '../utils/constants';
import { slideLeft, slideRight, blurReveal, staggerContainer, staggerItem } from '../styles/motionVariants';
import AmbientBackground from '../components/common/AmbientBackground';

export const EligibilityPage = () => {
  const { scholarships, user, isScholarshipSaved, toggleSaveScholarship } = useApp();

  // Multi-step Wizard State (1 to 4, then 5 for Results)
  const [currentStep, setCurrentStep] = useState(1);

  // Form Fields pre-filled with demo user data for an easy experience
  const [formData, setFormData] = useState({
    // Step 1: Personal Details
    fullName: user.name || 'Alexandria Chen',
    state: user.state || 'California',
    annualIncomeRange: user.annualHouseholdIncome || '$60,000 - $80,000',
    annualIncome: user.annualIncome || 72000,

    // Step 2: Education Details
    educationLevel: user.educationLevel || 'Undergraduate (Junior/Senior)',
    course: user.course || user.major || 'Computer Science',
    fieldOfStudy: 'Engineering & Computing Systems',
    institutionType: user.institutionType || 'Four-Year University (Private Non-Profit)',

    // Step 3: Academic Details
    academicPercentage: user.academicPercentage || 92,
    academicYear: user.academicYear || 'Senior (4th Year)',
    gpa: user.gpa || 3.91,
    firstGen: false,
    researchIntent: true,
  });

  // Match Results State
  const [matchResults, setMatchResults] = useState(null);
  const [activeTab, setActiveTab] = useState('matched'); // 'matched' | 'possible' | 'notMatching'

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleRunMatch = () => {
    const results = runEligibilityBatchMatch(scholarships, formData);
    setMatchResults(results);
    setCurrentStep(5); // Show results
  };

  const handleReset = () => {
    setCurrentStep(1);
    setMatchResults(null);
  };

  return (
    <AmbientBackground variant="eligibility">
      <FadeIn className="space-y-8 pb-20 max-w-5xl mx-auto">
      {/* Header */}
      <div className="space-y-3 pb-6 border-b border-[var(--border)] text-center sm:text-left">
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
          <Badge variant="coral">Interactive Matching Engine</Badge>
          <span className="text-xs text-[var(--text-muted)] font-mono">100% Local JavaScript</span>
        </div>
        <h1 className="heading-page text-2xl sm:text-3xl lg:text-4xl text-[var(--text-primary)]">
          Smart Scholarship Eligibility Checker
        </h1>
        <p className="text-sm text-[var(--text-secondary)] max-w-2xl leading-relaxed">
          Evaluate your academic credentials, household criteria, and degree track against our catalog of 18 verified scholarship rubrics.
        </p>
      </div>

      {/* Progress Indicator (Steps 1 to 4) */}
      {currentStep <= 4 && (
        <div className="p-6 rounded-[var(--radius-xl)] bg-[var(--surface)] border border-[var(--border)] grantly-card-shadow space-y-4">
          <div className="flex items-center justify-between text-xs font-bold text-[var(--text-primary)]">
            <span>Step {currentStep} of 4: {['Personal Details', 'Education Profile', 'Academic Performance', 'Review & Match'][currentStep - 1]}</span>
            <span className="text-[var(--primary)] font-mono">{currentStep * 25}% Completed</span>
          </div>
          <ProgressBar value={currentStep * 25} size="sm" color="coral" />
        </div>
      )}

      {/* STEP 1: PERSONAL DETAILS */}
      {currentStep === 1 && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <BaseCard className="p-6 sm:p-8 space-y-6">
            <div>
              <h3 className="heading-card text-lg text-[var(--text-primary)]">
                Step 1: Personal & Demographic Background
              </h3>
              <p className="text-xs text-[var(--text-secondary)] mt-1">
                Used to evaluate residency eligibility and household income-based grant criteria.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <TextInput
                label="Full Scholar Name"
                value={formData.fullName}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
                placeholder="e.g. Alexandria Chen"
              />

              <SelectInput
                label="State / Region of Primary Residence"
                value={formData.state}
                onChange={(e) => handleInputChange('state', e.target.value)}
                options={[
                  'California',
                  'New York',
                  'Texas',
                  'Massachusetts',
                  'Illinois',
                  'Washington',
                  'Colorado',
                  'Ohio',
                  'Other State / Global International',
                ]}
              />

              <div className="sm:col-span-2 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold uppercase tracking-wider text-[var(--text-muted)] font-sans">
                    Annual Household Income (USD)
                  </span>
                  <span className="font-mono font-bold text-[var(--primary)]">
                    ${formData.annualIncome.toLocaleString()} / year
                  </span>
                </div>
                <input
                  type="range"
                  min="20000"
                  max="180000"
                  step="5000"
                  value={formData.annualIncome}
                  onChange={(e) => handleInputChange('annualIncome', parseInt(e.target.value, 10))}
                  className="w-full accent-[var(--coral)] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-[var(--text-muted)] font-mono">
                  <span>$20k (Pell/Need)</span>
                  <span>$100k (Median)</span>
                  <span>$180k+ (Upper)</span>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-[var(--border)]">
              <PrimaryButton onClick={() => setCurrentStep(2)}>
                Next: Education Details <ArrowRight className="h-4 w-4 ml-1.5" />
              </PrimaryButton>
            </div>
          </BaseCard>
        </motion.div>
      )}

      {/* STEP 2: EDUCATION DETAILS */}
      {currentStep === 2 && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <BaseCard className="p-6 sm:p-8 space-y-6">
            <div>
              <h3 className="heading-card text-lg text-[var(--text-primary)]">
                Step 2: Educational Level & Program of Study
              </h3>
              <p className="text-xs text-[var(--text-secondary)] mt-1">
                Targeting opportunities aligned with your enrolled degree track and academic discipline.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <SelectInput
                label="Current Education Level"
                value={formData.educationLevel}
                onChange={(e) => handleInputChange('educationLevel', e.target.value)}
                options={EDUCATION_LEVELS}
              />

              <SelectInput
                label="Primary Field / Course of Study"
                value={formData.course}
                onChange={(e) => handleInputChange('course', e.target.value)}
                options={[
                  'Computer Science',
                  'Data Science & AI',
                  'Engineering (Mechanical/Electrical)',
                  'Environmental Science',
                  'Public Policy & Law',
                  'Medicine (Pre-Med/MD)',
                  'Physics & Mathematics',
                  'Design & Human-Computer Interaction',
                  'Business & Economics',
                  'Humanities & Social Sciences',
                ]}
              />

              <SelectInput
                label="Institution Classification"
                value={formData.institutionType}
                onChange={(e) => handleInputChange('institutionType', e.target.value)}
                options={[
                  'Four-Year University (Private Non-Profit)',
                  'Four-Year University (Public State)',
                  'Community College / Junior College',
                  'Vocational / Technical Institute',
                ]}
                className="sm:col-span-2"
              />
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-[var(--border)]">
              <SecondaryButton onClick={() => setCurrentStep(1)} icon={ArrowLeft}>
                Back
              </SecondaryButton>
              <PrimaryButton onClick={() => setCurrentStep(3)}>
                Next: Academic Performance <ArrowRight className="h-4 w-4 ml-1.5" />
              </PrimaryButton>
            </div>
          </BaseCard>
        </motion.div>
      )}

      {/* STEP 3: ACADEMIC DETAILS */}
      {currentStep === 3 && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <BaseCard className="p-6 sm:p-8 space-y-6">
            <div>
              <h3 className="heading-card text-lg text-[var(--text-primary)]">
                Step 3: Academic Performance & Standing
              </h3>
              <p className="text-xs text-[var(--text-secondary)] mt-1">
                Enter your GPA and score percentage to compare against provider merit cutoffs.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold uppercase tracking-wider text-[var(--text-muted)] font-sans">
                    Cumulative GPA (4.0 Scale)
                  </span>
                  <span className="font-mono font-bold text-[var(--primary)]">{formData.gpa}</span>
                </div>
                <input
                  type="range"
                  min="2.0"
                  max="4.0"
                  step="0.05"
                  value={formData.gpa}
                  onChange={(e) => {
                    const g = parseFloat(e.target.value);
                    handleInputChange('gpa', g);
                    handleInputChange('academicPercentage', Math.min(Math.round((g / 4.0) * 100), 100));
                  }}
                  className="w-full accent-[var(--coral)] cursor-pointer"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold uppercase tracking-wider text-[var(--text-muted)] font-sans">
                    Equivalent Academic Marks (%)
                  </span>
                  <span className="font-mono font-bold text-[var(--primary)]">
                    {formData.academicPercentage}%
                  </span>
                </div>
                <input
                  type="range"
                  min="60"
                  max="100"
                  step="1"
                  value={formData.academicPercentage}
                  onChange={(e) => handleInputChange('academicPercentage', parseInt(e.target.value, 10))}
                  className="w-full accent-[var(--coral)] cursor-pointer"
                />
              </div>

              <SelectInput
                label="Current Academic Standing / Cohort"
                value={formData.academicYear}
                onChange={(e) => handleInputChange('academicYear', e.target.value)}
                options={[
                  'Senior (4th Year)',
                  'Junior (3rd Year)',
                  'Sophomore (2nd Year)',
                  'Freshman (1st Year)',
                  'Graduate Student',
                ]}
                className="sm:col-span-2"
              />
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-[var(--border)]">
              <SecondaryButton onClick={() => setCurrentStep(2)} icon={ArrowLeft}>
                Back
              </SecondaryButton>
              <PrimaryButton onClick={() => setCurrentStep(4)}>
                Review Application Packet <ArrowRight className="h-4 w-4 ml-1.5" />
              </PrimaryButton>
            </div>
          </BaseCard>
        </motion.div>
      )}

      {/* STEP 4: REVIEW & CONFIRM */}
      {currentStep === 4 && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <BaseCard className="p-6 sm:p-8 space-y-6">
            <div>
              <h3 className="heading-card text-lg text-[var(--text-primary)]">
                Step 4: Review Your Matching Profile
              </h3>
              <p className="text-xs text-[var(--text-secondary)] mt-1">
                Confirm your parameters below before executing the local criteria algorithm.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-[var(--radius-md)] bg-[var(--surface-secondary)]/40 border border-[var(--border)] space-y-2">
                <span className="font-bold uppercase text-[var(--text-muted)] font-sans">Personal Details</span>
                <p><strong>Name:</strong> {formData.fullName}</p>
                <p><strong>State:</strong> {formData.state}</p>
                <p><strong>Household Income:</strong> ${formData.annualIncome.toLocaleString()} / year</p>
              </div>

              <div className="p-4 rounded-[var(--radius-md)] bg-[var(--surface-secondary)]/40 border border-[var(--border)] space-y-2">
                <span className="font-bold uppercase text-[var(--text-muted)] font-sans">Academic Track</span>
                <p><strong>Level:</strong> {formData.educationLevel}</p>
                <p><strong>Course:</strong> {formData.course}</p>
                <p><strong>GPA / Marks:</strong> {formData.gpa} / 4.0 (~{formData.academicPercentage}%)</p>
              </div>
            </div>

            <div className="p-4 rounded-[var(--radius-md)] bg-[var(--peach-tint)] border border-[var(--border)] text-xs text-[var(--text-secondary)] flex items-start gap-3">
              <Info className="h-4 w-4 text-[var(--primary)] shrink-0 mt-0.5" />
              <div>
                <strong className="text-[var(--text-primary)]">Local Verification Note:</strong>
                <p className="mt-0.5">
                  18 active scholarship programs in the local catalog will be evaluated against your requirements. Calculations execute entirely in your browser.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-[var(--border)]">
              <SecondaryButton onClick={() => setCurrentStep(3)} icon={ArrowLeft}>
                Edit Details
              </SecondaryButton>
              <PrimaryButton onClick={handleRunMatch} size="lg" icon={Sparkles}>
                Calculate Grant Matches Now
              </PrimaryButton>
            </div>
          </BaseCard>
        </motion.div>
      )}

      {/* STEP 5: MATCH RESULTS INTERFACE */}
      {currentStep === 5 && matchResults && (
        <motion.div
          variants={blurReveal}
          initial="initial"
          animate="animate"
          className="space-y-8"
        >
          {/* Results Summary Box with Glassmorphism */}
          <div className="p-6 sm:p-8 rounded-[var(--radius-xl)] glass-card space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[var(--border)]">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--success)] flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4" /> Eligibility Evaluation Complete
                </span>
                <h2 className="heading-page text-2xl text-[var(--text-primary)] mt-1">
                  Matching Results for {formData.fullName}
                </h2>
                <p className="text-xs text-[var(--text-muted)] mt-0.5">
                  Evaluated across {matchResults.totalChecked} scholarship records in catalog
                </p>
              </div>

              <OutlineButton size="sm" icon={RotateCcw} onClick={handleReset}>
                Test New Criteria
              </OutlineButton>
            </div>

            {/* Results Counters */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <button
                onClick={() => setActiveTab('matched')}
                className={`p-4 rounded-[var(--radius-lg)] border text-left transition-all cursor-pointer ${
                  activeTab === 'matched'
                    ? 'border-[var(--success)] bg-[#EAF5F0] ring-2 ring-[var(--success)]/30'
                    : 'border-[var(--border)] bg-[var(--surface-secondary)]/30 hover:bg-[var(--surface-secondary)]/60'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[var(--success)]">
                    Direct Matches
                  </span>
                  <CheckCircle2 className="h-4 w-4 text-[var(--success)]" />
                </div>
                <p className="font-heading font-extrabold text-3xl text-[var(--text-primary)] mt-2">
                  {matchResults.matched.length}
                </p>
                <p className="text-[11px] text-[var(--text-muted)] mt-1">100% baseline criteria satisfied</p>
              </button>

              <button
                onClick={() => setActiveTab('possible')}
                className={`p-4 rounded-[var(--radius-lg)] border text-left transition-all cursor-pointer ${
                  activeTab === 'possible'
                    ? 'border-[var(--warning)] bg-[#FDF5E8] ring-2 ring-[var(--warning)]/30'
                    : 'border-[var(--border)] bg-[var(--surface-secondary)]/30 hover:bg-[var(--surface-secondary)]/60'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[var(--warning)]">
                    Possible Matches
                  </span>
                  <Clock className="h-4 w-4 text-[var(--warning)]" />
                </div>
                <p className="font-heading font-extrabold text-3xl text-[var(--text-primary)] mt-2">
                  {matchResults.possible.length}
                </p>
                <p className="text-[11px] text-[var(--text-muted)] mt-1">Minor prerequisite verification needed</p>
              </button>

              <button
                onClick={() => setActiveTab('notMatching')}
                className={`p-4 rounded-[var(--radius-lg)] border text-left transition-all cursor-pointer ${
                  activeTab === 'notMatching'
                    ? 'border-[var(--border)] bg-[var(--surface-secondary)]/70 ring-2 ring-[var(--border)]'
                    : 'border-[var(--border)] bg-[var(--surface-secondary)]/30 hover:bg-[var(--surface-secondary)]/60'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
                    Not Matching
                  </span>
                  <AlertCircle className="h-4 w-4 text-[var(--text-muted)]" />
                </div>
                <p className="font-heading font-extrabold text-3xl text-[var(--text-primary)] mt-2">
                  {matchResults.notMatching.length}
                </p>
                <p className="text-[11px] text-[var(--text-muted)] mt-1">Criteria threshold not met</p>
              </button>
            </div>
          </div>

          {/* Results List */}
          <div className="space-y-4">
            <h3 className="heading-section text-xl text-[var(--text-primary)]">
              {activeTab === 'matched' && `Direct Matches (${matchResults.matched.length})`}
              {activeTab === 'possible' && `Possible Matches (${matchResults.possible.length})`}
              {activeTab === 'notMatching' && `Not Currently Matching (${matchResults.notMatching.length})`}
            </h3>

            {(activeTab === 'matched'
              ? matchResults.matched
              : activeTab === 'possible'
              ? matchResults.possible
              : matchResults.notMatching
            ).map((res) => {
              const item = res.scholarship;
              const isSaved = isScholarshipSaved(item.id);

              return (
                <BaseCard key={item.id} hover className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                    <div className="space-y-3 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge
                          variant={
                            res.category === RESULT_CATEGORIES.MATCH
                              ? 'success'
                              : res.category === RESULT_CATEGORIES.POSSIBLE_MATCH
                              ? 'warning'
                              : 'neutral'
                          }
                        >
                          {res.category === RESULT_CATEGORIES.MATCH
                            ? 'Full Match'
                            : res.category === RESULT_CATEGORIES.POSSIBLE_MATCH
                            ? 'Possible Match'
                            : 'Unmatched'}
                        </Badge>
                        <Badge variant="coral">{item.category}</Badge>
                        <span className="text-xs text-[var(--text-muted)] font-medium">
                          Due {formatDate(item.deadline)}
                        </span>
                      </div>

                      <h4 className="heading-card text-base sm:text-lg text-[var(--text-primary)]">
                        {item.title}
                      </h4>
                      <p className="text-xs text-[var(--text-muted)]">{item.provider}</p>

                      {/* Criteria Explanations */}
                      <div className="space-y-1.5 pt-2">
                        {res.reasonsForMatch.map((reason, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-xs text-[var(--success)]">
                            <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                            <span>{reason}</span>
                          </div>
                        ))}

                        {res.missingCriteria.map((miss, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-xs text-[var(--danger)]">
                            <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                            <span>{miss}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="lg:text-right shrink-0 flex flex-col justify-between items-start lg:items-end gap-3 pt-4 lg:pt-0 border-t lg:border-t-0 border-[var(--border)]">
                      <div>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
                          Award Amount
                        </span>
                        <p className="text-2xl font-extrabold text-[var(--text-primary)]">
                          {formatCurrency(item.awardAmount || item.amount)}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => toggleSaveScholarship(item.id)}
                          className="p-2 rounded-[var(--radius-md)] border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--primary)] hover:bg-[var(--peach-tint)] transition-colors cursor-pointer"
                          title="Bookmark grant"
                        >
                          {isSaved ? (
                            <BookmarkCheck className="h-4 w-4 text-[var(--primary)] fill-[var(--primary)]" />
                          ) : (
                            <Bookmark className="h-4 w-4" />
                          )}
                        </button>

                        <Link to={ROUTES.SCHOLARSHIP_DETAIL(item.id)}>
                          <PrimaryButton size="sm">
                            View Details <ArrowRight className="h-3.5 w-3.5 ml-1" />
                          </PrimaryButton>
                        </Link>
                      </div>
                    </div>
                  </div>
                </BaseCard>
              );
            })}
          </div>

          {/* Official Disclaimer */}
          <div className="p-4 rounded-[var(--radius-lg)] bg-[var(--surface-secondary)]/40 border border-[var(--border)] text-xs text-[var(--text-secondary)] leading-relaxed flex items-start gap-3">
            <Info className="h-4 w-4 text-[var(--coral)] shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-[var(--text-primary)]">Advisory Criteria Notice</p>
              <p className="mt-0.5">
                These results are indicative matches based on sample criteria. Final eligibility is determined by the scholarship provider.
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </FadeIn>
  </AmbientBackground>
  );
};

export default EligibilityPage;
