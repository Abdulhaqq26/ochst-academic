import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, AlertCircle } from 'lucide-react';
import { Button } from '../components/common';
import { loginAdmin } from '../lib/adminAuth';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const result = loginAdmin(email, password);
    if (!result.success) {
      setError(result.error ?? 'Unable to log in.');
      return;
    }
    setError('');
    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-paper flex items-center justify-center px-5 py-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center mb-8">
          <div className="w-11 h-11 rounded-xl bg-teal-500 flex items-center justify-center mb-3">
            <ShieldCheck size={22} className="text-white" strokeWidth={2.2} />
          </div>
          <p className="font-serif text-xl font-semibold text-ink">Admin Login</p>
          <p className="text-xs text-muted mt-1">OCHST Academic Hub — Administration</p>
        </div>

        <div className="bg-surface border border-line rounded-2xl shadow-card p-6">
          <h1 className="font-serif text-lg font-semibold text-ink mb-1">Welcome back, Admin</h1>
          <p className="text-sm text-muted mb-5">Log in with your admin credentials to continue.</p>

          {error && (
            <div className="flex items-start gap-2 bg-amber-50 dark:bg-amber-500/10 rounded-lg px-3 py-2.5 mb-5">
              <AlertCircle size={14} className="text-amber-600 mt-0.5 shrink-0" />
              <p className="text-xs text-amber-600">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block">
              <span className="block text-xs font-medium text-muted mb-1.5">Admin Email</span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@ochst.edu.ng"
                className="w-full bg-paper border border-line rounded-lg px-3 py-2.5 text-sm text-ink outline-none focus:border-teal-500"
              />
            </label>
            <label className="block">
              <span className="block text-xs font-medium text-muted mb-1.5">Password</span>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-paper border border-line rounded-lg px-3 py-2.5 text-sm text-ink outline-none focus:border-teal-500"
              />
            </label>

            <Button type="submit" className="w-full">
              Log In
            </Button>
          </form>
        </div>

        <p className="text-center text-sm text-muted mt-5">
          Need an admin account?{' '}
          <Link to="/admin/register" className="text-teal-600 font-medium hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
