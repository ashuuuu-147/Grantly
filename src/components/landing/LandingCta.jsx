import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Compass, CheckCircle2, Sparkles, ArrowRight } from 'lucide-react';
import { PrimaryButton, OutlineButton } from '../ui';
import { ROUTES } from '../../utils/constants';

export const LandingCta = () => {
  return (
    <section className="py-20 sm:py-24 relative overflow-hidden bg-[var(--background)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-[var(--radius-xl)] bg-gradient-to-br from-[var(--surface-secondary)] via-[var(--peach-tint)] to-[var(--surface-secondary)] border-2 border-[var(--coral)]/30 p-8 sm:p-14 text-center space-y-6 shadow-[var(--shadow-hover)] overflow-hidden">
          {/* Subtle background circles */}
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-[var(--coral)]/10 blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 rounded-full bg-[var(--gold)]/15 blur-2xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--surface)] text-xs font-bold text-[var(--primary)] border border-[var(--border)]">
              <Sparkles className="h-3.5 w-3.5" /> Start Your Scholarship Journey Today
            </span>

            <h2 className="heading-display text-3xl sm:text-4xl text-[var(--text-primary)]">
              Ready to fund your academic aspirations?
            </h2>

            <p className="text-body text-[var(--text-secondary)] text-sm sm:text-base">
              Join thousands of scholars using GRANTLY to find high-probability opportunities, verify criteria, and organize their applications without the stress.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-3">
              <Link to={ROUTES.EXPLORE}>
                <PrimaryButton size="lg" icon={Compass}>
                  Explore Scholarships Now <ArrowRight className="h-4 w-4 ml-1" />
                </PrimaryButton>
              </Link>
              <Link to={ROUTES.ELIGIBILITY}>
                <OutlineButton size="lg" icon={CheckCircle2}>
                  Test Your Eligibility
                </OutlineButton>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingCta;

