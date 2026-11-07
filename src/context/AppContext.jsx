import React, { createContext, useContext, useState, useEffect } from 'react';
import { getStorageItem, setStorageItem, removeStorageItem } from '../utils/localStorage';
import { mockUser, mockApplications, mockScholarships } from '../data';

export const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  // 1. Saved Scholarships State (LocalStorage: grantly_saved_scholarships)
  const [savedIds, setSavedIds] = useState(() => {
    return getStorageItem('saved_scholarships', ['sch-101', 'sch-102', 'sch-103', 'sch-106']);
  });

  // 2. User Applications Tracker State (LocalStorage: grantly_user_applications)
  const [applications, setApplications] = useState(() => {
    return getStorageItem('user_applications', mockApplications);
  });

  // 3. User Profile State (LocalStorage: grantly_user_profile)
  const [user, setUser] = useState(() => {
    return getStorageItem('user_profile', mockUser);
  });

  // 4. Global Search Query & Filter states for Explore navigation
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // 5. Global Toast Queue
  const [toasts, setToasts] = useState([]);

  // Auto-persist changes
  useEffect(() => {
    setStorageItem('saved_scholarships', savedIds);
  }, [savedIds]);

  useEffect(() => {
    setStorageItem('user_applications', applications);
  }, [applications]);

  useEffect(() => {
    setStorageItem('user_profile', user);
  }, [user]);

  // Toast Helper
  const addToast = (title, message, type = 'info') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Toggle Save/Bookmark
  const toggleSaveScholarship = (id) => {
    setSavedIds((prev) => {
      const exists = prev.includes(id);
      const updated = exists ? prev.filter((item) => item !== id) : [...prev, id];
      const targetGrant = mockScholarships.find((s) => s.id === id);
      if (exists) {
        addToast('Removed from Saved', `"${targetGrant?.title?.slice(0, 32)}..." was removed.`, 'warning');
      } else {
        addToast('Scholarship Saved', `"${targetGrant?.title?.slice(0, 32)}..." added to bookmarks.`, 'success');
      }
      return updated;
    });
  };

  const isScholarshipSaved = (id) => savedIds.includes(id);

  // Add Scholarship to Application Tracker
  const addApplication = (scholarship, initialStatus = 'In Progress') => {
    const existing = applications.find(
      (app) => app.scholarshipId === scholarship.id || app.id === scholarship.id
    );

    if (existing) {
      addToast('Already in Tracker', `This scholarship is already being tracked as "${existing.status}".`, 'info');
      return false;
    }

    // Generate documents from scholarship required documents
    const docList = (scholarship.requiredDocuments || [
      'Academic Marksheet / Transcript',
      'Proof of Identity',
      'Personal Statement',
      'Recommendation Letter',
    ]).map((docName, idx) => ({
      name: docName,
      completed: false,
      required: idx < 3,
    }));

    const newApp = {
      id: `app-${Date.now().toString().slice(-4)}`,
      scholarshipId: scholarship.id,
      title: scholarship.title,
      provider: scholarship.provider,
      awardAmount: scholarship.awardAmount || scholarship.amount || 25000,
      amount: scholarship.awardAmount || scholarship.amount || 25000,
      status: initialStatus,
      deadline: scholarship.deadline,
      progress: initialStatus === 'Submitted' ? 100 : 20,
      lastUpdated: new Date().toISOString().split('T')[0],
      notes: `Initiated application tracking on ${new Date().toLocaleDateString()}.`,
      documents: docList,
    };

    setApplications((prev) => [newApp, ...prev]);
    addToast('Added to Applications', `"${scholarship.title.slice(0, 35)}..." is now in your pipeline.`, 'success');
    return true;
  };

  // Update Status
  const updateApplicationStatus = (appId, newStatus) => {
    setApplications((prev) =>
      prev.map((app) => {
        if (app.id === appId) {
          let newProgress = app.progress;
          if (newStatus === 'Submitted' || newStatus === 'Approved') newProgress = 100;
          if (newStatus === 'Saved') newProgress = Math.min(newProgress, 30);
          return {
            ...app,
            status: newStatus,
            progress: newProgress,
            lastUpdated: new Date().toISOString().split('T')[0],
          };
        }
        return app;
      })
    );
    addToast('Status Updated', `Application moved to "${newStatus}".`, 'info');
  };

  // Update Document Checklist Item
  const updateApplicationDocument = (appId, docIndex, completed) => {
    setApplications((prev) =>
      prev.map((app) => {
        if (app.id === appId && app.documents) {
          const updatedDocs = app.documents.map((doc, idx) =>
            idx === docIndex ? { ...doc, completed } : doc
          );
          const completedCount = updatedDocs.filter((d) => d.completed).length;
          const calculatedProgress = Math.round((completedCount / updatedDocs.length) * 100);

          return {
            ...app,
            documents: updatedDocs,
            progress: app.status === 'Submitted' || app.status === 'Approved' ? 100 : calculatedProgress,
            lastUpdated: new Date().toISOString().split('T')[0],
          };
        }
        return app;
      })
    );
  };

  // Update Notes
  const updateApplicationNotes = (appId, notes) => {
    setApplications((prev) =>
      prev.map((app) => (app.id === appId ? { ...app, notes, lastUpdated: new Date().toISOString().split('T')[0] } : app))
    );
    addToast('Notes Saved', 'Your application notes have been updated.', 'success');
  };

  // Remove Application
  const removeApplication = (appId) => {
    setApplications((prev) => prev.filter((app) => app.id !== appId));
    addToast('Application Removed', 'Removed from your active pipeline.', 'warning');
  };

  // Update Student Profile
  const updateUserProfile = (newProfileData) => {
    setUser((prev) => ({
      ...prev,
      ...newProfileData,
    }));
    addToast('Profile Updated', 'Your scholar credentials have been saved.', 'success');
  };

  // Reset Demo Data (Cleanly resets only GRANTLY localStorage keys)
  const resetDemoData = () => {
    removeStorageItem('saved_scholarships');
    removeStorageItem('user_applications');
    removeStorageItem('user_profile');

    setSavedIds(['sch-101', 'sch-102', 'sch-103', 'sch-106']);
    setApplications(mockApplications);
    setUser(mockUser);

    addToast('Data Reset Complete', 'All demo applications and saved items were restored to defaults.', 'info');
  };

  const value = {
    scholarships: mockScholarships,
    savedIds,
    toggleSaveScholarship,
    isScholarshipSaved,
    isSaved: isScholarshipSaved,
    toggleSave: toggleSaveScholarship,
    isApplied: (id) => applications.some((app) => app.id === id || app.scholarshipId === id),
    applications,
    setApplications,
    addApplication,
    updateApplicationStatus,
    updateApplicationDocument,
    updateApplicationNotes,
    removeApplication,
    user,
    setUser,
    updateUserProfile,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    toasts,
    addToast,
    removeToast,
    resetDemoData,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export const useAppContext = useApp;

export default AppContext;
