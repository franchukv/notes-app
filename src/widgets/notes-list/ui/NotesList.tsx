import { NoteItem, type Note } from '@/entities/note';
import { useAppSelector } from '@/shared/lib';
import { selectIsDesktop } from '@/shared/model';
import { Button } from '@/shared/ui';
import PlusIcon from '@/shared/assets/icons/plus-icon.svg?react';

interface NotesListProps {
  parentSlug: string;
  notes: Note[];
  children?: React.ReactNode;
}

export const NotesList = ({ parentSlug, notes, children }: NotesListProps) => {
  const isDesktop = useAppSelector(selectIsDesktop);

  return (
    <div className="w-full py-5 lg:max-w-72.5 lg:min-w-72.5 lg:border-r lg:border-neutral-200">
      <div className="custom-container">
        <div className="flex flex-col gap-4">
          <Button className="fixed bottom-18 right-4 sm:bottom-26.5 sm:right-8 max-sm:h-12 max-sm:w-12 max-lg:h-16 max-lg:w-16 max-lg:p-0 max-lg:rounded-full max-lg:shadow-[0_7px_11px_0_rgba(202,207,216,0.7)] lg:static">
            {isDesktop ? '+ Create New Note' : <PlusIcon />}
          </Button>

          {children}

          <div className="flex flex-col">
            {notes.length > 0 &&
              notes.map((note) => (
                <NoteItem
                  key={note.id}
                  url={`/${parentSlug}/${note.slug}`}
                  {...note}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};
