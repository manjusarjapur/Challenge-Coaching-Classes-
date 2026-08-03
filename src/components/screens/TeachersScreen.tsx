import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Users, Plus, Phone, Mail, BookOpen, Trash2, Award } from 'lucide-react';
import { RegisterTeacherModal } from '../modals/ActionModals';

export const TeachersScreen: React.FC = () => {
  const { teachers, deleteTeacher, currentRole } = useApp();
  const [isAddOpen, setIsAddOpen] = useState(false);

  return (
    <div className="flex-1 bg-slate-50 p-3.5 space-y-3.5 overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
            <Users className="w-5 h-5 text-amber-500" /> Faculty & Teachers
          </h2>
          <p className="text-[11px] text-slate-500">
            {teachers.length} Expert Faculty Members
          </p>
        </div>

        {currentRole === 'super_admin' && (
          <button
            onClick={() => setIsAddOpen(true)}
            className="px-3 py-2 bg-amber-500 text-blue-950 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md hover:bg-amber-400 transition"
          >
            <Plus className="w-4 h-4" />
            <span>Register Faculty</span>
          </button>
        )}
      </div>

      {/* Teachers Grid */}
      <div className="space-y-3">
        {teachers.map((t) => (
          <div
            key={t.id}
            className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-xs hover:border-amber-300 transition"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-12 h-12 rounded-2xl object-cover border-2 border-amber-200 shrink-0"
                />
                <div>
                  <h3 className="font-extrabold text-xs text-slate-900">{t.name}</h3>
                  <p className="text-[10px] font-extrabold text-amber-600 uppercase tracking-wider">
                    {t.department} • {t.experience} Exp
                  </p>
                  <p className="text-[10px] text-slate-500 mt-0.5">{t.qualification}</p>
                </div>
              </div>

              {currentRole === 'super_admin' && (
                <button
                  onClick={() => deleteTeacher(t.id)}
                  className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Classes Assigned Pill List */}
            <div className="mt-3 pt-2.5 border-t border-slate-100 space-y-1.5">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Assigned Classes:
              </div>
              <div className="flex flex-wrap gap-1">
                {t.assignedClasses.map((cls, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-blue-50 text-blue-900 border border-blue-100"
                  >
                    {cls}
                  </span>
                ))}
              </div>
            </div>

            {/* Footer Stats & Contact */}
            <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
              <span className="flex items-center gap-1 font-semibold text-slate-700">
                <BookOpen className="w-3 h-3 text-emerald-600" /> {t.totalNotesUploaded} Notes Uploaded
              </span>

              <a
                href={`tel:${t.phone}`}
                className="px-2.5 py-1 bg-amber-50 text-amber-900 border border-amber-200/60 rounded-lg font-bold flex items-center gap-1 hover:bg-amber-100"
              >
                <Phone className="w-3 h-3" /> Call Faculty
              </a>
            </div>
          </div>
        ))}
      </div>

      {isAddOpen && <RegisterTeacherModal onClose={() => setIsAddOpen(false)} />}
    </div>
  );
};
