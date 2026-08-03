import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Users,
  GraduationCap,
  UserCheck,
  FileText,
  Award,
  BookOpen,
  Plus,
  UserPlus,
  FilePlus,
  Bell,
  CalendarCheck,
  BarChart3,
  Search,
  ChevronRight,
  TrendingUp,
  Clock,
  CheckCircle,
  Download,
  PlayCircle,
  Sparkles,
  Zap,
} from 'lucide-react';
import { AddStudentModal, RegisterTeacherModal, AddMaterialModal, CreateTestModal, AddAnnouncementModal } from '../modals/ActionModals';

export const HomeDashboardScreen: React.FC = () => {
  const {
    currentRole,
    currentUser,
    students,
    teachers,
    parents,
    materials,
    tests,
    announcements,
    setCurrentScreen,
    startTest,
  } = useApp();

  const [modalOpen, setModalOpen] = useState<string | null>(null);

  return (
    <div className="flex-1 bg-slate-50 p-3.5 space-y-4 overflow-y-auto">
      {/* Role Banner Header */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 rounded-3xl p-4 text-white shadow-lg relative overflow-hidden">
        <div className="absolute right-0 top-0 opacity-10 pointer-events-none transform translate-x-4 -translate-y-2">
          <GraduationCap className="w-40 h-40" />
        </div>

        <div className="flex items-center gap-3">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-12 h-12 rounded-2xl object-cover border-2 border-amber-400 shadow-md"
          />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-extrabold uppercase tracking-wider bg-amber-400 text-blue-950 px-2 py-0.5 rounded-full">
                {currentRole.replace('_', ' ')}
              </span>
              <span className="text-[10px] text-blue-200">
                {currentUser.className || currentUser.department || 'Portal Active'}
              </span>
            </div>
            <h2 className="text-base font-extrabold mt-0.5">{currentUser.name}</h2>
            <p className="text-[11px] text-blue-200">Welcome to Challenge Coaching Portal</p>
          </div>
        </div>
      </div>

      {/* SUPER ADMIN DASHBOARD */}
      {currentRole === 'super_admin' && (
        <>
          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
            <div
              onClick={() => setCurrentScreen('students')}
              className="bg-white p-3 rounded-2xl border border-slate-200/80 shadow-xs hover:border-blue-400 transition cursor-pointer"
            >
              <div className="flex items-center justify-between text-blue-600 mb-1">
                <span className="p-1.5 bg-blue-50 rounded-xl">
                  <GraduationCap className="w-4 h-4" />
                </span>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-md">
                  +12 this mo
                </span>
              </div>
              <p className="text-xl font-black text-slate-900">{students.length}</p>
              <p className="text-[11px] font-medium text-slate-500">Total Students</p>
            </div>

            <div
              onClick={() => setCurrentScreen('teachers')}
              className="bg-white p-3 rounded-2xl border border-slate-200/80 shadow-xs hover:border-blue-400 transition cursor-pointer"
            >
              <div className="flex items-center justify-between text-amber-600 mb-1">
                <span className="p-1.5 bg-amber-50 rounded-xl">
                  <Users className="w-4 h-4" />
                </span>
                <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded-md">
                  Active
                </span>
              </div>
              <p className="text-xl font-black text-slate-900">{teachers.length}</p>
              <p className="text-[11px] font-medium text-slate-500">Total Teachers</p>
            </div>

            <div
              onClick={() => setCurrentScreen('parents')}
              className="bg-white p-3 rounded-2xl border border-slate-200/80 shadow-xs hover:border-blue-400 transition cursor-pointer"
            >
              <div className="flex items-center justify-between text-purple-600 mb-1">
                <span className="p-1.5 bg-purple-50 rounded-xl">
                  <UserCheck className="w-4 h-4" />
                </span>
                <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded-md">
                  Connected
                </span>
              </div>
              <p className="text-xl font-black text-slate-900">{parents.length}</p>
              <p className="text-[11px] font-medium text-slate-500">Total Parents</p>
            </div>

            <div
              onClick={() => setCurrentScreen('materials')}
              className="bg-white p-3 rounded-2xl border border-slate-200/80 shadow-xs hover:border-blue-400 transition cursor-pointer"
            >
              <div className="flex items-center justify-between text-emerald-600 mb-1">
                <span className="p-1.5 bg-emerald-50 rounded-xl">
                  <FileText className="w-4 h-4" />
                </span>
                <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded-md">
                  PDF & Video
                </span>
              </div>
              <p className="text-xl font-black text-slate-900">{materials.length}</p>
              <p className="text-[11px] font-medium text-slate-500">Study Notes</p>
            </div>

            <div
              onClick={() => setCurrentScreen('tests')}
              className="bg-white p-3 rounded-2xl border border-slate-200/80 shadow-xs hover:border-blue-400 transition cursor-pointer"
            >
              <div className="flex items-center justify-between text-rose-600 mb-1">
                <span className="p-1.5 bg-rose-50 rounded-xl">
                  <Award className="w-4 h-4" />
                </span>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-md">
                  MCQ Tests
                </span>
              </div>
              <p className="text-xl font-black text-slate-900">{tests.length}</p>
              <p className="text-[11px] font-medium text-slate-500">Total Tests</p>
            </div>

            <div
              onClick={() => setCurrentScreen('timetable')}
              className="bg-white p-3 rounded-2xl border border-slate-200/80 shadow-xs hover:border-blue-400 transition cursor-pointer"
            >
              <div className="flex items-center justify-between text-indigo-600 mb-1">
                <span className="p-1.5 bg-indigo-50 rounded-xl">
                  <BookOpen className="w-4 h-4" />
                </span>
                <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded-md">
                  Batches
                </span>
              </div>
              <p className="text-xl font-black text-slate-900">8</p>
              <p className="text-[11px] font-medium text-slate-500">Total Classes</p>
            </div>
          </div>

          {/* Quick Actions Bar */}
          <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-xs">
            <h3 className="text-xs font-bold text-slate-900 mb-2.5 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-500" /> Admin Management Actions
              </span>
            </h3>

            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              <button
                onClick={() => setModalOpen('add_student')}
                className="p-2.5 bg-blue-50 text-blue-900 rounded-xl border border-blue-200/60 font-semibold text-xs flex items-center gap-2 hover:bg-blue-100 transition"
              >
                <UserPlus className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Add Student</span>
              </button>

              <button
                onClick={() => setModalOpen('add_teacher')}
                className="p-2.5 bg-amber-50 text-amber-950 rounded-xl border border-amber-200/60 font-semibold text-xs flex items-center gap-2 hover:bg-amber-100 transition"
              >
                <Plus className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Register Faculty</span>
              </button>

              <button
                onClick={() => setModalOpen('add_material')}
                className="p-2.5 bg-emerald-50 text-emerald-950 rounded-xl border border-emerald-200/60 font-semibold text-xs flex items-center gap-2 hover:bg-emerald-100 transition"
              >
                <FilePlus className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Upload Material</span>
              </button>

              <button
                onClick={() => setModalOpen('add_announcement')}
                className="p-2.5 bg-purple-50 text-purple-950 rounded-xl border border-purple-200/60 font-semibold text-xs flex items-center gap-2 hover:bg-purple-100 transition"
              >
                <Bell className="w-4 h-4 text-purple-600 shrink-0" />
                <span>Post Notice</span>
              </button>
            </div>
          </div>
        </>
      )}

      {/* TEACHER DASHBOARD */}
      {currentRole === 'teacher' && (
        <>
          {/* Teacher Quick Stats */}
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-xs">
              <span className="text-[10px] font-semibold text-slate-500">Classes Assigned</span>
              <p className="text-lg font-black text-blue-900 mt-0.5">3 Batches</p>
            </div>
            <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-xs">
              <span className="text-[10px] font-semibold text-slate-500">Notes Uploaded</span>
              <p className="text-lg font-black text-amber-600 mt-0.5">28 Files</p>
            </div>
            <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-xs">
              <span className="text-[10px] font-semibold text-slate-500">Avg Attendance</span>
              <p className="text-lg font-black text-emerald-600 mt-0.5">94%</p>
            </div>
          </div>

          {/* Teacher Quick Actions */}
          <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
            <h3 className="text-xs font-bold text-slate-900">Faculty Actions</h3>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setModalOpen('add_material')}
                className="p-3 bg-blue-900 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2"
              >
                <FilePlus className="w-4 h-4 text-amber-400" />
                <span>Upload Study Notes</span>
              </button>

              <button
                onClick={() => setModalOpen('add_test')}
                className="p-3 bg-amber-500 text-blue-950 rounded-xl text-xs font-bold flex items-center justify-center gap-2"
              >
                <Award className="w-4 h-4" />
                <span>Create MCQ Test</span>
              </button>

              <button
                onClick={() => setCurrentScreen('attendance')}
                className="p-3 bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2"
              >
                <CalendarCheck className="w-4 h-4" />
                <span>Mark Attendance</span>
              </button>

              <button
                onClick={() => setCurrentScreen('results')}
                className="p-3 bg-purple-600 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2"
              >
                <BarChart3 className="w-4 h-4" />
                <span>Publish Results</span>
              </button>
            </div>
          </div>
        </>
      )}

      {/* STUDENT DASHBOARD */}
      {currentRole === 'student' && (
        <>
          {/* Active Test Alert Box */}
          {tests.filter((t) => t.status === 'Active').length > 0 && (
            <div className="bg-gradient-to-r from-amber-500 to-yellow-400 p-3.5 rounded-2xl text-blue-950 shadow-md flex items-center justify-between">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider bg-blue-950 text-amber-300 px-2 py-0.5 rounded-full">
                  🔥 Active MCQ Test Live
                </span>
                <h3 className="font-extrabold text-sm mt-1">
                  {tests.filter((t) => t.status === 'Active')[0].title}
                </h3>
                <p className="text-[11px] font-medium text-blue-950/80">
                  Duration: {tests.filter((t) => t.status === 'Active')[0].durationMinutes} Mins • Total Marks: {tests.filter((t) => t.status === 'Active')[0].totalMarks}
                </p>
              </div>

              <button
                onClick={() => startTest(tests.filter((t) => t.status === 'Active')[0])}
                className="px-3.5 py-2 bg-blue-950 text-amber-300 font-extrabold text-xs rounded-xl shadow-md hover:bg-blue-900 transition shrink-0"
              >
                Start Test
              </button>
            </div>
          )}

          {/* Performance Quick Summary */}
          <div className="grid grid-cols-2 gap-2.5">
            <div
              onClick={() => setCurrentScreen('attendance')}
              className="bg-white p-3 rounded-2xl border border-slate-200 shadow-xs cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500">Attendance</span>
                <span className="text-xs font-extrabold text-emerald-600">94%</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full mt-2 overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: '94%' }} />
              </div>
              <p className="text-[10px] text-slate-400 mt-1">26 / 28 Days Present</p>
            </div>

            <div
              onClick={() => setCurrentScreen('results')}
              className="bg-white p-3 rounded-2xl border border-slate-200 shadow-xs cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500">Avg Test Rank</span>
                <span className="text-xs font-extrabold text-amber-600">Rank #4</span>
              </div>
              <p className="text-lg font-black text-slate-900 mt-1">88% Avg</p>
              <p className="text-[10px] text-slate-400">Class 12th JEE Batch</p>
            </div>
          </div>
        </>
      )}

      {/* PARENT DASHBOARD */}
      {currentRole === 'parent' && (
        <>
          <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs">
            <h3 className="text-xs font-bold text-slate-900 mb-2">Child Overview</h3>
            <div className="flex items-center gap-3 p-2.5 bg-blue-50/60 rounded-xl border border-blue-100">
              <img
                src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80"
                alt="Child"
                className="w-12 h-12 rounded-xl object-cover border-2 border-blue-600"
              />
              <div>
                <h4 className="font-extrabold text-sm text-slate-900">Aarav Patel</h4>
                <p className="text-xs text-slate-600">Class 12th • Roll No: CCC-1201</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md font-bold">
                    Attendance: 94%
                  </span>
                  <span className="text-[10px] bg-amber-100 text-amber-900 px-2 py-0.5 rounded-md font-bold">
                    Test Score: 88%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* RECENT STUDY MATERIALS SECTION */}
      <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
            <FileText className="w-4 h-4 text-blue-600" /> Recent Study Notes & Materials
          </h3>
          <button
            onClick={() => setCurrentScreen('materials')}
            className="text-[11px] font-bold text-blue-700 hover:underline flex items-center gap-0.5"
          >
            View All ({materials.length}) <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="space-y-2">
          {materials.slice(0, 3).map((mat) => (
            <div
              key={mat.id}
              className="p-2.5 rounded-xl border border-slate-100 bg-slate-50/50 flex items-center justify-between hover:bg-blue-50/40 transition"
            >
              <div className="flex items-center gap-2.5 overflow-hidden pr-2">
                <span className="p-2 rounded-lg bg-blue-100 text-blue-800 font-bold uppercase text-[10px] shrink-0">
                  {mat.fileType}
                </span>
                <div className="overflow-hidden">
                  <h4 className="text-xs font-bold text-slate-900 truncate">{mat.title}</h4>
                  <p className="text-[10px] text-slate-500">
                    {mat.subject} • {mat.className} • {mat.uploadDate}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setCurrentScreen('materials')}
                className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 hover:text-blue-700 shrink-0 shadow-xs"
              >
                <Download className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ANNOUNCEMENTS & ALERTS */}
      <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
            <Bell className="w-4 h-4 text-amber-500" /> Latest Announcements
          </h3>
          <button
            onClick={() => setCurrentScreen('announcements')}
            className="text-[11px] font-bold text-blue-700 hover:underline flex items-center gap-0.5"
          >
            All Notices <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="space-y-2">
          {announcements.slice(0, 2).map((anc) => (
            <div key={anc.id} className="p-3 bg-amber-50/50 rounded-xl border border-amber-200/50">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-amber-200 text-amber-900">
                  {anc.category}
                </span>
                <span className="text-[10px] text-slate-400">{anc.date}</span>
              </div>
              <h4 className="font-extrabold text-xs text-slate-900 mt-1.5">{anc.title}</h4>
              <p className="text-[11px] text-slate-600 mt-1 line-clamp-2">{anc.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ACTION MODALS */}
      {modalOpen === 'add_student' && <AddStudentModal onClose={() => setModalOpen(null)} />}
      {modalOpen === 'add_teacher' && <RegisterTeacherModal onClose={() => setModalOpen(null)} />}
      {modalOpen === 'add_material' && <AddMaterialModal onClose={() => setModalOpen(null)} />}
      {modalOpen === 'add_test' && <CreateTestModal onClose={() => setModalOpen(null)} />}
      {modalOpen === 'add_announcement' && <AddAnnouncementModal onClose={() => setModalOpen(null)} />}
    </div>
  );
};
