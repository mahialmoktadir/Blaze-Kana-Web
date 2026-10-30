import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { storageService } from '../../services/storageService';
import { Calendar as CalendarIcon, Bell, Clock, Check, BellRing } from 'lucide-react';

export const CalendarView: React.FC = () => {
  const { settings, updateSettings } = useApp();

  const [notificationStatus, setNotificationStatus] = useState<string>(() => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      return Notification.permission;
    }
    return 'unsupported';
  });

  const [reminderTime, setReminderTime] = useState(settings.studyReminderTime || '20:00');
  const [reminderEnabled, setReminderEnabled] = useState(settings.studyReminderEnabled);

  const requestNotification = async () => {
    if (typeof window === 'undefined' || !('Notification' in window)) {
      alert('Browser notifications are not supported in this environment. In-app reminders will be used.');
      return;
    }

    try {
      const permission = await Notification.requestPermission();
      setNotificationStatus(permission);
      if (permission === 'granted') {
        new Notification('Blaze Kana', {
          body: 'Study reminders enabled! We will remind you at your chosen study time.',
          icon: '/favicon.ico'
        });
        setReminderEnabled(true);
        updateSettings({ studyReminderEnabled: true });
      }
    } catch (e) {
      console.warn('Notification permission error', e);
    }
  };

  const handleSaveSettings = () => {
    updateSettings({
      studyReminderTime: reminderTime,
      studyReminderEnabled: reminderEnabled,
    });
  };

  // Generate calendar days for current month
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const currentDay = today.getDate();

  const activities = storageService.getActivities();
  const activeDates = new Set(activities.map(a => a.date));

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* View Header */}
      <div className="pb-4 border-b border-stone-200 dark:border-stone-800">
        <h2 className="text-xl font-bold tracking-tight text-stone-900 dark:text-stone-100 flex items-center gap-2">
          <span>{settings.language === 'bn' ? 'অধ্যয়ন পঞ্জিকা ও অনুস্মারক' : 'Study Calendar & Reminders'}</span>
          <span className="text-xs px-2 py-0.5 rounded bg-[#C23A2B]/10 text-[#C23A2B] font-mono">
            Discipline
          </span>
        </h2>
        <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
          Configure daily study alarms, track study sessions on the calendar, and stay on course for your 30-day goal.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left: Monthly Activity Calendar */}
        <div className="md:col-span-7 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-6 space-y-4 shadow-xs">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100 uppercase tracking-wider flex items-center gap-2">
              <CalendarIcon className="w-4 h-4 text-[#C23A2B]" />
              <span>{today.toLocaleString('default', { month: 'long', year: 'numeric' })}</span>
            </h3>
            <span className="text-xs text-stone-400">
              {activities.length} Active Days
            </span>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-2 text-center text-xs">
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
              <span key={i} className="font-semibold text-stone-400 py-1">
                {d}
              </span>
            ))}

            {Array.from({ length: daysInMonth }).map((_, index) => {
              const dayNum = index + 1;
              const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`;
              const hasActivity = activeDates.has(dateStr);
              const isToday = dayNum === currentDay;

              let cellStyle = 'bg-stone-50 dark:bg-stone-800/60 text-stone-700 dark:text-stone-300';
              if (hasActivity) {
                cellStyle = 'bg-emerald-500 text-white font-bold shadow-xs';
              } else if (isToday) {
                cellStyle = 'border-2 border-[#C23A2B] text-[#C23A2B] font-bold';
              }

              return (
                <div
                  key={dayNum}
                  className={`aspect-square flex flex-col items-center justify-center rounded-xl text-xs transition-all ${cellStyle}`}
                >
                  <span>{dayNum}</span>
                </div>
              );
            })}
          </div>

          <div className="flex items-center gap-4 text-[11px] text-stone-500 pt-2 border-t border-stone-100 dark:border-stone-800">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-emerald-500" />
              <span>Study Logged</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded border border-[#C23A2B]" />
              <span>Today</span>
            </div>
          </div>
        </div>

        {/* Right: Daily Reminder Configuration */}
        <div className="md:col-span-5 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-6 space-y-5 shadow-xs">
          <div className="flex items-center gap-2">
            <BellRing className="w-5 h-5 text-[#C23A2B]" />
            <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100">
              Daily Study Reminder
            </h3>
          </div>

          <div className="space-y-4 text-xs">
            {/* Preferred Time Input */}
            <div className="space-y-1.5">
              <label className="font-semibold text-stone-700 dark:text-stone-300 block">
                Preferred Reminder Time
              </label>
              <input
                type="time"
                value={reminderTime}
                onChange={(e) => setReminderTime(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 font-mono"
              />
            </div>

            {/* Notification Permission Toggle */}
            <div className="p-4 bg-stone-50 dark:bg-stone-800/60 rounded-xl space-y-2 border border-stone-200 dark:border-stone-700">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-stone-800 dark:text-stone-200">
                  Browser Push Alarms
                </span>
                <span className="text-[10px] font-mono capitalize px-2 py-0.5 rounded bg-stone-200 dark:bg-stone-700">
                  {notificationStatus}
                </span>
              </div>
              <p className="text-[11px] text-stone-500 leading-relaxed">
                Receive a quiet reminder when it's time for your daily lesson.
              </p>
              {notificationStatus !== 'granted' && (
                <button
                  onClick={requestNotification}
                  className="w-full mt-2 py-2 text-xs font-semibold rounded-lg bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 hover:opacity-90"
                >
                  Enable Browser Notifications
                </button>
              )}
            </div>

            {/* In-App Reminder Note */}
            <div className="p-3 bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200/60 dark:border-rose-900/40 rounded-xl text-rose-800 dark:text-rose-200 text-[11px] leading-relaxed">
              <strong>In-App Fallback:</strong> If notifications are blocked or unsupported on your device, the app highlights your daily review quota upon opening.
            </div>

            <button
              onClick={handleSaveSettings}
              className="w-full py-2.5 text-xs font-semibold text-white bg-[#C23A2B] hover:bg-[#A82E21] rounded-xl shadow-xs transition-all"
            >
              Save Schedule Preferences
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
