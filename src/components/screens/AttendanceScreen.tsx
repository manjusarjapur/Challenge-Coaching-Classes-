import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CalendarCheck, CheckCircle2, XCircle, Clock, Calendar, Check, Award } from 'lucide-react';

export const AttendanceScreen: React.FC = () => {
  const { students, attendanceRecords, markAttendance, currentRole, showToast } = useApp();

  const [activeTab, setActiveTab] = useState<'student_view' | 'teacher_marker'>(
    currentRole === 'student' || currentRole === 'parent' ? 'student_view' : 'teacher_marker'
  );

  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [dailyRosterStatus, setDailyRosterStatus] = useState<Record<string, 'Present' | 'Absent' | 'Late'>>({
    student_1: 'Present',
    student_2: 'Present',
    student_3: 'Present',
    student_4: 'Present',
    student_5: 'Late',
    student_6: 'Present',
  });

  const handleToggleStudentStatus = (id: string, status: 'Present' | 'Absent' | 'Late') => {
    setDailyRosterStatus((prev) => ({ ...prev, [id]: status }));
  };

  const markAllPresent = () => {
    const updated: Record<string, 'Present' | 'Absent' | 'Late'> = {};
    students.forEach((s) => {
      updated[s.id] = 'Present';
    });
    setDailyRosterStatus(updated);
    showToast('All students marked Present for today!');
  };

  const handleSaveBatchAttendance = () => {
    showToast(`Attendance saved for ${students.length} students on ${selectedDate}`);
  };

  // Calendar Days generator for August 2026
  const calendarDays = Array.from({ length: 31 }, (_, i) => {
    const day = i + 1;
    const dateStr = `2026-08-${day.toString().padStart(2, '0')}`;
    const rec = attendanceRecords.find((r) => r.date === dateStr);
    return {
      day,
      dateStr,
      status: rec ? rec.status : day % 7 === 2 ? 'Holiday' : 'Present',
    };
  });

  return (
    <div className="flex-1 bg-slate-50 p-3.5 space-y-3.5 overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
            <CalendarCheck className="w-5 h-5 text-emerald-600" /> Attendance Portal
          </h2>
          <p className="text-[11px] text-slate-500">
            Daily Roster & Monthly Calendar Summary
          </p>
        </div>

        {/* Tab Toggle */}
        <div className="flex bg-slate-200/80 p-1 rounded-xl">
          <button
            onClick={() => setActiveTab('student_view')}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition ${
              activeTab === 'student_view' ? 'bg-white text-blue-900 shadow-xs' : 'text-slate-600'
            }`}
          >
            My Calendar
          </button>
          <button
            onClick={() => setActiveTab('teacher_marker')}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition ${
              activeTab === 'teacher_marker' ? 'bg-white text-blue-900 shadow-xs' : 'text-slate-600'
            }`}
          >
            Mark Roster
          </button>
        </div>
      </div>

      {/* STUDENT / PARENT MONTHLY CALENDAR VIEW */}
      {activeTab === 'student_view' && (
        <div className="space-y-3">
          {/* Summary Metric Bar */}
          <div className="grid grid-cols-3 gap-2 text-center bg-white p-3 rounded-2xl border border-slate-200 shadow-xs">
            <div className="bg-emerald-50 p-2 rounded-xl border border-emerald-100">
              <span className="text-[10px] text-slate-500 font-bold block">Present</span>
              <span className="text-lg font-black text-emerald-700">26 Days</span>
            </div>
            <div className="bg-rose-50 p-2 rounded-xl border border-rose-100">
              <span className="text-[10px] text-slate-500 font-bold block">Absent</span>
              <span className="text-lg font-black text-rose-700">1 Day</span>
            </div>
            <div className="bg-amber-50 p-2 rounded-xl border border-amber-100">
              <span className="text-[10px] text-slate-500 font-bold block">Overall %</span>
              <span className="text-lg font-black text-amber-800">94%</span>
            </div>
          </div>

          {/* Calendar Grid Box */}
          <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs space-y-2.5">
            <div className="flex items-center justify-between font-extrabold text-xs text-slate-900">
              <span>August 2026 Calendar</span>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                Streak: 12 Days 🔥
              </span>
            </div>

            {/* Weekdays */}
            <div className="grid grid-cols-7 gap-1 text-center font-bold text-[10px] text-slate-400">
              <span>S</span>
              <span>M</span>
              <span>T</span>
              <span>W</span>
              <span>T</span>
              <span>F</span>
              <span>S</span>
            </div>

            {/* Days Grid */}
            <div className="grid grid-cols-7 gap-1.5 text-center text-xs font-bold">
              {calendarDays.map((cd) => {
                let color = 'bg-emerald-50 text-emerald-800 border-emerald-200';
                if (cd.status === 'Absent') color = 'bg-rose-100 text-rose-800 border-rose-200';
                if (cd.status === 'Late') color = 'bg-amber-100 text-amber-900 border-amber-200';
                if (cd.status === 'Holiday') color = 'bg-slate-100 text-slate-400 border-slate-200';

                return (
                  <div
                    key={cd.day}
                    className={`py-2 rounded-xl border flex flex-col items-center justify-center ${color}`}
                  >
                    <span>{cd.day}</span>
                  </div>
                );
              })}
            </div>

            {/* Legend */}
            <div className="pt-2 border-t border-slate-100 flex items-center justify-around text-[10px] text-slate-600 font-medium">
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Present
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> Absent
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Late
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-300" /> Holiday
              </span>
            </div>
          </div>
        </div>
      )}

      {/* TEACHER / ADMIN DAILY MARKER VIEW */}
      {activeTab === 'teacher_marker' && (
        <div className="space-y-3">
          {/* Controls Bar */}
          <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <label className="text-[10px] font-bold text-slate-400 block">Date</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="text-xs font-extrabold text-slate-900 focus:outline-none"
              />
            </div>

            <button
              onClick={markAllPresent}
              className="px-3 py-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl font-bold text-xs flex items-center gap-1 hover:bg-emerald-100"
            >
              <Check className="w-3.5 h-3.5" /> Mark All Present
            </button>
          </div>

          {/* Student Batch Attendance List */}
          <div className="space-y-2">
            {students.map((st) => {
              const currentSt = dailyRosterStatus[st.id] || 'Present';
              return (
                <div
                  key={st.id}
                  className="bg-white p-3 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between"
                >
                  <div className="flex items-center gap-2.5">
                    <img
                      src={st.avatar}
                      alt={st.name}
                      className="w-9 h-9 rounded-xl object-cover border border-slate-200"
                    />
                    <div>
                      <h4 className="font-bold text-xs text-slate-900">{st.name}</h4>
                      <p className="text-[10px] text-slate-400">
                        {st.rollNo} • {st.batch}
                      </p>
                    </div>
                  </div>

                  {/* Status Toggle Buttons */}
                  <div className="flex bg-slate-100 p-1 rounded-xl gap-1">
                    <button
                      onClick={() => handleToggleStudentStatus(st.id, 'Present')}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition ${
                        currentSt === 'Present'
                          ? 'bg-emerald-600 text-white shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      P
                    </button>
                    <button
                      onClick={() => handleToggleStudentStatus(st.id, 'Late')}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition ${
                        currentSt === 'Late'
                          ? 'bg-amber-500 text-blue-950 shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      L
                    </button>
                    <button
                      onClick={() => handleToggleStudentStatus(st.id, 'Absent')}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition ${
                        currentSt === 'Absent'
                          ? 'bg-rose-600 text-white shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      A
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <button
            onClick={handleSaveBatchAttendance}
            className="w-full py-3 bg-blue-900 text-white font-extrabold rounded-2xl shadow-lg text-xs"
          >
            Save Attendance for {selectedDate}
          </button>
        </div>
      )}
    </div>
  );
};
