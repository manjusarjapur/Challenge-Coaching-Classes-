import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Menu,
  Bell,
  Search,
  Smartphone,
  Monitor,
  Globe,
  Sparkles,
  X,
  Crown,
} from 'lucide-react';

export const Header: React.FC = () => {
  const {
    currentUser,
    setIsDrawerOpen,
    isMobileFrame,
    setIsMobileFrame,
    searchQuery,
    setSearchQuery,
    setCurrentScreen,
  } = useApp();

  const [isSearchOpen, setIsSearchOpen] = useState(false);

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

        {/* Right: Landing Button, Admin Badge, Search, Frame Toggle */}
        <div className="flex items-center gap-1.5">
          {/* Public Website / Landing Page Link */}
          <button
            onClick={() => setCurrentScreen('landing')}
            className="hidden sm:flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-blue-800 hover:bg-blue-700 text-amber-300 border border-amber-400/30 transition shadow-xs"
            title="View Public Landing Page"
          >
            <Globe className="w-3.5 h-3.5 text-amber-300" />
            <span>Website</span>
          </button>

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

          {/* Super Admin User Badge */}
          <div
            onClick={() => setCurrentScreen('profile')}
            className="flex items-center gap-1.5 text-[11px] font-extrabold px-2.5 py-1 rounded-full bg-amber-400 text-blue-950 border border-amber-300 cursor-pointer shadow-xs hover:bg-amber-300 transition"
            title={`Logged in as ${currentUser.name}`}
          >
            <Crown className="w-3.5 h-3.5 text-blue-950" />
            <span className="truncate max-w-[100px] sm:max-w-none">{currentUser.name.split(' ')[0]}</span>
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

