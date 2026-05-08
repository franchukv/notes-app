import { useNavigate } from 'react-router';
import { useDeleteNoteMutation } from '@/entities/note';
import { Button, Modal } from '@/shared/ui';
import DeleteIcon from '@/shared/assets/icons/delete-icon.svg?react';
import { useToast } from '@/shared/lib';

interface ConfirmDeleteNoteModalProps {
  isOpen: boolean;
  noteId: number;
  noteSlug: string;
  parentUrl: string;
  onClose: () => void;
}

export const ConfirmDeleteNoteModal = ({
  isOpen,
  noteId,
  noteSlug,
  parentUrl,
  onClose,
}: ConfirmDeleteNoteModalProps) => {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [deleteNote, { isLoading }] = useDeleteNoteMutation();

  const handleConfirm = async () => {
    onClose();
    navigate(parentUrl);

    const { error } = await deleteNote({ id: noteId });

    if (error) {
      showToast({ message: 'Failed to delete note.', type: 'error' });
      navigate(`${parentUrl}/${noteSlug}`);
      return;
    }

    showToast({ message: 'Note permanently deleted.' });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="modal">
        <div className="flex flex-col">
          <div className="p-5 flex gap-4 max-sm:flex-col">
            <div className="h-10 w-10 flex items-center justify-center bg-neutral-100 rounded-lg">
              <DeleteIcon className="h-6 w-6" />
            </div>

            <div className="flex flex-col gap-1.5 text-neutral-700">
              <h3 className="text-preset-3 text-neutral-950">Delete Note</h3>

              <p className="text-preset-5">
                Are you sure you want to permanently delete this note? <br />
                This action cannot be undone.
              </p>
            </div>
          </div>

          <div className="w-full py-4 px-5 flex items-center justify-end gap-4 border-t border-neutral-200">
            <Button variant="secondary" onClick={onClose} disabled={isLoading}>
              Cancel
            </Button>

            <Button variant="red" onClick={handleConfirm} disabled={isLoading}>
              Delete Note
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
