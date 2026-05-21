import { profileStorage } from './profileStorage';

beforeEach(() => {
  localStorage.clear();
});

afterEach(() => {
  vi.restoreAllMocks();
});

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
    vi.spyOn(Storage.prototype, 'getItem').mockReturnValue('invalid-json');

    expect(profileStorage.get()).toEqual({});
  });

  test('logs error when storage throw error on set', () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('Storage error');
    });

    profileStorage.set({ colorTheme: 'dark' });

    expect(errorSpy).toHaveBeenCalled();
  });
});
