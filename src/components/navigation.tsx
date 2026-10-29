import { useState, type ReactNode } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  CalendarDays,
  BellRing,
  Megaphone,
  UserRound,
  ShieldCheck,
  UploadCloud,
  LogOut,
  Settings,
  Menu,
  X,
  GraduationCap,
  Table2,
  Moon,
  Sun,
} from 'lucide-react';
import { cn, initials } from '../lib/utils';
import { useTheme } from '../hooks/useTheme';
import { studentProfile } from '../data/mockData';

const studentNav = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/timetable', label: 'Timetable', icon: Table2 },
  { to: '/calendar', label: 'Calendar', icon: CalendarDays },
  { to: '/reminders', label: 'Reminders', icon: BellRing },
  { to: '/announcements', label: 'Announcements', icon: Megaphone },
  { to: '/profile', label: 'Profile', icon: UserRound },
];

const adminNav = [
  { to: '/admin', label: 'Admin Dashboard', icon: ShieldCheck },
  { to: '/admin/upload', label: 'Add Timetable', icon: UploadCloud },
];

const mobileTabs = [
  { to: '/dashboard', label: 'Home', icon: LayoutDashboard },
  { to: '/timetable', label: 'Timetable', icon: Table2 },
  { to: '/calendar', label: 'Calendar', icon: CalendarDays },
  { to: '/reminders', label: 'Reminders', icon: BellRing },
  { to: '/profile', label: 'Profile', icon: UserRound },
];

function NavItem({ to, label, icon: Icon }: { to: string; label: string; icon: typeof LayoutDashboard }) {
  return (
    <NavLink
      to={to}
      end={to === '/admin'}
      className={({ isActive }) =>
        cn(
          'group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150',
          isActive
            ? 'bg-teal-500 text-white shadow-sm'
            : 'text-muted hover:text-ink hover:bg-paper hover:translate-x-0.5'
        )
      }
    >
      <Icon size={17} strokeWidth={2} className="shrink-0" />
      <span className="truncate">{label}</span>
    </NavLink>
  );
}

export function Sidebar() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  return (
    <aside className="hidden lg:flex lg:flex-col w-64 shrink-0 h-screen sticky top-0 border-r border-line bg-surface px-4 py-6">
      <div className="flex items-center gap-2.5 px-2 mb-8">
        <div className="w-9 h-9 rounded-lg bg-teal-500 flex items-center justify-center shrink-0 shadow-sm">
          <GraduationCap size={19} className="text-white" strokeWidth={2.2} />
        </div>
        <div className="leading-tight">
          <p className="font-serif font-semibold text-[15px] text-ink tracking-tight">OCHST</p>
          <p className="text-[11px] text-muted -mt-0.5">Academic Hub</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto no-scrollbar">
        {studentNav.map((item) => (
          <NavItem key={item.to} {...item} />
        ))}

        <p className="px-3 pt-6 pb-2 text-[10.5px] font-semibold tracking-wider text-muted/80 uppercase">Administration</p>
        {adminNav.map((item) => (
          <NavItem key={item.to} {...item} />
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
          onClick={() => navigate('/login')}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-muted hover:text-amber-600 hover:bg-amber-50 transition-colors"
        >
          <LogOut size={17} />
          Logout
        </button>
        <div className="flex items-center gap-3 px-3 pt-3">
          <div className="w-8 h-8 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center text-xs font-semibold shrink-0 ring-1 ring-teal-500/10">
            {initials(studentProfile.name)}
          </div>
          <div className="leading-tight min-w-0">
            <p className="text-sm font-medium text-ink truncate">{studentProfile.name}</p>
            <p className="text-[11px] text-muted truncate">{studentProfile.matricNumber}</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

export function MobileBottomNav() {
  return (
    <nav
      className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-surface/95 backdrop-blur border-t border-line px-2 pt-1.5 shadow-[0_-4px_20px_-8px_rgba(17,24,21,0.10)]"
      style={{ paddingBottom: 'max(0.375rem, env(safe-area-inset-bottom))' }}
    >
      <div className="flex items-center justify-between">
        {mobileTabs.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              cn(
                'flex flex-col items-center gap-1 py-1.5 flex-1 rounded-lg text-[11px] font-medium transition-colors duration-150',
                isActive ? 'text-teal-600' : 'text-muted hover:text-ink'
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

export function MobileTopBar({ onMenuOpen }: { onMenuOpen: () => void }) {
  return (
    <header className="lg:hidden sticky top-0 z-30 flex items-center justify-between bg-surface/90 backdrop-blur border-b border-line px-4 py-3">
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-md bg-teal-500 flex items-center justify-center shadow-sm">
          <GraduationCap size={15} className="text-white" strokeWidth={2.2} />
        </div>
        <p className="font-serif font-semibold text-sm text-ink tracking-tight">OCHST Academic Hub</p>
      </div>
      <button
        onClick={onMenuOpen}
        aria-label="Open menu"
        className="p-2 rounded-lg text-ink hover:bg-paper transition-colors"
      >
        <Menu size={20} />
      </button>
    </header>
  );
}

export function MobileDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  if (!open) return null;

  const go = (path: string) => {
    onClose();
    navigate(path);
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
          <div className="w-9 h-9 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center text-xs font-semibold ring-1 ring-teal-500/10">
            {initials(studentProfile.name)}
          </div>
          <div className="leading-tight">
            <p className="text-sm font-medium text-ink">{studentProfile.name}</p>
            <p className="text-[11px] text-muted">{studentProfile.matricNumber}</p>
          </div>
        </div>
        <nav className="space-y-1 flex-1 overflow-y-auto">
          <DrawerLink icon={Megaphone} label="Announcements" onClick={() => go('/announcements')} />
          <p className="px-3 pt-5 pb-2 text-[10.5px] font-semibold tracking-wider text-muted/80 uppercase">Administration</p>
          <DrawerLink icon={ShieldCheck} label="Admin Dashboard" onClick={() => go('/admin')} />
          <DrawerLink icon={UploadCloud} label="Add Timetable" onClick={() => go('/admin/upload')} />
          <p className="px-3 pt-5 pb-2 text-[10.5px] font-semibold tracking-wider text-muted/80 uppercase">Settings</p>
          <DrawerLink icon={theme === 'light' ? Moon : Sun} label={theme === 'light' ? 'Dark Mode' : 'Light Mode'} onClick={toggleTheme} />
          <DrawerLink icon={Settings} label="Preferences" onClick={() => go('/profile')} />
        </nav>
        <button
          onClick={() => go('/login')}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-amber-600 hover:bg-amber-50 transition-colors"
        >
          <LogOut size={17} />
          Logout
        </button>
      </div>
    </div>
  );
}

function DrawerLink({ icon: Icon, label, onClick }: { icon: typeof LayoutDashboard; label: string; onClick: () => void }) {
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

export function useMobileDrawer(): [boolean, () => void, () => void] {
  const [open, setOpen] = useState(false);
  return [open, () => setOpen(true), () => setOpen(false)];
}

export type { ReactNode };
