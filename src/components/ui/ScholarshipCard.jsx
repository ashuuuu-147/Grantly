import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Bookmark, Calendar, ArrowRight, Award, GraduationCap, CheckCircle2, Plus } from 'lucide-react';
import { Badge } from './Badge';
import { SecondaryButton } from './Button';
import { useAppContext } from '../../context/AppContext';
import { formatCurrency, getDaysRemaining } from '../../utils/formatters';

/**
 * ScholarshipCard Component
 * Implements hover lift, subtle 3D tilt, border highlights, animated bookmark,
 * and responsive accessible actions.
 */
export const ScholarshipCard = ({ scholarship, matchScore = null, className = '' }) => {
  const navigate = useNavigate();
  const { isSaved, toggleSave, isApplied, addApplication } = useAppContext();
  const saved = scholarship ? isSaved(scholarship.id) : false;
  const applied = scholarship ? isApplied(scholarship.id) : false;

  const title = scholarship?.title || scholarship?.name || 'Scholarship Opportunity';
  const amount = scholarship?.awardAmount || scholarship?.amount || 0;
  const deadlineInfo = getDaysRemaining(scholarship?.deadline);
  const isUrgent = deadlineInfo.isUrgent;

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const isFinePointer =
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  const handleMouseMove = (e) => {
    if (!isFinePointer) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleApplyNow = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!applied && scholarship) {
      addApplication(scholarship);
    }
    navigate('/applications');
  };

  if (!scholarship) return null;

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setMousePos({ x: 0, y: 0 });
      }}
      animate={{
        rotateY: isHovered && isFinePointer ? mousePos.x * 6 : 0,
        rotateX: isHovered && isFinePointer ? -mousePos.y * 6 : 0,
        y: isHovered ? -5 : 0,
      }}
      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
      style={{ perspective: 1000 }}
      className={`group relative flex flex-col justify-between rounded-[var(--radius-xl)] glass-card p-6 transition-all duration-300 hover:border-[var(--coral)] hover:shadow-[var(--shadow-hover)] ${className}`}
    >
      <div>
        {/* Top Header: Category, Match Score, Bookmark */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex flex-wrap items-center gap-1.5">
            <Badge variant="peach" size="sm" className="font-semibold">
              {scholarship.category}
            </Badge>
            <Badge variant="outline" size="sm" className="flex items-center gap-1">
              <GraduationCap className="w-3 h-3 text-[var(--coral)]" aria-hidden="true" />
              {scholarship.educationLevel}
            </Badge>
            {matchScore && (
              <Badge variant="gold" size="sm" className="font-bold">
                {matchScore}% Match
              </Badge>
            )}
          </div>

          <motion.button
            type="button"
            whileHover={{ scale: 1.14 }}
            whileTap={{ scale: 0.85 }}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleSave(scholarship.id);
            }}
            aria-pressed={saved}
            aria-label={saved ? `Remove ${title} from saved` : `Save ${title} to bookmarks`}
            className={`p-2 rounded-full border transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--coral)] ${
              saved
                ? 'bg-[var(--coral)] border-[var(--coral)] text-white shadow-sm'
                : 'bg-[var(--peach-tint)] border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--coral)] hover:border-[var(--coral)]'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${saved ? 'fill-current' : ''}`} aria-hidden="true" />
          </motion.button>
        </div>

        {/* Title and Provider */}
        <Link
          to={`/scholarship/${scholarship.id}`}
          className="block group-hover:text-[var(--primary)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--coral)] rounded"
        >
          <h3 className="heading-card text-[18px] md:text-[20px] text-[var(--text-primary)] leading-snug line-clamp-2 mb-1.5">
            {title}
          </h3>
        </Link>
        <p className="text-[13px] text-[var(--text-secondary)] mb-4 flex items-center gap-1.5 font-body">
          <Award className="w-3.5 h-3.5 text-[var(--coral)] flex-shrink-0" aria-hidden="true" />
          <span className="truncate">{scholarship.provider}</span>
        </p>

        {/* Award and Deadline Info */}
        <div className="grid grid-cols-2 gap-2 p-3 rounded-[var(--radius-md)] bg-[var(--peach-tint)] border border-[var(--border)] mb-4">
          <div>
            <span className="block text-[11px] font-semibold text-[var(--text-muted)] uppercase tracking-wider font-body">
              Award Amount
            </span>
            <span className="font-heading font-extrabold text-[17px] md:text-[18px] text-[var(--primary)] tabular-nums">
              {formatCurrency(amount)}
            </span>
          </div>
          <div>
            <span className="block text-[11px] font-semibold text-[var(--text-muted)] uppercase tracking-wider font-body">
              Deadline
            </span>
            <div className="flex items-center gap-1 text-[13px] font-semibold text-[var(--text-primary)] font-body">
              <Calendar className="w-3.5 h-3.5 text-[var(--coral)] flex-shrink-0" aria-hidden="true" />
              <span className={`tabular-nums ${isUrgent ? 'text-[var(--danger)] font-bold' : ''}`}>
                {scholarship.deadline}
              </span>
            </div>
          </div>
        </div>

        {/* Eligibility Highlights */}
        {scholarship.eligibilityHighlights && (
          <ul className="space-y-1.5 mb-5 text-[13px] text-[var(--text-secondary)] font-body">
            {scholarship.eligibilityHighlights.slice(0, 2).map((highlight, idx) => (
              <li key={idx} className="flex items-start gap-1.5 line-clamp-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-[var(--success)] flex-shrink-0 mt-0.5" aria-hidden="true" />
                <span className="truncate">{highlight}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Action Footer */}
      <div className="pt-3 border-t border-[var(--border)] flex items-center justify-between gap-2 mt-auto">
        <Link
          to={`/scholarship/${scholarship.id}`}
          className="text-xs font-semibold text-[var(--text-primary)] hover:text-[var(--primary)] flex items-center gap-1 transition-colors group-hover:translate-x-0.5 duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--coral)] rounded"
        >
          View Details
          <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
        </Link>

        {applied ? (
          <span className="text-xs font-semibold text-[var(--success)] flex items-center gap-1 px-2.5 py-1 rounded-full bg-[var(--peach-tint)]">
            <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
            In Tracker
          </span>
        ) : (
          <SecondaryButton
            size="sm"
            onClick={handleApplyNow}
            className="text-xs py-1.5 px-3 flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" aria-hidden="true" />
            Track
          </SecondaryButton>
        )}
      </div>
    </motion.div>
  );
};

export default ScholarshipCard;
