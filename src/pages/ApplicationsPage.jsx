import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
  ChevronDown,
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
  StatusBadge,
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
    updateApplicationNotes,
    removeApplication,
  } = useApp();

  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedAppForDocs, setSelectedAppForDocs] = useState(null);
  const [editingNotesApp, setEditingNotesApp] = useState(null);
  const [notesDraft, setNotesDraft] = useState('');
  const [appToDelete, setAppToDelete] = useState(null);

  const statuses = ['All', 'In Progress', 'Submitted', 'Saved', 'Approved', 'Rejected'];

  const filteredApps = applications.filter((app) => {
    if (activeFilter === 'All') return true;
    return app.status === activeFilter;
  });

  const handleOpenDocsModal = (app) => {
    setSelectedAppForDocs(app);
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
            Scholarship Application Tracker
          </h1>
          <p className="text-sm text-[var(--text-secondary)] mt-0.5">
            Manage required documentation, track milestone checklists, and record personal application notes.
          </p>
        </div>

        <Link to={ROUTES.EXPLORE}>
          <PrimaryButton icon={Plus}>Add More Grants</PrimaryButton>
        </Link>
      </div>

      {/* Filter Tabs */}
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
                  activeFilter === status ? 'bg-white/20 text-white' : 'bg-[var(--surface-secondary)] text-[var(--text-muted)]'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Application Cards List */}
      {filteredApps.length === 0 ? (
        <EmptyState
          icon={Layers}
          title={`No ${activeFilter !== 'All' ? activeFilter : ''} applications in tracker`}
          description="Explore our scholarship directory and click 'Add to Tracker' on any grant to begin managing milestones."
          actionLabel="Explore Scholarships"
          onAction={() => {}}
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
                              className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1 text-xs font-bold text-[var(--primary)] focus:outline-none cursor-pointer"
                            >
                              <option value="In Progress">In Progress</option>
                              <option value="Submitted">Submitted</option>
                              <option value="Saved">Saved</option>
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

                      {/* Financial & Deadline stats */}
                      <div className="flex items-center gap-6 sm:gap-8 shrink-0">
                        <div className="text-right">
                          <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--text-muted)] font-body">
                            Award Funding
                          </span>
                          <p className="font-heading text-xl font-extrabold text-[var(--primary)] tabular-nums">
                            {formatCurrency(app.awardAmount || app.amount)}
                          </p>
                        </div>

                        <div className="text-right">
                          <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--text-muted)] font-body">
                            Deadline
                          </span>
                          <p className="text-xs font-semibold text-[var(--text-secondary)] mt-0.5 tabular-nums font-body">
                            {formatDate(app.deadline)}
                          </p>
                          <Badge variant={deadline.isUrgent ? 'danger' : 'coral'} size="sm" className="mt-1 font-semibold">
                            {deadline.label}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    {/* Progress Bar & Interactive Checklists */}
                    <div className="pt-4 space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-[var(--text-primary)] font-sans">
                            Required Document Checklist:
                          </span>
                          <span className="text-[var(--text-muted)]">
                            {completedDocs} of {docs.length} verified
                          </span>
                        </div>
                        <span className="font-mono font-bold text-[var(--primary)]">
                          {app.progress}% Ready
                        </span>
                      </div>

                      <ProgressBar
                        value={app.progress}
                        color={app.status === 'Submitted' || app.status === 'Approved' ? 'success' : 'coral'}
                        showPercentage={false}
                        size="md"
                      />

                      {/* Document Checklist Items */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 pt-1">
                        {docs.slice(0, 3).map((doc, docIdx) => (
                          <button
                            key={docIdx}
                            type="button"
                            onClick={() => updateApplicationDocument(app.id, docIdx, !doc.completed)}
                            className="flex items-center gap-2 p-2.5 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface-secondary)]/30 hover:bg-[var(--surface-secondary)]/60 text-xs text-left cursor-pointer transition-colors"
                          >
                            {doc.completed ? (
                              <CheckSquare className="h-4 w-4 text-[var(--success)] shrink-0" />
                            ) : (
                              <Square className="h-4 w-4 text-[var(--border)] shrink-0" />
                            )}
                            <span className={`truncate ${doc.completed ? 'line-through text-[var(--text-muted)]' : 'text-[var(--text-primary)] font-medium'}`}>
                              {doc.name}
                            </span>
                          </button>
                        ))}

                        {docs.length > 3 && (
                          <button
                            onClick={() => handleOpenDocsModal(app)}
                            className="p-2.5 rounded-[var(--radius-md)] border border-dashed border-[var(--border)] text-xs text-[var(--primary)] font-bold hover:bg-[var(--peach-tint)] transition-colors cursor-pointer text-center"
                          >
                            + {docs.length - 3} More Documents
                          </button>
                        )}
                      </div>

                      {/* Notes Preview & Card Actions */}
                      <div className="pt-3 border-t border-[var(--border)] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                        <div className="flex-1 flex items-center gap-2 text-[var(--text-secondary)]">
                          <FileText className="h-3.5 w-3.5 text-[var(--text-muted)] shrink-0" />
                          <span className="line-clamp-1 italic">
                            {app.notes || 'No personal notes recorded yet.'}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            onClick={() => handleOpenNotesModal(app)}
                            className="inline-flex items-center gap-1 text-[var(--primary)] font-semibold hover:underline cursor-pointer"
                          >
                            <Edit3 className="h-3 w-3" /> Edit Notes
                          </button>

                          <span className="text-[var(--border)]">&bull;</span>

                          <button
                            onClick={() => handleOpenDocsModal(app)}
                            className="inline-flex items-center gap-1 text-[var(--primary)] font-semibold hover:underline cursor-pointer"
                          >
                            <CheckSquare className="h-3 w-3" /> All Documents
                          </button>

                          <span className="text-[var(--border)]">&bull;</span>

                          <button
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
      )}

      {/* DOCUMENT CHECKLIST MODAL */}
      {selectedAppForDocs && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedAppForDocs(null)}
          title="Document Verification Checklist"
          subtitle={selectedAppForDocs.title}
          maxWidth="max-w-lg"
        >
          <div className="space-y-4">
            <p className="text-xs text-[var(--text-secondary)]">
              Check off official documents as they are finalized, signed, or uploaded. Your progress percentage updates in real time.
            </p>

            <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
              {(selectedAppForDocs.documents || []).map((doc, idx) => (
                <div
                  key={idx}
                  onClick={() => updateApplicationDocument(selectedAppForDocs.id, idx, !doc.completed)}
                  className="flex items-center justify-between p-3 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] hover:bg-[var(--surface-secondary)]/40 cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-3">
                    {doc.completed ? (
                      <CheckSquare className="h-5 w-5 text-[var(--success)] shrink-0" />
                    ) : (
                      <Square className="h-5 w-5 text-[var(--border)] shrink-0" />
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
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-3 border-t border-[var(--border)]">
              <PrimaryButton size="sm" onClick={() => setSelectedAppForDocs(null)}>
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

      {/* CONFIRMATION DIALOG BEFORE DELETION (Requirement from Phase 8.3) */}
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
