import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle, Info } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toastMessage } = useApp();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-16 left-1/2 -translate-x-1/2 z-50 max-w-xs w-full px-4">
      <div className="bg-slate-900 text-white text-xs px-4 py-2.5 rounded-2xl shadow-2xl flex items-center gap-2 border border-slate-700 animate-bounce">
        <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
        <span className="font-medium text-slate-100">{toastMessage}</span>
      </div>
    </div>
  );
};
