import { useCallback, useEffect, useState } from 'react';
import type { TimetableEntry } from '../types';
import { timetableEntries as seedTimetableEntries } from '../data/mockData';

const STORAGE_KEY = 'ochst-timetable-entries-v1';

function loadTimetableEntries(): TimetableEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as TimetableEntry[];
  } catch {
    // ignore parse errors, fall back to seed data
  }
  return seedTimetableEntries;
}

function persist(entries: TimetableEntry[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  } catch {
    // storage unavailable — fail silently, in-memory state still works
  }
}

export function useTimetableEntries() {
  const [entries, setEntries] = useState<TimetableEntry[]>(() => loadTimetableEntries());

  useEffect(() => {
    persist(entries);
  }, [entries]);

  const addTimetableEntry = useCallback((entry: Omit<TimetableEntry, 'id'>) => {
    setEntries((prev) => [...prev, { ...entry, id: `tt-${Date.now()}` }]);
  }, []);

  const updateTimetableEntry = useCallback((id: string, updates: Partial<TimetableEntry>) => {
    setEntries((prev) => prev.map((e) => (e.id === id ? { ...e, ...updates } : e)));
  }, []);

  const deleteTimetableEntry = useCallback((id: string) => {
    setEntries((prev) => prev.filter((e) => e.id !== id));
  }, []);

  return { entries, addTimetableEntry, updateTimetableEntry, deleteTimetableEntry };
}
