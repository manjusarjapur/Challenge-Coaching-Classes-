import React from 'react';
import { useApp } from '../../context/AppContext';
import { BarChart3, TrendingUp, Users, CalendarCheck, Award, GraduationCap } from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
} from 'recharts';

export const ReportsScreen: React.FC = () => {
  const { students, teachers, tests } = useApp();

  const progressData = [
    { month: 'Mar', physics: 72, math: 68, chemistry: 75 },
    { month: 'Apr', physics: 78, math: 74, chemistry: 80 },
    { month: 'May', physics: 82, math: 81, chemistry: 84 },
    { month: 'Jun', physics: 85, math: 88, chemistry: 86 },
    { month: 'Jul', physics: 88, math: 92, chemistry: 89 },
  ];

  const classPerformanceData = [
    { class: 'Class 12A', avgScore: 88, attendance: 95 },
    { class: 'Class 12B', avgScore: 82, attendance: 90 },
    { class: 'Class 11A', avgScore: 85, attendance: 92 },
    { class: 'Class 11B', avgScore: 78, attendance: 88 },
    { class: 'Class 10th', avgScore: 91, attendance: 96 },
  ];

  const attendancePie = [
    { name: 'Present', value: 92, color: '#10B981' },
    { name: 'Late', value: 5, color: '#F59E0B' },
    { name: 'Absent', value: 3, color: '#EF4444' },
  ];

  return (
    <div className="flex-1 bg-slate-50 p-3.5 space-y-4 overflow-y-auto">
      {/* Header */}
      <div>
        <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-blue-900" /> Analytics & Progress Reports
        </h2>
        <p className="text-[11px] text-slate-500">
          Performance Visualizers & Attendance Analytics
        </p>
      </div>

      {/* Chart 1: Student Score Trend Line Chart */}
      <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-xs space-y-2">
        <h3 className="text-xs font-extrabold text-slate-900 flex items-center gap-1.5">
          <TrendingUp className="w-4 h-4 text-emerald-600" /> Subject-wise Progress Trend (Class 12th)
        </h3>

        <div className="h-48 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={progressData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
              <XAxis dataKey="month" tick={{ fontSize: 10 }} axisLine={false} />
              <YAxis domain={[50, 100]} tick={{ fontSize: 10 }} axisLine={false} />
              <Tooltip
                contentStyle={{ borderRadius: '12px', fontSize: '11px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)' }}
              />
              <Line type="monotone" dataKey="physics" stroke="#2563EB" strokeWidth={3} dot={{ r: 4 }} name="Physics" />
              <Line type="monotone" dataKey="math" stroke="#F59E0B" strokeWidth={3} dot={{ r: 4 }} name="Mathematics" />
              <Line type="monotone" dataKey="chemistry" stroke="#10B981" strokeWidth={3} dot={{ r: 4 }} name="Chemistry" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="flex items-center justify-around text-[10px] text-slate-600 font-bold pt-1">
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600" /> Physics
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Mathematics
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Chemistry
          </span>
        </div>
      </div>

      {/* Chart 2: Batch Performance Bar Chart */}
      <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-xs space-y-2">
        <h3 className="text-xs font-extrabold text-slate-900 flex items-center gap-1.5">
          <Award className="w-4 h-4 text-amber-500" /> Class Batch Average Test Score %
        </h3>

        <div className="h-44 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={classPerformanceData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
              <XAxis dataKey="class" tick={{ fontSize: 10 }} axisLine={false} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 10 }} axisLine={false} />
              <Tooltip
                contentStyle={{ borderRadius: '12px', fontSize: '11px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)' }}
              />
              <Bar dataKey="avgScore" fill="#1E3A8A" radius={[8, 8, 0, 0]} name="Avg Score %" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Chart 3: Attendance Breakdown Pie Chart */}
      <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-xs space-y-2">
        <h3 className="text-xs font-extrabold text-slate-900 flex items-center gap-1.5">
          <CalendarCheck className="w-4 h-4 text-emerald-600" /> Overall Academy Attendance Distribution
        </h3>

        <div className="h-40 w-full flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={attendancePie}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={45}
                outerRadius={65}
                paddingAngle={4}
              >
                {attendancePie.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ borderRadius: '12px', fontSize: '11px', border: 'none' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="flex items-center justify-around text-[10px] text-slate-600 font-bold">
          <span className="flex items-center gap-1 text-emerald-700">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Present (92%)
          </span>
          <span className="flex items-center gap-1 text-amber-700">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Late (5%)
          </span>
          <span className="flex items-center gap-1 text-rose-700">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> Absent (3%)
          </span>
        </div>
      </div>
    </div>
  );
};
