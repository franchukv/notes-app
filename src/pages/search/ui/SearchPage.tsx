import { Link, Outlet, useLocation, useSearchParams } from 'react-router';
import { NotesList } from '@/widgets/notes-list';
import { SearchForm } from '@/features/search';
import { useSearchNotesQuery } from '@/entities/note';
import { useAppSelector, useTitles } from '@/shared/lib';
import { selectIsDesktop } from '@/shared/model';
import { Notice } from '@/shared/ui';

export const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const { key, pathname } = useLocation();

  const isDesktop = useAppSelector(selectIsDesktop);

  const query = searchParams.get('q')?.trim() ?? '';
  const isRootPath = pathname === '/search';

  const { data: notes, isLoading, isSuccess } = useSearchNotesQuery({ query });

  useTitles({
    documentTitle: 'Search',
    headerTitle: query ? query : 'Search',
  });

  return (
    <div className="min-h-full w-full flex">
      {(isDesktop || isRootPath) && (
        <NotesList
          customKey={key}
          parentUrl="/search"
          query={query}
          notes={notes ?? []}
          isLoading={isLoading}
          hasCreateNewNoteButton={false}
        >
          <h1 className="text-preset-1 lg:sr-only">
            {query ? (
              <>
                <span className="text-neutral-600 dark:text-neutral-300">
                  Showing results for:{' '}
                </span>
                {query}
              </>
            ) : (
              'Search'
            )}
          </h1>

          {!isDesktop && (
            <SearchForm defaultValue={query} className="max-w-full" />
          )}

          {query && isSuccess && notes.length > 0 && (
            <p className="text-preset-5 text-neutral-700 dark:text-neutral-300">
              All notes matching ”{query}” are displayed below.
            </p>
          )}

          {query && isSuccess && notes.length === 0 && (
            <Notice>
              No notes match your search. <br />
              Try a different keyword or{' '}
              <Link to="/notes/create-new-note" className="underline-link">
                create a new note
              </Link>
              .
            </Notice>
          )}

          {isRootPath && !query && (
            <Notice>
              Nothing here yet. <br />
              Use the search form to start your query.
            </Notice>
          )}
        </NotesList>
      )}

      {(isDesktop || !isRootPath) && <Outlet />}
    </div>
  );
};
