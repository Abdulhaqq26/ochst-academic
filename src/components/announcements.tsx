import { Megaphone, GraduationCap, Building2, Info } from 'lucide-react';
import type { Announcement, AnnouncementCategory } from '../types';
import { cn, formatDateLong } from '../lib/utils';
import { Badge } from './common';

const categoryMeta: Record<AnnouncementCategory, { icon: typeof Megaphone; tone: 'teal' | 'cobalt' | 'amber' }> = {
  Academic: { icon: GraduationCap, tone: 'teal' },
  Department: { icon: Building2, tone: 'cobalt' },
  Notice: { icon: Info, tone: 'amber' },
};

export function AnnouncementCard({ announcement, onOpen }: { announcement: Announcement; onOpen: (a: Announcement) => void }) {
  const meta = categoryMeta[announcement.category];
  const Icon = meta.icon;

  return (
    <button
      onClick={() => onOpen(announcement)}
      className="w-full text-left bg-surface border border-line rounded-xl p-4 hover:border-teal-500/40 transition-colors"
    >
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-lg bg-teal-50 dark:bg-teal-600/10 flex items-center justify-center shrink-0">
          <Icon size={17} className="text-teal-500" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <p className={cn('text-sm font-medium text-ink', !announcement.read && 'font-semibold')}>{announcement.title}</p>
            {!announcement.read && <span className="w-2 h-2 rounded-full bg-teal-500 mt-1.5 shrink-0" aria-label="Unread" />}
          </div>
          <p className="text-xs text-muted mt-1 line-clamp-2">{announcement.body}</p>
          <div className="flex items-center gap-3 mt-2.5">
            <Badge tone={meta.tone}>{announcement.category}</Badge>
            <span className="text-xs text-muted">{formatDateLong(announcement.date)}</span>
          </div>
        </div>
      </div>
    </button>
  );
}
