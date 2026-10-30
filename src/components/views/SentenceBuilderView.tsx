import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Shuffle, 
  RotateCcw, 
  Check, 
  Volume2, 
  ChevronRight, 
  Sparkles,
  HelpCircle
} from 'lucide-react';
import { TTSAudioButton } from '../common/TTSAudioButton';

interface SentencePuzzle {
  id: string;
  lesson: number;
  englishTarget: string;
  banglaTarget: string;
  tokens: string[]; // Shuffled tokens
  correctOrder: string[]; // Correct order
  romaji: string;
  explanation: string;
  grammarNote: string;
}

const PUZZLES: SentencePuzzle[] = [
  {
    id: 'sb_1',
    lesson: 1,
    englishTarget: 'I am a student.',
    banglaTarget: 'আমি একজন শিক্ষার্থী।',
    tokens: ['です', 'わたしは', '学生'],
    correctOrder: ['わたしは', '学生', 'です'],
    romaji: 'Watashi wa gakusei desu.',
    explanation: 'Topic (わたしは) + Predicate (学生) + Copula (です).',
    grammarNote: 'Predicate comes at the end.'
  },
  {
    id: 'sb_2',
    lesson: 2,
    englishTarget: 'This is my book.',
    banglaTarget: 'এটি আমার বই।',
    tokens: ['です', 'これは', '本', 'わたしの'],
    correctOrder: ['これは', 'わたしの', '本', 'です'],
    romaji: 'Kore wa watashi no hon desu.',
    explanation: 'Demonstrative (これは) + Modifier (わたしの) + Noun (本) + Copula (です).',
    grammarNote: 'Particle の modifies the following noun.'
  },
  {
    id: 'sb_3',
    lesson: 4,
    englishTarget: 'I wake up at 6 every morning.',
    banglaTarget: 'আমি প্রতিদিন সকাল ৬টায় উঠি।',
    tokens: ['起きます', '毎朝', '６時に'],
    correctOrder: ['毎朝', '６時に', '起きます'],
    romaji: 'Maiasa roku-ji ni okimasu.',
    explanation: 'Time expression (毎朝) + Specific time point with に (６時に) + Verb (起きます).',
    grammarNote: 'Specific clock time takes particle に.'
  },
  {
    id: 'sb_4',
    lesson: 6,
    englishTarget: 'I drink water.',
    banglaTarget: 'আমি পানি পান করি।',
    tokens: ['水を', '飲みます', 'わたしは'],
    correctOrder: ['わたしは', '水を', '飲みます'],
    romaji: 'Watashi wa mizu o nomimasu.',
    explanation: 'Topic (わたしは) + Direct Object with を (水を) + Transitive Verb (飲みます).',
    grammarNote: 'Particle を marks the direct object.'
  },
  {
    id: 'sb_5',
    lesson: 5,
    englishTarget: 'I go to Kyoto by train.',
    banglaTarget: 'আমি ট্রেনে করে কিয়োটো যাব।',
    tokens: ['行きます', '電車で', '京都へ'],
    correctOrder: ['電車で', '京都へ', '行きます'],
    romaji: 'Densha de Kyouto e ikimasu.',
    explanation: 'Means with で (電車で) + Destination with へ (京都へ) + Motion Verb (行きます).',
    grammarNote: 'へ marks destination, で marks transportation.'
  },
  {
    id: 'sb_6',
    lesson: 14,
    englishTarget: 'Please wait a moment.',
    banglaTarget: 'দয়া করে একটু অপেক্ষা করুন।',
    tokens: ['待ってください', 'ちょっと'],
    correctOrder: ['ちょっと', '待ってください'],
    romaji: 'Chotto matte kudasai.',
    explanation: 'Adverb (ちょっと) + Verb request (待ってください).',
    grammarNote: 'V-te kudasai forms polite requests.'
  }
];

