import { useNavigate } from 'react-router';
import { useToggleNoteArchivedMutation } from '@/entities/note';
import { useToast } from '@/shared/lib';

interface RestoreNoteProps {
  noteId: number;
  parentUrl: string;
}

export const useRestoreNote = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [toggleNoteArchived, { isLoading }] = useToggleNoteArchivedMutation();

  const restoreNote = async ({ noteId, parentUrl }: RestoreNoteProps) => {
    const { error } = await toggleNoteArchived({
      id: noteId,
      isArchived: true,
    });

    if (error) {
      showToast({ message: 'Failed to restore note.', type: 'error' });
      return;
    }

    showToast({
      message: 'Note restored to active notes.',
      link: { url: '/notes', text: 'All Notes' },
    });

    navigate(parentUrl);
  };

  return { restoreNote, isLoading };
};
