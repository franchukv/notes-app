import cn from 'classnames';
import {
  Link,
  useLocation,
  useMatches,
  useParams,
  useSearchParams,
  type UIMatch,
} from 'react-router';
import { SearchForm } from '@/features/search';
import { useAppSelector } from '@/shared/lib';
import { selectIsDesktop, selectPageTitle } from '@/shared/model';
import Logo from '@/shared/assets/icons/logo.svg?react';
import SettingsIcon from '@/shared/assets/icons/settings-icon.svg?react';

export const Header = () => {
  const [searchParams] = useSearchParams();
  const { pathname } = useLocation();
  const { tagSlug } = useParams();
  const matches = useMatches() as UIMatch<unknown, { title?: string }>[];

  const isDesktop = useAppSelector(selectIsDesktop);
  const title =
    useAppSelector(selectPageTitle) ||
    matches[matches.length - 2].handle?.title;

  const query = searchParams.get('q') ?? '';
  const isCreateNewNotePage = pathname.includes('/create-new-note');
  const isSearchPage = pathname.includes('/search');
  const isSettingsPage = pathname.includes('/settings');

  return (
    <header className="w-full py-3 px-4 flex items-center gap-4 sm:py-6 sm:px-8 lg:py-4.5 lg:border-b lg:border-neutral-200 dark:lg:border-neutral-800">
      {!isDesktop ? (
        <Link to="/notes">
          <Logo />
        </Link>
      ) : (
        <>
          <span className="mr-auto text-preset-1">
            {tagSlug && !isCreateNewNotePage && title !== 'Tag not found' && (
              <span className="text-neutral-600 dark:text-neutral-300">
                Notes Tagged:{' '}
              </span>
            )}
            {isSearchPage && query && (
              <span className="text-neutral-600 dark:text-neutral-300">
                Showing results for:{' '}
              </span>
            )}
            {title}
          </span>

          <SearchForm />

          <Link
            to="/settings"
            className={cn(
              'w-10.5 h-10.5 flex items-center justify-center text-neutral-500 transition-all duration-300 rounded-lg hover:text-neutral-600 hover:bg-neutral-100 active:text-neutral-600 active:bg-neutral-100 dark:hover:bg-neutral-800 dark:active:bg-neutral-800',
              isSettingsPage &&
                'text-blue-500! bg-neutral-100! dark:bg-neutral-800!',
            )}
          >
            <SettingsIcon />
          </Link>
        </>
      )}
    </header>
  );
};
