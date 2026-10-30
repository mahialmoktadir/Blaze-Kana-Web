import React from 'react';
import { useApp } from '../../context/AppContext';
import { Flame, Globe } from 'lucide-react';
import { BlazeFlameEmblem } from '../common/BlazeLogo';

export const Header: React.FC = () => {
  const { activeTab, navigateTo, streak, settings, updateSettings } = useApp();

  const toggleLanguage = () => {
    const nextLang = settings.language === 'en' ? 'bn' : settings.language === 'bn' ? 'ja' : 'en';
    updateSettings({ language: nextLang });
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FAF9F5]/90 dark:bg-[#121316]/90 backdrop-blur-md border-b border-stone-200 dark:border-stone-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Official Brand Wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <button 
            onClick={() => navigateTo('home')} 
            className="flex items-center gap-3 text-left group focus-visible:outline-none cursor-pointer select-none"
          >
            <div className="w-9 h-9 rounded-xl bg-[#0b0b0c] p-1 flex items-center justify-center shadow-xs border border-stone-800 group-hover:scale-105 transition-transform">
              <BlazeFlameEmblem className="w-full h-full" bgFill="#0b0b0c" />
            </div>
            <div className="flex flex-col">
              <div className="text-base font-extrabold tracking-wider text-stone-900 dark:text-white whitespace-nowrap leading-tight">
                BLAZE<span className="text-[#ff5700]"> KANA</span>
              </div>
              <span className="text-[9px] font-semibold text-stone-500 dark:text-stone-400 tracking-[0.2em] uppercase font-sans">
                Learning Platform
              </span>
            </div>
          </button>
        </div>

        {/* Zone 2: 4-5 Concise Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-stone-600 dark:text-stone-300">
          <button 
            onClick={() => navigateTo('learning-path')} 
            className={`whitespace-nowrap transition-colors hover:text-[#C23A2B] ${activeTab === 'learning-path' ? 'text-[#C23A2B] font-semibold' : ''}`}
          >
            {settings.language === 'bn' ? '৩০ দিনের রোডম্যাপ' : settings.language === 'ja' ? '30日コース' : '30-Day Path'}
          </button>
          <button 
            onClick={() => navigateTo('lessons')} 
            className={`whitespace-nowrap transition-colors hover:text-[#C23A2B] ${activeTab === 'lessons' || activeTab === 'lesson-detail' ? 'text-[#C23A2B] font-semibold' : ''}`}
          >
            {settings.language === 'bn' ? 'পাঠ ০–২৫' : settings.language === 'ja' ? '第0課〜25課' : 'Lessons 0–25'}
          </button>
          <button 
            onClick={() => navigateTo('kana')} 
            className={`whitespace-nowrap transition-colors hover:text-[#ff5700] ${activeTab === 'kana' ? 'text-[#ff5700] font-semibold' : ''}`}
          >
            {settings.language === 'bn' ? 'কানা চার্ট' : settings.language === 'ja' ? '仮名一覧' : 'Kana Charts'}
          </button>
          <button 
            onClick={() => navigateTo('kanji')} 
            className={`whitespace-nowrap transition-colors hover:text-[#ff5700] flex items-center gap-1.5 ${activeTab === 'kanji' || activeTab === 'kanji-detail' || activeTab === 'kanji-flashcards' ? 'text-[#ff5700] font-bold' : ''}`}
          >
            <span className="px-1.5 py-0.5 text-[10px] font-black rounded bg-[#ff5700]/15 text-[#ff5700] border border-[#ff5700]/30 font-mono">N5</span>
            <span>{settings.language === 'bn' ? 'কাঞ্জি ৮০' : settings.language === 'ja' ? '漢字80' : 'N5 Kanji'}</span>
          </button>
          <button 
            onClick={() => navigateTo('grammar-lab')} 
            className={`whitespace-nowrap transition-colors hover:text-[#ff5700] ${activeTab === 'grammar-lab' ? 'text-[#ff5700] font-semibold' : ''}`}
          >
            {settings.language === 'bn' ? 'গ্রামার ল্যাব' : settings.language === 'ja' ? '文法ラボ' : 'Grammar Lab'}
          </button>
          <button 
            onClick={() => navigateTo('practice')} 
            className={`whitespace-nowrap transition-colors hover:text-[#ff5700] ${activeTab === 'practice' || activeTab === 'quiz' ? 'text-[#ff5700] font-semibold' : ''}`}
          >
            {settings.language === 'bn' ? 'অনুশীলন হাব' : settings.language === 'ja' ? '練習ハブ' : 'Practice Hub'}
          </button>
        </nav>

        {/* Zone 3: Clean Utilities & Streak */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Quick N5 Kanji Button for mobile/tablet */}
          <button
            onClick={() => navigateTo('kanji')}
            className="flex lg:hidden items-center gap-1.5 px-2.5 py-1 text-xs font-bold text-[#ff5700] bg-[#ff5700]/10 hover:bg-[#ff5700]/20 rounded-md border border-[#ff5700]/30 transition-colors"
          >
            <span className="text-[10px] font-mono">N5</span>
            <span>{settings.language === 'bn' ? 'কাঞ্জি' : 'Kanji'}</span>
          </button>

          {/* Streak indicator */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 rounded-md border border-amber-200/60 dark:border-amber-800/60">
            <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span className="tabular-nums font-mono">{streak.currentStreak}d</span>
          </div>

          {/* Quick Language switch */}
          <button
            onClick={toggleLanguage}
            title="Toggle Interface Language"
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-stone-700 dark:text-stone-300 bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 rounded-md transition-colors"
          >
            <Globe className="w-3.5 h-3.5 text-stone-500" />
            <span className="uppercase">{settings.language}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
