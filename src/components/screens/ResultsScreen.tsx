import React, { useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import confetti from 'canvas-confetti';
import { Trophy, Award, CheckCircle, XCircle, Clock, RotateCcw, ArrowRight, BarChart3, Users, Sparkles } from 'lucide-react';

export const ResultsScreen: React.FC = () => {
  const { activeTestAttempt, testHistory, setCurrentScreen } = useApp();

  const attempt = activeTestAttempt || testHistory[0];

  useEffect(() => {
    if (attempt && attempt.percentage >= 60) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  }, [attempt]);

  if (!attempt) {
    return (
      <div className="flex-1 bg-slate-50 p-6 flex flex-col items-center justify-center text-center">
        <Trophy className="w-12 h-12 text-slate-300 mb-2" />
        <h3 className="font-bold text-sm text-slate-700">No Test Attempt Available</h3>
        <button
          onClick={() => setCurrentScreen('tests')}
          className="mt-4 px-4 py-2 bg-blue-900 text-white rounded-xl text-xs font-bold"
        >
          Go to Online Tests
        </button>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-slate-50 p-3.5 space-y-4 overflow-y-auto">
      {/* Celebration Header Card */}
      <div className="bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-950 text-white rounded-3xl p-5 text-center shadow-xl relative overflow-hidden">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-400/20 text-amber-300 rounded-full text-xs font-extrabold mb-3 border border-amber-400/30">
          <Sparkles className="w-3.5 h-3.5" /> Performance Report Analysis
        </div>

        <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-amber-400 to-yellow-300 mx-auto flex items-center justify-center text-blue-950 shadow-2xl border-4 border-amber-200 mb-3">
          <Trophy className="w-10 h-10" />
        </div>

        <h2 className="text-lg font-black">{attempt.testTitle}</h2>
        <p className="text-xs text-blue-200 mt-0.5">Submitted on {attempt.completedAt}</p>

        {/* Big Score Numbers */}
        <div className="mt-4 grid grid-cols-3 gap-2 bg-white/10 p-3 rounded-2xl border border-white/10 backdrop-blur-xs">
          <div>
            <span className="text-[10px] text-blue-200 font-semibold block">Score</span>
            <span className="text-xl font-black text-amber-400">
              {attempt.score} / {attempt.totalMarks}
            </span>
          </div>

          <div>
            <span className="text-[10px] text-blue-200 font-semibold block">Accuracy</span>
            <span className="text-xl font-black text-emerald-400">{attempt.percentage}%</span>
          </div>

          <div>
            <span className="text-[10px] text-blue-200 font-semibold block">All India Rank</span>
            <span className="text-xl font-black text-yellow-300">#{attempt.rank}</span>
          </div>
        </div>
      </div>

      {/* Class Leaderboard Rank Overview */}
      <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs space-y-2.5">
        <h3 className="text-xs font-extrabold text-slate-900 flex items-center gap-1.5">
          <Users className="w-4 h-4 text-amber-500" /> Leaderboard Rank Standings
        </h3>

        <div className="space-y-1.5 text-xs">
          <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200/60 flex items-center justify-between font-bold text-slate-900">
            <span className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-amber-400 text-blue-950 font-black text-[10px] flex items-center justify-center">
                1
              </span>
              <span>Ananya Gupta</span>
            </span>
            <span className="text-amber-800">100 / 100</span>
          </div>

          <div
            className={`p-2.5 rounded-xl flex items-center justify-between font-bold border ${
              attempt.rank <= 3 ? 'bg-blue-50 border-blue-200 text-blue-900' : 'bg-slate-50 border-slate-200 text-slate-800'
            }`}
          >
            <span className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-blue-900 text-white font-black text-[10px] flex items-center justify-center">
                {attempt.rank}
              </span>
              <span>Aarav Patel (You)</span>
            </span>
            <span className="text-blue-900">{attempt.score} / {attempt.totalMarks}</span>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between font-medium text-slate-600">
            <span className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-slate-300 text-slate-800 font-bold text-[10px] flex items-center justify-center">
                3
              </span>
              <span>Rohan Verma</span>
            </span>
            <span>80 / 100</span>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex items-center gap-2 pt-2">
        <button
          onClick={() => setCurrentScreen('tests')}
          className="flex-1 py-3 bg-blue-900 text-white font-extrabold rounded-2xl shadow-md text-xs flex items-center justify-center gap-1.5"
        >
          <span>Retake or More Tests</span>
          <ArrowRight className="w-4 h-4 text-amber-400" />
        </button>
      </div>
    </div>
  );
};
