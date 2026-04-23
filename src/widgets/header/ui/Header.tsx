import { Link } from 'react-router';
import { useAppSelector } from '@/shared/lib';
import { selectIsDesktop, selectPageTitle } from '@/shared/model';
import Logo from '@/shared/assets/img/svg/logo.svg?react';
import SettingsIcon from '@/shared/assets/icons/settings-icon.svg?react';

export const Header = () => {
  const isDesktop = useAppSelector(selectIsDesktop);
  const title = useAppSelector(selectPageTitle);

  return (
    <header className="w-full py-3 px-4 flex items-center gap-4 md:py-6 md:px-8 lg:py-4.5 lg:border-b lg:border-neutral-200">
      {!isDesktop ? (
        <Link to="/notes">
          <Logo />
        </Link>
      ) : (
        <>
          <h2 className="mr-auto text-preset-1">{title}</h2>

          <div>SearchForm</div>

          <Link
            to="/settings"
            className="w-10.5 h-10.5 flex items-center justify-center text-neutral-500 transition-all duration-300 rounded-lg hover:text-blue-500 hover:bg-blue-50"
          >
            <SettingsIcon />
          </Link>
        </>
      )}
    </header>
  );
};
