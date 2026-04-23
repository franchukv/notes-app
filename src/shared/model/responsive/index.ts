import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface ResponsiveState {
  isDesktop: boolean;
}

const initialState: ResponsiveState = {
  isDesktop: false,
};

export const responsiveSlice = createSlice({
  name: 'responsive',
  initialState,
  reducers: {
    setIsDesktop: (state, action: PayloadAction<boolean>) => {
      state.isDesktop = action.payload;
    },
  },
  selectors: {
    selectIsDesktop: (state) => state.isDesktop,
  },
});

export const { setIsDesktop } = responsiveSlice.actions;
export const { selectIsDesktop } = responsiveSlice.selectors;
