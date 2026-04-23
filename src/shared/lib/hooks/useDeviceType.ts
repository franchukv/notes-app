import { useLayoutEffect } from 'react';
import { useAppDispatch } from './useAppDispatch';
import { setDeviceType } from '../../model';

export const useDeviceType = () => {
  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    const desktopMedia = matchMedia('(min-width: 1024px)');
    const tabletMedia = matchMedia(
      '(min-width: 640px) and (max-width: 1023px)',
    );

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
};
