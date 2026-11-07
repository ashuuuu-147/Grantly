import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles,
  Search,
  Bookmark,
  Award,
  DollarSign,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Calendar,
  Layers,
  ArrowRight,
  Eye,
  Sliders,
} from 'lucide-react';
import {
  Button,
  PrimaryButton,
  SecondaryButton,
  OutlineButton,
  GhostButton,
  IconButton,
  Card,
  BaseCard,
  GlassCard,
  HighlightCard,
  StatCard,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Badge,
  StatusBadge,
  Input,
  TextInput,
  SearchInput,
  SelectInput,
  Checkbox,
  RadioButton,
  ProgressBar,
  Skeleton,
  SkeletonCard,
  Toast,
  ToastContainer,
  EmptyState,
  Modal,
  Dropdown,
  Tooltip,
  Breadcrumb,
  TabNavigation,
} from '../components/ui';
import { fadeUp, fadeIn, scaleIn, staggerContainer, staggerItem } from '../components/animations/variants';
import { PeachSphere, IvorySphere, CoralSphere, GoldSphere } from '../components/common/FloatingSpheres';
import { ScrollReveal, ParallaxElement } from '../components/animations/ScrollAnimations';

export const DesignSystemPreviewPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('components');
  const [progressVal, setProgressVal] = useState(68);
  const [testChecked, setTestChecked] = useState(true);
  const [testRadio, setTestRadio] = useState('merit');
  const [toasts, setToasts] = useState([]);

  const addTestToast = (type) => {
    const id = Date.now();
    const messages = {
      success: { title: 'Application Submitted', message: 'Turing Fellow Application was recorded.' },
      warning: { title: 'Deadline Approaching', message: 'Only 3 days left for Meridian Grant.' },
      danger: { title: 'Missing Document', message: 'Official university transcript required.' },
      info: { title: 'Scholarship Saved', message: 'Added to your bookmarked collection.' },
    };
    setToasts((prev) => [...prev, { id, type, ...messages[type] }]);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const colorTokens = [
    { name: '--background', hex: '#FFF8F3', role: 'Main Canvas Background (Warm Cream)' },
    { name: '--surface', hex: '#FFFFFF', role: 'Elevated Cards & Containers (Pure White)' },
    { name: '--surface-secondary', hex: '#FFE3D6', role: 'Supportive Peach Surface (Soft Peach)' },
    { name: '--peach-tint', hex: '#FFF0E8', role: 'Soft Highlight & Pills (Peach Tint)' },
    { name: '--coral', hex: '#F28C78', role: 'Vibrant Brand Accent (Coral)' },
    { name: '--primary', hex: '#DB695C', role: 'Primary Action Buttons & Logos (Deep Coral)' },
    { name: '--primary-hover', hex: '#C65D52', role: 'Hover State Accent' },
    { name: '--terracotta', hex: '#B95449', role: 'Deep Action Press (Terracotta)' },
    { name: '--text-primary', hex: '#493735', role: 'Deep Espresso Heading' },
    { name: '--text-secondary', hex: '#8B7772', role: 'Readable Body Copy (Muted Brown)' },
    { name: '--gold', hex: '#E8BF76', role: 'Prestigious Merit Award Accent (Soft Gold)' },
    { name: '--border', hex: '#F0DED6', role: 'Subtle 1px Dividers' },
  ];

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      {/* Toast notifications container */}
      <ToastContainer toasts={toasts} onClose={removeToast} />

      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[var(--border)]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-heading font-extrabold text-2xl text-[var(--text-primary)]">
              GRANTLY<span className="text-[var(--coral)]">.</span>
            </span>
            <Badge variant="coral">Design System v2.0</Badge>
            <Badge variant="peach">Peach + Coral Identity</Badge>
          </div>
          <p className="text-sm text-[var(--text-secondary)]">
            Official Design Tokens, Typography, and Accessible UI Components Specification
          </p>
        </div>

        <div className="flex items-center gap-3">
          <PrimaryButton size="sm" onClick={() => setModalOpen(true)}>
            Test Modal Overlay
          </PrimaryButton>
        </div>
      </div>

      {/* Tab Selector */}
      <TabNavigation
        tabs={[
          { id: 'components', label: 'Core UI Components', count: 18 },
          { id: 'tokens', label: 'Color Tokens & Hierarchy' },
          { id: 'typography', label: 'Typography System (Phase 12)' },
          { id: 'animations', label: 'Scroll & Motion System (Phase 13)' },
        ]}
        activeTab={activeTab}
        onChange={setActiveTab}
      />

      {/* TAB 1: CORE UI COMPONENTS */}
      {activeTab === 'components' && (
        <motion.div
          variants={staggerContainer()}
          initial="hidden"
          animate="visible"
          className="space-y-14"
        >
          {/* Breadcrumb Demo */}
          <section className="space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] font-sans">
              1. Breadcrumbs Navigation
            </h2>
            <Breadcrumb
              items={[
                { label: 'Platform Home', to: '/' },
                { label: 'Scholarship Catalog', to: '/explore' },
                { label: 'STEM & Research', to: '/explore' },
                { label: 'Turing Fellowship' },
              ]}
            />
          </section>

          {/* Buttons Section */}
          <section className="space-y-4">
            <h2 className="heading-section text-[var(--text-primary)]">
              2. Button Architectures & States
            </h2>
            <p className="text-sm text-[var(--text-secondary)]">
              Deep coral primary actions with smooth hover lift (`-translate-y-0.5`) and tactile press animations (`active:scale-[0.98]`).
            </p>
            <div className="flex flex-wrap items-center gap-3 p-6 rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)]">
              <PrimaryButton icon={Sparkles}>Primary Button</PrimaryButton>
              <SecondaryButton icon={Bookmark}>Secondary Button</SecondaryButton>
              <OutlineButton icon={Eye}>Outline Button</OutlineButton>
              <GhostButton>Ghost Button</GhostButton>
              <Button variant="danger" icon={AlertCircle}>Danger Action</Button>
              <PrimaryButton loading>Loading State</PrimaryButton>
              <SecondaryButton disabled>Disabled</SecondaryButton>
              <IconButton icon={Bookmark} label="Bookmark icon button" />
              <IconButton icon={Search} label="Search icon button" variant="primary" />
            </div>
          </section>

          {/* Cards Section */}
          <section className="space-y-4">
            <h2 className="heading-section text-[var(--text-primary)]">
              3. Card System
            </h2>
            <p className="text-sm text-[var(--text-secondary)]">
              18–24px radius, soft ambient shadows (`0 8px 30px rgba(73,55,53,0.06)`), 1px border.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <BaseCard hover>
                <CardHeader>
                  <Badge variant="coral">BaseCard</Badge>
                  <span className="text-xs text-[var(--text-muted)] font-mono">$50,000</span>
                </CardHeader>
                <CardTitle>Standard Surface Card</CardTitle>
                <CardDescription>
                  Clean, theme-aware surface with soft lift interaction on hover.
                </CardDescription>
                <CardFooter>
                  <span className="text-xs font-semibold text-[var(--primary)]">Interactive</span>
                  <OutlineButton size="sm">Details</OutlineButton>
                </CardFooter>
              </BaseCard>

              <GlassCard hover>
                <CardHeader>
                  <Badge variant="gold">GlassCard</Badge>
                  <span className="text-xs text-[var(--gold)] font-bold">Featured</span>
                </CardHeader>
                <CardTitle>Translucent Backdrop Card</CardTitle>
                <CardDescription>
                  Subtle 85% opacity surface with backdrop blur for layered interfaces.
                </CardDescription>
                <CardFooter>
                  <span className="text-xs text-[var(--text-muted)]">High Priority</span>
                  <PrimaryButton size="sm">Apply Now</PrimaryButton>
                </CardFooter>
              </GlassCard>

              <HighlightCard accent="coral">
                <CardHeader>
                  <Badge variant="peach">HighlightCard</Badge>
                  <CheckCircle2 className="h-4 w-4 text-[var(--success)]" />
                </CardHeader>
                <CardTitle>Accent Left-Border Card</CardTitle>
                <CardDescription>
                  4px accent spine ideal for high-match or active pipeline alerts.
                </CardDescription>
                <CardFooter>
                  <span className="text-xs font-bold text-[var(--success)]">98% Match Score</span>
                  <SecondaryButton size="sm">Review</SecondaryButton>
                </CardFooter>
              </HighlightCard>
            </div>

            {/* Stat Cards Demo */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
              <StatCard
                label="Total Funding Awarded"
                value="$15,000"
                icon={DollarSign}
                trend="+25% vs last term"
              />
              <StatCard
                label="Active Applications"
                value="3 Grants"
                icon={Layers}
                subvalue="2 Under Final Review"
              />
              <StatCard
                label="Saved Scholarships"
                value="7 Programs"
                icon={Bookmark}
                subvalue="Upcoming Due: Dec 15"
              />
              <StatCard
                label="Matched Opportunities"
                value="24 Grants"
                icon={Award}
                trend="94% Avg Match"
              />
            </div>
          </section>

          {/* Form Controls Section */}
          <section className="space-y-4">
            <h2 className="heading-section text-[var(--text-primary)]">
              4. Form Controls & Inputs
            </h2>
            <div className="p-6 rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <TextInput
                  label="Scholar Name"
                  placeholder="e.g. Alexandria Chen"
                  helperText="Official name on academic transcript"
                />
                <SearchInput placeholder="Quick search grants..." />
                <SelectInput
                  label="Education Level"
                  options={[
                    'Undergraduate (Junior/Senior)',
                    'Master\'s Candidate',
                    'Ph.D. / Doctoral Candidate',
                    'High School Senior',
                  ]}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-[var(--border)]">
                <div className="space-y-3">
                  <p className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
                    Checkboxes
                  </p>
                  <Checkbox
                    label="Notify me when new STEM grants open"
                    sublabel="Weekly email digest of 90%+ match score grants"
                    checked={testChecked}
                    onChange={(e) => setTestChecked(e.target.checked)}
                  />
                  <Checkbox
                    label="Only show scholarships with no application fees"
                    checked={true}
                    onChange={() => {}}
                  />
                </div>

                <div className="space-y-3">
                  <p className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
                    Radio Selection
                  </p>
                  <div className="space-y-2">
                    <RadioButton
                      name="fundingType"
                      value="merit"
                      label="Merit-Based Awards"
                      sublabel="Based on GPA, research, and academic excellence"
                      checked={testRadio === 'merit'}
                      onChange={() => setTestRadio('merit')}
                    />
                    <RadioButton
                      name="fundingType"
                      value="need"
                      label="Need-Based Grants"
                      sublabel="Based on verified financial need / FAFSA"
                      checked={testRadio === 'need'}
                      onChange={() => setTestRadio('need')}
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Badges & Statuses */}
          <section className="space-y-4">
            <h2 className="heading-section text-[var(--text-primary)]">
              5. Badges & Status Indicators
            </h2>
            <div className="p-6 rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] space-y-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-3">
                  Design Tokens Badges
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="coral">Coral Brand</Badge>
                  <Badge variant="peach">Soft Peach</Badge>
                  <Badge variant="gold">Gold Excellence</Badge>
                  <Badge variant="success">Verified Success</Badge>
                  <Badge variant="warning">Upcoming Due</Badge>
                  <Badge variant="danger">High Urgency</Badge>
                  <Badge variant="neutral">Neutral Tag</Badge>
                  <Badge variant="coral" dot>Active Dot</Badge>
                </div>
              </div>

              <div className="pt-4 border-t border-[var(--border)]">
                <p className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-3">
                  Standardized StatusBadges
                </p>
                <div className="flex flex-wrap gap-2">
                  <StatusBadge status="Submitted" />
                  <StatusBadge status="In Progress" />
                  <StatusBadge status="Awarded" />
                  <StatusBadge status="Under Review" />
                  <StatusBadge status="Not Started" />
                  <StatusBadge status="Rejected" />
                </div>
              </div>
            </div>
          </section>

          {/* Progress & Skeletons */}
          <section className="space-y-4">
            <h2 className="heading-section text-[var(--text-primary)]">
              6. Progress Indicators & Skeleton Loaders
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] space-y-6">
                <h3 className="heading-card text-[var(--text-primary)]">Interactive Progress Bar</h3>
                <ProgressBar
                  value={progressVal}
                  label="Application Checklist Progress"
                  showPercentage
                />
                <ProgressBar
                  value={92}
                  label="Profile Completion"
                  color="gold"
                  size="sm"
                />
                <ProgressBar
                  value={100}
                  label="Transcript Verification"
                  color="success"
                  size="sm"
                />

                <div className="flex items-center gap-2 pt-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setProgressVal(Math.max(progressVal - 10, 0))}
                  >
                    -10%
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setProgressVal(Math.min(progressVal + 10, 100))}
                  >
                    +10%
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="heading-card text-[var(--text-primary)]">Skeleton Shimmer State</h3>
                <SkeletonCard />
              </div>
            </div>
          </section>

          {/* Feedback & Empty States */}
          <section className="space-y-4">
            <h2 className="heading-section text-[var(--text-primary)]">
              7. Toasts & Empty States
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] space-y-4">
                <h3 className="heading-card text-[var(--text-primary)]">Trigger Feedback Toasts</h3>
                <p className="text-xs text-[var(--text-secondary)]">
                  Simulate live micro-toasts with entrance and dismiss animations:
                </p>
                <div className="flex flex-wrap gap-2">
                  <Button size="sm" onClick={() => addTestToast('success')}>
                    Success Toast
                  </Button>
                  <Button size="sm" variant="secondary" onClick={() => addTestToast('warning')}>
                    Warning Toast
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => addTestToast('danger')}>
                    Danger Toast
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => addTestToast('info')}>
                    Info Toast
                  </Button>
                </div>
              </div>

              <EmptyState
                icon={Bookmark}
                title="No Saved Grants Found"
                description="Save programs from the exploration catalog to compare deadlines side by side."
                actionLabel="Explore Scholarships"
                onAction={() => {}}
              />
            </div>
          </section>

          {/* Dropdown & Tooltip Demo */}
          <section className="space-y-4">
            <h2 className="heading-section text-[var(--text-primary)]">
              8. Overlays: Dropdowns & Tooltips
            </h2>
            <div className="flex items-center gap-6 p-6 rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)]">
              <Dropdown
                label="Sort Scholarships"
                items={[
                  { label: 'Highest Award Amount ($)', icon: DollarSign },
                  { label: 'Closest Deadline', icon: Calendar },
                  { label: 'Best Match Score (%)', icon: Award },
                  { divider: true },
                  { label: 'Clear Filters', danger: true },
                ]}
              />

              <Tooltip content="Smart match score computed from your GPA & major" position="top">
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[var(--radius-md)] bg-[var(--peach-tint)] text-xs font-semibold text-[var(--primary)] cursor-help">
                  <Award className="h-4 w-4" />
                  <span>Hover for Tooltip</span>
                </div>
              </Tooltip>
            </div>
          </section>
        </motion.div>
      )}

      {/* TAB 2: TOKENS & TYPOGRAPHY */}
      {activeTab === 'tokens' && (
        <motion.div variants={fadeIn} initial="hidden" animate="visible" className="space-y-12">
          {/* Brand Color Swatches */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="heading-section text-[var(--text-primary)]">
                  Peach + Coral Token Distribution
                </h2>
                <p className="text-xs text-[var(--text-secondary)] mt-1">
                  60% Warm Cream & White &bull; 20% Peach &bull; 15% Coral &bull; 5% Gold & Accents
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {colorTokens.map((token) => (
                <div
                  key={token.name}
                  className="rounded-[var(--radius-md)] border border-[var(--border)] overflow-hidden bg-[var(--surface)] grantly-card-shadow"
                >
                  <div
                    className="h-20 w-full flex items-end p-2"
                    style={{ backgroundColor: token.hex }}
                  >
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-black/40 text-white backdrop-blur-xs">
                      {token.hex}
                    </span>
                  </div>
                  <div className="p-3">
                    <code className="text-xs font-bold text-[var(--text-primary)] font-mono">
                      {token.name}
                    </code>
                    <p className="text-[11px] text-[var(--text-muted)] mt-1 leading-tight">
                      {token.role}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Color Hierarchy Best Practices */}
          <section className="space-y-4 p-6 sm:p-8 rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)]">
            <h2 className="heading-section text-[var(--text-primary)]">
              Color Token Principles
            </h2>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              GRANTLY maintains an authentic Peach + Coral visual identity inspired by high-end consumer fintech. Surfaces default to Warm Cream (<code className="font-mono text-xs text-[var(--primary)]">#FFF8F3</code>), elevated cards to Pure White (<code className="font-mono text-xs text-[var(--primary)]">#FFFFFF</code>), and primary actions to Deep Coral (<code className="font-mono text-xs text-[var(--primary)]">#DB695C</code>).
            </p>
          </section>
        </motion.div>
      )}

      {/* TAB 3: TYPOGRAPHY SYSTEM (PHASE 12) */}
      {activeTab === 'typography' && (
        <motion.div variants={fadeIn} initial="hidden" animate="visible" className="space-y-10">
          {/* 1. Font Family Pairing Cards */}
          <section className="space-y-4">
            <h2 className="heading-section text-[var(--text-primary)]">
              1. Official Font Pairing Architecture
            </h2>
            <p className="text-sm text-[var(--text-secondary)]">
              A dual-typeface system pairing geometrical warmth with Swiss precision for an education-fintech standard.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Primary Font: Manrope */}
              <BaseCard className="p-6 sm:p-7 space-y-4 border-l-4 border-l-[var(--primary)]">
                <div className="flex items-center justify-between">
                  <Badge variant="coral">PRIMARY FONT</Badge>
                  <span className="text-xs font-mono text-[var(--text-muted)]">Google Fonts (400–800)</span>
                </div>
                <div>
                  <h3 className="font-heading font-extrabold text-3xl text-[var(--text-primary)]">
                    Manrope
                  </h3>
                  <p className="text-xs text-[var(--text-secondary)] mt-1 font-body">
                    Modern geometric grotesque with humanistic open apertures and clean numerals.
                  </p>
                </div>
                <div className="space-y-1.5 pt-2 border-t border-[var(--border)] text-xs text-[var(--text-secondary)]">
                  <p><strong className="text-[var(--text-primary)]">Used for:</strong> Hero headings, page titles, section headers, card titles, statistics, and financial amounts.</p>
                  <p><strong className="text-[var(--text-primary)]">Weights:</strong> 400 Regular, 500 Medium, 600 SemiBold, 700 Bold, 800 ExtraBold.</p>
                </div>
                <div className="p-3 rounded-[var(--radius-md)] bg-[var(--peach-tint)]/60 font-heading text-sm text-[var(--text-primary)] font-bold">
                  ABCDEFGHIJKLMNOPQRSTUVWXYZ 0123456789
                </div>
              </BaseCard>

              {/* Secondary Font: Inter */}
              <BaseCard className="p-6 sm:p-7 space-y-4 border-l-4 border-l-[var(--gold)]">
                <div className="flex items-center justify-between">
                  <Badge variant="peach">SECONDARY FONT</Badge>
                  <span className="text-xs font-mono text-[var(--text-muted)]">Google Fonts (400–700)</span>
                </div>
                <div>
                  <h3 className="font-body font-bold text-3xl text-[var(--text-primary)]">
                    Inter
                  </h3>
                  <p className="text-xs text-[var(--text-secondary)] mt-1 font-body">
                    Engineered for high readability on digital screens, comfortable x-height, and neutral structure.
                  </p>
                </div>
                <div className="space-y-1.5 pt-2 border-t border-[var(--border)] text-xs text-[var(--text-secondary)]">
                  <p><strong className="text-[var(--text-primary)]">Used for:</strong> Paragraphs, UI descriptions, navigation links, buttons, form controls, and metadata.</p>
                  <p><strong className="text-[var(--text-primary)]">Weights:</strong> 400 Regular, 500 Medium, 600 SemiBold, 700 Bold.</p>
                </div>
                <div className="p-3 rounded-[var(--radius-md)] bg-[var(--surface-secondary)]/50 font-body text-sm text-[var(--text-primary)]">
                  abcdefghijklmnopqrstuvwxyz 0123456789
                </div>
              </BaseCard>
            </div>
          </section>

          {/* 2. Global Fluid Typography Scale */}
          <section className="space-y-6 p-6 sm:p-8 rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[var(--border)]">
              <div>
                <h2 className="heading-section text-[var(--text-primary)]">
                  2. Centralized Fluid Typography Scale Tokens
                </h2>
                <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                  Fluid scaling using CSS <code className="font-mono text-[var(--primary)]">clamp()</code> ensures zero clipped text or abrupt jumps between 320px and 1440px.
                </p>
              </div>
              <Badge variant="success">Responsive Clamp Built-in</Badge>
            </div>

            <div className="space-y-8 divide-y divide-[var(--border)]">
              {/* Hero Display */}
              <div className="pt-2 space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-label-caps text-[var(--text-muted)]">
                    Hero Heading &bull; 38px mobile &rarr; 60px desktop &bull; Manrope 800 (ExtraBold) &bull; Leading 1.12
                  </span>
                  <code className="text-xs font-mono text-[var(--primary)] bg-[var(--peach-tint)] px-2 py-0.5 rounded">
                    --text-hero: clamp(2.375rem, 5vw, 3.75rem)
                  </code>
                </div>
                <h1 className="heading-hero text-[var(--text-primary)]">
                  Your Future Deserves Funding<span className="text-[var(--coral)]">.</span>
                </h1>
              </div>

              {/* Page Heading */}
              <div className="pt-6 space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-label-caps text-[var(--text-muted)]">
                    Page Heading &bull; 30px mobile &rarr; 40px desktop &bull; Manrope 700 (Bold) &bull; Leading 1.2
                  </span>
                  <code className="text-xs font-mono text-[var(--primary)] bg-[var(--peach-tint)] px-2 py-0.5 rounded">
                    --text-page: clamp(1.875rem, 3.2vw, 2.5rem)
                  </code>
                </div>
                <h2 className="heading-page text-[var(--text-primary)]">
                  Rethinking the Scholarship Experience
                </h2>
              </div>

              {/* Section Heading */}
              <div className="pt-6 space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-label-caps text-[var(--text-muted)]">
                    Section Heading &bull; 26px mobile &rarr; 32px desktop &bull; Manrope 700 (Bold) &bull; Leading 1.25
                  </span>
                  <code className="text-xs font-mono text-[var(--primary)] bg-[var(--peach-tint)] px-2 py-0.5 rounded">
                    --text-section: clamp(1.625rem, 2.5vw, 2rem)
                  </code>
                </div>
                <h3 className="heading-section text-[var(--text-primary)]">
                  Verified Opportunities with Transparent Criteria
                </h3>
              </div>

              {/* Card Heading */}
              <div className="pt-6 space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-label-caps text-[var(--text-muted)]">
                    Card Heading &bull; 18px mobile &rarr; 20px desktop &bull; Manrope 700 (Bold) &bull; Leading 1.35
                  </span>
                  <code className="text-xs font-mono text-[var(--primary)] bg-[var(--peach-tint)] px-2 py-0.5 rounded">
                    --text-card: clamp(1.125rem, 1.8vw, 1.25rem)
                  </code>
                </div>
                <h4 className="heading-card text-[var(--text-primary)]">
                  Turing Fellowship in AI Architecture & Computing Systems
                </h4>
              </div>

              {/* Subheading */}
              <div className="pt-6 space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-label-caps text-[var(--text-muted)]">
                    Subheading &bull; 16px mobile &rarr; 18px desktop &bull; Manrope 600 (SemiBold) &bull; Leading 1.4
                  </span>
                  <code className="text-xs font-mono text-[var(--primary)] bg-[var(--peach-tint)] px-2 py-0.5 rounded">
                    --text-subheading: clamp(1rem, 1.5vw, 1.125rem)
                  </code>
                </div>
                <h5 className="heading-sub text-[var(--text-secondary)]">
                  Eligible for Junior and Senior Undergraduate Scholars with GPA 3.7+
                </h5>
              </div>

              {/* Body Text */}
              <div className="pt-6 space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-label-caps text-[var(--text-muted)]">
                    Body Regular &bull; 15px mobile &rarr; 16px desktop &bull; Inter 400 (Regular) &bull; Line-Height 1.65
                  </span>
                  <code className="text-xs font-mono text-[var(--primary)] bg-[var(--peach-tint)] px-2 py-0.5 rounded">
                    --text-body: clamp(0.9375rem, 1.2vw, 1rem)
                  </code>
                </div>
                <p className="text-body text-[var(--text-primary)] max-w-3xl leading-relaxed">
                  Discover matching opportunities, understand your eligibility in seconds, and manage your applications—all in one smart platform with real-time tracking and verified criteria.
                </p>
              </div>

              {/* Secondary Body Text */}
              <div className="pt-6 space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-label-caps text-[var(--text-muted)]">
                    Secondary Text &bull; 13px mobile &rarr; 14px desktop &bull; Inter 400 (Regular) &bull; Muted Brown (#8B7772)
                  </span>
                  <code className="text-xs font-mono text-[var(--primary)] bg-[var(--peach-tint)] px-2 py-0.5 rounded">
                    --text-secondary-size: clamp(0.8125rem, 1vw, 0.875rem)
                  </code>
                </div>
                <p className="text-secondary-copy">
                  Applications undergo preliminary review within 14 business days. Finalists are invited for a 20-minute video panel discussion.
                </p>
              </div>

              {/* Labels & Buttons */}
              <div className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <span className="text-label-caps text-[var(--text-muted)]">
                    Labels & Metadata &bull; 12–13px &bull; Inter 500 (Medium)
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-label font-medium text-[var(--text-secondary)]">Application Status:</span>
                    <Badge variant="coral">In Review</Badge>
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-label-caps text-[var(--text-muted)]">
                    Buttons & Actions &bull; 14–15px &bull; Inter 600 (SemiBold)
                  </span>
                  <div className="flex items-center gap-3">
                    <PrimaryButton size="sm">Submit Application</PrimaryButton>
                    <SecondaryButton size="sm">Save Draft</SecondaryButton>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 3. Numerical & Financial Tabular Alignment Showcase */}
          <section className="space-y-4 p-6 sm:p-8 rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[var(--border)]">
              <div>
                <h2 className="heading-section text-[var(--text-primary)]">
                  3. Tabular Numbers & Financial Alignment
                </h2>
                <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                  <code className="font-mono text-[var(--primary)]">font-variant-numeric: tabular-nums</code> ensures digits occupy equal horizontal space for clean vertical alignment in financial tables, timers, and stat counters.
                </p>
              </div>
              <Badge variant="gold">font-variant-numeric: tabular-nums</Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              {/* Tabular Numerics (Proper) */}
              <div className="p-5 rounded-[var(--radius-md)] bg-[var(--peach-tint)]/40 border border-[var(--border)] space-y-3">
                <span className="text-xs font-bold text-[var(--success)] uppercase tracking-wider flex items-center gap-1.5">
                  ✓ Tabular Alignment (.tabular-nums)
                </span>
                <div className="font-heading font-extrabold text-2xl text-[var(--text-primary)] tabular-nums space-y-1">
                  <div>$145,000.00 <span className="text-xs font-normal text-[var(--text-muted)] font-body">Pipeline</span></div>
                  <div>$ 15,000.00 <span className="text-xs font-normal text-[var(--text-muted)] font-body">Disbursed</span></div>
                  <div>$  2,500.00 <span className="text-xs font-normal text-[var(--text-muted)] font-body">Book Award</span></div>
                  <div>$    750.00 <span className="text-xs font-normal text-[var(--text-muted)] font-body">Exam Grant</span></div>
                </div>
              </div>

              {/* Standard Proportional Digits */}
              <div className="p-5 rounded-[var(--radius-md)] bg-[var(--surface-secondary)]/20 border border-[var(--border)] space-y-3">
                <span className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">
                  Proportional Width Reference
                </span>
                <div className="font-heading font-extrabold text-2xl text-[var(--text-primary)] space-y-1">
                  <div>$145,000.00 <span className="text-xs font-normal text-[var(--text-muted)] font-body">Pipeline</span></div>
                  <div>$ 15,000.00 <span className="text-xs font-normal text-[var(--text-muted)] font-body">Disbursed</span></div>
                  <div>$  2,500.00 <span className="text-xs font-normal text-[var(--text-muted)] font-body">Book Award</span></div>
                  <div>$    750.00 <span className="text-xs font-normal text-[var(--text-muted)] font-body">Exam Grant</span></div>
                </div>
              </div>
            </div>
          </section>

          {/* 4. Font Weight Hierarchy Matrix */}
          <section className="space-y-4 p-6 sm:p-8 rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)]">
            <h2 className="heading-section text-[var(--text-primary)]">
              4. Typography Weights Matrix
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--primary)] font-heading">
                  Manrope Weights
                </span>
                <div className="space-y-2 text-sm text-[var(--text-primary)]">
                  <div className="p-2.5 rounded bg-[var(--surface-secondary)]/30 font-heading font-normal">
                    Manrope 400 Regular — Clean supporting labels
                  </div>
                  <div className="p-2.5 rounded bg-[var(--surface-secondary)]/30 font-heading font-medium">
                    Manrope 500 Medium — Subtle highlights & dates
                  </div>
                  <div className="p-2.5 rounded bg-[var(--surface-secondary)]/30 font-heading font-semibold">
                    Manrope 600 SemiBold — Card headings & subtitles
                  </div>
                  <div className="p-2.5 rounded bg-[var(--surface-secondary)]/30 font-heading font-bold">
                    Manrope 700 Bold — Section headings & page titles
                  </div>
                  <div className="p-2.5 rounded bg-[var(--surface-secondary)]/30 font-heading font-extrabold">
                    Manrope 800 ExtraBold — Hero headings & large metrics
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--gold)] font-body">
                  Inter Weights
                </span>
                <div className="space-y-2 text-sm text-[var(--text-primary)] font-body">
                  <div className="p-2.5 rounded bg-[var(--surface-secondary)]/30 font-normal">
                    Inter 400 Regular — Body text, paragraphs & descriptions
                  </div>
                  <div className="p-2.5 rounded bg-[var(--surface-secondary)]/30 font-medium">
                    Inter 500 Medium — Form labels, navigation links & metadata
                  </div>
                  <div className="p-2.5 rounded bg-[var(--surface-secondary)]/30 font-semibold">
                    Inter 600 SemiBold — Buttons, interactive actions & tags
                  </div>
                  <div className="p-2.5 rounded bg-[var(--surface-secondary)]/30 font-bold">
                    Inter 700 Bold — Emphasized badges & alerts
                  </div>
                </div>
              </div>
            </div>
          </section>
        </motion.div>
      )}

      {/* TAB 4: SCROLL & MOTION SYSTEM (PHASE 13) */}
      {activeTab === 'animations' && (
        <motion.div variants={fadeIn} initial="hidden" animate="visible" className="space-y-12">
          {/* 1. Global Scroll Animation Components */}
          <section className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[var(--border)]">
              <div>
                <h2 className="heading-section text-[var(--text-primary)]">
                  1. Scroll-Triggered Animation Suite
                </h2>
                <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                  Reusable components using Framer Motion's <code className="font-mono text-[var(--primary)]">useInView</code> with <code className="font-mono text-[var(--primary)]">once: true</code> to eliminate repeated animations and ensure zero content invisibility.
                </p>
              </div>
              <Badge variant="coral">Failsafe Visible Fallback</Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] space-y-2">
                <Badge variant="coral">ScrollReveal (fadeUp)</Badge>
                <h4 className="heading-card text-base text-[var(--text-primary)]">
                  Vertical Smooth Reveal
                </h4>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  Triggers when 15% in viewport. Translates up 22px with gentle easing [0.16, 1, 0.3, 1].
                </p>
              </div>

              <div className="p-6 rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] space-y-2">
                <Badge variant="peach">BlurReveal</Badge>
                <h4 className="heading-card text-base text-[var(--text-primary)]">
                  Optical Focus In
                </h4>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  Transitions from subtle 6px blur to crisp focus simultaneously with opacity.
                </p>
              </div>

              <div className="p-6 rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] space-y-2">
                <Badge variant="gold">StaggerReveal</Badge>
                <h4 className="heading-card text-base text-[var(--text-primary)]">
                  Sequential Grid Entrance
                </h4>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  Cards enter with 80ms sequential stagger delay for natural scanning flow.
                </p>
              </div>
            </div>
          </section>

          {/* 2. Floating 3D Spheres System */}
          <section className="space-y-4 p-6 sm:p-8 rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[var(--border)]">
              <div>
                <h2 className="heading-section text-[var(--text-primary)]">
                  2. Floating 3D Spheres System
                </h2>
                <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                  Multi-stop radial gradients, specular highlights, ambient shadows, and 8–14s tranquil float cycles.
                </p>
              </div>
              <Badge variant="peach">CSS Radial Mesh</Badge>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-4 text-center">
              {/* 1. Peach Sphere */}
              <div className="flex flex-col items-center p-5 rounded-[var(--radius-md)] bg-[var(--surface-secondary)]/30 border border-[var(--border)]">
                <div className="h-24 w-24 relative flex items-center justify-center mb-3">
                  <PeachSphere size="w-20 h-20" className="relative shadow-xl" floatDuration={10} />
                </div>
                <h4 className="font-heading font-bold text-sm text-[var(--text-primary)]">Peach Sphere</h4>
                <span className="text-[11px] text-[var(--text-muted)] mt-0.5">Warm Coral Core</span>
              </div>

              {/* 2. Ivory Sphere */}
              <div className="flex flex-col items-center p-5 rounded-[var(--radius-md)] bg-[var(--surface-secondary)]/30 border border-[var(--border)]">
                <div className="h-24 w-24 relative flex items-center justify-center mb-3">
                  <IvorySphere size="w-20 h-20" className="relative shadow-md" floatDuration={12} />
                </div>
                <h4 className="font-heading font-bold text-sm text-[var(--text-primary)]">Ivory Sphere</h4>
                <span className="text-[11px] text-[var(--text-muted)] mt-0.5">Translucent Glass</span>
              </div>

              {/* 3. Coral Sphere */}
              <div className="flex flex-col items-center p-5 rounded-[var(--radius-md)] bg-[var(--surface-secondary)]/30 border border-[var(--border)]">
                <div className="h-24 w-24 relative flex items-center justify-center mb-3">
                  <CoralSphere size="w-16 h-16" className="relative shadow-lg" floatDuration={8} />
                </div>
                <h4 className="font-heading font-bold text-sm text-[var(--text-primary)]">Coral Sphere</h4>
                <span className="text-[11px] text-[var(--text-muted)] mt-0.5">Deep Coral Accent</span>
              </div>

              {/* 4. Golden Sphere */}
              <div className="flex flex-col items-center p-5 rounded-[var(--radius-md)] bg-[var(--surface-secondary)]/30 border border-[var(--border)]">
                <div className="h-24 w-24 relative flex items-center justify-center mb-3">
                  <GoldSphere size="w-18 h-18" className="relative shadow-lg" floatDuration={14} />
                </div>
                <h4 className="font-heading font-bold text-sm text-[var(--text-primary)]">Golden Sphere</h4>
                <span className="text-[11px] text-[var(--text-muted)] mt-0.5">Prestigious Merit Aura</span>
              </div>
            </div>
          </section>

          {/* 3. Blur & Lighting Effects Showcase */}
          <section className="space-y-4 p-6 sm:p-8 rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)]">
            <h2 className="heading-section text-[var(--text-primary)]">
              3. Ambient Blur & Lighting Utilities
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
              <div className="p-5 rounded-[var(--radius-md)] bg-[var(--surface-secondary)]/40 border border-[var(--border)] relative overflow-hidden">
                <div className="peach-glow absolute -top-8 -right-8 w-28 h-28 pointer-events-none" />
                <Badge variant="peach" size="sm">.peach-glow</Badge>
                <h4 className="font-heading font-bold text-sm text-[var(--text-primary)] mt-3">Peach Ambient Glow</h4>
                <p className="text-xs text-[var(--text-secondary)] mt-1">Soft radial illumination with 40px blur filter.</p>
              </div>

              <div className="p-5 rounded-[var(--radius-md)] bg-[var(--surface-secondary)]/40 border border-[var(--border)] relative overflow-hidden">
                <div className="coral-glow absolute -top-8 -right-8 w-28 h-28 pointer-events-none" />
                <Badge variant="coral" size="sm">.coral-glow</Badge>
                <h4 className="font-heading font-bold text-sm text-[var(--text-primary)] mt-3">Coral Brand Aura</h4>
                <p className="text-xs text-[var(--text-secondary)] mt-1">Vibrant coral warmth for primary hero highlights.</p>
              </div>

              <div className="p-5 rounded-[var(--radius-md)] bg-[var(--surface-secondary)]/40 border border-[var(--border)] relative overflow-hidden">
                <div className="gold-glow absolute -top-8 -right-8 w-28 h-28 pointer-events-none" />
                <Badge variant="gold" size="sm">.gold-glow</Badge>
                <h4 className="font-heading font-bold text-sm text-[var(--text-primary)] mt-3">Golden Milestone Glow</h4>
                <p className="text-xs text-[var(--text-secondary)] mt-1">Subtle warm gold lighting for award recognition.</p>
              </div>
            </div>
          </section>

          {/* 4. Accessibility & Performance Safeguards */}
          <section className="space-y-4 p-6 sm:p-8 rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)]">
            <h2 className="heading-section text-[var(--text-primary)]">
              4. Performance & Accessibility Architecture
            </h2>
            <div className="space-y-2 text-xs text-[var(--text-secondary)] leading-relaxed">
              <p><strong className="text-[var(--text-primary)]">Prefers-Reduced-Motion:</strong> When active, all scroll transforms and continuous float cycles are disabled, rendering content immediately with 100% opacity.</p>
              <p><strong className="text-[var(--text-primary)]">Fail-safe Visibility:</strong> Animations use <code className="font-mono text-[var(--primary)]">once: true</code> with early viewport thresholds (0.12–0.15), ensuring content never remains hidden when scrolled past.</p>
              <p><strong className="text-[var(--text-primary)]">Hardware Acceleration:</strong> Only <code className="font-mono text-[var(--primary)]">transform</code> and <code className="font-mono text-[var(--primary)]">opacity</code> are animated to prevent layout reflows and guarantee 60fps scrolling.</p>
            </div>
          </section>
        </motion.div>
      )}

      {/* Test Modal Component */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="GRANTLY System Modal"
        subtitle="Accessible dialog demonstration"
      >
        <div className="space-y-4">
          <p className="text-sm text-[var(--text-secondary)]">
            This modal illustrates the official design tokens, backdrop blur, keyboard escape listener, and smooth Framer Motion scaling.
          </p>
          <div className="p-4 rounded-[var(--radius-md)] bg-[var(--peach-tint)] border border-[var(--border)]">
            <span className="text-xs font-bold text-[var(--primary)] uppercase tracking-wider">
              Token Alignment
            </span>
            <p className="text-xs text-[var(--text-primary)] mt-1">
              Surface: <code className="font-mono">var(--surface)</code> &bull; Radius:{' '}
              <code className="font-mono">var(--radius-xl)</code>
            </p>
          </div>
          <div className="flex justify-end gap-2 pt-4 border-t border-[var(--border)]">
            <SecondaryButton size="sm" onClick={() => setModalOpen(false)}>
              Dismiss
            </SecondaryButton>
            <PrimaryButton size="sm" onClick={() => setModalOpen(false)}>
              Confirm Action
            </PrimaryButton>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default DesignSystemPreviewPage;

