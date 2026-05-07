import type { ModalPayload } from './types';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface ModalState {
  activeModal: ModalPayload | null;
}

const initialState: ModalState = {
  activeModal: null,
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<ModalPayload>) => {
      state.activeModal = action.payload;
    },
    closeModal: (state) => {
      state.activeModal = null;
    },
  },
  selectors: {
    selectActiveModal: (state) => state.activeModal,
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export const { selectActiveModal } = modalSlice.selectors;
