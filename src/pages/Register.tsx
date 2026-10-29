import { useState, type FormEvent, type ReactNode } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GraduationCap } from 'lucide-react';
import { Button } from '../components/common';
import type { Department, Level } from '../types';

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
];
const levels: Level[] = ['ND I', 'ND II', 'HND I', 'HND II'];

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: '',
    matricNumber: '',
    department: departments[0],
    level: levels[0],
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-paper flex items-center justify-center px-5 py-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center mb-8">
          <div className="w-11 h-11 rounded-xl bg-teal-500 flex items-center justify-center mb-3">
            <GraduationCap size={22} className="text-white" strokeWidth={2.2} />
          </div>
          <p className="font-serif text-xl font-semibold text-ink">Create your account</p>
          <p className="text-xs text-muted mt-1">Join OCHST Academic Hub</p>
        </div>

        <div className="bg-surface border border-line rounded-2xl shadow-card p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Field label="Full Name">
              <input
                required
                value={form.fullName}
                onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                placeholder="Ade Ogundimu"
                className="w-full bg-paper border border-line rounded-lg px-3 py-2.5 text-sm text-ink outline-none focus:border-teal-500"
              />
            </Field>
            <Field label="Email">
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="ade@example.com"
                className="w-full bg-paper border border-line rounded-lg px-3 py-2.5 text-sm text-ink outline-none focus:border-teal-500"
              />
            </Field>
            <Field label="Password">
              <input
                type="password"
                required
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="••••••••"
                className="w-full bg-paper border border-line rounded-lg px-3 py-2.5 text-sm text-ink outline-none focus:border-teal-500"
              />
            </Field>
            <Field label="Matric Number">
              <input
                required
                value={form.matricNumber}
                onChange={(e) => setForm({ ...form, matricNumber: e.target.value })}
                placeholder="OCHST/CSC/24/001"
                className="w-full bg-paper border border-line rounded-lg px-3 py-2.5 text-sm text-ink outline-none focus:border-teal-500"
              />
            </Field>
            <div className="grid grid-cols-2 gap-3">
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

            <Button type="submit" className="w-full">
              Create Account
            </Button>
          </form>
        </div>

        <p className="text-center text-sm text-muted mt-5">
          Already have an account?{' '}
          <Link to="/login" className="text-teal-600 font-medium hover:underline">
            Log In
          </Link>
        </p>
      </div>
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
