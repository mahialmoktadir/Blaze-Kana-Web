import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { LESSONS_DATA } from '../../data/lessonsData';
import { Lesson } from '../../types';
import { 
  BookOpen, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  Layers, 
  Cpu, 
  Search 
} from 'lucide-react';

export const LessonCatalogueView: React.FC = () => {
  const { completedLessons, navigateTo, settings } = useApp();
  const [search, setSearch] = useState('');

  const filteredLessons = LESSONS_DATA.filter(l => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      l.title.toLowerCase().includes(q) ||
      l.titleEn.toLowerCase().includes(q) ||
      l.titleBn.toLowerCase().includes(q) ||
      `lesson ${l.number}`.includes(q)
    );
  });

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-stone-200 dark:border-stone-800">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-stone-900 dark:text-stone-100 flex items-center gap-2">
            <span>{settings.language === 'bn' ? 'পাঠ ০–২৫ ক্যাটালগ' : 'Lesson Catalogue (Lessons 0–25)'}</span>
            <span className="text-xs px-2 py-0.5 rounded bg-[#C23A2B]/10 text-[#C23A2B] font-mono">
              {completedLessons.length} / {LESSONS_DATA.length} Complete
            </span>
          </h2>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
            {settings.language === 'bn' 
              ? 'মাস্টার রেফারেন্স বইয়ের ২৫টি মূল পাঠ এবং পাঠ ০ পরিচিতির সুশৃঙ্খল পাঠ্যক্রম।'
              : 'Complete textbook syllabus from basic conversations to complex conditionals and giving/receiving.'}
          </p>
        </div>

        {/* Search Input */}
        <div className="w-full md:w-64">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={settings.language === 'bn' ? 'পাঠ খুঁজুন...' : 'Search lessons by topic or keyword...'}
            className="w-full px-3.5 py-1.5 text-xs rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-1 focus:ring-[#C23A2B]"
          />
        </div>
      </div>

      {/* Lesson Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredLessons.map((lesson) => {
          const isDone = completedLessons.includes(lesson.id);

          return (
            <div
              key={lesson.id}
              onClick={() => navigateTo('lesson-detail', { lessonId: lesson.id })}
              className={`group cursor-pointer flex flex-col justify-between p-5 rounded-2xl border transition-all ${
                isDone 
                  ? 'bg-white dark:bg-stone-900 border-emerald-300/80 dark:border-emerald-900/60 shadow-xs' 
                  : 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 hover:border-[#C23A2B]/60 hover:shadow-md'
              }`}
            >
              <div className="space-y-3">
                {/* Header Badge & Number */}
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono font-bold text-xs px-2.5 py-0.5 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300">
                    {lesson.isOrientation ? 'Orientation' : `Lesson ${lesson.number}`}
                  </span>
                  
                  {isDone ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Mastered</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[11px] text-stone-400">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{lesson.estimatedMinutes}m</span>
                    </span>
                  )}
                </div>

                {/* Lesson Title */}
                <div>
                  <h3 className="text-base font-bold text-stone-900 dark:text-stone-100 group-hover:text-[#C23A2B] transition-colors leading-snug">
                    {lesson.titleEn}
                  </h3>
                  {settings.showBangla && (
                    <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5 font-sans">
                      {lesson.titleBn}
                    </p>
                  )}
                </div>

                {/* Description */}
                <p className="text-xs text-stone-600 dark:text-stone-400 line-clamp-2 leading-relaxed">
                  {settings.language === 'bn' ? lesson.descriptionBn : lesson.descriptionEn}
                </p>

                {/* Topic tags / features */}
                <div className="flex items-center gap-3 text-[11px] text-stone-400 pt-1">
                  <span className="flex items-center gap-1">
                    <Layers className="w-3 h-3 text-stone-400" />
                    <span>{lesson.vocabulary.length} words</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Cpu className="w-3 h-3 text-stone-400" />
                    <span>{lesson.grammarPoints.length} grammar pts</span>
                  </span>
                </div>
              </div>

              {/* Card Footer Action */}
              <div className="mt-4 pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs font-semibold text-[#C23A2B]">
                <span>{isDone ? 'Review Lesson' : 'Start Lesson'}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
