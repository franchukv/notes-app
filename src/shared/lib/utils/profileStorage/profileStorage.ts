import type { ProfileSettings } from '../../../model';

const KEY = 'profile_settings';

export const profileStorage = {
  get: (): Partial<ProfileSettings> => {
    try {
      const raw = localStorage.getItem(KEY);
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  },
  set: (settings: Partial<ProfileSettings>) => {
    try {
      localStorage.setItem(KEY, JSON.stringify(settings));
    } catch (error) {
      console.error(error);
    }
  },
  clear: () => localStorage.removeItem(KEY),
};
