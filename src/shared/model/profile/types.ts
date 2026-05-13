export interface ProfileSettings {
  colorTheme: 'light' | 'dark' | 'system';
  fontTheme: 'sans-serif' | 'serif' | 'monospace';
}

export interface Profile {
  id: string;
  settings: ProfileSettings;
}
