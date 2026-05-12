import { useMatches, type UIMatch } from 'react-router';
import { ActionBarWidget } from '@/widgets/action-bar';
import { UpdateFontThemeForm } from '@/features/update-font-theme';
import { useAppSelector, usePageTitle } from '@/shared/lib';
import { selectIsDesktop } from '@/shared/model';

export const SettingsFontThemePage = () => {
  const matches = useMatches() as UIMatch<unknown, { title?: string }>[];

  const isDesktop = useAppSelector(selectIsDesktop);

  const pageTitle = matches[matches.length - 1].handle?.title;

  usePageTitle({ title: pageTitle, headerTitle: 'Settings' });

  return (
    <div className="py-5 w-full lg:max-w-142">
      <div className="custom-container">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-3">
            {!isDesktop && (
              <ActionBarWidget
                parentUrl="/settings"
                altText="Settings"
                className="pb-0! border-none!"
              />
            )}

            <div className="flex flex-col gap-2">
              <h1 className="text-preset-1">Font Theme</h1>

              <p className="text-preset-5 text-neutral-700">
                Choose your font theme:
              </p>
            </div>
          </div>

          <UpdateFontThemeForm />
        </div>
      </div>
    </div>
  );
};
