import { Outlet, useLocation, useMatches, type UIMatch } from 'react-router';
import { ModalManager } from '@/widgets/modal-manager';
import { ToastsManager } from '@/widgets/toasts-manager';
import { usePageTitle } from '@/shared/lib';
import { useDeviceType } from '@/shared/lib/hooks';

export const RootLayout = () => {
  const { pathname } = useLocation();
  const matches = useMatches() as UIMatch<unknown, { title?: string }>[];
  const title = matches[matches.length - 1].handle?.title;

  useDeviceType();
  usePageTitle({ title, pathname });

  return (
    <>
      <Outlet />
      <ModalManager />
      <ToastsManager />
    </>
  );
};
