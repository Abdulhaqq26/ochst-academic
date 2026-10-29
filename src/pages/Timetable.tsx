import { useMemo, useState } from 'react';
import { Users } from 'lucide-react';
import { PageHeader, Button } from '../components/common';
import { TimetableFilters, TimetableGrid, MobileTimetable, WeekNav, DAYS, type TimetableFilterValues } from '../components/timetable';
import { timetableEntries, studentProfile } from '../data/mockData';
import type { Day } from '../types';
import { getCurrentDayName, addDaysISO, todayISO, formatDateShort } from '../lib/utils';

const departments = Array.from(new Set(timetableEntries.map((e) => e.department)));
const levels = Array.from(new Set(timetableEntries.map((e) => e.level)));
const sessions = Array.from(new Set(timetableEntries.map((e) => e.academicSession)));

const defaultFilters: TimetableFilterValues = {
  department: departments.includes(studentProfile.department) ? studentProfile.department : 'All',
  level: levels.includes(studentProfile.level) ? studentProfile.level : 'All',
  semester: 'All',
  academicSession: sessions[0] ?? '2025/2026',
  day: 'All',
};

export default function Timetable() {
  const [filters, setFilters] = useState<TimetableFilterValues>(defaultFilters);
  const [weekOffset, setWeekOffset] = useState(0);
  const [activeDay, setActiveDay] = useState<Day>(getCurrentDayName() ?? 'Monday');

  const isMyTimetable = filters.department === studentProfile.department && filters.level === studentProfile.level;

  const handleFiltersChange = (next: TimetableFilterValues) => {
    setFilters(next);
    if (next.day !== 'All') setActiveDay(next.day);
  };

  const filtered = useMemo(
    () =>
      timetableEntries.filter(
        (e) =>
          (filters.department === 'All' || e.department === filters.department) &&
          (filters.level === 'All' || e.level === filters.level) &&
          (filters.semester === 'All' || e.semester === filters.semester) &&
          (filters.day === 'All' || e.day === filters.day) &&
          e.academicSession === filters.academicSession
      ),
    [filters]
  );

  const weekLabel = useMemo(() => {
    const base = addDaysISO(todayISO(), weekOffset * 7);
    const day = new Date(base + 'T00:00:00').getDay();
    const monday = addDaysISO(base, day === 0 ? -6 : 1 - day);
    const friday = addDaysISO(monday, 4);
    if (weekOffset === 0) return 'Current Week';
    return `${formatDateShort(monday)} – ${formatDateShort(friday)}`;
  }, [weekOffset]);

  return (
    <div>
      <PageHeader
        title="My Timetable"
        subtitle={
          isMyTimetable
            ? `Showing ${studentProfile.department} • ${studentProfile.level}. Use the filters to browse other programmes.`
            : 'Browsing the full academic timetable. Use the filters to narrow it down.'
        }
        action={
          !isMyTimetable && (
            <Button variant="secondary" size="sm" icon={Users} onClick={() => handleFiltersChange({ ...filters, department: studentProfile.department, level: studentProfile.level })}>
              My Timetable
            </Button>
          )
        }
      />

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <WeekNav
          weekLabel={weekLabel}
          onPrev={() => setWeekOffset((w) => w - 1)}
          onNext={() => setWeekOffset((w) => w + 1)}
          onToday={() => {
            setWeekOffset(0);
            setActiveDay(getCurrentDayName() ?? 'Monday');
          }}
        />
      </div>

      <div className="mb-5">
        <TimetableFilters values={filters} onChange={handleFiltersChange} departments={departments} levels={levels} sessions={sessions} />
      </div>

      <TimetableGrid entries={filtered} />
      <MobileTimetable entries={filtered} activeDay={activeDay} onDayChange={setActiveDay} />

      {filtered.length === 0 && (
        <p className="hidden md:block text-center text-sm text-muted mt-4">
          Adjust your filters above to see classes for {DAYS.join(', ')}.
        </p>
      )}
    </div>
  );
}
