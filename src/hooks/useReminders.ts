import { useCallback, useEffect, useState } from 'react';
import type { Reminder } from '../types';
import { reminders as seedReminders } from '../data/mockData';

const STORAGE_KEY = 'ochst-reminders-v1';

function loadReminders(): Reminder[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as Reminder[];
  } catch {
    // ignore parse errors, fall back to seed data
  }
  return seedReminders;
}

function persist(reminders: Reminder[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reminders));
  } catch {
    // storage unavailable — fail silently, in-memory state still works
  }
}

export function useReminders() {
  const [reminders, setReminders] = useState<Reminder[]>(() => loadReminders());

  useEffect(() => {
    persist(reminders);
  }, [reminders]);

  const addReminder = useCallback((reminder: Omit<Reminder, 'id' | 'completed'>) => {
    setReminders((prev) => [
      { ...reminder, id: `r-${Date.now()}`, completed: false, isUserCreated: true },
      ...prev,
    ]);
  }, []);

  const updateReminder = useCallback((id: string, updates: Partial<Reminder>) => {
    setReminders((prev) => prev.map((r) => (r.id === id ? { ...r, ...updates } : r)));
  }, []);

  const deleteReminder = useCallback((id: string) => {
    setReminders((prev) => prev.filter((r) => r.id !== id));
  }, []);

  const toggleComplete = useCallback((id: string) => {
    setReminders((prev) => prev.map((r) => (r.id === id ? { ...r, completed: !r.completed } : r)));
  }, []);

  return { reminders, addReminder, updateReminder, deleteReminder, toggleComplete };
}
