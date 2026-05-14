import { Outlet, useLocation } from 'react-router';
import { NotesList } from '@/widgets/notes-list';
import { useGetNotArchivedNotesQuery } from '@/entities/note';
import { useAppSelector } from '@/shared/lib';
import { selectIsDesktop } from '@/shared/model';
import { Notice } from '@/shared/ui';

export const NotesPage = () => {
  const { pathname } = useLocation();

  const isDesktop = useAppSelector(selectIsDesktop);

  const isRootPath = pathname === '/notes';

  const {
    data: notes,
    isLoading,
    isFetching,
    isSuccess,
  } = useGetNotArchivedNotesQuery();

  return (
    <section className="min-h-full w-full flex">
      {(isDesktop || isRootPath) && (
        <NotesList
          parentUrl="/notes"
          notes={notes ?? []}
          isLoading={isLoading || isFetching}
        >
          <h1 className="text-preset-1 lg:sr-only">All Notes</h1>

          {isSuccess && notes.length === 0 && (
            <Notice>
              You don’t have any active notes yet. <br />
              Start a new note to capture your thoughts and ideas.
            </Notice>
          )}
        </NotesList>
      )}

      {(isDesktop || !isRootPath) && <Outlet />}
    </section>
  );
};
