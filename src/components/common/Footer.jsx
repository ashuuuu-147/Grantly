import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap } from 'lucide-react';
import { ROUTES } from '../../utils/constants';

export const Footer = () => {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--surface)]/80 mt-auto">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-[var(--radius-sm)] bg-[var(--primary)] text-white">
              <GraduationCap className="h-4 w-4" />
            </div>
            <span className="font-heading text-base font-bold text-[var(--text-primary)]">GRANTLY</span>
            <span className="text-xs text-[var(--text-muted)]">
              — Rethinking the Scholarship Experience.
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs text-[var(--text-secondary)]">
            <Link to={ROUTES.EXPLORE} className="hover:text-[var(--primary)] transition-colors">
              Explore
            </Link>
            <Link to={ROUTES.ELIGIBILITY} className="hover:text-[var(--primary)] transition-colors">
              Eligibility
            </Link>
            <Link to={ROUTES.DASHBOARD} className="hover:text-[var(--primary)] transition-colors">
              Dashboard
            </Link>
            <Link to="/design-system" className="text-[var(--primary)] font-semibold hover:underline">
              Design System Spec
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
