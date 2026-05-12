import { useNavigate } from 'react-router';
import { useToggleNoteArchivedMutation } from '@/entities/note';
import { Button, Modal } from '@/shared/ui';
import ArchiveIcon from '@/shared/assets/icons/archive-icon.svg?react';
import { useToast } from '@/shared/lib';

interface ConfirmArchiveNoteModalProps {
  isOpen: boolean;
  noteId: number;
  isArchived: boolean;
  parentUrl: string;
  onClose: () => void;
}

export const ConfirmArchiveNoteModal = ({
  isOpen,
  noteId,
  isArchived,
  parentUrl,
  onClose,
}: ConfirmArchiveNoteModalProps) => {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [toggleNoteArchived, { isLoading }] = useToggleNoteArchivedMutation();

  const handleConfirm = async () => {
    const { error } = await toggleNoteArchived({
      id: noteId,
      isArchived,
    });

    onClose();

    if (error) {
      showToast({ message: 'Failed to archive note.', type: 'error' });
      return;
    }

    showToast({
      message: 'Note archived.',
      link: { url: '/archived-notes', text: 'Archived Notes' },
    });
    navigate(parentUrl);
  };

  return (
    <Modal isOpen={isOpen} onClose={isLoading ? () => {} : onClose}>
      <div className="modal">
        <div className="flex flex-col">
          <div className="p-5 flex gap-4 max-sm:flex-col">
            <div className="h-10 w-10 flex items-center justify-center bg-neutral-100 rounded-lg">
              <ArchiveIcon className="h-6 w-6" />
            </div>

            <div className="flex flex-col gap-1.5 text-neutral-700">
              <h3 className="text-preset-3 text-neutral-950">Archive Note</h3>

              <p className="text-preset-5">
                Are you sure you want to archive this note? <br />
                You can find it in the Archived Notes section and restore it
                anytime.
              </p>
            </div>
          </div>

          <div className="w-full py-4 px-5 flex items-center justify-end gap-4 border-t border-neutral-200">
            <Button variant="secondary" onClick={onClose} disabled={isLoading}>
              Cancel
            </Button>

            <Button
              variant="primary"
              onClick={handleConfirm}
              isLoading={isLoading}
            >
              Archive Note
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
