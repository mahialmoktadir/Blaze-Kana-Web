import React, { useState, useEffect } from 'react';
import { KanjiItem } from '../../types/kanji';
import { useApp } from '../../context/AppContext';
import { Play, RotateCcw, Sparkles, Eye, Info, Check, Lightbulb } from 'lucide-react';

interface KanjiMemoryMnemonicProps {
  kanji: KanjiItem;
}

export const KanjiMemoryMnemonic: React.FC<KanjiMemoryMnemonicProps> = ({ kanji }) => {
  const { settings } = useApp();
  const [animating, setAnimating] = useState(true);
  const [stage, setStage] = useState<'illustration' | 'morph' | 'kanji'>('illustration');
  const [autoCycle, setAutoCycle] = useState(true);

  // Trigger animation loop
  useEffect(() => {
    let timeout1: NodeJS.Timeout;
    let timeout2: NodeJS.Timeout;
    let timeout3: NodeJS.Timeout;

    if (autoCycle) {
      setAnimating(true);
      setStage('illustration');

      timeout1 = setTimeout(() => {
        setStage('morph');
      }, 1800);

      timeout2 = setTimeout(() => {
        setStage('kanji');
      }, 3400);

      timeout3 = setTimeout(() => {
        setStage('illustration');
      }, 6000);
    }

    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
      clearTimeout(timeout3);
    };
  }, [kanji.id, autoCycle]);

  const restartAnimation = () => {
    setAnimating(false);
    setTimeout(() => {
      setAnimating(true);
      setStage('illustration');
    }, 50);
  };

  // Render SVG visual elements according to animationType
  const renderVisualScene = () => {
    const type = kanji.mnemonic.animationType;

    switch (type) {
      case 'peaks':
        return (
          <g className="transition-all duration-700 ease-in-out">
            {/* Mountain Peaks with morphing gradient */}
            <polygon 
              points="100,160 50,230 150,230" 
              className={`fill-amber-700/60 dark:fill-stone-700 transition-all duration-700 ${stage === 'kanji' ? 'opacity-20' : 'opacity-90'}`}
            />
            <polygon 
              points="200,90 120,230 280,230" 
              className={`fill-[#ff5700]/70 dark:fill-[#ff5700]/80 transition-all duration-700 ${stage === 'kanji' ? 'opacity-20' : 'opacity-90'}`}
            />
            <polygon 
              points="300,150 250,230 350,230" 
              className={`fill-amber-600/60 dark:fill-stone-600 transition-all duration-700 ${stage === 'kanji' ? 'opacity-20' : 'opacity-90'}`}
            />
            {/* Ridge Lines */}
            <line x1="200" y1="90" x2="200" y2="230" stroke="#ff8533" strokeWidth="4" strokeLinecap="round" />
            <line x1="100" y1="160" x2="100" y2="230" stroke="#ff8533" strokeWidth="3" strokeLinecap="round" />
            <line x1="300" y1="150" x2="300" y2="230" stroke="#ff8533" strokeWidth="3" strokeLinecap="round" />
          </g>
        );

      case 'water':
        return (
          <g className="transition-all duration-700">
            {/* 3 Flowing Water Currents */}
            <path 
              d="M130,80 Q120,150 110,220" 
              fill="none" 
              stroke="#38bdf8" 
              strokeWidth="10" 
              strokeLinecap="round" 
              className="animate-pulse" 
            />
            <path 
              d="M200,95 Q200,160 200,215" 
              fill="none" 
              stroke="#0284c7" 
              strokeWidth="12" 
              strokeLinecap="round" 
            />
            <path 
              d="M270,80 Q275,150 270,220" 
              fill="none" 
              stroke="#38bdf8" 
              strokeWidth="10" 
              strokeLinecap="round" 
              className="animate-pulse" 
            />
            {/* Water Droplets */}
            <circle cx="150" cy="120" r="6" fill="#7dd3fc" />
            <circle cx="250" cy="180" r="6" fill="#7dd3fc" />
          </g>
        );

      case 'fire':
        return (
          <g className="transition-all duration-700">
            {/* Flame Silhouette */}
            <path 
              d="M200,70 C240,120 250,160 235,210 C220,240 180,240 165,210 C150,160 160,120 200,70 Z" 
              fill="url(#fireGradient)" 
              className="animate-pulse"
            />
            <circle cx="140" cy="140" r="10" fill="#ff5700" className="animate-ping opacity-75" />
            <circle cx="260" cy="135" r="10" fill="#ff8533" className="animate-ping opacity-75" />
            {/* Central crossing sparks */}
            <line x1="200" y1="90" x2="160" y2="230" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" />
            <line x1="190" y1="150" x2="245" y2="230" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" />
          </g>
        );

      case 'sun':
        return (
          <g className="transition-all duration-700">
            {/* Sun Disc */}
            <circle cx="200" cy="150" r="60" fill="#ff5700" className="opacity-80" />
            <circle cx="200" cy="150" r="45" fill="#fef08a" />
            {/* Sun Rays */}
            <line x1="200" y1="60" x2="200" y2="75" stroke="#ff5700" strokeWidth="5" strokeLinecap="round" />
            <line x1="200" y1="225" x2="200" y2="240" stroke="#ff5700" strokeWidth="5" strokeLinecap="round" />
            <line x1="110" y1="150" x2="125" y2="150" stroke="#ff5700" strokeWidth="5" strokeLinecap="round" />
            <line x1="275" y1="150" x2="290" y2="150" stroke="#ff5700" strokeWidth="5" strokeLinecap="round" />
            {/* Center sunspot dividing into kanji line */}
            <line x1="160" y1="150" x2="240" y2="150" stroke="#ff5700" strokeWidth="5" strokeLinecap="round" />
          </g>
        );

      case 'moon':
        return (
          <g className="transition-all duration-700">
            {/* Crescent Moon */}
            <path 
              d="M170,80 A65,65 0 0,0 215,225 A60,60 0 1,1 170,80 Z" 
              fill="#fbbf24" 
              className="drop-shadow-lg"
            />
            {/* Clouds across moon */}
            <line x1="150" y1="130" x2="240" y2="130" stroke="#e0e7ff" strokeWidth="5" strokeLinecap="round" opacity="0.6" />
            <line x1="140" y1="175" x2="235" y2="175" stroke="#e0e7ff" strokeWidth="5" strokeLinecap="round" opacity="0.6" />
          </g>
        );

      case 'tree':
        return (
          <g className="transition-all duration-700">
            {/* Tree Canopy and Trunk */}
            <circle cx="200" cy="115" r="45" fill="#22c55e" className="opacity-80" />
            {/* Horizontal Branch */}
            <line x1="120" y1="140" x2="280" y2="140" stroke="#92400e" strokeWidth="8" strokeLinecap="round" />
            {/* Vertical Trunk */}
            <line x1="200" y1="90" x2="200" y2="230" stroke="#78350f" strokeWidth="10" strokeLinecap="round" />
            {/* Roots */}
            <line x1="200" y1="140" x2="140" y2="230" stroke="#92400e" strokeWidth="8" strokeLinecap="round" />
            <line x1="200" y1="140" x2="260" y2="230" stroke="#92400e" strokeWidth="8" strokeLinecap="round" />
          </g>
        );

      case 'person':
        return (
          <g className="transition-all duration-700">
            {/* Head */}
            <circle cx="200" cy="85" r="22" fill="#ff5700" />
            {/* Body Spine */}
            <line x1="200" y1="107" x2="200" y2="160" stroke="#ff5700" strokeWidth="10" strokeLinecap="round" />
            {/* Arms */}
            <line x1="130" y1="135" x2="270" y2="135" stroke="#ff5700" strokeWidth="9" strokeLinecap="round" />
            {/* Legs Striding */}
            <line x1="200" y1="160" x2="145" y2="230" stroke="#ff5700" strokeWidth="10" strokeLinecap="round" />
            <line x1="200" y1="160" x2="255" y2="230" stroke="#ff5700" strokeWidth="10" strokeLinecap="round" />
          </g>
        );

      case 'box':
        return (
          <g className="transition-all duration-700">
            {/* Enclosure Frame */}
            <rect x="130" y="90" width="140" height="130" rx="12" fill="none" stroke="#ff5700" strokeWidth="8" />
            {/* Inner dividers / windows */}
            <line x1="200" y1="90" x2="200" y2="220" stroke="#ff8533" strokeWidth="6" />
            <line x1="130" y1="155" x2="270" y2="155" stroke="#ff8533" strokeWidth="6" />
          </g>
        );

      case 'door':
        return (
          <g className="transition-all duration-700">
            {/* Gate Posts */}
            <rect x="110" y="80" width="40" height="140" rx="6" fill="#334155" />
            <rect x="250" y="80" width="40" height="140" rx="6" fill="#334155" />
            {/* Open Portal Light Beam */}
            <polygon points="150,80 250,80 270,220 130,220" fill="#fef08a" opacity="0.3" />
            <circle cx="200" cy="150" r="30" fill="#ff5700" opacity="0.8" />
          </g>
        );

      default:
        // Generic dynamic transformation
        return (
          <g className="transition-all duration-700">
            <circle cx="200" cy="150" r="60" fill="none" stroke="#ff5700" strokeWidth="6" strokeDasharray="6 6" />
            <line x1="140" y1="150" x2="260" y2="150" stroke="#ff5700" strokeWidth="10" strokeLinecap="round" />
            <line x1="200" y1="90" x2="200" y2="210" stroke="#ff8533" strokeWidth="10" strokeLinecap="round" />
          </g>
        );
    }
  };

  return (
    <div className="rounded-3xl bg-white dark:bg-[#16171b] border border-stone-200 dark:border-stone-800 p-6 sm:p-8 shadow-sm space-y-6">
      {/* Header and Mode Switcher */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#ff5700]/10 flex items-center justify-center text-[#ff5700]">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-stone-900 dark:text-white">
              {settings.language === 'bn' ? 'অ্যানিমেটেড মেমোরি দৃশ্য (স্মৃতিসহায়ক)' : 'Visual Memory Mnemonic'}
            </h2>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              {settings.language === 'bn' ? 'অক্ষরের রূপ ও অর্থ স্মরণে রাখার চিত্রকল্প' : 'Connect character shape with meaning through visual storytelling'}
            </p>
          </div>
        </div>

        {/* Animation Controls */}
        <div className="flex items-center gap-2 self-stretch sm:self-auto">
          <div className="flex bg-stone-100 dark:bg-stone-800 p-1 rounded-xl text-xs font-semibold">
            <button
              onClick={() => { setAutoCycle(false); setStage('illustration'); }}
              className={`px-3 py-1 rounded-lg transition-all ${stage === 'illustration' ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-white shadow-xs' : 'text-stone-500'}`}
            >
              {settings.language === 'bn' ? 'দৃশ্য' : 'Scene'}
            </button>
            <button
              onClick={() => { setAutoCycle(false); setStage('morph'); }}
              className={`px-3 py-1 rounded-lg transition-all ${stage === 'morph' ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-white shadow-xs' : 'text-stone-500'}`}
            >
              {settings.language === 'bn' ? 'রূপান্তর' : 'Morph'}
            </button>
            <button
              onClick={() => { setAutoCycle(false); setStage('kanji'); }}
              className={`px-3 py-1 rounded-lg transition-all ${stage === 'kanji' ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-white shadow-xs' : 'text-stone-500'}`}
            >
              {settings.language === 'bn' ? 'কাঞ্জি' : 'Kanji'}
            </button>
          </div>

          <button
            onClick={restartAnimation}
            title="Replay Animation"
            className="p-2 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:text-[#ff5700] transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Interactive Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Visual Graphic Stage (Left 7 cols) */}
        <div className="lg:col-span-6 relative w-full aspect-4/3 rounded-2xl bg-stone-900 overflow-hidden flex items-center justify-center border border-stone-800 shadow-inner">
          {/* Subtle Grid Background */}
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

          {/* SVG Animated Canvas */}
          <svg 
            viewBox="0 0 400 300" 
            className="w-full h-full"
          >
            <defs>
              <linearGradient id="fireGradient" x1="0%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#cc4400" />
                <stop offset="50%" stopColor="#ff5700" />
                <stop offset="100%" stopColor="#fef08a" />
              </linearGradient>
            </defs>

            {/* Visual Scene Elements */}
            <g className={`transition-opacity duration-700 ${stage === 'kanji' ? 'opacity-25' : 'opacity-100'}`}>
              {renderVisualScene()}
            </g>

            {/* Kanji Overlay that glows into view */}
            <g className={`transition-all duration-700 ${stage === 'illustration' ? 'opacity-0 scale-90' : 'opacity-100 scale-100'} origin-center`}>
              <text 
                x="200" 
                y="190" 
                textAnchor="middle" 
                className="font-jp font-bold fill-white drop-shadow-[0_4px_16px_rgba(255,87,0,0.5)]" 
                style={{ fontSize: '120px' }}
              >
                {kanji.character}
              </text>
            </g>
          </svg>

          {/* Stage State Pill */}
          <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md text-[11px] font-mono text-stone-300 border border-white/10 flex items-center gap-1.5">
            <span className={`w-2 h-2 rounded-full ${stage === 'kanji' ? 'bg-[#ff5700]' : 'bg-emerald-400'} animate-pulse`} />
            <span className="capitalize">{stage} Mode</span>
          </div>
        </div>

        {/* Narrative & Story Explanation (Right 6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="p-5 rounded-2xl bg-stone-50 dark:bg-[#121316] border border-stone-200 dark:border-stone-800 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-[#ff5700] uppercase tracking-wider font-mono">
              <Lightbulb className="w-4 h-4" />
              <span>Memory Association Story</span>
            </div>

            <p className="text-sm text-stone-800 dark:text-stone-200 leading-relaxed font-sans">
              {kanji.mnemonic.storyEn}
            </p>

            <div className="pt-2 border-t border-stone-200 dark:border-stone-800 text-sm font-medium text-stone-700 dark:text-stone-300 leading-relaxed">
              <span className="font-bold text-[#ff5700]">বাংলা ভাবার্থ: </span>
              {kanji.mnemonic.storyBn}
            </div>
          </div>

          {/* Memory Aid Disclaimer as explicitly required */}
          <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-800 dark:text-amber-300 flex items-start gap-2.5">
            <Info className="w-4 h-4 shrink-0 mt-0.5 text-amber-600 dark:text-amber-400" />
            <span className="leading-snug">
              <strong>Memory Aid Notice:</strong> This original illustration is designed specifically to help you associate the character's shape with its meaning. It is an optimized cognitive visual aid, not a strict historical etymology.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
