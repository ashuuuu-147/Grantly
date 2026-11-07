/**
 * GRANTLY RESILIENT LOCALSTORAGE REPOSITORY
 * Provides defensive storage interactions with schema validation,
 * quota overflow mitigation, corrupted JSON recovery, and in-memory fallback.
 */

const STORAGE_PREFIX = 'grantly_';

// In-memory fallback cache when localStorage is restricted (private browsing / disabled cookies)
const memoryCache = new Map();

/**
 * Checks whether localStorage is supported and accessible in current runtime.
 * @returns {boolean}
 */
export const isStorageAvailable = () => {
  if (typeof window === 'undefined') return false;
  try {
    const testKey = `${STORAGE_PREFIX}__test__`;
    window.localStorage.setItem(testKey, '1');
    window.localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
};

const storageActive = isStorageAvailable();

/**
 * Safely retrieve and validate an item from localStorage.
 * Automatically recovers from corrupt or tampered storage values.
 *
 * @param {string} key - Storage key without prefix
 * @param {*} defaultValue - Fallback value if missing, corrupt, or invalid
 * @param {Function} [validator] - Optional validator/sanitizer: (parsed, default) => validated
 * @returns {*} Validated stored value or defaultValue
 */
export const getStorageItem = (key, defaultValue = null, validator = null) => {
  const fullKey = `${STORAGE_PREFIX}${key}`;

  if (!storageActive) {
    const memVal = memoryCache.get(fullKey);
    if (memVal === undefined) return defaultValue;
    return validator ? validator(memVal, defaultValue) : memVal;
  }

  try {
    const raw = window.localStorage.getItem(fullKey);
    if (raw === null || raw === undefined) {
      return defaultValue;
    }

    const parsed = JSON.parse(raw);
    if (validator && typeof validator === 'function') {
      return validator(parsed, defaultValue);
    }
    return parsed;
  } catch (error) {
    console.warn(`[StorageRepository] Recovering from corrupt key "${key}". Resetting to default.`, error);
    // Auto-heal by restoring default
    try {
      window.localStorage.removeItem(fullKey);
    } catch {
      // ignore
    }
    return defaultValue;
  }
};

/**
 * Safely store an item in localStorage with quota management.
 *
 * @param {string} key - Storage key without prefix
 * @param {*} value - Serializable value
 * @returns {boolean} Whether the write succeeded
 */
export const setStorageItem = (key, value) => {
  const fullKey = `${STORAGE_PREFIX}${key}`;

  if (!storageActive) {
    memoryCache.set(fullKey, value);
    return true;
  }

  try {
    const serialized = JSON.stringify(value);
    window.localStorage.setItem(fullKey, serialized);
    return true;
  } catch (error) {
    const isQuotaExceeded =
      error instanceof DOMException &&
      (error.code === 22 ||
        error.code === 1014 ||
        error.name === 'QuotaExceededError' ||
        error.name === 'NS_ERROR_DOM_QUOTA_REACHED');

    if (isQuotaExceeded) {
      console.error(`[StorageRepository] Storage quota exceeded when writing "${key}".`, error);
    } else {
      console.error(`[StorageRepository] Error writing key "${key}":`, error);
    }

    // Fall back to memory cache
    memoryCache.set(fullKey, value);
    return false;
  }
};

/**
 * Remove an item from storage.
 * @param {string} key - Storage key without prefix
 */
export const removeStorageItem = (key) => {
  const fullKey = `${STORAGE_PREFIX}${key}`;
  memoryCache.delete(fullKey);

  if (storageActive) {
    try {
      window.localStorage.removeItem(fullKey);
    } catch (error) {
      console.error(`[StorageRepository] Error removing key "${key}":`, error);
    }
  }
};

/**
 * Clear all localStorage keys with the platform prefix only.
 * Preserves other application keys on the same origin.
 */
export const clearStorage = () => {
  memoryCache.clear();

  if (!storageActive) return;

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
    console.error('[StorageRepository] Error clearing platform storage:', error);
  }
};
