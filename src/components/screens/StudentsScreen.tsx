import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Student } from '../../types';
import { Search, Plus, Trash2, Edit3, Phone, Mail, GraduationCap, CheckCircle, AlertCircle, Clock } from 'lucide-react';
import { AddStudentModal } from '../modals/ActionModals';

export const StudentsScreen: React.FC = () => {
  const { students, deleteStudent, editStudent, currentRole, searchQuery, setSearchQuery } = useApp();
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState<string>('All');
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);

  const classes = ['All', 'Class 12th', 'Class 11th', 'Class 10th'];

  const filteredStudents = students.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.rollNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.batch.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesClass = selectedClass === 'All' || s.className === selectedClass;
    return matchesSearch && matchesClass;
  });

  return (
    <div className="flex-1 bg-slate-50 p-3.5 space-y-3.5 overflow-y-auto">
      {/* Top Header & Search Bar */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-blue-900" /> Student Directory
          </h2>
          <p className="text-[11px] text-slate-500">
            {filteredStudents.length} Students Enrolled in Academy
          </p>
        </div>

        {(currentRole === 'super_admin' || currentRole === 'teacher') && (
          <button
            onClick={() => setIsAddOpen(true)}
            className="px-3 py-2 bg-blue-900 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md hover:bg-blue-800 transition"
          >
            <Plus className="w-4 h-4 text-amber-400" />
            <span>Add Student</span>
          </button>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
        {classes.map((cls) => (
          <button
            key={cls}
            onClick={() => setSelectedClass(cls)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
              selectedClass === cls
                ? 'bg-blue-900 text-amber-300 font-bold shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200'
            }`}
          >
            {cls}
          </button>
        ))}
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
        <input
          type="text"
          placeholder="Search by student name, roll number, or batch..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-9 pr-3 py-2 bg-white rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-blue-600 shadow-xs"
        />
      </div>

      {/* Student Cards List */}
      <div className="space-y-2.5">
        {filteredStudents.length === 0 ? (
          <div className="bg-white p-8 text-center rounded-2xl border border-slate-200">
            <GraduationCap className="w-10 h-10 text-slate-300 mx-auto mb-2" />
            <p className="text-xs font-bold text-slate-600">No students found matching filters.</p>
          </div>
        ) : (
          filteredStudents.map((st) => (
            <div
              key={st.id}
              className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-xs hover:border-blue-300 transition"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img
                    src={st.avatar}
                    alt={st.name}
                    className="w-11 h-11 rounded-2xl object-cover border-2 border-blue-100 shrink-0"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-extrabold text-xs text-slate-900">{st.name}</h3>
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-blue-50 text-blue-800">
                        {st.rollNo}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                      {st.className} • {st.batch}
                    </p>
                  </div>
                </div>

                {currentRole === 'super_admin' && (
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => deleteStudent(st.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                      title="Delete Student"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>

              {/* Progress Gauges & Details */}
              <div className="mt-3 pt-2.5 border-t border-slate-100 grid grid-cols-3 gap-2 text-center text-[10px]">
                <div className="bg-emerald-50/60 p-1.5 rounded-xl border border-emerald-100">
                  <span className="text-slate-500 block font-medium">Attendance</span>
                  <span className="font-extrabold text-emerald-700 text-xs">{st.attendancePct}%</span>
                </div>

                <div className="bg-amber-50/60 p-1.5 rounded-xl border border-amber-100">
                  <span className="text-slate-500 block font-medium">Avg Score</span>
                  <span className="font-extrabold text-amber-800 text-xs">{st.avgScorePct}%</span>
                </div>

                <div className="bg-slate-50 p-1.5 rounded-xl border border-slate-200/60">
                  <span className="text-slate-500 block font-medium">Fees</span>
                  <span
                    className={`font-extrabold text-xs ${
                      st.feeStatus === 'Paid'
                        ? 'text-emerald-600'
                        : st.feeStatus === 'Pending'
                        ? 'text-rose-600'
                        : 'text-amber-600'
                    }`}
                  >
                    {st.feeStatus}
                  </span>
                </div>
              </div>

              {/* Parent Info Line */}
              <div className="mt-2.5 flex items-center justify-between text-[11px] text-slate-500 bg-slate-50 px-2.5 py-1.5 rounded-xl">
                <span>Parent: <strong className="text-slate-800">{st.parentName}</strong></span>
                <a
                  href={`tel:${st.parentPhone}`}
                  className="text-blue-700 font-bold flex items-center gap-1 hover:underline"
                >
                  <Phone className="w-3 h-3" /> Call
                </a>
              </div>
            </div>
          ))
        )}
      </div>

      {isAddOpen && <AddStudentModal onClose={() => setIsAddOpen(false)} />}
    </div>
  );
};
