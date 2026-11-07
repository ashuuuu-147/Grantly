import React from 'react';
import { GraduationCap } from 'lucide-react';

/**
 * GRANTLY ROUTE SUSPENSE LOADING SKELETON
 * Displays a warm, zero-layout-shift placeholder while code-split page chunks load.
 */
export const PageLoadingFallback = () => {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading content..."
      className="min-h-[50vh] flex flex-col items-center justify-center p-8 space-y-4"
    >
      <div className="relative flex items-center justify-center">
        <div className="w-12 h-12 rounded-2xl bg-[var(--primary)] text-white flex items-center justify-center shadow-lg shadow-[var(--primary)]/20 animate-pulse">
          <GraduationCap className="w-6 h-6" />
        </div>
        <div className="absolute inset-0 rounded-2xl border-2 border-[var(--coral)] animate-ping opacity-25" />
      </div>
      <p className="font-heading font-bold text-xs uppercase tracking-widest text-[var(--text-muted)] animate-pulse">
        Loading intelligence...
      </p>
    </div>
  );
};

export default PageLoadingFallback;
