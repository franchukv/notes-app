import { useLocation, useMatches, useParams, type UIMatch } from 'react-router';
import { ActionBarWidget } from '@/widgets/action-bar';
import { NoteActionsWidget } from '@/widgets/note-actions';
import { NoteContent, SkeletonNoteContent } from '@/widgets/note-content';
import { useGetNoteBySlugQuery } from '@/entities/note';
import { useAppSelector, usePageTitle } from '@/shared/lib';
import { selectIsDesktop } from '@/shared/model';

export const NotePage = () => {
  const { pathname } = useLocation();
  const { tagSlug, noteSlug } = useParams();
  const matches = useMatches() as UIMatch<unknown, { title?: string }>[];

  const isDesktop = useAppSelector(selectIsDesktop);
  const headerTitle = matches[matches.length - 2].handle?.title;

  const isArchivedNote = pathname.includes('/archived-notes');
  const parentUrl = isArchivedNote
    ? '/archived-notes'
    : tagSlug
      ? `/tags/${tagSlug}`
      : '/notes';

  const {
    data: note,
    isLoading,
    isSuccess,
  } = useGetNoteBySlugQuery({ slug: noteSlug! });

  usePageTitle({
    title: note?.title,
    headerTitle: headerTitle,
    previousHeaderTitle: true,
  });

  return (
    <div className="w-full flex">
      <div className="h-full w-full py-5 flex flex-col lg:border-r lg:border-neutral-200 lg:max-w-[calc(100%-(180px))] xl:max-w-[calc(100%-290px)]">
        <div className="custom-container h-full flex">
          <div className="w-full flex flex-col gap-3 sm:gap-4">
            {!isDesktop && (
              <ActionBarWidget parentUrl={parentUrl}>
                {isSuccess && (
                  <NoteActionsWidget parentUrl={parentUrl} note={note} />
                )}
              </ActionBarWidget>
            )}

            {isSuccess ? (
              <NoteContent note={note} />
            ) : isLoading ? (
              <SkeletonNoteContent isArchivedNote={isArchivedNote} />
            ) : (
              <div className="m-auto text-preset-3 text-center">
                Note not found
              </div>
            )}
          </div>
        </div>
      </div>

      {isDesktop && isSuccess && (
        <aside className="h-full w-full py-5 flex flex-col gap-3 lg:max-w-45 xl:max-w-72.5">
          <div className="custom-container">
            <div className="flex flex-col gap-3">
              <NoteActionsWidget parentUrl={parentUrl} note={note} />
            </div>
          </div>
        </aside>
      )}
    </div>
  );
};
