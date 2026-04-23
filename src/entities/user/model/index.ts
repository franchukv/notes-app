import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  isRecoveryFlow: boolean;
}

const initialState: UserState = {
  isRecoveryFlow: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setIsRecoveryFlow: (state, action: PayloadAction<boolean>) => {
      state.isRecoveryFlow = action.payload;
    },
  },
  selectors: {
    selectIsRecoveryFlow: (state) => state.isRecoveryFlow,
  },
});

export const { setIsRecoveryFlow } = userSlice.actions;
export const { selectIsRecoveryFlow } = userSlice.selectors;
