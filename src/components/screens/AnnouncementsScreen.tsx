import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Bell, Plus, Trash2, ShieldAlert, Sparkles, Calendar, User } from 'lucide-react';
import { AddAnnouncementModal } from '../modals/ActionModals';

export const AnnouncementsScreen: React.FC = () => {
  const { announcements, deleteAnnouncement, currentRole } = useApp();
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [selectedCat, setSelectedCat] = useState<string>('All');

  const categories = ['All', 'Urgent', 'Exam', 'General', 'Event'];

  const filtered = announcements.filter(
    (a) => selectedCat === 'All' || a.category === selectedCat
  );

  return (
    <div className="flex-1 bg-slate-50 p-3.5 space-y-3.5 overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
            <Bell className="w-5 h-5 text-amber-500" /> Announcements & Alerts
          </h2>
          <p className="text-[11px] text-slate-500">
            {announcements.length} Official Coaching Notices
          </p>
        </div>

        {(currentRole === 'super_admin' || currentRole === 'teacher') && (
          <button
            onClick={() => setIsAddOpen(true)}
            className="px-3 py-2 bg-purple-600 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md hover:bg-purple-500 transition"
          >
            <Plus className="w-4 h-4" />
            <span>Post Notice</span>
          </button>
        )}
      </div>

      {/* Filter Category Badges */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCat(cat)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
              selectedCat === cat
                ? 'bg-purple-600 text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Announcements List */}
      <div className="space-y-3">
        {filtered.map((anc) => (
          <div
            key={anc.id}
            className={`p-4 rounded-2xl border shadow-xs space-y-2 relative transition ${
              anc.isImportant
                ? 'bg-amber-50/60 border-amber-300'
                : 'bg-white border-slate-200/80'
            }`}
          >
            <div className="flex items-start justify-between gap-2">
              <span
                className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full ${
                  anc.category === 'Urgent'
                    ? 'bg-rose-600 text-white'
                    : anc.category === 'Exam'
                    ? 'bg-amber-500 text-blue-950 font-extrabold'
                    : 'bg-blue-100 text-blue-900'
                }`}
              >
                {anc.category}
              </span>

              {currentRole === 'super_admin' && (
                <button
                  onClick={() => deleteAnnouncement(anc.id)}
                  className="p-1 text-slate-400 hover:text-rose-600 rounded"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <h3 className="font-extrabold text-xs text-slate-900 leading-tight">{anc.title}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">{anc.description}</p>

            <div className="pt-2 border-t border-slate-100/80 flex items-center justify-between text-[10px] text-slate-400 font-medium">
              <span className="flex items-center gap-1 text-slate-500">
                <User className="w-3 h-3 text-purple-600" /> By {anc.author}
              </span>
              <span>Audience: {anc.targetAudience} • {anc.date}</span>
            </div>
          </div>
        ))}
      </div>

      {isAddOpen && <AddAnnouncementModal onClose={() => setIsAddOpen(false)} />}
    </div>
  );
};
