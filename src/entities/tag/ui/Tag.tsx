import cn from 'classnames';
import { NavLink } from 'react-router';
import TagIcon from '@/shared/assets/icons/tag-icon.svg?react';
import ChevronRightIcon from '@/shared/assets/icons/chevron-right-icon.svg?react';

interface TagProps {
  to: string;
  children: React.ReactNode;
}

export const Tag = ({ to, children }: TagProps) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          'w-full py-2.5 flex items-center gap-2 text-preset-4 transition-all duration-300 hover:bg-neutral-100 active:bg-neutral-100 not-last:max-lg:border-b not-last:max-lg:border-neutral-200 lg:px-3 lg:rounded-lg',
          isActive && 'bg-neutral-100 [&>svg]:text-blue-500 cursor-default',
        )
      }
    >
      {({ isActive }) => (
        <>
          <TagIcon />

          {children}

          {isActive && (
            <ChevronRightIcon className="ml-auto text-neutral-950!" />
          )}
        </>
      )}
    </NavLink>
  );
};
