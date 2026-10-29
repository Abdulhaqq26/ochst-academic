import { useNavigate } from 'react-router-dom';
import {
  GraduationCap,
  Table2,
  BellRing,
  CalendarDays,
  Megaphone,
  ArrowRight,
  Clock,
  MapPin,
} from 'lucide-react';
import { Button, Badge } from '../components/common';

const features = [
  {
    icon: Table2,
    title: 'Smart Timetable',
    body: 'View your weekly academic schedule clearly and conveniently, on desktop or on the go.',
  },
  {
    icon: BellRing,
    title: 'Academic Reminders',
    body: 'Keep track of assignments, examinations, classes and personal academic tasks.',
  },
  {
    icon: CalendarDays,
    title: 'Academic Calendar',
    body: 'See important academic activities and events at a glance, all in one calendar.',
  },
  {
    icon: Megaphone,
    title: 'Stay Updated',
    body: 'Receive and view important institutional and departmental announcements.',
  },
];

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-paper">
      <header className="sticky top-0 z-20 bg-paper/90 backdrop-blur border-b border-line">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-teal-500 flex items-center justify-center">
              <GraduationCap size={19} className="text-white" strokeWidth={2.2} />
            </div>
            <div className="leading-tight">
              <p className="font-serif font-semibold text-[15px] text-ink">OCHST Academic Hub</p>
              <p className="text-[11px] text-muted -mt-0.5">Oyo State College of Health Science &amp; Technology</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => navigate('/login')}>
              Log In
            </Button>
            <Button size="sm" onClick={() => navigate('/register')}>
              Get Started
            </Button>
          </div>
        </div>
      </header>

      <section className="max-w-6xl mx-auto px-5 sm:px-8 pt-14 sm:pt-20 pb-16 grid lg:grid-cols-[1.05fr_0.95fr] gap-12 items-center">
        <div>
          <Badge tone="teal">Ibadan, Oyo State</Badge>
          <h1 className="font-serif text-[2.6rem] sm:text-5xl font-semibold text-ink leading-[1.08] mt-5">
            Stay Organized. Never Miss a Class.
          </h1>
          <p className="text-muted text-base sm:text-lg mt-5 max-w-md leading-relaxed">
            Your academic timetable, reminders, examinations and important updates — all in one place.
          </p>
          <div className="flex flex-wrap items-center gap-3 mt-8">
            <Button size="lg" icon={ArrowRight} onClick={() => navigate('/register')}>
              Get Started
            </Button>
            <Button size="lg" variant="secondary" onClick={() => navigate('/timetable')}>
              View Timetable
            </Button>
          </div>
          <p className="text-xs text-muted mt-6">Plan. Track. Stay Ahead.</p>
        </div>

        <div className="relative">
          <div className="bg-surface border border-line rounded-2xl shadow-card p-5 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-medium text-muted">Today, Tuesday</p>
              <Badge tone="teal">4 classes</Badge>
            </div>

            <div className="rounded-xl bg-teal-500 text-white p-4 mb-4">
              <p className="text-[11px] uppercase tracking-wide text-teal-50/80 font-medium">Next Class</p>
              <p className="font-serif text-lg font-semibold mt-1">CSC 201 — Introduction to Programming</p>
              <div className="flex items-center gap-4 mt-2 text-sm text-teal-50/90">
                <span className="inline-flex items-center gap-1.5">
                  <Clock size={13} /> 10:00 AM – 12:00 PM
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <MapPin size={13} /> Computer Lab 2
                </span>
              </div>
            </div>

            <div className="space-y-2.5">
              <PreviewRow label="Upcoming Examination" value="CSC 301 — Sept 15" tone="cobalt" />
              <PreviewRow label="Reminder" value="Submit CSC 201 Assignment" tone="amber" />
              <PreviewRow label="Announcement" value="Exam Timetable Released" tone="teal" />
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-5 sm:px-8 py-16 border-t border-line">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((f) => (
            <div key={f.title} className="bg-surface border border-line rounded-xl p-5">
              <div className="w-10 h-10 rounded-lg bg-teal-50 dark:bg-teal-600/10 flex items-center justify-center mb-4">
                <f.icon size={19} className="text-teal-500" strokeWidth={2} />
              </div>
              <p className="font-serif font-semibold text-ink mb-1.5">{f.title}</p>
              <p className="text-sm text-muted leading-relaxed">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-line py-8">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted">
          <p>© 2026 Oyo State College of Health Science and Technology, Ibadan.</p>
          <p>OCHST Academic Hub — Plan. Track. Stay Ahead.</p>
        </div>
      </footer>
    </div>
  );
}

function PreviewRow({ label, value, tone }: { label: string; value: string; tone: 'teal' | 'amber' | 'cobalt' }) {
  const dotTone = { teal: 'bg-teal-500', amber: 'bg-amber-500', cobalt: 'bg-cobalt-500' }[tone];
  return (
    <div className="flex items-center gap-3 bg-paper rounded-lg px-3 py-2.5">
      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${dotTone}`} />
      <div className="min-w-0">
        <p className="text-[11px] text-muted">{label}</p>
        <p className="text-sm text-ink truncate">{value}</p>
      </div>
    </div>
  );
}
