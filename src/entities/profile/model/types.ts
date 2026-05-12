export interface ProfileSettings {
  colorTheme: 'light' | 'dark' | 'system';
  fontTheme: 'sans-serif' | 'serif' | 'mono';
}

export interface Profile {
  id: string;
  settings: ProfileSettings;
}
