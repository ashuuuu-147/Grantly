import React, { Component } from 'react';
import { AlertTriangle, RotateCcw, Home } from 'lucide-react';
import { clearStorage } from '../../utils/localStorage';

/**
 * GRANTLY RESILIENT REACT ERROR BOUNDARY
 * Catches runtime exceptions anywhere in the component tree,
 * logs diagnostic info, and presents an accessible recovery interface.
 */
export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
    // Structured error logging
    console.error('[ErrorBoundary caught error]:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    if (this.props.onReset) {
      this.props.onReset();
    }
  };

  handleResetState = () => {
    clearStorage();
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div
          role="alert"
          aria-live="assertive"
          className="min-h-[60vh] flex items-center justify-center p-6 text-center"
        >
          <div className="max-w-md w-full rounded-2xl bg-[var(--surface)] border border-[var(--border)] p-8 shadow-[var(--shadow-card)] space-y-5">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-[#FDF0EF] text-[var(--danger)] flex items-center justify-center border border-[var(--danger)]/30">
              <AlertTriangle className="w-7 h-7" />
            </div>

            <div className="space-y-2">
              <h2 className="heading-card text-xl text-[var(--text-primary)]">
                Something went wrong
              </h2>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                An unexpected interface error occurred. You can retry loading this view or safely reset your local demo session.
              </p>
            </div>

            {/* Error Message Details (if available) */}
            {this.state.error?.message && (
              <div className="p-3 rounded-lg bg-[var(--peach-tint)] border border-[var(--border)] text-left">
                <p className="text-[11px] font-mono text-[var(--danger)] truncate">
                  {this.state.error.message}
                </p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={this.handleRetry}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[var(--primary)] text-white font-semibold text-xs shadow-sm hover:bg-[var(--primary-hover)] transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--coral)]"
              >
                <RotateCcw className="w-4 h-4" /> Try Again
              </button>

              <button
                type="button"
                onClick={() => (window.location.href = '/')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[var(--surface-secondary)] text-[var(--text-primary)] font-semibold text-xs border border-[var(--border)] hover:bg-[var(--peach-tint)] transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--coral)]"
              >
                <Home className="w-4 h-4" /> Go to Home
              </button>
            </div>

            <div className="pt-3 border-t border-[var(--border)]">
              <button
                type="button"
                onClick={this.handleResetState}
                className="text-[11px] text-[var(--text-muted)] hover:text-[var(--danger)] underline transition-colors cursor-pointer"
              >
                Reset demo storage data & reload
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
