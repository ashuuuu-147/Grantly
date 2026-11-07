import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  GraduationCap,
  Menu,
  X,
  Compass,
  Sparkles,
  ArrowRight,
  LogIn,
} from 'lucide-react';
import { PrimaryButton, OutlineButton, GhostButton, Badge } from '../ui';
import { ROUTES } from '../../utils/constants';
import SignInDemoModal from './SignInDemoModal';

export const LandingNavbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [signInOpen, setSignInOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('home');
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setActiveNav(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'glass-navbar'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
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

          {/* Desktop Navigation Links with animated indicator */}
          <nav className="hidden md:flex items-center gap-1 p-1 rounded-full bg-[var(--surface-secondary)]/40 border border-[var(--border)]/60">
            <button
              onClick={() => {
                setActiveNav('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`relative px-4 py-1.5 text-xs font-semibold rounded-full transition-colors cursor-pointer ${
                activeNav === 'home'
                  ? 'text-[var(--primary)] font-bold'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              {activeNav === 'home' && (
                <motion.div
                  layoutId="navPill"
                  className="absolute inset-0 rounded-full bg-[var(--surface)] shadow-xs"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10">Home</span>
            </button>

            <Link
              to={ROUTES.EXPLORE}
              onClick={() => setActiveNav('explore')}
              className={`relative px-4 py-1.5 text-xs font-semibold rounded-full transition-colors cursor-pointer ${
                activeNav === 'explore'
                  ? 'text-[var(--primary)] font-bold'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              <span className="relative z-10">Explore Scholarships</span>
            </Link>

            <button
              onClick={() => scrollToSection('how-it-works')}
              className={`relative px-4 py-1.5 text-xs font-semibold rounded-full transition-colors cursor-pointer ${
                activeNav === 'how-it-works'
                  ? 'text-[var(--primary)] font-bold'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              {activeNav === 'how-it-works' && (
                <motion.div
                  layoutId="navPill"
                  className="absolute inset-0 rounded-full bg-[var(--surface)] shadow-xs"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10">How It Works</span>
            </button>

            <button
              onClick={() => scrollToSection('benefits')}
              className={`relative px-4 py-1.5 text-xs font-semibold rounded-full transition-colors cursor-pointer ${
                activeNav === 'benefits'
                  ? 'text-[var(--primary)] font-bold'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              {activeNav === 'benefits' && (
                <motion.div
                  layoutId="navPill"
                  className="absolute inset-0 rounded-full bg-[var(--surface)] shadow-xs"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10">About</span>
            </button>
          </nav>

          {/* Right side CTAs: Sign in & Get Started */}
          <div className="hidden sm:flex items-center gap-3">
            <GhostButton size="sm" onClick={() => setSignInOpen(true)}>
              Sign In Demo
            </GhostButton>

            <Link to={ROUTES.EXPLORE}>
              <PrimaryButton size="sm">
                Get Started <ArrowRight className="h-3.5 w-3.5 ml-1" />
              </PrimaryButton>
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-[var(--radius-md)] text-[var(--text-secondary)] hover:bg-[var(--surface-secondary)]"
              aria-label="Open menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="sm:hidden border-b border-[var(--border)] bg-[var(--surface)] px-5 py-4 space-y-3"
            >
              <nav className="flex flex-col gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="flex items-center justify-between p-2 text-sm font-semibold text-[var(--text-primary)] text-left"
                >
                  Home
                </button>
                <Link
                  to={ROUTES.EXPLORE}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between p-2 text-sm font-semibold text-[var(--text-primary)]"
                >
                  Explore Scholarships
                </Link>
                <button
                  onClick={() => scrollToSection('how-it-works')}
                  className="flex items-center justify-between p-2 text-sm font-semibold text-[var(--text-primary)] text-left"
                >
                  How It Works
                </button>
                <button
                  onClick={() => scrollToSection('benefits')}
                  className="flex items-center justify-between p-2 text-sm font-semibold text-[var(--text-primary)] text-left"
                >
                  About & Benefits
                </button>
              </nav>

              <div className="pt-3 border-t border-[var(--border)] flex flex-col gap-2">
                <OutlineButton
                  size="sm"
                  className="w-full justify-center"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setSignInOpen(true);
                  }}
                >
                  Sign In Demo
                </OutlineButton>
                <Link to={ROUTES.EXPLORE} onClick={() => setMobileMenuOpen(false)}>
                  <PrimaryButton size="sm" className="w-full justify-center">
                    Get Started Free
                  </PrimaryButton>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Demo Sign In Dialog */}
      <SignInDemoModal isOpen={signInOpen} onClose={() => setSignInOpen(false)} />
    </>
  );
};

export default LandingNavbar;

