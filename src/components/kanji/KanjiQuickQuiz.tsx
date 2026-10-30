import React, { useState } from 'react';
import { KanjiItem } from '../../types/kanji';
import { useApp } from '../../context/AppContext';
import { HelpCircle, CheckCircle2, XCircle, RotateCcw, Award, ArrowRight } from 'lucide-react';

interface KanjiQuickQuizProps {
  kanji: KanjiItem;
}

interface QuizQuestion {
  questionEn: string;
  questionBn: string;
  options: string[];
  correctIndex: number;
  explanationEn: string;
  explanationBn: string;
}

export const KanjiQuickQuiz: React.FC<KanjiQuickQuizProps> = ({ kanji }) => {
  const { playSfx, recordPracticeAttempt, settings } = useApp();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  // Generate dynamic 3-question mini-quiz for this specific Kanji
  const generateQuestions = (): QuizQuestion[] => {
    const q1: QuizQuestion = {
      questionEn: `What is the primary meaning of the Kanji "${kanji.character}"?`,
      questionBn: `"${kanji.character}" কাঞ্জিটির মূল অর্থ কী?`,
      options: [
        kanji.meaningEn,
        kanji.meaningEn === 'One' ? 'Two' : 'Water',
        kanji.meaningEn === 'Mountain' ? 'River' : 'Mountain',
        kanji.meaningEn === 'Sun / Day' ? 'Moon' : 'Sun / Day',
      ].sort(() => 0.5 - Math.random()),
      correctIndex: 0,
      explanationEn: `The character "${kanji.character}" means "${kanji.meaningEn}" (${kanji.meaningBn}).`,
      explanationBn: `"${kanji.character}" কাঞ্জির অর্থ হলো "${kanji.meaningEn}" (বাংলা: ${kanji.meaningBn})।`,
    };
    q1.correctIndex = q1.options.indexOf(kanji.meaningEn);

    // Question 2: Reading
    const correctReading = kanji.onyomi[0] || (kanji.kunyomi[0] ? kanji.kunyomi[0].replace('.', '') : 'イチ');
    const dummyReadings = ['スイ', 'ニチ', 'モク', 'キン', 'ジン', 'ダイ', 'トウ', 'カ'].filter(r => r !== correctReading).slice(0, 3);
    const q2Options = [correctReading, ...dummyReadings].sort(() => 0.5 - Math.random());
    const q2: QuizQuestion = {
      questionEn: `Which is a valid reading (On'yomi or Kun'yomi) for "${kanji.character}"?`,
      questionBn: `"${kanji.character}"-এর সঠিক উচ্চারণ (অন’ইওমি বা কুন’ইওমি) কোনটি?`,
      options: q2Options,
      correctIndex: q2Options.indexOf(correctReading),
      explanationEn: `"${kanji.character}" has the reading "${correctReading}".`,
      explanationBn: `"${kanji.character}" কাঞ্জির উচ্চারণ হলো "${correctReading}"।`,
    };

    // Question 3: Stroke Count
    const strokeNum = kanji.strokeCount;
    const strokeOptions = Array.from(new Set([strokeNum, Math.max(1, strokeNum - 1), strokeNum + 1, strokeNum + 2])).sort((a, b) => a - b).map(s => `${s} strokes`);
    const q3: QuizQuestion = {
      questionEn: `How many strokes does "${kanji.character}" have?`,
      questionBn: `"${kanji.character}" কাঞ্জিতে মোট কতটি স্ট্রোক রয়েছে?`,
      options: strokeOptions,
      correctIndex: strokeOptions.indexOf(`${strokeNum} strokes`),
      explanationEn: `"${kanji.character}" is precisely written with ${strokeNum} strokes.`,
      explanationBn: `"${kanji.character}" কাঞ্জিটি মোট ${strokeNum}টি স্ট্রোক দিয়ে আঁকা হয়।`,
    };

    return [q1, q2, q3];
  };

  const [questions] = useState<QuizQuestion[]>(generateQuestions);

  const handleSelectOption = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);

    const isCorrect = index === questions[currentIdx].correctIndex;
    if (isCorrect) {
      setScore(prev => prev + 1);
      playSfx('correct');
      recordPracticeAttempt(kanji.id, true);
    } else {
      playSfx('incorrect');
      recordPracticeAttempt(kanji.id, false);
    }
  };

  const handleNext = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setQuizFinished(true);
      playSfx('celebration');
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setQuizFinished(false);
  };

  return (
    <div className="rounded-3xl bg-white dark:bg-[#16171b] border border-stone-200 dark:border-stone-800 p-6 sm:p-8 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
            <HelpCircle className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-stone-900 dark:text-white">
              {settings.language === 'bn' ? 'দ্রুত অনুশীলন কুইজ' : 'Quick Mastery Check Quiz'}
            </h2>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              {settings.language === 'bn' ? `৩টি দ্রুত প্রশ্নে "${kanji.character}" কাঞ্জির জ্ঞান যাচাই করুন` : `Test meaning, reading, and stroke order for "${kanji.character}"`}
            </p>
          </div>
        </div>

        {!quizFinished && (
          <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300">
            Question {currentIdx + 1} of {questions.length}
          </span>
        )}
      </div>

      {!quizFinished ? (
        <div className="space-y-5">
          {/* Question Text */}
          <div className="p-4 rounded-2xl bg-stone-50 dark:bg-[#121316] border border-stone-200 dark:border-stone-800 space-y-1">
            <div className="text-base font-bold text-stone-900 dark:text-white font-sans">
              {questions[currentIdx].questionEn}
            </div>
            <div className="text-xs font-medium text-stone-500 dark:text-stone-400">
              {questions[currentIdx].questionBn}
            </div>
          </div>

          {/* Options Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {questions[currentIdx].options.map((option, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrect = idx === questions[currentIdx].correctIndex;

              let btnStyle = 'bg-stone-50 dark:bg-stone-900 border-stone-200 dark:border-stone-800 text-stone-800 dark:text-stone-200 hover:border-[#ff5700]/50';

              if (isAnswered) {
                if (isCorrect) {
                  btnStyle = 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-500 text-emerald-800 dark:text-emerald-200 font-bold';
                } else if (isSelected) {
                  btnStyle = 'bg-rose-50 dark:bg-rose-950/50 border-rose-500 text-rose-800 dark:text-rose-200';
                } else {
                  btnStyle = 'opacity-40 border-stone-200 dark:border-stone-800';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={isAnswered}
                  className={`p-4 rounded-xl border text-left text-sm font-semibold transition-all flex items-center justify-between gap-3 cursor-pointer ${btnStyle}`}
                >
                  <span className="font-jp">{option}</span>
                  {isAnswered && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
                  {isAnswered && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-rose-600 shrink-0" />}
                </button>
              );
            })}
          </div>

          {/* Explanation Banner & Next Button */}
          {isAnswered && (
            <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-fade-in">
              <div className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed max-w-xl">
                <span className="font-bold text-stone-900 dark:text-white">Explanation: </span>
                {questions[currentIdx].explanationEn}
              </div>

              <button
                onClick={handleNext}
                className="px-5 py-2.5 rounded-xl bg-[#ff5700] hover:bg-[#e04d00] text-white text-xs font-bold inline-flex items-center gap-1.5 shadow-md active:scale-95 transition-all self-end sm:self-auto cursor-pointer"
              >
                <span>{currentIdx < questions.length - 1 ? 'Next Question' : 'Complete Quiz'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Quiz Finished State */
        <div className="text-center py-6 space-y-4 animate-fade-in">
          <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center">
            <Award className="w-8 h-8" />
          </div>

          <div className="space-y-1">
            <h3 className="text-2xl font-black text-stone-900 dark:text-white">
              {score === 3 ? 'Perfect Score!' : 'Quiz Complete!'}
            </h3>
            <p className="text-sm text-stone-500 dark:text-stone-400">
              You scored <strong className="text-[#ff5700] font-mono">{score}</strong> out of <strong className="font-mono">{questions.length}</strong> on "{kanji.character}".
            </p>
          </div>

          <button
            onClick={handleRestart}
            className="px-5 py-2.5 rounded-xl bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 font-bold text-xs inline-flex items-center gap-2 shadow-sm transition-all cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Try Again</span>
          </button>
        </div>
      )}
    </div>
  );
};
