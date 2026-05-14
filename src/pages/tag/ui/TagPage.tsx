import cn from 'classnames';
import { Outlet, useLocation, useParams } from 'react-router';
import { NotesList } from '@/widgets/notes-list';
import { ActionBarWidget } from '@/widgets/action-bar';
import { openModal } from '@/widgets/modal-manager';
import { useGetTagBySlugQuery } from '@/entities/tag';
import { useGetNotesByTagSlugQuery } from '@/entities/note';
import { useAppDispatch, useAppSelector, useTitles } from '@/shared/lib';
import { selectIsDesktop } from '@/shared/model';
import { Button, Notice } from '@/shared/ui';
import DeleteIcon from '@/shared/assets/icons/delete-icon.svg?react';

export const TagPage = () => {
  const { pathname } = useLocation();
  const { tagSlug, noteSlug } = useParams();
  const dispatch = useAppDispatch();

  const isDesktop = useAppSelector(selectIsDesktop);

  const isCreateNewNotePage = pathname.includes('/create-new-note');
  const parentUrl = '/tags';

  const { data: tag, isLoading: isTagLoading } = useGetTagBySlugQuery({
    slug: tagSlug!,
  });
  const {
    data: notes,
    isLoading: isNotesLoading,
    isFetching: isNotesFetching,
    isSuccess: isNotesSuccess,
  } = useGetNotesByTagSlugQuery({ slug: tagSlug! });

  const title = isCreateNewNotePage ? undefined : (tag?.name ?? tagSlug);

  useTitles({
    documentTitle: title,
    headerTitle: title,
    extraTextInDocumentTitle: tag ? ' tag' : undefined,
  });

  const handleDeleteTagClick = () => {
    if (!tag) {
      return;
    }

    dispatch(
      openModal({
        modal: 'confirm-delete-tag',
        props: { tagId: tag.id, tagSlug: tag.slug, parentUrl },
      }),
    );
  };

  return (
    <section
      className={cn(
        'min-h-full w-full flex overflow-auto',
        !isDesktop && !noteSlug && 'max-lg:pt-5 max-lg:flex-col',
      )}
    >
      {!isDesktop && !noteSlug && (
        <div className="custom-container">
          <ActionBarWidget parentUrl={parentUrl}>
            {tag && (
              <Button variant="secondary-link" onClick={handleDeleteTagClick}>
                <DeleteIcon />
              </Button>
            )}
          </ActionBarWidget>
        </div>
      )}

      {(isDesktop || (!noteSlug && !isCreateNewNotePage)) && (
        <NotesList
          parentUrl={`/tags/${tagSlug}`}
          notes={notes ?? []}
          isLoading={isNotesLoading || isNotesFetching || isTagLoading}
          hasCreateNewNoteButton={!!tag}
        >
          {isDesktop && (
            <Button
              variant="border"
              onClick={handleDeleteTagClick}
              disabled={isTagLoading}
            >
              <DeleteIcon /> Delete Tag
            </Button>
          )}

          {!isTagLoading &&
            (tag ? (
              <>
                <h1 className="text-preset-1 lg:sr-only">
                  <span className="text-neutral-600 dark:text-neutral-300">
                    Notes Tagged:{' '}
                  </span>
                  {tag.name}
                </h1>

                {isNotesSuccess &&
                  (notes.length > 0 ? (
                    <p className="text-preset-5 text-neutral-700 dark:text-neutral-200">
                      All notes with the "{tag.name}" tag are shown here.
                    </p>
                  ) : (
                    <Notice>
                      You don’t have any notes with "{tag.name}" tag yet.
                    </Notice>
                  ))}
              </>
            ) : (
              <Notice>Tag not found.</Notice>
            ))}
        </NotesList>
      )}

      {(isDesktop || noteSlug || isCreateNewNotePage) && <Outlet />}
    </section>
  );
};
