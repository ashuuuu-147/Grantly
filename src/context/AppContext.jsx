import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { getStorageItem, setStorageItem, removeStorageItem } from '../utils/localStorage';
import {
  validateUserProfile,
  validateApplicationsList,
  validateSavedIds,
  sanitizeString,
} from '../utils/security';
import { mockUser, mockApplications, mockScholarships } from '../data';

export const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  // 1. Saved Scholarships State (LocalStorage: grantly_saved_scholarships with schema validation)
  const [savedIds, setSavedIds] = useState(() => {
    return getStorageItem(
      'saved_scholarships',
      ['sch-101', 'sch-102', 'sch-103', 'sch-106'],
      validateSavedIds
    );
  });

  // 2. User Applications Tracker State (LocalStorage: grantly_user_applications with schema validation)
  const [applications, setApplications] = useState(() => {
    return getStorageItem('user_applications', mockApplications, validateApplicationsList);
  });

  // 3. User Profile State (LocalStorage: grantly_user_profile with schema validation)
  const [user, setUser] = useState(() => {
    return getStorageItem('user_profile', mockUser, validateUserProfile);
  });

  // 4. Global Search Query & Filter states for Explore navigation
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // 5. Global Toast Queue
  const [toasts, setToasts] = useState([]);

  // Auto-persist changes to validated storage
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
  const addToast = useCallback((title, message, type = 'info') => {
    const id = Date.now() + Math.random();
    const cleanTitle = sanitizeString(title, 80);
    const cleanMsg = sanitizeString(message, 250);
    setToasts((prev) => [...prev, { id, title: cleanTitle, message: cleanMsg, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Toggle Save/Bookmark
  const toggleSaveScholarship = useCallback((id) => {
    if (!id || typeof id !== 'string') return;
    const cleanId = sanitizeString(id, 50);

    setSavedIds((prev) => {
      const exists = prev.includes(cleanId);
      const updated = exists ? prev.filter((item) => item !== cleanId) : [...prev, cleanId];
      const targetGrant = mockScholarships.find((s) => s.id === cleanId);
      const title = targetGrant?.title || 'Scholarship';

      if (exists) {
        addToast('Removed from Saved', `"${title.slice(0, 32)}..." was removed.`, 'warning');
      } else {
        addToast('Scholarship Saved', `"${title.slice(0, 32)}..." added to bookmarks.`, 'success');
      }
      return updated;
    });
  }, [addToast]);

  const isScholarshipSaved = useCallback((id) => {
    return Boolean(id && savedIds.includes(String(id)));
  }, [savedIds]);

  // Add Scholarship to Application Tracker (accepts either object or string id)
  const addApplication = useCallback((scholarshipOrId, initialStatus = 'In Progress') => {
    if (!scholarshipOrId) return false;

    let targetScholarship = null;
    if (typeof scholarshipOrId === 'string') {
      targetScholarship = mockScholarships.find((s) => s.id === scholarshipOrId);
    } else if (typeof scholarshipOrId === 'object' && scholarshipOrId.id) {
      targetScholarship = scholarshipOrId;
    }

    if (!targetScholarship) {
      addToast('Error', 'Could not locate scholarship details to add.', 'danger');
      return false;
    }

    const targetId = targetScholarship.id;
    const existing = applications.find(
      (app) => app.scholarshipId === targetId || app.id === targetId
    );

    if (existing) {
      addToast('Already in Tracker', `This scholarship is already being tracked as "${existing.status}".`, 'info');
      return false;
    }

    // Generate documents from scholarship required documents
    const rawDocs = targetScholarship.requiredDocuments || [
      'Academic Marksheet / Transcript',
      'Proof of Identity',
      'Personal Statement',
      'Recommendation Letter',
    ];

    const docList = rawDocs.map((docName, idx) => ({
      name: sanitizeString(docName, 120),
      completed: false,
      required: idx < 3,
    }));

    const awardVal = typeof targetScholarship.awardAmount === 'number'
      ? targetScholarship.awardAmount
      : typeof targetScholarship.amount === 'number'
      ? targetScholarship.amount
      : 25000;

    const newApp = {
      id: `app-${Date.now().toString().slice(-4)}`,
      scholarshipId: targetId,
      title: sanitizeString(targetScholarship.title || 'Scholarship Opportunity', 150),
      provider: sanitizeString(targetScholarship.provider || 'Funding Provider', 120),
      awardAmount: awardVal,
      amount: awardVal,
      status: ['Saved', 'In Progress', 'Submitted', 'Approved', 'Rejected'].includes(initialStatus)
        ? initialStatus
        : 'In Progress',
      deadline: sanitizeString(targetScholarship.deadline || '', 20),
      progress: initialStatus === 'Submitted' ? 100 : 20,
      lastUpdated: new Date().toISOString().split('T')[0],
      notes: `Initiated application tracking on ${new Date().toLocaleDateString()}.`,
      documents: docList,
    };

    setApplications((prev) => [newApp, ...prev]);
    addToast('Added to Applications', `"${newApp.title.slice(0, 35)}..." is now in your pipeline.`, 'success');
    return true;
  }, [applications, addToast]);

  // Update Status
  const updateApplicationStatus = useCallback((appId, newStatus) => {
    if (!appId || !newStatus) return;
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
  }, [addToast]);

  // Update Document Checklist Item
  const updateApplicationDocument = useCallback((appId, docIndex, completed) => {
    if (!appId || typeof docIndex !== 'number') return;
    setApplications((prev) =>
      prev.map((app) => {
        if (app.id === appId && Array.isArray(app.documents)) {
          const updatedDocs = app.documents.map((doc, idx) =>
            idx === docIndex ? { ...doc, completed: Boolean(completed) } : doc
          );
          const completedCount = updatedDocs.filter((d) => d.completed).length;
          const calculatedProgress = updatedDocs.length > 0
            ? Math.round((completedCount / updatedDocs.length) * 100)
            : 0;

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
  }, []);

  // Add Custom Document Requirement to Checklist
  const addApplicationCustomDocument = useCallback((appId, docName) => {
    if (!appId || !docName || !docName.trim()) return;
    const cleanName = sanitizeString(docName.trim(), 120);

    setApplications((prev) =>
      prev.map((app) => {
        if (app.id === appId) {
          const docs = Array.isArray(app.documents) ? [...app.documents] : [];
          docs.push({ name: cleanName, completed: false, required: false });
          const completedCount = docs.filter((d) => d.completed).length;
          const calculatedProgress = docs.length > 0
            ? Math.round((completedCount / docs.length) * 100)
            : 0;

          return {
            ...app,
            documents: docs,
            progress: app.status === 'Submitted' || app.status === 'Approved' ? 100 : calculatedProgress,
            lastUpdated: new Date().toISOString().split('T')[0],
          };
        }
        return app;
      })
    );
    addToast('Document Added', `Added "${cleanName}" to requirement checklist.`, 'success');
  }, [addToast]);

  // Update Notes (with sanitization)
  const updateApplicationNotes = useCallback((appId, notes) => {
    if (!appId) return;
    const cleanNotes = sanitizeString(notes, 3000);
    setApplications((prev) =>
      prev.map((app) =>
        app.id === appId
          ? { ...app, notes: cleanNotes, lastUpdated: new Date().toISOString().split('T')[0] }
          : app
      )
    );
    addToast('Notes Saved', 'Your application notes have been updated.', 'success');
  }, [addToast]);

  // Remove Application
  const removeApplication = useCallback((appId) => {
    if (!appId) return;
    setApplications((prev) => prev.filter((app) => app.id !== appId));
    addToast('Application Removed', 'Removed from your active pipeline.', 'warning');
  }, [addToast]);

  // Update Student Profile
  const updateUserProfile = useCallback((newProfileData) => {
    setUser((prev) => validateUserProfile({ ...prev, ...newProfileData }, prev));
    addToast('Profile Updated', 'Your scholar credentials have been saved.', 'success');
  }, [addToast]);

  // Reset Demo Data (Cleanly resets only GRANTLY localStorage keys)
  const resetDemoData = useCallback(() => {
    removeStorageItem('saved_scholarships');
    removeStorageItem('user_applications');
    removeStorageItem('user_profile');

    setSavedIds(['sch-101', 'sch-102', 'sch-103', 'sch-106']);
    setApplications(mockApplications);
    setUser(mockUser);

    addToast('Data Reset Complete', 'All demo applications and saved items were restored to defaults.', 'info');
  }, [addToast]);

  const value = useMemo(
    () => ({
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
      addApplicationCustomDocument,
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
    }),
    [
      savedIds,
      toggleSaveScholarship,
      isScholarshipSaved,
      applications,
      addApplication,
      updateApplicationStatus,
      updateApplicationDocument,
      addApplicationCustomDocument,
      updateApplicationNotes,
      removeApplication,
      user,
      updateUserProfile,
      searchQuery,
      selectedCategory,
      toasts,
      addToast,
      removeToast,
      resetDemoData,
    ]
  );

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
