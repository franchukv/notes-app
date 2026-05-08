import {
  Link,
  useLocation,
  useMatches,
  useParams,
  type UIMatch,
} from 'react-router';
import { useAppSelector } from '@/shared/lib';
import { selectIsDesktop, selectPageTitle } from '@/shared/model';
import Logo from '@/shared/assets/img/svg/logo.svg?react';
import SettingsIcon from '@/shared/assets/icons/settings-icon.svg?react';

export const Header = () => {
  const { pathname } = useLocation();
  const { tagSlug } = useParams();
  const matches = useMatches() as UIMatch<unknown, { title?: string }>[];

  const isDesktop = useAppSelector(selectIsDesktop);
  const title =
    useAppSelector(selectPageTitle) ||
    matches[matches.length - 2].handle?.title;

  const isCreateNewNotePage = pathname.includes('/create-new-note');

  return (
    <header className="w-full py-3 px-4 flex items-center gap-4 sm:py-6 sm:px-8 lg:py-4.5 lg:border-b lg:border-neutral-200">
      {!isDesktop ? (
        <Link to="/notes">
          <Logo />
        </Link>
      ) : (
        <>
          <span className="mr-auto text-preset-1">
            {tagSlug && !isCreateNewNotePage && title !== 'Tag not found' && (
              <span className="text-neutral-600">Notes Tagged: </span>
            )}
            {title}
          </span>

          <div>SearchForm</div>

          <Link
            to="/settings"
            className="w-10.5 h-10.5 flex items-center justify-center text-neutral-500 transition-all duration-300 rounded-lg hover:text-blue-500 hover:bg-blue-50 active:text-blue-500 active:bg-blue-50"
          >
            <SettingsIcon />
          </Link>
        </>
      )}
    </header>
  );
};
