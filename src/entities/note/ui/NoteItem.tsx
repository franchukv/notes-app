import { motion, type MotionProps } from 'motion/react';
import cn from 'classnames';
import { NavLink } from 'react-router';
import type { Note } from '../model/types';
import { TagItem } from '../@x/tag';
import { formatDate } from '@/shared/lib';
import ArchivedIcon from '@/shared/assets/icons/archived-icon.svg?react';

interface NoteItemProps extends Note, Pick<MotionProps, 'variants'> {
  parentUrl: string;
  query?: string;
}

const MotionNavLink = motion.create(NavLink);

export const NoteItem = ({
  parentUrl,
  query,
  slug,
  title,
  tags,
  isArchived,
  updatedAt,
  variants,
}: NoteItemProps) => {
  return (
    <MotionNavLink
      to={`${parentUrl}/${slug}${query ? `?q=${query}` : ''}`}
      className={({ isActive }) =>
        cn(
          'group relative block not-first:before:content-[] not-first:before:absolute not-first:before:left-0 not-first:before:-top-0.5 not-first:before:w-full not-first:before:h-px not-first:before:border-b not-first:before:border-neutral-200 not-first:before:transition-all not-first:before:duration-300 not-first:hover:before:border-transparent not-first:active:before:border-transparent [&:hover+*]:before:border-transparent [&:active+*]:before:border-transparent dark:not-first:before:border-neutral-800',
          isActive &&
            'pointer-events-none not-first:before:border-transparent! [&+*]:before:border-transparent!',
        )
      }
      variants={variants}
    >
      {({ isActive }) => (
        <div
          className={cn(
            'w-full p-2 my-0.5 flex flex-col gap-3 rounded-md transition-all duration-300  group-hover:bg-neutral-100 group-active:bg-neutral-100 dark:group-hover:bg-neutral-800 dark:group-active:bg-neutral-800',
            isActive && 'bg-neutral-100 dark:bg-neutral-800',
          )}
        >
          <div className="flex justify-between gap-3">
            <h3 className="text-preset-3">{title}</h3>

            {isArchived && query && <ArchivedIcon className="min-w-5" />}
          </div>

          {tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-1">
              {tags.map((tag) => (
                <TagItem key={tag.id}>{tag.name}</TagItem>
              ))}
            </div>
          )}

          <span className="text-preset-6 text-neutral-700 dark:text-neutral-300">
            {formatDate(updatedAt)}
          </span>
        </div>
      )}
    </MotionNavLink>
  );
};
