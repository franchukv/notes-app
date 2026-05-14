import { motion } from 'motion/react';
import { ActionBarWidget } from '@/widgets/action-bar';
import { UpdateFontThemeForm } from '@/features/update-font-theme';
import { useAppSelector } from '@/shared/lib';
import { selectIsDesktop } from '@/shared/model';

export const SettingsFontThemePage = () => {
  const isDesktop = useAppSelector(selectIsDesktop);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="py-5 w-full lg:max-w-142"
    >
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

              <p className="text-preset-5 text-neutral-700 dark:text-neutral-200">
                Choose your font theme:
              </p>
            </div>
          </div>

          <UpdateFontThemeForm />
        </div>
      </div>
    </motion.section>
  );
};
