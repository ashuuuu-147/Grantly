import React from 'react';

export const PageHeader = ({ title, subtitle, badge, action }) => {
  return (
    <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-[var(--border)] pb-6">
      <div className="space-y-1">
        <div className="flex items-center gap-3">
          <h1 className="heading-page text-[var(--text-primary)]">
            {title}
          </h1>
          {badge && <div>{badge}</div>}
        </div>
        {subtitle && (
          <p className="text-sm sm:text-base text-[var(--text-secondary)]">
            {subtitle}
          </p>
        )}
      </div>
      {action && <div className="flex items-center gap-3 shrink-0">{action}</div>}
    </div>
  );
};

export default PageHeader;
