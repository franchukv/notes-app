import cn from 'classnames';
import { Outlet, useLocation, useParams } from 'react-router';
import { NotesList } from '@/widgets/notes-list';
import { ActionBarWidget } from '@/widgets/action-bar';
import { useGetTagBySlugQuery } from '@/entities/tag';
import { useGetNotesByTagSlugQuery } from '@/entities/note';
import { useAppSelector, usePageTitle } from '@/shared/lib';
import { selectIsDesktop } from '@/shared/model';
import { Notice } from '@/shared/ui';

export const TagPage = () => {
  const { pathname } = useLocation();
  const { tagSlug, noteSlug } = useParams();

  const isDesktop = useAppSelector(selectIsDesktop);

  const isCreateNewNotePage = pathname.includes('/create-new-note');
  const classNames = cn(
    'min-h-full w-full flex overflow-auto',
    !isDesktop && !noteSlug && 'max-lg:pt-5 max-lg:flex-col',
  );

  const { data: tag } = useGetTagBySlugQuery({ slug: tagSlug! });
  const {
    data: notes,
    isLoading: isNotesLoading,
    isSuccess,
  } = useGetNotesByTagSlugQuery({ slug: tagSlug! });

  usePageTitle({
    title: isCreateNewNotePage ? undefined : tag?.name,
    extraTextInDocumentTitle: ' tag',
  });

  return (
    <div className={classNames}>
      {!isDesktop && !noteSlug && (
        <div className="custom-container">
          <ActionBarWidget
            parentUrl="/tags"
            variant="without-border"
            className="-mb-1"
          />
        </div>
      )}

      {(isDesktop || (!noteSlug && !isCreateNewNotePage)) && (
        <NotesList
          parentUrl={`/tags/${tagSlug}`}
          notes={notes ?? []}
          isLoading={isNotesLoading}
        >
          {tag ? (
            <>
              <h1 className="text-preset-1 lg:sr-only">
                <span className="text-neutral-600">Notes Tagged: </span>
                {tag.name}
              </h1>

              {isSuccess &&
                (notes.length > 0 ? (
                  <p className="text-preset-5 text-neutral-700">
                    All notes with the "{tag.name}" tag are shown here.
                  </p>
                ) : (
                  <Notice>
                    You don’t have any notes with "{tag.name}" tag yet.
                  </Notice>
                ))}
            </>
          ) : (
            <div className="m-auto text-preset-3 text-center">
              Tag not found
            </div>
          )}
        </NotesList>
      )}

      {(isDesktop || noteSlug || isCreateNewNotePage) && <Outlet />}
    </div>
  );
};
