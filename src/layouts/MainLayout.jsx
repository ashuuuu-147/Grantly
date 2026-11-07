import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/common/Footer';
import { ToastContainer } from '../components/ui';
import { ScrollProgressBar } from '../components/animations/ScrollAnimations';
import { useApp } from '../context/AppContext';
import { pageTransition } from '../styles/motionVariants';

export const MainLayout = () => {
  const location = useLocation();
  const { toasts, removeToast } = useApp();
  const isHomePage = location.pathname === '/';

  // Smooth scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen flex-col bg-[#FFF8F3] text-[var(--text-primary)] transition-colors duration-200">
      {/* Scroll Progress Bar at very top */}
      <ScrollProgressBar />

      {/* Toast notifications portal */}
      <ToastContainer toasts={toasts} onClose={removeToast} />

      {/* Show standard app navbar if not on landing page */}
      {!isHomePage && <Navbar />}

      <main className="flex-1">
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
      </main>

      {/* Show standard app footer if not on landing page */}
      {!isHomePage && <Footer />}
    </div>
  );
};

export default MainLayout;
