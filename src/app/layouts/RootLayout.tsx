import { useEffect, useLayoutEffect } from 'react';
import { Outlet, useMatches, type UIMatch } from 'react-router';
import { generatePageTitle, useAppDispatch } from '@/shared/lib';
import { setIsDesktop } from '@/shared/model';

export const RootLayout = () => {
  const dispatch = useAppDispatch();
  const matches = useMatches() as UIMatch<unknown, { title?: string }>[];
  const match = matches.find((m) => m.handle?.title);
  const title = generatePageTitle(match?.handle.title);

  useEffect(() => {
    const media = matchMedia('(min-width: 1024px)');
    const mediaListener = (e: MediaQueryListEvent) =>
      dispatch(setIsDesktop(e.matches));

    dispatch(setIsDesktop(media.matches));
    media.addEventListener('change', mediaListener);

    return () => media.removeEventListener('change', mediaListener);
  }, [dispatch]);

  useLayoutEffect(() => {
    document.title = title;
  }, [title]);

  return <Outlet />;
};
