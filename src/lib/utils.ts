import type { Day } from '../types';

export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ');
}

export function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

export function addDaysISO(iso: string, days: number): string {
  const d = new Date(iso + 'T00:00:00');
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

export function formatDateLong(iso: string): string {
  const d = new Date(iso + 'T00:00:00');
  return d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
}

export function formatDateShort(iso: string): string {
  const d = new Date(iso + 'T00:00:00');
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export function relativeDayLabel(iso: string): string {
  const today = todayISO();
  const tomorrow = addDaysISO(today, 1);
  if (iso === today) return 'Today';
  if (iso === tomorrow) return 'Tomorrow';
  const d = new Date(iso + 'T00:00:00');
  const t = new Date(today + 'T00:00:00');
  const diff = Math.round((d.getTime() - t.getTime()) / 86400000);
  if (diff > 1 && diff < 7) {
    return d.toLocaleDateString('en-US', { weekday: 'long' });
  }
  return formatDateShort(iso);
}

export function formatTime12(time: string): string {
  const [hStr, mStr] = time.split(':');
  let h = parseInt(hStr, 10);
  const m = mStr ?? '00';
  const suffix = h >= 12 ? 'PM' : 'AM';
  h = h % 12;
  if (h === 0) h = 12;
  return `${h}:${m} ${suffix}`;
}

export function getCurrentDayName(): Day | null {
  const days: Day[] = ['Sunday' as Day, 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' as Day];
  const name = days[new Date().getDay()];
  const valid: Day[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  return (valid as string[]).includes(name) ? (name as Day) : null;
}

export function dayNameForISO(iso: string): Day | null {
  const names: Day[] = ['Sunday' as Day, 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' as Day];
  const name = names[new Date(iso + 'T00:00:00').getDay()];
  const valid: Day[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  return (valid as string[]).includes(name) ? (name as Day) : null;
}

export function timeToMinutes(time: string): number {
  const [h, m] = time.split(':').map(Number);
  return h * 60 + m;
}

export function minutesUntil(date: string, time: string): number {
  const target = new Date(`${date}T${time}:00`);
  const now = new Date();
  return Math.round((target.getTime() - now.getTime()) / 60000);
}

export function classStatus(date: string, startTime: string, endTime: string): 'completed' | 'current' | 'upcoming' {
  const now = new Date();
  const start = new Date(`${date}T${startTime}:00`);
  const end = new Date(`${date}T${endTime}:00`);
  if (now > end) return 'completed';
  if (now >= start && now <= end) return 'current';
  return 'upcoming';
}

export function initials(name: string): string {
  return name
    .split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}
