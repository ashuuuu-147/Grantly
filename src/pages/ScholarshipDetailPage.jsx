import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Calendar,
  DollarSign,
  Bookmark,
  BookmarkCheck,
  CheckCircle2,
  Award,
  Share2,
  GraduationCap,
  FileText,
  Clock,
  ExternalLink,
  ShieldCheck,
  PlusCircle,
  HelpCircle,
  AlertCircle,
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
  Breadcrumb,
} from '../components/ui';
import FadeIn from '../components/animations/FadeIn';
import { useApp } from '../context/AppContext';
import { formatCurrency, formatDate, getDaysRemaining } from '../utils/formatters';
import { ROUTES } from '../utils/constants';
import { isValidSafeUrl, getSafeUrl } from '../utils/security';
import AmbientBackground from '../components/common/AmbientBackground';

export const ScholarshipDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { scholarships, isScholarshipSaved, toggleSaveScholarship, addApplication, applications, addToast } = useApp();
  const [activeSection, setActiveSection] = useState('overview');

  const scholarship = scholarships.find((s) => s.id === id) || scholarships[0];
  const isSaved = scholarship ? isScholarshipSaved(scholarship.id) : false;
  const deadlineInfo = scholarship ? getDaysRemaining(scholarship.deadline) : null;

  // Check if scholarship is already in application tracker
  const isAlreadyInTracker = applications.some(
    (app) => app.scholarshipId === scholarship.id || app.id === scholarship.id
  );

  const handleAddToTracker = () => {
    const success = addApplication(scholarship);
    if (success) {
      navigate(ROUTES.APPLICATIONS);
    }
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      addToast('Link Copied', 'Scholarship detail link copied to clipboard.', 'info');
    }
  };

  if (!scholarship) {
    return (
      <div className="text-center py-24 space-y-4">
        <h2 className="heading-section text-2xl">Scholarship not found</h2>
        <p className="text-sm text-[var(--text-secondary)]">The requested opportunity could not be located.</p>
        <Link to={ROUTES.EXPLORE}>
          <PrimaryButton>Browse Scholarships</PrimaryButton>
        </Link>
      </div>
    );
  }

  return (
    <AmbientBackground variant="details">
      <FadeIn className="space-y-8 pb-20 max-w-6xl mx-auto">
      {/* 1. Header & Breadcrumb Navigation */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Breadcrumb
            items={[
              { label: 'Explore', to: ROUTES.EXPLORE },
              { label: scholarship.category, to: `${ROUTES.EXPLORE}?category=${encodeURIComponent(scholarship.category)}` },
              { label: scholarship.title },
            ]}
          />
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors cursor-pointer"
          >
            <Share2 className="h-3.5 w-3.5" /> Share Grant
          </button>
        </div>

        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-6 border-b border-[var(--border)]">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge variant="coral">{scholarship.category}</Badge>
              <Badge variant="peach">{scholarship.educationLevel}</Badge>
              {scholarship.featured && <Badge variant="gold">Editor's Pick</Badge>}
            </div>

            <h1 className="heading-page text-2xl sm:text-3xl lg:text-4xl text-[var(--text-primary)]">
              {scholarship.title}
            </h1>

            <p className="text-sm font-semibold text-[var(--text-secondary)]">
              Administered by{' '}
              <span className="text-[var(--text-primary)] underline decoration-[var(--coral)]/50">
                {scholarship.provider}
              </span>
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <SecondaryButton
              icon={isSaved ? BookmarkCheck : Bookmark}
              onClick={() => toggleSaveScholarship(scholarship.id)}
            >
              {isSaved ? 'Saved' : 'Bookmark'}
            </SecondaryButton>

            <PrimaryButton
              icon={PlusCircle}
              onClick={handleAddToTracker}
              disabled={isAlreadyInTracker}
            >
              {isAlreadyInTracker ? 'Tracking in Progress' : 'Add to Tracker'}
            </PrimaryButton>
          </div>
        </div>
      </div>

      {/* 2. Key Metrics Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-[var(--radius-xl)] bg-[var(--surface-secondary)]/40 border border-[var(--border)]">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--text-muted)] font-body">
            Award Value
          </span>
          <p className="font-heading text-2xl lg:text-3xl font-extrabold text-[var(--primary)] tabular-nums mt-0.5">
            {formatCurrency(scholarship.awardAmount || scholarship.amount)}
          </p>
          <span className="text-[12px] text-[var(--text-secondary)] font-body">Non-repayable grant</span>
        </div>

        <div>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--text-muted)] font-body">
            Application Deadline
          </span>
          <p className="font-heading text-base font-bold text-[var(--text-primary)] mt-1 tabular-nums">
            {formatDate(scholarship.deadline)}
          </p>
          <Badge variant={deadlineInfo?.isUrgent ? 'danger' : 'coral'} size="sm" className="mt-1 font-semibold">
            {deadlineInfo?.label}
          </Badge>
        </div>

        <div>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--text-muted)] font-body">
            Academic Threshold
          </span>
          <p className="font-heading text-base font-bold text-[var(--text-primary)] mt-1 tabular-nums">
            {scholarship.minimumMarks || 75}%+ Marks
          </p>
          <span className="text-[12px] text-[var(--success)] font-medium font-body">Min criteria requirement</span>
        </div>

        <div>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--text-muted)] font-body">
            Family Income Cap
          </span>
          <p className="font-heading text-base font-bold text-[var(--text-primary)] mt-1 tabular-nums">
            ≤ ${((scholarship.maximumIncome || 120000) / 1000).toFixed(0)}k USD
          </p>
          <span className="text-[12px] text-[var(--text-secondary)] font-body">Household tax verify</span>
        </div>
      </div>

      {/* 3. Main Detail Grid: Left (Rich Content) & Right (Application Sidebar) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Main Content Area */}
        <div className="lg:col-span-8 space-y-8">
          {/* About Program */}
          <BaseCard className="p-6 sm:p-7 space-y-4">
            <h3 className="heading-card text-lg text-[var(--text-primary)] flex items-center gap-2">
              <Award className="h-5 w-5 text-[var(--primary)]" />
              About This Scholarship Program
            </h3>
            <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
              {scholarship.description}
            </p>

            <div className="pt-4 border-t border-[var(--border)]">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-3">
                Key Award Benefits & Coverage
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {(scholarship.benefits || [
                  'Direct tuition reduction',
                  'Living allowance grant',
                  'Faculty mentorship pairing',
                  'Research colloquium invitation',
                ]).map((ben, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2.5 p-3 rounded-[var(--radius-md)] bg-[var(--surface-secondary)]/40 text-xs font-semibold text-[var(--text-primary)]"
                  >
                    <CheckCircle2 className="h-4 w-4 text-[var(--success)] shrink-0" />
                    <span>{ben}</span>
                  </div>
                ))}
              </div>
            </div>
          </BaseCard>

          {/* Eligibility Requirements */}
          <BaseCard className="p-6 sm:p-7 space-y-4">
            <h3 className="heading-card text-lg text-[var(--text-primary)] flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-[var(--success)]" />
              Mandatory Eligibility Requirements
            </h3>
            <ul className="space-y-3">
              {(scholarship.requirements || [
                `Enrolled in an accredited ${scholarship.educationLevel} program`,
                `Minimum cumulative academic score of ${scholarship.minimumMarks || 75}% or 3.5+ GPA`,
                `Declared major in: ${(scholarship.eligibleCourses || ['Relevant Field']).join(', ')}`,
                `Household income below $${(scholarship.maximumIncome || 120000).toLocaleString()}`,
                `Valid identity verification proof and academic transcripts`,
              ]).map((req, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-3 text-sm text-[var(--text-secondary)] p-3 rounded-[var(--radius-md)] bg-[var(--surface-secondary)]/20 border border-[var(--border)]"
                >
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--peach-tint)] text-[10px] font-bold text-[var(--primary)] mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed">{req}</span>
                </li>
              ))}
            </ul>
          </BaseCard>

          {/* Required Documents Checklist */}
          <BaseCard className="p-6 sm:p-7 space-y-4">
            <h3 className="heading-card text-lg text-[var(--text-primary)] flex items-center gap-2">
              <FileText className="h-5 w-5 text-[var(--primary)]" />
              Required Application Documents
            </h3>
            <p className="text-xs text-[var(--text-secondary)]">
              Ensure all official certificates and proofs are digitally ready before beginning the application workflow:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {(scholarship.requiredDocuments || [
                'Official Academic Transcript',
                'Two Letters of Academic Recommendation',
                'Statement of Purpose or Research Proposal',
                'Proof of Identity / Citizenship',
              ]).map((doc, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-3.5 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)]"
                >
                  <div className="h-7 w-7 rounded-full bg-[var(--peach-tint)] text-[var(--primary)] flex items-center justify-center shrink-0">
                    <FileText className="h-3.5 w-3.5" />
                  </div>
                  <span className="text-xs font-semibold text-[var(--text-primary)] leading-snug">
                    {doc}
                  </span>
                </div>
              ))}
            </div>
          </BaseCard>

          {/* Application Steps */}
          <BaseCard className="p-6 sm:p-7 space-y-4">
            <h3 className="heading-card text-lg text-[var(--text-primary)] flex items-center gap-2">
              <Clock className="h-5 w-5 text-[var(--warning)]" />
              Application Process & Submission Steps
            </h3>
            <div className="space-y-4 relative">
              {(scholarship.applicationSteps || [
                'Review and verify baseline criteria against your academic transcript',
                'Gather required letters of recommendation and personal statement',
                'Complete official online provider application packet',
                'Participate in committee review or virtual finalist interview',
              ]).map((step, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--primary)] text-white text-xs font-bold">
                    {idx + 1}
                  </div>
                  <div className="pt-0.5">
                    <p className="text-sm font-semibold text-[var(--text-primary)] leading-relaxed">
                      {step}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </BaseCard>

          {/* Official Demonstration Notice */}
          <div className="p-4 rounded-[var(--radius-lg)] bg-[var(--surface-secondary)]/50 border border-[var(--border)] text-xs text-[var(--text-secondary)] leading-relaxed flex items-start gap-3">
            <AlertCircle className="h-4 w-4 text-[var(--coral)] shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-[var(--text-primary)]">Sample Demonstration Record</p>
              <p className="mt-0.5">
                Scholarship information displayed here is sample demonstration data. Please confirm official eligibility criteria, deadlines, and application details with the scholarship provider.
              </p>
            </div>
          </div>
        </div>

        {/* Action Sidebar */}
        <div className="lg:col-span-4 space-y-6 sticky top-24">
          <BaseCard className="p-6 space-y-6 grantly-card-shadow">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] font-sans">
                Quick Action Panel
              </span>
              <h4 className="heading-card text-base text-[var(--text-primary)] mt-1">
                Manage Opportunity
              </h4>
            </div>

            <div className="space-y-3">
              <PrimaryButton
                size="md"
                className="w-full"
                icon={PlusCircle}
                onClick={handleAddToTracker}
                disabled={isAlreadyInTracker}
              >
                {isAlreadyInTracker ? 'Already In Your Tracker' : 'Add to My Applications'}
              </PrimaryButton>

              <SecondaryButton
                size="md"
                className="w-full"
                icon={isSaved ? BookmarkCheck : Bookmark}
                onClick={() => toggleSaveScholarship(scholarship.id)}
              >
                {isSaved ? 'Remove from Saved' : 'Save to Bookmarks'}
              </SecondaryButton>

              {isValidSafeUrl(scholarship.officialUrl) && (
                <a
                  href={getSafeUrl(scholarship.officialUrl)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--coral)] rounded-lg"
                >
                  <OutlineButton size="md" className="w-full" icon={ExternalLink}>
                    Official Provider Website
                    <span className="sr-only"> (opens in new tab)</span>
                  </OutlineButton>
                </a>
              )}
            </div>

            {/* Match Probability Callout */}
            <div className="p-4 rounded-[var(--radius-md)] bg-[var(--peach-tint)] border border-[var(--border)] space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-[var(--primary)]">
                <span>Your Profile Match</span>
                <span>{scholarship.matchScore || 94}%</span>
              </div>
              <div className="h-2 w-full bg-[var(--surface-secondary)] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[var(--primary)] rounded-full"
                  style={{ width: `${scholarship.matchScore || 94}%` }}
                />
              </div>
              <p className="text-[11px] text-[var(--text-secondary)] mt-1">
                Computed against your current GPA ({scholarships[0]?.gpaRequirement || 3.7}+ required).
              </p>
            </div>
          </BaseCard>
        </div>
      </div>
    </FadeIn>
  </AmbientBackground>
  );
};

export default ScholarshipDetailPage;
