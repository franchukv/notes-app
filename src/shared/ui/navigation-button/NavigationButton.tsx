import cn from 'classnames';
import type { ButtonHTMLAttributes } from 'react';
import { NavLink } from 'react-router';
import ChevronRightIcon from '../../assets/icons/chevron-right-icon.svg?react';

interface NavigationButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  to: string;
  children: React.ReactNode;
  className?: string;
}

export const NavigationButton = ({
  to,
  children,
  className,
}: NavigationButtonProps) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          'w-full py-2.5 px-3 flex items-center gap-2 text-preset-4 rounded-lg transition-all duration-300 hover:bg-neutral-100 active:bg-neutral-100 hover:text-neutral-600 active:text-neutral-600 dark:hover:bg-neutral-800 dark:active:bg-neutral-800',
          className,
          isActive &&
            'bg-neutral-100 text-neutral-950! [&>svg]:text-blue-500 pointer-events-none dark:bg-neutral-800 dark:text-white!',
        )
      }
    >
      {({ isActive }) => (
        <>
          {children}

          {isActive && (
            <ChevronRightIcon className="ml-auto text-neutral-950! dark:text-white!" />
          )}
        </>
      )}
    </NavLink>
  );
};
