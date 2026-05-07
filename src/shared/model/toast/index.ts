import type { Toast } from './types';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface ToastState {
  toasts: Toast[];
}

const initialState: ToastState = {
  toasts: [],
};

export const toastSlice = createSlice({
  name: 'toasts',
  initialState,
  reducers: {
    addToast: (state, action: PayloadAction<Toast>) => {
      state.toasts.push(action.payload);
    },
    removeToast: (state, action: PayloadAction<number>) => {
      state.toasts = state.toasts.filter(
        (toast) => toast.id !== action.payload,
      );
    },
  },
  selectors: {
    selectToasts: (state) => state.toasts,
  },
});

export const { addToast, removeToast } = toastSlice.actions;
export const { selectToasts } = toastSlice.selectors;
