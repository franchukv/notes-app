import { useEffect } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  fontThemeSchema,
  selectProfileSettings,
  useUpdateProfileSettingsMutation,
} from '@/entities/profile';
import { selectUserId } from '@/entities/user';
import { useAppSelector, useToast } from '@/shared/lib';
import { Button, RadioCard } from '@/shared/ui';
import SansSerifIcon from '@/shared/assets/icons/sans-serif-icon.svg?react';
import SerifIcon from '@/shared/assets/icons/serif-icon.svg?react';
import MonospaceIcon from '@/shared/assets/icons/monospace-icon.svg?react';

type FontThemeFormData = z.infer<typeof fontThemeSchema>;

export const UpdateFontThemeForm = () => {
  const { showToast } = useToast();

  const userId = useAppSelector(selectUserId);
  const profileSettings = useAppSelector(selectProfileSettings);

  const { register, handleSubmit, reset } = useForm<FontThemeFormData>({
    resolver: zodResolver(fontThemeSchema),
    defaultValues: {
      theme: profileSettings.fontTheme,
    },
  });

  const [updateSettings, { isLoading }] = useUpdateProfileSettingsMutation();

  const onSubmit = async ({ theme }: FontThemeFormData) => {
    const { error } = await updateSettings({
      userId: userId!,
      settings: { ...profileSettings, fontTheme: theme },
    });

    if (error) {
      showToast({ message: 'Failed to update settings.', type: 'error' });
      return;
    }

    showToast({ message: 'Settings updated successfully!' });
  };

  useEffect(() => {
    reset({ theme: profileSettings.fontTheme });
  }, [profileSettings.fontTheme, reset]);

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
      <fieldset className="flex flex-col gap-4">
        <RadioCard
          register={register('theme')}
          id="sans-serif"
          value="sans-serif"
          icon={<SansSerifIcon />}
          title="Sans-serif"
          text="Clean and modern, easy to read."
        />

        <RadioCard
          register={register('theme')}
          id="serif"
          value="serif"
          icon={<SerifIcon />}
          title="Serif"
          text="Classic and elegant for a timeless feel."
        />

        <RadioCard
          register={register('theme')}
          id="monospace"
          value="monospace"
          icon={<MonospaceIcon />}
          title="Monospace"
          text="Code-like, great for a technical vibe."
        />
      </fieldset>

      <Button type="submit" className="w-fit self-end" isLoading={isLoading}>
        Apply Changes
      </Button>
    </form>
  );
};
