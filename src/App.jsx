import React, { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AppProvider } from './context/AppContext';
import MainLayout from './layouts/MainLayout';
import DashboardLayout from './layouts/DashboardLayout';
import CommandPalette from './components/common/CommandPalette';
import PageLoadingFallback from './components/common/PageLoadingFallback';

// Code-split page routes for optimal Core Web Vitals (LCP, FID) and minimal initial chunk payload
const HomePage = lazy(() => import('./pages/HomePage'));
const ExplorePage = lazy(() => import('./pages/ExplorePage'));
const ScholarshipDetailPage = lazy(() => import('./pages/ScholarshipDetailPage'));
const EligibilityPage = lazy(() => import('./pages/EligibilityPage'));
const SavedPage = lazy(() => import('./pages/SavedPage'));
const DesignSystemPreviewPage = lazy(() => import('./pages/DesignSystemPreviewPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

// Scholar dashboard route views
const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const ApplicationsPage = lazy(() => import('./pages/ApplicationsPage'));
const DeadlinesPage = lazy(() => import('./pages/DeadlinesPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const SettingsPage = lazy(() => import('./pages/SettingsPage'));

function AppContent() {
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
      />

      <Suspense fallback={<PageLoadingFallback />}>
        <Routes>
          {/* General platform views */}
          <Route element={<MainLayout onOpenCommandPalette={() => setCommandPaletteOpen(true)} />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/explore" element={<ExplorePage />} />
            <Route path="/scholarship/:id" element={<ScholarshipDetailPage />} />
            <Route path="/eligibility" element={<EligibilityPage />} />
            <Route path="/saved" element={<SavedPage />} />
            <Route path="/design-system" element={<DesignSystemPreviewPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>

          {/* Scholar workspace dashboard views */}
          <Route element={<DashboardLayout onOpenCommandPalette={() => setCommandPaletteOpen(true)} />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/applications" element={<ApplicationsPage />} />
            <Route path="/deadlines" element={<DeadlinesPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppProvider>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </AppProvider>
    </ThemeProvider>
  );
}

export default App;
