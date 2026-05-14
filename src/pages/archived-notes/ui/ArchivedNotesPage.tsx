import { Outlet, useLocation } from 'react-router';
import { NotesList } from '@/widgets/notes-list';
import { useGetArchivedNotesQuery } from '@/entities/note';
import { useAppSelector } from '@/shared/lib';
import { selectIsDesktop } from '@/shared/model';
import { Notice } from '@/shared/ui';

export const ArchivedNotesPage = () => {
  const { pathname } = useLocation();

  const isDesktop = useAppSelector(selectIsDesktop);

  const isRootPath = pathname === '/archived-notes';

  const {
    data: notes,
    isLoading,
    isFetching,
    isSuccess,
  } = useGetArchivedNotesQuery();

  return (
    <section className="min-h-full w-full flex">
      {(isDesktop || isRootPath) && (
        <NotesList
          parentUrl="/archived-notes"
          notes={notes ?? []}
          hasCreateNewNoteButton={false}
          isLoading={isLoading || isFetching}
        >
          <h1 className="text-preset-1 lg:sr-only">Archived Notes</h1>

          <p className="text-preset-5 text-neutral-700 dark:text-neutral-200">
            All your archived notes are stored here. <br />
            You can restore or delete them anytime.
          </p>

          {isSuccess && notes.length === 0 && (
            <Notice>No notes have been archived yet.</Notice>
          )}
        </NotesList>
      )}

      {(isDesktop || !isRootPath) && <Outlet />}
    </section>
  );
};
