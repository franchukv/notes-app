import { useEffect } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMatches, type UIMatch } from 'react-router';
import { ActionBarWidget } from '@/widgets/action-bar';
import { selectUserId } from '@/entities/user';
import {
  selectProfileSettings,
  useUpdateProfileSettingsMutation,
} from '@/entities/profile';
import { useAppSelector, usePageTitle, useToast } from '@/shared/lib';
import { selectIsDesktop } from '@/shared/model';
import { Button, RadioCard } from '@/shared/ui';
import SunIcon from '@/shared/assets/icons/sun-icon.svg?react';
import MoonIcon from '@/shared/assets/icons/moon-icon.svg?react';
import SplitIcon from '@/shared/assets/icons/split-icon.svg?react';

const colorThemeSchema = z.object({
  theme: z.enum(['light', 'dark', 'system']),
});

type ColorThemeFormData = z.infer<typeof colorThemeSchema>;

export const SettingsColorThemePage = () => {
  const matches = useMatches() as UIMatch<unknown, { title?: string }>[];
  const { showToast } = useToast();

  const isDesktop = useAppSelector(selectIsDesktop);
  const userId = useAppSelector(selectUserId);
  const profileSettings = useAppSelector(selectProfileSettings);

  const { register, handleSubmit, reset } = useForm<ColorThemeFormData>({
    resolver: zodResolver(colorThemeSchema),
    defaultValues: {
      theme: profileSettings.colorTheme,
    },
  });

  const pageTitle = matches[matches.length - 1].handle?.title;

  const [updateSettings] = useUpdateProfileSettingsMutation();

  usePageTitle({ title: pageTitle, headerTitle: 'Settings' });

  const onSubmit = async ({ theme }: ColorThemeFormData) => {
    const { error } = await updateSettings({
      userId: userId!,
      settings: { colorTheme: theme },
    });

    if (error) {
      showToast({ message: 'Failed to update settings.', type: 'error' });
      return;
    }

    showToast({ message: 'Settings updated successfully!' });
  };

  useEffect(() => {
    reset({ theme: profileSettings.colorTheme });
  }, [profileSettings.colorTheme, reset]);

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
              <h1 className="text-preset-1">Color Theme</h1>
              <p className="text-preset-5 text-neutral-700">
                Choose your color theme:
              </p>
            </div>
          </div>

          <form
            className="flex flex-col gap-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            <fieldset className="flex flex-col gap-4">
              <RadioCard
                register={register('theme')}
                id="light-mode"
                value="light"
                icon={<SunIcon />}
                title="Light Mode"
                text="Pick a clean and classic light theme"
              />

              <RadioCard
                register={register('theme')}
                id="dark-mode"
                value="dark"
                icon={<MoonIcon />}
                title="Dark Mode"
                text="Select a sleek and modern dark theme"
              />

              <RadioCard
                register={register('theme')}
                id="system-mode"
                value="system"
                icon={<SplitIcon />}
                title="System"
                text="Adapts to your device’s theme"
              />
            </fieldset>

            <Button type="submit" className="w-fit self-end">
              Apply Changes
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};
