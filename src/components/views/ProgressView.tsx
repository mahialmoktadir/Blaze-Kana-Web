import React from 'react';
import { useApp } from '../../context/AppContext';
import { LESSONS_DATA, ALL_VOCABULARY } from '../../data/lessonsData';
import { 
  BarChart3, 
  Flame, 
  CheckCircle2, 
  Award, 
  Clock, 
  Layers, 
  Sparkles,
  BookOpen 
} from 'lucide-react';

export const ProgressView: React.FC = () => {
  const { completedLessons, progress, streak, achievements, settings } = useApp();

  const totalVocab = ALL_VOCABULARY.length;
  const encounteredCount = Object.keys(progress).length;
  const masteredCount = Object.values(progress).filter(p => p.mastery === 'mastered').length;
  const learningCount = Object.values(progress).filter(p => p.mastery === 'learning' || p.mastery === 'review').length;
  const difficultCount = Object.values(progress).filter(p => p.mastery === 'difficult' || p.isDifficult).length;

  // Real accuracy from all attempts
  let totalCorrect = 0;
  let totalIncorrect = 0;
  Object.values(progress).forEach(p => {
    totalCorrect += p.correctCount || 0;
    totalIncorrect += p.incorrectCount || 0;
  });
  const totalAttempts = totalCorrect + totalIncorrect;
  const accuracy = totalAttempts > 0 ? Math.round((totalCorrect / totalAttempts) * 100) : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* View Header */}
      <div className="pb-4 border-b border-stone-200 dark:border-stone-800">
        <h2 className="text-xl font-bold tracking-tight text-stone-900 dark:text-stone-100 flex items-center gap-2">
          <span>{settings.language === 'bn' ? 'ব্যক্তিগত অগ্রগতি ও অর্জন' : 'Progress & Analytics'}</span>
          <span className="text-xs px-2 py-0.5 rounded bg-[#C23A2B]/10 text-[#C23A2B] font-mono">
            Real Analytics
          </span>
        </h2>
        <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
          Accurate metrics calculated strictly from your local study drills, completed lessons, and spaced repetition history.
        </p>
      </div>

      {/* KPI Cards Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <div className="p-4 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl">
          <div className="text-xs text-stone-400 font-medium">Completed Lessons</div>
          <div className="text-2xl font-bold font-mono text-stone-900 dark:text-stone-100 mt-1">
            {completedLessons.length} <span className="text-xs font-normal text-stone-400">/ {LESSONS_DATA.length}</span>
          </div>
          <div className="w-full bg-stone-100 dark:bg-stone-800 h-1.5 rounded-full mt-2 overflow-hidden">
            <div 
              className="bg-emerald-600 h-full rounded-full transition-all"
              style={{ width: `${Math.round((completedLessons.length / LESSONS_DATA.length) * 100)}%` }}
            />
          </div>
        </div>

        <div className="p-4 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl">
          <div className="text-xs text-stone-400 font-medium">Words Mastered</div>
          <div className="text-2xl font-bold font-mono text-emerald-600 mt-1">
            {masteredCount} <span className="text-xs font-normal text-stone-400">words</span>
          </div>
          <div className="text-[11px] text-stone-500 mt-1">
            {encounteredCount} encountered in total
          </div>
        </div>

        <div className="p-4 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl">
          <div className="text-xs text-stone-400 font-medium">Study Streak</div>
          <div className="text-2xl font-bold font-mono text-amber-500 mt-1">
            {streak.currentStreak} <span className="text-xs font-normal text-stone-400">days</span>
          </div>
          <div className="text-[11px] text-stone-500 mt-1">
            Best streak: {streak.longestStreak} days
          </div>
        </div>

        <div className="p-4 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl">
          <div className="text-xs text-stone-400 font-medium">Overall Accuracy</div>
          <div className="text-2xl font-bold font-mono text-stone-900 dark:text-stone-100 mt-1">
            {totalAttempts > 0 ? `${accuracy}%` : '--'}
          </div>
          <div className="text-[11px] text-stone-500 mt-1 font-mono">
            {totalCorrect} / {totalAttempts} attempts
          </div>
        </div>
      </div>

      {/* Vocabulary Mastery Distribution */}
      <div className="p-6 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl space-y-4">
        <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100 uppercase tracking-wider">
          Vocabulary Mastery Breakdown
        </h3>

        <div className="space-y-2 text-xs">
          <div className="flex items-center justify-between font-medium">
            <span className="flex items-center gap-1.5 text-emerald-600">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              Mastered ({masteredCount})
            </span>
            <span className="text-stone-400 font-mono">
              {Math.round((masteredCount / totalVocab) * 100)}%
            </span>
          </div>
          <div className="w-full bg-stone-100 dark:bg-stone-800 h-2 rounded-full overflow-hidden">
            <div className="bg-emerald-500 h-full" style={{ width: `${(masteredCount / totalVocab) * 100}%` }} />
          </div>

          <div className="flex items-center justify-between font-medium pt-2">
            <span className="flex items-center gap-1.5 text-blue-600">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
              Learning & Review ({learningCount})
            </span>
            <span className="text-stone-400 font-mono">
              {Math.round((learningCount / totalVocab) * 100)}%
            </span>
          </div>
          <div className="w-full bg-stone-100 dark:bg-stone-800 h-2 rounded-full overflow-hidden">
            <div className="bg-blue-500 h-full" style={{ width: `${(learningCount / totalVocab) * 100}%` }} />
          </div>

          <div className="flex items-center justify-between font-medium pt-2">
            <span className="flex items-center gap-1.5 text-rose-600">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
              Difficult Flagged ({difficultCount})
            </span>
            <span className="text-stone-400 font-mono">
              {Math.round((difficultCount / totalVocab) * 100)}%
            </span>
          </div>
          <div className="w-full bg-stone-100 dark:bg-stone-800 h-2 rounded-full overflow-hidden">
            <div className="bg-rose-500 h-full" style={{ width: `${(difficultCount / totalVocab) * 100}%` }} />
          </div>
        </div>
      </div>

      {/* Achievements Showcase */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100 uppercase tracking-wider">
          Earned Achievements & Badges
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {achievements.map((ach) => (
            <div
              key={ach.id}
              className={`p-4 rounded-2xl border flex items-start gap-3.5 transition-all ${
                ach.isUnlocked 
                  ? 'bg-white dark:bg-stone-900 border-amber-300 dark:border-amber-900/60 shadow-xs' 
                  : 'bg-stone-50/60 dark:bg-stone-900/40 border-stone-200 dark:border-stone-800 opacity-60'
              }`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                ach.isUnlocked 
                  ? 'bg-amber-100 text-amber-600 dark:bg-amber-950/60' 
                  : 'bg-stone-200 dark:bg-stone-800 text-stone-400'
              }`}>
                <Award className="w-5 h-5" />
              </div>

              <div className="space-y-0.5 flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-stone-900 dark:text-stone-100">
                    {settings.language === 'bn' ? ach.titleBn : ach.titleEn}
                  </h4>
                  {ach.isUnlocked && (
                    <span className="text-[10px] font-mono text-emerald-600 font-semibold">
                      Unlocked
                    </span>
                  )}
                </div>

                <p className="text-[11px] text-stone-500 dark:text-stone-400 leading-relaxed">
                  {settings.language === 'bn' ? ach.descriptionBn : ach.descriptionEn}
                </p>

                {!ach.isUnlocked && (
                  <div className="w-full bg-stone-200 dark:bg-stone-800 h-1 rounded-full mt-2 overflow-hidden">
                    <div className="bg-stone-400 h-full" style={{ width: `${ach.progress}%` }} />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
