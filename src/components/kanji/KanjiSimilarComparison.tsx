import React from 'react';
import { SimilarKanjiComparison } from '../../types/kanji';
import { useApp } from '../../context/AppContext';
import { Scale, AlertTriangle, ArrowRight, Lightbulb } from 'lucide-react';

interface KanjiSimilarComparisonProps {
  kanjiCharacter: string;
  similarList?: SimilarKanjiComparison[];
  pitfalls?: {
    en: string;
    bn: string;
  };
}

export const KanjiSimilarComparison: React.FC<KanjiSimilarComparisonProps> = ({
  kanjiCharacter,
  similarList,
  pitfalls,
}) => {
  const { settings, navigateTo } = useApp();

  if ((!similarList || similarList.length === 0) && !pitfalls) {
    return null;
  }

  return (
    <div className="rounded-3xl bg-white dark:bg-[#16171b] border border-stone-200 dark:border-stone-800 p-6 sm:p-8 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-600 dark:text-amber-400">
          <Scale className="w-4 h-4" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-stone-900 dark:text-white">
            {settings.language === 'bn' ? 'সাদৃশ্যপূর্ণ কাঞ্জি তুলনা ও সতর্কতা' : 'Similar Kanji Comparison & Pitfalls'}
          </h2>
          <p className="text-xs text-stone-500 dark:text-stone-400">
            {settings.language === 'bn' ? 'বিভ্রান্তিকর কাঞ্জির পার্থক্য ও সাধারণ ভুলগুলো এড়িয়ে চলুন' : 'Avoid confusion with easily mixed-up characters and irregular readings'}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Similar Characters Comparison Cards */}
        {similarList && similarList.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {similarList.map((similar, idx) => (
              <div 
                key={idx}
                className="p-4 rounded-2xl bg-stone-50 dark:bg-[#121316] border border-stone-200 dark:border-stone-800 space-y-3"
              >
                {/* Visual Pair Header */}
                <div className="flex items-center justify-center gap-4 py-2 border-b border-stone-200/80 dark:border-stone-800/80">
                  <div className="w-14 h-14 rounded-xl bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 flex flex-col items-center justify-center shadow-xs">
                    <span className="text-2xl font-bold font-jp text-stone-900 dark:text-white">
                      {kanjiCharacter}
                    </span>
                    <span className="text-[10px] text-stone-400 font-mono">Current</span>
                  </div>

                  <span className="text-xs font-bold font-mono text-[#ff5700]">VS</span>

                  <div className="w-14 h-14 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-700 flex flex-col items-center justify-center shadow-xs">
                    <span className="text-2xl font-bold font-jp text-amber-700 dark:text-amber-300">
                      {similar.character}
                    </span>
                    <span className="text-[10px] text-amber-600/70 font-mono">Similar</span>
                  </div>
                </div>

                {/* Meaning & Difference Note */}
                <div className="space-y-1.5 text-xs">
                  <div className="font-bold text-stone-800 dark:text-stone-200">
                    {similar.character} = {similar.meaningEn} ({similar.meaningBn})
                  </div>
                  <p className="text-stone-600 dark:text-stone-300 font-sans leading-relaxed">
                    <strong>Difference: </strong>{similar.differenceEn}
                  </p>
                  <p className="text-stone-500 dark:text-stone-400 leading-relaxed">
                    <strong className="text-[#ff5700]">পার্থক্য: </strong>{similar.differenceBn}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pitfalls & Tip Banner */}
        {pitfalls && (
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-900 dark:text-amber-200 space-y-1.5">
            <div className="flex items-center gap-2 font-bold font-mono uppercase text-amber-700 dark:text-amber-400">
              <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <span>Common Pitfalls & Pronunciation Tips</span>
            </div>
            <p className="leading-relaxed font-sans">
              {pitfalls.en}
            </p>
            <p className="text-amber-800/80 dark:text-amber-300/80 leading-relaxed">
              <strong className="text-[#ff5700]">সতর্কতা: </strong>{pitfalls.bn}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
