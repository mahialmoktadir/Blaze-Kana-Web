import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { LESSONS_DATA } from '../../data/lessonsData';
import { GrammarPoint } from '../../types';
import { TTSAudioButton } from '../common/TTSAudioButton';
import { 
  Cpu, 
  Sparkles, 
  Volume2, 
  ChevronRight, 
  Search, 
  HelpCircle,
  Layers,
  ArrowRight
} from 'lucide-react';

export const GrammarLabView: React.FC = () => {
  const { settings, speakText, openSensei } = useApp();

  const [selectedLesson, setSelectedLesson] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeGrammar, setActiveGrammar] = useState<GrammarPoint | null>(null);

  // All grammar points
  const allGrammar = LESSONS_DATA.flatMap(l => l.grammarPoints);

  const filteredGrammar = allGrammar.filter(g => {
    if (selectedLesson !== 'all' && g.lesson !== Number(selectedLesson)) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchesPattern = g.pattern.toLowerCase().includes(q);
      const matchesTitleEn = g.titleEn.toLowerCase().includes(q);
      const matchesTitleBn = g.titleBn.toLowerCase().includes(q);
      if (!matchesPattern && !matchesTitleEn && !matchesTitleBn) return false;
    }
    return true;
  });

  const getBadgeStyle = (type: string) => {
    switch (type) {
      case 'topic':
        return 'bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300';
      case 'particle':
        return 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800 text-[#C23A2B] font-bold';
      case 'predicate':
      case 'verb':
        return 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300';
      case 'object':
        return 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300';
      case 'location':
      case 'time':
        return 'bg-purple-50 dark:bg-purple-950/40 border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300';
      default:
        return 'bg-stone-50 dark:bg-stone-800 border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300';
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-stone-200 dark:border-stone-800">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-stone-900 dark:text-stone-100 flex items-center gap-2">
            <span>{settings.language === 'bn' ? 'ভিজ্যুয়াল গ্রামার ল্যাব' : 'Visual Grammar Lab'}</span>
            <span className="text-xs px-2 py-0.5 rounded bg-[#C23A2B]/10 text-[#C23A2B] font-mono">
              Syntax Studio
            </span>
          </h2>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
            {settings.language === 'bn' 
              ? 'জাপানি ব্যাকরণ নিয়ম, রঙিন পার্টিকল বিশ্লেষণ ও কাঠামোগত বাক্য গঠন।'
              : 'Structural color-coded syntax blocks, particle analysis, and bilingual explanations.'}
          </p>
        </div>

        <button
          onClick={() => openSensei('Explain the core difference between Japanese particles は and が', 'Grammar Lab Overview')}
          className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-[#C23A2B] hover:bg-[#A82E21] rounded-lg shadow-sm transition-all self-start md:self-auto"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Ask Sensei Deep Question</span>
        </button>
      </div>

      {/* Filter and Search */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
        <div className="sm:col-span-8 relative">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={settings.language === 'bn' ? 'ব্যাকরণ প্যাটার্ন বা নিয়ম খুঁজুন...' : 'Search grammar patterns (e.g. は, から, てください, ほうがいい)...'}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-1 focus:ring-[#C23A2B]"
          />
        </div>

        <div className="sm:col-span-4">
          <select
            value={selectedLesson}
            onChange={(e) => setSelectedLesson(e.target.value)}
            className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 focus:outline-none focus:ring-1 focus:ring-[#C23A2B]"
          >
            <option value="all">All Lessons (0–25)</option>
            {LESSONS_DATA.map(l => (
              <option key={l.id} value={l.number}>
                Lesson {l.number}: {l.titleEn}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Grammar Cards Grid */}
      <div className="space-y-4">
        {filteredGrammar.map((point) => (
          <div
            key={point.id}
            className="p-5 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl shadow-xs space-y-4 hover:border-stone-300 dark:hover:border-stone-700 transition-all"
          >
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-stone-100 dark:border-stone-800">
              <div className="flex items-center gap-2.5">
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400">
                  Lesson {point.lesson}
                </span>
                <h3 className="text-base font-bold font-jp text-stone-900 dark:text-stone-100">
                  {point.pattern}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => openSensei(`Explain the grammar pattern "${point.pattern}" with nuances, rules, and example sentences`, `Lesson ${point.lesson}: ${point.pattern}`)}
                  className="inline-flex items-center gap-1 text-xs text-[#C23A2B] hover:underline"
                >
                  <Sparkles className="w-3 h-3" />
                  <span>Sensei Deep Analysis</span>
                </button>
              </div>
            </div>

            {/* Visual Syntax Blocks Diagram */}
            <div className="space-y-1.5">
              <div className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider">
                Sentence Architecture
              </div>
              <div className="flex flex-wrap items-center gap-2 p-3 bg-stone-50 dark:bg-stone-800/40 rounded-xl border border-stone-200/60 dark:border-stone-800/60">
                {point.structure.map((block, idx) => (
                  <React.Fragment key={idx}>
                    <div className={`px-3 py-1.5 rounded-lg border text-xs ${getBadgeStyle(block.type)} flex items-center gap-1`}>
                      <span>{block.label}</span>
                    </div>
                    {idx < point.structure.length - 1 && (
                      <span className="text-stone-400 font-bold text-xs">+</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Bilingual Explanations */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs leading-relaxed pt-1">
              <div className="p-3.5 bg-stone-50 dark:bg-stone-800/50 rounded-xl border border-stone-200/50 dark:border-stone-800/50 space-y-1">
                <span className="font-semibold text-stone-900 dark:text-stone-100 block">English Explanation:</span>
                <p className="text-stone-700 dark:text-stone-300">{point.explanationEn}</p>
              </div>

              {settings.showBangla && (
                <div className="p-3.5 bg-rose-50/50 dark:bg-rose-950/20 rounded-xl border border-rose-200/50 dark:border-rose-900/30 space-y-1 font-sans">
                  <span className="font-semibold text-rose-900 dark:text-rose-200 block">বাংলা ব্যাখ্যা:</span>
                  <p className="text-rose-800 dark:text-rose-300">{point.explanationBn}</p>
                </div>
              )}
            </div>

            {/* Example Sentences */}
            <div className="space-y-2 pt-2">
              <div className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider">
                Authentic Examples
              </div>
              <div className="space-y-2">
                {point.examples.map((ex, exIdx) => (
                  <div 
                    key={exIdx}
                    className="p-3 bg-white dark:bg-stone-800/80 rounded-xl border border-stone-200 dark:border-stone-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="space-y-0.5">
                      <div className="font-jp text-sm font-semibold text-stone-900 dark:text-stone-100 flex items-center gap-2">
                        <span>{ex.japanese}</span>
                      </div>
                      <div className="text-[11px] font-mono text-[#C23A2B]">
                        {ex.romaji}
                      </div>
                      <div className="text-xs text-stone-600 dark:text-stone-300">
                        {settings.language === 'bn' ? ex.bangla : ex.english}
                      </div>
                    </div>

                    <TTSAudioButton 
                      text={ex.japanese}
                      reading={ex.kana}
                      enableSpeedToggle={true}
                      size="sm"
                      title={`Listen to sentence: ${ex.japanese}`}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
