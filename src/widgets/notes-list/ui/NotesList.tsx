import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router';
import { NoteItem, SkeletonNoteItem, type Note } from '@/entities/note';
import { Button } from '@/shared/ui';
import { selectIsDesktop } from '@/shared/model';
import { useAppSelector } from '@/shared/lib';
import { itemVariants, listVariants } from '@/shared/lib/animations';
import PlusIcon from '@/shared/assets/icons/plus-icon.svg?react';

interface NotesListProps {
  parentUrl: string;
  notes: Note[];
  isLoading: boolean;
  hasCreateNewNoteButton?: boolean;
  customKey?: string;
  query?: string;
  children?: React.ReactNode;
}

export const NotesList = ({
  parentUrl,
  query,
  notes,
  isLoading,
  hasCreateNewNoteButton = true,
  customKey,
  children,
}: NotesListProps) => {
  const isDesktop = useAppSelector(selectIsDesktop);

  return (
    <div className="w-full py-5 lg:max-w-60 lg:border-r lg:border-neutral-200 xl:max-w-72.5 dark:lg:border-neutral-800">
      <div className="custom-container h-full">
        <div className="flex flex-col gap-4 h-full">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col gap-4"
          >
            {hasCreateNewNoteButton && (
              <Button
                as={Link}
                to={`${parentUrl}/create-new-note`}
                className="fixed bottom-18 right-4 z-1 sm:bottom-26.5 sm:right-8 min-w-0! max-sm:h-12 max-sm:w-12 max-lg:h-16 max-lg:w-16 max-lg:p-0 max-lg:rounded-full max-lg:shadow-[0_7px_11px_0_rgba(202,207,216,0.7)] lg:static dark:max-lg:shadow-[0_7px_11px_0_rgba(0,0,0,0.7)]"
              >
                {isDesktop ? '+ Create New Note' : <PlusIcon />}
              </Button>
            )}

            {children}
          </motion.div>

          <div className="flex flex-col">
            <AnimatePresence mode="wait">
              {isLoading ? (
                <motion.div
                  key="skeletons"
                  variants={listVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  {Array.from({ length: 5 }).map((_, index) => (
                    <motion.div key={index} variants={itemVariants}>
                      <SkeletonNoteItem key={index} />
                    </motion.div>
                  ))}
                </motion.div>
              ) : notes.length > 0 ? (
                <motion.div
                  key="items"
                  variants={listVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  {notes.map((note) => (
                    <NoteItem
                      key={customKey ?? note.id}
                      variants={itemVariants}
                      parentUrl={parentUrl}
                      query={query}
                      {...note}
                    />
                  ))}
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};
