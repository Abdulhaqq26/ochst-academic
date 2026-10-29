import { useNavigate, NavLink } from 'react-router-dom';
import { LayoutDashboard, Table2, UploadCloud, LogOut, ShieldCheck, X, Moon, Sun, GraduationCap } from 'lucide-react';
import { cn } from '../lib/utils';
import { useTheme } from '../hooks/useTheme';
import { logoutAdmin } from '../lib/adminAuth';

const adminNavLinks = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/admin/timetable', label: 'Timetable', icon: Table2 },
  { to: '/admin/upload', label: 'Upload Content', icon: UploadCloud },
];

function AdminNavItem({ to, label, icon: Icon }: { to: string; label: string; icon: typeof LayoutDashboard }) {
  return (
    <NavLink
      to={to}
      end={to === '/admin'}
      className={({ isActive }) =>
        cn(
          'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150',
          isActive
            ? 'bg-cobalt-500 text-white shadow-sm'
            : 'text-muted hover:text-ink hover:bg-paper hover:translate-x-0.5'
        )
      }
    >
      <Icon size={17} strokeWidth={2} className="shrink-0" />
      <span className="truncate">{label}</span>
    </NavLink>
  );
}

export function AdminSidebar() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const handleLogout = () => {
    logoutAdmin();
    navigate('/admin/login');
  };

  return (
    <aside className="hidden lg:flex lg:flex-col w-64 shrink-0 h-screen sticky top-0 border-r border-line bg-surface px-4 py-6">
      <div className="flex items-center gap-2.5 px-2 mb-8">
        <div className="w-9 h-9 rounded-lg bg-cobalt-500 flex items-center justify-center shrink-0 shadow-sm">
          <GraduationCap size={19} className="text-white" strokeWidth={2.2} />
        </div>
        <div className="leading-tight">
          <p className="font-serif font-semibold text-[15px] text-ink tracking-tight">OCHST</p>
          <p className="text-[11px] text-muted -mt-0.5">Academic Hub</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto no-scrollbar">
        <p className="px-3 pb-2 text-[10.5px] font-semibold tracking-wider text-muted/80 uppercase">Administration</p>
        {adminNavLinks.map((item) => (
          <AdminNavItem key={item.to} {...item} />
        ))}
      </nav>

      <div className="border-t border-line pt-4 mt-4 space-y-1">
        <button
          onClick={toggleTheme}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-muted hover:text-ink hover:bg-paper transition-colors"
        >
          {theme === 'light' ? <Moon size={17} /> : <Sun size={17} />}
          {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
        </button>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-muted hover:text-amber-600 hover:bg-amber-50 transition-colors"
        >
          <LogOut size={17} />
          Logout
        </button>
        <div className="flex items-center gap-3 px-3 pt-3">
          <div className="w-8 h-8 rounded-full bg-cobalt-100 text-cobalt-600 flex items-center justify-center shrink-0 ring-1 ring-cobalt-500/10">
            <ShieldCheck size={16} strokeWidth={2.2} />
          </div>
          <div className="leading-tight min-w-0">
            <p className="text-sm font-medium text-ink truncate">Administrator</p>
            <p className="text-[11px] text-muted truncate">OCHST Admin</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

export function AdminMobileBottomNav() {
  return (
    <nav
      className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-surface/95 backdrop-blur border-t border-line px-2 pt-1.5 shadow-[0_-4px_20px_-8px_rgba(17,24,21,0.10)]"
      style={{ paddingBottom: 'max(0.375rem, env(safe-area-inset-bottom))' }}
    >
      <div className="flex items-center justify-between">
        {adminNavLinks.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/admin'}
            className={({ isActive }) =>
              cn(
                'flex flex-col items-center gap-1 py-1.5 flex-1 rounded-lg text-[11px] font-medium transition-colors duration-150',
                isActive ? 'text-cobalt-600' : 'text-muted hover:text-ink'
              )
            }
          >
            {({ isActive }) => (
              <>
                <Icon size={20} strokeWidth={isActive ? 2.3 : 2} />
                {label}
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}

export function AdminMobileDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  if (!open) return null;

  const go = (path: string) => {
    onClose();
    navigate(path);
  };

  const handleLogout = () => {
    onClose();
    logoutAdmin();
    navigate('/admin/login');
  };

  return (
    <div className="lg:hidden fixed inset-0 z-50">
      <div className="absolute inset-0 bg-ink/45 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
      <div className="absolute right-0 top-0 bottom-0 w-72 bg-surface shadow-card-hover p-5 flex flex-col">
        <div className="flex items-center justify-between mb-6">
          <p className="font-serif font-semibold text-ink tracking-tight">Menu</p>
          <button onClick={onClose} aria-label="Close menu" className="p-1.5 rounded-lg text-muted hover:bg-paper hover:text-ink transition-colors">
            <X size={18} />
          </button>
        </div>
        <div className="flex items-center gap-3 mb-6 px-1">
          <div className="w-9 h-9 rounded-full bg-cobalt-100 text-cobalt-600 flex items-center justify-center ring-1 ring-cobalt-500/10">
            <ShieldCheck size={16} strokeWidth={2.2} />
          </div>
          <div className="leading-tight">
            <p className="text-sm font-medium text-ink">Administrator</p>
            <p className="text-[11px] text-muted">OCHST Admin</p>
          </div>
        </div>
        <nav className="space-y-1 flex-1 overflow-y-auto">
          <p className="px-3 pb-2 text-[10.5px] font-semibold tracking-wider text-muted/80 uppercase">Administration</p>
          {adminNavLinks.map(({ to, label, icon: Icon }) => (
            <AdminDrawerLink key={to} icon={Icon} label={label} onClick={() => go(to)} />
          ))}
          <p className="px-3 pt-5 pb-2 text-[10.5px] font-semibold tracking-wider text-muted/80 uppercase">Settings</p>
          <AdminDrawerLink
            icon={theme === 'light' ? Moon : Sun}
            label={theme === 'light' ? 'Dark Mode' : 'Light Mode'}
            onClick={toggleTheme}
          />
        </nav>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-amber-600 hover:bg-amber-50 transition-colors"
        >
          <LogOut size={17} />
          Logout
        </button>
      </div>
    </div>
  );
}

function AdminDrawerLink({ icon: Icon, label, onClick }: { icon: typeof LayoutDashboard; label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-ink hover:bg-paper active:bg-line/40 transition-colors text-left"
    >
      <Icon size={17} strokeWidth={2} className="shrink-0" />
      <span className="truncate">{label}</span>
    </button>
  );
}
