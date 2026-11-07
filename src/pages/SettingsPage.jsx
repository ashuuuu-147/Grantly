import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  RotateCcw,
  ShieldCheck,
  AlertTriangle,
  Info,
  CheckCircle2,
  Trash2,
  Lock,
  Palette,
  Sparkles,
} from 'lucide-react';
import {
  BaseCard,
  CardHeader,
  CardTitle,
  CardContent,
  PrimaryButton,
  SecondaryButton,
  OutlineButton,
  Button,
  Badge,
  Modal,
} from '../components/ui';
import FadeIn from '../components/animations/FadeIn';
import { useApp } from '../context/AppContext';

export const SettingsPage = () => {
  const { resetDemoData } = useApp();
  const [resetModalOpen, setResetModalOpen] = useState(false);

  const handleConfirmReset = () => {
    resetDemoData();
    setResetModalOpen(false);
  };

  return (
    <FadeIn className="space-y-8 pb-20 max-w-3xl mx-auto">
      {/* Header */}
      <div className="space-y-2 pb-6 border-b border-[var(--border)]">
        <Badge variant="coral">Platform Controls</Badge>
        <h1 className="heading-page text-2xl sm:text-3xl text-[var(--text-primary)]">
          Settings & Local Preferences
        </h1>
        <p className="text-sm text-[var(--text-secondary)]">
          Review official brand appearance, client data storage, and manage application state.
        </p>
      </div>

      {/* 1. Interface Theme Selector - Locked to Warm Cream Daylight Identity */}
      <BaseCard className="p-6 sm:p-7 space-y-5">
        <CardHeader className="pb-3 border-b border-[var(--border)]">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Interface Appearance</CardTitle>
              <p className="text-xs text-[var(--text-secondary)] mt-1">
                Official GRANTLY Peach + Coral daylight visual identity.
              </p>
            </div>
            <Badge variant="success">Active Theme</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="p-5 rounded-[var(--radius-lg)] border-2 border-[var(--primary)] bg-[var(--peach-tint)] ring-2 ring-[var(--coral)]/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-[#FFF0E8] via-[#FFE3D6] to-[#F28C78] text-[var(--primary)] flex items-center justify-center shrink-0 shadow-sm border border-[var(--border)]">
                <Palette className="h-6 w-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-base font-bold text-[var(--text-primary)]">Warm Cream & Coral</p>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[var(--surface)] text-[var(--primary)] border border-[var(--border)]">
                    Daylight Mode
                  </span>
                </div>
                <p className="text-xs text-[var(--text-muted)] mt-0.5">
                  Locked to the official signature palette: Warm Cream (#FFF8F3), Soft Peach (#FFE3D6), Coral (#F28C78), and Espresso (#493735).
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="w-5 h-5 rounded-full bg-[#FFF8F3] border border-[var(--border)] shadow-xs" title="Warm Cream (#FFF8F3)" />
              <span className="w-5 h-5 rounded-full bg-[#FFE3D6] border border-[var(--border)] shadow-xs" title="Soft Peach (#FFE3D6)" />
              <span className="w-5 h-5 rounded-full bg-[#F28C78] shadow-xs" title="Coral (#F28C78)" />
              <span className="w-5 h-5 rounded-full bg-[#DB695C] shadow-xs" title="Deep Coral (#DB695C)" />
              <span className="w-5 h-5 rounded-full bg-[#493735] shadow-xs" title="Espresso (#493735)" />
            </div>
          </div>
        </CardContent>
      </BaseCard>

      {/* 2. Client-Side Data Architecture & Reset */}
      <BaseCard className="p-6 sm:p-7 space-y-5">
        <CardHeader className="pb-3 border-b border-[var(--border)]">
          <div>
            <CardTitle>Local Client Storage Management</CardTitle>
            <p className="text-xs text-[var(--text-secondary)] mt-1">
              All bookmarks, document checklists, and application statuses are isolated in HTML5 LocalStorage.
            </p>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-[var(--radius-md)] bg-[var(--surface-secondary)]/40 border border-[var(--border)] space-y-2">
              <div className="flex items-center gap-2 text-[var(--primary)] font-bold text-xs uppercase tracking-wider">
                <ShieldCheck className="h-4 w-4" /> Zero Backend Architecture
              </div>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                No external servers, user trackers, cookies, or cloud databases are queried. 100% of your student data stays in your browser cache.
              </p>
            </div>

            <div className="p-4 rounded-[var(--radius-md)] bg-[var(--surface-secondary)]/40 border border-[var(--border)] space-y-2">
              <div className="flex items-center gap-2 text-[var(--success)] font-bold text-xs uppercase tracking-wider">
                <Lock className="h-4 w-4" /> Namespace Isolation
              </div>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                All records are strictly namespaced with the prefix <code className="px-1 py-0.5 rounded bg-[var(--surface)] text-[var(--primary)] text-[11px] font-mono font-bold">grantly_*</code> to prevent interfering with other web origins.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <p className="text-sm font-bold text-[var(--text-primary)]">
                Reset Demo Application State
              </p>
              <p className="text-xs text-[var(--text-secondary)]">
                Revert all mock scholarships, saved bookmarks, and custom checklist notes to default demo presets.
              </p>
            </div>
            <Button
              variant="danger"
              size="sm"
              icon={RotateCcw}
              onClick={() => setResetModalOpen(true)}
            >
              Reset All Demo Data
            </Button>
          </div>
        </CardContent>
      </BaseCard>

      {/* 3. Privacy & Offline Capability */}
      <BaseCard className="p-6 sm:p-7 space-y-4">
        <CardHeader className="pb-3 border-b border-[var(--border)]">
          <CardTitle>System & Privacy Declarations</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-xs text-[var(--text-secondary)] leading-relaxed">
          <p className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-[var(--success)] shrink-0" />
            <span>Pure React + Tailwind CSS client-side SPA execution.</span>
          </p>
          <p className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-[var(--success)] shrink-0" />
            <span>Interactive filtering and recommendation calculations compute entirely on-device in under 5ms.</span>
          </p>
          <p className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-[var(--success)] shrink-0" />
            <span>All mock awards and dates conform to official verified scholarship guidelines.</span>
          </p>
          <p className="font-bold text-[var(--text-primary)]">
            Product Version: 1.0.0 &bull; Peach + Coral Design System &bull; React 19 + Vite
          </p>
        </CardContent>
      </BaseCard>

      {/* CONFIRMATION MODAL BEFORE RESET */}
      <Modal
        isOpen={resetModalOpen}
        onClose={() => setResetModalOpen(false)}
        title="Confirm Demo Data Reset"
        subtitle="Restore initial demo application state"
        maxWidth="max-w-md"
      >
        <div className="space-y-4">
          <div className="p-4 rounded-[var(--radius-md)] bg-[#FDF0EF] border border-[var(--danger)]/40 text-xs text-[var(--danger)] flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 shrink-0" />
            <div>
              <p className="font-bold">Are you sure you want to reset your demo data?</p>
              <p className="mt-1 text-[var(--text-secondary)]">
                This will reset your bookmarked scholarships, application checklist items, and profile adjustments back to default sample values. Only GRANTLY's own storage keys will be updated.
              </p>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t border-[var(--border)]">
            <SecondaryButton size="sm" onClick={() => setResetModalOpen(false)}>
              Cancel
            </SecondaryButton>
            <Button variant="danger" size="sm" onClick={handleConfirmReset}>
              Yes, Reset Data
            </Button>
          </div>
        </div>
      </Modal>
    </FadeIn>
  );
};

export default SettingsPage;
