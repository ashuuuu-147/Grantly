import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookmarkCheck,
  Bookmark,
  Trash2,
  ArrowRight,
  Compass,
  Search,
  Calendar,
  DollarSign,
  GraduationCap,
  PlusCircle,
} from 'lucide-react';
import {
  BaseCard,
  CardHeader,
  CardTitle,
  CardFooter,
  PrimaryButton,
  OutlineButton,
  Badge,
  SearchInput,
  EmptyState,
} from '../components/ui';
import FadeIn from '../components/animations/FadeIn';
import { useApp } from '../context/AppContext';
import { formatCurrency, formatDate, getDaysRemaining } from '../utils/formatters';
import { ROUTES } from '../utils/constants';
import AmbientBackground from '../components/common/AmbientBackground';

export const SavedPage = () => {
  const { scholarships, savedIds, toggleSaveScholarship, addApplication, applications } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const savedList = scholarships.filter((s) => savedIds.includes(s.id));

  const filteredSaved = savedList.filter((item) => {
    const q = searchTerm.toLowerCase().trim();
    if (!q) return true;
    return (
      item.title.toLowerCase().includes(q) ||
      item.provider.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q)
    );
  });

  const totalSavedValue = savedList.reduce(
    (sum, s) => sum + (s.awardAmount || s.amount || 0),
    0
  );

  return (
    <AmbientBackground variant="minimal">
      <FadeIn className="space-y-8 pb-20">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[var(--border)]">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="coral">Bookmarked Opportunities</Badge>
              <span className="text-xs text-[var(--text-muted)] font-mono">
                {savedList.length} Grants Saved
              </span>
            </div>
            <h1 className="heading-page text-2xl sm:text-3xl text-[var(--text-primary)]">
              Saved Scholarships
            </h1>
            <p className="text-sm text-[var(--text-secondary)] mt-0.5">
              Review and organize funding opportunities bookmarked for your current academic cycle.
            </p>
          </div>

          {savedList.length > 0 && (
            <div className="p-3.5 rounded-[var(--radius-lg)] bg-[var(--surface-secondary)]/50 border border-[var(--border)] text-right">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--text-muted)] font-body">
                Total Saved Potential
              </span>
              <p className="font-heading font-extrabold text-xl text-[var(--primary)] tabular-nums">
                {formatCurrency(totalSavedValue)}
              </p>
            </div>
          )}
        </div>

      {/* Search Bar for Saved Grants */}
      {savedList.length > 0 && (
        <div className="w-full sm:w-96">
          <SearchInput
            placeholder="Search saved grants..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      )}

      {/* List of Saved Scholarships */}
      {savedList.length === 0 ? (
        <EmptyState
          icon={Bookmark}
          title="No scholarships saved yet"
          description="Explore available funding opportunities across our catalog and tap the bookmark icon on any card to save it here for later review."
          actionLabel="Explore Scholarships"
          onAction={() => navigate(ROUTES.EXPLORE)}
        />
      ) : filteredSaved.length === 0 ? (
        <EmptyState
          icon={Search}
          title="No matching bookmarks"
          description={`No saved grants match your search "${searchTerm}".`}
          actionLabel="Clear Search"
          onAction={() => setSearchTerm('')}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredSaved.map((item) => {
              const deadline = getDaysRemaining(item.deadline);
              const isInTracker = applications.some(
                (a) => a.scholarshipId === item.id || a.id === item.id
              );

              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.25 }}
                >
                  <BaseCard hover className="h-full flex flex-col justify-between p-6">
                    <div>
                      <CardHeader className="mb-3">
                        <Badge variant="coral" size="sm">{item.category}</Badge>
                        <button
                          onClick={() => toggleSaveScholarship(item.id)}
                          className="p-1.5 rounded-[var(--radius-sm)] text-[var(--danger)] hover:bg-[#FDF0EF] transition-colors cursor-pointer"
                          title="Remove bookmark"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </CardHeader>

                      <Link to={ROUTES.SCHOLARSHIP_DETAIL(item.id)}>
                        <CardTitle className="hover:text-[var(--primary)] transition-colors line-clamp-2">
                          {item.title}
                        </CardTitle>
                      </Link>
                      <p className="text-xs text-[var(--text-muted)] mt-1 font-medium">{item.provider}</p>

                      <div className="mt-4 flex items-baseline gap-2">
                        <span className="font-heading text-2xl font-extrabold text-[var(--primary)] tabular-nums">
                          {formatCurrency(item.awardAmount || item.amount)}
                        </span>
                        <span className="text-xs text-[var(--text-muted)] font-body">award value</span>
                      </div>

                      <div className="mt-4 pt-3 border-t border-[var(--border)] space-y-1.5 text-xs text-[var(--text-secondary)]">
                        <div className="flex items-center gap-1.5">
                          <GraduationCap className="h-3.5 w-3.5 text-[var(--text-muted)]" />
                          <span>{item.educationLevel}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Due {formatDate(item.deadline)}</span>
                          <Badge variant={deadline.isUrgent ? 'danger' : 'peach'} size="sm">
                            {deadline.label}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <CardFooter className="mt-5 pt-3 flex items-center justify-between gap-2">
                      <button
                        onClick={() => addApplication(item)}
                        disabled={isInTracker}
                        className={`inline-flex items-center gap-1 text-xs font-bold transition-colors cursor-pointer ${
                          isInTracker
                            ? 'text-[var(--text-muted)] cursor-default'
                            : 'text-[var(--primary)] hover:underline'
                        }`}
                      >
                        <PlusCircle className="h-3.5 w-3.5" />
                        <span>{isInTracker ? 'In Tracker' : 'Add to Tracker'}</span>
                      </button>

                      <Link to={ROUTES.SCHOLARSHIP_DETAIL(item.id)}>
                        <OutlineButton size="sm">
                          Details <ArrowRight className="h-3 w-3 ml-1" />
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
      </FadeIn>
    </AmbientBackground>
  );
};

export default SavedPage;
