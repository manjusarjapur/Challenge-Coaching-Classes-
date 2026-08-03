import React, { useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, ArrowRight, ShieldCheck, GraduationCap } from 'lucide-react';

export const SplashScreen: React.FC = () => {
  const { setCurrentScreen } = useApp();

  return (
    <div className="flex-1 bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-950 text-white flex flex-col items-center justify-between p-6 relative overflow-hidden select-none">
      {/* Background Decorative Circles */}
      <div className="absolute -top-20 -left-20 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />

      {/* Top Tagline */}
      <div className="pt-8 text-center">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-semibold border border-amber-400/30">
          <Sparkles className="w-3.5 h-3.5" /> Premier Coaching Academy
        </span>
      </div>

      {/* Logo & Main Title */}
      <div className="flex flex-col items-center text-center my-auto">
        <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-amber-400 via-yellow-300 to-amber-500 flex items-center justify-center text-blue-950 font-black text-4xl shadow-2xl border-4 border-amber-200 mb-6 transform hover:scale-105 transition duration-300">
          CCC
        </div>

        <h1 className="text-3xl font-black tracking-tight text-white leading-tight">
          CHALLENGE
        </h1>
        <h2 className="text-xl font-bold text-amber-400 tracking-wider mt-0.5">
          COACHING CLASSES
        </h2>

        <p className="text-xs text-blue-200 mt-3 max-w-xs leading-relaxed font-medium">
          Empowering Future Engineers, Doctors & Achievers with Excellence in Learning.
        </p>

        {/* Feature Pills */}
        <div className="flex flex-wrap justify-center gap-2 mt-6">
          <span className="text-[10px] bg-white/10 px-2.5 py-1 rounded-full text-blue-100 flex items-center gap-1">
            <GraduationCap className="w-3 h-3 text-amber-400" /> Super Admin Portal
          </span>
          <span className="text-[10px] bg-white/10 px-2.5 py-1 rounded-full text-blue-100 flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-emerald-400" /> Online Test Engine
          </span>
        </div>
      </div>

      {/* Bottom CTA Button */}
      <div className="w-full pb-6 space-y-3">
        <button
          onClick={() => setCurrentScreen('welcome')}
          className="w-full py-3.5 px-6 bg-gradient-to-r from-amber-400 to-yellow-400 text-blue-950 font-extrabold rounded-2xl shadow-xl flex items-center justify-center gap-2 hover:from-amber-300 hover:to-yellow-300 active:scale-98 transition text-sm"
        >
          <span>Explore App & Portals</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <p className="text-[10px] text-center text-blue-300/70">
          Challenge Coaching Classes App v2.4 • Material Design 3
        </p>
      </div>
    </div>
  );
};
