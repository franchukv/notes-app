import { useNavigate } from 'react-router';
import { useDeleteTagMutation } from '@/entities/tag';
import { Button, Modal } from '@/shared/ui';
import DeleteIcon from '@/shared/assets/icons/delete-icon.svg?react';
import { useToast } from '@/shared/lib';

interface ConfirmDeleteTagModalProps {
  isOpen: boolean;
  tagId: number;
  tagSlug: string;
  parentUrl: string;
  onClose: () => void;
}

export const ConfirmDeleteTagModal = ({
  isOpen,
  tagId,
  tagSlug,
  parentUrl,
  onClose,
}: ConfirmDeleteTagModalProps) => {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [deleteTag, { isLoading }] = useDeleteTagMutation();

  const handleConfirm = async () => {
    const { error } = await deleteTag({ id: tagId });

    if (error) {
      showToast({ message: 'Failed to delete tag.', type: 'error' });
      navigate(`${parentUrl}/${tagSlug}`);
      return;
    }

    showToast({ message: 'Tag permanently deleted.' });
    onClose();
    navigate(parentUrl);
  };

  return (
    <Modal isOpen={isOpen} onClose={isLoading ? () => {} : onClose}>
      <div className="modal">
        <div className="flex flex-col">
          <div className="p-5 flex gap-4 max-sm:flex-col">
            <div className="min-w-10 h-10 w-10 flex items-center justify-center bg-neutral-100 rounded-lg border border-neutral-200 dark:bg-neutral-600 dark:border-neutral-600">
              <DeleteIcon className="h-6 w-6" />
            </div>

            <div className="flex flex-col gap-1.5 text-neutral-700 dark:text-neutral-200">
              <h3 className="text-preset-3 text-neutral-950 dark:text-white">
                Delete Tag
              </h3>

              <p className="text-preset-5">
                Are you sure you want to permanently delete this tag? <br />
                This action cannot be undone.
              </p>
            </div>
          </div>

          <div className="w-full py-4 px-5 flex items-center justify-end gap-4 border-t border-neutral-200 dark:border-neutral-600">
            <Button variant="secondary" onClick={onClose} disabled={isLoading}>
              Cancel
            </Button>

            <Button variant="red" onClick={handleConfirm} isLoading={isLoading}>
              Delete Tag
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
