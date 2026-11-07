import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

/**
 * GRANTLY NAVIGATION DESIGN COMPONENTS
 * Breadcrumb, TabNavigation, SidebarItem
 */

export const Breadcrumb = ({ items = [] }) => {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center text-xs font-medium text-[var(--text-muted)]">
      <ol className="flex items-center space-x-2">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className="flex items-center">
              {index > 0 && <ChevronRight className="h-3 w-3 mx-1.5 text-[var(--border)] shrink-0" />}
              {isLast || !item.to ? (
                <span className="text-[var(--text-primary)] font-semibold" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <Link
                  to={item.to}
                  className="hover:text-[var(--primary)] transition-colors"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export const TabNavigation = ({ tabs = [], activeTab, onChange, className = '' }) => {
  return (
    <div className={`flex border-b border-[var(--border)] gap-2 overflow-x-auto ${className}`}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        const Icon = tab.icon;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`flex items-center gap-2 py-3 px-4 text-xs font-semibold whitespace-nowrap border-b-2 transition-all cursor-pointer ${
              isActive
                ? 'border-[var(--primary)] text-[var(--primary)]'
                : 'border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border)]'
            }`}
          >
            {Icon && <Icon className="h-4 w-4 shrink-0" />}
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <span
                className={`ml-1 px-1.5 py-0.5 rounded-full text-[10px] ${
                  isActive
                    ? 'bg-[var(--peach-tint)] text-[var(--primary)] font-bold'
                    : 'bg-[var(--surface-secondary)] text-[var(--text-secondary)]'
                }`}
              >
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};

export const SidebarItem = ({
  icon: Icon,
  label,
  active = false,
  badge,
  onClick,
  to,
  className = '',
}) => {
  const content = (
    <div
      onClick={onClick}
      className={`flex items-center justify-between px-3.5 py-2.5 rounded-[var(--radius-md)] text-sm font-semibold transition-all cursor-pointer ${
        active
          ? 'bg-[var(--primary)] text-white shadow-[0_4px_12px_rgba(219,105,92,0.25)]'
          : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-secondary)]/70'
      } ${className}`}
    >
      <div className="flex items-center gap-3">
        {Icon && <Icon className="h-4 w-4 shrink-0" />}
        <span>{label}</span>
      </div>
      {badge && (
        <span
          className={`px-1.5 py-0.5 text-[10px] font-bold rounded-full ${
            active
              ? 'bg-white/20 text-white'
              : 'bg-[var(--peach-tint)] text-[var(--primary)]'
          }`}
        >
          {badge}
        </span>
      )}
    </div>
  );

  if (to) {
    return <Link to={to}>{content}</Link>;
  }

  return content;
};

