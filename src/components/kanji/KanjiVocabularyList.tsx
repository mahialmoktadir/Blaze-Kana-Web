import React from 'react';
import { KanjiVocabItem } from '../../types/kanji';
import { useApp } from '../../context/AppContext';
import { TTSAudioButton } from '../common/TTSAudioButton';
import { Layers, Volume2, Sparkles, BookOpen } from 'lucide-react';

interface KanjiVocabularyListProps {
  vocabulary: KanjiVocabItem[];
  kanjiCharacter: string;
}

export const KanjiVocabularyList: React.FC<KanjiVocabularyListProps> = ({ 
  vocabulary, 
  kanjiCharacter 
}) => {
  const { settings } = useApp();

  return (
    <div className="rounded-3xl bg-white dark:bg-[#16171b] border border-stone-200 dark:border-stone-800 p-6 sm:p-8 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#ff5700]/10 flex items-center justify-center text-[#ff5700]">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-stone-900 dark:text-white">
              {settings.language === 'bn' ? 'প্রয়োজনীয় শব্দভাণ্ডার ও যৌগিক শব্দ (熟語)' : 'Core N5 Vocabulary & Compounds (Jukugo)'}
            </h2>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              {settings.language === 'bn' ? `এই কাঞ্জি (${kanjiCharacter}) দিয়ে গঠিত দৈনন্দিন শব্দ ও উচ্চারণ` : `Authentic vocabulary and compound words featuring ${kanjiCharacter}`}
            </p>
          </div>
        </div>

        <span className="text-xs font-mono px-2.5 py-1 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300">
          {vocabulary.length} Words
        </span>
      </div>

      {/* Vocabulary Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {vocabulary.map((vocab, index) => (
          <div 
            key={index}
            className="p-4 sm:p-5 rounded-2xl bg-stone-50 dark:bg-[#121316] border border-stone-200 dark:border-stone-800 hover:border-[#ff5700]/40 transition-all space-y-3 flex flex-col justify-between"
          >
            {/* Word Header with Audio Toggle */}
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-2xl font-bold font-jp text-stone-900 dark:text-white">
                  {vocab.japanese}
                </div>
                <div className="text-sm font-semibold text-[#ff5700] font-jp">
                  {vocab.kana}
                </div>
                <div className="text-xs font-mono text-stone-400">
                  {vocab.romaji}
                </div>
              </div>

              {/* TTS Audio toggle button on the vocabulary word */}
              <TTSAudioButton 
                text={vocab.japanese} 
                reading={vocab.kana}
                size="md"
                enableSpeedToggle={true}
                title={`Listen to ${vocab.japanese}`}
              />
            </div>

            {/* Definitions in English & Bengali */}
            <div className="space-y-1 pt-1 border-t border-stone-200/80 dark:border-stone-800/80">
              <div className="text-sm font-bold text-stone-800 dark:text-stone-200 font-sans">
                {vocab.english}
              </div>
              <div className="text-xs font-medium text-stone-600 dark:text-stone-400">
                <span className="text-[#ff5700] font-bold">বাংলা: </span>
                {vocab.bangla}
              </div>
            </div>

            {/* Example Sentence with Audio Toggle */}
            {vocab.exampleSentence && (
              <div className="pt-2.5 border-t border-stone-200/60 dark:border-stone-800/60 bg-white/60 dark:bg-stone-900/40 p-3 rounded-xl space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-0.5">
                    <div className="text-xs font-semibold font-jp text-stone-900 dark:text-white leading-relaxed">
                      {vocab.exampleSentence}
                    </div>
                    {vocab.exampleKana && (
                      <div className="text-[11px] font-jp text-stone-500 dark:text-stone-400">
                        {vocab.exampleKana}
                      </div>
                    )}
                  </div>

                  {/* Audio toggle button for the example sentence */}
                  <TTSAudioButton 
                    text={vocab.exampleSentence} 
                    reading={vocab.exampleKana}
                    size="sm"
                    enableSpeedToggle={true}
                    title="Pronounce Sentence"
                  />
                </div>

                <div className="text-[11px] text-stone-600 dark:text-stone-300 font-sans">
                  {vocab.exampleEn}
                </div>
                {vocab.exampleBn && (
                  <div className="text-[11px] text-stone-500 dark:text-stone-400">
                    <span className="text-[#ff5700]">বাং: </span>
                    {vocab.exampleBn}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
