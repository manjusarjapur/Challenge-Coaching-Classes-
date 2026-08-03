import React from 'react';
import { useApp } from '../../context/AppContext';
import { User, Mail, Phone, Shield, Globe, Settings, Lock, CheckCircle, Crown } from 'lucide-react';

export const ProfileScreen: React.FC = () => {
  const { currentUser, setCurrentScreen } = useApp();

  return (
    <div className="flex-1 bg-slate-50 p-3.5 space-y-4 overflow-y-auto">
      {/* Profile Header Card */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs text-center space-y-3 relative overflow-hidden">
        <div className="w-20 h-20 rounded-3xl overflow-hidden border-4 border-amber-400 mx-auto shadow-md relative">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div>
          <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider bg-amber-400 text-blue-950 px-3 py-1 rounded-full shadow-xs">
            <Crown className="w-3 h-3" /> SUPER ADMIN & DIRECTOR
          </span>
          <h2 className="text-lg font-black text-slate-900 mt-2">{currentUser.name}</h2>
          <p className="text-xs text-slate-500 font-medium">{currentUser.email}</p>
        </div>

        <div className="pt-2 border-t border-slate-100 grid grid-cols-2 gap-2 text-center text-xs font-semibold">
          <div className="bg-slate-50 p-2 rounded-xl">
            <span className="text-slate-400 text-[10px] block">Role ID</span>
            <span className="font-bold text-slate-800">SUPER_ADMIN_01</span>
          </div>
          <div className="bg-slate-50 p-2 rounded-xl">
            <span className="text-slate-400 text-[10px] block">Academy Title</span>
            <span className="font-bold text-slate-800">
              {currentUser.department || 'Director & Managing Head'}
            </span>
          </div>
        </div>
      </div>

      {/* Profile Details List */}
      <div className="bg-white rounded-2xl p-3.5 border border-slate-200/80 shadow-xs space-y-3 text-xs">
        <h3 className="font-extrabold text-slate-900 flex items-center gap-1.5">
          <User className="w-4 h-4 text-blue-900" /> Account Contact Information
        </h3>

        <div className="space-y-2">
          <div className="p-2.5 bg-slate-50 rounded-xl flex items-center justify-between">
            <span className="text-slate-500 flex items-center gap-2">
              <Mail className="w-4 h-4 text-slate-400" /> Email Address
            </span>
            <span className="font-bold text-slate-800">{currentUser.email}</span>
          </div>

          <div className="p-2.5 bg-slate-50 rounded-xl flex items-center justify-between">
            <span className="text-slate-500 flex items-center gap-2">
              <Phone className="w-4 h-4 text-slate-400" /> Phone Number
            </span>
            <span className="font-bold text-slate-800">{currentUser.phone}</span>
          </div>

          <div className="p-2.5 bg-slate-50 rounded-xl flex items-center justify-between">
            <span className="text-slate-500 flex items-center gap-2">
              <Shield className="w-4 h-4 text-slate-400" /> Status
            </span>
            <span className="font-bold text-emerald-600 flex items-center gap-1">
              <CheckCircle className="w-3.5 h-3.5" /> Super Admin Authorized
            </span>
          </div>
        </div>
      </div>

      {/* Navigation Actions */}
      <div className="space-y-2">
        <button
          onClick={() => setCurrentScreen('landing')}
          className="w-full py-3 bg-blue-900 text-white font-extrabold rounded-2xl shadow-md text-xs flex items-center justify-center gap-2 hover:bg-blue-800 transition"
        >
          <Globe className="w-4 h-4 text-amber-400" /> Public Website / Landing Page
        </button>

        <button
          onClick={() => setCurrentScreen('settings')}
          className="w-full py-3 bg-white border border-slate-200 text-slate-800 font-extrabold rounded-2xl shadow-xs text-xs flex items-center justify-center gap-2 hover:bg-slate-100"
        >
          <Settings className="w-4 h-4 text-slate-600" /> App Settings & Database Sync
        </button>
      </div>
    </div>
  );
};

