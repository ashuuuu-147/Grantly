import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Search,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Award,
  CheckCircle2,
  Bookmark,
  BookmarkCheck,
  Calendar,
  GraduationCap,
  Users,
} from 'lucide-react';
import {
  PrimaryButton,
  OutlineButton,
  BaseCard,
  Badge,
} from '../ui';
import { useApp } from '../../context/AppContext';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { ROUTES, SCHOLARSHIP_TYPES } from '../../utils/constants';
import { fadeUp, fadeIn, scaleIn } from '../animations/variants';

export const HeroSection = () => {
  const navigate = useNavigate();
  const { scholarships, isScholarshipSaved, toggleSaveScholarship, setSearchQuery, setSelectedCategory } = useApp();
  const [localQuery, setLocalQuery] = useState('');

  // Top featured grant for the hero interactive card
  const heroGrant = scholarships[0] || {
    id: 'sch-101',
    title: 'Global Turing Excellence Fellowship in AI & Computing',
    provider: 'International Institute of Technology',
    amount: 50000,
    deadline: '2026-12-15',
    category: 'STEM & Research',
    matchScore: 98,
    gpaRequirement: 3.7,
  };

  const isSaved = isScholarshipSaved(heroGrant.id);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (setSearchQuery) setSearchQuery(localQuery);
    navigate(`${ROUTES.EXPLORE}${localQuery ? `?search=${encodeURIComponent(localQuery)}` : ''}`);
  };

  const handleCategoryClick = (category) => {
    if (setSelectedCategory) setSelectedCategory(category);
    navigate(ROUTES.EXPLORE);
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-16 sm:pt-14 sm:pb-24 border-b border-[var(--border)]">
      {/* Subtle ambient peach glow backdrop */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[500px] w-[900px] rounded-full bg-[var(--surface-secondary)]/40 blur-3xl -z-10"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Core Value & Search */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 space-y-6 text-center lg:text-left"
          >
            {/* Tagline Eyebrow */}
            <div className="inline-flex items-center gap-2">
              <Badge variant="coral" size="lg" dot>
                <Sparkles className="h-3.5 w-3.5 mr-1" /> Rethinking the Scholarship Experience
              </Badge>
            </div>

            {/* Main Headline */}
            <h1 className="heading-display text-[var(--text-primary)]">
              Scholarships,{' '}
              <span className="text-[var(--primary)] underline decoration-[var(--coral)]/40 underline-offset-8">
                without
              </span>{' '}
              the guesswork.
            </h1>

            {/* Subtitle */}
            <p className="text-body text-[var(--text-secondary)] text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Curated grants, real criteria rubrics, and automated probability scores. Stop scrolling through expired lists—discover funding matched precisely to your academic profile.
            </p>

            {/* Interactive Hero Search Form */}
            <form
              onSubmit={handleSearchSubmit}
              className="mt-6 flex flex-col sm:flex-row items-center gap-2 p-2 rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] grantly-card-shadow max-w-xl mx-auto lg:mx-0"
            >
              <div className="relative flex-1 w-full flex items-center pl-3">
                <Search className="h-5 w-5 text-[var(--text-muted)] shrink-0" />
                <input
                  type="text"
                  value={localQuery}
                  onChange={(e) => setLocalQuery(e.target.value)}
                  placeholder="Search grants, majors (e.g. AI, Bio, Law)..."
                  className="w-full bg-transparent px-3 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none"
                />
              </div>
              <PrimaryButton type="submit" size="md" className="w-full sm:w-auto shrink-0">
                Find Scholarships <ArrowRight className="h-4 w-4 ml-1" />
              </PrimaryButton>
            </form>

            {/* Quick Category Filter Pills */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-1 text-xs">
              <span className="text-[var(--text-muted)] font-medium">Popular:</span>
              {['STEM & Research', 'Merit-Based', 'Women in Tech', 'Need-Based'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryClick(cat)}
                  className="px-2.5 py-1 rounded-[var(--radius-pill)] bg-[var(--surface-secondary)]/60 text-[var(--text-secondary)] hover:text-[var(--primary)] hover:bg-[var(--peach-tint)] transition-colors cursor-pointer font-medium"
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Trust and Verification Badges */}
            <div className="pt-6 border-t border-[var(--border)] flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-[var(--text-secondary)]">
              <div className="flex items-center gap-1.5 font-medium">
                <ShieldCheck className="h-4 w-4 text-[var(--success)]" />
                <span>100% Vetted Providers</span>
              </div>
              <div className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="h-4 w-4 text-[var(--coral)]" />
                <span>Zero Application Fees</span>
              </div>
              <div className="flex items-center gap-1.5 font-medium">
                <Award className="h-4 w-4 text-[var(--gold)]" />
                <span>Transparent GPA Rules</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Live Interactive Grant Preview Card */}
          <motion.div
            variants={scaleIn}
            initial="hidden"
            animate="visible"
            className="lg:col-span-5 relative"
          >
            {/* Ambient card accent frame */}
            <div className="absolute -inset-2 rounded-[28px] bg-gradient-to-br from-[var(--coral)]/20 via-[var(--peach-tint)] to-[var(--gold)]/20 blur-xl opacity-60 -z-10" />

            <BaseCard className="relative p-6 sm:p-7 grantly-card-shadow border-2 border-[var(--border)] bg-[var(--surface)] space-y-5">
              {/* Card top banner */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="flex h-2.5 w-2.5 rounded-full bg-[var(--success)] animate-pulse" />
                  <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] font-sans">
                    Live Verified Grant
                  </span>
                </div>
                <button
                  onClick={() => toggleSaveScholarship(heroGrant.id)}
                  className="p-2 rounded-[var(--radius-sm)] text-[var(--text-muted)] hover:text-[var(--primary)] hover:bg-[var(--peach-tint)] transition-colors cursor-pointer"
                  title={isSaved ? 'Remove from saved' : 'Save scholarship'}
                >
                  {isSaved ? (
                    <BookmarkCheck className="h-5 w-5 text-[var(--primary)] fill-[var(--primary)]" />
                  ) : (
                    <Bookmark className="h-5 w-5" />
                  )}
                </button>
              </div>

              {/* Title & Provider */}
              <div>
                <Badge variant="coral" size="sm">
                  {heroGrant.category}
                </Badge>
                <h3 className="heading-card text-lg text-[var(--text-primary)] mt-2">
                  {heroGrant.title}
                </h3>
                <p className="text-xs text-[var(--text-secondary)] mt-0.5">{heroGrant.provider}</p>
              </div>

              {/* Funding Amount & Match score pill */}
              <div className="p-4 rounded-[var(--radius-md)] bg-[var(--surface-secondary)]/40 border border-[var(--border)] flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                    Total Award
                  </span>
                  <p className="text-2xl font-extrabold text-[var(--text-primary)] leading-tight">
                    {formatCurrency(heroGrant.amount)}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                    Your Match
                  </span>
                  <div className="flex items-center gap-1 text-[var(--success)] font-extrabold text-lg justify-end">
                    <span>{heroGrant.matchScore}%</span>
                    <Award className="h-4 w-4" />
                  </div>
                </div>
              </div>

              {/* Requirements & Deadline preview */}
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between text-[var(--text-secondary)]">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5 text-[var(--text-muted)]" />
                    Due {formatDate(heroGrant.deadline)}
                  </span>
                  <Badge variant="warning" size="sm">
                    Closing Soon
                  </Badge>
                </div>

                <div className="flex items-center justify-between text-[var(--text-secondary)]">
                  <span className="flex items-center gap-1.5">
                    <GraduationCap className="h-3.5 w-3.5 text-[var(--text-muted)]" />
                    Min GPA: <strong>{heroGrant.gpaRequirement}+</strong>
                  </span>
                  <span className="text-[var(--success)] font-semibold flex items-center gap-1">
                    <CheckCircle2 className="h-3.5 w-3.5" /> Criteria Met
                  </span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="pt-2 flex items-center gap-3">
                <Link to={ROUTES.SCHOLARSHIP_DETAIL(heroGrant.id)} className="flex-1">
                  <PrimaryButton size="md" className="w-full">
                    Inspect Grant Details
                  </PrimaryButton>
                </Link>
                <Link to={ROUTES.ELIGIBILITY}>
                  <OutlineButton size="md">
                    Check Match
                  </OutlineButton>
                </Link>
              </div>
            </BaseCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

