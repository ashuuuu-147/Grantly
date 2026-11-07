import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, AlertCircle, XCircle, ArrowRight, Bookmark, Plus, Award } from 'lucide-react';
import { Badge } from './Badge';
import { SecondaryButton } from './Button';
import { useAppContext } from '../../context/AppContext';
import { formatCurrency } from '../../utils/formatters';

export const EligibilityResultCard = ({ result, className = '' }) => {
  const navigate = useNavigate();
  const { isSaved, toggleSave, isApplied, addApplication } = useAppContext();
  const { scholarship, status, reasons, matchScore } = result;

  const title = scholarship.title || scholarship.name || 'Scholarship Opportunity';
  const amount = scholarship.awardAmount || scholarship.amount || 0;
  const saved = isSaved(scholarship.id);
  const applied = isApplied(scholarship.id);

  const getStatusBadge = () => {
    switch (status) {
      case 'MATCH':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[var(--peach-tint)] text-[var(--success)] border border-[var(--border)]">
            <CheckCircle2 className="w-3.5 h-3.5 text-[var(--success)]" />
            Direct Match ({matchScore}%)
          </span>
        );
      case 'POSSIBLE_MATCH':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[var(--peach-tint)] text-[var(--warning)] border border-[var(--border)]">
            <AlertCircle className="w-3.5 h-3.5 text-[var(--warning)]" />
            Possible Match ({matchScore}%)
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[var(--peach-tint)] text-[var(--text-muted)] border border-[var(--border)]">
            <XCircle className="w-3.5 h-3.5 text-[var(--text-muted)]" />
            Not Currently Matching
          </span>
        );
    }
  };

  const handleTrack = (e) => {
    e.preventDefault();
    if (!applied) {
      addApplication(scholarship.id);
    }
    navigate('/applications');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface)] p-6 transition-all duration-200 hover:border-[var(--coral)] hover:shadow-[var(--shadow-hover)] flex flex-col justify-between ${className}`}
    >
      <div>
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex flex-wrap items-center gap-2">
            {getStatusBadge()}
            <Badge variant="outline" size="sm">
              {scholarship.category}
            </Badge>
          </div>

          <button
            onClick={() => toggleSave(scholarship.id)}
            className={`p-2 rounded-full border transition-colors ${
              saved
                ? 'bg-[var(--coral)] border-[var(--coral)] text-white'
                : 'bg-[var(--peach-tint)] border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--coral)]'
            }`}
            aria-label="Save scholarship"
          >
            <Bookmark className={`w-4 h-4 ${saved ? 'fill-current' : ''}`} />
          </button>
        </div>

        <Link to={`/scholarship/${scholarship.id}`} className="block group">
          <h3 className="font-heading font-bold text-lg text-[var(--text-primary)] group-hover:text-[var(--primary)] transition-colors mb-1 line-clamp-2">
            {title}
          </h3>
        </Link>
        <p className="text-xs text-[var(--text-secondary)] mb-4 flex items-center gap-1.5">
          <Award className="w-3.5 h-3.5 text-[var(--coral)]" />
          {scholarship.provider} • <span className="font-bold text-[var(--primary)]">{formatCurrency(amount)}</span>
        </p>

        {/* Criteria Breakdown */}
        <div className="space-y-1.5 mb-5 bg-[var(--peach-tint)]/60 rounded-[var(--radius-md)] p-3 border border-[var(--border)]">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)] block mb-1">
            Matching Analysis
          </span>
          {reasons && reasons.map((reason, idx) => (
            <div key={idx} className="flex items-start gap-1.5 text-xs text-[var(--text-primary)]">
              {status === 'MATCH' ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-[var(--success)] flex-shrink-0 mt-0.5" />
              ) : status === 'POSSIBLE_MATCH' ? (
                <AlertCircle className="w-3.5 h-3.5 text-[var(--warning)] flex-shrink-0 mt-0.5" />
              ) : (
                <XCircle className="w-3.5 h-3.5 text-[var(--danger)] flex-shrink-0 mt-0.5" />
              )}
              <span>{reason}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-3 border-t border-[var(--border)] flex items-center justify-between gap-3 mt-auto">
        <Link
          to={`/scholarship/${scholarship.id}`}
          className="text-xs font-semibold text-[var(--text-primary)] hover:text-[var(--primary)] flex items-center gap-1 transition-colors"
        >
          View Full Requirements
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>

        {applied ? (
          <span className="text-xs font-semibold text-[var(--success)] flex items-center gap-1 px-3 py-1 rounded-full bg-[var(--peach-tint)]">
            <CheckCircle2 className="w-3.5 h-3.5" />
            In Tracker
          </span>
        ) : (
          <SecondaryButton size="sm" onClick={handleTrack} className="text-xs py-1.5 px-3 flex items-center gap-1">
            <Plus className="w-3.5 h-3.5" />
            Track Opportunity
          </SecondaryButton>
        )}
      </div>
    </motion.div>
  );
};

export default EligibilityResultCard;