export const SentenceBuilderView: React.FC = () => {
  const { settings, speakText, playSfx, recordPracticeAttempt, openSensei } = useApp();

  const [currentIndex, setCurrentIndex] = useState(0);
  const currentPuzzle = PUZZLES[currentIndex];

  const [selectedTokens, setSelectedTokens] = useState<string[]>([]);
  const [availableTokens, setAvailableTokens] = useState<string[]>(() => [...currentPuzzle.tokens]);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleSelectToken = (token: string, index: number) => {
    if (isAnswered) return;
    setSelectedTokens([...selectedTokens, token]);
    const updated = [...availableTokens];
    updated.splice(index, 1);
    setAvailableTokens(updated);
  };

  const handleDeselectToken = (token: string, index: number) => {
    if (isAnswered) return;
    setAvailableTokens([...availableTokens, token]);
    const updated = [...selectedTokens];
    updated.splice(index, 1);
    setSelectedTokens(updated);
  };

  const handleReset = () => {
    setSelectedTokens([]);
    setAvailableTokens([...currentPuzzle.tokens]);
    setIsAnswered(false);
  };

  const handleCheck = () => {
    if (selectedTokens.length === 0) return;
    const isMatch = selectedTokens.join('') === currentPuzzle.correctOrder.join('');
    setIsAnswered(true);
    setIsCorrect(isMatch);

    if (isMatch) {
      playSfx('correct');
      recordPracticeAttempt(`sb_${currentPuzzle.id}`, true);
      speakText(selectedTokens.join(''));
    } else {
      playSfx('incorrect');
      recordPracticeAttempt(`sb_${currentPuzzle.id}`, false);
    }
  };

  const handleNext = () => {
    if (currentIndex < PUZZLES.length - 1) {
      const nextIdx = currentIndex + 1;
      setCurrentIndex(nextIdx);
      setSelectedTokens([]);
      setAvailableTokens([...PUZZLES[nextIdx].tokens]);
      setIsAnswered(false);
    } else {
      setCurrentIndex(0);
      setSelectedTokens([]);
      setAvailableTokens([...PUZZLES[0].tokens]);
      setIsAnswered(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200 dark:border-stone-800">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-stone-900 dark:text-stone-100 flex items-center gap-2">
            <span>{settings.language === 'bn' ? 'জাপানি বাক্য গঠন কর্মশালা' : 'Interactive Sentence Builder'}</span>
            <span className="text-xs px-2 py-0.5 rounded bg-[#C23A2B]/10 text-[#C23A2B] font-mono">
              SOV Assembly
            </span>
          </h2>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
            {settings.language === 'bn' 
              ? 'শব্দাংশগুলো ক্রমানুসারে সাজিয়ে সঠিক জাপানি ব্যাকরণ ও পদক্রম অনুযায়ী বাক্য তৈরি করুন।'
              : 'Tap to assemble tokens into natural Subject-Object-Verb Japanese sentences with correct particle order.'}
          </p>
        </div>

        <span className="text-xs font-mono text-stone-500">
          Puzzle {currentIndex + 1} of {PUZZLES.length}
        </span>
      </div>

      {/* Target Prompt Box */}
      <div className="p-6 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl shadow-xs space-y-3">
        <div className="flex items-center justify-between text-xs text-stone-400 font-mono">
          <span>Lesson {currentPuzzle.lesson} Target</span>
          <span>Tap blocks to add / remove</span>
        </div>

        <div className="space-y-1">
          <div className="text-lg font-bold text-stone-900 dark:text-stone-100">
            {currentPuzzle.englishTarget}
          </div>
          {settings.showBangla && (
            <div className="text-sm text-stone-600 dark:text-stone-400 font-sans">
              {currentPuzzle.banglaTarget}
            </div>
          )}
        </div>
      </div>

      {/* Construction Slot (Drop / Select Area) */}
      <div className="p-6 min-h-[120px] bg-stone-50 dark:bg-stone-800/40 border-2 border-dashed border-stone-300 dark:border-stone-700 rounded-2xl flex flex-wrap items-center gap-2.5">
        {selectedTokens.length === 0 ? (
          <span className="text-xs text-stone-400 italic">
            Select tokens from below in the correct sentence order...
          </span>
        ) : (
          selectedTokens.map((token, idx) => (
            <button
              key={idx}
              onClick={() => handleDeselectToken(token, idx)}
              className="px-4 py-2 bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-600 rounded-xl font-jp font-bold text-base text-stone-900 dark:text-stone-100 shadow-xs hover:border-rose-400 active:scale-95 transition-all"
            >
              {token}
            </button>
          ))
        )}
      </div>

      {/* Available Word Tokens Bank */}
      <div className="space-y-2">
        <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
          Available Tokens
        </span>
        <div className="flex flex-wrap items-center gap-2.5 min-h-[50px]">
          {availableTokens.map((token, idx) => (
            <button
              key={idx}
              onClick={() => handleSelectToken(token, idx)}
              disabled={isAnswered}
              className="px-4 py-2 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:border-[#C23A2B] rounded-xl font-jp font-bold text-base text-stone-900 dark:text-stone-100 shadow-xs active:scale-95 transition-all disabled:opacity-50"
            >
              {token}
            </button>
          ))}
        </div>
      </div>

      {/* Verification & Feedback */}
      {isAnswered && (
        <div className={`p-5 rounded-2xl border ${
          isCorrect 
            ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200' 
            : 'bg-rose-50 dark:bg-rose-950/30 border-rose-300 dark:border-rose-800 text-rose-900 dark:text-rose-200'
        } space-y-3 animate-fade-in`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-bold text-sm">
              {isCorrect ? (
                <>
                  <Check className="w-5 h-5 text-emerald-600" />
                  <span>Correct Sentence Structure! (正解)</span>
                </>
              ) : (
                <span>Not quite correct yet. Try again or check the correct order.</span>
              )}
            </div>
            <TTSAudioButton 
              text={currentPuzzle.correctOrder.join('')}
              enableSpeedToggle={true}
              size="sm"
              title={`Hear sentence pronunciation: ${currentPuzzle.correctOrder.join('')}`}
            />
          </div>

          <div className="space-y-1 text-xs">
            <div className="font-bold font-jp text-base text-stone-900 dark:text-stone-100">
              {currentPuzzle.correctOrder.join(' ')}
            </div>
            <div className="font-mono text-[#C23A2B]">
              {currentPuzzle.romaji}
            </div>
            <p className="mt-1 leading-relaxed opacity-90">
              <strong>Grammar Rule:</strong> {currentPuzzle.explanation}
            </p>
          </div>

          <div className="pt-2 flex items-center justify-between border-t border-emerald-200/50 dark:border-emerald-800/50">
            <button
              onClick={() => openSensei(`Explain the sentence structure: "${currentPuzzle.correctOrder.join('')}"`, `Lesson ${currentPuzzle.lesson}`)}
              className="text-xs text-[#C23A2B] hover:underline flex items-center gap-1"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ask Sensei why this order is used</span>
            </button>

            <button
              onClick={handleNext}
              className="px-4 py-2 text-xs font-semibold text-white bg-[#C23A2B] hover:bg-[#A82E21] rounded-lg shadow-sm flex items-center gap-1"
            >
              <span>Next Puzzle</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Control Buttons */}
      {!isAnswered && (
        <div className="flex items-center justify-between pt-2">
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>

          <button
            onClick={handleCheck}
            disabled={selectedTokens.length === 0}
            className="px-6 py-2.5 text-xs font-semibold text-white bg-[#C23A2B] hover:bg-[#A82E21] disabled:opacity-40 rounded-xl shadow-sm transition-all"
          >
            Check Sentence
          </button>
        </div>
      )}
    </div>
  );
};
