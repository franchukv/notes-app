import { Outlet, useLocation, useMatches, type UIMatch } from 'react-router';
import { ModalManager } from '@/widgets/modal-manager';
import { ToastsManager } from '@/widgets/toasts-manager';
import { selectProfileSettings } from '@/entities/profile';
import { usePageTitle } from '@/shared/lib';
import { useDeviceType } from '@/shared/lib/hooks';
import { useAppSelector } from '@/shared/lib';
import { useTheme } from '@/shared/lib/hooks/useTheme';

export const RootLayout = () => {
  const { pathname } = useLocation();
  const matches = useMatches() as UIMatch<unknown, { title?: string }>[];
  const title = matches[matches.length - 1].handle?.title;
  const { colorTheme } = useAppSelector(selectProfileSettings);

  useDeviceType();
  usePageTitle({ title, pathname });
  useTheme(colorTheme);

  return (
    <>
      <Outlet />
      <ModalManager />
      <ToastsManager />
    </>
  );
};
