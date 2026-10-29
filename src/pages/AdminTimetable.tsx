import { useMemo, useState, type FormEvent, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Eye, Pencil, Trash2, MapPin, User, Clock, SlidersHorizontal } from 'lucide-react';
import { PageHeader, Button, SearchBar, Modal, ConfirmDialog, EmptyState } from '../components/common';
import { LevelTag } from '../components/timetable';
import { useTimetableEntries } from '../hooks/useTimetableEntries';
import type { Day, Department, Level, Semester, TimetableEntry } from '../types';
import { cn, formatTime12 } from '../lib/utils';

const departments: Department[] = [
  'Computer Science',
  'Statistics',
  'Public Health',
  'Community Health',
  'Environmental Health',
  'Anatomy',
  'Physiology',
  'Biochemistry',
  'Health Information Management',
  'Dental Therapy',
  'Dental Technology',
  'Medical Laboratory Technology',
  'Pharmacy Technician',
  'Nutrition and Dietetics',
  'General Studies',
];
const levels: Level[] = ['ND I', 'ND II', 'HND I', 'HND II'];
const days: Day[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const semesters: Semester[] = ['First Semester', 'Second Semester'];

interface FilterState {
  department: Department | 'All';
  level: Level | 'All';
  day: Day | 'All';
  semester: Semester | 'All';
  academicSession: string;
}

const defaultFilters: FilterState = {
  department: 'All',
  level: 'All',
  day: 'All',
  semester: 'All',
  academicSession: 'All',
};

type EntryFormState = Omit<TimetableEntry, 'id'>;

function toFormState(entry: TimetableEntry): EntryFormState {
  const { id, ...rest } = entry;
  return rest;
}

export default function AdminTimetable() {
  const navigate = useNavigate();
  const { entries, updateTimetableEntry, deleteTimetableEntry } = useTimetableEntries();

  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState<FilterState>(defaultFilters);

  const [viewing, setViewing] = useState<TimetableEntry | null>(null);
  const [editing, setEditing] = useState<TimetableEntry | null>(null);
  const [editForm, setEditForm] = useState<EntryFormState | null>(null);
  const [deleting, setDeleting] = useState<TimetableEntry | null>(null);

  const sessions = useMemo(() => Array.from(new Set(entries.map((e) => e.academicSession))).sort(), [entries]);

  const hasActiveFilters =
    search.trim() !== '' ||
    filters.department !== 'All' ||
    filters.level !== 'All' ||
    filters.day !== 'All' ||
    filters.semester !== 'All' ||
    filters.academicSession !== 'All';

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return entries.filter((e) => {
      const matchesSearch =
        q === '' ||
        e.courseCode.toLowerCase().includes(q) ||
        e.courseTitle.toLowerCase().includes(q) ||
        e.department.toLowerCase().includes(q) ||
        e.lecturer.toLowerCase().includes(q) ||
        e.venue.toLowerCase().includes(q);

      return (
        matchesSearch &&
        (filters.department === 'All' || e.department === filters.department) &&
        (filters.level === 'All' || e.level === filters.level) &&
        (filters.day === 'All' || e.day === filters.day) &&
        (filters.semester === 'All' || e.semester === filters.semester) &&
        (filters.academicSession === 'All' || e.academicSession === filters.academicSession)
      );
    });
  }, [entries, search, filters]);

  const clearFilters = () => {
    setSearch('');
    setFilters(defaultFilters);
  };

  const openEdit = (entry: TimetableEntry) => {
    setEditing(entry);
    setEditForm(toFormState(entry));
  };

  const closeEdit = () => {
    setEditing(null);
    setEditForm(null);
  };

  const saveEdit = () => {
    if (!editing || !editForm) return;
    updateTimetableEntry(editing.id, editForm);
    closeEdit();
  };

  const handleEditSubmit = (e: FormEvent) => {
    e.preventDefault();
    saveEdit();
  };

  const confirmDelete = () => {
    if (!deleting) return;
    deleteTimetableEntry(deleting.id);
    setDeleting(null);
  };

  return (
    <div>
      <PageHeader
        title="Timetable Management"
        subtitle="Create, review and manage academic timetable entries."
        action={
          <Button icon={Plus} onClick={() => navigate('/admin/upload')}>
            Add Timetable Entry
          </Button>
        }
      />

      <div className="mb-4">
        <SearchBar value={search} onChange={setSearch} placeholder="Search by course, department, lecturer or venue…" />
      </div>

      <div className="bg-surface border border-line rounded-xl p-4 mb-4">
        <div className="flex items-center gap-1.5 text-xs font-medium text-muted mb-3">
          <SlidersHorizontal size={13} />
          Filters
        </div>
        <div className="flex flex-wrap gap-3">
          <FilterSelect
            label="Department"
            value={filters.department}
            options={['All', ...departments]}
            onChange={(v) => setFilters({ ...filters, department: v as Department | 'All' })}
          />
          <FilterSelect
            label="Level"
            value={filters.level}
            options={['All', ...levels]}
            onChange={(v) => setFilters({ ...filters, level: v as Level | 'All' })}
          />
          <FilterSelect
            label="Day"
            value={filters.day}
            options={['All', ...days]}
            onChange={(v) => setFilters({ ...filters, day: v as Day | 'All' })}
          />
          <FilterSelect
            label="Semester"
            value={filters.semester}
            options={['All', ...semesters]}
            onChange={(v) => setFilters({ ...filters, semester: v as Semester | 'All' })}
          />
          <FilterSelect
            label="Academic Session"
            value={filters.academicSession}
            options={['All', ...sessions]}
            onChange={(v) => setFilters({ ...filters, academicSession: v })}
          />
        </div>
      </div>

      <p className="text-sm text-muted mb-4">
        <span className="font-medium text-ink">{filtered.length}</span> {filtered.length === 1 ? 'entry' : 'entries'} found
      </p>

      {filtered.length === 0 ? (
        <EmptyState
          title="No timetable entries found"
          message="Try adjusting your search or filters."
          action={
            hasActiveFilters && (
              <Button variant="secondary" size="sm" onClick={clearFilters}>
                Clear Filters
              </Button>
            )
          }
        />
      ) : (
        <>
          {/* Desktop management table */}
          <div className="hidden md:block bg-surface border border-line rounded-xl overflow-x-auto">
            <table className="w-full text-sm min-w-[880px]">
              <thead>
                <tr className="border-b border-line text-left text-xs text-muted">
                  <th className="px-4 py-3 font-medium">Course</th>
                  <th className="px-4 py-3 font-medium">Department</th>
                  <th className="px-4 py-3 font-medium">Level</th>
                  <th className="px-4 py-3 font-medium">Day</th>
                  <th className="px-4 py-3 font-medium">Time</th>
                  <th className="px-4 py-3 font-medium">Venue</th>
                  <th className="px-4 py-3 font-medium">Lecturer</th>
                  <th className="px-4 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((e) => (
                  <tr key={e.id} className="border-b border-line last:border-0">
                    <td className="px-4 py-3">
                      <p className="font-medium text-ink">{e.courseCode}</p>
                      <p className="text-xs text-muted">{e.courseTitle}</p>
                    </td>
                    <td className="px-4 py-3 text-muted">{e.department}</td>
                    <td className="px-4 py-3">
                      <LevelTag level={e.level} />
                    </td>
                    <td className="px-4 py-3 text-muted">{e.day}</td>
                    <td className="px-4 py-3 text-muted whitespace-nowrap">
                      {formatTime12(e.startTime)} – {formatTime12(e.endTime)}
                    </td>
                    <td className="px-4 py-3 text-muted">{e.venue}</td>
                    <td className="px-4 py-3 text-muted">{e.lecturer}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <RowAction label="View" icon={Eye} onClick={() => setViewing(e)} />
                        <RowAction label="Edit" icon={Pencil} onClick={() => openEdit(e)} />
                        <RowAction label="Delete" icon={Trash2} tone="danger" onClick={() => setDeleting(e)} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden space-y-3">
            {filtered.map((e) => (
              <div key={e.id} className="bg-surface border border-line rounded-xl p-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-ink truncate">{e.courseCode}</p>
                    <p className="text-xs text-muted truncate">{e.courseTitle}</p>
                  </div>
                  <LevelTag level={e.level} />
                </div>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-3 text-xs text-muted">
                  <span className="inline-flex items-center gap-1">
                    <Clock size={12} /> {e.day}, {formatTime12(e.startTime)} – {formatTime12(e.endTime)}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <MapPin size={12} /> {e.venue}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <User size={12} /> {e.lecturer}
                  </span>
                </div>
                <p className="text-[11px] text-muted mt-1.5">{e.department}</p>
                <div className="flex items-center gap-2 mt-3 pt-3 border-t border-line">
                  <Button variant="secondary" size="sm" icon={Eye} onClick={() => setViewing(e)} className="flex-1">
                    View
                  </Button>
                  <Button variant="secondary" size="sm" icon={Pencil} onClick={() => openEdit(e)} className="flex-1">
                    Edit
                  </Button>
                  <Button variant="danger" size="sm" icon={Trash2} onClick={() => setDeleting(e)} className="flex-1">
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* View modal */}
      <Modal open={viewing !== null} onClose={() => setViewing(null)} title="Timetable Entry">
        {viewing && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-serif text-lg font-semibold text-ink">{viewing.courseCode}</p>
                <p className="text-sm text-muted">{viewing.courseTitle}</p>
              </div>
              <LevelTag level={viewing.level} />
            </div>
            <dl className="grid grid-cols-2 gap-3 text-sm pt-2">
              <DetailRow label="Department" value={viewing.department} />
              <DetailRow label="Semester" value={viewing.semester} />
              <DetailRow label="Day" value={viewing.day} />
              <DetailRow label="Time" value={`${formatTime12(viewing.startTime)} – ${formatTime12(viewing.endTime)}`} />
              <DetailRow label="Venue" value={viewing.venue} />
              <DetailRow label="Lecturer" value={viewing.lecturer} />
              <DetailRow label="Academic Session" value={viewing.academicSession} />
            </dl>
          </div>
        )}
      </Modal>

      {/* Edit modal */}
      <Modal
        open={editing !== null}
        onClose={closeEdit}
        title="Edit Timetable Entry"
        footer={
          <>
            <Button variant="secondary" onClick={closeEdit}>
              Cancel
            </Button>
            <Button onClick={saveEdit}>Save Changes</Button>
          </>
        }
      >
        {editForm && (
          <form onSubmit={handleEditSubmit} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <EditField label="Course Code">
                <input
                  required
                  value={editForm.courseCode}
                  onChange={(e) => setEditForm({ ...editForm, courseCode: e.target.value })}
                  className="w-full bg-paper border border-line rounded-lg px-3 py-2.5 text-sm text-ink outline-none focus:border-teal-500"
                />
              </EditField>
              <EditField label="Course Title">
                <input
                  required
                  value={editForm.courseTitle}
                  onChange={(e) => setEditForm({ ...editForm, courseTitle: e.target.value })}
                  className="w-full bg-paper border border-line rounded-lg px-3 py-2.5 text-sm text-ink outline-none focus:border-teal-500"
                />
              </EditField>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <EditField label="Department">
                <select
                  value={editForm.department}
                  onChange={(e) => setEditForm({ ...editForm, department: e.target.value as Department })}
                  className="w-full bg-paper border border-line rounded-lg px-3 py-2.5 text-sm text-ink outline-none focus:border-teal-500"
                >
                  {departments.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </EditField>
              <EditField label="Level">
                <select
                  value={editForm.level}
                  onChange={(e) => setEditForm({ ...editForm, level: e.target.value as Level })}
                  className="w-full bg-paper border border-line rounded-lg px-3 py-2.5 text-sm text-ink outline-none focus:border-teal-500"
                >
                  {levels.map((l) => (
                    <option key={l} value={l}>
                      {l}
                    </option>
                  ))}
                </select>
              </EditField>
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              <EditField label="Day">
                <select
                  value={editForm.day}
                  onChange={(e) => setEditForm({ ...editForm, day: e.target.value as Day })}
                  className="w-full bg-paper border border-line rounded-lg px-3 py-2.5 text-sm text-ink outline-none focus:border-teal-500"
                >
                  {days.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </EditField>
              <EditField label="Start Time">
                <input
                  type="time"
                  required
                  value={editForm.startTime}
                  onChange={(e) => setEditForm({ ...editForm, startTime: e.target.value })}
                  className="w-full bg-paper border border-line rounded-lg px-3 py-2.5 text-sm text-ink outline-none focus:border-teal-500"
                />
              </EditField>
              <EditField label="End Time">
                <input
                  type="time"
                  required
                  value={editForm.endTime}
                  onChange={(e) => setEditForm({ ...editForm, endTime: e.target.value })}
                  className="w-full bg-paper border border-line rounded-lg px-3 py-2.5 text-sm text-ink outline-none focus:border-teal-500"
                />
              </EditField>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <EditField label="Venue">
                <input
                  required
                  value={editForm.venue}
                  onChange={(e) => setEditForm({ ...editForm, venue: e.target.value })}
                  className="w-full bg-paper border border-line rounded-lg px-3 py-2.5 text-sm text-ink outline-none focus:border-teal-500"
                />
              </EditField>
              <EditField label="Lecturer">
                <input
                  required
                  value={editForm.lecturer}
                  onChange={(e) => setEditForm({ ...editForm, lecturer: e.target.value })}
                  className="w-full bg-paper border border-line rounded-lg px-3 py-2.5 text-sm text-ink outline-none focus:border-teal-500"
                />
              </EditField>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <EditField label="Semester">
                <select
                  value={editForm.semester}
                  onChange={(e) => setEditForm({ ...editForm, semester: e.target.value as Semester })}
                  className="w-full bg-paper border border-line rounded-lg px-3 py-2.5 text-sm text-ink outline-none focus:border-teal-500"
                >
                  {semesters.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </EditField>
              <EditField label="Academic Session">
                <input
                  required
                  value={editForm.academicSession}
                  onChange={(e) => setEditForm({ ...editForm, academicSession: e.target.value })}
                  className="w-full bg-paper border border-line rounded-lg px-3 py-2.5 text-sm text-ink outline-none focus:border-teal-500"
                />
              </EditField>
            </div>
          </form>
        )}
      </Modal>

      {/* Delete confirmation */}
      <ConfirmDialog
        open={deleting !== null}
        title="Delete Timetable Entry"
        message={
          deleting
            ? `Are you sure you want to delete ${deleting.courseCode} — ${deleting.courseTitle}? This action cannot be undone.`
            : ''
        }
        confirmLabel="Delete"
        onConfirm={confirmDelete}
        onCancel={() => setDeleting(null)}
      />
    </div>
  );
}

// ---------- Small local helpers ----------
function FilterSelect({
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

function RowAction({
  label,
  icon: Icon,
  onClick,
  tone = 'default',
}: {
  label: string;
  icon: typeof Eye;
  onClick: () => void;
  tone?: 'default' | 'danger';
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className={cn(
        'p-1.5 rounded-lg transition-colors',
        tone === 'danger' ? 'text-muted hover:text-amber-600 hover:bg-amber-50' : 'text-muted hover:text-teal-600 hover:bg-teal-50 dark:hover:bg-teal-600/10'
      )}
    >
      <Icon size={15} />
    </button>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[11px] text-muted">{label}</dt>
      <dd className="text-sm text-ink font-medium mt-0.5">{value}</dd>
    </div>
  );
}

function EditField({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="block text-xs font-medium text-muted mb-1.5">{label}</span>
      {children}
    </label>
  );
}
