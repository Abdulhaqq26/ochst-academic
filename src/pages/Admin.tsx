import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ShieldCheck,
  Users,
  BookOpen,
  Table2,
  Building2,
  GraduationCap,
  Megaphone,
  UploadCloud,
  CalendarPlus,
  FilePlus2,
  BellPlus,
  ArrowRight,
  MapPin,
  Clock,
  Lock,
} from 'lucide-react';
import { Badge } from '../components/common';
import { LevelTag } from '../components/timetable';
import { timetableEntries, courses, announcements, exams } from '../data/mockData';
import { cn, formatTime12, formatDateLong, relativeDayLabel, todayISO } from '../lib/utils';

// Total registered students isn't modeled in the mock dataset (there's no student
// roster — only a single signed-in studentProfile), so this mirrors the same
// placeholder figure the previous dashboard used for this metric.
const TOTAL_STUDENTS = 412;

export default function Admin() {
  const navigate = useNavigate();
  const today = todayISO();

  const totalDepartments = useMemo(() => new Set(courses.map((c) => c.department)).size, []);

  const upcomingExams = useMemo(() => {
    const upcoming = exams.filter((e) => e.date >= today).sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time));
    return (upcoming.length > 0 ? upcoming : [...exams].sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time))).slice(0, 4);
  }, [today]);

  const recentTimetableEntries = useMemo(() => [...timetableEntries].slice(-6).reverse(), []);

  const recentAnnouncements = useMemo(
    () => [...announcements].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 4),
    []
  );

  const greeting = (() => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  })();

  return (
    <div>
      {/* Welcome header — deliberately distinct (cobalt, denser stats) from the student hero */}
      <div className="bg-gradient-to-br from-cobalt-600 to-cobalt-500 rounded-2xl p-5 sm:p-7 mb-6 text-white relative overflow-hidden">
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-1.5 bg-white/15 rounded-full px-2.5 py-1 text-[11px] font-medium uppercase tracking-wide">
              <ShieldCheck size={12} />
              Administrator
            </span>
            <h1 className="font-serif text-xl sm:text-2xl font-semibold mt-3">{greeting}, Admin 👋</h1>
            <p className="text-cobalt-50/85 text-sm mt-1 max-w-md">
              Here&apos;s an overview of academic operations across the institution.
            </p>
          </div>
          <div className="hidden sm:flex w-11 h-11 rounded-xl bg-white/15 items-center justify-center shrink-0">
            <GraduationCap size={22} strokeWidth={2.2} />
          </div>
        </div>
        <p className="text-xs text-cobalt-50/70 mt-4">{formatDateLong(today)}</p>
      </div>

      {/* Core statistics */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
        <AdminStat label="Total Students" value={TOTAL_STUDENTS} icon={Users} tone="teal" />
        <AdminStat label="Total Courses" value={courses.length} icon={BookOpen} tone="cobalt" />
        <AdminStat label="Timetable Entries" value={timetableEntries.length} icon={Table2} tone="moss" />
        <AdminStat label="Departments" value={totalDepartments} icon={Building2} tone="amber" />
        <AdminStat label="Upcoming Exams" value={exams.length} icon={GraduationCap} tone="cobalt" />
        <AdminStat label="Active Announcements" value={announcements.length} icon={Megaphone} tone="teal" />
      </div>

      {/* Quick actions */}
      <div className="mb-8">
        <h2 className="font-serif text-base font-semibold text-ink mb-3">Quick Actions</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          <QuickAction
            label="Add Timetable Entry"
            icon={UploadCloud}
            onClick={() => navigate('/admin/upload')}
          />
          <QuickAction label="Add Course" icon={FilePlus2} comingSoon />
          <QuickAction label="Create Announcement" icon={BellPlus} comingSoon />
          <QuickAction label="Add Examination" icon={GraduationCap} comingSoon />
          <QuickAction label="Add Academic Event" icon={CalendarPlus} comingSoon />
        </div>
      </div>

      {/* Activity + upcoming panels */}
      <div className="grid lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2">
          <h2 className="font-serif text-base font-semibold text-ink mb-3">Recent Timetable Activity</h2>
          <div className="bg-surface border border-line rounded-xl overflow-x-auto">
            <table className="w-full text-sm min-w-[640px]">
              <thead>
                <tr className="border-b border-line text-left text-xs text-muted">
                  <th className="px-4 py-3 font-medium">Course</th>
                  <th className="px-4 py-3 font-medium">Level</th>
                  <th className="px-4 py-3 font-medium">Day</th>
                  <th className="px-4 py-3 font-medium">Time</th>
                  <th className="px-4 py-3 font-medium">Venue</th>
                </tr>
              </thead>
              <tbody>
                {recentTimetableEntries.map((e) => (
                  <tr key={e.id} className="border-b border-line last:border-0">
                    <td className="px-4 py-3">
                      <p className="font-medium text-ink">{e.courseCode}</p>
                      <p className="text-xs text-muted">{e.courseTitle}</p>
                    </td>
                    <td className="px-4 py-3">
                      <LevelTag level={e.level} />
                    </td>
                    <td className="px-4 py-3 text-muted">{e.day}</td>
                    <td className="px-4 py-3 text-muted whitespace-nowrap">
                      {formatTime12(e.startTime)} – {formatTime12(e.endTime)}
                    </td>
                    <td className="px-4 py-3 text-muted">{e.venue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="font-serif text-base font-semibold text-ink mb-3 mt-8">Recent Announcements</h2>
          <div className="bg-surface border border-line rounded-xl divide-y divide-line">
            {recentAnnouncements.map((a) => (
              <div key={a.id} className="flex items-start justify-between gap-3 px-4 py-3.5">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-ink truncate">{a.title}</p>
                    {!a.read && <Badge tone="amber">New</Badge>}
                  </div>
                  <p className="text-xs text-muted mt-1 line-clamp-1">{a.body}</p>
                  <p className="text-[11px] text-muted mt-1.5">{formatDateLong(a.date)}</p>
                </div>
                <Badge tone="neutral">{a.category}</Badge>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="font-serif text-base font-semibold text-ink mb-3">Upcoming Examinations</h2>
          <div className="space-y-3">
            {upcomingExams.map((exam) => (
              <div key={exam.id} className="bg-surface border border-line rounded-xl p-4">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-semibold text-ink">{exam.courseCode}</p>
                  <LevelTag level={exam.level} />
                </div>
                <p className="text-xs text-muted mt-0.5">{exam.courseTitle}</p>
                <p className="text-xs text-cobalt-600 font-medium mt-2.5">{relativeDayLabel(exam.date)}</p>
                <div className="flex items-center gap-3 mt-1.5">
                  <span className="inline-flex items-center gap-1 text-xs text-muted">
                    <Clock size={12} /> {formatTime12(exam.time)}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs text-muted truncate">
                    <MapPin size={12} /> {exam.venue}
                  </span>
                </div>
                <p className="text-[11px] text-muted mt-1.5 truncate">{exam.department}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------- Admin-specific stat card (visually denser than the student StatCard) ----------
type Tone = 'teal' | 'amber' | 'cobalt' | 'moss';

const toneIconClasses: Record<Tone, string> = {
  teal: 'text-teal-500',
  amber: 'text-amber-500',
  cobalt: 'text-cobalt-500',
  moss: 'text-moss-500',
};

function AdminStat({ label, value, icon: Icon, tone }: { label: string; value: number | string; icon: typeof Users; tone: Tone }) {
  return (
    <div className="bg-surface border border-line rounded-xl p-4">
      <Icon size={16} className={toneIconClasses[tone]} strokeWidth={2.2} />
      <p className="text-xl font-serif font-semibold text-ink leading-none mt-2.5">{value}</p>
      <p className="text-[11px] text-muted mt-1 leading-tight">{label}</p>
    </div>
  );
}

// ---------- Quick action tile ----------
function QuickAction({
  label,
  icon: Icon,
  onClick,
  comingSoon,
}: {
  label: string;
  icon: typeof Users;
  onClick?: () => void;
  comingSoon?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={comingSoon ? undefined : onClick}
      disabled={comingSoon}
      aria-disabled={comingSoon}
      className={cn(
        'group relative flex flex-col items-start gap-2.5 bg-surface border border-line rounded-xl p-4 text-left transition-colors',
        comingSoon ? 'opacity-60 cursor-not-allowed' : 'hover:border-teal-500 hover:shadow-card cursor-pointer'
      )}
    >
      <div
        className={cn(
          'w-9 h-9 rounded-lg flex items-center justify-center shrink-0',
          comingSoon ? 'bg-line/60 text-muted' : 'bg-teal-50 text-teal-600 dark:bg-teal-600/10'
        )}
      >
        <Icon size={17} strokeWidth={2.2} />
      </div>
      <p className="text-sm font-medium text-ink leading-tight">{label}</p>
      {comingSoon ? (
        <span className="inline-flex items-center gap-1 text-[10px] font-medium text-muted uppercase tracking-wide">
          <Lock size={10} /> Coming soon
        </span>
      ) : (
        <span className="inline-flex items-center gap-1 text-[10px] font-medium text-teal-600 uppercase tracking-wide opacity-0 group-hover:opacity-100 transition-opacity">
          Open <ArrowRight size={10} />
        </span>
      )}
    </button>
  );
}
