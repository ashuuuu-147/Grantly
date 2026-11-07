import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import {
  GraduationCap,
  Menu,
  X,
  Compass,
  LayoutDashboard,
  CheckCircle,
  FileText,
  Bookmark,
  Calendar,
  Sparkles,
  Search,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ROUTES } from '../../utils/constants';

export const Navbar = () => {
  const { user, savedIds, applications } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Explore', path: ROUTES.EXPLORE, icon: Compass },
    { label: 'Eligibility', path: ROUTES.ELIGIBILITY, icon: CheckCircle },
    { label: 'Dashboard', path: ROUTES.DASHBOARD, icon: LayoutDashboard },
    { label: 'Applications', path: ROUTES.APPLICATIONS, icon: FileText, badge: applications.length },
    { label: 'Deadlines', path: ROUTES.DEADLINES, icon: Calendar },
  ];

  return (
    <header className="sticky top-0 z-40 w-full glass-navbar transition-all duration-200">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-md)] bg-[var(--primary)] text-white shadow-[0_4px_14px_rgba(219,105,92,0.3)] transition-transform group-hover:scale-105">
            <GraduationCap className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-heading text-xl font-extrabold tracking-tight text-[var(--text-primary)]">
              GRANTLY<span className="text-[var(--coral)]">.</span>
            </span>
            <span className="text-[10px] -mt-1 font-bold uppercase tracking-widest text-[var(--text-muted)]">
              Scholarship Intel
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-1.5 px-3.5 py-2 font-body text-[14px] lg:text-[15px] rounded-[var(--radius-md)] transition-colors ${
                  isActive
                    ? 'bg-[var(--peach-tint)] text-[var(--primary)] font-semibold'
                    : 'text-[var(--text-secondary)] font-medium hover:text-[var(--text-primary)] hover:bg-[var(--surface-secondary)]/50'
                }`
              }
            >
              <span>{item.label}</span>
              {item.badge !== undefined && (
                <span className="ml-0.5 px-1.5 py-0.2 rounded-full text-[11px] font-bold bg-[var(--surface-secondary)] text-[var(--primary)] tabular-nums">
                  {item.badge}
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Right side utilities: Quick Search, Saved icon, Theme toggle & User Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            to={ROUTES.EXPLORE}
            title="Search Scholarships"
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-full bg-[var(--peach-tint)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border)] hover:border-[var(--coral)] transition-colors"
          >
            <Search className="h-3.5 w-3.5 text-[var(--coral)]" />
            <span>Search grants...</span>
            <kbd className="hidden lg:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-[var(--surface)] text-[var(--text-muted)] rounded border border-[var(--border)]">
              ⌘K
            </kbd>
          </Link>

          <Link
            to={ROUTES.SAVED}
            title="Saved Scholarships"
            className="relative p-2 rounded-[var(--radius-md)] text-[var(--text-secondary)] hover:text-[var(--primary)] hover:bg-[var(--peach-tint)] transition-colors"
          >
            <Bookmark className="h-5 w-5" />
            {savedIds.length > 0 && (
              <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[var(--primary)] text-[10px] font-bold text-white">
                {savedIds.length}
              </span>
            )}
          </Link>

          <Link
            to={ROUTES.PROFILE}
            className="flex items-center gap-2 pl-2 border-l border-[var(--border)]"
          >
            <img
              src={user.avatar}
              alt={user.name}
              className="h-8 w-8 rounded-full object-cover ring-2 ring-[var(--coral)]/40"
            />
            <span className="hidden lg:block text-xs font-semibold text-[var(--text-primary)]">
              {user.name.split(' ')[0]}
            </span>
          </Link>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-[var(--radius-md)] text-[var(--text-secondary)] hover:bg-[var(--surface-secondary)]"
            aria-label="Open mobile menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-navbar border-b border-[var(--border)] px-4 py-4">
          <nav className="flex flex-col gap-1">
            {navLinks.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-3.5 py-2.5 font-body text-[15px] rounded-[var(--radius-md)] transition-colors ${
                      isActive
                        ? 'bg-[var(--peach-tint)] text-[var(--primary)] font-semibold'
                        : 'text-[var(--text-secondary)] font-medium hover:bg-[var(--surface-secondary)]'
                    }`
                  }
                >
                  <div className="flex items-center gap-3">
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== undefined && (
                    <Badge variant="coral" size="sm">{item.badge}</Badge>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
