import { useNavigate } from 'react-router';
import { useToggleNoteArchivedMutation } from '@/entities/note';

interface RestoreNoteProps {
  noteId: number;
  parentUrl: string;
}

export const useRestoreNote = () => {
  const navigate = useNavigate();
  const [toggleNoteArchived, { isLoading }] = useToggleNoteArchivedMutation();

  const restoreNote = async ({ noteId, parentUrl }: RestoreNoteProps) => {
    const response = await toggleNoteArchived({ id: noteId, isArchived: true });

    if ('error' in response) {
      return;
    }

    navigate(parentUrl);
  };

  return { restoreNote, isLoading };
};
