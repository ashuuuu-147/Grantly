import React, { useState, useMemo, useEffect, useDeferredValue } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  SlidersHorizontal,
  Bookmark,
  BookmarkCheck,
  Calendar,
  GraduationCap,
  ArrowRight,
  Filter,
  X,
  RotateCcw,
  Sparkles,
  DollarSign,
  MapPin,
  BookOpen,
  ArrowLeftRight,
  CheckCircle2,
  PlusCircle,
} from 'lucide-react';
import {
  BaseCard,
  CardHeader,
  CardTitle,
  CardFooter,
  PrimaryButton,
  OutlineButton,
  SecondaryButton,
  Button,
  Badge,
  SearchInput,
  SelectInput,
  EmptyState,
  Modal,
} from '../components/ui';
import FadeIn from '../components/animations/FadeIn';
import { useApp } from '../context/AppContext';
import { formatCurrency, formatDate, getDaysRemaining } from '../utils/formatters';
import { SCHOLARSHIP_TYPES, EDUCATION_LEVELS, ROUTES } from '../utils/constants';
import AmbientBackground from '../components/common/AmbientBackground';

export const ExplorePage = () => {
  const {
    scholarships,
    isScholarshipSaved,
    toggleSaveScholarship,
    searchQuery: globalQuery,
    addApplication,
    isApplied,
    addToast,
  } = useApp();
  const [searchParams] = useSearchParams();

  // Search & Filter State
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || globalQuery || '');
  const deferredSearchTerm = useDeferredValue(searchTerm);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedEducation, setSelectedEducation] = useState('All');
  const [minMarks, setMinMarks] = useState(70);
  const [maxIncome, setMaxIncome] = useState(200000);
  const [sortBy, setSortBy] = useState('highest_award');
  const [visibleCount, setVisibleCount] = useState(9);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Scholarship Comparison State
  const [compareIds, setCompareIds] = useState([]);
  const [compareModalOpen, setCompareModalOpen] = useState(false);

  // Sync if URL query changes
  useEffect(() => {
    const q = searchParams.get('search');
    if (q) setSearchTerm(q);
  }, [searchParams]);

  // Reset Filters
  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setSelectedEducation('All');
    setMinMarks(70);
    setMaxIncome(200000);
    setSortBy('highest_award');
  };

  // Quick Filter Presets
  const filterPresets = [
    { label: 'All Grants', active: selectedCategory === 'All' && minMarks === 70 && !searchTerm, action: handleResetFilters },
    {
      label: '🏆 Top Awards ($40k+)',
      active: sortBy === 'highest_award' && minMarks === 70,
      action: () => {
        handleResetFilters();
        setSortBy('highest_award');
      },
    },
    {
      label: '💻 AI & STEM',
      active: selectedCategory === 'STEM & Research',
      action: () => {
        setSelectedCategory('STEM & Research');
      },
    },
    {
      label: '👩‍💻 Women in Tech',
      active: selectedCategory === 'Women in Tech',
      action: () => {
        setSelectedCategory('Women in Tech');
      },
    },
    {
      label: '🤝 Need-Based',
      active: selectedCategory === 'Need-Based',
      action: () => {
        setSelectedCategory('Need-Based');
        setMaxIncome(90000);
      },
    },
  ];

  // Comparison Handlers
  const toggleCompare = (id) => {
    setCompareIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((i) => i !== id);
      }
      if (prev.length >= 3) {
        addToast('Comparison Limit', 'You can compare up to 3 scholarships at a time.', 'warning');
        return prev;
      }
      return [...prev, id];
    });
  };

  const comparedScholarships = useMemo(() => {
    return scholarships.filter((s) => compareIds.includes(s.id));
  }, [scholarships, compareIds]);

  // Filtered and Sorted Scholarships
  const filteredScholarships = useMemo(() => {
    return scholarships.filter((item) => {
      // 1. Keyword search (title, provider, description, tags, courses)
      const q = deferredSearchTerm.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.provider.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        (item.tags && item.tags.some((t) => t.toLowerCase().includes(q))) ||
        (item.eligibleCourses && item.eligibleCourses.some((c) => c.toLowerCase().includes(q)));

      // 2. Category Filter
      const matchesCategory =
        selectedCategory === 'All' || item.category === selectedCategory;

      // 3. Education Level Filter
      const matchesEducation =
        selectedEducation === 'All' ||
        item.educationLevel === selectedEducation ||
        (selectedEducation.includes('Undergraduate') && item.educationLevel.includes('Undergraduate'));

      // 4. Minimum Marks / GPA Filter
      const matchesMarks = !item.minimumMarks || item.minimumMarks <= minMarks + 15;

      // 5. Income Cap Filter
      const matchesIncome = !item.maximumIncome || item.maximumIncome <= maxIncome;

      return matchesSearch && matchesCategory && matchesEducation && matchesMarks && matchesIncome;
    });
  }, [scholarships, deferredSearchTerm, selectedCategory, selectedEducation, minMarks, maxIncome]);

  // Sort result list
  const sortedScholarships = useMemo(() => {
    const list = [...filteredScholarships];
    switch (sortBy) {
      case 'highest_award':
        return list.sort((a, b) => (b.awardAmount || b.amount) - (a.awardAmount || a.amount));
      case 'lowest_award':
        return list.sort((a, b) => (a.awardAmount || a.amount) - (b.awardAmount || b.amount));
      case 'nearest_deadline':
        return list.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
      case 'latest_deadline':
        return list.sort((a, b) => new Date(b.deadline) - new Date(a.deadline));
      case 'relevance':
      default:
        return list.sort((a, b) => (b.matchScore || 80) - (a.matchScore || 80));
    }
  }, [filteredScholarships, sortBy]);

  const displayedList = sortedScholarships.slice(0, visibleCount);

  return (
    <AmbientBackground variant="explore">
      <FadeIn className="space-y-8 pb-16">
        {/* Page Header */}
        <div className="space-y-3 pb-6 border-b border-[var(--border)]">
          <div className="flex items-center gap-2">
            <Badge variant="coral">Scholarship Discovery</Badge>
            <span className="text-xs text-[var(--text-muted)] font-mono">
              {scholarships.length} Programs Cataloged
            </span>
          </div>
          <h1 className="heading-page text-[var(--text-primary)]">
            Explore Verified Scholarships & Grants
          </h1>
          <p className="text-sm text-[var(--text-secondary)] max-w-2xl leading-relaxed">
            Filter through our comprehensive directory of merit fellowships, STEM research funding, and community grants with verified criteria and deadlines.
          </p>
        </div>

        {/* Quick Discovery Presets */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {filterPresets.map((preset) => (
            <button
              key={preset.label}
              type="button"
              onClick={preset.action}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                preset.active
                  ? 'bg-[var(--primary)] text-white shadow-xs'
                  : 'bg-[var(--surface)] text-[var(--text-secondary)] border border-[var(--border)] hover:bg-[var(--surface-secondary)]/50'
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>

        {/* Main Content Layout: Filter Sidebar + Results Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* DESKTOP FILTER SIDEBAR */}
          <div className="hidden lg:block lg:col-span-3 sticky top-24">
            <BaseCard className="p-5 space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-[var(--border)]">
                <span className="heading-card text-sm text-[var(--text-primary)] flex items-center gap-2">
                  <SlidersHorizontal className="h-4 w-4 text-[var(--primary)]" />
                  Refine Search
                </span>
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="text-xs font-semibold text-[var(--text-muted)] hover:text-[var(--primary)] flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="h-3 w-3" /> Reset
                </button>
              </div>

              {/* Category Filter */}
              <div className="space-y-2">
                <label htmlFor="filter-category" className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] font-sans">
                  Scholarship Category
                </label>
                <select
                  id="filter-category"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] p-2.5 text-xs font-semibold text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--coral)]/25 cursor-pointer"
                >
                  <option value="All">All Categories ({scholarships.length})</option>
                  {SCHOLARSHIP_TYPES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Education Level */}
              <div className="space-y-2">
                <label htmlFor="filter-education" className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] font-sans">
                  Target Education Level
                </label>
                <select
                  id="filter-education"
                  value={selectedEducation}
                  onChange={(e) => setSelectedEducation(e.target.value)}
                  className="w-full rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] p-2.5 text-xs font-semibold text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--coral)]/25 cursor-pointer"
                >
                  <option value="All">All Levels</option>
                  {EDUCATION_LEVELS.map((lvl) => (
                    <option key={lvl} value={lvl}>
                      {lvl}
                    </option>
                  ))}
                </select>
              </div>

              {/* Minimum Academic Marks Slider */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold uppercase tracking-wider text-[var(--text-muted)] font-sans">
                    Min Academic Score
                  </span>
                  <span className="font-mono font-bold text-[var(--primary)]">{minMarks}%+</span>
                </div>
                <input
                  type="range"
                  min="65"
                  max="95"
                  step="5"
                  value={minMarks}
                  aria-label="Minimum academic score percentage"
                  aria-valuemin="65"
                  aria-valuemax="95"
                  aria-valuenow={minMarks}
                  onChange={(e) => setMinMarks(parseInt(e.target.value, 10))}
                  className="w-full accent-[var(--coral)] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-[var(--text-muted)] font-mono">
                  <span>65%</span>
                  <span>80%</span>
                  <span>95%</span>
                </div>
              </div>

              {/* Max Income Limit */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold uppercase tracking-wider text-[var(--text-muted)] font-sans">
                    Max Income Cap
                  </span>
                  <span className="font-mono font-bold text-[var(--primary)]">
                    ${(maxIncome / 1000).toFixed(0)}k
                  </span>
                </div>
                <input
                  type="range"
                  min="50000"
                  max="200000"
                  step="25000"
                  value={maxIncome}
                  aria-label="Maximum household income cap in USD"
                  aria-valuemin="50000"
                  aria-valuemax="200000"
                  aria-valuenow={maxIncome}
                  onChange={(e) => setMaxIncome(parseInt(e.target.value, 10))}
                  className="w-full accent-[var(--coral)] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-[var(--text-muted)] font-mono">
                  <span>$50k</span>
                  <span>$125k</span>
                  <span>$200k+</span>
                </div>
              </div>
            </BaseCard>
          </div>

          {/* RESULTS AREA */}
          <div className="lg:col-span-9 space-y-6">
            {/* Top Bar: Search Bar & Sort Dropdown */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between p-4 rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] grantly-card-shadow">
              <div className="w-full sm:w-96">
                <SearchInput
                  placeholder="Search by grant name, course or keyword..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="flex items-center justify-between w-full sm:w-auto gap-3">
                {/* Mobile Filter Toggle */}
                <Button
                  variant="outline"
                  size="sm"
                  className="lg:hidden"
                  icon={Filter}
                  onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
                >
                  Filters
                </Button>

                <div className="flex items-center gap-2 text-xs font-semibold text-[var(--text-secondary)]">
                  <label htmlFor="sort-scholarships" className="whitespace-nowrap">Sort By:</label>
                  <select
                    id="sort-scholarships"
                    value={sortBy}
                    aria-label="Sort scholarships"
                    onChange={(e) => setSortBy(e.target.value)}
                    className="rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] p-2 text-xs font-semibold text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--coral)]/25 cursor-pointer"
                  >
                    <option value="highest_award">Highest Award ($)</option>
                    <option value="lowest_award">Lowest Award ($)</option>
                    <option value="nearest_deadline">Nearest Deadline</option>
                    <option value="latest_deadline">Latest Deadline</option>
                    <option value="relevance">Relevance / Match</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Results Summary Bar & Screen Reader Announcement */}
            <div role="status" aria-live="polite" className="sr-only">
              Showing {displayedList.length} of {sortedScholarships.length} scholarships matching your search criteria
            </div>

            <div className="flex items-center justify-between text-xs text-[var(--text-muted)] px-1">
              <span>
                Showing <strong className="text-[var(--text-primary)]">{displayedList.length}</strong> of{' '}
                <strong className="text-[var(--text-primary)]">{sortedScholarships.length}</strong> grants found
              </span>
              {(searchTerm || selectedCategory !== 'All' || selectedEducation !== 'All') && (
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="font-bold text-[var(--primary)] hover:underline cursor-pointer"
                >
                  Clear All Active Filters
                </button>
              )}
            </div>

            {/* Scholarship Cards Grid */}
            {displayedList.length === 0 ? (
              <EmptyState
                icon={Search}
                title="No scholarships found"
                description="No opportunities currently match your specific criteria. Try loosening your income threshold, academic score, or resetting filters."
                actionLabel="Reset All Filters"
                onAction={handleResetFilters}
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence mode="popLayout">
                  {displayedList.map((item) => {
                    const isSaved = isScholarshipSaved(item.id);
                    const deadline = getDaysRemaining(item.deadline);
                    const isCompared = compareIds.includes(item.id);

                    return (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.96 }}
                        transition={{ duration: 0.3 }}
                      >
                        <BaseCard hover className={`h-full flex flex-col justify-between p-6 ${isCompared ? 'ring-2 ring-[var(--coral)]' : ''}`}>
                          <div>
                            <CardHeader className="mb-3">
                              <Badge variant="coral" size="sm">
                                {item.category}
                              </Badge>

                              <div className="flex items-center gap-1.5">
                                {/* Compare Toggle Button */}
                                <button
                                  type="button"
                                  onClick={() => toggleCompare(item.id)}
                                  className={`p-1.5 rounded-[var(--radius-sm)] text-[11px] font-bold border transition-colors cursor-pointer flex items-center gap-1 ${
                                    isCompared
                                      ? 'bg-[var(--primary)] text-white border-[var(--primary)]'
                                      : 'border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--primary)] hover:bg-[var(--peach-tint)]'
                                  }`}
                                  title={isCompared ? 'Remove from compare' : 'Add to side-by-side comparison'}
                                  aria-label={isCompared ? `Remove ${item.title} from comparison` : `Add ${item.title} to comparison`}
                                >
                                  <ArrowLeftRight className="h-3 w-3" />
                                  <span className="hidden sm:inline">{isCompared ? 'Selected' : 'Compare'}</span>
                                </button>

                                {/* Bookmark Button */}
                                <button
                                  type="button"
                                  onClick={() => toggleSaveScholarship(item.id)}
                                  className="p-1.5 rounded-[var(--radius-sm)] text-[var(--text-muted)] hover:text-[var(--primary)] hover:bg-[var(--peach-tint)] transition-colors cursor-pointer"
                                  title={isSaved ? 'Remove from saved' : 'Save scholarship'}
                                  aria-label={isSaved ? `Remove ${item.title} from saved` : `Save ${item.title} to bookmarks`}
                                >
                                  {isSaved ? (
                                    <BookmarkCheck className="h-5 w-5 text-[var(--primary)] fill-[var(--primary)]" />
                                  ) : (
                                    <Bookmark className="h-5 w-5" />
                                  )}
                                </button>
                              </div>
                            </CardHeader>

                            <Link to={ROUTES.SCHOLARSHIP_DETAIL(item.id)}>
                              <CardTitle className="hover:text-[var(--primary)] transition-colors line-clamp-2">
                                {item.title}
                              </CardTitle>
                            </Link>
                            <p className="text-xs text-[var(--text-muted)] mt-1 font-medium">{item.provider}</p>

                            <div className="mt-4 flex items-baseline gap-2">
                              <span className="text-2xl font-extrabold text-[var(--text-primary)]">
                                {formatCurrency(item.awardAmount || item.amount)}
                              </span>
                              <span className="text-xs text-[var(--text-muted)]">direct grant</span>
                            </div>

                            <p className="mt-3 text-xs text-[var(--text-secondary)] line-clamp-2 leading-relaxed">
                              {item.description}
                            </p>

                            <div className="mt-4 pt-3 border-t border-[var(--border)] space-y-1.5 text-xs text-[var(--text-secondary)]">
                              <div className="flex items-center gap-1.5">
                                <GraduationCap className="h-3.5 w-3.5 text-[var(--text-muted)]" />
                                <span className="truncate">{item.educationLevel}</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span>Min Marks: <strong className="text-[var(--text-primary)]">{item.minimumMarks || 75}%+</strong></span>
                                <Badge variant={deadline.isUrgent ? 'danger' : 'peach'} size="sm">
                                  {deadline.label}
                                </Badge>
                              </div>
                            </div>
                          </div>

                          <CardFooter className="mt-5 pt-3">
                            <span className="text-xs font-bold text-[var(--primary)]">
                              Due {formatDate(item.deadline)}
                            </span>
                            <Link to={ROUTES.SCHOLARSHIP_DETAIL(item.id)}>
                              <OutlineButton size="sm">
                                View Details <ArrowRight className="h-3.5 w-3.5 ml-1" />
                              </OutlineButton>
                            </Link>
                          </CardFooter>
                        </BaseCard>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            )}

            {/* Load More Button */}
            {visibleCount < sortedScholarships.length && (
              <div className="text-center pt-8">
                <OutlineButton
                  onClick={() => setVisibleCount((prev) => prev + 6)}
                  size="md"
                >
                  Load More Opportunities ({sortedScholarships.length - visibleCount} remaining)
                </OutlineButton>
              </div>
            )}
          </div>
        </div>

        {/* FLOATING STICKY COMPARISON DOCK */}
        {compareIds.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-[var(--surface)] border border-[var(--border)] shadow-[var(--shadow-modal)] px-5 py-3 rounded-2xl flex items-center gap-4 max-w-lg w-full justify-between backdrop-blur-md"
          >
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[var(--peach-tint)] text-[var(--primary)] flex items-center justify-center font-bold text-xs">
                {compareIds.length}/3
              </div>
              <span className="text-xs font-bold text-[var(--text-primary)]">
                {compareIds.length} Grant{compareIds.length > 1 ? 's' : ''} Selected
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setCompareIds([])}
                className="text-xs font-semibold text-[var(--text-muted)] hover:text-[var(--danger)] cursor-pointer px-2 py-1"
              >
                Clear
              </button>
              <PrimaryButton size="sm" onClick={() => setCompareModalOpen(true)}>
                Compare Now <ArrowLeftRight className="h-3.5 w-3.5 ml-1" />
              </PrimaryButton>
            </div>
          </motion.div>
        )}

        {/* SIDE-BY-SIDE SCHOLARSHIP COMPARISON MODAL */}
        {compareModalOpen && (
          <Modal
            isOpen={true}
            onClose={() => setCompareModalOpen(false)}
            title="Side-by-Side Scholarship Comparison"
            subtitle={`Comparing ${comparedScholarships.length} funding opportunities`}
            maxWidth="max-w-4xl"
          >
            <div className="space-y-6 overflow-x-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 min-w-[600px]">
                {comparedScholarships.map((grant) => {
                  const deadline = getDaysRemaining(grant.deadline);
                  const isTracked = isApplied(grant.id);

                  return (
                    <div
                      key={grant.id}
                      className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 space-y-4 shadow-sm flex flex-col justify-between"
                    >
                      <div className="space-y-3">
                        <Badge variant="coral" size="sm">{grant.category}</Badge>
                        <h4 className="font-heading font-bold text-sm text-[var(--text-primary)] line-clamp-2">
                          {grant.title}
                        </h4>
                        <p className="text-[11px] text-[var(--text-muted)]">{grant.provider}</p>

                        <div className="p-3 rounded-xl bg-[var(--peach-tint)] border border-[var(--border)]">
                          <span className="text-[10px] uppercase font-bold text-[var(--text-muted)]">Award Value</span>
                          <p className="font-heading text-xl font-extrabold text-[var(--primary)]">
                            {formatCurrency(grant.awardAmount || grant.amount)}
                          </p>
                        </div>

                        {/* Comparison Matrix Attributes */}
                        <div className="space-y-2 text-xs divide-y divide-[var(--border)] pt-1">
                          <div className="flex justify-between pt-2">
                            <span className="text-[var(--text-secondary)]">Min Academic:</span>
                            <span className="font-bold text-[var(--text-primary)]">{grant.minimumMarks || 75}%+</span>
                          </div>
                          <div className="flex justify-between pt-2">
                            <span className="text-[var(--text-secondary)]">Max Income Cap:</span>
                            <span className="font-bold text-[var(--text-primary)]">${((grant.maximumIncome || 150000) / 1000).toFixed(0)}k</span>
                          </div>
                          <div className="flex justify-between pt-2">
                            <span className="text-[var(--text-secondary)]">Target Cohort:</span>
                            <span className="font-bold text-[var(--text-primary)] truncate max-w-[140px] text-right">{grant.educationLevel}</span>
                          </div>
                          <div className="flex justify-between pt-2">
                            <span className="text-[var(--text-secondary)]">Doc Requirements:</span>
                            <span className="font-bold text-[var(--text-primary)]">{(grant.requiredDocuments || []).length} items</span>
                          </div>
                          <div className="flex justify-between pt-2">
                            <span className="text-[var(--text-secondary)]">Submission Cutoff:</span>
                            <span className="font-bold text-[var(--primary)]">{formatDate(grant.deadline)}</span>
                          </div>
                        </div>
                      </div>

                      {/* Comparison Actions */}
                      <div className="pt-3 border-t border-[var(--border)] space-y-2">
                        {isTracked ? (
                          <div className="text-center py-1 text-xs font-bold text-[var(--success)] flex items-center justify-center gap-1">
                            <CheckCircle2 className="h-3.5 w-3.5" /> In Pipeline Tracker
                          </div>
                        ) : (
                          <PrimaryButton
                            size="sm"
                            className="w-full text-xs"
                            onClick={() => {
                              addApplication(grant);
                            }}
                          >
                            + Add to Pipeline
                          </PrimaryButton>
                        )}

                        <Link to={ROUTES.SCHOLARSHIP_DETAIL(grant.id)} className="block">
                          <OutlineButton size="sm" className="w-full text-xs">
                            View Grant Specs
                          </OutlineButton>
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-end pt-3 border-t border-[var(--border)]">
                <SecondaryButton size="sm" onClick={() => setCompareModalOpen(false)}>
                  Close Comparison
                </SecondaryButton>
              </div>
            </div>
          </Modal>
        )}
      </FadeIn>
    </AmbientBackground>
  );
};

export default ExplorePage;
