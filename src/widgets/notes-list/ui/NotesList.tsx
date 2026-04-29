import { Link } from 'react-router';
import { NoteItem, type Note } from '@/entities/note';
import { Button } from '@/shared/ui';
import { selectIsDesktop } from '@/shared/model';
import { useAppSelector } from '@/shared/lib';
import PlusIcon from '@/shared/assets/icons/plus-icon.svg?react';

interface NotesListProps {
  parentUrl: string;
  notes: Note[];
  children?: React.ReactNode;
}

export const NotesList = ({ parentUrl, notes, children }: NotesListProps) => {
  const isDesktop = useAppSelector(selectIsDesktop);

  return (
    <div className="w-full py-5 lg:max-w-72.5 lg:min-w-72.5 lg:border-r lg:border-neutral-200">
      <div className="custom-container">
        <div className="flex flex-col gap-4">
          <Button
            as={Link}
            to="/create-new-note"
            className="fixed bottom-18 right-4 z-1 sm:bottom-26.5 sm:right-8 max-sm:h-12 max-sm:w-12 max-lg:h-16 max-lg:w-16 max-lg:p-0 max-lg:rounded-full max-lg:shadow-[0_7px_11px_0_rgba(202,207,216,0.7)] lg:static"
          >
            {isDesktop ? '+ Create New Note' : <PlusIcon />}
          </Button>

          {children}

          <div className="flex flex-col">
            {notes.length > 0 ? (
              notes.map((note) => (
                <NoteItem
                  key={note.id}
                  url={`${parentUrl}/${note.slug}`}
                  {...note}
                />
              ))
            ) : (
              <p>
                You don’t have any notes yet. Start a new note to capture your
                thoughts and ideas.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
