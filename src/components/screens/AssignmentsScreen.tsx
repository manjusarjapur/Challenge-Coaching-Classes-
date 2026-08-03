import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ClipboardList, Plus, Calendar, CheckCircle, Clock, UploadCloud, FileText } from 'lucide-react';

export const AssignmentsScreen: React.FC = () => {
  const { assignments, currentRole, showToast } = useApp();
  const [selectedStatus, setSelectedStatus] = useState<string>('All');

  const filtered = assignments.filter(
    (a) => selectedStatus === 'All' || a.status === selectedStatus
  );

  return (
    <div className="flex-1 bg-slate-50 p-3.5 space-y-3.5 overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
            <ClipboardList className="w-5 h-5 text-blue-900" /> Student Assignments
          </h2>
          <p className="text-[11px] text-slate-500">
            {assignments.length} Homework & Problem Sets
          </p>
        </div>
      </div>

      {/* Status Filter Tabs */}
      <div className="flex items-center gap-1.5">
        {['All', 'Pending', 'Submitted', 'Graded'].map((st) => (
          <button
            key={st}
            onClick={() => setSelectedStatus(st)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
              selectedStatus === st
                ? 'bg-blue-900 text-amber-300 shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200'
            }`}
          >
            {st}
          </button>
        ))}
      </div>

      {/* Assignments List */}
      <div className="space-y-3">
        {filtered.map((asg) => (
          <div
            key={asg.id}
            className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-xs space-y-2.5"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="text-[9px] font-extrabold uppercase px-2 py-0.5 rounded bg-blue-50 text-blue-900">
                    {asg.subject}
                  </span>
                  <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                    {asg.className}
                  </span>
                </div>
                <h3 className="font-extrabold text-xs text-slate-900">{asg.title}</h3>
                <p className="text-[11px] text-slate-500 mt-1">{asg.description}</p>
              </div>

              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase shrink-0 ${
                  asg.status === 'Graded'
                    ? 'bg-emerald-100 text-emerald-800'
                    : asg.status === 'Submitted'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-amber-100 text-amber-900'
                }`}
              >
                {asg.status}
              </span>
            </div>

            {/* Footer details */}
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-[10px] text-slate-500 font-medium flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-rose-500" /> Due: {asg.dueDate} • Total: {asg.totalMarks} Marks
              </span>

              {asg.status === 'Pending' && (
                <button
                  onClick={() => showToast(`Submitted assignment "${asg.title}"!`)}
                  className="px-3 py-1 bg-blue-900 text-amber-300 font-bold rounded-xl text-[11px] flex items-center gap-1 shadow-xs hover:bg-blue-800"
                >
                  <UploadCloud className="w-3.5 h-3.5" /> Submit Solution
                </button>
              )}

              {asg.status === 'Graded' && (
                <span className="text-xs font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-200">
                  Score: {asg.score} / {asg.totalMarks}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
