import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { HIRAGANA_CHARACTERS, KATAKANA_CHARACTERS } from '../../data/kanaData';
import { ALL_VOCABULARY } from '../../data/lessonsData';
import { storageService } from '../../services/storageService';
import { Flame, CheckCircle, Volume2, Sparkles, Trophy } from 'lucide-react';

interface DailyQuestion {
  prompt: string;
  subPrompt: string;
  options: string[];
  correctAnswer: string;
  audioText?: string;
}

export const DailyChallengeView: React.FC = () => {
  const { settings, speakText, playSfx, streak } = useApp();

  const todayStr = new Date().toISOString().split('T')[0];
  const [dailyStatus, setDailyStatus] = useState(() => storageService.getDailyChallengeStatus());
  const [questions, setQuestions] = useState<DailyQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);
  const [currentScore, setCurrentScore] = useState(0);
  const [finished, setFinished] = useState(false);

  // Deterministic question generator based on today's date
  useEffect(() => {
    // Generate deterministic seed from date string: e.g. "2026-10-14"
    let seed = 0;
    for (let i = 0; i < todayStr.length; i++) {
      seed = (seed * 31 + todayStr.charCodeAt(i)) % 100000;
    }

    const pseudoRandom = (offset: number) => {
      const x = Math.sin(seed + offset) * 10000;
      return x - Math.floor(x);
    };

    const combinedPool = [
      ...HIRAGANA_CHARACTERS.map(h => ({ prompt: h.character, subPrompt: 'Hiragana → Romaji', answer: h.romaji, audio: h.audioText, distractors: ['ka', 'sa', 'ta', 'na', 'ha', 'ma', 'ra', 'wa'] })),
      ...KATAKANA_CHARACTERS.map(k => ({ prompt: k.character, subPrompt: 'Katakana → Romaji', answer: k.romaji, audio: k.audioText, distractors: ['a', 'ki', 'su', 'te', 'no', 'fu', 'mu', 'ro'] })),
      ...ALL_VOCABULARY.slice(0, 40).map(v => ({ prompt: v.japanese, subPrompt: `Vocabulary (${v.kana})`, answer: settings.language === 'bn' && v.bangla ? v.bangla : v.english, audio: v.kana || v.japanese, distractors: ['book', 'water', 'student', 'teacher', 'desk', 'car', 'bread', 'friend'] }))
    ];

    const generatedQuestions: DailyQuestion[] = [];
    for (let i = 0; i < 10; i++) {
      const idx = Math.floor(pseudoRandom(i * 7) * combinedPool.length);
      const item = combinedPool[idx];
      const otherOptions = item.distractors.filter(d => d !== item.answer).slice(0, 3);
      const options = [item.answer, ...otherOptions].sort((a, b) => (pseudoRandom(a.length + i) > 0.5 ? 1 : -1));

      generatedQuestions.push({
        prompt: item.prompt,
        subPrompt: item.subPrompt,
        options,
        correctAnswer: item.answer,
        audioText: item.audio
      });
    }

    setQuestions(generatedQuestions);
  }, [todayStr, settings.language]);

  const handleSelect = (opt: string) => {
    if (answered) return;
    setSelectedOption(opt);
    setAnswered(true);

    const isMatch = opt === questions[currentIndex].correctAnswer;
    if (isMatch) {
      setCurrentScore(prev => prev + 1);
      playSfx('correct');
    } else {
      playSfx('incorrect');
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setAnswered(false);
    } else {
      setFinished(true);
      storageService.setDailyChallengeCompleted(currentScore);
      setDailyStatus({ completed: true, score: currentScore, date: todayStr });
      playSfx('celebration');
    }
  };

  const isAlreadyDone = dailyStatus.completed && dailyStatus.date === todayStr;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Top Banner */}
      <div className="p-6 bg-gradient-to-r from-amber-500/10 via-rose-500/10 to-transparent border border-amber-200 dark:border-amber-900/50 rounded-2xl flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-amber-500 fill-amber-500" />
            <h2 className="text-lg font-bold text-stone-900 dark:text-stone-100">
              Daily Challenge · {todayStr}
            </h2>
          </div>
          <p className="text-xs text-stone-500 dark:text-stone-400">
            A deterministic 10-question mixed drill synced daily for every learner.
          </p>
        </div>

        <div className="text-right">
          <div className="text-2xl font-bold font-mono text-amber-600 dark:text-amber-400">
            {streak.currentStreak} Day Streak
          </div>
        </div>
      </div>

      {isAlreadyDone && !finished ? (
        <div className="p-8 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl text-center space-y-4 shadow-sm">
          <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 mx-auto flex items-center justify-center">
            <Trophy className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100">
            Today's Challenge Completed!
          </h3>
          <p className="text-xs text-stone-500">
            You completed today's challenge with a score of {dailyStatus.score} / 10. Your streak is securely protected.
          </p>
          <div className="pt-2">
            <button
              onClick={() => {
                setFinished(false);
                setCurrentIndex(0);
                setSelectedOption(null);
                setAnswered(false);
                setCurrentScore(0);
              }}
              className="px-4 py-2 text-xs font-semibold rounded-lg border border-stone-200 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300"
            >
              Practice Again (Unofficial)
            </button>
          </div>
        </div>
      ) : !finished && questions.length > 0 ? (
        <div className="p-6 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl space-y-6 shadow-sm">
          {/* Header */}
          <div className="flex items-center justify-between text-xs text-stone-400 pb-2 border-b border-stone-100 dark:border-stone-800">
            <span className="font-mono">Question {currentIndex + 1} of 10</span>
            <span className="font-mono text-amber-600 font-bold">Score: {currentScore}</span>
          </div>

          {/* Question Box */}
          <div className="text-center py-6 space-y-2">
            <span className="text-xs text-stone-400 font-mono block">
              {questions[currentIndex].subPrompt}
            </span>
            <div className="text-6xl font-bold font-jp text-stone-900 dark:text-stone-100">
              {questions[currentIndex].prompt}
            </div>
            {questions[currentIndex].audioText && (
              <button
                onClick={() => speakText(questions[currentIndex].audioText!)}
                className="p-1.5 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-500 hover:text-[#C23A2B]"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg mx-auto">
            {questions[currentIndex].options.map((opt, i) => {
              let style = 'bg-stone-50 dark:bg-stone-800 border-stone-200 dark:border-stone-700 text-stone-800 dark:text-stone-200';
              if (answered) {
                if (opt === questions[currentIndex].correctAnswer) {
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
                  className={`p-3.5 text-center rounded-xl border text-sm font-semibold transition-all ${style}`}
                >
                  {opt}
                </button>
              );
            })}
          </div>

          {answered && (
            <div className="flex justify-end pt-4 border-t border-stone-100 dark:border-stone-800">
              <button
                onClick={handleNext}
                className="px-6 py-2.5 text-xs font-semibold text-white bg-[#C23A2B] hover:bg-[#A82E21] rounded-xl shadow-xs"
              >
                {currentIndex < 9 ? 'Next Question' : 'Complete Challenge'}
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="p-8 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-600 mx-auto flex items-center justify-center">
            <Trophy className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100">
            Challenge Finished!
          </h3>
          <p className="text-sm text-stone-500">
            Final Daily Score: {currentScore} / 10
          </p>
        </div>
      )}
    </div>
  );
};
