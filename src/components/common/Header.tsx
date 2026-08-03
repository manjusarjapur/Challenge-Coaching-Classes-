import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Menu,
  Bell,
  Search,
  Smartphone,
  Monitor,
  UserCheck,
  GraduationCap,
  Sparkles,
  X,
} from 'lucide-react';
import { UserRole } from '../../types';

export const Header: React.FC = () => {
  const {
    currentRole,
    setRole,
    currentUser,
    setIsDrawerOpen,
    isMobileFrame,
    setIsMobileFrame,
    searchQuery,
    setSearchQuery,
    currentScreen,
    setCurrentScreen,
  } = useApp();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);

  const roleLabels: Record<UserRole, { label: string; color: string; icon: string }> = {
    super_admin: { label: 'Admin', color: 'bg-amber-500 text-white', icon: '👑' },
    teacher: { label: 'Teacher', color: 'bg-blue-600 text-white', icon: '👨‍🏫' },
    student: { label: 'Student', color: 'bg-emerald-600 text-white', icon: '🎓' },
    parent: { label: 'Parent', color: 'bg-purple-600 text-white', icon: '👨‍👩‍👦' },
  };

  return (
    <header className="sticky top-0 z-30 bg-blue-900 text-white shadow-md">
      <div className="px-3 py-2.5 flex items-center justify-between gap-2">
        {/* Left: Drawer Menu & Branding */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="p-1.5 rounded-full hover:bg-blue-800 transition text-blue-100"
            title="Open Drawer Navigation"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div
            onClick={() => setCurrentScreen('dashboard')}
            className="flex items-center gap-2 cursor-pointer select-none"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-400 to-yellow-300 flex items-center justify-center text-blue-950 font-black text-xs shadow-md border border-amber-200/50">
              CCC
            </div>
            <div>
              <h1 className="font-bold text-sm leading-tight text-white flex items-center gap-1">
                Challenge
                <span className="text-amber-400 text-xs font-semibold px-1 rounded bg-amber-400/20">
                  Coaching
                </span>
              </h1>
              <p className="text-[10px] text-blue-200/90 leading-none">Aim High, Achieve Higher</p>
            </div>
          </div>
        </div>

        {/* Right: Search, Role Switcher, Frame Toggle, Profile */}
        <div className="flex items-center gap-1.5">
          {/* Quick Search Toggle */}
          {isSearchOpen ? (
            <div className="flex items-center bg-blue-800/80 rounded-full px-2 py-0.5 border border-blue-700">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent text-xs text-white placeholder-blue-300 focus:outline-none w-24 sm:w-32"
                autoFocus
              />
              <button
                onClick={() => {
                  setIsSearchOpen(false);
                  setSearchQuery('');
                }}
                className="p-1 text-blue-300 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-1.5 rounded-full hover:bg-blue-800 transition text-blue-200"
              title="Search"
            >
              <Search className="w-4 h-4" />
            </button>
          )}

          {/* Role Switcher Pill */}
          <div className="relative">
            <button
              onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
              className={`flex items-center gap-1 text-[11px] font-medium px-2 py-1 rounded-full shadow-sm transition border border-white/20 ${roleLabels[currentRole].color}`}
            >
              <span>{roleLabels[currentRole].icon}</span>
              <span className="hidden xs:inline">{roleLabels[currentRole].label}</span>
            </button>

            {isRoleDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-2xl py-2 z-50 text-slate-800 border border-slate-100">
                <div className="px-3 py-1.5 border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Switch User Portal
                </div>
                {(['super_admin', 'teacher', 'student', 'parent'] as UserRole[]).map((r) => (
                  <button
                    key={r}
                    onClick={() => {
                      setRole(r);
                      setIsRoleDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-blue-50 transition ${
                      currentRole === r ? 'font-bold text-blue-700 bg-blue-50/50' : 'text-slate-700'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span>{roleLabels[r].icon}</span>
                      <span>{roleLabels[r].label} Portal</span>
                    </span>
                    {currentRole === r && <UserCheck className="w-3.5 h-3.5 text-blue-600" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Device Simulator Toggle */}
          <button
            onClick={() => setIsMobileFrame(!isMobileFrame)}
            className="p-1.5 rounded-full hover:bg-blue-800 transition text-amber-300"
            title={isMobileFrame ? 'Switch to Full Web View' : 'Switch to Mobile Frame View'}
          >
            {isMobileFrame ? <Monitor className="w-4 h-4" /> : <Smartphone className="w-4 h-4" />}
          </button>

          {/* Notifications */}
          <button
            onClick={() => setCurrentScreen('announcements')}
            className="p-1.5 rounded-full hover:bg-blue-800 transition text-blue-200 relative"
            title="Announcements & Alerts"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-amber-400" />
          </button>
        </div>
      </div>
    </header>
  );
};
