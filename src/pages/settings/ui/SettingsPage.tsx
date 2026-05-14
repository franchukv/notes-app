import { AnimatePresence, motion } from 'motion/react';
import { Outlet, useLocation } from 'react-router';
import { useLogoutMutation } from '@/entities/user';
import { Button, NavigationButton } from '@/shared/ui';
import { useAppSelector } from '@/shared/lib';
import { selectIsDesktop } from '@/shared/model';
import SunIcon from '@/shared/assets/icons/sun-icon.svg?react';
import FontIcon from '@/shared/assets/icons/font-icon.svg?react';
import LockIcon from '@/shared/assets/icons/lock-icon.svg?react';
import LogoutIcon from '@/shared/assets/icons/logout-icon.svg?react';

export const SettingsPage = () => {
  const { pathname } = useLocation();

  const isDesktop = useAppSelector(selectIsDesktop);

  const isRootPath = pathname === '/settings';

  const [logout] = useLogoutMutation();

  return (
    <div className="min-h-full w-full flex">
      {(isDesktop || isRootPath) && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="w-full py-5 lg:max-w-60 lg:border-r lg:border-neutral-200 xl:max-w-72.5 dark:lg:border-neutral-800"
        >
          <div className="custom-container h-full">
            <div className="h-full flex flex-col gap-4">
              <h1 className="text-preset-1 lg:sr-only">Settings</h1>

              <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-2">
                  <NavigationButton to="/settings/color-theme">
                    <SunIcon /> Color Theme
                  </NavigationButton>

                  <NavigationButton to="/settings/font-theme">
                    <FontIcon /> Font Theme
                  </NavigationButton>

                  <NavigationButton to="/settings/change-password">
                    <LockIcon /> Change Password
                  </NavigationButton>
                </div>

                <div className="pt-2 flex flex-col gap-2 border-t border-neutral-200 dark:border-neutral-800 ">
                  <Button
                    variant="border"
                    className="min-h-0! py-2.5! justify-start border-none dark:hover:bg-neutral-800"
                    onClick={() => logout()}
                  >
                    <LogoutIcon /> Logout
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {(isDesktop || !isRootPath) && (
        <AnimatePresence mode="wait">
          <Outlet />
        </AnimatePresence>
      )}
    </div>
  );
};
