import { motion, AnimatePresence } from 'motion/react';
import {
  useLocation,
  useMatches,
  useParams,
  useSearchParams,
  type UIMatch,
} from 'react-router';
import { ActionBarWidget } from '@/widgets/action-bar';
import { NoteActionsWidget } from '@/widgets/note-actions';
import { NoteContent, SkeletonNoteContent } from '@/widgets/note-content';
import { useGetNoteBySlugQuery } from '@/entities/note';
import { useAppSelector, useTitles } from '@/shared/lib';
import { selectIsDesktop } from '@/shared/model';

export const NotePage = () => {
  const [searchParams] = useSearchParams();
  const { pathname } = useLocation();
  const { tagSlug, noteSlug } = useParams();
  const matches = useMatches() as UIMatch<unknown, { title?: string }>[];

  const isDesktop = useAppSelector(selectIsDesktop);

  const headerTitle = matches[matches.length - 2].handle?.title;
  const query = searchParams.get('q') ?? '';
  const isSearchPage = pathname.includes('/search');
  const isArchivedNote = pathname.includes('/archived-notes');
  const parentUrl = isSearchPage
    ? `/search${query ? `?q=${query}` : ''}`
    : isArchivedNote
      ? '/archived-notes'
      : tagSlug
        ? `/tags/${tagSlug}`
        : '/notes';

  const {
    data: note,
    isLoading,
    isSuccess,
  } = useGetNoteBySlugQuery({ slug: noteSlug! });

  useTitles({
    documentTitle: note?.title ?? 'Note not found',
    headerTitle: headerTitle,
  });

  return (
    <div className="w-full flex">
      <AnimatePresence mode="wait">
        <div className="h-full w-full py-5 flex flex-col lg:border-r lg:border-neutral-200 lg:max-w-[calc(100%-(180px))] xl:max-w-[calc(100%-290px)] dark:lg:border-neutral-800">
          <div className="custom-container h-full flex">
            <div className="w-full flex flex-col gap-3 sm:gap-4">
              {!isDesktop && (
                <motion.div
                  key="action-bar"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <ActionBarWidget parentUrl={parentUrl}>
                    {isSuccess && (
                      <NoteActionsWidget parentUrl={parentUrl} note={note} />
                    )}
                  </ActionBarWidget>
                </motion.div>
              )}

              {isSuccess ? (
                <NoteContent note={note} />
              ) : isLoading ? (
                <SkeletonNoteContent isArchivedNote={isArchivedNote} />
              ) : (
                <motion.div
                  key="not-found"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="m-auto text-preset-3 text-center"
                >
                  Note not found
                </motion.div>
              )}
            </div>
          </div>
        </div>

        {isDesktop && isSuccess && (
          <aside className="h-full w-full py-5 flex flex-col gap-3 lg:max-w-45 xl:max-w-72.5">
            <div className="custom-container">
              <motion.div
                key="action-buttons"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col gap-3"
              >
                <NoteActionsWidget parentUrl={parentUrl} note={note} />
              </motion.div>
            </div>
          </aside>
        )}
      </AnimatePresence>
    </div>
  );
};
