import { Outlet, useLocation, useMatches, type UIMatch } from 'react-router';
import { usePageTitle } from '@/shared/lib';
import { useDeviceType } from '@/shared/lib/hooks';

export const RootLayout = () => {
  const { pathname } = useLocation();
  const matches = useMatches() as UIMatch<unknown, { title?: string }>[];
  const match = matches.find((m) => m.handle?.title);

  useDeviceType();
  usePageTitle(match?.handle.title, pathname);

  return <Outlet />;
};
