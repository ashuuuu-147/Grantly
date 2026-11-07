import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Sparkles,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  Award,
  Layers,
  FileCheck,
  Sliders,
  DollarSign,
} from 'lucide-react';
import { ROUTES } from '../../utils/constants';

export const LandingWorkflowShowcase = () => {
  return (
    <section className="py-20 sm:py-28 bg-[var(--surface-secondary)]/30 border-y border-[var(--border)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section 1: Smarter Ways to Fund Education */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--primary)] bg-[var(--peach-tint)] px-3.5 py-1.5 rounded-full border border-[var(--border)] font-body">
            Intelligence at Work
          </span>
          <h2 className="heading-section text-[var(--text-primary)] mt-4">
            Smarter Ways to Fund Your Education
          </h2>
          <p className="font-body text-[15px] sm:text-[16px] text-[var(--text-secondary)] mt-3 leading-[1.65]">
            Everything required to discover, verify eligibility, and gain full control over your scholarship pipeline through one simple and powerful platform.
          </p>
        </div>

        {/* 3 Visual Feature Cards (Matching Cashly's 3 preview widgets) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-24">
          {/* Card 1: Application Breakdown */}
          <div className="p-6 sm:p-7 rounded-2xl bg-[var(--surface)] border border-[var(--border)] shadow-xs hover:border-[var(--coral)] hover:shadow-[var(--shadow-hover)] transition-all">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
                Stage Distribution
              </span>
              <span className="text-xs font-bold text-[var(--success)] bg-[#EAF5F0] px-2 py-0.5 rounded-full">
                Real-Time
              </span>
            </div>
            <h3 className="font-heading font-bold text-lg text-[var(--text-primary)] mb-2">
              Application Tracker
            </h3>
            <p className="text-xs text-[var(--text-secondary)] mb-6 leading-relaxed">
              Track requirements from saved bookmarks to submitted files and verified awards with interactive checklists.
            </p>

            {/* Mini Donut graphic */}
            <div className="p-4 rounded-xl bg-[var(--peach-tint)]/40 border border-[var(--border)] flex items-center justify-around">
              <div className="relative flex items-center justify-center">
                <svg className="w-20 h-20 transform -rotate-90">
                  <circle cx="40" cy="40" r="30" stroke="var(--border)" strokeWidth="8" fill="none" />
                  <circle
                    cx="40"
                    cy="40"
                    r="30"
                    stroke="var(--coral)"
                    strokeWidth="8"
                    strokeDasharray="90 200"
                    strokeLinecap="round"
                    fill="none"
                  />
                  <circle
                    cx="40"
                    cy="40"
                    r="30"
                    stroke="var(--success)"
                    strokeWidth="8"
                    strokeDasharray="30 200"
                    strokeDashoffset="-100"
                    strokeLinecap="round"
                    fill="none"
                  />
                </svg>
                <span className="absolute font-heading font-extrabold text-xs text-[var(--text-primary)]">
                  8 Total
                </span>
              </div>
              <div className="space-y-1 text-[11px] text-[var(--text-secondary)] font-medium">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[var(--coral)]" /> 4 In Progress
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[var(--success)]" /> 1 Awarded
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[var(--border)]" /> 3 Saved
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Cash Flow & Deadlines */}
          <div className="p-6 sm:p-7 rounded-2xl bg-[var(--surface)] border border-[var(--border)] shadow-xs hover:border-[var(--coral)] hover:shadow-[var(--shadow-hover)] transition-all">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
                Financial Schedule
              </span>
              <span className="text-xs font-bold text-[var(--primary)] bg-[var(--peach-tint)] px-2 py-0.5 rounded-full">
                Calendar View
              </span>
            </div>
            <h3 className="font-heading font-bold text-lg text-[var(--text-primary)] mb-2">
              Deadline Planner
            </h3>
            <p className="text-xs text-[var(--text-secondary)] mb-6 leading-relaxed">
              Never miss a grant deadline with automated priority filters, urgency color badges, and monthly calendar overlays.
            </p>

            {/* Mini Bar graphic */}
            <div className="p-4 rounded-xl bg-[var(--peach-tint)]/40 border border-[var(--border)] flex items-end justify-between gap-2 h-28">
              <div className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                <div className="w-full rounded-t-sm bg-[var(--surface-secondary)] h-[35%]" />
                <span className="text-[10px] text-[var(--text-muted)]">Oct</span>
              </div>
              <div className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                <div className="w-full rounded-t-sm bg-[var(--coral)] h-[85%]" />
                <span className="text-[10px] font-bold text-[var(--primary)]">Nov</span>
              </div>
              <div className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                <div className="w-full rounded-t-sm bg-[var(--surface-secondary)] h-[55%]" />
                <span className="text-[10px] text-[var(--text-muted)]">Dec</span>
              </div>
              <div className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                <div className="w-full rounded-t-sm bg-[var(--surface-secondary)] h-[40%]" />
                <span className="text-[10px] text-[var(--text-muted)]">Jan</span>
              </div>
            </div>
          </div>

          {/* Card 3: Instant Eligibility Engine */}
          <div className="p-6 sm:p-7 rounded-2xl bg-[var(--surface)] border border-[var(--border)] shadow-xs hover:border-[var(--coral)] hover:shadow-[var(--shadow-hover)] transition-all">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
                Algorithmic Match
              </span>
              <span className="text-xs font-bold text-[var(--gold)] bg-[var(--surface-secondary)] px-2 py-0.5 rounded-full">
                98% Precision
              </span>
            </div>
            <h3 className="font-heading font-bold text-lg text-[var(--text-primary)] mb-2">
              Smart Eligibility Checker
            </h3>
            <p className="text-xs text-[var(--text-secondary)] mb-6 leading-relaxed">
              Calculates your marks, field of study, degree track, and income band against verified donor rubrics in seconds.
            </p>

            {/* Mini Checklist Graphic */}
            <div className="p-4 rounded-xl bg-[var(--peach-tint)]/40 border border-[var(--border)] space-y-2 text-xs">
              <div className="flex items-center justify-between text-[var(--text-primary)]">
                <span className="flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[var(--success)]" /> Minimum GPA 3.7+
                </span>
                <span className="text-[10px] font-bold text-[var(--success)]">Passed</span>
              </div>
              <div className="flex items-center justify-between text-[var(--text-primary)]">
                <span className="flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[var(--success)]" /> STEM / AI Track
                </span>
                <span className="text-[10px] font-bold text-[var(--success)]">Passed</span>
              </div>
              <div className="flex items-center justify-between text-[var(--text-primary)]">
                <span className="flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[var(--success)]" /> Income Ceiling
                </span>
                <span className="text-[10px] font-bold text-[var(--success)]">Verified</span>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Two-Column "Learn Why Thousands Trust Our Platform" (Matching Cashly) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Heading, description, CTA */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--primary)] font-mono">
              // Why Choose Us
            </span>
            <h2 className="heading-section text-[var(--text-primary)] leading-tight">
              Learn Why Thousands Trust Our Platform for Their Funding
            </h2>
            <p className="font-body text-[15px] sm:text-[16px] text-[var(--text-secondary)] leading-[1.65]">
              Traditional scholarship search engines are full of outdated listings and spam. GRANTLY filters every program by verified donor rubrics so you only invest time where you qualify.
            </p>

            <div className="pt-2">
              <Link to={ROUTES.EXPLORE}>
                <button className="px-6 py-3.5 rounded-full bg-[var(--primary)] hover:bg-[var(--coral)] text-white font-semibold text-sm shadow-[0_8px_20px_rgba(219,105,92,0.3)] transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer flex items-center gap-2">
                  Explore Opportunities Now <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </div>
          </div>

          {/* Right Column: Step cards 01 & 02 */}
          <div className="lg:col-span-7 space-y-5">
            {/* Step Card 01 */}
            <div className="p-6 sm:p-7 rounded-2xl bg-[var(--surface)] border border-[var(--border)] shadow-xs flex flex-col sm:flex-row items-start gap-5 hover:border-[var(--coral)] transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-[var(--peach-tint)] text-[var(--primary)] font-heading font-extrabold text-lg flex items-center justify-center shrink-0 border border-[var(--border)]">
                01
              </div>
              <div className="space-y-2 flex-1">
                <h3 className="font-heading font-bold text-lg text-[var(--text-primary)]">
                  Build Your Scholar Profile
                </h3>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                  Enter your academic credentials, discipline, institution, and background once. Your data is stored privately in your browser.
                </p>
                <div className="pt-2 flex flex-wrap items-center gap-2 text-xs">
                  <span className="px-2.5 py-1 rounded-full bg-[var(--peach-tint)] text-[var(--primary)] font-semibold">
                    Zero Fees
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-[var(--surface-secondary)] text-[var(--text-secondary)] font-medium">
                    100% Client-Side Privacy
                  </span>
                </div>
              </div>
            </div>

            {/* Step Card 02 */}
            <div className="p-6 sm:p-7 rounded-2xl bg-[var(--surface)] border border-[var(--border)] shadow-xs flex flex-col sm:flex-row items-start gap-5 hover:border-[var(--coral)] transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-[var(--peach-tint)] text-[var(--primary)] font-heading font-extrabold text-lg flex items-center justify-center shrink-0 border border-[var(--border)]">
                02
              </div>
              <div className="space-y-2 flex-1">
                <h3 className="font-heading font-bold text-lg text-[var(--text-primary)]">
                  Track & Organize Everything
                </h3>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                  Manage transcripts, faculty recommendation letters, personal statements, and submission milestones with step-by-step Kanban pipeline tracking.
                </p>
                <div className="pt-2 flex flex-wrap items-center gap-2 text-xs">
                  <span className="px-2.5 py-1 rounded-full bg-[#EAF5F0] text-[var(--success)] font-semibold">
                    Interactive Checklists
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-[var(--surface-secondary)] text-[var(--text-secondary)] font-medium">
                    Countdown Alarms
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingWorkflowShowcase;

