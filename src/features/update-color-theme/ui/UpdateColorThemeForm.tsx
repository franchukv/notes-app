import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  selectProfileSettings,
  useUpdateProfileSettingsMutation,
} from '@/entities/profile';
import { useAppSelector, useToast } from '@/shared/lib';
import SunIcon from '@/shared/assets/icons/sun-icon.svg?react';
import MoonIcon from '@/shared/assets/icons/moon-icon.svg?react';
import SplitIcon from '@/shared/assets/icons/split-icon.svg?react';
import { Button, RadioCard } from '@/shared/ui';
import { selectUserId } from '@/entities/user';
import { useEffect } from 'react';

const colorThemeSchema = z.object({
  theme: z.enum(['light', 'dark', 'system']),
});

type ColorThemeFormData = z.infer<typeof colorThemeSchema>;

export const UpdateColorThemeForm = () => {
  const { showToast } = useToast();

  const userId = useAppSelector(selectUserId);
  const profileSettings = useAppSelector(selectProfileSettings);

  const { register, handleSubmit, reset } = useForm<ColorThemeFormData>({
    resolver: zodResolver(colorThemeSchema),
    defaultValues: {
      theme: profileSettings.colorTheme,
    },
  });

  const [updateSettings] = useUpdateProfileSettingsMutation();

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
    <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
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
  );
};
