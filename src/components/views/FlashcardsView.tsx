import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { ALL_VOCABULARY, LESSONS_DATA } from '../../data/lessonsData';
import { VocabularyItem } from '../../types';
import { TTSAudioButton } from '../common/TTSAudioButton';
import { 
  RotateCw, 
  Volume2, 
  Star, 
  AlertCircle, 
  ChevronRight, 
  ChevronLeft, 
  Shuffle, 
  Check, 
  X,
  Filter 
} from 'lucide-react';

export const FlashcardsView: React.FC = () => {
  const { settings, speakText, playSfx, recordPracticeAttempt, toggleFavorite, toggleDifficult, progress } = useApp();

  const [selectedLesson, setSelectedLesson] = useState<string>('all');
  const [filterType, setFilterType] = useState<'all' | 'difficult' | 'favorites'>('all');
  const [cards, setCards] = useState<VocabularyItem[]>(() => [...ALL_VOCABULARY]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    let pool = [...ALL_VOCABULARY];
    if (selectedLesson !== 'all') {
      pool = pool.filter(v => v.lesson === Number(selectedLesson));
    }
    if (filterType === 'favorites') {
      pool = pool.filter(v => progress[v.id]?.isFavorite);
    } else if (filterType === 'difficult') {
      pool = pool.filter(v => progress[v.id]?.isDifficult);
    }
    setCards(pool.length > 0 ? pool : ALL_VOCABULARY);
    setCurrentIndex(0);
    setIsFlipped(false);
  }, [selectedLesson, filterType, progress]);

  const currentCard = cards[currentIndex] || cards[0];

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    playSfx('click');
  };

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex(prev => (prev < cards.length - 1 ? prev + 1 : 0));
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex(prev => (prev > 0 ? prev - 1 : cards.length - 1));
  };

  const handleShuffle = () => {
    setIsFlipped(false);
    const shuffled = [...cards].sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setCurrentIndex(0);
  };

  const handleMarkResult = (correct: boolean) => {
    if (correct) {
      playSfx('correct');
      recordPracticeAttempt(currentCard.id, true);
    } else {
      playSfx('incorrect');
      recordPracticeAttempt(currentCard.id, false);
      toggleDifficult(currentCard.id);
    }
    handleNext();
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        handleFlip();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === '1') {
        handleMarkResult(false);
      } else if (e.key === '2') {
        handleMarkResult(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, isFlipped, cards]);

  const itemProgress = progress[currentCard?.id];
  const isFav = !!itemProgress?.isFavorite;
  const isDiff = !!itemProgress?.isDifficult;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header and Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200 dark:border-stone-800">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-stone-900 dark:text-stone-100 flex items-center gap-2">
            <span>{settings.language === 'bn' ? 'স্মার্ট ফ্ল্যাশ কার্ড' : 'SRS Flashcards'}</span>
            <span className="text-xs px-2 py-0.5 rounded bg-[#C23A2B]/10 text-[#C23A2B] font-mono">
              3D Flip
            </span>
          </h2>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
            Tap or press Space to flip. Use arrow keys to navigate.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={selectedLesson}
            onChange={(e) => setSelectedLesson(e.target.value)}
            className="px-2.5 py-1.5 text-xs rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-200"
          >
            <option value="all">All Lessons</option>
            {LESSONS_DATA.map(l => (
              <option key={l.id} value={l.number}>Lesson {l.number}</option>
            ))}
          </select>

          <button
            onClick={handleShuffle}
            className="p-1.5 rounded-lg border border-stone-200 dark:border-stone-800 hover:bg-stone-100 text-stone-600 dark:text-stone-300"
            title="Shuffle Deck"
          >
            <Shuffle className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Card Counter & Badges */}
      <div className="flex items-center justify-between text-xs text-stone-400 font-mono">
        <span>Card {currentIndex + 1} of {cards.length}</span>
        <div className="flex items-center gap-2">
          <span>Lesson {currentCard.lesson}</span>
          <span>·</span>
          <span className="capitalize">{currentCard.partOfSpeech}</span>
        </div>
      </div>

      {/* 3D Flashcard Container */}
      <div 
        onClick={handleFlip}
        className="w-full aspect-4/3 sm:aspect-16/10 cursor-pointer select-none perspective-[1000px]"
      >
        <div 
          className={`relative w-full h-full transition-transform duration-500 transform-style-3d ${
            isFlipped ? 'rotate-y-180' : ''
          }`}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Front Face */}
          <div 
            className="absolute inset-0 bg-white dark:bg-stone-900 border-2 border-stone-200 dark:border-stone-800 rounded-3xl p-8 flex flex-col justify-between shadow-md backface-hidden"
            style={{ backfaceVisibility: 'hidden' }}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-stone-400">JAPANESE (FRONT)</span>
              <TTSAudioButton 
                text={currentCard.japanese}
                reading={currentCard.kana}
                enableSpeedToggle={true}
                size="md"
                stopPropagation={true}
                title={`Hear pronunciation: ${currentCard.japanese}`}
              />
            </div>

            <div className="text-center space-y-2">
              <div className="text-5xl sm:text-6xl font-bold font-jp text-stone-900 dark:text-stone-100">
                {currentCard.japanese}
              </div>
              <div className="text-sm font-jp text-stone-500">
                {currentCard.kana}
              </div>
              {settings.showRomaji && (
                <div className="text-xs font-mono text-[#C23A2B]">
                  {currentCard.romaji}
                </div>
              )}
            </div>

            <div className="text-center text-xs text-stone-400 flex items-center justify-center gap-1">
              <RotateCw className="w-3.5 h-3.5" />
              <span>Tap card to reveal meaning</span>
            </div>
          </div>

          {/* Back Face */}
          <div 
            className="absolute inset-0 bg-stone-50 dark:bg-stone-900 border-2 border-[#C23A2B]/40 rounded-3xl p-8 flex flex-col justify-between shadow-md rotate-y-180 backface-hidden"
            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-[#C23A2B] font-semibold">MEANING (BACK)</span>
              <div className="flex items-center gap-1">
                <TTSAudioButton 
                  text={currentCard.japanese}
                  reading={currentCard.kana}
                  enableSpeedToggle={true}
                  size="sm"
                  stopPropagation={true}
                  title="Re-play pronunciation"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(currentCard.id);
                  }}
                  className={`p-1.5 rounded ${isFav ? 'text-amber-500' : 'text-stone-400'}`}
                >
                  <Star className="w-4 h-4" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleDifficult(currentCard.id);
                  }}
                  className={`p-1.5 rounded ${isDiff ? 'text-rose-500' : 'text-stone-400'}`}
                >
                  <AlertCircle className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="text-center space-y-3">
              <div className="text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100">
                {currentCard.english}
              </div>
              {settings.showBangla && currentCard.bangla && (
                <div className="text-base text-stone-700 dark:text-stone-300 font-sans">
                  {currentCard.bangla}
                </div>
              )}

              {currentCard.example && (
                <div className="mt-4 p-3.5 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-xs space-y-2 text-left shadow-xs">
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-0.5">
                      <div className="font-jp font-semibold text-stone-900 dark:text-stone-100 text-sm">
                        {currentCard.example.japanese}
                      </div>
                      <div className="text-[11px] font-mono text-stone-500">
                        {currentCard.example.romaji}
                      </div>
                    </div>
                    <TTSAudioButton 
                      text={currentCard.example.japanese}
                      reading={currentCard.example.kana}
                      size="xs"
                      enableSpeedToggle={true}
                      stopPropagation={true}
                      title={`Listen to example: ${currentCard.example.japanese}`}
                    />
                  </div>
                  <div className="text-[11px] text-stone-600 dark:text-stone-400 pt-1 border-t border-stone-100 dark:border-stone-700">
                    {settings.language === 'bn' ? currentCard.example.bangla : currentCard.example.english}
                  </div>
                </div>
              )}
            </div>

            <div className="text-center text-xs text-stone-400">
              Rate your recall below
            </div>
          </div>
        </div>
      </div>

      {/* Control Actions */}
      <div className="flex items-center justify-between gap-3 pt-2">
        <button
          onClick={handlePrev}
          className="p-3 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300 hover:bg-stone-100"
          title="Previous Card"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 flex-1 justify-center max-w-xs">
          <button
            onClick={() => handleMarkResult(false)}
            className="flex-1 py-3 px-4 rounded-xl border border-rose-300 dark:border-rose-800 bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 text-xs font-bold hover:bg-rose-100 transition-colors flex items-center justify-center gap-1.5"
          >
            <X className="w-4 h-4" />
            <span>Difficult (1)</span>
          </button>

          <button
            onClick={() => handleMarkResult(true)}
            className="flex-1 py-3 px-4 rounded-xl border border-emerald-300 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 text-xs font-bold hover:bg-emerald-100 transition-colors flex items-center justify-center gap-1.5"
          >
            <Check className="w-4 h-4" />
            <span>Easy (2)</span>
          </button>
        </div>

        <button
          onClick={handleNext}
          className="p-3 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300 hover:bg-stone-100"
          title="Next Card"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
