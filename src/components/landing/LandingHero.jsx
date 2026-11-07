import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import {
  Compass,
  CheckCircle2,
  Sparkles,
  Award,
  Calendar,
  Clock,
  ArrowRight,
  Play,
  Search,
  TrendingUp,
  FileText,
  Bookmark,
  ShieldCheck,
  ChevronRight,
  GraduationCap,
} from 'lucide-react';
import { ROUTES } from '../../utils/constants';
import AmbientBackground from '../common/AmbientBackground';

export const LandingHero = () => {
  const [activeTab, setActiveTab] = useState('monthly');
  const heroRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const yBadgeLeft = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [0, 0] : [0, -32]);
  const yBadgeRight = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [0, 0] : [0, 24]);
  const yAppWindow = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [0, 0] : [0, 16]);

  const headlineWords = ['Effortlessly', 'Discover', 'and', 'Secure', 'Your', 'Scholarships'];

  return (
    <div ref={heroRef}>
      <AmbientBackground variant="hero" className="pt-24 pb-20 sm:pt-32 sm:pb-28 border-b border-[var(--border)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        {/* TOP SOCIAL PROOF BADGE */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full glass-floating shadow-xs mb-6 cursor-default"
        >
          {/* Avatar stack */}
          <div className="flex -space-x-2 overflow-hidden">
            <img
              className="inline-block h-6 w-6 rounded-full ring-2 ring-[var(--surface)] object-cover"
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=96&h=96&fit=crop&crop=faces"
              alt="Scholar"
            />
            <img
              className="inline-block h-6 w-6 rounded-full ring-2 ring-[var(--surface)] object-cover"
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=96&h=96&fit=crop&crop=faces"
              alt="Scholar"
            />
            <img
              className="inline-block h-6 w-6 rounded-full ring-2 ring-[var(--surface)] object-cover"
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=96&h=96&fit=crop&crop=faces"
              alt="Scholar"
            />
          </div>

          {/* Gold Star rating */}
          <div className="flex items-center gap-0.5 text-[var(--gold)] text-xs font-bold">
            <span>★</span>
            <span>★</span>
            <span>★</span>
            <span>★</span>
            <span>★</span>
          </div>

          <span className="text-xs font-bold text-[var(--text-primary)]">
            5.0 <span className="text-[var(--text-secondary)] font-medium">(12,000+ Scholars)</span>
          </span>
        </motion.div>

        {/* 2. MAIN HEADLINE WITH WORD-BY-WORD BLUR-TO-CLEAR REVEAL */}
        <h1 className="heading-hero text-[var(--text-primary)] max-w-4xl mx-auto">
          {headlineWords.map((word, idx) => (
            <motion.span
              key={idx}
              initial={{ opacity: 0, filter: 'blur(8px)', y: 12 }}
              animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
              transition={{
                duration: 0.45,
                delay: 0.08 + idx * 0.09,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={`inline-block mr-2.5 sm:mr-3 ${
                word === 'Secure' || word === 'Your' || word === 'Scholarships'
                  ? 'text-[var(--primary)]'
                  : ''
              } ${word === 'and' ? 'block sm:inline' : ''}`}
            >
              {word}
            </motion.span>
          ))}
        </h1>

        {/* 3. SUPPORTING COPY */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-5 font-body text-[15px] sm:text-[16px] md:text-[17px] text-[var(--text-secondary)] max-w-2xl mx-auto leading-[1.65]"
        >
          Discover matching opportunities, understand your eligibility in seconds, and manage your applications—all in one smart platform with real-time tracking.
        </motion.p>

        {/* 4. DUAL CTAS (Coral Primary + Dark Demo Pill) */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <Link to={ROUTES.EXPLORE}>
            <button className="px-7 py-3.5 rounded-full bg-[var(--primary)] hover:bg-[var(--coral)] text-white font-semibold text-sm shadow-[0_8px_24px_rgba(219,105,92,0.35)] transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer flex items-center gap-2">
              Get Started Free <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
          <Link to={ROUTES.DASHBOARD}>
            <button className="px-6 py-3.5 rounded-full bg-[#211B1B] hover:bg-[#382A29] text-white font-semibold text-sm transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer flex items-center gap-2.5 shadow-sm">
              <Play className="w-4 h-4 fill-current text-[var(--coral)]" />
              View Live Demo
            </button>
          </Link>
        </motion.div>

        {/* 5. CENTERPIECE DESKTOP APP PREVIEW (Matching Cashly & iMac Mockup) */}
        <div className="relative mt-14 sm:mt-18 max-w-5xl mx-auto">
          {/* Floating Widget Left: Verified 98% Match */}
          <motion.div
            style={{ y: yBadgeLeft }}
            className="absolute -top-7 -left-3 sm:-left-6 z-20 p-3.5 rounded-[var(--radius-lg)] glass-floating shadow-[var(--shadow-hover)] hidden md:flex items-center gap-3 text-left"
          >
            <div className="w-9 h-9 rounded-full bg-[#EAF5F0] text-[var(--success)] flex items-center justify-center font-bold shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-[var(--text-primary)]">98% Match Score</p>
              <p className="text-[11px] text-[var(--text-muted)] font-medium">Turing AI Fellowship</p>
            </div>
          </motion.div>

          {/* Floating Widget Right: Deadline Alert */}
          <motion.div
            style={{ y: yBadgeRight }}
            className="absolute -top-5 -right-3 sm:-right-6 z-20 p-3.5 rounded-[var(--radius-lg)] glass-floating shadow-[var(--shadow-hover)] hidden md:flex items-center gap-3 text-left"
          >
            <div className="w-9 h-9 rounded-full bg-[var(--peach-tint)] text-[var(--primary)] flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5 text-[var(--danger)]" />
            </div>
            <div>
              <p className="text-xs font-bold text-[var(--danger)]">12 Days Remaining</p>
              <p className="text-[11px] text-[var(--text-muted)] font-medium">$50,000 Award Deadline</p>
            </div>
          </motion.div>

          {/* Main App Window Shell */}
          <motion.div
            style={{ y: yAppWindow }}
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative rounded-2xl sm:rounded-3xl border-2 border-[var(--border)] glass-card shadow-[0_25px_60px_-15px_rgba(73,55,53,0.12)] overflow-hidden text-left"
          >
            {/* Top Window Bar (Chrome) */}
            <div className="px-4 sm:px-6 py-3.5 border-b border-[var(--border)] glass-navbar flex items-center justify-between gap-4">
              {/* Window Dots */}
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#EF4444]/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-[#F59E0B]/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-[#10B981]/80 inline-block" />
                <span className="hidden sm:inline-block ml-3 font-heading font-extrabold text-xs text-[var(--text-primary)] tracking-wide">
                  GRANTLY<span className="text-[var(--coral)]">.</span> Workspace
                </span>
              </div>

              {/* Mock Search input */}
              <div className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--surface)] border border-[var(--border)] text-xs text-[var(--text-muted)] w-72">
                <Search className="w-3.5 h-3.5 text-[var(--coral)]" />
                <span>Search scholarships, STEM, merit...</span>
              </div>

              {/* Scholar Profile */}
              <div className="flex items-center gap-2.5">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=96&h=96&fit=crop&crop=faces"
                  alt="Alexandria Chen"
                  className="w-7 h-7 rounded-full object-cover ring-2 ring-[var(--coral)]"
                />
                <div className="hidden sm:block text-right">
                  <p className="text-xs font-bold text-[var(--text-primary)] leading-none">Alexandria Chen</p>
                  <p className="text-[10px] text-[var(--text-muted)] font-medium mt-0.5">Stanford Senior</p>
                </div>
              </div>
            </div>

            {/* Application Dashboard Body */}
            <div className="p-4 sm:p-6 lg:p-7 space-y-6 bg-[var(--surface)]">
              {/* Row of 4 Metric Stat Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                {/* 1. Total Funding */}
                <div className="p-4 rounded-xl bg-[var(--peach-tint)]/50 border border-[var(--border)]">
                  <span className="block text-[11px] font-semibold uppercase tracking-wider text-[var(--text-muted)] font-body">
                    Total Funding Pipeline
                  </span>
                  <div className="mt-1 flex items-baseline justify-between">
                    <span className="font-heading font-extrabold text-xl sm:text-2xl text-[var(--text-primary)] tabular-nums">
                      $145,000
                    </span>
                    <span className="text-[11px] font-bold text-[var(--success)] flex items-center gap-0.5 tabular-nums">
                      <TrendingUp className="w-3 h-3" /> +18.4%
                    </span>
                  </div>
                </div>

                {/* 2. Active Applications */}
                <div className="p-4 rounded-xl bg-[var(--peach-tint)]/50 border border-[var(--border)]">
                  <span className="block text-[11px] font-semibold uppercase tracking-wider text-[var(--text-muted)] font-body">
                    Active Applications
                  </span>
                  <div className="mt-1 flex items-baseline justify-between">
                    <span className="font-heading font-extrabold text-xl sm:text-2xl text-[var(--text-primary)] tabular-nums">
                      4 Active
                    </span>
                    <span className="text-[11px] font-bold text-[var(--primary)] bg-[var(--surface-secondary)] px-2 py-0.5 rounded-full">
                      2 In Progress
                    </span>
                  </div>
                </div>

                {/* 3. Average Match Fit */}
                <div className="p-4 rounded-xl bg-[var(--peach-tint)]/50 border border-[var(--border)]">
                  <span className="block text-[11px] font-semibold uppercase tracking-wider text-[var(--text-muted)] font-body">
                    Average Fit Score
                  </span>
                  <div className="mt-1 flex items-baseline justify-between">
                    <span className="font-heading font-extrabold text-xl sm:text-2xl text-[var(--primary)] tabular-nums">
                      96% Fit
                    </span>
                    <span className="text-[11px] font-bold text-[var(--gold)] flex items-center gap-0.5">
                      ★ Top Tier
                    </span>
                  </div>
                </div>

                {/* 4. Secured Funding */}
                <div className="p-4 rounded-xl bg-[var(--peach-tint)]/50 border border-[var(--border)]">
                  <span className="block text-[11px] font-semibold uppercase tracking-wider text-[var(--text-muted)] font-body">
                    Secured Funding
                  </span>
                  <div className="mt-1 flex items-baseline justify-between">
                    <span className="font-heading font-extrabold text-xl sm:text-2xl text-[var(--success)] tabular-nums">
                      $15,000
                    </span>
                    <span className="text-[11px] font-bold text-[var(--success)] flex items-center gap-0.5">
                      <CheckCircle2 className="w-3 h-3" /> Verified
                    </span>
                  </div>
                </div>
              </div>

              {/* Row of 3 Charts (Like Cashly: Area Chart, Bar Chart, Donut Chart) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                {/* 1. Left Chart: Funding Disbursed vs Applied (6 Cols) */}
                <div className="lg:col-span-6 p-5 rounded-xl border border-[var(--border)] bg-[var(--surface)]">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="font-heading font-bold text-sm text-[var(--text-primary)]">
                        Funding Pipeline & Disbursement
                      </h4>
                      <p className="text-[11px] text-[var(--text-muted)]">Projected vs confirmed award payouts</p>
                    </div>
                    <div className="flex items-center gap-3 text-xs">
                      <span className="flex items-center gap-1.5 text-[var(--success)] font-medium">
                        <span className="w-2.5 h-2.5 rounded-full bg-[var(--success)]" /> Confirmed
                      </span>
                      <span className="flex items-center gap-1.5 text-[var(--coral)] font-medium">
                        <span className="w-2.5 h-2.5 rounded-full bg-[var(--coral)]" /> Applied
                      </span>
                    </div>
                  </div>

                  {/* High fidelity SVG line/area chart */}
                  <div className="h-44 w-full relative">
                    <svg viewBox="0 0 500 160" className="w-full h-full overflow-visible">
                      <defs>
                        <linearGradient id="coralArea" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="var(--coral)" stopOpacity="0.25" />
                          <stop offset="100%" stopColor="var(--coral)" stopOpacity="0.0" />
                        </linearGradient>
                        <linearGradient id="greenArea" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="var(--success)" stopOpacity="0.2" />
                          <stop offset="100%" stopColor="var(--success)" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>

                      {/* Horizontal Grid lines */}
                      <line x1="0" y1="30" x2="500" y2="30" stroke="var(--border)" strokeDasharray="3 3" opacity="0.6" />
                      <line x1="0" y1="75" x2="500" y2="75" stroke="var(--border)" strokeDasharray="3 3" opacity="0.6" />
                      <line x1="0" y1="120" x2="500" y2="120" stroke="var(--border)" strokeDasharray="3 3" opacity="0.6" />

                      {/* Coral Line & Area (Applied: $145k) */}
                      <path
                        d="M 20 110 Q 90 95, 160 80 T 300 45 T 420 30 T 480 20 L 480 150 L 20 150 Z"
                        fill="url(#coralArea)"
                      />
                      <path
                        d="M 20 110 Q 90 95, 160 80 T 300 45 T 420 30 T 480 20"
                        fill="none"
                        stroke="var(--coral)"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />

                      {/* Green Line (Disbursed: $15k) */}
                      <path
                        d="M 20 135 Q 110 130, 200 120 T 340 100 T 480 85 L 480 150 L 20 150 Z"
                        fill="url(#greenArea)"
                      />
                      <path
                        d="M 20 135 Q 110 130, 200 120 T 340 100 T 480 85"
                        fill="none"
                        stroke="var(--success)"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />

                      {/* Data dots */}
                      <circle cx="300" cy="45" r="4.5" fill="var(--surface)" stroke="var(--coral)" strokeWidth="2.5" />
                      <circle cx="480" cy="20" r="4.5" fill="var(--coral)" />
                      <circle cx="480" cy="85" r="4" fill="var(--success)" />
                    </svg>

                    {/* Month labels */}
                    <div className="flex justify-between text-[10px] text-[var(--text-muted)] font-medium pt-2 border-t border-[var(--border)]">
                      <span>Jan</span>
                      <span>Feb</span>
                      <span>Mar</span>
                      <span>Apr</span>
                      <span>May</span>
                      <span>Jun</span>
                      <span>Jul</span>
                    </div>
                  </div>
                </div>

                {/* 2. Center Chart: Deadlines & Cash Flow (3 Cols) */}
                <div className="lg:col-span-3 p-5 rounded-xl border border-[var(--border)] bg-[var(--surface)]">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="font-heading font-bold text-sm text-[var(--text-primary)]">
                        Deadlines Cadence
                      </h4>
                      <p className="text-[11px] text-[var(--text-muted)]">Target awards timeline</p>
                    </div>
                    <span className="text-[10px] font-bold text-[var(--primary)] bg-[var(--peach-tint)] px-2 py-0.5 rounded-full">
                      2026
                    </span>
                  </div>

                  {/* Vertical bar chart with coral highlighted bar */}
                  <div className="h-44 flex items-end justify-between gap-2 pt-4 px-2">
                    <div className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                      <div className="w-full rounded-t-md bg-[var(--surface-secondary)] h-[40%]" />
                      <span className="text-[10px] text-[var(--text-muted)]">Sep</span>
                    </div>
                    <div className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                      <div className="w-full rounded-t-md bg-[var(--surface-secondary)] h-[60%]" />
                      <span className="text-[10px] text-[var(--text-muted)]">Oct</span>
                    </div>
                    {/* Active Month: Highlighted in rich coral */}
                    <div className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                      <div className="w-full rounded-t-md bg-[var(--coral)] h-[90%] shadow-[0_4px_12px_rgba(242,140,120,0.4)] relative">
                        <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[9px] font-extrabold text-[var(--primary)] bg-[var(--peach-tint)] px-1 rounded">
                          $50k
                        </span>
                      </div>
                      <span className="text-[10px] font-bold text-[var(--primary)]">Nov</span>
                    </div>
                    <div className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                      <div className="w-full rounded-t-md bg-[var(--surface-secondary)] h-[50%]" />
                      <span className="text-[10px] text-[var(--text-muted)]">Dec</span>
                    </div>
                    <div className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                      <div className="w-full rounded-t-md bg-[var(--surface-secondary)] h-[30%]" />
                      <span className="text-[10px] text-[var(--text-muted)]">Jan</span>
                    </div>
                  </div>
                </div>

                {/* 3. Right Chart: Spending & Application Breakdown Donut (3 Cols) */}
                <div className="lg:col-span-3 p-5 rounded-xl border border-[var(--border)] bg-[var(--surface)] flex flex-col justify-between">
                  <div>
                    <h4 className="font-heading font-bold text-sm text-[var(--text-primary)]">
                      Pipeline Breakdown
                    </h4>
                    <p className="text-[11px] text-[var(--text-muted)]">Current stage distribution</p>
                  </div>

                  {/* Donut graphic */}
                  <div className="relative my-2 flex items-center justify-center">
                    <svg className="w-32 h-32 transform -rotate-90">
                      {/* Base circle */}
                      <circle cx="64" cy="64" r="48" stroke="var(--border)" strokeWidth="12" fill="none" />
                      {/* Segment 1: In Progress (Coral) */}
                      <circle
                        cx="64"
                        cy="64"
                        r="48"
                        stroke="var(--coral)"
                        strokeWidth="12"
                        strokeDasharray="140 300"
                        strokeDashoffset="0"
                        strokeLinecap="round"
                        fill="none"
                      />
                      {/* Segment 2: Submitted (Gold) */}
                      <circle
                        cx="64"
                        cy="64"
                        r="48"
                        stroke="var(--gold)"
                        strokeWidth="12"
                        strokeDasharray="60 300"
                        strokeDashoffset="-150"
                        strokeLinecap="round"
                        fill="none"
                      />
                      {/* Segment 3: Approved (Green) */}
                      <circle
                        cx="64"
                        cy="64"
                        r="48"
                        stroke="var(--success)"
                        strokeWidth="12"
                        strokeDasharray="45 300"
                        strokeDashoffset="-220"
                        strokeLinecap="round"
                        fill="none"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                      <span className="font-heading font-extrabold text-base text-[var(--text-primary)]">100%</span>
                      <span className="text-[9px] uppercase tracking-wider text-[var(--text-muted)] font-bold">Tracked</span>
                    </div>
                  </div>

                  {/* Legend pills */}
                  <div className="grid grid-cols-2 gap-2 text-[10px] text-[var(--text-secondary)] font-medium pt-2 border-t border-[var(--border)]">
                    <span className="flex items-center gap-1.5 truncate">
                      <span className="w-2 h-2 rounded-full bg-[var(--coral)] shrink-0" /> In Progress (2)
                    </span>
                    <span className="flex items-center gap-1.5 truncate">
                      <span className="w-2 h-2 rounded-full bg-[var(--gold)] shrink-0" /> Submitted (1)
                    </span>
                    <span className="flex items-center gap-1.5 truncate">
                      <span className="w-2 h-2 rounded-full bg-[var(--success)] shrink-0" /> Approved (1)
                    </span>
                    <span className="flex items-center gap-1.5 truncate">
                      <span className="w-2 h-2 rounded-full bg-[var(--border)] shrink-0" /> Saved (4)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* 6. TRUSTED BY UNIVERSITY / PARTNER LOGO STRIP (Matching Cashly) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 pt-10 border-t border-[var(--border)] text-center"
        >
          <p className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-6">
            Trusted by Scholars & Students from Leading Global Institutions
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 opacity-70 hover:opacity-100 transition-opacity">
            <div className="flex items-center gap-2 font-heading font-extrabold text-lg text-[var(--text-primary)]">
              <GraduationCap className="w-5 h-5 text-[var(--coral)]" /> Stanford
            </div>
            <div className="flex items-center gap-2 font-heading font-extrabold text-lg text-[var(--text-primary)]">
              <span className="font-mono text-base text-[var(--primary)] font-bold">MIT</span> Tech
            </div>
            <div className="flex items-center gap-2 font-heading font-extrabold text-lg text-[var(--text-primary)]">
              <Award className="w-5 h-5 text-[var(--gold)]" /> Harvard
            </div>
            <div className="flex items-center gap-2 font-heading font-extrabold text-lg text-[var(--text-primary)]">
              Oxford Union
            </div>
            <div className="flex items-center gap-2 font-heading font-extrabold text-lg text-[var(--text-primary)]">
              UC Berkeley
            </div>
            <div className="flex items-center gap-2 font-heading font-extrabold text-lg text-[var(--text-primary)]">
              <Sparkles className="w-4 h-4 text-[var(--coral)]" /> Gates Millennium
            </div>
          </div>
        </motion.div>
      </div>
    </AmbientBackground>
    </div>
  );
};

export default LandingHero;
