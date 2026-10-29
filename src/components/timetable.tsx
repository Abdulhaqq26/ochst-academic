import { ChevronLeft, ChevronRight, MapPin, User, Clock } from 'lucide-react';
import type { Day, Department, Level, Semester, TimetableEntry } from '../types';
import { cn, formatTime12 } from '../lib/utils';
import { EmptyState } from './common';

export const DAYS: Day[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const HOURS = [8, 9, 10, 11, 12, 13, 14, 15, 16];
const DAY_START = 8 * 60;
const DAY_SPAN = 9 * 60; // 8am - 5pm
const ROW_HEIGHT = 64;

const deptAccent: Record<string, { bar: string; bg: string; text: string }> = {
  'Computer Science': { bar: 'bg-teal-500', bg: 'bg-teal-50 dark:bg-teal-600/10', text: 'text-teal-600' },
  'General Studies': { bar: 'bg-cobalt-500', bg: 'bg-cobalt-50 dark:bg-cobalt-500/10', text: 'text-cobalt-600' },
  Anatomy: { bar: 'bg-amber-500', bg: 'bg-amber-50 dark:bg-amber-500/10', text: 'text-amber-600' },
  Physiology: { bar: 'bg-moss-500', bg: 'bg-moss-50 dark:bg-moss-500/10', text: 'text-moss-600' },
  Biochemistry: { bar: 'bg-amber-500', bg: 'bg-amber-50 dark:bg-amber-500/10', text: 'text-amber-600' },
  'Public Health': { bar: 'bg-moss-500', bg: 'bg-moss-50 dark:bg-moss-500/10', text: 'text-moss-600' },
  'Health Information Management': { bar: 'bg-cobalt-500', bg: 'bg-cobalt-50 dark:bg-cobalt-500/10', text: 'text-cobalt-600' },
  Statistics: { bar: 'bg-teal-500', bg: 'bg-teal-50 dark:bg-teal-600/10', text: 'text-teal-600' },
  'Community Health': { bar: 'bg-moss-500', bg: 'bg-moss-50 dark:bg-moss-500/10', text: 'text-moss-600' },
  'Environmental Health': { bar: 'bg-moss-500', bg: 'bg-moss-50 dark:bg-moss-500/10', text: 'text-moss-600' },
  'Dental Therapy': { bar: 'bg-amber-500', bg: 'bg-amber-50 dark:bg-amber-500/10', text: 'text-amber-600' },
  'Dental Technology': { bar: 'bg-amber-500', bg: 'bg-amber-50 dark:bg-amber-500/10', text: 'text-amber-600' },
  'Medical Laboratory Technology': { bar: 'bg-amber-500', bg: 'bg-amber-50 dark:bg-amber-500/10', text: 'text-amber-600' },
  'Pharmacy Technician': { bar: 'bg-cobalt-500', bg: 'bg-cobalt-50 dark:bg-cobalt-500/10', text: 'text-cobalt-600' },
  'Nutrition and Dietetics': { bar: 'bg-moss-500', bg: 'bg-moss-50 dark:bg-moss-500/10', text: 'text-moss-600' },
};

function accentFor(dept: string) {
  return deptAccent[dept] ?? deptAccent['Computer Science'];
}

function toMinutes(time: string): number {
  const [h, m] = time.split(':').map(Number);
  return h * 60 + m;
}

const LEVEL_ORDER: Level[] = ['ND I', 'ND II', 'HND I', 'HND II'];

const levelTone: Record<Level, string> = {
  'ND I': 'bg-moss-500/90 text-white',
  'ND II': 'bg-teal-500/90 text-white',
  'HND I': 'bg-cobalt-500/90 text-white',
  'HND II': 'bg-amber-500/90 text-white',
};

export function LevelTag({ level, className }: { level: Level; className?: string }) {
  return (
    <span className={cn('inline-flex items-center rounded px-1.5 py-[1px] text-[9px] font-semibold tracking-wide shrink-0', levelTone[level], className)}>
      {level}
    </span>
  );
}

// ---------- Filters ----------
export interface TimetableFilterValues {
  department: Department | 'All';
  level: Level | 'All';
  semester: Semester | 'All';
  academicSession: string;
  day: Day | 'All';
}

interface TimetableFiltersProps {
  values: TimetableFilterValues;
  onChange: (values: TimetableFilterValues) => void;
  departments: string[];
  levels: string[];
  sessions: string[];
}

function Select({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  return (
    <label className="flex flex-col gap-1 text-xs font-medium text-muted min-w-[9rem]">
      {label}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-surface border border-line rounded-lg px-2.5 py-2 text-sm text-ink focus:border-teal-500 outline-none"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}

export function TimetableFilters({ values, onChange, departments, levels, sessions }: TimetableFiltersProps) {
  const orderedLevels = LEVEL_ORDER.filter((l) => levels.includes(l));
  return (
    <div className="flex flex-wrap gap-3 bg-surface border border-line rounded-xl p-4">
      <Select label="Department" value={values.department} options={['All', ...departments]} onChange={(v) => onChange({ ...values, department: v as Department | 'All' })} />
      <Select label="Level" value={values.level} options={['All', ...orderedLevels]} onChange={(v) => onChange({ ...values, level: v as Level | 'All' })} />
      <Select label="Semester" value={values.semester} options={['All', 'First Semester', 'Second Semester']} onChange={(v) => onChange({ ...values, semester: v as Semester | 'All' })} />
      <Select label="Day" value={values.day} options={['All', ...DAYS]} onChange={(v) => onChange({ ...values, day: v as Day | 'All' })} />
      <Select label="Academic Session" value={values.academicSession} options={sessions} onChange={(v) => onChange({ ...values, academicSession: v })} />
    </div>
  );
}

// ---------- Week nav ----------
export function WeekNav({
  weekLabel,
  onPrev,
  onNext,
  onToday,
}: {
  weekLabel: string;
  onPrev: () => void;
  onNext: () => void;
  onToday: () => void;
}) {
  return (
    <div className="flex items-center gap-2">
      <button onClick={onPrev} aria-label="Previous week" className="p-2 rounded-lg border border-line text-muted hover:text-ink hover:bg-paper transition-colors">
        <ChevronLeft size={16} />
      </button>
      <span className="text-sm font-medium text-ink min-w-[9rem] text-center">{weekLabel}</span>
      <button onClick={onNext} aria-label="Next week" className="p-2 rounded-lg border border-line text-muted hover:text-ink hover:bg-paper transition-colors">
        <ChevronRight size={16} />
      </button>
      <button onClick={onToday} className="text-sm font-medium px-3 py-2 rounded-lg border border-line text-ink hover:bg-paper transition-colors">
        Today
      </button>
    </div>
  );
}

// ---------- Overlap lane assignment (avoids blocks stacking on top of each other) ----------
interface LaneInfo {
  lane: number;
  lanes: number;
}

function assignLanes(dayEntries: TimetableEntry[]): Map<string, LaneInfo> {
  const sorted = [...dayEntries].sort((a, b) => toMinutes(a.startTime) - toMinutes(b.startTime));
  const result = new Map<string, LaneInfo>();

  let cluster: TimetableEntry[] = [];
  let clusterEnd = -1;

  const flushCluster = () => {
    if (cluster.length === 0) return;
    const laneEnds: number[] = [];
    const laneOf = new Map<string, number>();
    for (const entry of cluster) {
      const start = toMinutes(entry.startTime);
      let lane = laneEnds.findIndex((end) => end <= start);
      if (lane === -1) {
        lane = laneEnds.length;
        laneEnds.push(toMinutes(entry.endTime));
      } else {
        laneEnds[lane] = toMinutes(entry.endTime);
      }
      laneOf.set(entry.id, lane);
    }
    const lanes = laneEnds.length;
    cluster.forEach((entry) => result.set(entry.id, { lane: laneOf.get(entry.id) ?? 0, lanes }));
    cluster = [];
  };

  for (const entry of sorted) {
    const start = toMinutes(entry.startTime);
    if (cluster.length > 0 && start >= clusterEnd) {
      flushCluster();
      clusterEnd = -1;
    }
    cluster.push(entry);
    clusterEnd = Math.max(clusterEnd, toMinutes(entry.endTime));
  }
  flushCluster();

  return result;
}

// ---------- Entry block (desktop grid) ----------
function EntryBlock({ entry, lane, lanes }: { entry: TimetableEntry; lane: number; lanes: number }) {
  const accent = accentFor(entry.department);
  const top = ((toMinutes(entry.startTime) - DAY_START) / DAY_SPAN) * (HOURS.length * ROW_HEIGHT);
  const height = Math.max(((toMinutes(entry.endTime) - toMinutes(entry.startTime)) / DAY_SPAN) * (HOURS.length * ROW_HEIGHT), 44);
  const widthPct = 100 / lanes;
  const leftPct = lane * widthPct;
  const showLecturer = height >= 76;

  return (
    <div
      className={cn('absolute rounded-lg border border-line/60 px-2 py-1.5 overflow-hidden', accent.bg)}
      style={{
        top,
        height,
        left: `calc(${leftPct}% + ${lane === 0 ? 4 : 2}px)`,
        width: `calc(${widthPct}% - ${lanes > 1 ? 4 : 8}px)`,
      }}
      title={`${entry.courseCode} — ${entry.courseTitle} • ${entry.level} • ${entry.venue} • ${entry.lecturer}`}
    >
      <div className={cn('w-1 h-full absolute left-0 top-0 rounded-l-lg', accent.bar)} />
      <div className="flex items-start justify-between gap-1">
        <p className={cn('text-[11.5px] font-semibold leading-tight truncate', accent.text)}>{entry.courseCode}</p>
        <LevelTag level={entry.level} className="mt-px" />
      </div>
      <p className="text-[10.5px] text-ink/80 leading-tight truncate">{entry.courseTitle}</p>
      <p className="text-[10px] text-muted leading-tight truncate mt-0.5">{entry.venue}</p>
      {showLecturer && <p className="text-[10px] text-muted leading-tight truncate mt-0.5">{entry.lecturer}</p>}
    </div>
  );
}

// ---------- Desktop weekly grid ----------
export function TimetableGrid({ entries }: { entries: TimetableEntry[] }) {
  if (entries.length === 0) {
    return <EmptyState title="No academic activities found" message="Try adjusting your filters to see more of your timetable." />;
  }

  return (
    <div className="hidden md:block bg-surface border border-line rounded-xl overflow-hidden">
      <div className="grid grid-cols-[3.5rem_repeat(5,1fr)]">
        <div className="border-b border-line" />
        {DAYS.map((day) => (
          <div key={day} className="border-b border-l border-line px-3 py-3 text-sm font-semibold text-ink text-center">
            {day}
          </div>
        ))}

        <div className="relative" style={{ height: HOURS.length * ROW_HEIGHT }}>
          {HOURS.map((h, i) => (
            <div
              key={h}
              className="absolute left-0 right-0 text-[11px] text-muted text-right pr-2 -translate-y-2"
              style={{ top: i * ROW_HEIGHT }}
            >
              {formatTime12(`${h}:00`)}
            </div>
          ))}
        </div>

        {DAYS.map((day) => {
          const dayEntries = entries.filter((e) => e.day === day);
          const lanes = assignLanes(dayEntries);
          return (
            <div key={day} className="relative border-l border-line" style={{ height: HOURS.length * ROW_HEIGHT }}>
              {HOURS.map((h, i) => (
                <div key={h} className="absolute left-0 right-0 border-t border-line/60" style={{ top: i * ROW_HEIGHT }} />
              ))}
              {dayEntries.map((e) => {
                const info = lanes.get(e.id) ?? { lane: 0, lanes: 1 };
                return <EntryBlock key={e.id} entry={e} lane={info.lane} lanes={info.lanes} />;
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ---------- Mobile daily view ----------
export function MobileTimetable({
  entries,
  activeDay,
  onDayChange,
}: {
  entries: TimetableEntry[];
  activeDay: Day;
  onDayChange: (d: Day) => void;
}) {
  const dayEntries = entries.filter((e) => e.day === activeDay).sort((a, b) => toMinutes(a.startTime) - toMinutes(b.startTime));

  return (
    <div className="md:hidden">
      <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-1 mb-4">
        {DAYS.map((day) => (
          <button
            key={day}
            onClick={() => onDayChange(day)}
            className={cn(
              'shrink-0 px-3.5 py-2 rounded-lg text-sm font-medium border transition-colors',
              activeDay === day ? 'bg-teal-500 text-white border-teal-500' : 'bg-surface text-muted border-line'
            )}
          >
            {day.slice(0, 3)}
          </button>
        ))}
      </div>

      {dayEntries.length === 0 ? (
        <EmptyState title="No classes scheduled for this day" message="Enjoy the free time — check another day using the tabs above." />
      ) : (
        <ol className="relative border-l border-line ml-3 space-y-5">
          {dayEntries.map((entry) => {
            const accent = accentFor(entry.department);
            return (
              <li key={entry.id} className="ml-5 relative">
                <span className={cn('absolute -left-[1.65rem] top-1.5 w-2.5 h-2.5 rounded-full', accent.bar)} />
                <p className="text-xs font-medium text-muted mb-1">
                  {formatTime12(entry.startTime)} – {formatTime12(entry.endTime)}
                </p>
                <div className="bg-surface border border-line rounded-xl p-3.5">
                  <div className="flex items-start justify-between gap-2">
                    <p className={cn('text-sm font-semibold', accent.text)}>{entry.courseCode}</p>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <LevelTag level={entry.level} />
                      <span className="text-[9px] font-medium text-muted truncate max-w-[6.5rem]">{entry.department}</span>
                    </div>
                  </div>
                  <p className="text-sm text-ink mt-0.5">{entry.courseTitle}</p>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-xs text-muted">
                    <span className="inline-flex items-center gap-1">
                      <MapPin size={12} /> {entry.venue}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <User size={12} /> {entry.lecturer}
                    </span>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      )}
    </div>
  );
}

export function TimetableRow({ entry }: { entry: TimetableEntry }) {
  const accent = accentFor(entry.department);
  return (
    <div className="flex items-center gap-3 py-2.5">
      <span className={cn('w-1.5 h-10 rounded-full shrink-0', accent.bar)} />
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
          <p className="text-sm font-medium text-ink truncate">
            {entry.courseCode} — {entry.courseTitle}
          </p>
          <LevelTag level={entry.level} />
        </div>
        <p className="text-xs text-muted truncate">{entry.venue}</p>
      </div>
      <span className="text-xs text-muted inline-flex items-center gap-1 shrink-0">
        <Clock size={12} /> {formatTime12(entry.startTime)}
      </span>
    </div>
  );
}
