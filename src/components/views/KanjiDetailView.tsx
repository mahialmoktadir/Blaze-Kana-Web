import React, { useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { N5_KANJI_DATA, N5_KANJI_MAP } from '../../data/kanjiData';
import { KanjiHero } from '../kanji/KanjiHero';
import { KanjiMemoryMnemonic } from '../kanji/KanjiMemoryMnemonic';
import { KanjiStrokeOrderViewer } from '../kanji/KanjiStrokeOrderViewer';
import { KanjiVocabularyList } from '../kanji/KanjiVocabularyList';
import { KanjiSimilarComparison } from '../kanji/KanjiSimilarComparison';
import { KanjiQuickQuiz } from '../kanji/KanjiQuickQuiz';
import { 
  ArrowLeft, 
  ChevronLeft, 
  ChevronRight, 
  Grid3X3, 
  BookOpen, 
  Sparkles,
  Layers
} from 'lucide-react';

export const KanjiDetailView: React.FC = () => {
  const { selectedKanjiId, navigateTo, settings } = useApp();

  // Find target Kanji or default to first
  const currentKanji = useMemo(() => {
    if (selectedKanjiId && N5_KANJI_MAP.has(selectedKanjiId)) {
      return N5_KANJI_MAP.get(selectedKanjiId)!;
    }
    return N5_KANJI_DATA[0];
  }, [selectedKanjiId]);

  // Find previous and next Kanji
  const currentIndex = N5_KANJI_DATA.findIndex(k => k.id === currentKanji.id);
  const prevKanji = currentIndex > 0 ? N5_KANJI_DATA[currentIndex - 1] : null;
  const nextKanji = currentIndex < N5_KANJI_DATA.length - 1 ? N5_KANJI_DATA[currentIndex + 1] : null;

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      {/* Navigation Top Bar */}
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={() => navigateTo('kanji')}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-xs font-semibold text-stone-700 dark:text-stone-300 hover:text-[#ff5700] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{settings.language === 'bn' ? 'সকল কাঞ্জি তালিকা' : 'All 80 Kanji'}</span>
        </button>

        {/* Prev / Next Character Arrows */}
        <div className="flex items-center gap-2">
          {prevKanji ? (
            <button
              onClick={() => navigateTo('kanji-detail', { kanjiId: prevKanji.id })}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-xs font-medium text-stone-700 dark:text-stone-300 hover:border-[#ff5700] transition-all cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="font-jp font-bold text-sm">{prevKanji.character}</span>
              <span className="hidden sm:inline text-stone-400">({prevKanji.meaningEn})</span>
            </button>
          ) : (
            <div className="w-8" />
          )}

          {nextKanji && (
            <button
              onClick={() => navigateTo('kanji-detail', { kanjiId: nextKanji.id })}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-xs font-medium text-stone-700 dark:text-stone-300 hover:border-[#ff5700] transition-all cursor-pointer"
            >
              <span className="hidden sm:inline text-stone-400">({nextKanji.meaningEn})</span>
              <span className="font-jp font-bold text-sm">{nextKanji.character}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* 1. Hero Section */}
      <KanjiHero kanji={currentKanji} />

      {/* 2. Visual Memory Mnemonic */}
      <KanjiMemoryMnemonic kanji={currentKanji} />

      {/* 3. Stroke Order & Writing Canvas */}
      <KanjiStrokeOrderViewer kanji={currentKanji} />

      {/* 4. Core Vocabulary & Compounds (Jukugo) */}
      <KanjiVocabularyList 
        vocabulary={currentKanji.vocabulary} 
        kanjiCharacter={currentKanji.character} 
      />

      {/* 5. Similar Kanji Comparison & Pitfalls */}
      <KanjiSimilarComparison 
        kanjiCharacter={currentKanji.character}
        similarList={currentKanji.similarKanji}
        pitfalls={currentKanji.pitfalls}
      />

      {/* 6. Quick Mastery Check Quiz */}
      <KanjiQuickQuiz kanji={currentKanji} />

      {/* Bottom Footer Navigation */}
      <div className="p-6 rounded-3xl bg-stone-100 dark:bg-[#16171b] border border-stone-200 dark:border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <div className="text-sm font-bold text-stone-900 dark:text-white">
            {settings.language === 'bn' ? 'পরবর্তী কাঞ্জি চালিয়ে যান' : 'Continue Your Kanji Journey'}
          </div>
          <div className="text-xs text-stone-500 font-mono">
            Character #{currentKanji.curriculumIndex} of 80 in the N5 Curriculum
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigateTo('kanji')}
            className="px-4 py-2 rounded-xl bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs font-semibold text-stone-700 dark:text-stone-300 hover:border-[#ff5700] transition-all cursor-pointer"
          >
            {settings.language === 'bn' ? 'কাঞ্জি ইনডেক্স' : 'Kanji Directory'}
          </button>

          {nextKanji && (
            <button
              onClick={() => navigateTo('kanji-detail', { kanjiId: nextKanji.id })}
              className="px-5 py-2 rounded-xl bg-[#ff5700] hover:bg-[#e04d00] text-xs font-bold text-white shadow-md transition-all active:scale-95 inline-flex items-center gap-2 cursor-pointer"
            >
              <span>{settings.language === 'bn' ? `পরবর্তী: ${nextKanji.character}` : `Next: ${nextKanji.character} (${nextKanji.meaningEn})`}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
