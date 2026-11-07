import { describe, it, expect, beforeEach } from 'vitest';
import {
  getStorageItem,
  setStorageItem,
  removeStorageItem,
  clearStorage,
} from '../localStorage';

describe('localStorage repository', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('stores and retrieves serialized JSON correctly', () => {
    const data = { theme: 'light', count: 42 };
    expect(setStorageItem('test_key', data)).toBe(true);

    const retrieved = getStorageItem('test_key');
    expect(retrieved).toEqual(data);
  });

  it('returns default value when key does not exist', () => {
    expect(getStorageItem('non_existent', 'default_val')).toBe('default_val');
  });

  it('recovers gracefully from corrupted JSON and returns default', () => {
    window.localStorage.setItem('grantly_corrupt', '{invalid-json:');
    const result = getStorageItem('corrupt', 'fallback');
    expect(result).toBe('fallback');
  });

  it('applies validator/sanitizer function if supplied', () => {
    setStorageItem('number_key', '123');
    const validator = (val) => parseInt(val, 10);
    const result = getStorageItem('number_key', 0, validator);
    expect(result).toBe(123);
  });

  it('removes item properly', () => {
    setStorageItem('remove_me', 'hello');
    expect(getStorageItem('remove_me')).toBe('hello');
    removeStorageItem('remove_me');
    expect(getStorageItem('remove_me', null)).toBeNull();
  });

  it('clears only grantly_ prefixed keys', () => {
    setStorageItem('app_item', 'grantly data');
    window.localStorage.setItem('other_app_key', 'do not touch');

    clearStorage();

    expect(getStorageItem('app_item', null)).toBeNull();
    expect(window.localStorage.getItem('other_app_key')).toBe('do not touch');
  });
});
