import cn from 'classnames';
import { NavLink } from 'react-router';
import { useAppSelector } from '@/shared/lib';
import { selectIsDesktop } from '@/shared/model';
import TagIcon from '@/shared/assets/icons/tag-icon.svg?react';
import ChevronRightIcon from '@/shared/assets/icons/chevron-right-icon.svg?react';

interface TagProps {
  to: string;
  children: React.ReactNode;
}

export const Tag = ({ to, children }: TagProps) => {
  const isDesktop = useAppSelector(selectIsDesktop);

  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          'w-full py-2.5 px-3 flex items-center gap-2 text-preset-4 rounded-lg transition-all duration-300 hover:bg-neutral-100',
          isActive && 'bg-neutral-100 [&>svg]:text-blue-500 cursor-default',
        )
      }
    >
      {({ isActive }) => (
        <>
          {isDesktop && <TagIcon />}

          {children}

          {isActive && (
            <ChevronRightIcon className="ml-auto text-neutral-950!" />
          )}
        </>
      )}
    </NavLink>
  );
};
