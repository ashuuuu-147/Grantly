import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Compass,
  CheckCircle2,
  LayoutDashboard,
  FileText,
  Calendar,
  User,
  Settings,
  Sparkles,
  ArrowRight,
  X,
  Award,
  RotateCcw,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ROUTES } from '../../utils/constants';
import { formatCurrency } from '../../utils/formatters';

export const CommandPalette = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { scholarships, resetDemoData } = useApp();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Static navigation routes
  const navigationItems = [
    { id: 'nav-explore', label: 'Explore Scholarships', path: ROUTES.EXPLORE, icon: Compass, category: 'Navigation' },
    { id: 'nav-eligibility', label: 'Check My Eligibility', path: ROUTES.ELIGIBILITY, icon: CheckCircle2, category: 'Navigation' },
    { id: 'nav-dashboard', label: 'Student Dashboard', path: ROUTES.DASHBOARD, icon: LayoutDashboard, category: 'Navigation' },
    { id: 'nav-applications', label: 'My Applications Tracker', path: ROUTES.APPLICATIONS, icon: FileText, category: 'Navigation' },
    { id: 'nav-deadlines', label: 'Deadline Calendar', path: ROUTES.DEADLINES, icon: Calendar, category: 'Navigation' },
    { id: 'nav-profile', label: 'Scholar Profile', path: ROUTES.PROFILE, icon: User, category: 'Navigation' },
    { id: 'nav-settings', label: 'Preferences & Settings', path: ROUTES.SETTINGS, icon: Settings, category: 'Navigation' },
  ];

  // System actions
  const actionItems = [
    {
      id: 'act-reset',
      label: 'Reset Demo Data to Default',
      action: () => resetDemoData(),
      icon: RotateCcw,
      category: 'Actions',
    },
  ];

  // Dynamic scholarship matches
  const scholarshipItems = scholarships.map((s) => ({
    id: `sch-${s.id}`,
    label: s.title,
    path: `/scholarship/${s.id}`,
    icon: Award,
    category: 'Scholarships',
    meta: `${formatCurrency(s.awardAmount || s.amount)} • ${s.category}`,
  }));

  // Filter all items by search query
  const filteredNavigation = navigationItems.filter((i) =>
    i.label.toLowerCase().includes(query.toLowerCase())
  );
  const filteredActions = actionItems.filter((i) =>
    i.label.toLowerCase().includes(query.toLowerCase())
  );
  const filteredScholarships = scholarshipItems
    .filter(
      (s) =>
        s.label.toLowerCase().includes(query.toLowerCase()) ||
        s.meta.toLowerCase().includes(query.toLowerCase())
    )
    .slice(0, 5);

  const allItems = [...filteredNavigation, ...filteredActions, ...filteredScholarships];

  const handleSelect = (item) => {
    onClose();
    if (item.action) {
      item.action();
    } else if (item.path) {
      navigate(item.path);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % (allItems.length || 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + (allItems.length || 1)) % (allItems.length || 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (allItems[selectedIndex]) {
        handleSelect(allItems[selectedIndex]);
      }
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-xs"
          />

          {/* Modal Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="relative w-full max-w-xl rounded-2xl bg-[var(--surface)] border border-[var(--border)] shadow-[0_20px_50px_rgba(73,55,53,0.18)] overflow-hidden z-10"
          >
            {/* Search Input Bar */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[var(--border)] bg-[var(--peach-tint)]/40">
              <Search className="w-5 h-5 text-[var(--coral)] shrink-0" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                onKeyDown={handleKeyDown}
                placeholder="Type to search scholarships, navigation, actions..."
                className="w-full bg-transparent text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none font-medium"
              />
              <button
                onClick={onClose}
                className="p-1 rounded-md text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-secondary)]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Results List */}
            <div className="max-h-80 overflow-y-auto p-2 space-y-1">
              {allItems.length === 0 ? (
                <div className="py-8 text-center text-xs text-[var(--text-muted)]">
                  No matching scholarships or actions found. Try searching for "Turing", "STEM", or "Applications".
                </div>
              ) : (
                allItems.map((item, idx) => {
                  const Icon = item.icon;
                  const isSelected = idx === selectedIndex;

                  return (
                    <div
                      key={item.id}
                      onClick={() => handleSelect(item)}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold cursor-pointer transition-colors ${
                        isSelected
                          ? 'bg-[var(--peach-tint)] text-[var(--primary)]'
                          : 'text-[var(--text-primary)] hover:bg-[var(--surface-secondary)]/40'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                            isSelected
                              ? 'bg-[var(--coral)] text-white'
                              : 'bg-[var(--surface-secondary)] text-[var(--text-secondary)]'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="truncate">
                          <p className="truncate">{item.label}</p>
                          {item.meta && (
                            <p className="text-[10px] text-[var(--text-muted)] font-normal truncate mt-0.5">
                              {item.meta}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-[10px] font-bold uppercase text-[var(--text-muted)] bg-[var(--surface)] px-2 py-0.5 rounded border border-[var(--border)]">
                          {item.category}
                        </span>
                        {isSelected && <ArrowRight className="w-3.5 h-3.5 text-[var(--coral)]" />}
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer with Keyboard Hints */}
            <div className="px-4 py-2 border-t border-[var(--border)] bg-[var(--surface-secondary)]/30 flex items-center justify-between text-[11px] text-[var(--text-muted)]">
              <div className="flex items-center gap-3">
                <span>
                  <kbd className="px-1.5 py-0.5 bg-[var(--surface)] rounded border border-[var(--border)] font-mono text-[10px]">
                    ↑↓
                  </kbd>{' '}
                  Navigate
                </span>
                <span>
                  <kbd className="px-1.5 py-0.5 bg-[var(--surface)] rounded border border-[var(--border)] font-mono text-[10px]">
                    ↵
                  </kbd>{' '}
                  Select
                </span>
                <span>
                  <kbd className="px-1.5 py-0.5 bg-[var(--surface)] rounded border border-[var(--border)] font-mono text-[10px]">
                    ESC
                  </kbd>{' '}
                  Close
                </span>
              </div>
              <span className="font-heading font-bold text-[var(--coral)]">GRANTLY</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CommandPalette;

