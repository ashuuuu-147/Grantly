import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Compass,
  CheckCircle2,
  Bookmark,
  FileText,
  DollarSign,
  Calendar,
  Award,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Clock,
  ArrowUpRight,
  Layers,
} from 'lucide-react';
import {
  BaseCard,
  CardHeader,
  CardTitle,
  CardContent,
  PrimaryButton,
  OutlineButton,
  Button,
  Badge,
  StatusBadge,
  ProgressBar,
} from '../components/ui';
import FadeIn from '../components/animations/FadeIn';
import { useApp } from '../context/AppContext';
import { formatCurrency, formatDate, getDaysRemaining } from '../utils/formatters';
import { ROUTES } from '../utils/constants';
import ApplicationAnalytics from '../components/dashboard/ApplicationAnalytics';
import ScholarMilestonesWidget from '../components/dashboard/ScholarMilestonesWidget';
import AmbientBackground from '../components/common/AmbientBackground';
import { staggerContainer, staggerItem, fadeUp } from '../styles/motionVariants';

export const DashboardPage = () => {
  const { user, applications, savedIds, scholarships } = useApp();

  // 1. Calculate active statistics from real state
  const activeApplicationsCount = applications.filter(
    (a) => a.status === 'In Progress' || a.status === 'Submitted'
  ).length;

  const totalPotentialFunding = applications.reduce(
    (sum, a) => sum + (a.awardAmount || a.amount || 0),
    0
  );

  const upcomingDeadlinesList = [...scholarships]
    .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
    .slice(0, 4);

  // 2. Profile completion calculation
  const profileFields = [
    user.name,
    user.email,
    user.collegeName || user.university,
    user.course || user.major,
    user.gpa,
    user.state,
    user.annualHouseholdIncome,
    user.educationLevel,
  ];
  const completedFieldsCount = profileFields.filter(Boolean).length;
  const profileCompletionPercent = Math.round((completedFieldsCount / profileFields.length) * 100);

  // 3. Recommended scholarships based on mock profile
  const recommendedGrants = scholarships
    .filter((s) => {
      const matchCourse = s.eligibleCourses.some((c) =>
        c.toLowerCase().includes((user.course || user.major || '').toLowerCase())
      );
      const matchLevel = s.educationLevel.includes('Undergraduate');
      return matchCourse || matchLevel;
    })
    .slice(0, 3)
    .map((grant) => ({
      ...grant,
      recommendationReason: `${grant.category}: Strong alignment with ${user.course || user.major} and GPA ${user.gpa} exceeds required ${grant.minimumMarks || 80}%`,
    }));

  return (
    <AmbientBackground variant="dashboard">
      <FadeIn className="space-y-8 pb-12">
        {/* 1. Welcome Section with Glassmorphism */}
        <div className="rounded-[var(--radius-xl)] glass-card p-6 sm:p-8 relative overflow-hidden">
        <div
          className="pointer-events-none absolute -right-16 -top-16 w-64 h-64 rounded-full bg-[var(--coral)]/15 blur-3xl -z-10"
          aria-hidden="true"
        />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge variant="coral" size="sm">
                Scholar Hub
              </Badge>
              <span className="text-xs font-semibold text-[var(--text-muted)]">
                Stanford University &bull; Class of {user.graduationYear}
              </span>
            </div>
            <h1 className="heading-page text-[var(--text-primary)]">
              Welcome back, {user.name.split(' ')[0]}!
            </h1>
            <p className="text-sm text-[var(--text-secondary)] max-w-xl">
              Let's discover opportunities for your future. You currently have{' '}
              <strong className="text-[var(--text-primary)]">{activeApplicationsCount} grants</strong> in your active application pipeline.
            </p>
          </div>

          {/* Profile Completion Widget with Glass Panel */}
          <div className="p-4 rounded-[var(--radius-lg)] glass-panel min-w-[260px] space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-[var(--text-primary)]">
              <span>Profile Completion</span>
              <span className="text-[var(--primary)]">{profileCompletionPercent}%</span>
            </div>
            <ProgressBar value={profileCompletionPercent} size="sm" color="coral" />
            <div className="flex items-center justify-between pt-1">
              <span className="text-[11px] text-[var(--text-muted)]">Verified credentials</span>
              <Link to={ROUTES.PROFILE} className="text-[11px] font-bold text-[var(--primary)] hover:underline">
                Complete Profile &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Interactive Statistics Cards with Staggered Entrance */}
      <motion.div
        variants={staggerContainer(0.08)}
        initial="initial"
        animate="animate"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
      >
        <motion.div variants={staggerItem}>
          <BaseCard hover className="p-5 flex flex-col justify-between glass-card h-full">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--text-muted)] font-body">
                Saved Scholarships
              </span>
              <div className="h-9 w-9 rounded-[var(--radius-md)] bg-[var(--peach-tint)] text-[var(--primary)] flex items-center justify-center">
                <Bookmark className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-4">
              <p className="font-heading font-extrabold text-3xl text-[var(--text-primary)] tabular-nums">
                {savedIds.length}
              </p>
              <p className="text-xs text-[var(--text-muted)] mt-1 font-body">Bookmarked for consideration</p>
            </div>
          </BaseCard>
        </motion.div>

        <motion.div variants={staggerItem}>
          <BaseCard hover className="p-5 flex flex-col justify-between glass-card h-full">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--text-muted)] font-body">
                Active Applications
              </span>
              <div className="h-9 w-9 rounded-[var(--radius-md)] bg-[#EAF5F0] text-[var(--success)] flex items-center justify-center">
                <FileText className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-4">
              <p className="font-heading font-extrabold text-3xl text-[var(--text-primary)] tabular-nums">
                {activeApplicationsCount}
              </p>
              <p className="text-xs text-[var(--text-muted)] mt-1 font-body">Workflows currently in progress</p>
            </div>
          </BaseCard>
        </motion.div>

        <motion.div variants={staggerItem}>
          <BaseCard hover className="p-5 flex flex-col justify-between glass-card h-full">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--text-muted)] font-body">
                Upcoming Deadlines
              </span>
              <div className="h-9 w-9 rounded-[var(--radius-md)] bg-[#FDF5E8] text-[var(--warning)] flex items-center justify-center">
                <Clock className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-4">
              <p className="font-heading font-extrabold text-3xl text-[var(--text-primary)] tabular-nums">
                {upcomingDeadlinesList.length}
              </p>
              <p className="text-xs text-[var(--text-muted)] mt-1 font-body">Due within the next 60 days</p>
            </div>
          </BaseCard>
        </motion.div>

        <motion.div variants={staggerItem}>
          <BaseCard hover className="p-5 flex flex-col justify-between glass-card h-full">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--text-muted)] font-body">
                Potential Award Value
              </span>
              <div className="h-9 w-9 rounded-[var(--radius-md)] bg-[var(--peach-tint)] text-[var(--primary)] flex items-center justify-center">
                <DollarSign className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-4">
              <p className="font-heading font-extrabold text-3xl text-[var(--primary)] tabular-nums">
                {formatCurrency(totalPotentialFunding)}
              </p>
              <p className="text-xs text-[var(--text-muted)] mt-1 font-body">Total active pipeline value</p>
            </div>
          </BaseCard>
        </motion.div>
      </motion.div>

      {/* 3. Quick Actions Toolbar */}
      <div className="p-4 rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] flex flex-wrap items-center justify-between gap-3">
        <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] font-sans">
          Quick Actions:
        </span>
        <div className="flex flex-wrap items-center gap-2">
          <Link to={ROUTES.EXPLORE}>
            <PrimaryButton size="sm" icon={Compass}>
              Explore Scholarships
            </PrimaryButton>
          </Link>
          <Link to={ROUTES.ELIGIBILITY}>
            <OutlineButton size="sm" icon={CheckCircle2}>
              Check Eligibility
            </OutlineButton>
          </Link>
          <Link to={ROUTES.APPLICATIONS}>
            <OutlineButton size="sm" icon={FileText}>
              View Applications
            </OutlineButton>
          </Link>
          <Link to={ROUTES.SAVED}>
            <OutlineButton size="sm" icon={Bookmark}>
              Saved Scholarships
            </OutlineButton>
          </Link>
        </div>
      </div>

      {/* 4. Scholar Milestones & Deadline Tracker (ORDI Inspired) */}
      <ScholarMilestonesWidget />

      {/* 5. Interactive Recharts Visualizations */}
      <ApplicationAnalytics />

      {/* 5. Recommended Scholarships & Upcoming Deadlines Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Recommended for Alexandria */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="heading-section text-xl text-[var(--text-primary)]">
                Recommended For Your Profile
              </h3>
              <p className="text-xs text-[var(--text-muted)]">
                Matched to {user.major} major with GPA {user.gpa}
              </p>
            </div>
            <Link to={ROUTES.EXPLORE} className="text-xs font-bold text-[var(--primary)] hover:underline flex items-center">
              View All <ArrowUpRight className="h-3.5 w-3.5 ml-1" />
            </Link>
          </div>

          <div className="space-y-4">
            {recommendedGrants.map((grant) => (
              <BaseCard key={grant.id} hover className="p-5">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <Badge variant="coral" size="sm">{grant.category}</Badge>
                      <span className="text-xs font-bold text-[var(--success)] flex items-center gap-1">
                        <Sparkles className="h-3 w-3" /> High Match
                      </span>
                    </div>

                    <h4 className="heading-card text-base text-[var(--text-primary)] mt-1.5">
                      {grant.title}
                    </h4>
                    <p className="text-xs text-[var(--text-muted)]">{grant.provider}</p>

                    {/* Recommendation reason tag */}
                    <div className="mt-3 p-2.5 rounded-[var(--radius-sm)] bg-[var(--surface-secondary)]/50 text-[11px] text-[var(--text-secondary)] border border-[var(--border)] leading-relaxed">
                      💡 <strong>Why recommended:</strong> {grant.recommendationReason}
                    </div>
                  </div>

                  <div className="sm:text-right shrink-0 mt-2 sm:mt-0 flex sm:flex-col justify-between items-center sm:items-end">
                    <span className="font-heading font-extrabold text-xl text-[var(--primary)] tabular-nums">
                      {formatCurrency(grant.awardAmount)}
                    </span>
                    <Link to={ROUTES.SCHOLARSHIP_DETAIL(grant.id)} className="mt-2">
                      <OutlineButton size="sm">
                        View Details
                      </OutlineButton>
                    </Link>
                  </div>
                </div>
              </BaseCard>
            ))}
          </div>
        </div>

        {/* Right Column: Upcoming Deadlines */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="heading-section text-xl text-[var(--text-primary)]">
                Upcoming Deadlines
              </h3>
              <p className="text-xs text-[var(--text-muted)]">Chronological submission windows</p>
            </div>
            <Link to={ROUTES.DEADLINES} className="text-xs font-bold text-[var(--primary)] hover:underline flex items-center">
              Open Calendar <ArrowUpRight className="h-3.5 w-3.5 ml-1" />
            </Link>
          </div>

          <BaseCard className="p-5 space-y-4">
            {upcomingDeadlinesList.map((item) => {
              const deadline = getDaysRemaining(item.deadline);

              return (
                <div
                  key={item.id}
                  className="flex items-center justify-between pb-3.5 border-b border-[var(--border)] last:border-b-0 last:pb-0"
                >
                  <div className="space-y-1">
                    <h5 className="font-heading font-semibold text-xs text-[var(--text-primary)] line-clamp-1">
                      {item.title}
                    </h5>
                    <div className="flex items-center gap-2 text-[11px] text-[var(--text-muted)]">
                      <Calendar className="h-3 w-3" />
                      <span>{formatDate(item.deadline)}</span>
                      <Badge variant={deadline.isUrgent ? 'danger' : 'coral'} size="sm">
                        {deadline.label}
                      </Badge>
                    </div>
                  </div>

                  <Link to={ROUTES.SCHOLARSHIP_DETAIL(item.id)} className="shrink-0 pl-3">
                    <OutlineButton size="sm" className="!px-2.5 !py-1 text-xs">
                      View
                    </OutlineButton>
                  </Link>
                </div>
              );
            })}
          </BaseCard>
        </div>
      </div>
    </FadeIn>
  </AmbientBackground>
  );
};

export default DashboardPage;
