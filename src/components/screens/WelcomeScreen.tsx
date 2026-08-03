import React from 'react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';
import { Shield, Users, GraduationCap, UserCheck, ArrowRight, CheckCircle2 } from 'lucide-react';

export const WelcomeScreen: React.FC = () => {
  const { setRole, setCurrentScreen, currentRole } = useApp();

  const rolesList: {
    id: UserRole;
    title: string;
    description: string;
    icon: React.ReactNode;
    color: string;
    badge: string;
  }[] = [
    {
      id: 'super_admin',
      title: 'Super Admin Portal',
      description: 'Manage students, teachers, parents, classes, upload materials & announcements.',
      icon: <Shield className="w-6 h-6 text-amber-500" />,
      color: 'border-amber-400 bg-amber-50/50',
      badge: 'Director & Admin',
    },
    {
      id: 'teacher',
      title: 'Teacher Portal',
      description: 'View assigned batches, upload study notes, create MCQ tests, mark attendance.',
      icon: <Users className="w-6 h-6 text-blue-600" />,
      color: 'border-blue-400 bg-blue-50/50',
      badge: 'Faculty',
    },
    {
      id: 'student',
      title: 'Student Portal',
      description: 'View timetable, study notes, take live online MCQ tests, check results & attendance.',
      icon: <GraduationCap className="w-6 h-6 text-emerald-600" />,
      color: 'border-emerald-400 bg-emerald-50/50',
      badge: 'Learner',
    },
    {
      id: 'parent',
      title: 'Parent Portal',
      description: "Monitor child's attendance, test scores, download study notes, contact teachers.",
      icon: <UserCheck className="w-6 h-6 text-purple-600" />,
      color: 'border-purple-400 bg-purple-50/50',
      badge: 'Guardian',
    },
  ];

  return (
    <div className="flex-1 bg-slate-50 p-4 flex flex-col justify-between overflow-y-auto">
      <div>
        {/* Header */}
        <div className="text-center my-4">
          <div className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-900 rounded-full text-[11px] font-bold mb-2">
            Welcome to Challenge Coaching
          </div>
          <h2 className="text-xl font-extrabold text-slate-900">Select User Role</h2>
          <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
            Choose a profile portal below to explore complete interactive features and sample data.
          </p>
        </div>

        {/* Role Options */}
        <div className="space-y-3 mt-4">
          {rolesList.map((r) => {
            const isSelected = currentRole === r.id;
            return (
              <div
                key={r.id}
                onClick={() => setRole(r.id)}
                className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer shadow-xs flex items-start gap-3 relative ${
                  isSelected
                    ? `${r.color} ring-2 ring-blue-500/20 shadow-md`
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="p-2.5 rounded-xl bg-white shadow-xs border border-slate-100">
                  {r.icon}
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-sm text-slate-900">{r.title}</h3>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-200 text-slate-700">
                      {r.badge}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1 leading-snug">{r.description}</p>
                </div>

                {isSelected && (
                  <CheckCircle2 className="w-5 h-5 text-blue-600 absolute top-3 right-3" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Action CTA */}
      <div className="mt-6 pt-3 border-t border-slate-200">
        <button
          onClick={() => setCurrentScreen('dashboard')}
          className="w-full py-3.5 px-6 bg-blue-900 text-white font-extrabold rounded-2xl shadow-lg flex items-center justify-center gap-2 hover:bg-blue-800 transition text-sm"
        >
          <span>Enter {currentRole.replace('_', ' ').toUpperCase()} Dashboard</span>
          <ArrowRight className="w-4 h-4 text-amber-400" />
        </button>
      </div>
    </div>
  );
};
