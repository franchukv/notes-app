import { motion } from 'motion/react';
import { ActionBarWidget } from '@/widgets/action-bar';
import { ChangePasswordForm } from '@/features/change-password';
import { useAppSelector } from '@/shared/lib';
import { selectIsDesktop } from '@/shared/model';

export const SettingsChangePasswordPage = () => {
  const isDesktop = useAppSelector(selectIsDesktop);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
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
              <h1 className="text-preset-1">Change Password</h1>
            </div>
          </div>

          <ChangePasswordForm />
        </div>
      </div>
    </motion.div>
  );
};
