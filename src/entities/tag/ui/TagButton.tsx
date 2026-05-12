import cn from 'classnames';
import { NavLink } from 'react-router';
import TagIcon from '@/shared/assets/icons/tag-icon.svg?react';
import ChevronRightIcon from '@/shared/assets/icons/chevron-right-icon.svg?react';

interface TagButtonProps {
  url: string;
  children: React.ReactNode;
}

export const TagButton = ({ url, children }: TagButtonProps) => {
  return (
    <NavLink
      to={url}
      className={({ isActive }) =>
        cn(
          'w-full py-2.5 flex items-center gap-2 text-preset-4 transition-all duration-300 hover:text-neutral-600 max-lg:active:text-neutral-600 lg:hover:bg-neutral-100 active:lg:bg-neutral-100 not-last:max-lg:border-b not-last:max-lg:border-neutral-200 lg:px-3 lg:rounded-lg dark:lg:hover:bg-neutral-800 dark:lg:active:bg-neutral-800 dark:not-last:max-lg:border-neutral-800',
          isActive &&
            'bg-neutral-100 text-neutral-950! [&>svg]:text-blue-500 cursor-default  dark:bg-neutral-800 dark:text-white!',
        )
      }
    >
      {({ isActive }) => (
        <>
          <TagIcon />

          {children}

          {isActive && (
            <ChevronRightIcon className="ml-auto text-neutral-950! dark:text-white!" />
          )}
        </>
      )}
    </NavLink>
  );
};
