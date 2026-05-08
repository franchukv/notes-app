import { closeModal, selectActiveModal } from '../model/modalSlice';
import { ConfirmDeleteNoteModal } from '@/features/delete-note';
import { ConfirmArchiveModal } from '@/features/archive-note';
import { useAppDispatch, useAppSelector } from '@/shared/lib';

export const ModalManager = () => {
  const dispatch = useAppDispatch();
  const activeModal = useAppSelector(selectActiveModal);

  const handleClose = () => {
    dispatch(closeModal());
  };

  if (!activeModal) {
    return null;
  }

  if (activeModal.modal === 'confirm-delete') {
    return (
      <ConfirmDeleteNoteModal
        isOpen
        onClose={handleClose}
        noteId={activeModal.props.noteId}
        noteSlug={activeModal.props.noteSlug}
        parentUrl={activeModal.props.parentUrl}
      />
    );
  }

  if (activeModal.modal === 'confirm-archive') {
    return (
      <ConfirmArchiveModal
        isOpen
        onClose={handleClose}
        noteId={activeModal.props.noteId}
        isArchived={activeModal.props.isArchived}
        parentUrl={activeModal.props.parentUrl}
      />
    );
  }
};
