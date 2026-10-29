import { useMemo, useState } from 'react';
import { PageHeader, EmptyState } from '../components/common';
import { CalendarGrid, CalendarEventItem } from '../components/calendar';
import { getCalendarActivities } from '../data/mockData';
import { cn, formatDateLong, todayISO } from '../lib/utils';
import type { EventType } from '../types';

const FILTERS: Array<EventType | 'All'> = ['All', 'Class', 'Assignment', 'Exam', 'Reminder', 'Event'];

export default function CalendarPage() {
  const today = new Date();
  const [cursor, setCursor] = useState({ year: today.getFullYear(), month: today.getMonth() });
  const [selectedDate, setSelectedDate] = useState(todayISO());
  const [filter, setFilter] = useState<EventType | 'All'>('All');

  const allActivities = useMemo(() => getCalendarActivities(), []);
  const filteredActivities = useMemo(
    () => (filter === 'All' ? allActivities : allActivities.filter((a) => a.type === filter)),
    [allActivities, filter]
  );

  const selectedActivities = filteredActivities
    .filter((a) => a.date === selectedDate)
    .sort((a, b) => (a.time ?? '').localeCompare(b.time ?? ''));

  const goToday = () => {
    setCursor({ year: today.getFullYear(), month: today.getMonth() });
    setSelectedDate(todayISO());
  };

  const changeMonth = (delta: number) => {
    setCursor((c) => {
      const d = new Date(c.year, c.month + delta, 1);
      return { year: d.getFullYear(), month: d.getMonth() };
    });
  };

  return (
    <div>
      <PageHeader title="Academic Calendar" subtitle="Keep track of classes, assignments, exams and important academic activities." />

      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1 mb-4">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              'shrink-0 px-3.5 py-1.5 rounded-full text-sm font-medium border transition-colors',
              filter === f ? 'bg-teal-500 text-white border-teal-500' : 'bg-surface text-muted border-line hover:text-ink'
            )}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-[1fr_320px] gap-5">
        <CalendarGrid
          year={cursor.year}
          month={cursor.month}
          activities={filteredActivities}
          selectedDate={selectedDate}
          todayIso={todayISO()}
          onSelectDate={(iso) => setSelectedDate(iso)}
          onPrevMonth={() => changeMonth(-1)}
          onNextMonth={() => changeMonth(1)}
          onToday={goToday}
        />

        <div className="bg-surface border border-line rounded-xl p-4 sm:p-5 h-fit">
          <p className="font-serif font-semibold text-ink mb-1">{formatDateLong(selectedDate)}</p>
          <p className="text-xs text-muted mb-2">
            {selectedActivities.length} activit{selectedActivities.length === 1 ? 'y' : 'ies'}
          </p>
          {selectedActivities.length === 0 ? (
            <EmptyState title="Nothing scheduled for this date" />
          ) : (
            <div className="divide-y divide-line">
              {selectedActivities.map((a) => (
                <CalendarEventItem key={a.id} activity={a} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
