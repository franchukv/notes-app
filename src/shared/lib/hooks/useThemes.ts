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

    if (colorTheme === 'system') {
      const media = window.matchMedia('(prefers-color-scheme: dark)');
      applyColorTheme(media.matches);

      media.addEventListener('change', (e) => applyColorTheme(e.matches));
      return () =>
        media.removeEventListener('change', (e) => applyColorTheme(e.matches));
    }

    root.setAttribute('data-font', fontTheme);
    applyColorTheme(colorTheme === 'dark');
  }, [colorTheme, fontTheme]);
};
