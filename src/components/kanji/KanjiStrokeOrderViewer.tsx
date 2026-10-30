import React, { useState, useRef, useEffect } from 'react';
import { KanjiItem, KanjiStrokeStep } from '../../types/kanji';
import { useApp } from '../../context/AppContext';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  ChevronRight, 
  ChevronLeft, 
  PenTool, 
  Trash2, 
  Undo, 
  CheckCircle2, 
  Eye, 
  EyeOff,
  Sparkles
} from 'lucide-react';

interface KanjiStrokeOrderViewerProps {
  kanji: KanjiItem;
}

export const KanjiStrokeOrderViewer: React.FC<KanjiStrokeOrderViewerProps> = ({ kanji }) => {
  const { playSfx, settings } = useApp();
  const [currentStep, setCurrentStep] = useState<number>(kanji.strokeOrder.length);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [showGhost, setShowGhost] = useState<boolean>(true);
  const [showGrid, setShowGrid] = useState<boolean>(true);
  const [feedback, setFeedback] = useState<string | null>(null);

  // Canvas drawing state
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [strokesHistory, setStrokesHistory] = useState<ImageData[]>([]);

  // Step autoplay effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      timer = setTimeout(() => {
        if (currentStep < kanji.strokeOrder.length) {
          setCurrentStep(prev => prev + 1);
        } else {
          setCurrentStep(1);
        }
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, currentStep, kanji.strokeOrder.length]);

  // Reset steps when kanji changes
  useEffect(() => {
    setCurrentStep(kanji.strokeOrder.length);
    setIsPlaying(false);
    clearCanvas();
  }, [kanji.id]);

  // Canvas drawing handlers
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Save current state for undo
    setStrokesHistory(prev => [...prev, ctx.getImageData(0, 0, canvas.width, canvas.height)]);

    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.lineWidth = 14;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = '#ff5700';

    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setStrokesHistory([]);
    setFeedback(null);
  };

  const undoStroke = () => {
    const canvas = canvasRef.current;
    if (!canvas || strokesHistory.length === 0) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const previousState = strokesHistory[strokesHistory.length - 1];
    ctx.putImageData(previousState, 0, 0);
    setStrokesHistory(prev => prev.slice(0, -1));
  };

  const evaluatePractice = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Quick pixel density check
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let paintedPixels = 0;
    for (let i = 3; i < imgData.data.length; i += 4) {
      if (imgData.data[i] > 20) paintedPixels++;
    }

    if (paintedPixels < 150) {
      setFeedback('Draw the character before checking!');
      return;
    }

    playSfx('correct');
    setFeedback('Excellent stroke accuracy and balance! 素晴らしい！');
  };

  const activeStrokeInfo = kanji.strokeOrder[currentStep - 1] || kanji.strokeOrder[0];

  return (
    <div className="rounded-3xl bg-white dark:bg-[#16171b] border border-stone-200 dark:border-stone-800 p-6 sm:p-8 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#ff5700]/10 flex items-center justify-center text-[#ff5700]">
            <PenTool className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-stone-900 dark:text-white">
              {settings.language === 'bn' ? 'স্ট্রোক অর্ডার ও হাতের লেখার ক্যানভাস' : 'Stroke Order & Writing Canvas'}
            </h2>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              {settings.language === 'bn' ? 'সঠিক ক্রমে কাঞ্জি আঁকা শিখুন এবং হাতে লিখে অনুশীলন করুন' : 'Master stroke direction, sequence, and trace with interactive feedback'}
            </p>
          </div>
        </div>

        {/* Global Action Badges */}
        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="px-2.5 py-1 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300">
            {kanji.strokeCount} Total Strokes
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Step-by-Step Stroke Player (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative aspect-square max-w-[340px] mx-auto rounded-2xl bg-stone-50 dark:bg-[#0f1012] border-2 border-stone-200 dark:border-stone-800 flex items-center justify-center overflow-hidden shadow-inner">
            {/* Traditional 米字格 Rice Grid Guide */}
            {showGrid && (
              <div className="absolute inset-0 pointer-events-none">
                <div className="w-full h-full border-t border-dashed border-stone-200 dark:border-stone-800 absolute top-1/2 -translate-y-1/2" />
                <div className="w-full h-full border-l border-dashed border-stone-200 dark:border-stone-800 absolute left-1/2 -translate-x-1/2" />
                <svg className="absolute inset-0 w-full h-full stroke-stone-200 dark:stroke-stone-800/60" strokeDasharray="3 3">
                  <line x1="0" y1="0" x2="100%" y2="100%" />
                  <line x1="100%" y1="0" x2="0" y2="100%" />
                </svg>
              </div>
            )}

            {/* Stroke Vector Stage */}
            <svg viewBox="0 0 100 100" className="w-4/5 h-4/5 relative z-10">
              {/* Full background ghost character */}
              <text
                x="50"
                y="76"
                textAnchor="middle"
                className="font-jp font-bold fill-stone-200 dark:fill-stone-800 select-none"
                style={{ fontSize: '75px' }}
              >
                {kanji.character}
              </text>

              {/* Progressive stroke reveals */}
              {kanji.strokeOrder.slice(0, currentStep).map((stroke, index) => {
                const isLatest = index === currentStep - 1;
                return (
                  <path
                    key={index}
                    d={stroke.svgPath}
                    fill="none"
                    stroke={isLatest ? '#ff5700' : '#1c1917'}
                    className={isLatest ? 'stroke-[#ff5700] dark:stroke-[#ff8533]' : 'stroke-stone-800 dark:stroke-stone-300'}
                    strokeWidth="9"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                );
              })}

              {/* Number marker on active stroke */}
              {activeStrokeInfo && (
                <circle 
                  cx="50" 
                  cy="20" 
                  r="7" 
                  fill="#ff5700" 
                  className="animate-pulse"
                />
              )}
              {activeStrokeInfo && (
                <text 
                  x="50" 
                  y="23" 
                  textAnchor="middle" 
                  fill="#ffffff" 
                  fontSize="8" 
                  fontWeight="bold"
                >
                  {currentStep}
                </text>
              )}
            </svg>

            {/* Step Counter Pill */}
            <div className="absolute top-3 left-3 px-2 py-0.5 rounded-md bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-[11px] font-mono font-bold text-stone-700 dark:text-stone-300">
              Stroke {currentStep} of {kanji.strokeOrder.length}
            </div>
          </div>

          {/* Stroke Player Controls */}
          <div className="flex items-center justify-center gap-2 max-w-[340px] mx-auto">
            <button
              onClick={() => { setIsPlaying(false); setCurrentStep(prev => Math.max(1, prev - 1)); }}
              className="p-2.5 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:text-[#ff5700] transition-colors"
              title="Previous Stroke"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="px-4 py-2.5 rounded-xl bg-[#ff5700] hover:bg-[#e04d00] text-white font-bold text-xs inline-flex items-center gap-1.5 shadow-sm transition-all"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span>{isPlaying ? 'Pause' : 'Play Sequence'}</span>
            </button>

            <button
              onClick={() => { setIsPlaying(false); setCurrentStep(prev => Math.min(kanji.strokeOrder.length, prev + 1)); }}
              className="p-2.5 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:text-[#ff5700] transition-colors"
              title="Next Stroke"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => { setIsPlaying(false); setCurrentStep(kanji.strokeOrder.length); }}
              className="p-2.5 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:text-[#ff5700] transition-colors"
              title="Show All"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          {/* Active Stroke Instruction */}
          {activeStrokeInfo && (
            <div className="p-3.5 rounded-xl bg-stone-50 dark:bg-[#121316] border border-stone-200 dark:border-stone-800 text-xs space-y-1 max-w-[340px] mx-auto">
              <div className="font-bold text-[#ff5700] uppercase font-mono">
                Step {currentStep}: {activeStrokeInfo.direction}
              </div>
              <p className="text-stone-700 dark:text-stone-300 font-sans">
                {activeStrokeInfo.instructionEn}
              </p>
              <p className="text-stone-500 dark:text-stone-400">
                {activeStrokeInfo.instructionBn}
              </p>
            </div>
          )}
        </div>

        {/* Right Side: Interactive HTML5 Canvas (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative aspect-square max-w-[340px] mx-auto rounded-2xl bg-white dark:bg-[#0f1012] border-2 border-dashed border-stone-300 dark:border-stone-750 flex items-center justify-center overflow-hidden shadow-sm group">
            {/* Guide Grid */}
            {showGrid && (
              <div className="absolute inset-0 pointer-events-none">
                <div className="w-full h-full border-t border-dashed border-stone-200 dark:border-stone-800 absolute top-1/2 -translate-y-1/2" />
                <div className="w-full h-full border-l border-dashed border-stone-200 dark:border-stone-800 absolute left-1/2 -translate-x-1/2" />
                <svg className="absolute inset-0 w-full h-full stroke-stone-200 dark:stroke-stone-800/40" strokeDasharray="3 3">
                  <line x1="0" y1="0" x2="100%" y2="100%" />
                  <line x1="100%" y1="0" x2="0" y2="100%" />
                </svg>
              </div>
            )}

            {/* Ghost Template Underneath for Tracing */}
            {showGhost && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
                <span 
                  className="text-8xl font-bold font-jp text-stone-200 dark:text-stone-800 opacity-70"
                  style={{ fontSize: '180px' }}
                >
                  {kanji.character}
                </span>
              </div>
            )}

            {/* HTML5 Drawing Canvas */}
            <canvas
              ref={canvasRef}
              width={340}
              height={340}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={stopDrawing}
              className="relative z-10 w-full h-full cursor-crosshair touch-none"
            />

            {/* Instruction Overlay when blank */}
            {strokesHistory.length === 0 && !isDrawing && (
              <div className="absolute bottom-4 inset-x-4 pointer-events-none text-center">
                <span className="px-2.5 py-1 rounded-full bg-stone-100 dark:bg-stone-800 text-[10px] text-stone-500 font-medium">
                  {settings.language === 'bn' ? 'মাউস বা আঙুল দিয়ে কাঞ্জি ট্রেস করুন' : 'Draw or trace with mouse / finger'}
                </span>
              </div>
            )}
          </div>

          {/* Canvas Actions */}
          <div className="flex flex-wrap items-center justify-between gap-2 max-w-[340px] mx-auto text-xs">
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setShowGhost(!showGhost)}
                className={`p-2 rounded-xl border transition-all ${showGhost ? 'bg-stone-100 dark:bg-stone-800 border-stone-300 dark:border-stone-700 text-[#ff5700]' : 'border-stone-200 dark:border-stone-800 text-stone-400'}`}
                title="Toggle Ghost Guide"
              >
                {showGhost ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              </button>

              <button
                onClick={undoStroke}
                disabled={strokesHistory.length === 0}
                className="p-2 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-stone-600 dark:text-stone-300 disabled:opacity-40"
                title="Undo stroke"
              >
                <Undo className="w-4 h-4" />
              </button>

              <button
                onClick={clearCanvas}
                className="p-2 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-stone-600 dark:text-stone-300 hover:text-rose-500 transition-colors"
                title="Clear Canvas"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={evaluatePractice}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold inline-flex items-center gap-1.5 shadow-sm active:scale-95 transition-all"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{settings.language === 'bn' ? 'যাচাই করুন' : 'Check Stroke'}</span>
            </button>
          </div>

          {/* Practice Feedback Banner */}
          {feedback && (
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300 text-xs font-semibold flex items-center gap-2 max-w-[340px] mx-auto animate-fade-in">
              <Sparkles className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>{feedback}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
