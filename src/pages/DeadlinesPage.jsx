import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Calendar as CalendarIcon,
  Clock,
  AlertCircle,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  List,
  CalendarDays,
  DollarSign,
  Info,
  CheckCircle2,
  Download,
} from 'lucide-react';
import {
  BaseCard,
  CardHeader,
  CardTitle,
  PrimaryButton,
  OutlineButton,
  Badge,
} from '../components/ui';
import FadeIn from '../components/animations/FadeIn';
import { useApp } from '../context/AppContext';
import { formatCurrency, formatDate, getDaysRemaining } from '../utils/formatters';
import { ROUTES } from '../utils/constants';
import { exportAllDeadlinesToICS, exportScholarshipToICS } from '../utils/calendarExport';
import AmbientBackground from '../components/common/AmbientBackground';

export const DeadlinesPage = () => {
  const { scholarships, applications, addToast } = useApp();
  const [viewMode, setViewMode] = useState('list'); // 'list' | 'calendar'
  const [currentMonthOffset, setCurrentMonthOffset] = useState(0);

  // Reference date: November 2026
  const baseDate = new Date(2026, 10 + currentMonthOffset, 1);
  const currentMonthName = baseDate.toLocaleString('en-US', { month: 'long', year: 'numeric' });

  // Sorted list of all deadlines
  const sortedScholarships = [...scholarships].sort(
    (a, b) => new Date(a.deadline) - new Date(b.deadline)
  );

  // Get application status for each scholarship
  const getAppStatus = (schId) => {
    const found = applications.find((a) => a.scholarshipId === schId || a.id === schId);
    return found ? found.status : 'Not Started';
  };

  // Calendar days generation for monthly grid
  const daysInMonth = new Date(baseDate.getFullYear(), baseDate.getMonth() + 1, 0).getDate();
  const firstDayOfWeek = new Date(baseDate.getFullYear(), baseDate.getMonth(), 1).getDay();

  return (
    <AmbientBackground variant="minimal">
      <FadeIn className="space-y-8 pb-20">
        {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[var(--border)]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="warning">
              <Clock className="h-3 w-3 mr-1" /> Deadline Intelligence
            </Badge>
            <span className="text-xs text-[var(--text-muted)] font-mono">
              {scholarships.length} Milestones Scheduled
            </span>
          </div>
          <h1 className="heading-page text-2xl sm:text-3xl text-[var(--text-primary)]">
            Scholarship Deadline Planner
          </h1>
          <p className="text-sm text-[var(--text-secondary)] mt-0.5">
            Track upcoming submission cutoffs, early decision rounds, and document deadlines in one timeline.
          </p>
        </div>

        {/* Actions & View Mode Toggle */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Export to .ics action */}
          <button
            onClick={() => {
              exportAllDeadlinesToICS(scholarships);
              addToast('Calendar Exported', 'All 18 deadlines downloaded as iCalendar (.ics) file.', 'success');
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-[var(--peach-tint)] hover:bg-[var(--surface-secondary)] text-[var(--primary)] border border-[var(--border)] transition-colors cursor-pointer"
            title="Export to Apple / Google / Outlook Calendar"
          >
            <Download className="h-3.5 w-3.5 text-[var(--coral)]" />
            <span>Export (.ics)</span>
          </button>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-1 p-1 rounded-full bg-[var(--surface-secondary)]/50 border border-[var(--border)]">
            <button
              onClick={() => setViewMode('list')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
                viewMode === 'list'
                  ? 'bg-[var(--primary)] text-white shadow-xs'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              <List className="h-3.5 w-3.5" />
              <span>List</span>
            </button>
            <button
              onClick={() => setViewMode('calendar')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
                viewMode === 'calendar'
                  ? 'bg-[var(--primary)] text-white shadow-xs'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              <CalendarDays className="h-3.5 w-3.5" />
              <span>Calendar</span>
            </button>
          </div>
        </div>
      </div>

      {/* Browser Notification Disclaimer */}
      <div className="p-4 rounded-[var(--radius-lg)] bg-[var(--surface-secondary)]/40 border border-[var(--border)] text-xs text-[var(--text-secondary)] flex items-start gap-3">
        <Info className="h-4 w-4 text-[var(--coral)] shrink-0 mt-0.5" />
        <div>
          <strong className="text-[var(--text-primary)]">Browser Environment Notice:</strong>
          <p className="mt-0.5">
            Deadlines displayed are sample demonstration milestones. Client-side browser alerts do not trigger background operating system notifications when this browser tab is closed. We recommend syncing critical deadlines to your personal calendar.
          </p>
        </div>
      </div>

      {/* CHRONOLOGICAL LIST VIEW */}
      {viewMode === 'list' && (
        <div className="space-y-4">
          {sortedScholarships.map((item) => {
            const deadline = getDaysRemaining(item.deadline);
            const status = getAppStatus(item.id);

            return (
              <BaseCard key={item.id} hover className="p-5 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
                  <div className="flex items-start gap-4">
                    {/* Date Block */}
                    <div className="flex flex-col items-center justify-center h-14 w-14 rounded-[var(--radius-md)] bg-[var(--peach-tint)] text-[var(--primary)] font-bold border border-[var(--border)] shrink-0 font-heading">
                      <span className="text-[10px] uppercase font-semibold">
                        {new Date(item.deadline).toLocaleString('en-US', { month: 'short' })}
                      </span>
                      <span className="text-xl leading-tight font-extrabold tabular-nums">
                        {new Date(item.deadline).getDate()}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge variant={deadline.isUrgent ? 'danger' : 'coral'} size="sm">
                          {deadline.label}
                        </Badge>
                        <Badge variant="peach" size="sm">{item.category}</Badge>
                        <span className="text-xs text-[var(--text-muted)] font-mono">
                          Status: <strong className="text-[var(--text-primary)]">{status}</strong>
                        </span>
                      </div>

                      <Link to={ROUTES.SCHOLARSHIP_DETAIL(item.id)}>
                        <h3 className="heading-card text-base text-[var(--text-primary)] hover:text-[var(--primary)] transition-colors">
                          {item.title}
                        </h3>
                      </Link>
                      <p className="text-xs text-[var(--text-muted)]">{item.provider}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-6 shrink-0 pt-3 sm:pt-0 border-t sm:border-t-0 border-[var(--border)]">
                    <div className="text-right">
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--text-muted)] font-body">
                        Award Amount
                      </span>
                      <p className="font-heading text-lg font-extrabold text-[var(--primary)] tabular-nums">
                        {formatCurrency(item.awardAmount || item.amount)}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          exportScholarshipToICS(item);
                          addToast('Event Exported', `Downloaded calendar reminder for ${item.title}.`, 'success');
                        }}
                        className="p-2 rounded-full border border-[var(--border)] bg-[var(--peach-tint)] hover:bg-[var(--surface-secondary)] text-[var(--primary)] transition-colors cursor-pointer"
                        title="Export to Calendar (.ics)"
                        aria-label="Export deadline to calendar"
                      >
                        <Download className="h-3.5 w-3.5" />
                      </button>

                      <Link to={ROUTES.SCHOLARSHIP_DETAIL(item.id)}>
                        <OutlineButton size="sm">
                          View Details <ArrowRight className="h-3.5 w-3.5 ml-1" />
                        </OutlineButton>
                      </Link>
                    </div>
                  </div>
                </div>
              </BaseCard>
            );
          })}
        </div>
      )}

      {/* MONTHLY CALENDAR GRID VIEW */}
      {viewMode === 'calendar' && (
        <BaseCard className="p-6 space-y-6">
          {/* Month Navigation */}
          <div className="flex items-center justify-between pb-4 border-b border-[var(--border)]">
            <h3 className="heading-card text-lg text-[var(--text-primary)]">
              {currentMonthName}
            </h3>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentMonthOffset((prev) => prev - 1)}
                className="p-2 rounded-[var(--radius-md)] border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-secondary)] cursor-pointer"
                title="Previous Month"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={() => setCurrentMonthOffset(0)}
                className="px-3 py-1.5 rounded-[var(--radius-md)] border border-[var(--border)] text-xs font-semibold text-[var(--text-primary)] hover:bg-[var(--surface-secondary)] cursor-pointer"
              >
                Today
              </button>
              <button
                onClick={() => setCurrentMonthOffset((prev) => prev + 1)}
                className="p-2 rounded-[var(--radius-md)] border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-secondary)] cursor-pointer"
                title="Next Month"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Calendar Table */}
          <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold text-[var(--text-muted)] font-sans pb-2">
            <span>Sun</span>
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
          </div>

          <div className="grid grid-cols-7 gap-2">
            {/* Blank leading days */}
            {Array.from({ length: firstDayOfWeek }).map((_, i) => (
              <div
                key={`empty-${i}`}
                className="min-h-[90px] rounded-[var(--radius-md)] bg-[var(--surface-secondary)]/20 border border-dashed border-[var(--border)]/40 p-1"
              />
            ))}

            {/* Actual Month Days */}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const dayNum = i + 1;
              const dateStr = `${baseDate.getFullYear()}-${String(baseDate.getMonth() + 1).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`;
              const matchingGrants = scholarships.filter((s) => s.deadline === dateStr);

              return (
                <div
                  key={dayNum}
                  className={`min-h-[90px] rounded-[var(--radius-md)] border p-2 text-left flex flex-col justify-between transition-colors ${
                    matchingGrants.length > 0
                      ? 'border-[var(--primary)] bg-[var(--peach-tint)]/40'
                      : 'border-[var(--border)] bg-[var(--surface)]'
                  }`}
                >
                  <span className={`text-xs font-mono font-bold ${matchingGrants.length > 0 ? 'text-[var(--primary)]' : 'text-[var(--text-muted)]'}`}>
                    {dayNum}
                  </span>

                  {matchingGrants.length > 0 && (
                    <div className="space-y-1 mt-1">
                      {matchingGrants.map((g) => (
                        <Link
                          key={g.id}
                          to={ROUTES.SCHOLARSHIP_DETAIL(g.id)}
                          className="block text-[10px] font-bold p-1 rounded bg-[var(--primary)] text-white truncate hover:opacity-90"
                          title={g.title}
                        >
                          {g.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </BaseCard>
      )}
      </FadeIn>
    </AmbientBackground>
  );
};

export default DeadlinesPage;
