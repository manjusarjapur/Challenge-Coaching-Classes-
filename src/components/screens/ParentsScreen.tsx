import React from 'react';
import { useApp } from '../../context/AppContext';
import { UserCheck, Phone, Mail, GraduationCap } from 'lucide-react';

export const ParentsScreen: React.FC = () => {
  const { parents } = useApp();

  return (
    <div className="flex-1 bg-slate-50 p-3.5 space-y-3.5 overflow-y-auto">
      {/* Header */}
      <div>
        <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
          <UserCheck className="w-5 h-5 text-purple-600" /> Parents & Guardians Connect
        </h2>
        <p className="text-[11px] text-slate-500">
          {parents.length} Active Parent Profiles
        </p>
      </div>

      {/* Parents Cards */}
      <div className="space-y-3">
        {parents.map((p) => (
          <div
            key={p.id}
            className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-xs space-y-2.5"
          >
            <div className="flex items-center gap-3">
              <img
                src={p.avatar}
                alt={p.name}
                className="w-11 h-11 rounded-2xl object-cover border-2 border-purple-100"
              />
              <div>
                <h3 className="font-extrabold text-xs text-slate-900">{p.name}</h3>
                <p className="text-[10px] text-slate-500 font-medium">{p.occupation}</p>
                <p className="text-[10px] text-purple-700 font-bold">{p.phone}</p>
              </div>
            </div>

            {/* Child Linked Info */}
            <div className="p-2.5 bg-purple-50/60 rounded-xl border border-purple-100 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-purple-700" />
                <div>
                  <span className="text-[10px] text-slate-500 block leading-tight">Linked Student</span>
                  <span className="font-bold text-slate-900">{p.childName}</span> ({p.childClass})
                </div>
              </div>

              <a
                href={`tel:${p.phone}`}
                className="px-3 py-1 bg-purple-600 text-white font-bold rounded-lg text-xs flex items-center gap-1 shadow-xs hover:bg-purple-500"
              >
                <Phone className="w-3 h-3" /> Call
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
