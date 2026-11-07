import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AppProvider } from './context/AppContext';
import MainLayout from './layouts/MainLayout';
import DashboardLayout from './layouts/DashboardLayout';
import CommandPalette from './components/common/CommandPalette';
import {
  HomePage,
  DashboardPage,
  ExplorePage,
  ScholarshipDetailPage,
  EligibilityPage,
  ApplicationsPage,
  SavedPage,
  DeadlinesPage,
  ProfilePage,
  SettingsPage,
  NotFoundPage,
  DesignSystemPreviewPage,
} from './pages';

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
