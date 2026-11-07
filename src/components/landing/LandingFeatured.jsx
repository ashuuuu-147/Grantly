import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bookmark,
  BookmarkCheck,
  Calendar,
  GraduationCap,
  ArrowRight,
  Compass,
} from 'lucide-react';
import {
  BaseCard,
  CardHeader,
  CardTitle,
  CardFooter,
  PrimaryButton,
  OutlineButton,
  Badge,
} from '../ui';
import { useApp } from '../../context/AppContext';
import { formatCurrency, formatDate, getDaysRemaining } from '../../utils/formatters';
import { ROUTES } from '../../utils/constants';

export const LandingFeatured = () => {
  const { scholarships, isScholarshipSaved, toggleSaveScholarship } = useApp();
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'STEM & Research', 'Merit-Based', 'Women in Tech', 'Need-Based'];

  const filtered = scholarships
    .filter((s) => activeCategory === 'All' || s.category === activeCategory)
    .slice(0, 6);

  return (
    <section className="py-20 sm:py-28 bg-[var(--surface-secondary)]/20 border-b border-[var(--border)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <Badge variant="coral">Curated Opportunities</Badge>
            <h2 className="heading-section text-[var(--text-primary)]">
              Featured Scholarships & Fellowships
            </h2>
            <p className="text-body text-[var(--text-secondary)] max-w-xl">
              High-value programs currently accepting application packets across undergraduate, graduate, and doctoral cohorts.
            </p>
          </div>

          <Link to={ROUTES.EXPLORE}>
            <OutlineButton icon={Compass}>
              View All {scholarships.length} Scholarships
            </OutlineButton>
          </Link>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-[var(--radius-pill)] text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[var(--primary)] text-white shadow-sm shadow-[var(--coral)]/30'
                  : 'bg-[var(--surface)] text-[var(--text-secondary)] border border-[var(--border)] hover:bg-[var(--surface-secondary)]/60'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Scholarships Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((item) => {
              const isSaved = isScholarshipSaved(item.id);
              const deadline = getDaysRemaining(item.deadline);

              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <BaseCard hover className="h-full flex flex-col justify-between p-6 glass-card">
                    <div>
                      {/* Card Header with Category & Bookmark */}
                      <CardHeader className="mb-3">
                        <Badge variant="coral" size="sm">
                          {item.category}
                        </Badge>
                        <button
                          onClick={() => toggleSaveScholarship(item.id)}
                          className="p-1.5 rounded-[var(--radius-sm)] text-[var(--text-muted)] hover:text-[var(--primary)] hover:bg-[var(--peach-tint)] transition-colors cursor-pointer"
                          title={isSaved ? 'Remove from saved' : 'Save scholarship'}
                          aria-label={isSaved ? 'Remove from saved' : 'Save scholarship'}
                        >
                          {isSaved ? (
                            <BookmarkCheck className="h-5 w-5 text-[var(--primary)] fill-[var(--primary)]" />
                          ) : (
                            <Bookmark className="h-5 w-5" />
                          )}
                        </button>
                      </CardHeader>

                      <Link to={ROUTES.SCHOLARSHIP_DETAIL(item.id)}>
                        <CardTitle className="hover:text-[var(--primary)] transition-colors line-clamp-2">
                          {item.title}
                        </CardTitle>
                      </Link>
                      <p className="text-xs text-[var(--text-muted)] mt-1 font-medium">{item.provider}</p>

                      {/* Award Amount */}
                      <div className="mt-4 flex items-baseline gap-2">
                        <span className="text-2xl font-extrabold text-[var(--text-primary)]">
                          {formatCurrency(item.awardAmount || item.amount)}
                        </span>
                        <span className="text-xs text-[var(--text-muted)]">direct grant</span>
                      </div>

                      {/* Education level & GPA Requirement */}
                      <div className="mt-4 pt-3 border-t border-[var(--border)] space-y-1.5 text-xs text-[var(--text-secondary)]">
                        <div className="flex items-center gap-1.5">
                          <GraduationCap className="h-3.5 w-3.5 text-[var(--text-muted)]" />
                          <span>{item.educationLevel}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[var(--text-muted)]">Minimum Academic Score:</span>
                          <strong className="text-[var(--text-primary)]">{item.minimumMarks || 80}%+</strong>
                        </div>
                      </div>
                    </div>

                    <CardFooter className="mt-5 pt-3">
                      <div className="flex items-center gap-1 text-xs text-[var(--text-secondary)]">
                        <Calendar className="h-3 w-3 text-[var(--text-muted)]" />
                        <span>Due {formatDate(item.deadline)}</span>
                      </div>

                      <Link to={ROUTES.SCHOLARSHIP_DETAIL(item.id)}>
                        <OutlineButton size="sm">
                          View Details <ArrowRight className="h-3 w-3 ml-1" />
                        </OutlineButton>
                      </Link>
                    </CardFooter>
                  </BaseCard>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default LandingFeatured;

