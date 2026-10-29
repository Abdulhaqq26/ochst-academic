import { Outlet } from 'react-router-dom';
import { Sidebar, MobileBottomNav, MobileTopBar, MobileDrawer, useMobileDrawer } from '../components/navigation';

export default function StudentLayout() {
  const [drawerOpen, openDrawer, closeDrawer] = useMobileDrawer();

  return (
    <div className="min-h-screen flex bg-paper">
      <Sidebar />
      <div className="flex-1 min-w-0 flex flex-col">
        <MobileTopBar onMenuOpen={openDrawer} />
        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6 pb-24 lg:pb-8 max-w-6xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
      <MobileBottomNav />
      <MobileDrawer open={drawerOpen} onClose={closeDrawer} />
    </div>
  );
}
