import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { ProfileSettings } from '@/shared/model';
import { profileStorage } from '@/shared/lib/utils/';

const initialState: ProfileSettings = {
  colorTheme: 'system',
  fontTheme: 'sans-serif',
  ...profileStorage.get(),
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfileSettings: (state, action: PayloadAction<ProfileSettings>) => {
      state.colorTheme = action.payload.colorTheme;
      state.fontTheme = action.payload.fontTheme;
    },
  },
  selectors: {
    selectProfileSettings: (state) => state,
  },
});

export const { setProfileSettings } = profileSlice.actions;
export const { selectProfileSettings } = profileSlice.selectors;
