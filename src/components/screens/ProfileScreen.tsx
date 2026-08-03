import React from 'react';
import { useApp } from '../../context/AppContext';
import { User, Mail, Phone, Shield, GraduationCap, LogOut, Settings, Award, CheckCircle } from 'lucide-react';

export const ProfileScreen: React.FC = () => {
  const { currentUser, currentRole, setRole, setCurrentScreen } = useApp();

  return (
    <div className="flex-1 bg-slate-50 p-3.5 space-y-4 overflow-y-auto">
      {/* Profile Header Card */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs text-center space-y-3 relative overflow-hidden">
        <div className="w-20 h-20 rounded-3xl overflow-hidden border-4 border-amber-400 mx-auto shadow-md">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-wider bg-blue-900 text-amber-300 px-3 py-1 rounded-full">
            {currentRole.replace('_', ' ')}
          </span>
          <h2 className="text-lg font-black text-slate-900 mt-2">{currentUser.name}</h2>
          <p className="text-xs text-slate-500 font-medium">{currentUser.email}</p>
        </div>

        <div className="pt-2 border-t border-slate-100 grid grid-cols-2 gap-2 text-center text-xs font-semibold">
          <div className="bg-slate-50 p-2 rounded-xl">
            <span className="text-slate-400 text-[10px] block">Role ID</span>
            <span className="font-bold text-slate-800">{currentUser.id}</span>
          </div>
          <div className="bg-slate-50 p-2 rounded-xl">
            <span className="text-slate-400 text-[10px] block">Assignment</span>
            <span className="font-bold text-slate-800">
              {currentUser.className || currentUser.department || 'Active'}
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
              <CheckCircle className="w-3.5 h-3.5" /> Verified Profile
            </span>
          </div>
        </div>
      </div>

      {/* Switch Portal or Settings */}
      <div className="space-y-2">
        <button
          onClick={() => setCurrentScreen('settings')}
          className="w-full py-3 bg-white border border-slate-200 text-slate-800 font-extrabold rounded-2xl shadow-xs text-xs flex items-center justify-center gap-2 hover:bg-slate-100"
        >
          <Settings className="w-4 h-4 text-slate-600" /> App Settings & Preferences
        </button>

        <button
          onClick={() => setCurrentScreen('welcome')}
          className="w-full py-3 bg-rose-50 text-rose-700 font-extrabold rounded-2xl border border-rose-200 text-xs flex items-center justify-center gap-2 hover:bg-rose-100"
        >
          <LogOut className="w-4 h-4" /> Logout / Switch Portal
        </button>
      </div>
    </div>
  );
};
