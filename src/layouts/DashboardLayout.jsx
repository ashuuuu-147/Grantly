import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/layout/Navbar';
import Sidebar from '../components/layout/Sidebar';
import { ToastContainer } from '../components/ui';
import { ScrollProgressBar } from '../components/animations/ScrollAnimations';
import ErrorBoundary from '../components/common/ErrorBoundary';
import { useApp } from '../context/AppContext';
import { pageTransition } from '../styles/motionVariants';

export const DashboardLayout = () => {
  const location = useLocation();
  const { toasts, removeToast } = useApp();

  // Scroll to top on dashboard page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen flex-col bg-[#FFF8F3] text-[var(--text-primary)] transition-colors duration-200">
      {/* Skip to Main Content Link */}
      <a
        href="#dashboard-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[var(--primary)] focus:text-white focus:rounded-xl focus:shadow-xl focus:outline-none focus:ring-2 focus:ring-[var(--coral)] font-semibold text-xs"
      >
        Skip to main content
      </a>

      {/* Scroll Progress Bar at very top */}
      <ScrollProgressBar />

      <ToastContainer toasts={toasts} onClose={removeToast} />
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main
          id="dashboard-content"
          tabIndex={-1}
          className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto overflow-y-auto focus:outline-none"
        >
          <ErrorBoundary>
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                variants={pageTransition}
                initial="initial"
                animate="animate"
                exit="exit"
                className="w-full h-full"
              >
                <Outlet />
              </motion.div>
            </AnimatePresence>
          </ErrorBoundary>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
