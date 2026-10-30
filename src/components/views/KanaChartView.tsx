import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { HIRAGANA_CHARACTERS, KATAKANA_CHARACTERS, KANA_ROWS } from '../../data/kanaData';
import { KanaCharacter } from '../../types';
import { Volume2, PenTool, Sparkles, X, ChevronRight } from 'lucide-react';

export const KanaChartView: React.FC = () => {
  const { settings, speakText, navigateTo } = useApp();
  
  const [activeScript, setActiveScript] = useState<'hiragana' | 'katakana'>('hiragana');
  const [activeCategory, setActiveCategory] = useState<'all' | 'gojuon' | 'dakuten' | 'handakuten'>('all');
  const [selectedChar, setSelectedChar] = useState<KanaCharacter | null>(null);

  const characters = activeScript === 'hiragana' ? HIRAGANA_CHARACTERS : KATAKANA_CHARACTERS;
  
  const filteredChars = characters.filter(c => {
    if (activeCategory === 'all') return true;
    return c.category === activeCategory;
  });

  const handleCardClick = (char: KanaCharacter) => {
    setSelectedChar(char);
    speakText(char.audioText);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header and Filter Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-stone-200 dark:border-stone-800">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-stone-900 dark:text-stone-100 flex items-center gap-2">
            <span>{settings.language === 'bn' ? 'জাপানি কানা চার্ট' : 'Interactive Kana Matrix'}</span>
            <span className="text-xs px-2 py-0.5 rounded bg-[#C23A2B]/10 text-[#C23A2B] font-mono">
              Gojuon
            </span>
          </h2>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
            {settings.language === 'bn' 
              ? 'হিরাগানা ও কাতাকানা অক্ষরের স্পষ্ট উচ্চারণ, স্ট্রোক গাইড ও বাংলা-ইংরেজি অর্থসহ উদাহরণ।'
              : 'Explore the complete Hiragana and Katakana phonetic charts with instant audio and stroke guidance.'}
          </p>
        </div>

        {/* Script & Category Segments */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Script Segment */}
          <div className="flex items-center gap-1 p-1 bg-stone-200/60 dark:bg-stone-800 rounded-lg">
            <button
              onClick={() => setActiveScript('hiragana')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                activeScript === 'hiragana' 
                  ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-stone-100 shadow-xs font-semibold' 
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
              }`}
            >
              Hiragana (ひらがな)
            </button>
            <button
              onClick={() => setActiveScript('katakana')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                activeScript === 'katakana' 
                  ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-stone-100 shadow-xs font-semibold' 
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
              }`}
            >
              Katakana (カタカナ)
            </button>
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-1 p-1 bg-stone-100 dark:bg-stone-800/60 rounded-lg">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${activeCategory === 'all' ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-stone-100 shadow-xs' : 'text-stone-500'}`}
            >
              All
            </button>
            <button
              onClick={() => setActiveCategory('gojuon')}
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${activeCategory === 'gojuon' ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-stone-100 shadow-xs' : 'text-stone-500'}`}
            >
              Gojuon (Basic)
            </button>
            <button
              onClick={() => setActiveCategory('dakuten')}
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${activeCategory === 'dakuten' ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-stone-100 shadow-xs' : 'text-stone-500'}`}
            >
              Dakuten (G/Z/D/B)
            </button>
            <button
              onClick={() => setActiveCategory('handakuten')}
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${activeCategory === 'handakuten' ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-stone-100 shadow-xs' : 'text-stone-500'}`}
            >
              Handakuten (P)
            </button>
          </div>
        </div>
      </div>

      {/* Grid of Characters */}
      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2.5">
        {filteredChars.map((char) => (
          <button
            key={char.id}
            onClick={() => handleCardClick(char)}
            className="group relative flex flex-col items-center justify-center p-3.5 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl hover:border-[#C23A2B]/60 hover:shadow-sm active:scale-95 transition-all text-center"
          >
            <span className="text-3xl sm:text-4xl font-bold font-jp text-stone-900 dark:text-stone-100 group-hover:text-[#C23A2B] transition-colors">
              {char.character}
            </span>
            <span className="text-xs font-mono font-medium text-stone-500 dark:text-stone-400 mt-1">
              {char.romaji}
            </span>
          </button>
        ))}
      </div>

      {/* Character Inspection Modal */}
      {selectedChar && (
        <div 
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedChar(null)}
        >
          <div 
            className="w-full max-w-md bg-[#FAF9F5] dark:bg-[#151619] border border-stone-300 dark:border-stone-800 rounded-2xl shadow-2xl p-6 space-y-5"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-stone-200 dark:border-stone-800">
              <span className="text-xs font-mono text-stone-500 uppercase">
                {selectedChar.type} · {selectedChar.category}
              </span>
              <button 
                onClick={() => setSelectedChar(null)}
                className="text-stone-400 hover:text-stone-700 dark:hover:text-stone-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-center justify-center gap-6 py-4 bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-800">
              <span className="text-7xl font-bold font-jp text-stone-900 dark:text-stone-100">
                {selectedChar.character}
              </span>
              <div className="space-y-1">
                <div className="text-2xl font-mono font-bold text-[#C23A2B]">
                  {selectedChar.romaji}
                </div>
                <div className="text-xs text-stone-500">
                  {selectedChar.strokeCount} {selectedChar.strokeCount === 1 ? 'stroke' : 'strokes'}
                </div>
                <button
                  onClick={() => speakText(selectedChar.audioText)}
                  className="mt-1 flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-md bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:text-[#C23A2B]"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Listen</span>
                </button>
              </div>
            </div>

            {selectedChar.strokeHint && (
              <div className="text-xs p-3 bg-stone-100 dark:bg-stone-800/60 rounded-lg text-stone-700 dark:text-stone-300">
                <span className="font-semibold block text-stone-900 dark:text-stone-100 mb-0.5">Stroke Instruction:</span>
                {selectedChar.strokeHint}
              </div>
            )}

            {selectedChar.exampleWord && (
              <div className="text-xs space-y-1.5">
                <span className="font-semibold text-stone-600 dark:text-stone-400">Example Word:</span>
                <div className="flex items-center justify-between p-3 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-lg">
                  <div>
                    <span className="text-base font-bold font-jp text-stone-900 dark:text-stone-100">{selectedChar.exampleWord}</span>
                    <span className="text-xs text-stone-500 block font-mono">({selectedChar.exampleKana})</span>
                  </div>
                  <span className="text-xs font-medium text-stone-700 dark:text-stone-300">
                    {settings.language === 'bn' ? selectedChar.exampleMeaningBn : selectedChar.exampleMeaningEn}
                  </span>
                </div>
              </div>
            )}

            {selectedChar.similarChars && selectedChar.similarChars.length > 0 && (
              <div className="text-xs text-stone-500 flex items-center gap-2">
                <span>Avoid confusion with:</span>
                <div className="flex items-center gap-1.5 font-jp font-bold text-sm text-stone-800 dark:text-stone-200">
                  {selectedChar.similarChars.map((sim, i) => (
                    <span key={i} className="px-1.5 py-0.5 bg-stone-200 dark:bg-stone-800 rounded">
                      {sim}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={() => {
                setSelectedChar(null);
                navigateTo('writing');
              }}
              className="w-full py-2.5 text-xs font-semibold text-white bg-[#C23A2B] hover:bg-[#A82E21] rounded-lg shadow-sm flex items-center justify-center gap-2 transition-all"
            >
              <PenTool className="w-4 h-4" />
              <span>Practice Writing on Canvas</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
