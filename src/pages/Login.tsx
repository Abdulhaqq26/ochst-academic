import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GraduationCap, Info } from 'lucide-react';
import { Button } from '../components/common';

export default function Login() {
  const navigate = useNavigate();
  const [remember, setRemember] = useState(true);

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
          <p className="font-serif text-xl font-semibold text-ink">OCHST Academic Hub</p>
          <p className="text-xs text-muted mt-1">Oyo State College of Health Science &amp; Technology</p>
        </div>

        <div className="bg-surface border border-line rounded-2xl shadow-card p-6">
          <h1 className="font-serif text-lg font-semibold text-ink mb-1">Welcome back</h1>
          <p className="text-sm text-muted mb-5">Log in to continue to your dashboard.</p>

          <div className="flex items-start gap-2 bg-teal-50 dark:bg-teal-600/10 rounded-lg px-3 py-2.5 mb-5">
            <Info size={14} className="text-teal-600 mt-0.5 shrink-0" />
            <p className="text-xs text-teal-600">Demo Mode — No real account required.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block">
              <span className="block text-xs font-medium text-muted mb-1.5">Email or Matric Number</span>
              <input
                type="text"
                required
                placeholder="ade@example.com"
                className="w-full bg-paper border border-line rounded-lg px-3 py-2.5 text-sm text-ink outline-none focus:border-teal-500"
              />
            </label>
            <label className="block">
              <span className="block text-xs font-medium text-muted mb-1.5">Password</span>
              <input
                type="password"
                required
                placeholder="••••••••"
                className="w-full bg-paper border border-line rounded-lg px-3 py-2.5 text-sm text-ink outline-none focus:border-teal-500"
              />
            </label>

            <div className="flex items-center justify-between text-sm">
              <label className="inline-flex items-center gap-2 text-muted">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="rounded border-line text-teal-500 focus:ring-teal-500"
                />
                Remember me
              </label>
              <button type="button" className="text-teal-600 font-medium hover:underline">
                Forgot password?
              </button>
            </div>

            <Button type="submit" className="w-full">
              Log In
            </Button>
          </form>
        </div>

        <p className="text-center text-sm text-muted mt-5">
          Don&apos;t have an account?{' '}
          <Link to="/register" className="text-teal-600 font-medium hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
