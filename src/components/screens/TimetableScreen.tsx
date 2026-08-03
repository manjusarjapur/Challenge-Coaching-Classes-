import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Clock, Calendar, MapPin, User, GraduationCap } from 'lucide-react';

export const TimetableScreen: React.FC = () => {
  const { timetable } = useApp();
  const [selectedDay, setSelectedDay] = useState<string>('Monday');

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  const slotsForDay = timetable.filter((t) => t.day === selectedDay);

  return (
    <div className="flex-1 bg-slate-50 p-3.5 space-y-3.5 overflow-y-auto">
      {/* Header */}
      <div>
        <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
          <Clock className="w-5 h-5 text-blue-900" /> Class Timetable Schedule
        </h2>
        <p className="text-[11px] text-slate-500">
          Weekly Lecture Timetable & Room Assignments
        </p>
      </div>

      {/* Day Selector */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
        {days.map((d) => (
          <button
            key={d}
            onClick={() => setSelectedDay(d)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
              selectedDay === d
                ? 'bg-blue-900 text-amber-300 shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200'
            }`}
          >
            {d}
          </button>
        ))}
      </div>

      {/* Slots List */}
      <div className="space-y-2.5">
        {slotsForDay.length === 0 ? (
          <div className="bg-white p-8 text-center rounded-2xl border border-slate-200">
            <Clock className="w-10 h-10 text-slate-300 mx-auto mb-2" />
            <p className="text-xs font-bold text-slate-600">No lectures scheduled for {selectedDay}.</p>
          </div>
        ) : (
          slotsForDay.map((slot) => (
            <div
              key={slot.id}
              className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-1.5">
                  <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded bg-blue-50 text-blue-900">
                    {slot.subject}
                  </span>
                  <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-amber-50 text-amber-900">
                    {slot.className} ({slot.batch})
                  </span>
                </div>

                <h3 className="font-extrabold text-xs text-slate-900">{slot.time}</h3>

                <p className="text-[11px] text-slate-500 flex items-center gap-2 font-medium">
                  <span className="flex items-center gap-1">
                    <User className="w-3 h-3 text-blue-700" /> {slot.teacherName}
                  </span>
                  <span className="flex items-center gap-1 text-emerald-700 font-bold">
                    <MapPin className="w-3 h-3" /> {slot.room}
                  </span>
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
