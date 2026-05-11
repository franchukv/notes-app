import { Link } from 'react-router';
import { NoteItem, SkeletonNoteItem, type Note } from '@/entities/note';
import { Button } from '@/shared/ui';
import { selectIsDesktop } from '@/shared/model';
import { useAppSelector } from '@/shared/lib';
import PlusIcon from '@/shared/assets/icons/plus-icon.svg?react';

interface NotesListProps {
  parentUrl: string;
  notes: Note[];
  isLoading: boolean;
  hasCreateNewNoteButton?: boolean;
  query?: string;
  children?: React.ReactNode;
}

export const NotesList = ({
  parentUrl,
  query,
  notes,
  isLoading,
  hasCreateNewNoteButton = true,
  children,
}: NotesListProps) => {
  const isDesktop = useAppSelector(selectIsDesktop);

  return (
    <div className="w-full py-5 lg:max-w-60 lg:border-r lg:border-neutral-200 xl:max-w-72.5">
      <div className="custom-container h-full">
        <div className="flex flex-col gap-4 h-full">
          {hasCreateNewNoteButton && (
            <Button
              as={Link}
              to={`${parentUrl}/create-new-note`}
              className="fixed bottom-18 right-4 z-1 sm:bottom-26.5 sm:right-8 max-sm:h-12 max-sm:w-12 max-lg:h-16 max-lg:w-16 max-lg:p-0 max-lg:rounded-full max-lg:shadow-[0_7px_11px_0_rgba(202,207,216,0.7)] lg:static"
            >
              {isDesktop ? '+ Create New Note' : <PlusIcon />}
            </Button>
          )}

          {children}

          {isLoading ? (
            <div className="flex flex-col">
              <SkeletonNoteItem />
              <SkeletonNoteItem />
              <SkeletonNoteItem />
              <SkeletonNoteItem />
              <SkeletonNoteItem />
            </div>
          ) : (
            <>
              {notes.length > 0 && (
                <div className="flex flex-col">
                  {notes.map((note) => (
                    <NoteItem
                      key={note.id}
                      parentUrl={parentUrl}
                      query={query}
                      {...note}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
