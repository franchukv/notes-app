import { Link } from 'react-router';
import { openModal } from '../@x/modal-manager';
import { type Note } from '@/entities/note';
import { useAppDispatch, useAppSelector } from '@/shared/lib';
import { selectIsDesktop } from '@/shared/model';
import { Button } from '@/shared/ui';
import ArchiveIcon from '@/shared/assets/icons/archive-icon.svg?react';
import RestoreIcon from '@/shared/assets/icons/restore-icon.svg?react';
import DeleteIcon from '@/shared/assets/icons/delete-icon.svg?react';
import EditIcon from '@/shared/assets/icons/edit-icon.svg?react';
import { useRestoreNote } from '@/features/restore-note';

interface NoteActionsWidgetProps {
  parentUrl: string;
  note: Note;
}

export const NoteActionsWidget = ({
  parentUrl,
  note,
}: NoteActionsWidgetProps) => {
  const isDesktop = useAppSelector(selectIsDesktop);
  const dispatch = useAppDispatch();

  const buttonVariant = isDesktop ? 'border' : 'secondary-link';

  const { restoreNote, isLoading: isRestoreLoading } = useRestoreNote();

  const handleArchiveNoteClick = () => {
    dispatch(
      openModal({
        modal: 'confirm-archive',
        props: { noteId: note.id, isArchived: note.isArchived, parentUrl },
      }),
    );
  };

  const handleRestoreNoteClick = () => {
    restoreNote({ noteId: note.id, parentUrl });
  };

  const handleDeleteNoteClick = () => {
    dispatch(
      openModal({
        modal: 'confirm-delete',
        props: { noteId: note.id, parentUrl },
      }),
    );
  };

  return (
    <>
      {!note.isArchived && (
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
        onClick={
          note.isArchived ? handleRestoreNoteClick : handleArchiveNoteClick
        }
        disabled={isRestoreLoading}
      >
        {note.isArchived ? (
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
        onClick={handleDeleteNoteClick}
      >
        <DeleteIcon /> {isDesktop && 'Delete Note'}
      </Button>
    </>
  );
};
