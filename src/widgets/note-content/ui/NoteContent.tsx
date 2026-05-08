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
      <div className="pb-3 flex flex-col gap-3 border-b border-neutral-200 sm:pb-4 sm:gap-4">
        <h1 className="text-preset-1">{title}</h1>

        <div className="flex flex-col gap-2 text-preset-6 text-neutral-700 sm:text-preset-5">
          <div className="flex items-center gap-2">
            <div className="min-w-28.75 flex items-center gap-1.5">
              <TagIcon className="h-4 w-4" /> Tags
            </div>

            <span
              className={`${tags.length > 0 ? 'text-neutral-950' : 'text-neutral-400'}`}
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

              <span className="text-neutral-950">Archived</span>
            </div>
          )}

          <div className="flex items-center gap-2">
            <div className="min-w-28.75 flex items-center gap-1.5">
              <ClockIcon className="h-4 w-4" /> Last edited
            </div>

            <span>{formatDate(updatedAt)}</span>
          </div>
        </div>
      </div>

      {content ? (
        <div
          className="typical-content"
          dangerouslySetInnerHTML={{
            __html: content.replaceAll('&nbsp;', ' '),
          }}
        />
      ) : (
        <span className="text-neutral-400">There is no content yet.</span>
      )}
    </>
  );
};
