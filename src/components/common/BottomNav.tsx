import React from 'react';
import { useApp, ScreenType } from '../../context/AppContext';
import { Home, FileText, Award, CalendarCheck, User } from 'lucide-react';

export const BottomNav: React.FC = () => {
  const { currentScreen, setCurrentScreen } = useApp();

  const navItems: { id: ScreenType; label: string; icon: React.ReactNode }[] = [
    { id: 'dashboard', label: 'Home', icon: <Home className="w-5 h-5" /> },
    { id: 'materials', label: 'Notes', icon: <FileText className="w-5 h-5" /> },
    { id: 'tests', label: 'Tests', icon: <Award className="w-5 h-5" /> },
    { id: 'attendance', label: 'Attendance', icon: <CalendarCheck className="w-5 h-5" /> },
    { id: 'profile', label: 'Profile', icon: <User className="w-5 h-5" /> },
  ];

  if (currentScreen === 'splash' || currentScreen === 'welcome') return null;

  return (
    <nav className="bg-white border-t border-slate-200 px-2 py-1.5 flex items-center justify-around z-20 shadow-lg">
      {navItems.map((item) => {
        const isActive = currentScreen === item.id;
        return (
          <button
            key={item.id}
            onClick={() => setCurrentScreen(item.id)}
            className={`flex flex-col items-center py-1 px-3 rounded-2xl transition-all duration-200 ${
              isActive
                ? 'text-blue-900 bg-blue-50 font-bold scale-105'
                : 'text-slate-500 hover:text-blue-700'
            }`}
          >
            <div className={`p-1 rounded-xl ${isActive ? 'bg-amber-400 text-blue-950 shadow-sm' : ''}`}>
              {item.icon}
            </div>
            <span className="text-[10px] tracking-tight mt-0.5">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
