import React, { createContext, useContext, useEffect } from 'react';
import { removeStorageItem } from '../utils/localStorage';

export const ThemeContext = createContext({
  theme: 'light',
  isDark: false,
  toggleTheme: () => {},
  setTheme: () => {},
});

export const ThemeProvider = ({ children }) => {
  useEffect(() => {
    // Permanently ensure dark class is removed from HTML root
    const root = document.documentElement;
    root.classList.remove('dark');
    // Clear any obsolete stored theme preference
    removeStorageItem('theme');
  }, []);

  const value = {
    theme: 'light',
    isDark: false,
    toggleTheme: () => {},
    setTheme: () => {},
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export default ThemeContext;
