import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  CheckSquare,
  Square,
  Clock,
  ArrowRight,
  Trash2,
  Edit3,
  FileText,
  DollarSign,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  X,
  Layers,
  ChevronRight,
  Kanban,
  List,
  Sparkles,
} from 'lucide-react';
import {
  BaseCard,
  PrimaryButton,
  SecondaryButton,
  Button,
  Badge,
  ProgressBar,
  Modal,
  EmptyState,
} from '../components/ui';
import FadeIn from '../components/animations/FadeIn';
import { useApp } from '../context/AppContext';
import { formatCurrency, formatDate, getDaysRemaining } from '../utils/formatters';
import { ROUTES } from '../utils/constants';
import AmbientBackground from '../components/common/AmbientBackground';

export const ApplicationsPage = () => {
  const {
    applications,
    updateApplicationStatus,
    updateApplicationDocument,
    addApplicationCustomDocument,
    updateApplicationNotes,
    removeApplication,
  } = useApp();

  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState('kanban'); // 'kanban' | 'list'
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedAppId, setSelectedAppId] = useState(null);
  const selectedAppForDocs = applications.find((a) => a.id === selectedAppId) || null;
  const [editingNotesApp, setEditingNotesApp] = useState(null);
  const [notesDraft, setNotesDraft] = useState('');
  const [appToDelete, setAppToDelete] = useState(null);
  const [newDocName, setNewDocName] = useState('');

  const statuses = ['All', 'Saved', 'In Progress', 'Submitted', 'Approved', 'Rejected'];
  const kanbanColumns = [
    { key: 'Saved', label: 'Saved / Bookmarked', color: 'border-[var(--coral)]', badge: 'neutral' },
    { key: 'In Progress', label: 'In Progress', color: 'border-[var(--warning)]', badge: 'warning' },
    { key: 'Submitted', label: 'Submitted / Review', color: 'border-[var(--primary)]', badge: 'coral' },
    { key: 'Approved', label: 'Awarded / Approved', color: 'border-[var(--success)]', badge: 'success' },
    { key: 'Rejected', label: 'Archived / Not Won', color: 'border-[var(--text-muted)]', badge: 'neutral' },
  ];

  const filteredApps = applications.filter((app) => {
    if (activeFilter === 'All') return true;
    return app.status === activeFilter;
  });

  const handleOpenDocsModal = (app) => {
    setSelectedAppId(app.id);
    setNewDocName('');
  };

  const handleOpenNotesModal = (app) => {
    setEditingNotesApp(app);
    setNotesDraft(app.notes || '');
  };

  const handleSaveNotes = () => {
    if (editingNotesApp) {
      updateApplicationNotes(editingNotesApp.id, notesDraft);
      setEditingNotesApp(null);
    }
  };

  const handleConfirmDelete = () => {
    if (appToDelete) {
      removeApplication(appToDelete.id);
      setAppToDelete(null);
    }
  };

  const handleAddCustomDoc = (e) => {
    e.preventDefault();
    if (selectedAppForDocs && newDocName.trim()) {
      addApplicationCustomDocument(selectedAppForDocs.id, newDocName.trim());
      setNewDocName('');
    }
  };

  return (
    <AmbientBackground variant="applications">
      <FadeIn className="space-y-8 pb-20">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[var(--border)]">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="coral">Pipeline Workflow</Badge>
              <span className="text-xs text-[var(--text-muted)] font-mono">
                {applications.length} Grants Tracked
              </span>
            </div>
            <h1 className="heading-page text-2xl sm:text-3xl text-[var(--text-primary)]">
              Scholarship Application Pipeline
            </h1>
            <p className="text-sm text-[var(--text-secondary)] mt-0.5">
              Manage required documentation, track milestone checklists, and record personal application notes.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* View Mode Toggle: Kanban vs List */}
            <div
              role="radiogroup"
              aria-label="Application tracker view mode"
              className="flex items-center gap-1 p-1 rounded-full bg-[var(--surface-secondary)]/50 border border-[var(--border)]"
            >
              <button
                type="button"
                onClick={() => setViewMode('kanban')}
                aria-checked={viewMode === 'kanban'}
                role="radio"
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
                  viewMode === 'kanban'
                    ? 'bg-[var(--primary)] text-white shadow-xs'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                <Kanban className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Kanban</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('list')}
                aria-checked={viewMode === 'list'}
                role="radio"
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
                  viewMode === 'list'
                    ? 'bg-[var(--primary)] text-white shadow-xs'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                <List className="h-3.5 w-3.5" aria-hidden="true" />
                <span>List</span>
              </button>
            </div>

            <Link to={ROUTES.EXPLORE}>
              <PrimaryButton icon={Plus}>Add More Grants</PrimaryButton>
            </Link>
          </div>
        </div>

        {/* Filter Tabs (Visible in List View) */}
        {viewMode === 'list' && (
          <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-[var(--border)]">
            {statuses.map((status) => {
              const count =
                status === 'All'
                  ? applications.length
                  : applications.filter((a) => a.status === status).length;

              return (
                <button
                  key={status}
                  onClick={() => setActiveFilter(status)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-[var(--radius-md)] text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                    activeFilter === status
                      ? 'bg-[var(--primary)] text-white shadow-xs'
                      : 'bg-[var(--surface)] text-[var(--text-secondary)] border border-[var(--border)] hover:bg-[var(--surface-secondary)]/50'
                  }`}
                >
                  <span>{status}</span>
                  <span
                    className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                      activeFilter === status
                        ? 'bg-white/20 text-white'
                        : 'bg-[var(--surface-secondary)] text-[var(--text-muted)]'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {/* 1. KANBAN PIPELINE VIEW */}
        {viewMode === 'kanban' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-start overflow-x-auto pb-4">
            {kanbanColumns.map((col) => {
              const colApps = applications.filter((app) => app.status === col.key);
              const colFundingTotal = colApps.reduce((sum, a) => sum + (a.awardAmount || 0), 0);

              return (
                <div
                  key={col.key}
                  className="rounded-2xl border border-[var(--border)] bg-[var(--surface)]/70 backdrop-blur-sm p-3.5 space-y-3 min-w-[240px] shadow-xs"
                >
                  {/* Column Header */}
                  <div className="flex items-center justify-between pb-2 border-b border-[var(--border)]">
                    <div className="flex items-center gap-2">
                      <span className="font-heading font-bold text-xs text-[var(--text-primary)]">
                        {col.label}
                      </span>
                      <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-[var(--peach-tint)] text-[var(--primary)] tabular-nums">
                        {colApps.length}
                      </span>
                    </div>
                    {colFundingTotal > 0 && (
                      <span className="text-[10px] font-mono text-[var(--text-muted)] font-bold">
                        {formatCurrency(colFundingTotal)}
                      </span>
                    )}
                  </div>

                  {/* Column Cards */}
                  <div className="space-y-3 min-h-[140px]">
                    {colApps.length === 0 ? (
                      <div className="h-28 rounded-xl border border-dashed border-[var(--border)] flex flex-col items-center justify-center p-3 text-center text-[11px] text-[var(--text-muted)]">
                        <span>No grants in {col.key.toLowerCase()}</span>
                      </div>
                    ) : (
                      colApps.map((app) => {
                        const deadline = getDaysRemaining(app.deadline);
                        const docs = app.documents || [];
                        const completedCount = docs.filter((d) => d.completed).length;

                        return (
                          <motion.div
                            key={app.id}
                            layout
                            initial={{ opacity: 0, scale: 0.96 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.96 }}
                            className="p-4 rounded-xl bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--coral)] hover:shadow-md transition-all space-y-3 group"
                          >
                            <div>
                              <div className="flex items-center justify-between gap-1 mb-1">
                                <span className="font-mono text-[10px] font-extrabold text-[var(--primary)]">
                                  {formatCurrency(app.awardAmount || app.amount)}
                                </span>
                                <Badge variant={deadline.isUrgent ? 'danger' : 'peach'} size="sm">
                                  {deadline.label}
                                </Badge>
                              </div>

                              <Link to={ROUTES.SCHOLARSHIP_DETAIL(app.scholarshipId || app.id)}>
                                <h4 className="font-heading text-xs font-bold text-[var(--text-primary)] hover:text-[var(--primary)] transition-colors line-clamp-2 leading-snug">
                                  {app.title}
                                </h4>
                              </Link>
                              <p className="text-[10px] text-[var(--text-muted)] truncate mt-0.5">
                                {app.provider}
                              </p>
                            </div>

                            {/* Checklist Progress Bar */}
                            <div className="space-y-1">
                              <div className="flex items-center justify-between text-[10px] text-[var(--text-secondary)] font-medium">
                                <span>Checklist: {completedCount}/{docs.length}</span>
                                <span className="font-mono text-[var(--primary)] font-bold">{app.progress}%</span>
                              </div>
                              <div className="w-full h-1.5 rounded-full bg-[var(--surface-secondary)] overflow-hidden">
                                <div
                                  className="h-full bg-[var(--primary)] rounded-full transition-all"
                                  style={{ width: `${app.progress}%` }}
                                />
                              </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="pt-2 border-t border-[var(--border)] flex items-center justify-between gap-1 text-[11px]">
                              <button
                                type="button"
                                onClick={() => handleOpenDocsModal(app)}
                                className="inline-flex items-center gap-1 text-[var(--primary)] font-semibold hover:underline cursor-pointer"
                              >
                                <CheckSquare className="h-3 w-3" /> Docs
                              </button>

                              <button
                                type="button"
                                onClick={() => handleOpenNotesModal(app)}
                                className="inline-flex items-center gap-1 text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer"
                              >
                                <Edit3 className="h-3 w-3" /> Notes
                              </button>

                              {/* Advance Stage Shortcut */}
                              {col.key === 'Saved' && (
                                <button
                                  type="button"
                                  onClick={() => updateApplicationStatus(app.id, 'In Progress')}
                                  title="Move to In Progress"
                                  className="p-1 rounded text-[var(--text-muted)] hover:text-[var(--primary)] hover:bg-[var(--peach-tint)] cursor-pointer"
                                >
                                  <ArrowRight className="h-3.5 w-3.5" />
                                </button>
                              )}
                              {col.key === 'In Progress' && (
                                <button
                                  type="button"
                                  onClick={() => updateApplicationStatus(app.id, 'Submitted')}
                                  title="Mark as Submitted"
                                  className="p-1 rounded text-[var(--text-muted)] hover:text-[var(--success)] hover:bg-[#EAF5F0] cursor-pointer"
                                >
                                  <ArrowRight className="h-3.5 w-3.5" />
                                </button>
                              )}
                              {col.key === 'Submitted' && (
                                <button
                                  type="button"
                                  onClick={() => updateApplicationStatus(app.id, 'Approved')}
                                  title="Mark as Approved!"
                                  className="p-1 rounded text-[var(--text-muted)] hover:text-[var(--success)] hover:bg-[#EAF5F0] cursor-pointer"
                                >
                                  <CheckCircle2 className="h-3.5 w-3.5" />
                                </button>
                              )}
                            </div>
                          </motion.div>
                        );
                      })
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* 2. SEQUENTIAL LIST VIEW */
          filteredApps.length === 0 ? (
            <EmptyState
              icon={Layers}
              title={`No ${activeFilter !== 'All' ? activeFilter : ''} applications in tracker`}
              description="Explore our scholarship directory and click 'Add to Tracker' on any grant to begin managing milestones."
              actionLabel="Explore Scholarships"
              onAction={() => navigate(ROUTES.EXPLORE)}
            />
          ) : (
            <div className="space-y-4">
              <AnimatePresence mode="popLayout">
                {filteredApps.map((app) => {
                  const deadline = getDaysRemaining(app.deadline);
                  const docs = app.documents || [];
                  const completedDocs = docs.filter((d) => d.completed).length;

                  return (
                    <motion.div
                      key={app.id}
                      layout
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.3 }}
                    >
                      <BaseCard hover className="p-6 glass-card">
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-4 border-b border-[var(--border)]">
                          <div className="space-y-1.5 flex-1">
                            <div className="flex flex-wrap items-center gap-2.5">
                              {/* Status Dropdown */}
                              <div className="relative inline-block">
                                <select
                                  value={app.status}
                                  onChange={(e) => updateApplicationStatus(app.id, e.target.value)}
                                  aria-label={`Update status for ${app.title}`}
                                  className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1 text-xs font-bold text-[var(--primary)] focus:outline-none focus:ring-2 focus:ring-[var(--coral)] cursor-pointer"
                                >
                                  <option value="Saved">Saved</option>
                                  <option value="In Progress">In Progress</option>
                                  <option value="Submitted">Submitted</option>
                                  <option value="Approved">Approved</option>
                                  <option value="Rejected">Rejected</option>
                                </select>
                              </div>

                              <span className="text-xs text-[var(--text-muted)]">
                                Last activity: {formatDate(app.lastUpdated)}
                              </span>
                            </div>

                            <Link to={ROUTES.SCHOLARSHIP_DETAIL(app.scholarshipId || app.id)}>
                              <h3 className="heading-card text-base sm:text-lg text-[var(--text-primary)] hover:text-[var(--primary)] transition-colors">
                                {app.title}
                              </h3>
                            </Link>
                            <p className="text-xs text-[var(--text-muted)] font-medium">{app.provider}</p>
                          </div>

                          <div className="flex items-center gap-6 shrink-0">
                            <div className="text-right">
                              <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                                Grant Value
                              </span>
                              <p className="font-heading text-xl font-extrabold text-[var(--primary)] tabular-nums">
                                {formatCurrency(app.awardAmount || app.amount)}
                              </p>
                            </div>

                            <div className="p-3 rounded-[var(--radius-md)] bg-[var(--peach-tint)] border border-[var(--border)] text-center min-w-[100px]">
                              <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
                                Deadline
                              </span>
                              <p className="text-xs font-bold text-[var(--text-primary)] mt-0.5">
                                {formatDate(app.deadline)}
                              </p>
                              <span className={`text-[10px] font-bold ${deadline.isUrgent ? 'text-[var(--danger)]' : 'text-[var(--text-secondary)]'}`}>
                                {deadline.label}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Progress and Checklist Bar */}
                        <div className="pt-4 space-y-3">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                            <span className="font-semibold text-[var(--text-secondary)]">
                              Document Verification Progress: <strong className="text-[var(--text-primary)]">{completedDocs} of {docs.length} completed</strong>
                            </span>
                            <span className="font-mono text-xs font-bold text-[var(--primary)]">
                              {app.progress}% Overall Pipeline
                            </span>
                          </div>

                          <ProgressBar value={app.progress} size="md" color={app.progress === 100 ? 'success' : 'coral'} />

                          {/* Quick checklist pills preview */}
                          <div className="flex flex-wrap gap-2 pt-1">
                            {docs.slice(0, 4).map((doc, idx) => (
                              <button
                                key={idx}
                                type="button"
                                onClick={() => updateApplicationDocument(app.id, idx, !doc.completed)}
                                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold border transition-all cursor-pointer ${
                                  doc.completed
                                    ? 'bg-[#EAF5F0] border-[var(--success)] text-[var(--success)]'
                                    : 'bg-[var(--surface)] border-[var(--border)] text-[var(--text-muted)] hover:border-[var(--coral)]'
                                }`}
                              >
                                {doc.completed ? <CheckSquare className="h-3 w-3" /> : <Square className="h-3 w-3" />}
                                <span className={doc.completed ? 'line-through' : ''}>{doc.name}</span>
                              </button>
                            ))}
                            {docs.length > 4 && (
                              <button
                                type="button"
                                onClick={() => handleOpenDocsModal(app)}
                                className="text-[11px] text-[var(--primary)] font-bold hover:underline"
                              >
                                +{docs.length - 4} more
                              </button>
                            )}
                          </div>

                          {/* Bottom controls */}
                          <div className="flex items-center justify-between pt-3 border-t border-[var(--border)] text-xs">
                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() => handleOpenNotesModal(app)}
                                className="inline-flex items-center gap-1 text-[var(--text-secondary)] hover:text-[var(--text-primary)] font-semibold cursor-pointer"
                              >
                                <Edit3 className="h-3 w-3" />
                                <span>{app.notes ? 'Edit Notes' : 'Add Notes'}</span>
                              </button>
                              {app.notes && (
                                <span className="text-[11px] text-[var(--text-muted)] truncate max-w-xs italic">
                                  "{app.notes.slice(0, 45)}..."
                                </span>
                              )}
                            </div>

                            <div className="flex items-center gap-3">
                              <button
                                type="button"
                                onClick={() => handleOpenDocsModal(app)}
                                className="inline-flex items-center gap-1 text-[var(--primary)] font-semibold hover:underline cursor-pointer"
                              >
                                <CheckSquare className="h-3 w-3" /> All Documents
                              </button>

                              <span className="text-[var(--border)]">&bull;</span>

                              <button
                                type="button"
                                onClick={() => setAppToDelete(app)}
                                className="text-[var(--danger)] hover:underline cursor-pointer flex items-center gap-1"
                                title="Remove Application"
                              >
                                <Trash2 className="h-3 w-3" /> Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      </BaseCard>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          )
        )}

        {/* DOCUMENT CHECKLIST MODAL (With Custom Requirement Adder) */}
        {selectedAppForDocs && (
          <Modal
            isOpen={true}
            onClose={() => setSelectedAppId(null)}
            title="Document Verification Checklist"
            subtitle={selectedAppForDocs.title}
            maxWidth="max-w-lg"
          >
            <div className="space-y-4">
              <p className="text-xs text-[var(--text-secondary)]">
                Check off official documents as they are finalized, signed, or uploaded. Your progress percentage updates in real time.
              </p>

              <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                {(selectedAppForDocs.documents || []).map((doc, idx) => (
                  <button
                    type="button"
                    key={idx}
                    role="checkbox"
                    aria-checked={doc.completed}
                    aria-label={`${doc.name}${doc.required ? ' (Mandatory)' : ''}`}
                    onClick={() => updateApplicationDocument(selectedAppForDocs.id, idx, !doc.completed)}
                    className="w-full flex items-center justify-between p-3 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] hover:bg-[var(--surface-secondary)]/40 cursor-pointer transition-colors text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--coral)]"
                  >
                    <div className="flex items-center gap-3">
                      {doc.completed ? (
                        <CheckSquare className="h-5 w-5 text-[var(--success)] shrink-0" aria-hidden="true" />
                      ) : (
                        <Square className="h-5 w-5 text-[var(--border)] shrink-0" aria-hidden="true" />
                      )}
                      <div>
                        <span className={`text-xs font-semibold ${doc.completed ? 'line-through text-[var(--text-muted)]' : 'text-[var(--text-primary)]'}`}>
                          {doc.name}
                        </span>
                        {doc.required && (
                          <span className="block text-[10px] text-[var(--danger)] font-bold">Mandatory</span>
                        )}
                      </div>
                    </div>
                    <Badge variant={doc.completed ? 'success' : 'neutral'} size="sm">
                      {doc.completed ? 'Verified' : 'Pending'}
                    </Badge>
                  </button>
                ))}
              </div>

              {/* Add Custom Requirement Input */}
              <form onSubmit={handleAddCustomDoc} className="flex items-center gap-2 pt-2 border-t border-[var(--border)]">
                <input
                  type="text"
                  value={newDocName}
                  onChange={(e) => setNewDocName(e.target.value)}
                  placeholder="Add custom doc (e.g. Portfolio link, Video intro)..."
                  className="flex-1 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] px-3 py-1.5 text-xs text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--coral)]/25"
                />
                <Button type="submit" size="sm" variant="secondary" disabled={!newDocName.trim()}>
                  <Plus className="h-3.5 w-3.5 mr-1" /> Add
                </Button>
              </form>

              <div className="flex justify-end pt-2 border-t border-[var(--border)]">
                <PrimaryButton size="sm" onClick={() => setSelectedAppId(null)}>
                  Done
                </PrimaryButton>
              </div>
            </div>
          </Modal>
        )}

        {/* NOTES EDIT MODAL */}
        {editingNotesApp && (
          <Modal
            isOpen={true}
            onClose={() => setEditingNotesApp(null)}
            title="Application Notes & Milestones"
            subtitle={editingNotesApp.title}
            maxWidth="max-w-md"
          >
            <div className="space-y-4">
              <textarea
                rows={5}
                value={notesDraft}
                onChange={(e) => setNotesDraft(e.target.value)}
                placeholder="Record essay drafts, faculty referee reminders, or interview dates..."
                className="w-full rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] p-3 text-xs text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--coral)]/25"
              />
              <div className="flex justify-end gap-2 pt-2 border-t border-[var(--border)]">
                <SecondaryButton size="sm" onClick={() => setEditingNotesApp(null)}>
                  Cancel
                </SecondaryButton>
                <PrimaryButton size="sm" onClick={handleSaveNotes}>
                  Save Notes
                </PrimaryButton>
              </div>
            </div>
          </Modal>
        )}

        {/* CONFIRMATION DIALOG BEFORE DELETION */}
        {appToDelete && (
          <Modal
            isOpen={true}
            onClose={() => setAppToDelete(null)}
            title="Remove Tracked Application?"
            subtitle={appToDelete.title}
            maxWidth="max-w-md"
          >
            <div className="space-y-4">
              <div className="p-4 rounded-[var(--radius-md)] bg-[#FDF0EF] border border-[var(--danger)]/40 text-xs text-[var(--danger)] flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 shrink-0" />
                <div>
                  <p className="font-bold">Are you sure you want to remove this grant?</p>
                  <p className="mt-0.5 text-[var(--text-secondary)]">
                    All recorded document checklists and personal notes for this application will be cleared from your local tracker.
                  </p>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-[var(--border)]">
                <SecondaryButton size="sm" onClick={() => setAppToDelete(null)}>
                  Keep Application
                </SecondaryButton>
                <Button variant="danger" size="sm" onClick={handleConfirmDelete}>
                  Yes, Remove Application
                </Button>
              </div>
            </div>
          </Modal>
        )}
      </FadeIn>
    </AmbientBackground>
  );
};

export default ApplicationsPage;
