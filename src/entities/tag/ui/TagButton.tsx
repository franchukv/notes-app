import { motion, type MotionProps } from 'motion/react';
import cn from 'classnames';
import { NavLink } from 'react-router';
import type { Tag } from '../model/types';
import TagIcon from '@/shared/assets/icons/tag-icon.svg?react';
import ChevronRightIcon from '@/shared/assets/icons/chevron-right-icon.svg?react';

interface TagButtonProps
  extends Pick<Tag, 'name'>, Pick<MotionProps, 'variants'> {
  url: string;
}

const MotionNavLink = motion.create(NavLink);

export const TagButton = ({ url, name, variants }: TagButtonProps) => {
  return (
    <MotionNavLink
      to={url}
      className={({ isActive }) =>
        cn(
          'group w-full text-preset-4 not-last:max-lg:border-b not-last:max-lg:border-neutral-200 lg:rounded-lg dark:not-last:max-lg:border-neutral-800',
          isActive && 'pointer-events-none',
        )
      }
      variants={variants}
    >
      {({ isActive }) => (
        <div
          className={cn(
            'w-full py-2.5  flex items-center gap-2 lg:px-3 lg:rounded-lg transition-all duration-300 hover:text-neutral-600 max-lg:active:text-neutral-600 lg:hover:bg-neutral-100 lg:active:bg-neutral-100 dark:lg:hover:bg-neutral-800 dark:lg:active:bg-neutral-800',
            isActive &&
              'bg-neutral-100 dark:bg-neutral-800 text-neutral-950 dark:text-white [&>svg]:text-blue-500',
          )}
        >
          <TagIcon />

          {name}

          {isActive && (
            <ChevronRightIcon className="ml-auto text-neutral-950! dark:text-white!" />
          )}
        </div>
      )}
    </MotionNavLink>
  );
};
