import { useEffect } from 'react';

type ColorTheme = 'light' | 'dark' | 'system';

export const useTheme = (colorTheme: ColorTheme) => {
  useEffect(() => {
    const root = document.documentElement;

    const applyTheme = (isDark: boolean) => {
      root.classList.toggle('dark', isDark);
    };

    if (colorTheme === 'system') {
      const media = window.matchMedia('(prefers-color-scheme: dark)');
      applyTheme(media.matches);

      media.addEventListener('change', (e) => applyTheme(e.matches));
      return () =>
        media.removeEventListener('change', (e) => applyTheme(e.matches));
    }

    applyTheme(colorTheme === 'dark');
  }, [colorTheme]);
};
