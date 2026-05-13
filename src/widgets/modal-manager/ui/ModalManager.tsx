import { closeModal, selectActiveModal } from '../model/modalSlice';
import { ConfirmDeleteNoteModal } from '@/features/delete-note';
import { ConfirmArchiveNoteModal } from '@/features/archive-note';
import { ConfirmDeleteTagModal } from '@/features/delete-tag';
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

  if (activeModal.modal === 'confirm-delete-note') {
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

  if (activeModal.modal === 'confirm-delete-tag') {
    return (
      <ConfirmDeleteTagModal
        isOpen
        onClose={handleClose}
        tagId={activeModal.props.tagId}
        tagSlug={activeModal.props.tagSlug}
        parentUrl={activeModal.props.parentUrl}
      />
    );
  }

  if (activeModal.modal === 'confirm-archive-note') {
    return (
      <ConfirmArchiveNoteModal
        isOpen
        onClose={handleClose}
        noteId={activeModal.props.noteId}
        isArchived={activeModal.props.isArchived}
        parentUrl={activeModal.props.parentUrl}
      />
    );
  }
};
