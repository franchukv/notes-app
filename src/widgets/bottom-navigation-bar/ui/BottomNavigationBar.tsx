import React from 'react';
import cn from 'classnames';
import { NavLink } from 'react-router';
import { useAppSelector } from '@/shared/lib';
import { selectIsMobile } from '@/shared/model';
import HomeIcon from '@/shared/assets/icons/home-icon.svg?react';
import SearchIcon from '@/shared/assets/icons/search-icon.svg?react';
import ArchiveIcon from '@/shared/assets/icons/archive-icon.svg?react';
import TagIcon from '@/shared/assets/icons/tag-icon.svg?react';
import SettingsIcon from '@/shared/assets/icons/settings-icon.svg?react';

const buttons = [
  { url: '/notes', icon: HomeIcon, text: 'Home' },
  { url: '/search', icon: SearchIcon, text: 'Search' },
  { url: '/archived', icon: ArchiveIcon, text: 'Archived' },
  { url: '/tags', icon: TagIcon, text: 'Tags' },
  { url: '/settings', icon: SettingsIcon, text: 'Settings' },
];

export const BottomNavigationBar = () => {
  const isMobile = useAppSelector(selectIsMobile);

  return (
    <nav className="fixed bottom-0 left-0 w-full py-3 px-4 grid grid-cols-5 bg-white border-t border-neutral-200 shadow-[0_-4px_6px_0_rgba(240,240,240,0.6)] md:px-8 md:grid-cols-9">
      {buttons.map((button, index) => (
        <React.Fragment key={button.text}>
          <NavLink
            to={button.url}
            className={({ isActive }) =>
              cn(
                'p-1 flex flex-col items-center gap-1 text-center text-preset-6 text-neutral-500 transition-all duration-300 rounded [&>svg]:h-6 [&>svg]:w-6',
                isActive && 'text-blue-500! bg-blue-50',
              )
            }
          >
            {<button.icon />}

            {!isMobile && button.text}
          </NavLink>

          {index < buttons.length - 1 && !isMobile && (
            <span className="h-full w-px mx-auto bg-neutral-100"></span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};
