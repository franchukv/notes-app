import { useLayoutEffect } from 'react';
import { Outlet, useMatches, type UIMatch } from 'react-router';
import { generatePageTitle } from '@/shared/lib';

export const RootLayout = () => {
  const matches = useMatches() as UIMatch<unknown, { title?: string }>[];
  const match = matches.find((m) => m.handle?.title);
  const title = generatePageTitle(match?.handle.title);

  useLayoutEffect(() => {
    document.title = title;
  }, [title]);

  return <Outlet />;
};
