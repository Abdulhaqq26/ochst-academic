import { useNavigate } from 'react-router-dom';
import { useState, type ReactNode } from 'react';
import { LogOut, Moon, Sun, BellRing, SlidersHorizontal, Info, HelpCircle, ShieldCheck } from 'lucide-react';
import { PageHeader, Button } from '../components/common';
import { studentProfile } from '../data/mockData';
import { initials, cn } from '../lib/utils';
import { useTheme } from '../hooks/useTheme';

export default function Profile() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [reminderPrefs, setReminderPrefs] = useState(true);
  const [displayPrefs, setDisplayPrefs] = useState(true);

  return (
    <div>
      <PageHeader title="Profile" subtitle="Manage your account and preferences." />

      <div className="flex items-center gap-4 bg-surface border border-line rounded-xl p-5 mb-6">
        <div className="w-16 h-16 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center text-xl font-serif font-semibold shrink-0">
          {initials(studentProfile.name)}
        </div>
        <div className="min-w-0">
          <p className="font-serif text-lg font-semibold text-ink truncate">{studentProfile.name}</p>
          <p className="text-sm text-muted truncate">{studentProfile.email}</p>
          <p className="text-xs text-muted mt-0.5">
            {studentProfile.department} • {studentProfile.level}
          </p>
        </div>
      </div>

      <SettingsSection title="Personal Information">
        <InfoRow label="Name" value={studentProfile.name} />
        <InfoRow label="Email" value={studentProfile.email} />
        <InfoRow label="Matric Number" value={studentProfile.matricNumber} />
        <InfoRow label="Department" value={studentProfile.department} />
        <InfoRow label="Level" value={studentProfile.level} last />
      </SettingsSection>

      <SettingsSection title="Preferences">
        <ToggleRow icon={theme === 'light' ? Moon : Sun} label="Dark Mode" checked={theme === 'dark'} onChange={toggleTheme} />
        <ToggleRow icon={BellRing} label="Reminder Preferences" checked={reminderPrefs} onChange={() => setReminderPrefs((v) => !v)} />
        <ToggleRow icon={SlidersHorizontal} label="Academic Display Preferences" checked={displayPrefs} onChange={() => setDisplayPrefs((v) => !v)} last />
      </SettingsSection>

      <SettingsSection title="App">
        <LinkRow icon={Info} label="About OCHST Academic Hub" />
        <LinkRow icon={HelpCircle} label="Help & Support" />
        <LinkRow icon={ShieldCheck} label="Privacy" last />
      </SettingsSection>

      <Button variant="danger" icon={LogOut} className="w-full sm:w-auto" onClick={() => navigate('/login')}>
        Logout
      </Button>
    </div>
  );
}

function SettingsSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="mb-6">
      <h2 className="font-serif text-sm font-semibold text-ink mb-2.5">{title}</h2>
      <div className="bg-surface border border-line rounded-xl overflow-hidden">{children}</div>
    </div>
  );
}

function InfoRow({ label, value, last }: { label: string; value: string; last?: boolean }) {
  return (
    <div className={cn('flex items-center justify-between px-4 py-3', !last && 'border-b border-line')}>
      <span className="text-sm text-muted">{label}</span>
      <span className="text-sm text-ink font-medium">{value}</span>
    </div>
  );
}

function ToggleRow({
  icon: Icon,
  label,
  checked,
  onChange,
  last,
}: {
  icon: typeof BellRing;
  label: string;
  checked: boolean;
  onChange: () => void;
  last?: boolean;
}) {
  return (
    <div className={cn('flex items-center justify-between px-4 py-3', !last && 'border-b border-line')}>
      <span className="flex items-center gap-2.5 text-sm text-ink">
        <Icon size={16} className="text-muted" />
        {label}
      </span>
      <button
        onClick={onChange}
        role="switch"
        aria-checked={checked}
        aria-label={label}
        className={cn('w-10 h-6 rounded-full transition-colors relative shrink-0', checked ? 'bg-teal-500' : 'bg-line')}
      >
        <span className={cn('absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform', checked && 'translate-x-4')} />
      </button>
    </div>
  );
}

function LinkRow({ icon: Icon, label, last }: { icon: typeof Info; label: string; last?: boolean }) {
  return (
    <button className={cn('flex items-center gap-2.5 w-full text-left px-4 py-3 text-sm text-ink hover:bg-paper transition-colors', !last && 'border-b border-line')}>
      <Icon size={16} className="text-muted" />
      {label}
    </button>
  );
}
