import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { HIRAGANA_CHARACTERS, KATAKANA_CHARACTERS, KANA_ROWS } from '../../data/kanaData';
import { ALL_VOCABULARY, LESSONS_DATA } from '../../data/lessonsData';
import { KanaCharacter, VocabularyItem } from '../../types';
import { 
  Zap, 
  Play, 
  RotateCcw, 
  Clock, 
  CheckCircle, 
  Sliders, 
  Layers, 
  Volume2,
  X 
} from 'lucide-react';

interface PracticeQuestion {
  prompt: string;
  subPrompt?: string;
  options: string[];
  correctAnswer: string;
  audioText?: string;
  explanation: string;
}

export const PracticeHubView: React.FC = () => {
  const { settings, speakText, playSfx, recordPracticeAttempt, logMistake } = useApp();

  // Configuration state
  const [mode, setMode] = useState<'kana-to-romaji' | 'romaji-to-kana' | 'vocab-meaning' | 'vocab-reading'>('kana-to-romaji');
  const [scriptChoice, setScriptChoice] = useState<'hiragana' | 'katakana' | 'both'>('hiragana');
  const [selectedRows, setSelectedRows] = useState<string[]>(['a', 'ka', 'sa']);
  const [selectedLesson, setSelectedLesson] = useState<string>('all');
  const [questionCount, setQuestionCount] = useState<number>(10);
  const [timerDuration, setTimerDuration] = useState<number>(0); // 0 = no timer

  // Active session state
  const [inSession, setInSession] = useState(false);
  const [questions, setQuestions] = useState<PracticeQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [sessionCompleted, setSessionCompleted] = useState(false);

  const toggleRow = (rowKey: string) => {
    if (selectedRows.includes(rowKey)) {
      if (selectedRows.length > 1) {
        setSelectedRows(selectedRows.filter(r => r !== rowKey));
      }
    } else {
      setSelectedRows([...selectedRows, rowKey]);
    }
  };

  const startSession = () => {
    let generated: PracticeQuestion[] = [];

    if (mode === 'kana-to-romaji' || mode === 'romaji-to-kana') {
      // Build pool of kana
      let pool: KanaCharacter[] = [];
      if (scriptChoice === 'hiragana' || scriptChoice === 'both') {
        pool.push(...HIRAGANA_CHARACTERS.filter(c => selectedRows.includes(c.row)));
      }
      if (scriptChoice === 'katakana' || scriptChoice === 'both') {
        pool.push(...KATAKANA_CHARACTERS.filter(c => selectedRows.includes(c.row)));
      }

      if (pool.length < 4) {
        pool = HIRAGANA_CHARACTERS.slice(0, 10);
      }

      // Shuffle pool
      const shuffledPool = [...pool].sort(() => Math.random() - 0.5);
      const targetList = shuffledPool.slice(0, questionCount === 0 ? shuffledPool.length : questionCount);

      generated = targetList.map((target) => {
        if (mode === 'kana-to-romaji') {
          // Kana to Romaji options
          const distractors = pool
            .filter(c => c.romaji !== target.romaji)
            .sort(() => Math.random() - 0.5)
            .slice(0, 3)
            .map(c => c.romaji);
          const options = [target.romaji, ...distractors].sort(() => Math.random() - 0.5);

          return {
            prompt: target.character,
            subPrompt: target.type === 'hiragana' ? 'Hiragana' : 'Katakana',
            options,
            correctAnswer: target.romaji,
            audioText: target.audioText,
            explanation: `Character: ${target.character} = ${target.romaji}. Stroke count: ${target.strokeCount}.`
          };
        } else {
          // Romaji to Kana options
          const distractors = pool
            .filter(c => c.character !== target.character)
            .sort(() => Math.random() - 0.5)
            .slice(0, 3)
            .map(c => c.character);
          const options = [target.character, ...distractors].sort(() => Math.random() - 0.5);

          return {
            prompt: target.romaji,
            subPrompt: `Find the matching ${target.type}`,
            options,
            correctAnswer: target.character,
            audioText: target.audioText,
            explanation: `${target.romaji} corresponds to ${target.character}.`
          };
        }
      });
    } else {
      // Vocabulary mode
      let pool = [...ALL_VOCABULARY];
      if (selectedLesson !== 'all') {
        pool = pool.filter(v => v.lesson === Number(selectedLesson));
      }
      if (pool.length < 4) pool = ALL_VOCABULARY.slice(0, 15);

      const shuffledPool = [...pool].sort(() => Math.random() - 0.5);
      const targetList = shuffledPool.slice(0, questionCount === 0 ? shuffledPool.length : questionCount);

      generated = targetList.map((target) => {
        const meaning = settings.language === 'bn' && target.bangla ? target.bangla : target.english;
        const distractors = pool
          .filter(v => v.id !== target.id)
          .sort(() => Math.random() - 0.5)
          .slice(0, 3)
          .map(v => settings.language === 'bn' && v.bangla ? v.bangla : v.english);
        const options = [meaning, ...distractors].sort(() => Math.random() - 0.5);

        return {
          prompt: target.japanese,
          subPrompt: target.kana,
          options,
          correctAnswer: meaning,
          audioText: target.kana || target.japanese,
          explanation: `${target.japanese} (${target.romaji}) = ${meaning}`
        };
      });
    }

    setQuestions(generated);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setAnswered(false);
    setScore(0);
    setSessionCompleted(false);
    setInSession(true);
  };

  const handleSelectOption = (opt: string) => {
    if (answered) return;
    const currentQ = questions[currentIndex];
    setSelectedAnswer(opt);
    setAnswered(true);

    const isCorrect = opt === currentQ.correctAnswer;
    if (isCorrect) {
      setScore(prev => prev + 1);
      playSfx('correct');
      recordPracticeAttempt(`drill_${currentQ.prompt}`, true);
    } else {
      playSfx('incorrect');
      recordPracticeAttempt(`drill_${currentQ.prompt}`, false);
      logMistake({
        itemId: currentQ.prompt,
        itemType: 'quiz',
        prompt: currentQ.prompt,
        userAnswer: opt,
        correctAnswer: currentQ.correctAnswer,
      });
    }
  };

  const handleNextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setAnswered(false);
    } else {
      setSessionCompleted(true);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* View Header */}
      <div className="pb-4 border-b border-stone-200 dark:border-stone-800">
        <h2 className="text-xl font-bold tracking-tight text-stone-900 dark:text-stone-100 flex items-center gap-2">
          <span>{settings.language === 'bn' ? 'কাস্টম অনুশীলন হাব' : 'Custom Practice Hub'}</span>
          <span className="text-xs px-2 py-0.5 rounded bg-[#C23A2B]/10 text-[#C23A2B] font-mono">
            Trainer
          </span>
        </h2>
        <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
          Configure tailor-made practice sessions by selecting specific Kana rows, vocabulary lessons, and challenge modes.
        </p>
      </div>

      {!inSession ? (
        /* Configuration Form */
        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-6 space-y-6 shadow-xs">
          {/* Mode Selection */}
          <div className="space-y-2">
            <span className="text-xs font-semibold text-stone-700 dark:text-stone-300 uppercase tracking-wider">
              1. Choose Practice Type
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {[
                { id: 'kana-to-romaji', label: 'Kana → Romaji' },
                { id: 'romaji-to-kana', label: 'Romaji → Kana' },
                { id: 'vocab-meaning', label: 'Vocab → Meaning' },
                { id: 'vocab-reading', label: 'Vocab → Reading' },
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => setMode(item.id as any)}
                  className={`p-3 text-xs font-medium rounded-xl border text-center transition-all ${
                    mode === item.id 
                      ? 'bg-[#C23A2B]/10 border-[#C23A2B] text-[#C23A2B] font-bold shadow-xs' 
                      : 'border-stone-200 dark:border-stone-800 hover:border-stone-300 text-stone-700 dark:text-stone-300'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Script choice for Kana modes */}
          {(mode === 'kana-to-romaji' || mode === 'romaji-to-kana') && (
            <div className="space-y-4">
              <div className="space-y-2">
                <span className="text-xs font-semibold text-stone-700 dark:text-stone-300 uppercase tracking-wider">
                  2. Choose Script
                </span>
                <div className="flex items-center gap-2">
                  {(['hiragana', 'katakana', 'both'] as const).map(script => (
                    <button
                      key={script}
                      onClick={() => setScriptChoice(script)}
                      className={`px-4 py-2 text-xs font-medium rounded-lg border capitalize transition-all ${
                        scriptChoice === script 
                          ? 'bg-[#C23A2B] border-[#C23A2B] text-white font-bold' 
                          : 'border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300'
                      }`}
                    >
                      {script}
                    </button>
                  ))}
                </div>
              </div>

              {/* Row Selector Checkboxes */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-stone-700 dark:text-stone-300 uppercase tracking-wider">
                    Select Kana Rows to Practice
                  </span>
                  <div className="flex items-center gap-2 text-xs text-[#C23A2B]">
                    <button onClick={() => setSelectedRows(KANA_ROWS.map(r => r.key))} className="hover:underline">All</button>
                    <span>·</span>
                    <button onClick={() => setSelectedRows(['a'])} className="hover:underline">A only</button>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2">
                  {KANA_ROWS.map(row => {
                    const isSelected = selectedRows.includes(row.key);
                    return (
                      <button
                        key={row.key}
                        onClick={() => toggleRow(row.key)}
                        className={`p-2 text-xs rounded-lg border text-center transition-all ${
                          isSelected 
                            ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 text-rose-800 dark:text-rose-200 font-bold' 
                            : 'border-stone-200 dark:border-stone-800 text-stone-500 hover:border-stone-300'
                        }`}
                      >
                        {row.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Lesson selection for Vocab modes */}
          {(mode === 'vocab-meaning' || mode === 'vocab-reading') && (
            <div className="space-y-2">
              <span className="text-xs font-semibold text-stone-700 dark:text-stone-300 uppercase tracking-wider">
                Select Lesson Scope
              </span>
              <select
                value={selectedLesson}
                onChange={(e) => setSelectedLesson(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200"
              >
                <option value="all">All Lessons (0–25)</option>
                {LESSONS_DATA.map(l => (
                  <option key={l.id} value={l.number}>Lesson {l.number}: {l.titleEn}</option>
                ))}
              </select>
            </div>
          )}

          {/* Question Count */}
          <div className="space-y-2">
            <span className="text-xs font-semibold text-stone-700 dark:text-stone-300 uppercase tracking-wider">
              Question Quantity
            </span>
            <div className="flex items-center gap-2">
              {[10, 20, 25, 50].map(qty => (
                <button
                  key={qty}
                  onClick={() => setQuestionCount(qty)}
                  className={`px-4 py-2 text-xs font-mono font-medium rounded-lg border transition-all ${
                    questionCount === qty 
                      ? 'bg-[#C23A2B] border-[#C23A2B] text-white font-bold' 
                      : 'border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300'
                  }`}
                >
                  {qty}
                </button>
              ))}
            </div>
          </div>

          {/* Start CTA */}
          <div className="pt-4 border-t border-stone-100 dark:border-stone-800 flex justify-end">
            <button
              onClick={startSession}
              className="px-6 py-2.5 text-xs font-semibold text-white bg-[#C23A2B] hover:bg-[#A82E21] rounded-xl shadow-sm flex items-center gap-2 transition-all"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Launch Practice Session</span>
            </button>
          </div>
        </div>
      ) : (
        /* Active Practice Interface */
        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-6 space-y-6 shadow-sm">
          {!sessionCompleted ? (
            <>
              {/* Session Progress Header */}
              <div className="flex items-center justify-between pb-3 border-b border-stone-200 dark:border-stone-800 text-xs text-stone-500">
                <span className="font-mono">
                  Question {currentIndex + 1} of {questions.length}
                </span>
                <span className="font-mono text-emerald-600 font-bold">
                  Score: {score}
                </span>
                <button
                  onClick={() => setInSession(false)}
                  className="text-stone-400 hover:text-stone-700 dark:hover:text-stone-200"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Question Stage */}
              <div className="text-center py-8 space-y-3">
                <span className="text-xs text-stone-400 block font-mono">
                  {questions[currentIndex].subPrompt}
                </span>
                <div className="text-6xl font-bold font-jp text-stone-900 dark:text-stone-100">
                  {questions[currentIndex].prompt}
                </div>
                {questions[currentIndex].audioText && (
                  <button
                    onClick={() => speakText(questions[currentIndex].audioText!)}
                    className="p-2 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-600 hover:text-[#C23A2B]"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl mx-auto">
                {questions[currentIndex].options.map((opt, i) => {
                  let style = 'bg-stone-50 dark:bg-stone-800 border-stone-200 dark:border-stone-700 text-stone-800 dark:text-stone-200 hover:border-[#C23A2B]';
                  if (answered) {
                    if (opt === questions[currentIndex].correctAnswer) {
                      style = 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-800 dark:text-emerald-200 font-bold';
                    } else if (opt === selectedAnswer) {
                      style = 'bg-rose-50 dark:bg-rose-950/40 border-rose-500 text-rose-800 dark:text-rose-200 line-through';
                    }
                  }

                  return (
                    <button
                      key={i}
                      disabled={answered}
                      onClick={() => handleSelectOption(opt)}
                      className={`p-4 text-center rounded-xl border font-bold text-base transition-all ${style}`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>

              {/* Explanation Note */}
              {answered && (
                <div className="max-w-xl mx-auto p-4 bg-stone-100 dark:bg-stone-800 rounded-xl text-xs space-y-1">
                  <span className="font-bold text-stone-900 dark:text-stone-100 block">Explanation:</span>
                  <p className="text-stone-600 dark:text-stone-400">{questions[currentIndex].explanation}</p>
                </div>
              )}

              {/* Next Button */}
              {answered && (
                <div className="flex justify-end pt-4 border-t border-stone-100 dark:border-stone-800">
                  <button
                    onClick={handleNextQuestion}
                    className="px-6 py-2.5 text-xs font-semibold text-white bg-[#C23A2B] hover:bg-[#A82E21] rounded-xl shadow-xs"
                  >
                    {currentIndex < questions.length - 1 ? 'Next Question' : 'Finish Session'}
                  </button>
                </div>
              )}
            </>
          ) : (
            /* Results Screen */
            <div className="text-center py-10 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 mx-auto flex items-center justify-center">
                <CheckCircle className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100">
                Session Complete!
              </h3>
              <p className="text-sm text-stone-500 font-mono">
                Final Score: {score} / {questions.length} ({Math.round((score / questions.length) * 100)}%)
              </p>

              <div className="flex items-center justify-center gap-3 pt-4">
                <button
                  onClick={startSession}
                  className="px-4 py-2 text-xs font-semibold rounded-xl border border-stone-200 dark:border-stone-800 hover:bg-stone-100 text-stone-700 dark:text-stone-300"
                >
                  Practice Again
                </button>
                <button
                  onClick={() => setInSession(false)}
                  className="px-5 py-2 text-xs font-semibold text-white bg-[#C23A2B] hover:bg-[#A82E21] rounded-xl shadow-xs"
                >
                  Back to Hub
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
