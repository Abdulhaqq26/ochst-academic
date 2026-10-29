import { useEffect, type ReactNode, type ButtonHTMLAttributes } from 'react';
import { X, Search, Inbox, type LucideIcon } from 'lucide-react';
import { cn } from '../lib/utils';

// ---------- Button ----------
type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: LucideIcon;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-teal-500 text-white hover:bg-teal-600 active:bg-teal-700 shadow-sm hover:shadow-card',
  secondary: 'bg-surface text-ink border border-line hover:border-teal-500/50 hover:bg-paper active:bg-line/40',
  ghost: 'text-ink hover:bg-teal-50 dark:hover:bg-teal-600/10 active:bg-teal-100/70 dark:active:bg-teal-600/20',
  danger: 'bg-amber-500 text-white hover:bg-amber-600 active:bg-amber-700 shadow-sm',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'text-sm px-3 py-1.5 gap-1.5',
  md: 'text-sm px-[1.125rem] py-2.5 gap-2',
  lg: 'text-base px-5 py-3 gap-2',
};

export function Button({
  variant = 'primary',
  size = 'md',
  icon: Icon,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-xl font-medium transition-all duration-150 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100',
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {Icon && <Icon size={16} strokeWidth={2.2} />}
      {children}
    </button>
  );
}

// ---------- Modal ----------
interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
}

export function Modal({ open, onClose, title, children, footer }: ModalProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div
        className="absolute inset-0 bg-ink/45 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="relative w-full sm:max-w-lg bg-surface rounded-t-2xl sm:rounded-2xl shadow-card-hover border border-line/60 max-h-[90vh] overflow-y-auto animate-[fadeIn_.15s_ease-out]"
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-line sticky top-0 bg-surface z-10">
          <h2 id="modal-title" className="font-serif text-lg font-semibold text-ink tracking-tight">
            {title}
          </h2>
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="p-1.5 rounded-lg text-muted hover:bg-paper hover:text-ink transition-colors"
          >
            <X size={18} />
          </button>
        </div>
        <div className="px-6 py-5">{children}</div>
        {footer && <div className="px-6 py-4 border-t border-line flex justify-end gap-3">{footer}</div>}
      </div>
    </div>
  );
}

// ---------- ConfirmDialog ----------
interface ConfirmDialogProps {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDialog({ open, title, message, confirmLabel = 'Delete', onConfirm, onCancel }: ConfirmDialogProps) {
  return (
    <Modal
      open={open}
      onClose={onCancel}
      title={title}
      footer={
        <>
          <Button variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="danger" onClick={onConfirm}>
            {confirmLabel}
          </Button>
        </>
      }
    >
      <p className="text-muted text-sm leading-relaxed">{message}</p>
    </Modal>
  );
}

// ---------- EmptyState ----------
interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  message?: string;
  action?: ReactNode;
}

export function EmptyState({ icon: Icon = Inbox, title, message, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-14 px-6">
      <div className="w-14 h-14 rounded-2xl bg-teal-50 dark:bg-teal-600/10 ring-1 ring-teal-500/10 flex items-center justify-center mb-4">
        <Icon size={22} className="text-teal-500" strokeWidth={1.8} />
      </div>
      <p className="font-serif text-base font-semibold text-ink tracking-tight mb-1">{title}</p>
      {message && <p className="text-sm text-muted leading-relaxed max-w-xs">{message}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

// ---------- LoadingState ----------
export function LoadingState({ rows = 3 }: { rows?: number }) {
  return (
    <div className="space-y-3" aria-busy="true" aria-label="Loading">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="h-16 rounded-xl bg-line/50 animate-pulse" />
      ))}
    </div>
  );
}

// ---------- Badge ----------
type BadgeTone = 'teal' | 'amber' | 'cobalt' | 'moss' | 'neutral';

const badgeTones: Record<BadgeTone, string> = {
  teal: 'bg-teal-50 text-teal-600 ring-1 ring-inset ring-teal-500/15 dark:bg-teal-600/15 dark:text-teal-400',
  amber: 'bg-amber-50 text-amber-600 ring-1 ring-inset ring-amber-500/15 dark:bg-amber-500/15 dark:text-amber-500',
  cobalt: 'bg-cobalt-50 text-cobalt-600 ring-1 ring-inset ring-cobalt-500/15 dark:bg-cobalt-500/15 dark:text-cobalt-500',
  moss: 'bg-moss-50 text-moss-600 ring-1 ring-inset ring-moss-500/15 dark:bg-moss-500/15 dark:text-moss-500',
  neutral: 'bg-line/60 text-muted ring-1 ring-inset ring-line',
};

export function Badge({ tone = 'neutral', children }: { tone?: BadgeTone; children: ReactNode }) {
  return (
    <span className={cn('inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium', badgeTones[tone])}>
      {children}
    </span>
  );
}

// ---------- StatCard ----------
interface StatCardProps {
  label: string;
  value: number | string;
  icon: LucideIcon;
  tone?: BadgeTone;
}

const statIconTones: Record<BadgeTone, string> = {
  teal: 'text-teal-600',
  amber: 'text-amber-600',
  cobalt: 'text-cobalt-600',
  moss: 'text-moss-600',
  neutral: 'text-muted',
};

const statIconBgTones: Record<BadgeTone, string> = {
  teal: 'bg-teal-50 dark:bg-teal-600/10',
  amber: 'bg-amber-50 dark:bg-amber-500/10',
  cobalt: 'bg-cobalt-50 dark:bg-cobalt-500/10',
  moss: 'bg-moss-50 dark:bg-moss-500/10',
  neutral: 'bg-line/60',
};

const statBarTones: Record<BadgeTone, string> = {
  teal: 'bg-teal-500',
  amber: 'bg-amber-500',
  cobalt: 'bg-cobalt-500',
  moss: 'bg-moss-500',
  neutral: 'bg-line',
};

export function StatCard({ label, value, icon: Icon, tone = 'teal' }: StatCardProps) {
  return (
    <div className="group relative bg-surface rounded-xl border border-line pl-5 pr-4 py-4 overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:shadow-card-hover">
      <div className={cn('absolute left-0 top-0 bottom-0 w-1', statBarTones[tone])} />
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="stat-figure text-2xl font-serif font-semibold text-ink leading-none">{value}</p>
          <p className="text-xs text-muted mt-2 leading-snug">{label}</p>
        </div>
        <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center shrink-0', statIconBgTones[tone])}>
          <Icon size={16} className={statIconTones[tone]} strokeWidth={2.2} />
        </div>
      </div>
    </div>
  );
}

// ---------- SearchBar ----------
interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function SearchBar({ value, onChange, placeholder = 'Search…', className }: SearchBarProps) {
  return (
    <div className={cn('group relative', className)}>
      <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted transition-colors group-focus-within:text-teal-500" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
        className="w-full bg-surface border border-line rounded-xl pl-11 pr-4 py-3 text-sm text-ink placeholder:text-muted/70 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 outline-none transition-all duration-150"
      />
    </div>
  );
}

// ---------- PageHeader ----------
interface PageHeaderProps {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}

export function PageHeader({ title, subtitle, action }: PageHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
      <div>
        <h1 className="font-serif text-2xl font-semibold text-ink tracking-tight">{title}</h1>
        {subtitle && <p className="text-sm text-muted mt-1.5 leading-relaxed max-w-xl">{subtitle}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
