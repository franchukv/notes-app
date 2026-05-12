import { Outlet, useLocation } from 'react-router';
import { NavigationButton } from '@/shared/ui';
import SunIcon from '@/shared/assets/icons/sun-icon.svg?react';
import FontIcon from '@/shared/assets/icons/font-icon.svg?react';
import LockIcon from '@/shared/assets/icons/lock-icon.svg?react';
import LogoutIcon from '@/shared/assets/icons/logout-icon.svg?react';

export const SettingsPage = () => {
  const { pathname } = useLocation();
  const isRoot = pathname === '/settings';

  return (
    <>
      {isRoot ? (
        <div className="min-h-full w-full flex">
          <div className="w-full py-5 lg:max-w-60 lg:border-r lg:border-neutral-200 xl:max-w-72.5">
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

                  <div className="pt-2 flex flex-col gap-2 border-t border-neutral-200">
                    <NavigationButton to="/logout">
                      <LogoutIcon /> Logout
                    </NavigationButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Outlet />
      )}
    </>
  );
};
