/**
 * LocalStorage utilities with safe error handling and JSON serialization.
 */

const STORAGE_PREFIX = 'grantly_';

/**
 * Retrieve an item from localStorage with a fallback value.
 * @param {string} key - Storage key (will be automatically prefixed)
 * @param {*} defaultValue - Fallback value if key is not found or parsing fails
 * @returns {*} Stored value or default
 */
export const getStorageItem = (key, defaultValue = null) => {
  if (typeof window === 'undefined') return defaultValue;
  try {
    const rawValue = window.localStorage.getItem(`${STORAGE_PREFIX}${key}`);
    if (rawValue === null || rawValue === undefined) {
      return defaultValue;
    }
    return JSON.parse(rawValue);
  } catch (error) {
    console.warn(`[localStorage] Error reading key "${key}":`, error);
    return defaultValue;
  }
};

/**
 * Save an item to localStorage.
 * @param {string} key - Storage key
 * @param {*} value - Value to serialize and store
 * @returns {boolean} Whether operation succeeded
 */
export const setStorageItem = (key, value) => {
  if (typeof window === 'undefined') return false;
  try {
    window.localStorage.setItem(`${STORAGE_PREFIX}${key}`, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`[localStorage] Error writing key "${key}":`, error);
    return false;
  }
};

/**
 * Remove an item from localStorage.
 * @param {string} key - Storage key
 */
export const removeStorageItem = (key) => {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.removeItem(`${STORAGE_PREFIX}${key}`);
  } catch (error) {
    console.error(`[localStorage] Error removing key "${key}":`, error);
  }
};

/**
 * Clear all localStorage keys with the platform prefix.
 */
export const clearStorage = () => {
  if (typeof window === 'undefined') return;
  try {
    const keysToRemove = [];
    for (let i = 0; i < window.localStorage.length; i++) {
      const key = window.localStorage.key(i);
      if (key && key.startsWith(STORAGE_PREFIX)) {
        keysToRemove.push(key);
      }
    }
    keysToRemove.forEach((key) => window.localStorage.removeItem(key));
  } catch (error) {
    console.error('[localStorage] Error clearing platform storage:', error);
  }
};

