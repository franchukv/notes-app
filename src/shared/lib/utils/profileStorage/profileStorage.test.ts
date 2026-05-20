import { profileStorage } from './profileStorage';

beforeEach(() => localStorage.clear());

describe('profileStorage', () => {
  test('returns empty object when storage is empty', () => {
    expect(profileStorage.get()).toEqual({});
  });

  test('sets and returns save settings', () => {
    profileStorage.set({ colorTheme: 'dark', fontTheme: 'serif' });
    expect(profileStorage.get()).toEqual({
      colorTheme: 'dark',
      fontTheme: 'serif',
    });
  });

  test('clears storage', () => {
    profileStorage.set({ colorTheme: 'dark', fontTheme: 'serif' });
    profileStorage.clear();
    expect(profileStorage.get()).toEqual({});
  });

  test('returns empty object for invalid JSON', () => {
    localStorage.setItem('invalid item', 'invalid json');
    expect(profileStorage.get()).toEqual({});
  });
});
