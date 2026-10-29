import { Navigate, Outlet } from 'react-router-dom';
import { MobileTopBar, useMobileDrawer } from '../components/navigation';
import { AdminSidebar, AdminMobileBottomNav, AdminMobileDrawer } from '../components/adminNavigation';
import { hasAdminSession } from '../lib/adminAuth';

export default function AdminLayout() {
  const [drawerOpen, openDrawer, closeDrawer] = useMobileDrawer();

  if (!hasAdminSession()) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="min-h-screen flex bg-paper">
      <AdminSidebar />
      <div className="flex-1 min-w-0 flex flex-col">
        <MobileTopBar onMenuOpen={openDrawer} />
        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6 pb-24 lg:pb-8 max-w-6xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
      <AdminMobileBottomNav />
      <AdminMobileDrawer open={drawerOpen} onClose={closeDrawer} />
    </div>
  );
}
