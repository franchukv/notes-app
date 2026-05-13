import { motion, AnimatePresence } from 'motion/react';
import { createPortal } from 'react-dom';
import { closeModal, selectActiveModal } from '../model/modalSlice';
import { ConfirmDeleteNoteModal } from '@/features/delete-note';
import { ConfirmArchiveNoteModal } from '@/features/archive-note';
import { ConfirmDeleteTagModal } from '@/features/delete-tag';
import { useAppDispatch, useAppSelector } from '@/shared/lib';

export const ModalManager = () => {
  const dispatch = useAppDispatch();
  const activeModal = useAppSelector(selectActiveModal);
  let content: React.ReactNode;

  const handleClose = () => {
    dispatch(closeModal());
  };

  if (activeModal?.modal === 'confirm-delete-note') {
    content = (
      <ConfirmDeleteNoteModal
        isOpen
        onClose={handleClose}
        noteId={activeModal.props.noteId}
        noteSlug={activeModal.props.noteSlug}
        parentUrl={activeModal.props.parentUrl}
      />
    );
  }

  if (activeModal?.modal === 'confirm-delete-tag') {
    content = (
      <ConfirmDeleteTagModal
        isOpen
        onClose={handleClose}
        tagId={activeModal.props.tagId}
        tagSlug={activeModal.props.tagSlug}
        parentUrl={activeModal.props.parentUrl}
      />
    );
  }

  if (activeModal?.modal === 'confirm-archive-note') {
    content = (
      <ConfirmArchiveNoteModal
        isOpen
        onClose={handleClose}
        noteId={activeModal.props.noteId}
        isArchived={activeModal.props.isArchived}
        parentUrl={activeModal.props.parentUrl}
      />
    );
  }

  return createPortal(
    <AnimatePresence>
      {activeModal && (
        <motion.div
          key="overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="overlay"
          onClick={handleClose}
        >
          {content}
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
};
