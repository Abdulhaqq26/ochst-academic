import { ChevronLeft, ChevronRight, BookOpen, FileText, GraduationCap, Bell, PartyPopper, type LucideIcon } from 'lucide-react';
import type { CalendarActivity, EventType } from '../types';
import { cn, formatTime12 } from '../lib/utils';

const typeMeta: Record<EventType, { icon: LucideIcon; dot: string; text: string; bgLight: string }> = {
  Class: { icon: BookOpen, dot: 'bg-teal-500', text: 'text-teal-600', bgLight: 'bg-teal-50 dark:bg-teal-600/15' },
  Assignment: { icon: FileText, dot: 'bg-amber-500', text: 'text-amber-600', bgLight: 'bg-amber-50 dark:bg-amber-500/15' },
  Exam: { icon: GraduationCap, dot: 'bg-cobalt-500', text: 'text-cobalt-600', bgLight: 'bg-cobalt-50 dark:bg-cobalt-500/15' },
  Reminder: { icon: Bell, dot: 'bg-moss-500', text: 'text-moss-600', bgLight: 'bg-moss-50 dark:bg-moss-500/15' },
  Event: { icon: PartyPopper, dot: 'bg-ink', text: 'text-ink', bgLight: 'bg-line/50' },
};

const WEEKDAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function pad(n: number) {
  return n.toString().padStart(2, '0');
}

export function toISO(year: number, month: number, day: number): string {
  return `${year}-${pad(month + 1)}-${pad(day)}`;
}

interface CalendarGridProps {
  year: number;
  month: number; // 0-indexed
  activities: CalendarActivity[];
  selectedDate: string;
  todayIso: string;
  onSelectDate: (iso: string) => void;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onToday: () => void;
}

export function CalendarGrid({
  year,
  month,
  activities,
  selectedDate,
  todayIso,
  onSelectDate,
  onPrevMonth,
  onNextMonth,
  onToday,
}: CalendarGridProps) {
  const firstOfMonth = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startOffset = firstOfMonth.getDay();
  const monthLabel = firstOfMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  const activityDates = new Set(activities.map((a) => a.date));

  const cells: Array<{ day: number; iso: string } | null> = [];
  for (let i = 0; i < startOffset; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push({ day: d, iso: toISO(year, month, d) });

  return (
    <div className="bg-surface border border-line rounded-xl p-4 sm:p-5">
      <div className="flex items-center justify-between mb-4">
        <p className="font-serif text-lg font-semibold text-ink">{monthLabel}</p>
        <div className="flex items-center gap-1.5">
          <button onClick={onPrevMonth} aria-label="Previous month" className="p-2 rounded-lg border border-line text-muted hover:text-ink hover:bg-paper transition-colors">
            <ChevronLeft size={16} />
          </button>
          <button onClick={onToday} className="text-sm font-medium px-3 py-2 rounded-lg border border-line text-ink hover:bg-paper transition-colors">
            Today
          </button>
          <button onClick={onNextMonth} aria-label="Next month" className="p-2 rounded-lg border border-line text-muted hover:text-ink hover:bg-paper transition-colors">
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-1">
        {WEEKDAY_LABELS.map((w) => (
          <div key={w} className="text-center text-[11px] font-medium text-muted py-1.5">
            {w}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {cells.map((cell, i) =>
          cell === null ? (
            <div key={`empty-${i}`} />
          ) : (
            <button
              key={cell.iso}
              onClick={() => onSelectDate(cell.iso)}
              className={cn(
                'relative aspect-square rounded-lg text-sm flex flex-col items-center justify-center gap-1 transition-colors',
                cell.iso === selectedDate
                  ? 'bg-teal-500 text-white font-semibold'
                  : cell.iso === todayIso
                  ? 'bg-teal-50 dark:bg-teal-600/15 text-teal-600 font-semibold'
                  : 'text-ink hover:bg-paper'
              )}
            >
              {cell.day}
              {activityDates.has(cell.iso) && (
                <span className={cn('w-1.5 h-1.5 rounded-full', cell.iso === selectedDate ? 'bg-white' : 'bg-teal-500')} />
              )}
            </button>
          )
        )}
      </div>
    </div>
  );
}

export function CalendarEventItem({ activity }: { activity: CalendarActivity }) {
  const meta = typeMeta[activity.type];
  const Icon = meta.icon;
  return (
    <div className="flex items-start gap-3 py-3">
      <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center shrink-0', meta.bgLight)}>
        <Icon size={16} className={meta.text} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-ink">{activity.title}</p>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 mt-0.5 text-xs text-muted">
          <span className={meta.text}>{activity.type}</span>
          {activity.time && <span>{formatTime12(activity.time)}</span>}
          {activity.venue && <span>{activity.venue}</span>}
        </div>
      </div>
    </div>
  );
}
