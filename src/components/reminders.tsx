import { useEffect, useState, type ReactNode } from 'react';
import { CheckCircle2, Circle, Pencil, Trash2 } from 'lucide-react';
import type { Priority, Reminder, ReminderType, RepeatOption } from '../types';
import { cn, relativeDayLabel, formatTime12 } from '../lib/utils';
import { Badge, Button, Modal } from './common';

const priorityTone: Record<Priority, 'amber' | 'cobalt' | 'moss'> = {
  High: 'amber',
  Medium: 'cobalt',
  Low: 'moss',
};

export const REMINDER_TYPES: ReminderType[] = ['Personal', 'Assignment', 'Exam', 'Class', 'General'];
export const PRIORITIES: Priority[] = ['High', 'Medium', 'Low'];
export const REPEAT_OPTIONS: RepeatOption[] = ['Does not repeat', 'Daily', 'Weekly', 'Monthly'];

export type ReminderFilter = 'All' | 'Pending' | 'Completed' | 'High Priority' | 'Medium Priority' | 'Low Priority';

export function filterReminders(reminders: Reminder[], filter: ReminderFilter): Reminder[] {
  switch (filter) {
    case 'Pending':
      return reminders.filter((r) => !r.completed);
    case 'Completed':
      return reminders.filter((r) => r.completed);
    case 'High Priority':
      return reminders.filter((r) => r.priority === 'High');
    case 'Medium Priority':
      return reminders.filter((r) => r.priority === 'Medium');
    case 'Low Priority':
      return reminders.filter((r) => r.priority === 'Low');
    default:
      return reminders;
  }
}

export function ReminderFilters({ value, onChange }: { value: ReminderFilter; onChange: (f: ReminderFilter) => void }) {
  const options: ReminderFilter[] = ['All', 'Pending', 'Completed', 'High Priority', 'Medium Priority', 'Low Priority'];
  return (
    <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
      {options.map((opt) => (
        <button
          key={opt}
          onClick={() => onChange(opt)}
          className={cn(
            'shrink-0 px-3.5 py-1.5 rounded-full text-sm font-medium border transition-colors',
            value === opt ? 'bg-teal-500 text-white border-teal-500' : 'bg-surface text-muted border-line hover:text-ink'
          )}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

interface ReminderCardProps {
  reminder: Reminder;
  onToggle: (id: string) => void;
  onEdit: (reminder: Reminder) => void;
  onDelete: (id: string) => void;
}

export function ReminderCard({ reminder, onToggle, onEdit, onDelete }: ReminderCardProps) {
  return (
    <div className={cn('flex items-start gap-3 bg-surface border border-line rounded-xl p-4', reminder.completed && 'opacity-60')}>
      <button
        onClick={() => onToggle(reminder.id)}
        aria-label={reminder.completed ? 'Mark as pending' : 'Mark as completed'}
        className="mt-0.5 text-teal-500 shrink-0"
      >
        {reminder.completed ? <CheckCircle2 size={20} /> : <Circle size={20} className="text-muted" />}
      </button>
      <div className="min-w-0 flex-1">
        <p className={cn('text-sm font-medium text-ink', reminder.completed && 'line-through')}>{reminder.title}</p>
        {reminder.description && <p className="text-xs text-muted mt-0.5 truncate">{reminder.description}</p>}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 mt-2">
          <Badge tone="neutral">{reminder.type}</Badge>
          <Badge tone={priorityTone[reminder.priority]}>{reminder.priority} Priority</Badge>
          <span className="text-xs text-muted">
            {relativeDayLabel(reminder.date)} • {formatTime12(reminder.time)}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-1 shrink-0">
        <button onClick={() => onEdit(reminder)} aria-label="Edit reminder" className="p-1.5 rounded-lg text-muted hover:text-ink hover:bg-paper transition-colors">
          <Pencil size={15} />
        </button>
        <button onClick={() => onDelete(reminder.id)} aria-label="Delete reminder" className="p-1.5 rounded-lg text-muted hover:text-amber-600 hover:bg-amber-50 transition-colors">
          <Trash2 size={15} />
        </button>
      </div>
    </div>
  );
}

interface ReminderModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (values: Omit<Reminder, 'id' | 'completed'>) => void;
  initial?: Reminder | null;
}

const emptyForm = {
  title: '',
  description: '',
  date: '',
  time: '12:00',
  priority: 'Medium' as Priority,
  type: 'Personal' as ReminderType,
  repeat: 'Does not repeat' as RepeatOption,
};

export function ReminderModal({ open, onClose, onSave, initial }: ReminderModalProps) {
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (open) {
      setForm(
        initial
          ? {
              title: initial.title,
              description: initial.description ?? '',
              date: initial.date,
              time: initial.time,
              priority: initial.priority,
              type: initial.type,
              repeat: initial.repeat,
            }
          : { ...emptyForm, date: new Date().toISOString().slice(0, 10) }
      );
    }
  }, [open, initial]);

  const canSave = form.title.trim().length > 0 && form.date.length > 0;

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={initial ? 'Edit Reminder' : 'New Reminder'}
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button
            disabled={!canSave}
            onClick={() => {
              if (!canSave) return;
              onSave(form);
              onClose();
            }}
          >
            Save Reminder
          </Button>
        </>
      }
    >
      <div className="space-y-4">
        <Field label="Title">
          <input
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="e.g. Submit CSC 201 Assignment"
            className="w-full bg-paper border border-line rounded-lg px-3 py-2.5 text-sm text-ink outline-none focus:border-teal-500"
          />
        </Field>
        <Field label="Description">
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            rows={2}
            placeholder="Optional details"
            className="w-full bg-paper border border-line rounded-lg px-3 py-2.5 text-sm text-ink outline-none focus:border-teal-500 resize-none"
          />
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Date">
            <input
              type="date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              className="w-full bg-paper border border-line rounded-lg px-3 py-2.5 text-sm text-ink outline-none focus:border-teal-500"
            />
          </Field>
          <Field label="Time">
            <input
              type="time"
              value={form.time}
              onChange={(e) => setForm({ ...form, time: e.target.value })}
              className="w-full bg-paper border border-line rounded-lg px-3 py-2.5 text-sm text-ink outline-none focus:border-teal-500"
            />
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Priority">
            <select
              value={form.priority}
              onChange={(e) => setForm({ ...form, priority: e.target.value as Priority })}
              className="w-full bg-paper border border-line rounded-lg px-3 py-2.5 text-sm text-ink outline-none focus:border-teal-500"
            >
              {PRIORITIES.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Reminder Type">
            <select
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value as ReminderType })}
              className="w-full bg-paper border border-line rounded-lg px-3 py-2.5 text-sm text-ink outline-none focus:border-teal-500"
            >
              {REMINDER_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </Field>
        </div>
        <Field label="Repeat">
          <select
            value={form.repeat}
            onChange={(e) => setForm({ ...form, repeat: e.target.value as RepeatOption })}
            className="w-full bg-paper border border-line rounded-lg px-3 py-2.5 text-sm text-ink outline-none focus:border-teal-500"
          >
            {REPEAT_OPTIONS.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </Field>
      </div>
    </Modal>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="block text-xs font-medium text-muted mb-1.5">{label}</span>
      {children}
    </label>
  );
}
