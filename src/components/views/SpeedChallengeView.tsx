import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { HIRAGANA_CHARACTERS } from '../../data/kanaData';
import { ALL_VOCABULARY } from '../../data/lessonsData';
import { Zap, Timer, Flame, Trophy, Play, RotateCcw } from 'lucide-react';

interface SpeedQ {
  prompt: string;
  options: string[];
  correctAnswer: string;
}

export const SpeedChallengeView: React.FC = () => {
  const { playSfx, recordPracticeAttempt, storageService } = useApp() as any;

  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(45);
  const [currentQ, setCurrentQ] = useState<SpeedQ | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  // Generate question pool
  const generateRandomQ = (): SpeedQ => {
    const isKana = Math.random() > 0.4;
    if (isKana) {
      const char = HIRAGANA_CHARACTERS[Math.floor(Math.random() * HIRAGANA_CHARACTERS.length)];
      const distractors = HIRAGANA_CHARACTERS
        .filter(c => c.romaji !== char.romaji)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3)
        .map(c => c.romaji);
      const options = [char.romaji, ...distractors].sort(() => Math.random() - 0.5);
      return {
        prompt: char.character,
        options,
        correctAnswer: char.romaji
      };
    } else {
      const v = ALL_VOCABULARY[Math.floor(Math.random() * ALL_VOCABULARY.length)];
      const distractors = ALL_VOCABULARY
        .filter(other => other.id !== v.id)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3)
        .map(other => other.english);
      const options = [v.english, ...distractors].sort(() => Math.random() - 0.5);
      return {
        prompt: v.japanese,
        options,
        correctAnswer: v.english
      };
    }
  };

  const startGame = () => {
    setTimeLeft(45);
    setCorrectCount(0);
    setIncorrectCount(0);
    setCurrentStreak(0);
    setBestStreak(0);
    setGameOver(false);
    setCurrentQ(generateRandomQ());
    setIsPlaying(true);
  };

  // Timer loop
  useEffect(() => {
    if (!isPlaying) return;
    if (timeLeft <= 0) {
      setIsPlaying(false);
      setGameOver(true);
      playSfx('celebration');
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isPlaying, timeLeft]);

  const handleAnswer = (choice: string) => {
    if (!isPlaying || !currentQ) return;

    if (choice === currentQ.correctAnswer) {
      setCorrectCount(c => c + 1);
      const nextStreak = currentStreak + 1;
      setCurrentStreak(nextStreak);
      setBestStreak(b => Math.max(b, nextStreak));
      playSfx('correct');
    } else {
      setIncorrectCount(i => i + 1);
      setCurrentStreak(0);
      playSfx('incorrect');
    }

    setCurrentQ(generateRandomQ());
  };

  const total = correctCount + incorrectCount;
  const accuracy = total > 0 ? Math.round((correctCount / total) * 100) : 0;

  return (
    <div className="max-w-xl mx-auto space-y-6">
      {/* View Header */}
      <div className="pb-4 border-b border-stone-200 dark:border-stone-800 text-center">
        <h2 className="text-xl font-bold tracking-tight text-stone-900 dark:text-stone-100 flex items-center justify-center gap-2">
          <Zap className="w-5 h-5 text-amber-500 fill-amber-500" />
          <span>45-Second Speed Sprint</span>
        </h2>
        <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
          Rapid-fire Kana & vocabulary recall. Keep your streak blazing!
        </p>
      </div>

      {!isPlaying && !gameOver ? (
        <div className="p-8 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl text-center space-y-4 shadow-sm">
          <div className="w-16 h-16 rounded-full bg-amber-100 dark:bg-amber-950/40 text-amber-600 mx-auto flex items-center justify-center">
            <Timer className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100">
            Ready for the Speed Sprint?
          </h3>
          <p className="text-xs text-stone-500 max-w-sm mx-auto">
            Answer as many questions as you can in 45 seconds without breaking your streak.
          </p>
          <button
            onClick={startGame}
            className="px-6 py-2.5 text-xs font-semibold text-white bg-[#C23A2B] hover:bg-[#A82E21] rounded-xl shadow-xs inline-flex items-center gap-2"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>Start Sprint</span>
          </button>
        </div>
      ) : isPlaying && currentQ ? (
        <div className="p-6 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl space-y-5 shadow-sm">
          {/* Header Stats */}
          <div className="flex items-center justify-between text-xs font-mono pb-2 border-b border-stone-100 dark:border-stone-800">
            <div className="flex items-center gap-1.5 text-rose-600 font-bold">
              <Timer className="w-4 h-4" />
              <span className="text-base">{timeLeft}s</span>
            </div>

            <div className="flex items-center gap-1 text-amber-500 font-bold">
              <Flame className="w-4 h-4 fill-amber-500" />
              <span>{currentStreak} Streak</span>
            </div>

            <div className="text-emerald-600 font-bold">
              Score: {correctCount}
            </div>
          </div>

          {/* Speed Question Prompt */}
          <div className="py-8 text-center">
            <div className="text-7xl font-bold font-jp text-stone-900 dark:text-stone-100">
              {currentQ.prompt}
            </div>
          </div>

          {/* Rapid Options */}
          <div className="grid grid-cols-2 gap-3">
            {currentQ.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleAnswer(opt)}
                className="p-4 text-center rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 font-bold text-base hover:bg-[#C23A2B]/10 hover:border-[#C23A2B] hover:text-[#C23A2B] active:scale-95 transition-all text-stone-900 dark:text-stone-100"
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      ) : (
        /* Results Screen */
        <div className="p-8 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl text-center space-y-5 shadow-sm">
          <div className="w-16 h-16 rounded-full bg-amber-100 dark:bg-amber-950/40 text-amber-600 mx-auto flex items-center justify-center">
            <Trophy className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100">
            Sprint Complete!
          </h3>

          <div className="grid grid-cols-3 gap-3 p-4 bg-stone-50 dark:bg-stone-800/40 rounded-2xl font-mono text-center">
            <div>
              <span className="text-xs text-stone-400 block">Correct</span>
              <span className="text-xl font-bold text-emerald-600">{correctCount}</span>
            </div>
            <div>
              <span className="text-xs text-stone-400 block">Best Streak</span>
              <span className="text-xl font-bold text-amber-500">{bestStreak}</span>
            </div>
            <div>
              <span className="text-xs text-stone-400 block">Accuracy</span>
              <span className="text-xl font-bold text-stone-900 dark:text-stone-100">{accuracy}%</span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              onClick={startGame}
              className="px-5 py-2.5 text-xs font-semibold text-white bg-[#C23A2B] hover:bg-[#A82E21] rounded-xl shadow-xs"
            >
              Play Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
