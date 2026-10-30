import React from 'react';
import { useApp } from '../../context/AppContext';
import { LESSONS_DATA } from '../../data/lessonsData';
import { 
  Flame, 
  BookOpen, 
  Languages, 
  Layers, 
  Cpu, 
  PenTool, 
  Zap, 
  Sparkles, 
  Calendar, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle,
  Clock,
  Award
} from 'lucide-react';
import { BlazeDashboardBanner } from '../common/BlazeDashboardBanner';
import { N5_KANJI_DATA } from '../../data/kanjiData';

export const DashboardView: React.FC = () => {
  const { 
    settings, 
    completedLessons, 
    streak, 
    progress, 
    mistakes, 
    navigateTo 
  } = useApp();

  // Find next uncompleted lesson
  const nextLesson = LESSONS_DATA.find(l => !completedLessons.includes(l.id)) || LESSONS_DATA[1];

  // Count review due today
  const now = new Date();
  const dueTodayCount = Object.values(progress).filter(p => {
    if (!p.nextReviewDate) return false;
    return new Date(p.nextReviewDate) <= now;
  }).length;

  const mistakeCount = mistakes.filter(m => !m.reviewed).length;
  const totalMastered = Object.values(progress).filter(p => p.mastery === 'mastered').length;

  // Showcase Kanji selection for preview
  const showcaseKanji = N5_KANJI_DATA.slice(0, 10);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Permanent Official BLAZE KANA Dashboard Banner */}
      <BlazeDashboardBanner />

      {/* Featured: JLPT N5 Visual Kanji Hub (80 Characters) */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-stone-900 via-[#18191d] to-[#121316] border border-stone-800 text-white shadow-lg space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#ff5700]/20 text-[#ff8533] border border-[#ff5700]/30 uppercase">
                Curriculum Highlight
              </span>
              <span className="text-xs text-stone-400 font-mono">
                80 Characters from supplied N5 Book
              </span>
            </div>
            <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#ff5700]" />
              <span>{settings.language === 'bn' ? 'জেএলপিটি এন৫ কাঞ্জি লার্নিং হাব' : 'JLPT N5 Visual Kanji System'}</span>
            </h2>
            <p className="text-xs text-stone-300 max-w-xl font-sans">
              {settings.language === 'bn'
                ? 'অ্যানিমেটেড মেমোরি দৃশ্য, বাংলা অর্থ, স্ট্রোক অর্ডার ক্যানভাস ও প্র্যাকটিস কুইজসহ ৮০টি কাঞ্জি আয়ত্ত করুন।'
                : 'Master all 80 N5 Kanji characters through visual memory scenes, stroke-by-stroke drawing canvas, audio, and Jukugo vocabulary.'}
            </p>
          </div>

          <button
            onClick={() => navigateTo('kanji')}
            className="px-5 py-2.5 rounded-xl bg-[#ff5700] hover:bg-[#e04d00] text-white text-xs font-bold inline-flex items-center gap-2 shadow-md active:scale-95 transition-all shrink-0 cursor-pointer"
          >
            <span>{settings.language === 'bn' ? 'সকল ৮০টি কাঞ্জি দেখুন' : 'Explore All 80 Kanji'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Kanji Horizontal Quick Strip */}
        <div className="pt-2 flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {showcaseKanji.map((k) => (
            <button
              key={k.id}
              onClick={() => navigateTo('kanji-detail', { kanjiId: k.id })}
              className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#ff5700] transition-all flex flex-col items-center justify-center shrink-0 group cursor-pointer"
            >
              <span className="text-2xl font-bold font-jp text-white group-hover:scale-110 transition-transform">
                {k.character}
              </span>
              <span className="text-[10px] text-stone-400 font-mono mt-0.5">
                {k.meaningEn}
              </span>
            </button>
          ))}
          <button
            onClick={() => navigateTo('kanji')}
            className="px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-[#ff8533] shrink-0"
          >
            +70 more →
          </button>
        </div>
      </div>

      {/* Review Due Banner if words are waiting */}
      {dueTodayCount > 0 && (
        <div className="p-4 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-2xl flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-100 dark:bg-amber-900/60 text-amber-600 dark:text-amber-300 flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-amber-900 dark:text-amber-100">
                {dueTodayCount} Words Due for Review Today
              </div>
              <p className="text-xs text-amber-700 dark:text-amber-300">
                Spaced repetition algorithm has prepared your scheduled revision deck.
              </p>
            </div>
          </div>

          <button
            onClick={() => navigateTo('flashcards')}
            className="px-4 py-2 text-xs font-semibold text-white bg-amber-600 hover:bg-amber-700 rounded-xl shadow-xs shrink-0 whitespace-nowrap"
          >
            Review Now
          </button>
        </div>
      )}

      {/* Quick Launch Hub Grid */}
      <div>
        <div className="pb-3 border-b border-stone-200 dark:border-stone-800 mb-4 flex items-center justify-between">
          <h2 className="text-sm font-bold text-stone-900 dark:text-stone-100 uppercase tracking-wider">
            Study Studios & Practice Tools
          </h2>
          <span className="text-xs text-stone-400">All tools unlocked</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {/* Card: Learn Kana */}
          <button
            onClick={() => navigateTo('kana')}
            className="group p-5 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl text-left hover:border-[#ff5700]/60 hover:shadow-xs transition-all flex flex-col justify-between h-36"
          >
            <div className="flex items-center justify-between">
              <div className="w-9 h-9 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-[#ff5700] flex items-center justify-center">
                <Languages className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-mono text-stone-400">かな</span>
            </div>
            <div>
              <div className="text-sm font-bold text-stone-900 dark:text-stone-100 group-hover:text-[#ff5700] transition-colors">
                Learn Kana
              </div>
              <p className="text-xs text-stone-500 line-clamp-1 mt-0.5">
                Hiragana & Katakana matrix with audio
              </p>
            </div>
          </button>

          {/* Card: JLPT N5 Kanji */}
          <button
            onClick={() => navigateTo('kanji')}
            className="group p-5 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl text-left hover:border-[#ff5700]/60 hover:shadow-xs transition-all flex flex-col justify-between h-36"
          >
            <div className="flex items-center justify-between">
              <div className="w-9 h-9 rounded-xl bg-[#ff5700]/10 text-[#ff5700] flex items-center justify-center font-bold font-mono text-xs">
                N5
              </div>
              <span className="text-[11px] font-mono font-bold text-[#ff8533]">80 漢字</span>
            </div>
            <div>
              <div className="text-sm font-bold text-stone-900 dark:text-stone-100 group-hover:text-[#ff5700] transition-colors">
                {settings.language === 'bn' ? 'এন৫ কাঞ্জি' : 'JLPT N5 Kanji'}
              </div>
              <p className="text-xs text-stone-500 line-clamp-1 mt-0.5">
                80 characters with visual memory scenes
              </p>
            </div>
          </button>

          {/* Card: Writing Canvas */}
          <button
            onClick={() => navigateTo('writing')}
            className="group p-5 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl text-left hover:border-[#C23A2B]/60 hover:shadow-xs transition-all flex flex-col justify-between h-36"
          >
            <div className="flex items-center justify-between">
              <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 flex items-center justify-center">
                <PenTool className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-mono text-stone-400">書道</span>
            </div>
            <div>
              <div className="text-sm font-bold text-stone-900 dark:text-stone-100 group-hover:text-[#C23A2B] transition-colors">
                Writing Canvas
              </div>
              <p className="text-xs text-stone-500 line-clamp-1 mt-0.5">
                Handwriting practice with grid & guides
              </p>
            </div>
          </button>

          {/* Card: Grammar Lab */}
          <button
            onClick={() => navigateTo('grammar-lab')}
            className="group p-5 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl text-left hover:border-[#C23A2B]/60 hover:shadow-xs transition-all flex flex-col justify-between h-36"
          >
            <div className="flex items-center justify-between">
              <div className="w-9 h-9 rounded-xl bg-purple-50 dark:bg-purple-950/40 text-purple-600 flex items-center justify-center">
                <Cpu className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-mono text-stone-400">文法</span>
            </div>
            <div>
              <div className="text-sm font-bold text-stone-900 dark:text-stone-100 group-hover:text-[#C23A2B] transition-colors">
                Grammar Lab
              </div>
              <p className="text-xs text-stone-500 line-clamp-1 mt-0.5">
                Color-coded syntax blocks & rules
              </p>
            </div>
          </button>

          {/* Card: Speed Challenge */}
          <button
            onClick={() => navigateTo('speed')}
            className="group p-5 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl text-left hover:border-[#C23A2B]/60 hover:shadow-xs transition-all flex flex-col justify-between h-36"
          >
            <div className="flex items-center justify-between">
              <div className="w-9 h-9 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 flex items-center justify-center">
                <Zap className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-mono text-stone-400">スピード</span>
            </div>
            <div>
              <div className="text-sm font-bold text-stone-900 dark:text-stone-100 group-hover:text-[#C23A2B] transition-colors">
                Speed Sprint
              </div>
              <p className="text-xs text-stone-500 line-clamp-1 mt-0.5">
                45-second rapid recall challenge
              </p>
            </div>
          </button>
        </div>
      </div>

      {/* Secondary Tools: Mistakes & Reference */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Mistakes Review Callout */}
        <div className="p-5 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 flex items-center justify-center shrink-0">
              <AlertCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100">
                {settings.language === 'bn' ? 'ভুল পর্যালোচনা' : 'Mistake Review Hub'}
              </h3>
              <p className="text-xs text-stone-500">
                {mistakeCount > 0 
                  ? `${mistakeCount} quiz errors logged for targeted correction.` 
                  : 'All recorded mistakes currently resolved.'}
              </p>
            </div>
          </div>

          <button
            onClick={() => navigateTo('mistakes')}
            className="px-3.5 py-1.5 text-xs font-semibold rounded-lg border border-stone-200 dark:border-stone-700 hover:bg-stone-50 text-stone-800 dark:text-stone-200 shrink-0"
          >
            Open
          </button>
        </div>

        {/* Appendices Tables Callout */}
        <div className="p-5 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 flex items-center justify-center shrink-0">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100">
                Master Reference Tables
              </h3>
              <p className="text-xs text-stone-500">
                Counters, Numbers (1-100M), Time, and Verb Conjugation chart.
              </p>
            </div>
          </div>

          <button
            onClick={() => navigateTo('appendices')}
            className="px-3.5 py-1.5 text-xs font-semibold rounded-lg border border-stone-200 dark:border-stone-700 hover:bg-stone-50 text-stone-800 dark:text-stone-200 shrink-0"
          >
            Tables
          </button>
        </div>
      </div>
    </div>
  );
};
