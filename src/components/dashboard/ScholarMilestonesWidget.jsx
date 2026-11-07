import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  CheckCircle2,
  Clock,
  Zap,
  ArrowRight,
  Plus,
  Play,
  RotateCcw,
  Sparkles,
  Award,
  AlertCircle,
  FileCheck,
} from 'lucide-react';
import { Badge, PrimaryButton } from '../ui';
import { ROUTES } from '../../utils/constants';

/**
 * ScholarMilestonesWidget (Inspired by Image 1's "ORDI - OWN YOUR TIME" widget)
 * Features tactile milestone rows, priority badges, category schedule pills,
 * and a circular countdown tracker for the nearest scholarship deadline.
 */
export const ScholarMilestonesWidget = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'Upload Faculty Recommendation (Prof. Thorne)',
      scholarship: 'Global Turing AI Fellowship',
      priority: 'Urgent',
      status: 'In Progress',
      dueDate: 'Dec 10, 2026',
      done: false,
    },
    {
      id: 2,
      title: 'Review Statement of Purpose with Advisor',
      scholarship: 'Meridian Global Leadership',
      priority: 'High',
      status: 'Pending',
      dueDate: 'Dec 18, 2026',
      done: false,
    },
    {
      id: 3,
      title: 'Request Certified Stanford Official Transcript',
      scholarship: 'All Active Grants',
      priority: 'Normal',
      status: 'Done',
      dueDate: 'Completed',
      done: true,
    },
    {
      id: 4,
      title: 'Prepare GitHub / Open Source Portfolio Repo',
      scholarship: 'Google Generation CS Grant',
      priority: 'High',
      status: 'In Progress',
      dueDate: 'Jan 05, 2027',
      done: false,
    },
  ]);

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              done: !t.done,
              status: !t.done ? 'Done' : 'In Progress',
            }
          : t
      )
    );
  };

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'Urgent':
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#FDE8E8] text-[var(--danger)] border border-[var(--danger)]/30">
            Urgent
          </span>
        );
      case 'High':
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[var(--peach-tint)] text-[var(--primary)] border border-[var(--coral)]/30">
            High
          </span>
        );
      default:
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[var(--surface-secondary)] text-[var(--text-secondary)]">
            Normal
          </span>
        );
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Done':
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#EAF5F0] text-[var(--success)]">
            Completed
          </span>
        );
      case 'In Progress':
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[var(--peach-tint)] text-[var(--primary)]">
            In Progress
          </span>
        );
      default:
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-[var(--surface-secondary)]/50 text-[var(--text-muted)]">
            Pending
          </span>
        );
    }
  };

  return (
    <div className="rounded-[var(--radius-xl)] border-2 border-[var(--border)] bg-[var(--surface)] p-6 sm:p-7 grantly-card-shadow space-y-6">
      {/* Top Header (Matching ORDI "OWN YOUR TIME") */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[var(--border)]">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-[var(--primary)] text-white shadow-xs">
              <Zap className="w-3.5 h-3.5 fill-current" /> OWN YOUR FUTURE
            </span>
            <span className="text-xs font-semibold text-[var(--text-muted)]">
              Daily Focus & Application Milestones
            </span>
          </div>
          <h2 className="font-heading font-extrabold text-xl sm:text-2xl text-[var(--text-primary)] mt-2">
            Scholar Milestone Command Center
          </h2>
        </div>

        {/* Tactical Pipeline Pill Bar */}
        <div className="flex items-center gap-2 p-1.5 rounded-xl bg-[var(--peach-tint)] border border-[var(--border)]">
          <div className="px-3 py-1 rounded-lg bg-[var(--surface)] shadow-xs">
            <span className="text-[10px] font-bold uppercase text-[var(--text-muted)] block leading-none">
              Pipeline Total
            </span>
            <span className="font-heading font-extrabold text-sm text-[var(--primary)]">
              $145,000
            </span>
          </div>
          <div className="hidden lg:flex items-center gap-1.5 text-xs text-[var(--text-secondary)] font-medium px-2">
            <span className="px-2 py-0.5 rounded-md bg-[var(--surface)] text-[var(--coral)] font-bold text-[11px]">
              Turing AI
            </span>
            <span className="px-2 py-0.5 rounded-md bg-[var(--surface)] text-[var(--success)] font-bold text-[11px]">
              Meridian
            </span>
            <span className="px-2 py-0.5 rounded-md bg-[var(--surface)] text-[var(--gold)] font-bold text-[11px]">
              Google CS
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid: Left Tasks Table (7 cols) + Right Circular Timer & Cards (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Interactive Milestones Table (Matching ORDI "Today's Tasks") */}
        <div className="lg:col-span-7 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-heading font-bold text-sm text-[var(--text-primary)] flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-[var(--coral)]" />
              Actionable Requirements ({tasks.filter((t) => !t.done).length} Remaining)
            </h3>
            <Link
              to={ROUTES.APPLICATIONS}
              className="text-xs font-bold text-[var(--primary)] hover:underline flex items-center gap-1"
            >
              Full Tracker <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-2">
            {tasks.map((task) => (
              <motion.div
                key={task.id}
                whileHover={{ y: -1 }}
                onClick={() => toggleTask(task.id)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                  task.done
                    ? 'bg-[var(--surface-secondary)]/30 border-[var(--border)] opacity-60'
                    : 'bg-[var(--surface)] border-[var(--border)] hover:border-[var(--coral)] shadow-xs'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <button
                    aria-label="Toggle task completion"
                    className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-colors ${
                      task.done
                        ? 'bg-[var(--success)] border-[var(--success)] text-white'
                        : 'border-[var(--border)] hover:border-[var(--coral)] bg-[var(--surface)]'
                    }`}
                  >
                    {task.done && <CheckCircle2 className="w-3.5 h-3.5" />}
                  </button>

                  <div className="min-w-0">
                    <p
                      className={`text-xs font-bold text-[var(--text-primary)] truncate ${
                        task.done ? 'line-through text-[var(--text-muted)]' : ''
                      }`}
                    >
                      {task.title}
                    </p>
                    <p className="text-[11px] text-[var(--text-muted)] truncate mt-0.5">
                      {task.scholarship} &bull; <span className="font-semibold">{task.dueDate}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {getPriorityBadge(task.priority)}
                  {getStatusBadge(task.status)}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right: Circular Deadline Timer Widget & Opportunity Snapshot (Matching ORDI widgets) */}
        <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
          {/* 1. Circular Countdown Widget */}
          <div className="p-5 rounded-xl bg-gradient-to-br from-[var(--surface)] to-[var(--peach-tint)]/40 border border-[var(--border)] shadow-xs flex items-center gap-5">
            {/* Circular dial */}
            <div className="relative flex items-center justify-center shrink-0">
              <svg className="w-24 h-24 transform -rotate-90">
                <circle cx="48" cy="48" r="38" stroke="var(--border)" strokeWidth="8" fill="none" />
                <circle
                  cx="48"
                  cy="48"
                  r="38"
                  stroke="var(--coral)"
                  strokeWidth="8"
                  strokeDasharray="238"
                  strokeDashoffset="60"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="font-heading font-extrabold text-sm text-[var(--text-primary)]">
                  12 Days
                </span>
                <span className="text-[9px] uppercase tracking-wider text-[var(--danger)] font-bold">
                  Urgent
                </span>
              </div>
            </div>

            {/* Target grant details */}
            <div className="space-y-1 min-w-0">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
                Next Approaching Grant
              </span>
              <h4 className="font-heading font-bold text-sm text-[var(--text-primary)] truncate">
                Turing AI Fellowship
              </h4>
              <p className="text-xs font-extrabold text-[var(--primary)]">$50,000 Direct Award</p>
              <Link to="/scholarship/sch-101" className="inline-block pt-1">
                <span className="text-xs font-bold text-[var(--coral)] hover:underline flex items-center gap-1">
                  Prepare Packet <ArrowRight className="w-3 h-3" />
                </span>
              </Link>
            </div>
          </div>

          {/* 2. Tactile Bold Card (Matching ORDI orange card) */}
          <div className="p-5 rounded-xl bg-[var(--coral)] text-white shadow-[0_8px_20px_rgba(242,140,120,0.35)] flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/80 block">
                Catalog Opportunities
              </span>
              <p className="font-heading font-extrabold text-2xl leading-none">
                18 Active Grants
              </p>
              <p className="text-xs text-white/90 font-medium pt-0.5">
                $1.2M+ in student funding available
              </p>
            </div>
            <Link to={ROUTES.EXPLORE}>
              <button className="p-3 rounded-full bg-white text-[var(--primary)] shadow-sm hover:scale-105 transition-transform cursor-pointer">
                <Plus className="w-5 h-5" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScholarMilestonesWidget;

