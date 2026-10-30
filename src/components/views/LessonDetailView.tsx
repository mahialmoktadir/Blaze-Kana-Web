import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { LESSONS_DATA } from '../../data/lessonsData';
import { Lesson, VocabularyItem, GrammarPoint } from '../../types';
import { TTSAudioButton } from '../common/TTSAudioButton';
import { 
  ArrowLeft, 
  CheckCircle2, 
  Clock, 
  Volume2, 
  Sparkles, 
  BookOpen, 
  Cpu, 
  Check, 
  AlertCircle,
  HelpCircle,
  ChevronRight
} from 'lucide-react';

export const LessonDetailView: React.FC = () => {
  const { 
    selectedLessonId, 
    navigateTo, 
    settings, 
    completedLessons, 
    completeLesson, 
    speakText, 
    openSensei,
    playSfx,
    recordPracticeAttempt,
    logMistake
  } = useApp();

  const lesson = LESSONS_DATA.find(l => l.id === selectedLessonId) || LESSONS_DATA[1];
  const isCompleted = completedLessons.includes(lesson.id);

  const [activeTab, setActiveTab] = useState<'overview' | 'vocab' | 'grammar' | 'quiz'>('overview');

  // Quiz state
  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [quizAnswered, setQuizAnswered] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const currentQuestion = lesson.quiz[quizIndex];

  const handleAnswerQuiz = (option: string) => {
    if (quizAnswered) return;
    setSelectedOption(option);
    setQuizAnswered(true);

    const isCorrect = option === currentQuestion.correctAnswer;
    if (isCorrect) {
      setQuizScore(prev => prev + 1);
      playSfx('correct');
      recordPracticeAttempt(`quiz_${currentQuestion.id}`, true);
    } else {
      playSfx('incorrect');
      recordPracticeAttempt(`quiz_${currentQuestion.id}`, false);
      logMistake({
        itemId: currentQuestion.id,
        itemType: 'quiz',
        prompt: currentQuestion.question,
        userAnswer: option,
        correctAnswer: currentQuestion.correctAnswer,
        lesson: lesson.number,
      });
    }
  };

  const handleNextQuestion = () => {
    if (quizIndex < lesson.quiz.length - 1) {
      setQuizIndex(prev => prev + 1);
      setSelectedOption(null);
      setQuizAnswered(false);
    } else {
      setQuizFinished(true);
      if (quizScore + 1 >= Math.ceil(lesson.quiz.length * 0.7)) {
        completeLesson(lesson.id);
      }
    }
  };

  const handleRestartQuiz = () => {
    setQuizIndex(0);
    setSelectedOption(null);
    setQuizAnswered(false);
    setQuizScore(0);
    setQuizFinished(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Back button & Lesson Banner */}
      <div className="space-y-3">
        <button
          onClick={() => navigateTo('lessons')}
          className="inline-flex items-center gap-1.5 text-xs text-stone-500 hover:text-stone-900 dark:hover:text-stone-200 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Lesson Catalogue</span>
        </button>

        <div className="p-6 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-xs">
              <span className="font-mono font-bold px-2 py-0.5 rounded bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300">
                {lesson.isOrientation ? 'Orientation' : `Lesson ${lesson.number}`}
              </span>
              <span className="text-stone-400">·</span>
              <span className="text-stone-500 dark:text-stone-400 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> {lesson.estimatedMinutes} min
              </span>
            </div>

            <h1 className="text-xl font-bold tracking-tight text-stone-900 dark:text-stone-100">
              {lesson.titleEn}
            </h1>
            {settings.showBangla && (
              <p className="text-xs text-stone-600 dark:text-stone-400 font-sans">
                {lesson.titleBn}
              </p>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => openSensei(`Teach me the core concepts of Lesson ${lesson.number}: ${lesson.titleEn}`, `Lesson ${lesson.number}`)}
              className="px-3.5 py-2 text-xs font-semibold rounded-xl border border-[#C23A2B]/30 bg-[#C23A2B]/10 text-[#C23A2B] hover:bg-[#C23A2B]/20 flex items-center gap-1.5 transition-colors whitespace-nowrap"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ask Sensei</span>
            </button>

            {!isCompleted ? (
              <button
                onClick={() => completeLesson(lesson.id)}
                className="px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-xs transition-colors whitespace-nowrap"
              >
                Mark Complete
              </button>
            ) : (
              <div className="px-3.5 py-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl flex items-center gap-1.5 whitespace-nowrap">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Completed</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tabs Menu */}
      <div className="flex items-center gap-1 p-1 bg-stone-200/60 dark:bg-stone-800 rounded-xl overflow-x-auto">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors ${
            activeTab === 'overview' 
              ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-stone-100 shadow-xs' 
              : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
          }`}
        >
          1. Overview & Objectives
        </button>
        <button
          onClick={() => setActiveTab('vocab')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors ${
            activeTab === 'vocab' 
              ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-stone-100 shadow-xs' 
              : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
          }`}
        >
          2. Vocabulary ({lesson.vocabulary.length})
        </button>
        <button
          onClick={() => setActiveTab('grammar')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors ${
            activeTab === 'grammar' 
              ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-stone-100 shadow-xs' 
              : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
          }`}
        >
          3. Visual Grammar ({lesson.grammarPoints.length})
        </button>
        <button
          onClick={() => setActiveTab('quiz')}
          className={`px-4 py-2 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors ${
            activeTab === 'quiz' 
              ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-stone-100 shadow-xs' 
              : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
          }`}
        >
          4. End-of-Lesson Quiz
        </button>
      </div>

      {/* Tab 1: Overview */}
      {activeTab === 'overview' && (
        <div className="space-y-6 animate-fade-in">
          <div className="p-6 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl space-y-4">
            <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100 uppercase tracking-wider">
              {settings.language === 'bn' ? 'পাঠের উদ্দেশ্যসমূহ' : 'Learning Objectives'}
            </h3>
            <ul className="space-y-2 text-xs text-stone-700 dark:text-stone-300">
              {lesson.objectives.map((obj, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#C23A2B] mt-1.5 shrink-0" />
                  <span>{obj}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-6 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl space-y-3">
            <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100 uppercase tracking-wider">
              Lesson Summary
            </h3>
            <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
              {settings.language === 'bn' ? lesson.descriptionBn : lesson.descriptionEn}
            </p>
            <div className="pt-3 flex items-center justify-end">
              <button
                onClick={() => setActiveTab('vocab')}
                className="px-4 py-2 text-xs font-semibold text-white bg-[#C23A2B] hover:bg-[#A82E21] rounded-lg shadow-xs flex items-center gap-1.5 transition-all"
              >
                <span>Continue to Vocabulary</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Vocabulary */}
      {activeTab === 'vocab' && (
        <div className="space-y-4 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {lesson.vocabulary.map((v) => (
              <div
                key={v.id}
                className="p-4 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl space-y-2.5 shadow-xs"
              >
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-xl font-bold font-jp text-stone-900 dark:text-stone-100">
                      {v.japanese}
                    </span>
                    <span className="text-xs text-stone-500 font-jp ml-2">
                      {v.kana}
                    </span>
                  </div>
                  <TTSAudioButton 
                    text={v.japanese}
                    reading={v.kana}
                    enableSpeedToggle={true}
                    size="sm"
                    title={`Pronounce ${v.japanese}`}
                  />
                </div>

                <div className="text-xs font-mono text-[#C23A2B]">
                  {v.romaji}
                </div>

                <div className="text-xs text-stone-800 dark:text-stone-200 font-medium">
                  {v.english}
                </div>
                {settings.showBangla && v.bangla && (
                  <div className="text-xs text-stone-600 dark:text-stone-400 font-sans">
                    {v.bangla}
                  </div>
                )}

                {/* Example sentence card if available */}
                {v.example && (
                  <div className="mt-2 pt-2 border-t border-stone-100 dark:border-stone-800/80">
                    <div className="flex items-start justify-between gap-2 p-2 bg-stone-50 dark:bg-stone-800/50 rounded-lg text-xs">
                      <div className="space-y-0.5">
                        <div className="font-jp font-semibold text-stone-900 dark:text-stone-100">
                          {v.example.japanese}
                        </div>
                        <div className="text-[11px] font-mono text-stone-500">
                          {v.example.romaji}
                        </div>
                        <div className="text-[11px] text-stone-600 dark:text-stone-400">
                          {settings.language === 'bn' ? v.example.bangla : v.example.english}
                        </div>
                      </div>
                      <TTSAudioButton 
                        text={v.example.japanese}
                        reading={v.example.kana}
                        size="xs"
                        enableSpeedToggle={true}
                        title={`Listen to sentence: ${v.example.japanese}`}
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="pt-3 flex items-center justify-between">
            <button
              onClick={() => setActiveTab('overview')}
              className="text-xs text-stone-500 hover:underline"
            >
              Previous: Overview
            </button>
            <button
              onClick={() => setActiveTab('grammar')}
              className="px-4 py-2 text-xs font-semibold text-white bg-[#C23A2B] hover:bg-[#A82E21] rounded-lg shadow-xs flex items-center gap-1.5"
            >
              <span>Continue to Grammar</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Tab 3: Visual Grammar */}
      {activeTab === 'grammar' && (
        <div className="space-y-4 animate-fade-in">
          {lesson.grammarPoints.map((g) => (
            <div
              key={g.id}
              className="p-5 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl space-y-3"
            >
              <h3 className="text-base font-bold font-jp text-stone-900 dark:text-stone-100 flex items-center gap-2">
                <span className="text-xs px-2 py-0.5 rounded bg-[#C23A2B]/10 text-[#C23A2B] font-mono">Rule</span>
                <span>{g.pattern}</span>
              </h3>

              <div className="flex flex-wrap items-center gap-1.5 p-3 bg-stone-50 dark:bg-stone-800/40 rounded-xl border border-stone-200/50">
                {g.structure.map((s, idx) => (
                  <React.Fragment key={idx}>
                    <span className="px-2.5 py-1 text-xs rounded-md bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-800 dark:text-stone-200 font-medium">
                      {s.label}
                    </span>
                    {idx < g.structure.length - 1 && <span className="text-stone-400 font-bold text-xs">+</span>}
                  </React.Fragment>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs leading-relaxed">
                <div className="p-3 bg-stone-50 dark:bg-stone-800/40 rounded-lg">
                  <span className="font-semibold block mb-0.5">Explanation:</span>
                  {g.explanationEn}
                </div>
                {settings.showBangla && (
                  <div className="p-3 bg-rose-50/40 dark:bg-rose-950/20 rounded-lg text-rose-900 dark:text-rose-200 font-sans">
                    <span className="font-semibold block mb-0.5">বাংলা অর্থ ও নিয়ম:</span>
                    {g.explanationBn}
                  </div>
                )}
              </div>

              <div className="space-y-2 pt-2">
                <span className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider">Example:</span>
                {g.examples.map((ex, i) => (
                  <div key={i} className="p-3 bg-stone-50 dark:bg-stone-800/60 rounded-xl flex items-center justify-between gap-2">
                    <div className="space-y-0.5">
                      <div className="font-jp text-sm font-bold text-stone-900 dark:text-stone-100">{ex.japanese}</div>
                      <div className="text-xs font-mono text-[#C23A2B]">{ex.romaji}</div>
                      <div className="text-xs text-stone-600 dark:text-stone-400">
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
          ))}

          <div className="pt-3 flex items-center justify-between">
            <button
              onClick={() => setActiveTab('vocab')}
              className="text-xs text-stone-500 hover:underline"
            >
              Previous: Vocabulary
            </button>
            <button
              onClick={() => setActiveTab('quiz')}
              className="px-4 py-2 text-xs font-semibold text-white bg-[#C23A2B] hover:bg-[#A82E21] rounded-lg shadow-xs flex items-center gap-1.5"
            >
              <span>Take Lesson Quiz</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Tab 4: Quiz */}
      {activeTab === 'quiz' && (
        <div className="p-6 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl space-y-5 animate-fade-in">
          {!quizFinished ? (
            <>
              <div className="flex items-center justify-between text-xs text-stone-400 pb-2 border-b border-stone-200 dark:border-stone-800">
                <span>Question {quizIndex + 1} of {lesson.quiz.length}</span>
                <span>Score: {quizScore}</span>
              </div>

              <div className="space-y-3">
                <h4 className="text-base font-bold text-stone-900 dark:text-stone-100">
                  {currentQuestion.question}
                </h4>

                {currentQuestion.promptJp && (
                  <div className="p-3 bg-stone-50 dark:bg-stone-800 rounded-lg text-lg font-jp font-bold text-stone-900 dark:text-stone-100">
                    {currentQuestion.promptJp}
                  </div>
                )}
              </div>

              {/* Options */}
              <div className="space-y-2">
                {currentQuestion.options?.map((opt, i) => {
                  let style = 'bg-stone-50 dark:bg-stone-800 border-stone-200 dark:border-stone-700 text-stone-800 dark:text-stone-200';
                  if (quizAnswered) {
                    if (opt === currentQuestion.correctAnswer) {
                      style = 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-800 dark:text-emerald-200 font-bold';
                    } else if (opt === selectedOption) {
                      style = 'bg-rose-50 dark:bg-rose-950/40 border-rose-500 text-rose-800 dark:text-rose-200 line-through';
                    }
                  }

                  return (
                    <button
                      key={i}
                      disabled={quizAnswered}
                      onClick={() => handleAnswerQuiz(opt)}
                      className={`w-full text-left p-3 text-xs rounded-xl border transition-all ${style}`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>

              {/* Explanation upon answering */}
              {quizAnswered && (
                <div className="p-4 bg-stone-100 dark:bg-stone-800 rounded-xl text-xs space-y-1">
                  <span className="font-bold text-stone-900 dark:text-stone-100 block">Explanation:</span>
                  <p className="text-stone-600 dark:text-stone-400">{currentQuestion.explanation}</p>
                </div>
              )}

              {quizAnswered && (
                <div className="flex justify-end pt-2">
                  <button
                    onClick={handleNextQuestion}
                    className="px-5 py-2 text-xs font-semibold text-white bg-[#C23A2B] hover:bg-[#A82E21] rounded-lg shadow-xs flex items-center gap-1"
                  >
                    <span>{quizIndex < lesson.quiz.length - 1 ? 'Next Question' : 'Complete Quiz'}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-8 space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center">
                <Check className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100">
                Lesson Quiz Completed!
              </h3>
              <p className="text-xs text-stone-500">
                You scored {quizScore} out of {lesson.quiz.length}
              </p>

              <div className="flex items-center justify-center gap-3 pt-4">
                <button
                  onClick={handleRestartQuiz}
                  className="px-4 py-2 text-xs font-medium rounded-lg border border-stone-200 dark:border-stone-800 hover:bg-stone-100 text-stone-700 dark:text-stone-300"
                >
                  Retry Quiz
                </button>
                <button
                  onClick={() => navigateTo('lessons')}
                  className="px-5 py-2 text-xs font-semibold text-white bg-[#C23A2B] hover:bg-[#A82E21] rounded-lg shadow-xs"
                >
                  Return to Catalogue
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
