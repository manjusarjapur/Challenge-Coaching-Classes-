import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Settings, Bell, Moon, Smartphone, Shield, HelpCircle, Check, RefreshCw } from 'lucide-react';

export const SettingsScreen: React.FC = () => {
  const { isMobileFrame, setIsMobileFrame, showToast, setCurrentScreen } = useApp();

  const [pushNotifs, setPushNotifs] = useState(true);
  const [examAlerts, setExamAlerts] = useState(true);

  return (
    <div className="flex-1 bg-slate-50 p-3.5 space-y-4 overflow-y-auto">
      {/* Header */}
      <div>
        <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
          <Settings className="w-5 h-5 text-blue-900" /> Settings & Configuration
        </h2>
        <p className="text-[11px] text-slate-500">
          Preferences, Notifications & App Controls
        </p>
      </div>

      {/* Notifications Group */}
      <div className="bg-white rounded-2xl p-3.5 border border-slate-200/80 shadow-xs space-y-3 text-xs">
        <h3 className="font-extrabold text-slate-900 flex items-center gap-1.5">
          <Bell className="w-4 h-4 text-amber-500" /> Notifications & Alerts
        </h3>

        <div className="space-y-2">
          <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl">
            <div>
              <span className="font-bold text-slate-800 block">Push Notifications</span>
              <span className="text-[10px] text-slate-500">Get alerts for new notes & notices</span>
            </div>
            <button
              onClick={() => {
                setPushNotifs(!pushNotifs);
                showToast(`Push notifications ${!pushNotifs ? 'enabled' : 'disabled'}`);
              }}
              className={`w-11 h-6 rounded-full transition p-0.5 ${
                pushNotifs ? 'bg-blue-900' : 'bg-slate-300'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition transform ${
                  pushNotifs ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl">
            <div>
              <span className="font-bold text-slate-800 block">Exam & Test Reminders</span>
              <span className="text-[10px] text-slate-500">SMS / App alert before test countdown</span>
            </div>
            <button
              onClick={() => {
                setExamAlerts(!examAlerts);
                showToast(`Exam reminders ${!examAlerts ? 'enabled' : 'disabled'}`);
              }}
              className={`w-11 h-6 rounded-full transition p-0.5 ${
                examAlerts ? 'bg-blue-900' : 'bg-slate-300'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition transform ${
                  examAlerts ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Display & Layout Settings */}
      <div className="bg-white rounded-2xl p-3.5 border border-slate-200/80 shadow-xs space-y-3 text-xs">
        <h3 className="font-extrabold text-slate-900 flex items-center gap-1.5">
          <Smartphone className="w-4 h-4 text-blue-900" /> Frame & Display Simulator Mode
        </h3>

        <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl">
          <div>
            <span className="font-bold text-slate-800 block">Mobile Frame View</span>
            <span className="text-[10px] text-slate-500">Toggle mobile phone container vs wide view</span>
          </div>
          <button
            onClick={() => {
              setIsMobileFrame(!isMobileFrame);
              showToast(`Switched view mode`);
            }}
            className={`px-3 py-1.5 rounded-xl font-bold text-xs ${
              isMobileFrame ? 'bg-amber-400 text-blue-950' : 'bg-slate-200 text-slate-700'
            }`}
          >
            {isMobileFrame ? 'Mobile' : 'Desktop'}
          </button>
        </div>
      </div>

      {/* App Branding & Support */}
      <div className="bg-white rounded-2xl p-3.5 border border-slate-200/80 shadow-xs space-y-2 text-xs">
        <h3 className="font-extrabold text-slate-900">About Challenge Coaching</h3>
        <p className="text-slate-500 text-[11px]">
          Challenge Coaching Classes Application • Version 2.4 (Material Design 3)
        </p>
        <p className="text-[11px] text-blue-800 font-medium">
          Support Email: support@challengecoaching.com
        </p>
      </div>
    </div>
  );
};
