import { useMemo, useState } from 'react';
import { PageHeader, EmptyState, Badge, Modal } from '../components/common';
import { AnnouncementCard } from '../components/announcements';
import { announcements as seed } from '../data/mockData';
import { cn, formatDateLong } from '../lib/utils';
import type { Announcement, AnnouncementCategory } from '../types';

const FILTERS: Array<AnnouncementCategory | 'All'> = ['All', 'Academic', 'Department', 'Notice'];

export default function Announcements() {
  const [items, setItems] = useState<Announcement[]>(seed);
  const [filter, setFilter] = useState<AnnouncementCategory | 'All'>('All');
  const [active, setActive] = useState<Announcement | null>(null);

  const visible = useMemo(
    () => (filter === 'All' ? items : items.filter((a) => a.category === filter)).sort((a, b) => b.date.localeCompare(a.date)),
    [items, filter]
  );

  const openAnnouncement = (a: Announcement) => {
    setItems((prev) => prev.map((i) => (i.id === a.id ? { ...i, read: true } : i)));
    setActive(a);
  };

  return (
    <div>
      <PageHeader title="Announcements" subtitle="Stay informed about important academic updates." />

      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1 mb-5">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              'shrink-0 px-3.5 py-1.5 rounded-full text-sm font-medium border transition-colors',
              filter === f ? 'bg-teal-500 text-white border-teal-500' : 'bg-surface text-muted border-line hover:text-ink'
            )}
          >
            {f}
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <EmptyState title="No announcements available" />
      ) : (
        <div className="space-y-3">
          {visible.map((a) => (
            <AnnouncementCard key={a.id} announcement={a} onOpen={openAnnouncement} />
          ))}
        </div>
      )}

      <Modal open={active !== null} onClose={() => setActive(null)} title={active?.title ?? ''}>
        {active && (
          <div>
            <div className="flex items-center gap-3 mb-3">
              <Badge tone="teal">{active.category}</Badge>
              <span className="text-xs text-muted">{formatDateLong(active.date)}</span>
            </div>
            <p className="text-sm text-ink leading-relaxed">{active.body}</p>
          </div>
        )}
      </Modal>
    </div>
  );
}
