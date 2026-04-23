import { useEffect, useLayoutEffect } from 'react';
import { Outlet, useMatches, type UIMatch } from 'react-router';
import { generatePageTitle, useAppDispatch } from '@/shared/lib';
import { setDeviceType } from '@/shared/model';

export const RootLayout = () => {
  const dispatch = useAppDispatch();
  const matches = useMatches() as UIMatch<unknown, { title?: string }>[];
  const match = matches.find((m) => m.handle?.title);
  const title = generatePageTitle(match?.handle.title);

  useEffect(() => {
    const desktopMedia = matchMedia('(min-width: 1024px)');
    const tabletMedia = matchMedia('(min-width: 768px)');

    const getDeviceType = () => {
      if (desktopMedia.matches) {
        return 'desktop';
      }

      if (tabletMedia.matches) {
        return 'tablet';
      }

      return 'mobile';
    };

    const mediaListener = () => dispatch(setDeviceType(getDeviceType()));

    dispatch(setDeviceType(getDeviceType()));

    desktopMedia.addEventListener('change', mediaListener);
    tabletMedia.addEventListener('change', mediaListener);

    return () => {
      desktopMedia.removeEventListener('change', mediaListener);
      tabletMedia.removeEventListener('change', mediaListener);
    };
  }, [dispatch]);

  useLayoutEffect(() => {
    document.title = title;
  }, [title]);

  return <Outlet />;
};
