import DOMPurify from 'dompurify';
import { motion } from 'motion/react';
import type { Note } from '@/entities/note';
import { formatDate } from '@/shared/lib';
import TagIcon from '@/shared/assets/icons/tag-icon.svg?react';
import StatusIcon from '@/shared/assets/icons/status-icon.svg?react';
import ClockIcon from '@/shared/assets/icons/clock-icon.svg?react';

interface NoteContentProps {
  note: Note;
}

export const NoteContent = ({ note }: NoteContentProps) => {
  const { title, tags, updatedAt, content, isArchived } = note;
  return (
    <>
      <motion.div
        key="content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="pb-3 flex flex-col gap-3 border-b border-neutral-200 sm:pb-4 sm:gap-4 dark:border-neutral-800"
      >
        <h1 className="text-preset-1">{title}</h1>

        <div className="flex flex-col gap-2 text-preset-6 text-neutral-700 sm:text-preset-5 dark:text-neutral-300">
          <div className="flex items-center gap-2">
            <div className="min-w-28.75 flex items-center gap-1.5">
              <TagIcon className="h-4 w-4" /> Tags
            </div>

            <span
              className={`${tags.length > 0 ? 'text-neutral-950 dark:text-white' : 'text-neutral-400'}`}
            >
              {tags.length > 0
                ? tags.map((tag) => tag.name).join(', ')
                : 'There are no tags yet.'}
            </span>
          </div>

          {isArchived && (
            <div className="flex items-center gap-2">
              <div className="min-w-28.75 flex items-center gap-1.5">
                <StatusIcon className="h-4 w-4" /> Status
              </div>

              <span className="text-neutral-950 dark:text-white">Archived</span>
            </div>
          )}

          <div className="flex items-center gap-2">
            <div className="min-w-28.75 flex items-center gap-1.5">
              <ClockIcon className="h-4 w-4" /> Last edited
            </div>

            <span>{formatDate(updatedAt)}</span>
          </div>
        </div>
      </motion.div>

      {content ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="typical-content"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(content.replaceAll('&nbsp;', ' ')),
          }}
        />
      ) : (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-neutral-400"
        >
          There is no content yet.
        </motion.span>
      )}
    </>
  );
};
