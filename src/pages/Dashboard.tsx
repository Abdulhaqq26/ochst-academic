import { useMemo, useState, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BookOpenCheck,
  GraduationCap,
  ClipboardList,
  BellRing,
  MapPin,
  User,
  ArrowRight,
} from 'lucide-react';
import { SearchBar, StatCard, Button, EmptyState, Badge } from '../components/common';
import { ReminderCard } from '../components/reminders';
import { LevelTag } from '../components/timetable';
import { useReminders } from '../hooks/useReminders';
import {
  timetableEntries,
  exams,
  announcements as allAnnouncements,
  studentProfile,
} from '../data/mockData';
import {
  cn,
  formatTime12,
  getCurrentDayName,
  todayISO,
  classStatus,
  minutesUntil,
  formatDateLong,
  relativeDayLabel,
} from '../lib/utils';
import type { Reminder, TimetableEntry } from '../types';

function isForStudent(entry: (typeof timetableEntries)[number]) {
  return entry.level === studentProfile.level && (entry.department === studentProfile.department || entry.department === 'General Studies');
}

export default function Dashboard() {
  const navigate = useNavigate();
  const { reminders, toggleComplete } = useReminders();
  const [query, setQuery] = useState('');

  const today = todayISO();
  const currentDay = getCurrentDayName();

  const todaysClasses = useMemo(
    () =>
      timetableEntries
        .filter((e) => isForStudent(e) && e.day === currentDay)
        .sort((a, b) => a.startTime.localeCompare(b.startTime)),
    [currentDay]
  );

  const nextClass = useMemo(
    () => todaysClasses.find((e) => classStatus(today, e.startTime, e.endTime) !== 'completed'),
    [todaysClasses, today]
  );

  const pendingReminders = reminders.filter((r) => !r.completed).sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time));
  const upcomingExams = [...exams].sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time)).slice(0, 3);
  const recentAnnouncements = [...allAnnouncements].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 2);

  const searchResults = useMemo<{ matchedTimetable: TimetableEntry[]; matchedReminders: Reminder[] } | null>(() => {
    if (!query.trim()) return null;
    const q = query.toLowerCase();
    const matchedTimetable = timetableEntries.filter(
      (e) =>
        e.courseCode.toLowerCase().includes(q) ||
        e.courseTitle.toLowerCase().includes(q) ||
        e.venue.toLowerCase().includes(q) ||
        e.lecturer.toLowerCase().includes(q) ||
        e.department.toLowerCase().includes(q)
    );
    const matchedReminders = reminders.filter((r) => r.title.toLowerCase().includes(q));
    return { matchedTimetable, matchedReminders };
  }, [query, reminders]);

  const greeting = (() => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  })();

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-serif text-2xl font-semibold text-ink">
          {greeting}, {studentProfile.name.split(' ')[0]} 👋
        </h1>
        <p className="text-sm text-muted mt-1">Here&apos;s what&apos;s happening with your academics today.</p>
        <p className="text-xs text-muted mt-1">{formatDateLong(today)}</p>
      </div>

      <SearchBar value={query} onChange={setQuery} placeholder="Search courses, classes, venues or reminders…" className="mb-6" />

      {searchResults ? (
        <SearchResults results={searchResults} onClear={() => setQuery('')} />
      ) : (
        <>
          {nextClass ? (
            <div className="bg-teal-500 rounded-2xl p-5 sm:p-6 mb-6 text-white relative overflow-hidden">
              <p className="text-[11px] uppercase tracking-wide text-teal-50/80 font-medium">Next Class</p>
              <p className="font-serif text-xl sm:text-2xl font-semibold mt-1.5">{nextClass.courseCode}</p>
              <p className="text-teal-50/90 text-sm mt-0.5">{nextClass.courseTitle}</p>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 mt-3 text-sm text-teal-50/90">
                <span className="inline-flex items-center gap-1.5">
                  {formatTime12(nextClass.startTime)} – {formatTime12(nextClass.endTime)}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <MapPin size={13} /> {nextClass.venue}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <User size={13} /> {nextClass.lecturer}
                </span>
              </div>
              <p className="text-xs text-teal-50/80 mt-3">{minutesLabel(minutesUntil(today, nextClass.startTime))}</p>
              <Button variant="secondary" size="sm" className="mt-4 !bg-white !text-teal-600 !border-white" onClick={() => navigate('/timetable')}>
                View Timetable
              </Button>
            </div>
          ) : (
            <div className="bg-surface border border-line rounded-2xl p-6 mb-6">
              <EmptyState title="No more classes today" message="You're free for the rest of the day — a good time to catch up on reminders." />
            </div>
          )}

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
            <StatCard label="Today's Classes" value={todaysClasses.length} icon={BookOpenCheck} tone="teal" />
            <StatCard label="Upcoming Exams" value={exams.length} icon={GraduationCap} tone="cobalt" />
            <StatCard label="Pending Assignments" value={reminders.filter((r) => r.type === 'Assignment' && !r.completed).length} icon={ClipboardList} tone="amber" />
            <StatCard label="Active Reminders" value={pendingReminders.length} icon={BellRing} tone="moss" />
          </div>

          <Section title="Today's Schedule" action={<LinkButton onClick={() => navigate('/timetable')}>View Timetable</LinkButton>}>
            {todaysClasses.length === 0 ? (
              <EmptyState title="No classes scheduled for this day" message="Enjoy the free time, or check your full timetable for the week." />
            ) : (
              <ol className="relative border-l border-line ml-3 space-y-5">
                {todaysClasses.map((entry) => {
                  const status = classStatus(today, entry.startTime, entry.endTime);
                  return (
                    <li key={entry.id} className="ml-5 relative">
                      <span
                        className={cn(
                          'absolute -left-[1.65rem] top-1.5 w-2.5 h-2.5 rounded-full',
                          status === 'current' ? 'bg-teal-500 ring-4 ring-teal-100' : status === 'completed' ? 'bg-line' : 'bg-cobalt-500'
                        )}
                      />
                      <p className="text-xs font-medium text-muted mb-1">{formatTime12(entry.startTime)}</p>
                      <div
                        className={cn(
                          'bg-surface border rounded-xl p-3.5',
                          status === 'current' ? 'border-teal-500 shadow-card' : 'border-line',
                          status === 'completed' && 'opacity-55'
                        )}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <p className={cn('text-sm font-semibold', status === 'current' ? 'text-teal-600' : 'text-ink')}>
                            {entry.courseCode} — {entry.courseTitle}
                          </p>
                          {status === 'current' && <span className="text-[10px] font-semibold uppercase tracking-wide text-teal-600 shrink-0">Now</span>}
                        </div>
                        <div className="flex flex-wrap items-center gap-2 mt-1.5">
                          <p className="text-xs text-muted">{entry.venue}</p>
                          {entry.department !== studentProfile.department && (
                            <Badge tone="cobalt">{entry.department}</Badge>
                          )}
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ol>
            )}
          </Section>

          <Section title="Upcoming Reminders" action={<LinkButton onClick={() => navigate('/reminders')}>View All Reminders</LinkButton>}>
            {pendingReminders.length === 0 ? (
              <EmptyState title="You're all caught up." />
            ) : (
              <div className="space-y-3">
                {pendingReminders.slice(0, 3).map((r) => (
                  <ReminderCard key={r.id} reminder={r} onToggle={toggleComplete} onEdit={() => navigate('/reminders')} onDelete={() => navigate('/reminders')} />
                ))}
              </div>
            )}
          </Section>

          <Section title="Upcoming Examinations" action={<LinkButton onClick={() => navigate('/calendar')}>View Calendar</LinkButton>}>
            {upcomingExams.length === 0 ? (
              <EmptyState title="No examinations scheduled" message="Check back later — new exam dates will appear here once released." />
            ) : (
              <div className="grid sm:grid-cols-3 gap-3">
                {upcomingExams.map((exam) => (
                  <div key={exam.id} className="bg-surface border border-line rounded-xl p-4">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-semibold text-ink">{exam.courseCode}</p>
                      <LevelTag level={exam.level} />
                    </div>
                    <p className="text-xs text-muted mt-0.5">{exam.courseTitle}</p>
                    <p className="text-xs text-cobalt-600 font-medium mt-2.5">{relativeDayLabel(exam.date)}</p>
                    <p className="text-xs text-muted mt-0.5">
                      {formatTime12(exam.time)} • {exam.venue}
                    </p>
                    <p className="text-[11px] text-muted mt-1 truncate">{exam.department}</p>
                  </div>
                ))}
              </div>
            )}
          </Section>

          <Section title="Recent Announcements" action={<LinkButton onClick={() => navigate('/announcements')}>View All Announcements</LinkButton>} last>
            <div className="space-y-3">
              {recentAnnouncements.map((a) => (
                <div key={a.id} className="bg-surface border border-line rounded-xl p-4">
                  <p className="text-sm font-medium text-ink">{a.title}</p>
                  <p className="text-xs text-muted mt-1">{formatDateLong(a.date)}</p>
                </div>
              ))}
            </div>
          </Section>
        </>
      )}
    </div>
  );
}

function minutesLabel(minutes: number): string {
  if (minutes <= 0) return 'In progress';
  if (minutes < 60) return `Starts in ${minutes} minutes`;
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  return `Starts in ${hours}h ${rest}m`;
}

function SearchResults({
  results,
  onClear,
}: {
  results: { matchedTimetable: TimetableEntry[]; matchedReminders: Reminder[] };
  onClear: () => void;
}) {
  const total = results.matchedTimetable.length + results.matchedReminders.length;
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm text-muted">
          {total} result{total === 1 ? '' : 's'} found
        </p>
        <button onClick={onClear} className="text-xs text-teal-600 font-medium hover:underline">
          Clear search
        </button>
      </div>
      {total === 0 ? (
        <EmptyState title="No academic activities found" message="Try a different course code, venue, or lecturer name." />
      ) : (
        <div className="space-y-3">
          {results.matchedTimetable.map((e) => (
            <div key={e.id} className="bg-surface border border-line rounded-xl p-4">
              <div className="flex items-start justify-between gap-2">
                <p className="text-sm font-semibold text-ink">
                  {e.courseCode} — {e.courseTitle}
                </p>
                <LevelTag level={e.level} />
              </div>
              <p className="text-xs text-muted mt-1">
                {e.department} • {e.day} • {formatTime12(e.startTime)} • {e.venue} • {e.lecturer}
              </p>
            </div>
          ))}
          {results.matchedReminders.map((r) => (
            <div key={r.id} className="bg-surface border border-line rounded-xl p-4">
              <p className="text-sm font-medium text-ink">{r.title}</p>
              <p className="text-xs text-muted mt-1">Reminder • {relativeDayLabel(r.date)}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Section({ title, action, children, last }: { title: string; action?: ReactNode; children: ReactNode; last?: boolean }) {
  return (
    <div className={cn('mb-8', last && 'mb-2')}>
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-serif text-base font-semibold text-ink">{title}</h2>
        {action}
      </div>
      {children}
    </div>
  );
}

function LinkButton({ children, onClick }: { children: ReactNode; onClick: () => void }) {
  return (
    <button onClick={onClick} className="inline-flex items-center gap-1 text-xs font-medium text-teal-600 hover:underline">
      {children}
      <ArrowRight size={12} />
    </button>
  );
}
