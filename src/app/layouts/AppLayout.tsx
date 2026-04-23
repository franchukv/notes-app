import { Outlet } from 'react-router';
import { Header } from '@/widgets/header';
import { Sidebar } from '@/widgets/sidebar';
import { BottomNavigationBar } from '@/widgets/bottom-navigation-bar';
import { selectIsDesktop } from '@/shared/model';
import { useAppSelector } from '@/shared/lib';

export const AppLayout = () => {
  const isDesktop = useAppSelector(selectIsDesktop);

  return (
    <div className="min-h-dvh flex pb-14.25 md:pb-19.25 lg:pb-0">
      {isDesktop && <Sidebar />}

      <div className="w-full flex flex-col">
        <Header />

        <main>
          <Outlet />
        </main>

        {!isDesktop && <BottomNavigationBar />}
      </div>
    </div>
  );
};
