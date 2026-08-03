import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Shield, ArrowRight, CheckCircle2, Globe, Mail, Lock, Sparkles } from 'lucide-react';

export const WelcomeScreen: React.FC = () => {
  const { setCurrentScreen, currentUser, showToast } = useApp();
  const [email, setEmail] = useState('manjunathsarjapur1995@gmail.com');
  const [password, setPassword] = useState('••••••••••••');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    showToast(`Welcome back Super Admin ${currentUser.name}!`);
    setCurrentScreen('dashboard');
  };

  return (
    <div className="flex-1 bg-gradient-to-b from-blue-900 via-blue-950 to-slate-950 p-5 flex flex-col justify-between overflow-y-auto text-white">
      <div>
        {/* Header Branding */}
        <div className="text-center my-6">
          <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-amber-400 to-yellow-300 flex items-center justify-center text-blue-950 font-black text-2xl mx-auto shadow-xl border-2 border-amber-200">
            CCC
          </div>
          <h2 className="text-2xl font-black mt-3 text-white tracking-tight">
            Challenge Coaching Classes
          </h2>
          <p className="text-xs text-amber-300 font-semibold mt-0.5">
            Academy Management System • Super Admin Portal
          </p>
        </div>

        {/* Super Admin Login Card */}
        <form onSubmit={handleLogin} className="bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-3xl shadow-2xl space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-white/10">
            <div className="p-2 bg-amber-400/20 text-amber-300 rounded-xl">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-white">Super Admin Access</h3>
              <p className="text-[11px] text-blue-200">Logged in as Manjunath Sarjapur</p>
            </div>
            <span className="ml-auto text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-amber-400 text-blue-950">
              DIRECTOR
            </span>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-blue-200 uppercase mb-1">
              Email Address
            </label>
            <div className="flex items-center bg-blue-900/60 border border-blue-700/60 rounded-xl px-3 py-2 text-xs text-white">
              <Mail className="w-4 h-4 text-amber-400 mr-2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-transparent w-full focus:outline-none font-medium"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-blue-200 uppercase mb-1">
              Password
            </label>
            <div className="flex items-center bg-blue-900/60 border border-blue-700/60 rounded-xl px-3 py-2 text-xs text-white">
              <Lock className="w-4 h-4 text-amber-400 mr-2" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-transparent w-full focus:outline-none font-medium"
                required
              />
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-400/20 flex items-center gap-2 text-[11px] text-emerald-300 font-medium">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Firestore real-time database active & ready.</span>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-gradient-to-r from-amber-400 to-yellow-300 text-blue-950 font-extrabold rounded-xl shadow-lg hover:from-amber-300 hover:to-yellow-200 transition flex items-center justify-center gap-2 text-xs uppercase tracking-wider cursor-pointer"
          >
            <span>Enter Super Admin Portal</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>

      {/* Public Landing Link CTA */}
      <div className="mt-6 pt-4 border-t border-white/10 text-center space-y-2">
        <button
          onClick={() => setCurrentScreen('landing')}
          className="w-full py-3 px-4 bg-white/10 hover:bg-white/20 text-amber-300 font-bold rounded-2xl border border-white/15 transition flex items-center justify-center gap-2 text-xs"
        >
          <Globe className="w-4 h-4 text-amber-400" />
          <span>View Public Landing Page & Academy Website</span>
        </button>
        <p className="text-[10px] text-blue-300">
          Challenge Coaching Classes • Director Portal
        </p>
      </div>
    </div>
  );
};

