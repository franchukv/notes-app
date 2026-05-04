import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  isRecoveryFlow: boolean;
  userId: string | null;
}

const initialState: UserState = {
  isRecoveryFlow: false,
  userId: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setIsRecoveryFlow: (state, action: PayloadAction<boolean>) => {
      state.isRecoveryFlow = action.payload;
    },
    setUserId: (state, action: PayloadAction<string>) => {
      state.userId = action.payload;
    },
    clearUserId: (state) => {
      state.userId = null;
    },
  },
  selectors: {
    selectIsRecoveryFlow: (state) => state.isRecoveryFlow,
    selectUserId: (state) => state.userId,
  },
});

export const { setIsRecoveryFlow, setUserId, clearUserId } = userSlice.actions;
export const { selectIsRecoveryFlow, selectUserId } = userSlice.selectors;
