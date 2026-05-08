export {
  modalSlice,
  openModal,
  closeModal,
  selectActiveModal,
} from './model/modalSlice';
export type {
  ConfirmDeleteNoteModalPayload,
  ConfirmArchiveModalPayload,
} from './model/types';
export { ModalManager } from './ui/ModalManager';
