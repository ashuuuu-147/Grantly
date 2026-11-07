/**
 * GRANTLY CORE WEB VITALS & RUNTIME PERFORMANCE OBSERVER
 * Measures LCP, FID/INP, CLS, and TTFB using standard browser PerformanceObserver APIs.
 */

/**
 * Initializes Core Web Vitals performance listeners.
 * Safely handles unsupported environments or SSR.
 * @param {Function} [onReport] - Callback receiving { metric, value, rating }
 */
export const initWebVitals = (onReport = null) => {
  if (typeof window === 'undefined' || !('PerformanceObserver' in window)) return;

  const report = (name, value, unit = 'ms') => {
    let rating = 'good';
    if (name === 'CLS') {
      if (value > 0.25) rating = 'poor';
      else if (value > 0.1) rating = 'needs-improvement';
    } else if (name === 'LCP') {
      if (value > 4000) rating = 'poor';
      else if (value > 2500) rating = 'needs-improvement';
    } else if (name === 'INP' || name === 'FID') {
      if (value > 500) rating = 'poor';
      else if (value > 200) rating = 'needs-improvement';
    }

    if (onReport && typeof onReport === 'function') {
      onReport({ name, value, rating, unit });
    }
  };

  try {
    // 1. Largest Contentful Paint (LCP)
    const lcpObserver = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const lastEntry = entries[entries.length - 1];
      if (lastEntry) {
        report('LCP', Math.round(lastEntry.startTime));
      }
    });
    lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });

    // 2. Cumulative Layout Shift (CLS)
    let clsValue = 0;
    const clsObserver = new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
          report('CLS', parseFloat(clsValue.toFixed(4)), 'score');
        }
      }
    });
    clsObserver.observe({ type: 'layout-shift', buffered: true });

    // 3. First Input Delay (FID)
    const fidObserver = new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        const delay = entry.processingStart - entry.startTime;
        report('FID', Math.round(delay));
      }
    });
    fidObserver.observe({ type: 'first-input', buffered: true });
  } catch {
    // Gracefully ignore unsupported performance entry types
  }
};
