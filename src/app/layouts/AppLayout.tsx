import { Outlet } from 'react-router';
import { Header } from '@/widgets/header';
import { Sidebar } from '@/widgets/sidebar';
import { BottomNavigationBar } from '@/widgets/bottom-navigation-bar';
import { selectIsDesktop } from '@/shared/model';
import { useAppSelector } from '@/shared/lib';

export const AppLayout = () => {
  const isDesktop = useAppSelector(selectIsDesktop);

  return (
    <div className="flex pb-14.25 sm:pb-19.25 lg:pb-0">
      {isDesktop && <Sidebar />}

      <div className="w-full flex flex-col">
        <Header />

        <main className="max-sm:min-h-[calc(100dvh-(57px+52px))] sm:max-lg:min-h-[calc(100dvh-(76.5px*2))] max-lg:bg-white max-lg:rounded-tl-lg max-lg:rounded-tr-lg lg:min-h-[calc(100dvh-79px)] lg:max-h-[calc(100dvh-79px)] overflow-auto">
          <Outlet />
        </main>

        {!isDesktop && <BottomNavigationBar />}
      </div>
    </div>
  );
};
