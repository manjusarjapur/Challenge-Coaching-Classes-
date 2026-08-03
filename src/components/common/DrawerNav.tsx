import React from 'react';
import { useApp, ScreenType } from '../../context/AppContext';
import {
  X,
  Home,
  Users,
  GraduationCap,
  UserCheck,
  FileText,
  ClipboardList,
  Award,
  BarChart3,
  Calendar,
  Bell,
  Clock,
  User,
  Settings,
  Shield,
  Smartphone,
  ChevronRight,
  LogOut,
  Globe,
  Sparkles,
} from 'lucide-react';

export const DrawerNav: React.FC = () => {
  const {
    isDrawerOpen,
    setIsDrawerOpen,
    currentScreen,
    setCurrentScreen,
    currentUser,
    isMobileFrame,
    setIsMobileFrame,
  } = useApp();

  if (!isDrawerOpen) return null;

  const menuSections: {
    title: string;
    items: { id: ScreenType; label: string; icon: React.ReactNode }[];
  }[] = [
    {
      title: 'Academy Portal',
      items: [
        { id: 'landing', label: 'Public Website / Landing', icon: <Globe className="w-4 h-4 text-amber-500" /> },
        { id: 'dashboard', label: 'Home Dashboard', icon: <Home className="w-4 h-4" /> },
        { id: 'materials', label: 'Study Notes & Materials', icon: <FileText className="w-4 h-4" /> },
        { id: 'assignments', label: 'Assignments', icon: <ClipboardList className="w-4 h-4" /> },
        { id: 'tests', label: 'Online Tests & MCQ', icon: <Award className="w-4 h-4" /> },
        { id: 'results', label: 'Test Results & Ranks', icon: <BarChart3 className="w-4 h-4" /> },
        { id: 'attendance', label: 'Attendance Portal', icon: <Calendar className="w-4 h-4" /> },
      ],
    },
    {
      title: 'Directory & Roster',
      items: [
        { id: 'students', label: 'Students Roster', icon: <GraduationCap className="w-4 h-4" /> },
        { id: 'teachers', label: 'Teachers Directory', icon: <Users className="w-4 h-4" /> },
        { id: 'parents', label: 'Parents Connect', icon: <UserCheck className="w-4 h-4" /> },
      ],
    },
    {
      title: 'Academy & Analytics',
      items: [
        { id: 'announcements', label: 'Announcements & Alerts', icon: <Bell className="w-4 h-4" /> },
        { id: 'timetable', label: 'Class Timetable', icon: <Clock className="w-4 h-4" /> },
        { id: 'reports', label: 'Performance Analytics', icon: <BarChart3 className="w-4 h-4" /> },
      ],
    },
    {
      title: 'Account & Settings',
      items: [
        { id: 'profile', label: 'My Profile', icon: <User className="w-4 h-4" /> },
        { id: 'settings', label: 'App Settings', icon: <Settings className="w-4 h-4" /> },
      ],
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div
        onClick={() => setIsDrawerOpen(false)}
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
      />

      {/* Drawer Content */}
      <div className="relative w-80 max-w-[85vw] bg-white h-full shadow-2xl flex flex-col z-10 overflow-y-auto">
        {/* Header Header */}
        <div className="bg-gradient-to-br from-blue-900 via-blue-850 to-blue-950 p-4 text-white relative">
          <button
            onClick={() => setIsDrawerOpen(false)}
            className="absolute top-3 right-3 p-1 rounded-full bg-white/10 text-white hover:bg-white/20 transition"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3 mt-1">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 to-yellow-300 flex items-center justify-center text-blue-950 font-black text-xl shadow-lg border-2 border-amber-200">
              CCC
            </div>
            <div>
              <h2 className="font-extrabold text-base leading-tight">Challenge Coaching</h2>
              <p className="text-xs text-amber-300 font-medium">Classes & Academy</p>
            </div>
          </div>

          {/* User Info Card */}
          <div className="mt-4 pt-3 border-t border-blue-800/60 flex items-center gap-3">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-10 h-10 rounded-full object-cover border-2 border-amber-400 shadow-sm"
            />
            <div className="overflow-hidden">
              <p className="text-xs font-black truncate text-white">{currentUser.name}</p>
              <p className="text-[10px] text-amber-300 font-bold flex items-center gap-1">
                <Shield className="w-3 h-3 text-amber-400" />
                Super Admin Account
              </p>
            </div>
          </div>
        </div>

        {/* Real-time Status Badge */}
        <div className="p-2.5 bg-emerald-50 border-b border-emerald-100 flex items-center justify-between text-xs font-bold text-emerald-900">
          <span className="flex items-center gap-2 text-[11px]">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Firestore Real-Time Data</span>
          </span>
          <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-extrabold">
            ACTIVE
          </span>
        </div>

        {/* Menu Items */}
        <div className="p-3 space-y-4 flex-1">
          {menuSections.map((sec, idx) => (
            <div key={idx}>
              <h3 className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                {sec.title}
              </h3>
              <div className="space-y-0.5">
                {sec.items.map((item) => {
                  const isActive = currentScreen === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setCurrentScreen(item.id);
                        setIsDrawerOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium flex items-center justify-between transition ${
                        isActive
                          ? 'bg-blue-600 text-white font-bold shadow-md'
                          : 'text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className={isActive ? 'text-amber-300' : 'text-slate-500'}>
                          {item.icon}
                        </span>
                        <span>{item.label}</span>
                      </div>
                      <ChevronRight
                        className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-300'}`}
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Footer Controls */}
        <div className="p-3 border-t border-slate-100 bg-slate-50 space-y-2">
          <button
            onClick={() => {
              setIsMobileFrame(!isMobileFrame);
              setIsDrawerOpen(false);
            }}
            className="w-full text-left px-3 py-2 rounded-xl text-xs font-medium text-slate-700 hover:bg-slate-200/80 flex items-center gap-2"
          >
            <Smartphone className="w-4 h-4 text-blue-600" />
            <span>
              {isMobileFrame ? 'Switch to Desktop Mode' : 'Switch to Mobile Frame'}
            </span>
          </button>

          <button
            onClick={() => {
              setCurrentScreen('welcome');
              setIsDrawerOpen(false);
            }}
            className="w-full text-left px-3 py-2 rounded-xl text-xs font-medium text-slate-700 hover:bg-slate-200/80 flex items-center gap-2"
          >
            <LogOut className="w-4 h-4 text-rose-600" />
            <span>Portal Security Lock</span>
          </button>

          <div className="text-[10px] text-center text-slate-400 pt-1">
            Challenge Coaching Classes v2.4 • Material 3
          </div>
        </div>
      </div>
    </div>
  );
};

