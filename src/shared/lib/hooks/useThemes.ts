import { useEffect } from 'react';

type ColorTheme = 'light' | 'dark' | 'system';
type FontTheme = 'sans-serif' | 'serif' | 'monospace';

interface UseThemesProps {
  colorTheme?: ColorTheme;
  fontTheme?: FontTheme;
}

export const useThemes = ({
  colorTheme = 'system',
  fontTheme = 'sans-serif',
}: UseThemesProps) => {
  useEffect(() => {
    const root = document.documentElement;

    const applyColorTheme = (isDark: boolean) => {
      root.classList.toggle('dark', isDark);
    };

    root.setAttribute('data-font', fontTheme);
    applyColorTheme(colorTheme === 'dark');

    if (colorTheme === 'system') {
      const media = window.matchMedia('(prefers-color-scheme: dark)');
      applyColorTheme(media.matches);

      const handler = (e: MediaQueryListEvent) => {
        applyColorTheme(e.matches);
      };

      media.addEventListener('change', handler);

      return () => media.removeEventListener('change', handler);
    }
  }, [colorTheme, fontTheme]);
};
