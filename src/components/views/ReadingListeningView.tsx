import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ALL_VOCABULARY, LESSONS_DATA } from '../../data/lessonsData';
import { 
  Headphones, 
  Volume2, 
  Square,
  Eye, 
  EyeOff, 
  ChevronRight, 
  ChevronLeft, 
  RotateCcw,
  Gauge,
  Sparkles 
} from 'lucide-react';
import { TTSAudioButton } from '../common/TTSAudioButton';

export const ReadingListeningView: React.FC = () => {
  const { settings, toggleSpeakText, stopSpeakText, currentlySpeaking, isSpeaking, openSensei } = useApp();

  // Combine sentences from vocabulary and grammar
  const items = React.useMemo(() => {
    const list: {
      japanese: string;
      kana: string;
      romaji: string;
      english: string;
      bangla: string;
      lesson: number;
    }[] = [];

    LESSONS_DATA.forEach(l => {
      l.vocabulary.forEach(v => {
        if (v.example) {
          list.push({
            japanese: v.example.japanese,
            kana: v.example.kana,
            romaji: v.example.romaji,
            english: v.example.english,
            bangla: v.example.bangla,
            lesson: l.number,
          });
        }
      });
      l.grammarPoints.forEach(g => {
        g.examples.forEach(ex => {
          list.push({
            japanese: ex.japanese,
            kana: ex.kana,
            romaji: ex.romaji,
            english: ex.english,
            bangla: ex.bangla,
            lesson: l.number,
          });
        });
      });
    });

    return list.slice(0, 40);
  }, []);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [showTranscript, setShowTranscript] = useState(false);
  const [slowAudio, setSlowAudio] = useState(false);

  const currentItem = items[currentIndex] || items[0];
  const targetText = currentItem.kana || currentItem.japanese;
  const isPlayingThis = isSpeaking && currentlySpeaking === targetText;

  const handleTogglePlay = () => {
    if (isPlayingThis) {
      stopSpeakText();
    } else {
      toggleSpeakText(targetText, slowAudio ? 0.72 : (settings.audioSpeed || 0.95));
    }
  };

  const handleNext = () => {
    setShowTranscript(false);
    setCurrentIndex(prev => (prev < items.length - 1 ? prev + 1 : 0));
  };

  const handlePrev = () => {
    setShowTranscript(false);
    setCurrentIndex(prev => (prev > 0 ? prev - 1 : items.length - 1));
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* View Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200 dark:border-stone-800">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-stone-900 dark:text-stone-100 flex items-center gap-2">
            <span>{settings.language === 'bn' ? 'শোনা ও পড়ার অনুশীলন' : 'Reading & Listening Lab'}</span>
            <span className="text-xs px-2 py-0.5 rounded bg-[#C23A2B]/10 text-[#C23A2B] font-mono">
              Comprehension
            </span>
          </h2>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
            Listen without seeing the text first to train native ear recognition, then reveal transcript and translations.
          </p>
        </div>

        <span className="text-xs font-mono text-stone-400">
          Sentence {currentIndex + 1} of {items.length}
        </span>
      </div>

      {/* Main Listening Canvas */}
      <div className="p-8 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl text-center space-y-6 shadow-sm">
        <div className="flex items-center justify-between text-xs text-stone-400 font-mono">
          <span>Lesson {currentItem.lesson} Dialogue</span>
          <button
            onClick={() => setSlowAudio(!slowAudio)}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-md border text-[11px] transition-colors ${
              slowAudio 
                ? 'bg-[#C23A2B]/10 border-[#C23A2B] text-[#C23A2B] font-bold' 
                : 'border-stone-200 dark:border-stone-700 text-stone-500'
            }`}
          >
            <Gauge className="w-3.5 h-3.5" />
            <span>{slowAudio ? 'Slow (0.7x)' : 'Normal (1.0x)'}</span>
          </button>
        </div>

        {/* Big Audio Play / Toggle Button */}
        <div className="py-4">
          <button
            type="button"
            onClick={handleTogglePlay}
            className={`w-24 h-24 rounded-full text-white shadow-xl hover:scale-105 active:scale-95 transition-all mx-auto flex flex-col items-center justify-center group cursor-pointer ${
              isPlayingThis
                ? 'bg-gradient-to-tr from-[#ff5700] to-[#e11d48] ring-4 ring-[#ff5700]/30 animate-pulse'
                : 'bg-gradient-to-tr from-[#C23A2B] to-[#ff5700]'
            }`}
            title={isPlayingThis ? 'Stop Audio' : 'Play Japanese Audio'}
          >
            {isPlayingThis ? (
              <div className="flex flex-col items-center gap-1">
                <Square className="w-8 h-8 fill-white text-white" />
                <span className="text-[10px] font-bold tracking-wider uppercase">Stop</span>
              </div>
            ) : (
              <Volume2 className="w-10 h-10 group-hover:scale-110 transition-transform" />
            )}
          </button>
          <span className="text-xs text-stone-500 dark:text-stone-400 mt-2.5 block font-medium">
            {isPlayingThis ? 'Playing audio... Tap to stop' : 'Tap to listen to native pronunciation'}
          </span>
        </div>

        {/* Transcript Box (Hidden / Revealed) */}
        {showTranscript ? (
          <div className="p-6 bg-stone-50 dark:bg-stone-800/60 rounded-2xl border border-stone-200 dark:border-stone-700 space-y-3.5 text-left animate-fade-in shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-stone-400 uppercase tracking-wider">Japanese Transcript</span>
              <div className="flex items-center gap-2">
                <TTSAudioButton 
                  text={currentItem.japanese}
                  reading={currentItem.kana}
                  size="sm"
                  enableSpeedToggle={true}
                  title={`Replay: ${currentItem.japanese}`}
                />
                <button
                  type="button"
                  onClick={() => openSensei(`Explain the breakdown of this sentence: "${currentItem.japanese}"`, `Lesson ${currentItem.lesson}`)}
                  className="text-xs text-[#ff5700] hover:underline flex items-center gap-1 cursor-pointer font-medium"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Explain Breakdown</span>
                </button>
              </div>
            </div>

            <div className="text-xl sm:text-2xl font-bold font-jp text-stone-900 dark:text-stone-100">
              {currentItem.japanese}
            </div>

            <div className="text-xs font-mono text-[#ff5700]">
              {currentItem.romaji}
            </div>

            <div className="pt-2 border-t border-stone-200 dark:border-stone-700/60 space-y-1">
              <div className="text-xs font-medium text-stone-800 dark:text-stone-200">
                {currentItem.english}
              </div>
              {settings.showBangla && (
                <div className="text-xs text-stone-600 dark:text-stone-400 font-sans">
                  {currentItem.bangla}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="py-6">
            <button
              onClick={() => setShowTranscript(true)}
              className="px-5 py-2.5 text-xs font-semibold rounded-xl border border-stone-300 dark:border-stone-700 hover:border-stone-400 bg-stone-50 dark:bg-stone-800 text-stone-700 dark:text-stone-300 inline-flex items-center gap-2 transition-all"
            >
              <Eye className="w-4 h-4 text-stone-400" />
              <span>Reveal Japanese Transcript & Translation</span>
            </button>
          </div>
        )}

        {/* Navigation controls */}
        <div className="flex items-center justify-between pt-4 border-t border-stone-100 dark:border-stone-800">
          <button
            onClick={handlePrev}
            className="p-2.5 rounded-xl border border-stone-200 dark:border-stone-800 text-stone-600 hover:bg-stone-100"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            onClick={handleNext}
            className="px-5 py-2.5 text-xs font-semibold text-white bg-[#C23A2B] hover:bg-[#A82E21] rounded-xl shadow-xs flex items-center gap-1.5"
          >
            <span>Next Sentence</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
