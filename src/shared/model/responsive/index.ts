import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface ResponsiveState {
  deviceType: 'desktop' | 'tablet' | 'mobile';
}

const initialState: ResponsiveState = {
  deviceType: 'mobile',
};

export const responsiveSlice = createSlice({
  name: 'responsive',
  initialState,
  reducers: {
    setDeviceType: (
      state,
      action: PayloadAction<ResponsiveState['deviceType']>,
    ) => {
      state.deviceType = action.payload;
    },
  },
  selectors: {
    selectDeviceType: (state) => state.deviceType,
    selectIsDesktop: (state) => state.deviceType === 'desktop',
    selectIsTablet: (state) => state.deviceType === 'tablet',
    selectIsMobile: (state) => state.deviceType === 'mobile',
  },
});

export const { setDeviceType } = responsiveSlice.actions;
export const {
  selectDeviceType,
  selectIsDesktop,
  selectIsTablet,
  selectIsMobile,
} = responsiveSlice.selectors;
