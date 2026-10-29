import { useState, type FormEvent, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import { PageHeader, Button } from '../components/common';
import { useTimetableEntries } from '../hooks/useTimetableEntries';
import type { Day, Department, Level, Semester } from '../types';

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

const initialForm = {
  courseCode: '',
  courseTitle: '',
  department: departments[0],
  level: levels[0],
  day: days[0],
  startTime: '08:00',
  endTime: '10:00',
  venue: '',
  lecturer: '',
  semester: semesters[0],
  academicSession: '2025/2026',
};

export default function AdminUpload() {
  const navigate = useNavigate();
  const { addTimetableEntry } = useTimetableEntries();
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    addTimetableEntry(form);
    setSubmitted(true);
    setForm(initialForm);
    setTimeout(() => navigate('/admin'), 1200);
  };

  return (
    <div>
      <PageHeader title="Add Timetable Entry" subtitle="Create a new academic schedule entry." />

      {submitted && (
        <div className="flex items-center gap-2.5 bg-moss-50 dark:bg-moss-500/10 text-moss-600 rounded-xl px-4 py-3 mb-5">
          <CheckCircle2 size={18} />
          <p className="text-sm font-medium">Timetable entry added successfully.</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-surface border border-line rounded-xl p-5 sm:p-6 max-w-2xl space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Course Code">
            <input
              required
              value={form.courseCode}
              onChange={(e) => setForm({ ...form, courseCode: e.target.value })}
              placeholder="CSC 201"
              className="w-full bg-paper border border-line rounded-lg px-3 py-2.5 text-sm text-ink outline-none focus:border-teal-500"
            />
          </Field>
          <Field label="Course Title">
            <input
              required
              value={form.courseTitle}
              onChange={(e) => setForm({ ...form, courseTitle: e.target.value })}
              placeholder="Introduction to Programming"
              className="w-full bg-paper border border-line rounded-lg px-3 py-2.5 text-sm text-ink outline-none focus:border-teal-500"
            />
          </Field>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Department">
            <select
              value={form.department}
              onChange={(e) => setForm({ ...form, department: e.target.value as Department })}
              className="w-full bg-paper border border-line rounded-lg px-3 py-2.5 text-sm text-ink outline-none focus:border-teal-500"
            >
              {departments.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Level">
            <select
              value={form.level}
              onChange={(e) => setForm({ ...form, level: e.target.value as Level })}
              className="w-full bg-paper border border-line rounded-lg px-3 py-2.5 text-sm text-ink outline-none focus:border-teal-500"
            >
              {levels.map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </select>
          </Field>
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          <Field label="Day">
            <select
              value={form.day}
              onChange={(e) => setForm({ ...form, day: e.target.value as Day })}
              className="w-full bg-paper border border-line rounded-lg px-3 py-2.5 text-sm text-ink outline-none focus:border-teal-500"
            >
              {days.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Start Time">
            <input
              type="time"
              required
              value={form.startTime}
              onChange={(e) => setForm({ ...form, startTime: e.target.value })}
              className="w-full bg-paper border border-line rounded-lg px-3 py-2.5 text-sm text-ink outline-none focus:border-teal-500"
            />
          </Field>
          <Field label="End Time">
            <input
              type="time"
              required
              value={form.endTime}
              onChange={(e) => setForm({ ...form, endTime: e.target.value })}
              className="w-full bg-paper border border-line rounded-lg px-3 py-2.5 text-sm text-ink outline-none focus:border-teal-500"
            />
          </Field>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Venue">
            <input
              required
              value={form.venue}
              onChange={(e) => setForm({ ...form, venue: e.target.value })}
              placeholder="Computer Laboratory 2"
              className="w-full bg-paper border border-line rounded-lg px-3 py-2.5 text-sm text-ink outline-none focus:border-teal-500"
            />
          </Field>
          <Field label="Lecturer">
            <input
              required
              value={form.lecturer}
              onChange={(e) => setForm({ ...form, lecturer: e.target.value })}
              placeholder="Mr. Ibrahim"
              className="w-full bg-paper border border-line rounded-lg px-3 py-2.5 text-sm text-ink outline-none focus:border-teal-500"
            />
          </Field>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Semester">
            <select
              value={form.semester}
              onChange={(e) => setForm({ ...form, semester: e.target.value as Semester })}
              className="w-full bg-paper border border-line rounded-lg px-3 py-2.5 text-sm text-ink outline-none focus:border-teal-500"
            >
              {semesters.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Academic Session">
            <input
              required
              value={form.academicSession}
              onChange={(e) => setForm({ ...form, academicSession: e.target.value })}
              placeholder="2025/2026"
              className="w-full bg-paper border border-line rounded-lg px-3 py-2.5 text-sm text-ink outline-none focus:border-teal-500"
            />
          </Field>
        </div>

        <Button type="submit" className="w-full sm:w-auto">
          Add to Timetable
        </Button>
      </form>
    </div>
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
