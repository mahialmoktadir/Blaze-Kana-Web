import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { storageService } from '../../services/storageService';
import { 
  AlertCircle, 
  RotateCcw, 
  CheckCircle2, 
  Trash2, 
  Volume2, 
  Sparkles,
  ArrowRight 
} from 'lucide-react';

export const MistakeReviewView: React.FC = () => {
  const { mistakes, settings, speakText, playSfx, openSensei } = useApp();

  const [activeMistakes, setActiveMistakes] = useState(() => storageService.getMistakes());
  const unreviewed = activeMistakes.filter(m => !m.reviewed);

  // Retrying single item state
  const [retryingId, setRetryingId] = useState<string | null>(null);
  const [retryInput, setRetryInput] = useState('');
  const [retryFeedback, setRetryFeedback] = useState<'correct' | 'incorrect' | null>(null);

  const handleResolve = (id: string) => {
    storageService.resolveMistake(id);
    setActiveMistakes(storageService.getMistakes());
    playSfx('correct');
  };

  const handleStartRetry = (id: string) => {
    setRetryingId(id);
    setRetryInput('');
    setRetryFeedback(null);
  };

  const handleCheckRetry = (mistake: any) => {
    const isMatch = retryInput.trim().toLowerCase() === mistake.correctAnswer.toLowerCase();
    if (isMatch) {
      setRetryFeedback('correct');
      playSfx('correct');
      setTimeout(() => {
        handleResolve(mistake.id);
        setRetryingId(null);
      }, 1000);
    } else {
      setRetryFeedback('incorrect');
      playSfx('incorrect');
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* View Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200 dark:border-stone-800">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-stone-900 dark:text-stone-100 flex items-center gap-2">
            <span>{settings.language === 'bn' ? 'ভুল পর্যালোচনা কেন্দ্র' : 'Mistake Review Hub'}</span>
            <span className="text-xs px-2 py-0.5 rounded bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 font-mono">
              {unreviewed.length} Pending
            </span>
          </h2>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
            Review every incorrect quiz answer, understand why you missed it, and retry until mastered.
          </p>
        </div>

        {unreviewed.length > 0 && (
          <button
            onClick={() => {
              unreviewed.forEach(m => storageService.resolveMistake(m.id));
              setActiveMistakes(storageService.getMistakes());
            }}
            className="text-xs text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 self-start sm:self-auto"
          >
            Mark all resolved
          </button>
        )}
      </div>

      {unreviewed.length === 0 ? (
        <div className="p-12 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl text-center space-y-4 shadow-sm">
          <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 mx-auto flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100">
            No Pending Mistakes!
          </h3>
          <p className="text-xs text-stone-500 max-w-sm mx-auto">
            You have resolved all previous errors or have a clean quiz slate. Keep practicing!
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {unreviewed.map((m) => {
            const isRetrying = retryingId === m.id;

            return (
              <div
                key={m.id}
                className="p-5 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl shadow-xs space-y-3"
              >
                <div className="flex items-center justify-between text-xs text-stone-400 font-mono">
                  <span>{m.lesson ? `Lesson ${m.lesson}` : 'Practice Drill'} · Missed {m.mistakeCount}x</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openSensei(`Explain the correct answer for this Japanese quiz question: "${m.prompt}". Correct answer is "${m.correctAnswer}", but I answered "${m.userAnswer}".`, `Mistake Review`)}
                      className="text-[#C23A2B] hover:underline flex items-center gap-1 text-[11px]"
                    >
                      <Sparkles className="w-3 h-3" />
                      <span>Ask Sensei</span>
                    </button>
                  </div>
                </div>

                <div className="text-sm font-bold text-stone-900 dark:text-stone-100 font-jp">
                  {m.prompt}
                </div>

                {/* Comparison Details */}
                <div className="grid grid-cols-2 gap-3 text-xs p-3 rounded-xl bg-stone-50 dark:bg-stone-800/50">
                  <div>
                    <span className="text-[10px] text-rose-500 font-semibold block">Your Answer:</span>
                    <span className="text-stone-700 dark:text-stone-300 line-through font-jp">{m.userAnswer}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-emerald-600 font-semibold block">Correct Answer:</span>
                    <span className="text-emerald-700 dark:text-emerald-300 font-bold font-jp">{m.correctAnswer}</span>
                  </div>
                </div>

                {/* Inline Retry Form */}
                {isRetrying ? (
                  <div className="pt-2 flex items-center gap-2 animate-fade-in">
                    <input
                      type="text"
                      value={retryInput}
                      onChange={(e) => setRetryInput(e.target.value)}
                      placeholder="Type correct answer..."
                      className="flex-1 px-3 py-1.5 text-xs rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800"
                    />
                    <button
                      onClick={() => handleCheckRetry(m)}
                      className="px-3 py-1.5 text-xs font-semibold text-white bg-[#C23A2B] rounded-lg"
                    >
                      Verify
                    </button>
                    <button
                      onClick={() => setRetryingId(null)}
                      className="text-xs text-stone-400 hover:text-stone-700"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div className="pt-2 flex items-center justify-between border-t border-stone-100 dark:border-stone-800">
                    <button
                      onClick={() => handleResolve(m.id)}
                      className="text-xs text-emerald-600 hover:underline flex items-center gap-1"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Mark as Learned</span>
                    </button>

                    <button
                      onClick={() => handleStartRetry(m.id)}
                      className="px-3.5 py-1.5 text-xs font-semibold text-white bg-stone-900 dark:bg-stone-100 dark:text-stone-900 rounded-lg hover:opacity-90 flex items-center gap-1.5"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Retry Question</span>
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
