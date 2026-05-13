import { Outlet, useLocation, useMatches, type UIMatch } from 'react-router';
import { ModalManager } from '@/widgets/modal-manager';
import { ToastsManager } from '@/widgets/toasts-manager';
import { selectProfileSettings } from '@/entities/profile';
import { useTitles } from '@/shared/lib';
import { useDeviceType } from '@/shared/lib/hooks';
import { useAppSelector } from '@/shared/lib';
import { useThemes } from '@/shared/lib/hooks/useThemes';

export const RootLayout = () => {
  const { pathname } = useLocation();
  const matches = useMatches() as UIMatch<
    unknown,
    { title?: string; headerTitle?: string }
  >[];
  const title = matches[matches.length - 1].handle?.title;
  const headerTitle = matches[matches.length - 1].handle?.headerTitle;
  const { colorTheme, fontTheme } = useAppSelector(selectProfileSettings);

  useDeviceType();
  useTitles({
    documentTitle: title,
    headerTitle: headerTitle ?? title,
    pathname,
  });
  useThemes({ colorTheme, fontTheme });

  return (
    <>
      <Outlet />
      <ModalManager />
      <ToastsManager />
    </>
  );
};
