import { useMemo, useState } from 'react';
import { Plus } from 'lucide-react';
import { PageHeader, Button, EmptyState, ConfirmDialog } from '../components/common';
import { ReminderCard, ReminderModal, ReminderFilters, filterReminders, type ReminderFilter } from '../components/reminders';
import { useReminders } from '../hooks/useReminders';
import type { Reminder } from '../types';

export default function Reminders() {
  const { reminders, addReminder, updateReminder, deleteReminder, toggleComplete } = useReminders();
  const [filter, setFilter] = useState<ReminderFilter>('All');
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Reminder | null>(null);
  const [pendingDelete, setPendingDelete] = useState<string | null>(null);

  const visible = useMemo(
    () => filterReminders(reminders, filter).sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time)),
    [reminders, filter]
  );

  const openNew = () => {
    setEditing(null);
    setModalOpen(true);
  };

  const openEdit = (reminder: Reminder) => {
    setEditing(reminder);
    setModalOpen(true);
  };

  const handleSave = (values: Omit<Reminder, 'id' | 'completed'>) => {
    if (editing) {
      updateReminder(editing.id, values);
    } else {
      addReminder(values);
    }
  };

  return (
    <div>
      <PageHeader
        title="My Reminders"
        subtitle="Stay on top of your academic tasks."
        action={
          <Button icon={Plus} onClick={openNew}>
            New Reminder
          </Button>
        }
      />

      <div className="mb-5">
        <ReminderFilters value={filter} onChange={setFilter} />
      </div>

      {visible.length === 0 ? (
        <EmptyState title="You're all caught up." message="No reminders match this filter right now." />
      ) : (
        <div className="space-y-3">
          {visible.map((r) => (
            <ReminderCard key={r.id} reminder={r} onToggle={toggleComplete} onEdit={openEdit} onDelete={(id) => setPendingDelete(id)} />
          ))}
        </div>
      )}

      <ReminderModal open={modalOpen} onClose={() => setModalOpen(false)} onSave={handleSave} initial={editing} />

      <ConfirmDialog
        open={pendingDelete !== null}
        title="Delete reminder"
        message="This reminder will be permanently removed. This action can't be undone."
        onCancel={() => setPendingDelete(null)}
        onConfirm={() => {
          if (pendingDelete) deleteReminder(pendingDelete);
          setPendingDelete(null);
        }}
      />
    </div>
  );
}
