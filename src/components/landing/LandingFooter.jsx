import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, ShieldCheck, Mail, MapPin, Sparkles, Heart } from 'lucide-react';
import { ROUTES } from '../../utils/constants';

export const LandingFooter = () => {
  return (
    <footer className="bg-[var(--surface)] border-t border-[var(--border)] pt-16 pb-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Col 1 & 2: Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-md)] bg-[var(--primary)] text-white shadow-[0_4px_14px_rgba(219,105,92,0.3)]">
                <GraduationCap className="h-5 w-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-heading text-xl font-extrabold tracking-tight text-[var(--text-primary)]">
                  GRANTLY<span className="text-[var(--coral)]">.</span>
                </span>
                <span className="text-[10px] -mt-1 font-bold uppercase tracking-widest text-[var(--text-muted)]">
                  Rethinking the Scholarship Experience
                </span>
              </div>
            </Link>

            <p className="text-xs text-[var(--text-secondary)] leading-relaxed max-w-sm">
              GRANTLY is an education-fintech intelligence platform dedicated to empowering scholars worldwide with audited grant directories, algorithmic criteria scoring, and deadline tracking.
            </p>

            <div className="flex items-center gap-4 text-xs text-[var(--text-muted)] pt-2">
              <span className="flex items-center gap-1.5">
                <Mail className="h-3.5 w-3.5 text-[var(--coral)]" /> demo@grantly.education
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-[var(--coral)]" /> Global Scholar Network
              </span>
            </div>
          </div>

          {/* Col 3: Discovery */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-primary)] font-sans">
              Scholarships
            </h4>
            <ul className="space-y-2 text-xs text-[var(--text-secondary)]">
              <li>
                <Link to={ROUTES.EXPLORE} className="hover:text-[var(--primary)] transition-colors">
                  Explore Catalog
                </Link>
              </li>
              <li>
                <Link to={ROUTES.ELIGIBILITY} className="hover:text-[var(--primary)] transition-colors">
                  Smart Match Engine
                </Link>
              </li>
              <li>
                <Link to={ROUTES.SAVED} className="hover:text-[var(--primary)] transition-colors">
                  Bookmarked Grants
                </Link>
              </li>
              <li>
                <Link to={ROUTES.DEADLINES} className="hover:text-[var(--primary)] transition-colors">
                  Upcoming Deadlines
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Scholar Workspace */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-primary)] font-sans">
              Scholar Workspace
            </h4>
            <ul className="space-y-2 text-xs text-[var(--text-secondary)]">
              <li>
                <Link to={ROUTES.DASHBOARD} className="hover:text-[var(--primary)] transition-colors">
                  Student Dashboard
                </Link>
              </li>
              <li>
                <Link to={ROUTES.APPLICATIONS} className="hover:text-[var(--primary)] transition-colors">
                  Application Tracker
                </Link>
              </li>
              <li>
                <Link to={ROUTES.PROFILE} className="hover:text-[var(--primary)] transition-colors">
                  Scholar Profile
                </Link>
              </li>
              <li>
                <Link to={ROUTES.SETTINGS} className="hover:text-[var(--primary)] transition-colors">
                  Platform Settings
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Platform Specs */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-primary)] font-sans">
              Developer Info
            </h4>
            <ul className="space-y-2 text-xs text-[var(--text-secondary)]">
              <li>
                <Link to="/design-system" className="hover:text-[var(--primary)] transition-colors">
                  Design System Spec
                </Link>
              </li>
              <li>
                <span className="text-[var(--text-muted)]">100% Frontend Only</span>
              </li>
              <li>
                <span className="text-[var(--text-muted)]">Zero External APIs</span>
              </li>
              <li>
                <span className="text-[var(--text-muted)]">Local HTML5 Storage</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Official Disclaimer Box */}
        <div className="p-4 rounded-[var(--radius-md)] bg-[var(--surface-secondary)]/50 border border-[var(--border)] text-xs text-[var(--text-secondary)] leading-relaxed space-y-1">
          <p className="font-semibold text-[var(--text-primary)] flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-[var(--primary)] shrink-0" />
            Official Educational Disclaimer
          </p>
          <p>
            Scholarship opportunities, amounts, and eligibility requirements displayed on GRANTLY are demonstration sample records created for hackathon product testing. Always verify official application rules, deadlines, and submission materials directly on the official provider website. GRANTLY does not guarantee scholarship conferrals or financial disbursements.
          </p>
        </div>

        {/* Bottom Copyright Strip */}
        <div className="pt-6 border-t border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--text-muted)]">
          <p>
            &copy; {new Date().getFullYear()} GRANTLY Inc. All rights reserved. Built with Peach + Coral Design System.
          </p>
          <div className="flex items-center gap-1 text-[var(--text-secondary)]">
            <span>Crafted for Global Scholars with</span>
            <Heart className="h-3.5 w-3.5 text-[var(--coral)] fill-[var(--coral)]" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default LandingFooter;

