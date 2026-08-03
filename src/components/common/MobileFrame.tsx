import React from 'react';
import { useApp } from '../../context/AppContext';
import { Wifi, Signal, Battery, Smartphone, Monitor } from 'lucide-react';

interface MobileFrameProps {
  children: React.ReactNode;
}

export const MobileFrame: React.FC<MobileFrameProps> = ({ children }) => {
  const { isMobileFrame, setIsMobileFrame } = useApp();

  const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  if (!isMobileFrame) {
    return (
      <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
        <div className="w-full max-w-6xl mx-auto my-0 sm:my-4 bg-white min-h-screen sm:min-h-[92vh] sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-slate-200">
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 py-4 sm:py-8 px-2 flex flex-col items-center justify-center font-sans">
      {/* Top Controls Banner */}
      <div className="mb-3 flex items-center justify-between w-full max-w-md px-2 text-slate-300 text-xs">
        <span className="font-semibold text-amber-400 flex items-center gap-1.5">
          <Smartphone className="w-4 h-4" /> Android App Preview
        </span>
        <button
          onClick={() => setIsMobileFrame(false)}
          className="hover:text-white underline flex items-center gap-1 text-[11px]"
        >
          <Monitor className="w-3.5 h-3.5" /> Full Width View
        </button>
      </div>

      {/* Phone Hardware Mock Container */}
      <div className="w-full max-w-[420px] bg-slate-950 rounded-[44px] p-3 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] border-4 border-slate-800 relative overflow-hidden">
        {/* Mobile Camera Notch */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-32 h-5 bg-slate-950 rounded-b-2xl z-40 flex items-center justify-center">
          <div className="w-3 h-3 rounded-full bg-slate-800 mr-2 border border-slate-700" />
          <div className="w-2 h-2 rounded-full bg-blue-900" />
        </div>

        {/* Screen Content Wrapper */}
        <div className="w-full h-[840px] max-h-[88vh] bg-slate-50 rounded-[34px] overflow-hidden flex flex-col relative border border-slate-800">
          {/* Status Bar */}
          <div className="bg-blue-900 text-white text-[11px] px-6 pt-2 pb-1 flex items-center justify-between select-none z-30 font-medium">
            <span>{currentTime}</span>
            <div className="flex items-center gap-1.5">
              <Signal className="w-3 h-3" />
              <Wifi className="w-3 h-3" />
              <Battery className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Main App Canvas */}
          <div className="flex-1 flex flex-col overflow-hidden relative">
            {children}
          </div>

          {/* Android Bottom Gesture Bar */}
          <div className="bg-slate-900 py-1.5 flex items-center justify-center z-30">
            <div className="w-32 h-1 bg-slate-600 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};
