import { Link, useNavigate } from 'react-router';
import {
  useDeleteNoteMutation,
  useToggleNoteArchivedMutation,
  type Note,
} from '@/entities/note';
import { useAppSelector } from '@/shared/lib';
import { selectIsDesktop } from '@/shared/model';
import { Button } from '@/shared/ui';
import ArchiveIcon from '@/shared/assets/icons/archive-icon.svg?react';
import RestoreIcon from '@/shared/assets/icons/restore-icon.svg?react';
import DeleteIcon from '@/shared/assets/icons/delete-icon.svg?react';
import EditIcon from '@/shared/assets/icons/edit-icon.svg?react';

interface NoteActionsWidgetProps {
  parentUrl: string;
  note: Note;
  isArchivedNote: boolean;
}

export const NoteActionsWidget = ({
  parentUrl,
  note,
  isArchivedNote,
}: NoteActionsWidgetProps) => {
  const navigate = useNavigate();

  const isDesktop = useAppSelector(selectIsDesktop);

  const buttonVariant = isDesktop ? 'border' : 'secondary-link';

  const [toggleNoteArchived, { isLoading: isToggleNoteArchiveLoading }] =
    useToggleNoteArchivedMutation();
  const [deleteNote, { isLoading: isDeleteNoteLoading }] =
    useDeleteNoteMutation();

  const handleToggleNoteArchived = async () => {
    const response = await toggleNoteArchived({
      id: note.id,
      isArchived: note.isArchived,
    });

    if ('error' in response) {
      return;
    }

    navigate(parentUrl);
  };

  const handleDeleteNote = async () => {
    const response = await deleteNote({ id: note.id });

    if ('error' in response) {
      return;
    }

    navigate(parentUrl);
  };

  return (
    <>
      {!isArchivedNote && (
        <Button
          as={Link}
          to={`/notes/edit/${note.slug}`}
          variant={buttonVariant}
          className="justify-start"
        >
          <EditIcon /> {isDesktop && 'Edit Note'}
        </Button>
      )}

      <Button
        variant={buttonVariant}
        className="justify-start"
        onClick={handleToggleNoteArchived}
        disabled={isToggleNoteArchiveLoading}
      >
        {isArchivedNote ? (
          <>
            <RestoreIcon /> {isDesktop && 'Restore Note'}
          </>
        ) : (
          <>
            <ArchiveIcon /> {isDesktop && 'Archive Note'}
          </>
        )}
      </Button>

      <Button
        variant={buttonVariant}
        className="justify-start"
        onClick={handleDeleteNote}
        disabled={isDeleteNoteLoading}
      >
        <DeleteIcon /> {isDesktop && 'Delete Note'}
      </Button>
    </>
  );
};
