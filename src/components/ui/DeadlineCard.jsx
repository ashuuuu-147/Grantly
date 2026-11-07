import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, Calendar, ArrowRight, Award, CheckCircle2 } from 'lucide-react';
import { Badge } from './Badge';
import { PrimaryButton, SecondaryButton } from './Button';
import { useAppContext } from '../../context/AppContext';
import { formatCurrency, getDaysRemaining } from '../../utils/formatters';

export const DeadlineCard = ({ scholarship, urgency = 'normal', className = '' }) => {
  const navigate = useNavigate();
  const { isApplied, isSaved } = useAppContext();
  const daysLeft = getDaysRemaining(scholarship.deadline);
  const applied = isApplied(scholarship.id);
  const saved = isSaved(scholarship.id);
  const title = scholarship.title || scholarship.name || 'Scholarship Deadline';
  const amount = scholarship.awardAmount || scholarship.amount || 0;

  const getUrgencyStyles = () => {
    if (daysLeft < 0) {
      return {
        badgeVariant: 'outline',
        label: 'Passed',
        border: 'border-[var(--border)]',
      };
    }
    if (daysLeft <= 7) {
      return {
        badgeVariant: 'danger',
        label: `${daysLeft} days remaining`,
        border: 'border-[var(--danger)]/50 bg-[var(--danger)]/5',
      };
    }
    if (daysLeft <= 30) {
      return {
        badgeVariant: 'warning',
        label: `${daysLeft} days remaining`,
        border: 'border-[var(--warning)]/50 bg-[var(--warning)]/5',
      };
    }
    return {
      badgeVariant: 'peach',
      label: `${daysLeft} days remaining`,
      border: 'border-[var(--border)]',
    };
  };

  const urgencyStyle = getUrgencyStyles();

  return (
    <motion.div
      whileHover={{ y: -2 }}
      className={`rounded-[var(--radius-lg)] border p-5 bg-[var(--surface)] transition-all duration-200 flex flex-col md:flex-row md:items-center justify-between gap-4 ${urgencyStyle.border} ${className}`}
    >
      <div className="space-y-1.5 flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant={urgencyStyle.badgeVariant} size="sm" className="font-semibold flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {urgencyStyle.label}
          </Badge>
          <span className="text-xs text-[var(--text-secondary)] flex items-center gap-1 font-medium">
            <Calendar className="w-3.5 h-3.5 text-[var(--coral)]" />
            {scholarship.deadline}
          </span>
          {applied && (
            <Badge variant="success" size="sm" className="flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              Applied
            </Badge>
          )}
          {saved && !applied && (
            <Badge variant="outline" size="sm">
              Saved
            </Badge>
          )}
        </div>

        <Link to={`/scholarship/${scholarship.id}`} className="block group">
          <h4 className="font-heading font-bold text-base text-[var(--text-primary)] group-hover:text-[var(--primary)] transition-colors truncate">
            {title}
          </h4>
        </Link>

        <p className="text-xs text-[var(--text-secondary)] flex items-center gap-2">
          <span className="truncate">{scholarship.provider}</span>
          <span>•</span>
          <span className="font-bold text-[var(--primary)]">{formatCurrency(amount)}</span>
          <span>•</span>
          <span>{scholarship.educationLevel}</span>
        </p>
      </div>

      <div className="flex items-center gap-2 flex-shrink-0">
        <Link to={`/scholarship/${scholarship.id}`}>
          <SecondaryButton size="sm" className="text-xs">
            Details
          </SecondaryButton>
        </Link>
        {applied ? (
          <Link to="/applications">
            <PrimaryButton size="sm" className="text-xs flex items-center gap-1">
              Tracker
              <ArrowRight className="w-3.5 h-3.5" />
            </PrimaryButton>
          </Link>
        ) : (
          <Link to={`/scholarship/${scholarship.id}`}>
            <PrimaryButton size="sm" className="text-xs flex items-center gap-1">
              Prepare
              <ArrowRight className="w-3.5 h-3.5" />
            </PrimaryButton>
          </Link>
        )}
      </div>
    </motion.div>
  );
};

export default DeadlineCard;
