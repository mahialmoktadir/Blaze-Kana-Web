import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { ALL_VOCABULARY } from '../../data/lessonsData';
import { HIRAGANA_CHARACTERS } from '../../data/kanaData';
import { Eye, EyeOff, Clock, Check, X, RotateCcw, Brain } from 'lucide-react';

interface MemoryItem {
  prompt: string;
  reading: string;
  meaning: string;
  options: string[];
}

export const MemoryPracticeView: React.FC = () => {
  const { settings, playSfx, recordPracticeAttempt } = useApp();

  const [peekSeconds, setPeekSeconds] = useState<number>(2.5);
  const [inRound, setInRound] = useState(false);
  const [isRevealed, setIsRevealed] = useState(true);
  const [countdown, setCountdown] = useState<number>(peekSeconds);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);

  // Generate memory items
  const items: MemoryItem[] = React.useMemo(() => {
    return ALL_VOCABULARY.slice(0, 30).map((v) => {
      const correct = settings.language === 'bn' && v.bangla ? v.bangla : v.english;
      const distractors = ALL_VOCABULARY
        .filter(other => other.id !== v.id)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3)
        .map(other => settings.language === 'bn' && other.bangla ? other.bangla : other.english);
      const options = [correct, ...distractors].sort(() => Math.random() - 0.5);

      return {
        prompt: v.japanese,
        reading: v.kana,
        meaning: correct,
        options,
      };
    });
  }, [settings.language]);

  const currentItem = items[currentIndex] || items[0];

  const startRound = () => {
    setInRound(true);
    setIsRevealed(true);
    setCountdown(peekSeconds);
    setSelectedOption(null);
    setAnswered(false);
  };

  // Peek timer countdown
  useEffect(() => {
    if (!inRound || !isRevealed) return;

    if (countdown <= 0) {
      setIsRevealed(false);
      return;
    }

    const timer = setTimeout(() => {
      setCountdown(prev => +(prev - 0.5).toFixed(1));
    }, 500);

    return () => clearTimeout(timer);
  }, [inRound, isRevealed, countdown]);

  const handleSelect = (opt: string) => {
    if (answered) return;
    setSelectedOption(opt);
    setAnswered(true);

    const isMatch = opt === currentItem.meaning;
    if (isMatch) {
      setScore(prev => prev + 1);
      playSfx('correct');
      recordPracticeAttempt(`mem_${currentItem.prompt}`, true);
    } else {
      playSfx('incorrect');
      recordPracticeAttempt(`mem_${currentItem.prompt}`, false);
    }
  };

  const handleNext = () => {
    if (currentIndex < items.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setCurrentIndex(0);
    }
    startRound();
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* View Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200 dark:border-stone-800">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-stone-900 dark:text-stone-100 flex items-center gap-2">
            <span>{settings.language === 'bn' ? 'স্মৃতিশক্তি অনুশীলন' : 'Memory Recall Studio'}</span>
            <span className="text-xs px-2 py-0.5 rounded bg-[#C23A2B]/10 text-[#C23A2B] font-mono">
              Recall
            </span>
          </h2>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
            Glimpse the Japanese word for a few seconds before it vanishes, then recall its meaning.
          </p>
        </div>

        {/* Peek duration toggle */}
        <div className="flex items-center gap-1.5 text-xs text-stone-500">
          <span>Peek:</span>
          {[1.5, 2.5, 4.0].map(sec => (
            <button
              key={sec}
              onClick={() => { setPeekSeconds(sec); setCountdown(sec); }}
              className={`px-2 py-1 rounded-md border text-xs font-mono transition-colors ${
                peekSeconds === sec 
                  ? 'bg-[#C23A2B] text-white border-[#C23A2B] font-bold' 
                  : 'border-stone-200 dark:border-stone-700 text-stone-600'
              }`}
            >
              {sec}s
            </button>
          ))}
        </div>
      </div>

      {!inRound ? (
        <div className="p-10 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl text-center space-y-5 shadow-sm">
          <div className="w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-950/40 text-purple-600 mx-auto flex items-center justify-center">
            <Brain className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100">
            Train Working Memory & Instant Recognition
          </h3>
          <p className="text-xs text-stone-500 max-w-sm mx-auto">
            You will have {peekSeconds} seconds to memorize the character before answering.
          </p>
          <button
            onClick={startRound}
            className="px-6 py-2.5 text-xs font-semibold text-white bg-[#C23A2B] hover:bg-[#A82E21] rounded-xl shadow-xs"
          >
            Start Memory Round
          </button>
        </div>
      ) : (
        <div className="p-8 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl space-y-6 shadow-sm">
          {/* Header */}
          <div className="flex items-center justify-between text-xs text-stone-400 pb-2 border-b border-stone-100 dark:border-stone-800 font-mono">
            <span>Item {currentIndex + 1} of {items.length}</span>
            <span>Score: {score}</span>
          </div>

          {/* Flash Box */}
          <div className="py-10 text-center relative overflow-hidden rounded-2xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200/60 dark:border-stone-700/60">
            {isRevealed ? (
              <div className="space-y-2 animate-fade-in">
                <div className="text-6xl font-bold font-jp text-stone-900 dark:text-stone-100">
                  {currentItem.prompt}
                </div>
                <div className="text-xs font-jp text-stone-500">
                  {currentItem.reading}
                </div>
                <div className="inline-flex items-center gap-1 text-xs font-mono text-[#C23A2B] bg-[#C23A2B]/10 px-2 py-0.5 rounded-full mt-2">
                  <Clock className="w-3 h-3" />
                  <span>Vanishing in {countdown}s</span>
                </div>
              </div>
            ) : (
              <div className="py-6 space-y-2 text-stone-400 animate-fade-in">
                <EyeOff className="w-10 h-10 mx-auto text-stone-300 dark:text-stone-600" />
                <p className="text-sm font-semibold text-stone-700 dark:text-stone-300">
                  Word Hidden!
                </p>
                <p className="text-xs text-stone-500">
                  What was the meaning of the Japanese word?
                </p>
              </div>
            )}
          </div>

          {/* Option Choices */}
          {!isRevealed && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 animate-fade-in">
              {currentItem.options.map((opt, i) => {
                let style = 'bg-stone-50 dark:bg-stone-800 border-stone-200 dark:border-stone-700 text-stone-800 dark:text-stone-200';
                if (answered) {
                  if (opt === currentItem.meaning) {
                    style = 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-800 dark:text-emerald-200 font-bold';
                  } else if (opt === selectedOption) {
                    style = 'bg-rose-50 dark:bg-rose-950/40 border-rose-500 text-rose-800 dark:text-rose-200 line-through';
                  }
                }

                return (
                  <button
                    key={i}
                    disabled={answered}
                    onClick={() => handleSelect(opt)}
                    className={`p-4 text-center rounded-xl border text-sm font-semibold transition-all ${style}`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          )}

          {/* Next Button */}
          {answered && (
            <div className="flex justify-end pt-4 border-t border-stone-100 dark:border-stone-800">
              <button
                onClick={handleNext}
                className="px-6 py-2.5 text-xs font-semibold text-white bg-[#C23A2B] hover:bg-[#A82E21] rounded-xl shadow-xs"
              >
                Next Word
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
