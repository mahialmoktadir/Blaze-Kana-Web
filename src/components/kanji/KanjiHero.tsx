import React from 'react';
import { KanjiItem } from '../../types/kanji';
import { useApp } from '../../context/AppContext';
import { TTSAudioButton } from '../common/TTSAudioButton';
import { Star, CheckCircle2, Bookmark, Award, Sparkles, BookOpen } from 'lucide-react';

interface KanjiHeroProps {
  kanji: KanjiItem;
}

export const KanjiHero: React.FC<KanjiHeroProps> = ({ kanji }) => {
  const { 
    progress, 
    toggleFavorite, 
    toggleDifficult, 
    recordPracticeAttempt,
    settings 
  } = useApp();

  const itemProgress = progress[kanji.id];
  const isFav = !!itemProgress?.isFavorite;
  const isDiff = !!itemProgress?.isDifficult;
  const mastery = itemProgress?.mastery || 'new';

  const markMastered = () => {
    recordPracticeAttempt(kanji.id, true);
  };

  const getMasteryBadge = () => {
    switch (mastery) {
      case 'mastered':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            {settings.language === 'bn' ? 'আয়ত্তকৃত' : 'Mastered'}
          </span>
        );
      case 'learning':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-700">
            <BookOpen className="w-3.5 h-3.5 text-amber-600" />
            {settings.language === 'bn' ? 'শিখছেন' : 'Learning'}
          </span>
        );
      case 'review':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-100 dark:bg-blue-950/70 text-blue-800 dark:text-blue-300 border border-blue-300 dark:border-blue-700">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            {settings.language === 'bn' ? 'পুনরাবৃত্তি' : 'Reviewing'}
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border border-stone-300 dark:border-stone-700">
            <span className="w-2 h-2 rounded-full bg-stone-400" />
            {settings.language === 'bn' ? 'নতুন অক্ষর' : 'New Character'}
          </span>
        );
    }
  };

  return (
    <div className="relative rounded-3xl bg-white dark:bg-[#16171b] border border-stone-200 dark:border-stone-800 p-6 sm:p-8 lg:p-10 shadow-sm overflow-hidden">
      {/* Background Watermark of the Kanji */}
      <div className="absolute right-4 -bottom-6 text-9xl sm:text-[14rem] font-black font-jp text-stone-100 dark:text-stone-850 pointer-events-none select-none opacity-40 leading-none">
        {kanji.character}
      </div>

      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        {/* Left Section: Giant Character & Primary Meanings */}
        <div className="flex items-start sm:items-center gap-6">
          {/* Kanji Display Box with Quadrant Grid Effect */}
          <div className="relative w-28 h-28 sm:w-36 sm:h-36 shrink-0 rounded-2xl bg-stone-50 dark:bg-[#0f1012] border-2 border-stone-200 dark:border-stone-750 flex items-center justify-center shadow-inner group">
            {/* Traditional Quadrant lines */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="w-full h-full border-t border-dashed border-stone-200 dark:border-stone-800 absolute top-1/2 -translate-y-1/2" />
              <div className="w-full h-full border-l border-dashed border-stone-200 dark:border-stone-800 absolute left-1/2 -translate-x-1/2" />
            </div>

            <span className="relative text-6xl sm:text-7xl font-bold font-jp text-stone-900 dark:text-white drop-shadow-sm select-all">
              {kanji.character}
            </span>

            {/* Quick Audio pronunciation button directly on character */}
            <div className="absolute bottom-2 right-2">
              <TTSAudioButton 
                text={kanji.character} 
                reading={kanji.kunyomi[0] ? kanji.kunyomi[0].replace('.', '') : kanji.onyomi[0]}
                size="sm"
                title="Pronounce Kanji"
              />
            </div>
          </div>

          {/* Core Info */}
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-md text-[11px] font-black uppercase tracking-wider bg-[#ff5700]/10 text-[#ff5700] border border-[#ff5700]/30 font-mono">
                {kanji.jlptLevel}
              </span>
              <span className="px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300">
                {settings.language === 'bn' ? kanji.categoryBn : kanji.categoryEn}
              </span>
              <span className="px-2.5 py-0.5 rounded-md text-[11px] font-mono text-stone-500 dark:text-stone-400 bg-stone-100 dark:bg-stone-800">
                {kanji.strokeCount} {settings.language === 'bn' ? 'স্ট্রোক' : 'strokes'}
              </span>
            </div>

            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 dark:text-white tracking-tight">
                {kanji.meaningEn}
              </h1>
              <div className="text-lg sm:text-xl font-bold text-[#ff5700] mt-0.5">
                বাংলা অর্থ: {kanji.meaningBn}
              </div>
            </div>

            <div className="pt-1 flex items-center gap-3">
              {getMasteryBadge()}
              <span className="text-xs text-stone-400 font-mono">
                #{kanji.curriculumIndex} of 80
              </span>
            </div>
          </div>
        </div>

        {/* Right Section: Action Controls */}
        <div className="flex flex-wrap md:flex-col items-center md:items-end gap-2.5 w-full md:w-auto pt-2 md:pt-0 border-t md:border-t-0 border-stone-200 dark:border-stone-800">
          <button
            onClick={() => toggleFavorite(kanji.id)}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold border inline-flex items-center gap-2 transition-all cursor-pointer ${
              isFav 
                ? 'bg-amber-50 dark:bg-amber-950/60 border-amber-300 dark:border-amber-700 text-amber-700 dark:text-amber-300' 
                : 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-300 hover:border-amber-400'
            }`}
          >
            <Star className={`w-4 h-4 ${isFav ? 'fill-amber-400 text-amber-400' : ''}`} />
            <span>{isFav ? (settings.language === 'bn' ? 'সংরক্ষিত' : 'Saved') : (settings.language === 'bn' ? 'সংরক্ষণ করুন' : 'Favorite')}</span>
          </button>

          <button
            onClick={() => toggleDifficult(kanji.id)}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold border inline-flex items-center gap-2 transition-all cursor-pointer ${
              isDiff 
                ? 'bg-rose-50 dark:bg-rose-950/60 border-rose-300 dark:border-rose-700 text-rose-700 dark:text-rose-300' 
                : 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-300 hover:border-rose-400'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${isDiff ? 'fill-rose-500 text-rose-500' : ''}`} />
            <span>{isDiff ? (settings.language === 'bn' ? 'কঠিন চিহ্নিত' : 'Marked Hard') : (settings.language === 'bn' ? 'কঠিন কাঞ্জি' : 'Flag as Hard')}</span>
          </button>

          {mastery !== 'mastered' && (
            <button
              onClick={markMastered}
              className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 active:scale-95 transition-all inline-flex items-center gap-1.5 shadow-sm cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{settings.language === 'bn' ? 'আয়ত্ত হিসেবে চিহ্নিত করুন' : 'Mark as Mastered'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Readings Grid Section: On'yomi & Kun'yomi */}
      <div className="mt-8 pt-6 border-t border-stone-200 dark:border-stone-800 grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* On'yomi (音読み) */}
        <div className="p-4 rounded-2xl bg-stone-50 dark:bg-[#121316] border border-stone-200 dark:border-stone-800 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#ff5700]/15 text-[#ff5700] uppercase font-mono">
                音読み
              </span>
              <span className="text-xs font-bold text-stone-700 dark:text-stone-300">
                On’yomi (Chinese Reading)
              </span>
            </div>
            {kanji.onyomi.length > 0 && (
              <TTSAudioButton 
                text={kanji.onyomi.join('、')} 
                size="sm"
                title="Listen to On'yomi"
              />
            )}
          </div>

          <div className="flex flex-wrap items-baseline gap-3 pt-1">
            {kanji.onyomi.length > 0 ? (
              kanji.onyomi.map((on, idx) => (
                <div key={idx} className="flex items-baseline gap-1.5">
                  <span className="text-xl font-bold font-jp text-stone-900 dark:text-white">
                    {on}
                  </span>
                  <span className="text-xs font-mono text-stone-400">
                    ({kanji.onyomiRomaji[idx] || ''})
                  </span>
                </div>
              ))
            ) : (
              <span className="text-xs text-stone-400 italic">None common in N5</span>
            )}
          </div>
        </div>

        {/* Kun'yomi (訓読み) */}
        <div className="p-4 rounded-2xl bg-stone-50 dark:bg-[#121316] border border-stone-200 dark:border-stone-800 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/15 text-amber-600 dark:text-amber-400 uppercase font-mono">
                訓読み
              </span>
              <span className="text-xs font-bold text-stone-700 dark:text-stone-300">
                Kun’yomi (Japanese Reading)
              </span>
            </div>
            {kanji.kunyomi.length > 0 && (
              <TTSAudioButton 
                text={kanji.kunyomi.map(k => k.replace('.', '')).join('、')} 
                size="sm"
                title="Listen to Kun'yomi"
              />
            )}
          </div>

          <div className="flex flex-wrap items-baseline gap-3 pt-1">
            {kanji.kunyomi.length > 0 ? (
              kanji.kunyomi.map((kun, idx) => (
                <div key={idx} className="flex items-baseline gap-1.5">
                  <span className="text-xl font-bold font-jp text-stone-900 dark:text-white">
                    {kun}
                  </span>
                  <span className="text-xs font-mono text-stone-400">
                    ({kanji.kunyomiRomaji[idx] || ''})
                  </span>
                </div>
              ))
            ) : (
              <span className="text-xs text-stone-400 italic">None common in N5</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
