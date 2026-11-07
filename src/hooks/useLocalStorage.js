import { useState, useEffect } from 'react';
import { getStorageItem, setStorageItem } from '../utils/localStorage';

/**
 * Custom hook to sync React state with LocalStorage.
 * @param {string} key - storage key
 * @param {*} initialValue - initial/fallback value
 */
export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    return getStorageItem(key, initialValue);
  });

  useEffect(() => {
    setStorageItem(key, storedValue);
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
};

