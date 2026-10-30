import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { storageService } from '../../services/storageService';
import { 
  Settings as SettingsIcon, 
  Globe, 
  Moon, 
  Sun, 
  Volume2, 
  Download, 
  Upload, 
  Trash2, 
  ShieldCheck, 
  Check 
} from 'lucide-react';

export const SettingsView: React.FC = () => {
  const { settings, updateSettings, resetAll } = useApp();
  const [resetConfirm, setResetConfirm] = useState(false);
  const [importMessage, setImportMessage] = useState<string | null>(null);

  const handleExport = () => {
    const data = storageService.exportData();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `blaze-kana-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const res = storageService.importData(content);
      setImportMessage(res.message);
      if (res.success) {
        setTimeout(() => window.location.reload(), 1200);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* View Header */}
      <div className="pb-4 border-b border-stone-200 dark:border-stone-800">
        <h2 className="text-xl font-bold tracking-tight text-stone-900 dark:text-stone-100 flex items-center gap-2">
          <span>{settings.language === 'bn' ? 'অ্যাপ্লিকেশন সেটিংস' : 'Application Settings'}</span>
          <span className="text-xs px-2 py-0.5 rounded bg-[#C23A2B]/10 text-[#C23A2B] font-mono">
            Preferences
          </span>
        </h2>
        <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
          Customize interface language, dark mode theme, Romaji assistance, and backup your learning progress.
        </p>
      </div>

      <div className="space-y-4">
        {/* Interface Language */}
        <div className="p-5 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-0.5">
            <span className="text-sm font-bold text-stone-900 dark:text-stone-100 block">
              Interface Language (ভাষা)
            </span>
            <span className="text-xs text-stone-500">
              Select between English, Bengali explanations, or Japanese
            </span>
          </div>

          <div className="flex items-center gap-1.5 p-1 bg-stone-100 dark:bg-stone-800 rounded-xl">
            {[
              { code: 'en', label: 'English' },
              { code: 'bn', label: 'বাংলা' },
              { code: 'ja', label: '日本語' }
            ].map(lang => (
              <button
                key={lang.code}
                onClick={() => updateSettings({ language: lang.code as any })}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                  settings.language === lang.code 
                    ? 'bg-white dark:bg-stone-700 text-[#C23A2B] shadow-xs' 
                    : 'text-stone-600 dark:text-stone-400'
                }`}
              >
                {lang.label}
              </button>
            ))}
          </div>
        </div>

        {/* Theme Mode */}
        <div className="p-5 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-0.5">
            <span className="text-sm font-bold text-stone-900 dark:text-stone-100 block">
              Color Theme (থিম)
            </span>
            <span className="text-xs text-stone-500">
              Light ivory Japanese parchment or comfortable OLED dark mode
            </span>
          </div>

          <div className="flex items-center gap-1.5 p-1 bg-stone-100 dark:bg-stone-800 rounded-xl">
            {[
              { code: 'light', label: 'Light', icon: Sun },
              { code: 'dark', label: 'Dark', icon: Moon },
              { code: 'system', label: 'System', icon: Globe }
            ].map(theme => (
              <button
                key={theme.code}
                onClick={() => updateSettings({ theme: theme.code as any })}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1 ${
                  settings.theme === theme.code 
                    ? 'bg-white dark:bg-stone-700 text-[#C23A2B] shadow-xs' 
                    : 'text-stone-600 dark:text-stone-400'
                }`}
              >
                <theme.icon className="w-3.5 h-3.5" />
                <span>{theme.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Display Toggles */}
        <div className="p-5 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl space-y-4">
          <span className="text-sm font-bold text-stone-900 dark:text-stone-100 block">
            Pedagogical Display Options
          </span>

          <div className="space-y-3 text-xs">
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-stone-700 dark:text-stone-300">Show Romaji Assistance</span>
              <input
                type="checkbox"
                checked={settings.showRomaji}
                onChange={(e) => updateSettings({ showRomaji: e.target.checked })}
                className="w-4 h-4 accent-[#C23A2B]"
              />
            </label>

            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-stone-700 dark:text-stone-300">Show Bangla Meaning & Notes</span>
              <input
                type="checkbox"
                checked={settings.showBangla}
                onChange={(e) => updateSettings({ showBangla: e.target.checked })}
                className="w-4 h-4 accent-[#C23A2B]"
              />
            </label>

            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-stone-700 dark:text-stone-300">Play Chime & Feedback Sound Effects</span>
              <input
                type="checkbox"
                checked={settings.soundEffects}
                onChange={(e) => updateSettings({ soundEffects: e.target.checked })}
                className="w-4 h-4 accent-[#C23A2B]"
              />
            </label>
          </div>
        </div>

        {/* Backup and Data Reliability */}
        <div className="p-5 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl space-y-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <span className="text-sm font-bold text-stone-900 dark:text-stone-100">
              Data Persistence & Local Backup
            </span>
          </div>

          <p className="text-xs text-stone-500 leading-relaxed">
            All your lesson mastery, mistakes history, custom bookmarks, and study calendar data are stored locally in your browser storage. Export a JSON file to transfer your progress to another device.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <button
              onClick={handleExport}
              className="px-4 py-2 text-xs font-semibold rounded-xl border border-stone-300 dark:border-stone-700 hover:bg-stone-50 text-stone-800 dark:text-stone-200 inline-flex items-center gap-1.5"
            >
              <Download className="w-4 h-4" />
              <span>Export Progress JSON</span>
            </button>

            <label className="px-4 py-2 text-xs font-semibold rounded-xl border border-stone-300 dark:border-stone-700 hover:bg-stone-50 text-stone-800 dark:text-stone-200 inline-flex items-center gap-1.5 cursor-pointer">
              <Upload className="w-4 h-4" />
              <span>Import Progress JSON</span>
              <input type="file" accept=".json" onChange={handleImport} className="hidden" />
            </label>
          </div>

          {importMessage && (
            <div className="p-3 bg-stone-100 dark:bg-stone-800 text-xs rounded-lg text-stone-700 dark:text-stone-300 font-mono">
              {importMessage}
            </div>
          )}
        </div>

        {/* Reset Progress Danger Zone */}
        <div className="p-5 bg-rose-50/40 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/40 rounded-2xl space-y-3">
          <span className="text-xs font-bold text-rose-800 dark:text-rose-200 block uppercase tracking-wider">
            Danger Zone
          </span>
          <p className="text-xs text-rose-700 dark:text-rose-300">
            Resetting clears all completed lessons, review history, streaks, and mistake records permanently.
          </p>

          {!resetConfirm ? (
            <button
              onClick={() => setResetConfirm(true)}
              className="px-4 py-2 text-xs font-semibold rounded-xl border border-rose-300 dark:border-rose-800 text-rose-700 dark:text-rose-300 hover:bg-rose-100/60 transition-colors"
            >
              Reset All Progress
            </button>
          ) : (
            <div className="flex items-center gap-2 animate-fade-in">
              <button
                onClick={resetAll}
                className="px-4 py-2 text-xs font-semibold rounded-xl bg-rose-600 text-white hover:bg-rose-700 transition-colors"
              >
                Yes, Permanently Clear All
              </button>
              <button
                onClick={() => setResetConfirm(false)}
                className="px-3 py-2 text-xs text-stone-500 hover:underline"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
