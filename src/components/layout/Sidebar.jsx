import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Compass,
  CheckCircle,
  FileText,
  Bookmark,
  Calendar,
  User,
  Settings,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ROUTES } from '../../utils/constants';

export const Sidebar = () => {
  const { savedIds, applications } = useApp();
  const [collapsed, setCollapsed] = useState(false);

  const navItems = [
    { label: 'Overview', path: ROUTES.DASHBOARD, icon: LayoutDashboard },
    { label: 'Explore Scholarships', path: ROUTES.EXPLORE, icon: Compass },
    { label: 'Eligibility Checker', path: ROUTES.ELIGIBILITY, icon: CheckCircle },
    { label: 'My Applications', path: ROUTES.APPLICATIONS, icon: FileText, badge: applications.length },
    { label: 'Saved Scholarships', path: ROUTES.SAVED, icon: Bookmark, badge: savedIds.length },
    { label: 'Deadline Planner', path: ROUTES.DEADLINES, icon: Calendar },
    { label: 'My Profile', path: ROUTES.PROFILE, icon: User },
    { label: 'Settings', path: ROUTES.SETTINGS, icon: Settings },
  ];

  return (
    <aside
      className={`hidden lg:flex flex-col border-r border-[var(--border)] bg-[var(--surface)]/85 backdrop-blur-md transition-all duration-300 shrink-0 min-h-[calc(100vh-4rem)] ${
        collapsed ? 'w-20 p-3' : 'w-64 p-4'
      }`}
    >
      {/* Collapse toggle */}
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-[var(--border)]">
        {!collapsed && (
          <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)] font-sans">
            Scholar Workspace
          </span>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded-[var(--radius-sm)] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-secondary)] transition-colors cursor-pointer ml-auto"
          title={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          aria-label={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </div>

      {/* Nav List */}
      <div className="space-y-1.5 flex-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              title={collapsed ? item.label : undefined}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3.5 py-2.5 text-xs font-semibold rounded-[var(--radius-md)] transition-all ${
                  isActive
                    ? 'bg-[var(--primary)] text-white shadow-[0_4px_12px_rgba(219,105,92,0.25)]'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-secondary)]/60'
                } ${collapsed ? 'justify-center !px-0' : 'justify-between'}`
              }
            >
              <div className="flex items-center gap-3">
                <Icon className="h-4 w-4 shrink-0" />
                {!collapsed && <span>{item.label}</span>}
              </div>

              {!collapsed && item.badge !== undefined && (
                <span
                  className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-[var(--peach-tint)] text-[var(--primary)]"
                >
                  {item.badge}
                </span>
              )}
            </NavLink>
          );
        })}
      </div>

      {/* Bottom Mini Banner */}
      {!collapsed && (
        <div className="mt-auto pt-4 border-t border-[var(--border)]">
          <div className="rounded-[var(--radius-md)] bg-[var(--peach-tint)] p-3 border border-[var(--border)]">
            <div className="flex items-center gap-1.5 text-[var(--primary)] font-bold text-xs">
              <Sparkles className="h-3.5 w-3.5" />
              <span>GRANTLY Active</span>
            </div>
            <p className="text-[11px] text-[var(--text-secondary)] mt-1 leading-snug">
              Local criteria engine loaded with 18 programs.
            </p>
          </div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
