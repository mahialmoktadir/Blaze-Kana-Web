import React, { useRef, useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { HIRAGANA_CHARACTERS, KATAKANA_CHARACTERS } from '../../data/kanaData';
import { KanaCharacter } from '../../types';
import { 
  Eraser, 
  RotateCcw, 
  Eye, 
  ChevronRight, 
  ChevronLeft, 
  Volume2, 
  Grid, 
  Check, 
  Layers 
} from 'lucide-react';

export const WritingCanvasView: React.FC = () => {
  const { settings, speakText, playSfx, recordPracticeAttempt } = useApp();
  
  const [scriptType, setScriptType] = useState<'hiragana' | 'katakana'>('hiragana');
  const characters = scriptType === 'hiragana' ? HIRAGANA_CHARACTERS : KATAKANA_CHARACTERS;
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentChar: KanaCharacter = characters[currentIndex] || characters[0];

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [showGuide, setShowGuide] = useState(true);
  const [showGrid, setShowGrid] = useState(true);
  const [history, setHistory] = useState<ImageData[]>([]);
  const [hasDrawn, setHasDrawn] = useState(false);

  // Setup canvas with device pixel ratio
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = 14;
    ctx.strokeStyle = '#1F2937';

    clearCanvas();
  }, [scriptType, currentIndex]);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);
    setHistory([]);
    setHasDrawn(false);
  };

  const saveState = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    try {
      const state = ctx.getImageData(0, 0, canvas.width, canvas.height);
      setHistory(prev => [...prev.slice(-15), state]);
    } catch {}
  };

  const undo = () => {
    const canvas = canvasRef.current;
    if (!canvas || history.length === 0) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const previousHistory = [...history];
    previousHistory.pop(); // remove current
    const lastState = previousHistory[previousHistory.length - 1];

    if (lastState) {
      ctx.putImageData(lastState, 0, 0);
      setHistory(previousHistory);
    } else {
      clearCanvas();
    }
  };

  const getCanvasCoords = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();

    if ('touches' in e) {
      const touch = e.touches[0];
      return {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top,
      };
    } else {
      return {
        x: (e as React.MouseEvent).clientX - rect.left,
        y: (e as React.MouseEvent).clientY - rect.top,
      };
    }
  };

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    saveState();
    const { x, y } = getCanvasCoords(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
    setHasDrawn(true);
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { x, y } = getCanvasCoords(e);
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
  };

  const handleNext = () => {
    if (currentIndex < characters.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setCurrentIndex(0);
    }
    clearCanvas();
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    } else {
      setCurrentIndex(characters.length - 1);
    }
    clearCanvas();
  };

  const handleComplete = () => {
    playSfx('correct');
    recordPracticeAttempt(`write_${currentChar.id}`, true);
    handleNext();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top Controls Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200 dark:border-stone-800">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-stone-900 dark:text-stone-100 flex items-center gap-2">
            <span>{settings.language === 'bn' ? 'হাতে লেখা ক্যানভাস' : 'Interactive Writing Canvas'}</span>
            <span className="text-xs px-2 py-0.5 rounded bg-[#C23A2B]/10 text-[#C23A2B] font-mono">
              Stroke Studio
            </span>
          </h2>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
            {settings.language === 'bn' 
              ? 'স্পর্শ বা মাউস দিয়ে জাপানি অক্ষরের স্ট্রোক ও আকার নিখুঁতভাবে অনুশীলন করুন।'
              : 'Practice stroke posture, stroke order, and character proportions on the digital grid.'}
          </p>
        </div>

        {/* Script Switcher */}
        <div className="flex items-center gap-1 p-1 bg-stone-200/60 dark:bg-stone-800 rounded-lg self-start sm:self-auto">
          <button
            onClick={() => { setScriptType('hiragana'); setCurrentIndex(0); }}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              scriptType === 'hiragana' 
                ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-stone-100 shadow-xs font-semibold' 
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
            }`}
          >
            Hiragana (ひらがな)
          </button>
          <button
            onClick={() => { setScriptType('katakana'); setCurrentIndex(0); }}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              scriptType === 'katakana' 
                ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-stone-100 shadow-xs font-semibold' 
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
            }`}
          >
            Katakana (カタカナ)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* Left: Character Info Card */}
        <div className="md:col-span-4 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-6 space-y-5">
          <div className="flex items-center justify-between">
            <span className="text-xs text-stone-400 uppercase tracking-wider font-semibold">
              Character {currentIndex + 1} of {characters.length}
            </span>
            <button
              onClick={() => speakText(currentChar.audioText)}
              className="p-2 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-[#C23A2B]/10 hover:text-[#C23A2B] transition-colors"
              title="Hear Pronunciation"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>

          <div className="text-center py-4 bg-stone-50 dark:bg-stone-800/40 rounded-xl border border-stone-200/60 dark:border-stone-800/60">
            <div className="text-7xl font-bold font-jp text-stone-900 dark:text-stone-100">
              {currentChar.character}
            </div>
            <div className="text-lg font-mono font-semibold text-[#C23A2B] mt-2">
              {currentChar.romaji}
            </div>
            <div className="text-xs text-stone-500 mt-1">
              {currentChar.strokeCount} {currentChar.strokeCount === 1 ? 'stroke' : 'strokes'}
            </div>
          </div>

          {currentChar.strokeHint && (
            <div className="p-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-900/50 rounded-xl text-xs text-amber-900 dark:text-amber-200 space-y-1">
              <span className="font-semibold block">Stroke Sequence Hint:</span>
              <p className="leading-relaxed">{currentChar.strokeHint}</p>
            </div>
          )}

          {currentChar.exampleWord && (
            <div className="space-y-1 text-xs">
              <span className="text-stone-500 dark:text-stone-400 font-semibold block">Example Vocabulary:</span>
              <div className="flex items-baseline justify-between p-2.5 bg-stone-50 dark:bg-stone-800/60 rounded-lg border border-stone-200 dark:border-stone-700">
                <span className="font-jp text-base font-bold text-stone-900 dark:text-stone-100">{currentChar.exampleWord}</span>
                <span className="text-stone-600 dark:text-stone-300">
                  {settings.language === 'bn' ? currentChar.exampleMeaningBn : currentChar.exampleMeaningEn}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Right: Drawing Workspace */}
        <div className="md:col-span-8 flex flex-col items-center space-y-4">
          <div className="relative w-full max-w-[420px] aspect-square bg-white dark:bg-stone-900 rounded-2xl border-2 border-stone-300 dark:border-stone-700 shadow-md overflow-hidden touch-none select-none">
            {/* Traditional 4-quadrant Japanese grid */}
            {showGrid && (
              <div className="absolute inset-0 pointer-events-none opacity-20">
                <div className="w-full h-full border border-stone-400" />
                <div className="absolute inset-x-0 top-1/2 border-t border-dashed border-stone-400" />
                <div className="absolute inset-y-0 left-1/2 border-l border-dashed border-stone-400" />
                <div className="absolute inset-0 border border-dashed border-stone-300 transform rotate-45 scale-70" />
              </div>
            )}

            {/* Ghost Template Guide */}
            {showGuide && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
                <span className="text-[260px] font-jp font-normal text-stone-200 dark:text-stone-800 leading-none">
                  {currentChar.character}
                </span>
              </div>
            )}

            {/* Drawing Canvas */}
            <canvas
              ref={canvasRef}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={stopDrawing}
              className="w-full h-full cursor-crosshair relative z-10"
            />
          </div>

          {/* Action Toolbar */}
          <div className="w-full max-w-[420px] flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setShowGuide(!showGuide)}
                className={`p-2 text-xs rounded-lg border transition-colors flex items-center gap-1 ${
                  showGuide 
                    ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 text-rose-700 dark:text-rose-300' 
                    : 'bg-stone-100 dark:bg-stone-800 border-stone-200 text-stone-600'
                }`}
                title="Toggle Reference Guide"
              >
                <Eye className="w-4 h-4" />
                <span className="hidden sm:inline">Guide</span>
              </button>

              <button
                onClick={() => setShowGrid(!showGrid)}
                className={`p-2 text-xs rounded-lg border transition-colors flex items-center gap-1 ${
                  showGrid 
                    ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 text-rose-700 dark:text-rose-300' 
                    : 'bg-stone-100 dark:bg-stone-800 border-stone-200 text-stone-600'
                }`}
                title="Toggle Grid Lines"
              >
                <Grid className="w-4 h-4" />
                <span className="hidden sm:inline">Grid</span>
              </button>

              <button
                onClick={undo}
                disabled={history.length === 0}
                className="p-2 text-xs rounded-lg border border-stone-200 dark:border-stone-800 bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 disabled:opacity-40 transition-colors"
                title="Undo Stroke"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <button
                onClick={clearCanvas}
                className="p-2 text-xs rounded-lg border border-stone-200 dark:border-stone-800 bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 transition-colors"
                title="Clear Canvas"
              >
                <Eraser className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="p-2 text-xs rounded-lg border border-stone-200 dark:border-stone-800 bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 transition-colors"
                title="Previous Character"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                onClick={handleComplete}
                className="px-4 py-2 text-xs font-semibold text-white bg-[#C23A2B] hover:bg-[#A82E21] rounded-lg shadow-sm flex items-center gap-1.5 transition-all"
              >
                <Check className="w-4 h-4" />
                <span>Next</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
