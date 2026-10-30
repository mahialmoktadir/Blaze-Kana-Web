import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Volume2, VolumeX, Square, Gauge, Snail, Play } from 'lucide-react';

export interface TTSAudioButtonProps {
  /** The Japanese text or kana to pronounce */
  text: string;
  /** Secondary reading text (kana or romaji) for clarity */
  reading?: string;
  /** Optional custom button label */
  label?: string;
  /** Button sizing: 'xs' | 'sm' | 'md' | 'lg' */
  size?: 'xs' | 'sm' | 'md' | 'lg';
  /** Display style variant */
  variant?: 'icon' | 'button' | 'sentence-bar' | 'compact';
  /** Enable toggleable slow-speed (turtle) mode */
  enableSpeedToggle?: boolean;
  /** Custom playback rate override (e.g. 0.75 for slow) */
  customRate?: number;
  /** Additional custom Tailwind CSS classes */
  className?: string;
  /** Tooltip or accessible label */
  title?: string;
  /** Prevents card click propagation when inside interactive cards */
  stopPropagation?: boolean;
}

export const TTSAudioButton: React.FC<TTSAudioButtonProps> = ({
  text,
  reading,
  label,
  size = 'md',
  variant = 'icon',
  enableSpeedToggle = false,
  customRate,
  className = '',
  title,
  stopPropagation = true,
}) => {
  const { toggleSpeakText, stopSpeakText, currentlySpeaking, isSpeaking, settings } = useApp();
  const [isSlow, setIsSlow] = useState(false);

  // Check if this specific audio button is actively speaking
  const speakPayload = reading || text;
  const isPlayingThis = isSpeaking && currentlySpeaking === speakPayload;

  const handleToggle = (e: React.MouseEvent) => {
    if (stopPropagation) {
      e.stopPropagation();
      e.preventDefault();
    }

    if (isPlayingThis) {
      stopSpeakText();
    } else {
      const rate = customRate ?? (isSlow ? 0.72 : (settings?.audioSpeed || 0.95));
      toggleSpeakText(speakPayload, rate);
    }
  };

  const toggleSpeed = (e: React.MouseEvent) => {
    if (stopPropagation) {
      e.stopPropagation();
      e.preventDefault();
    }
    const newSlow = !isSlow;
    setIsSlow(newSlow);
    // If currently playing, restart at new speed
    if (isPlayingThis) {
      const rate = newSlow ? 0.72 : (settings?.audioSpeed || 0.95);
      toggleSpeakText(speakPayload, rate);
    }
  };

  const effectiveTitle = title || (
    isPlayingThis 
      ? 'Playing pronunciation. Click to stop audio.' 
      : `Hear Japanese pronunciation${isSlow ? ' (Slow 0.7x)' : ''}`
  );

  // Soundwave visualizer bars when actively playing
  const SoundWaveBars = () => (
    <div className="flex items-center gap-[2px] h-3 px-0.5" aria-hidden="true">
      <span className="w-[2.5px] h-2 bg-[#ff5700] rounded-full animate-bounce [animation-delay:-0.3s]" />
      <span className="w-[2.5px] h-3 bg-[#ff5700] rounded-full animate-bounce [animation-delay:-0.15s]" />
      <span className="w-[2.5px] h-1.5 bg-[#ff5700] rounded-full animate-bounce [animation-delay:-0.45s]" />
    </div>
  );

  // Size specific dimensions
  const sizeClasses = {
    xs: 'p-1 text-[11px]',
    sm: 'p-1.5 text-xs',
    md: 'p-2 text-xs',
    lg: 'px-3 py-2 text-sm',
  };

  const iconSizes = {
    xs: 'w-3 h-3',
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  // Variant: Sentence Bar (ideal for example sentence cards & comprehension dialogues)
  if (variant === 'sentence-bar') {
    return (
      <div 
        className={`flex items-center gap-1.5 ${className}`}
        onClick={stopPropagation ? (e) => e.stopPropagation() : undefined}
      >
        <button
          type="button"
          onClick={handleToggle}
          title={effectiveTitle}
          aria-label={effectiveTitle}
          aria-pressed={isPlayingThis}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all select-none shadow-xs cursor-pointer ${
            isPlayingThis
              ? 'bg-[#ff5700]/10 dark:bg-[#ff5700]/20 border-[#ff5700] text-[#ff5700] dark:text-[#ff8533] ring-2 ring-[#ff5700]/20'
              : 'bg-white dark:bg-stone-800 border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-700 hover:border-stone-300 dark:hover:border-stone-600 hover:text-[#ff5700]'
          }`}
        >
          {isPlayingThis ? (
            <>
              <SoundWaveBars />
              <Square className="w-3.5 h-3.5 fill-[#ff5700] text-[#ff5700]" />
              <span className="font-semibold text-[11px]">Stop</span>
            </>
          ) : (
            <>
              <Volume2 className="w-3.5 h-3.5" />
              <span>{label || 'Listen to Sentence'}</span>
            </>
          )}
        </button>

        {enableSpeedToggle && (
          <button
            type="button"
            onClick={toggleSpeed}
            title={isSlow ? 'Switch to Normal Speed (1.0x)' : 'Switch to Slow Speed (0.7x)'}
            aria-label={isSlow ? 'Slow Speed Active' : 'Normal Speed Active'}
            className={`px-2 py-1.5 rounded-lg border text-[11px] font-mono transition-colors flex items-center gap-1 cursor-pointer ${
              isSlow
                ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-700 text-amber-700 dark:text-amber-400 font-bold'
                : 'bg-stone-50 dark:bg-stone-800/80 border-stone-200 dark:border-stone-700 text-stone-500 hover:text-stone-800 dark:hover:text-stone-200'
            }`}
          >
            <Snail className="w-3 h-3" />
            <span>{isSlow ? '0.7x' : '1.0x'}</span>
          </button>
        )}
      </div>
    );
  }

  // Variant: Button with Label
  if (variant === 'button') {
    return (
      <div 
        className={`inline-flex items-center gap-1.5 ${className}`}
        onClick={stopPropagation ? (e) => e.stopPropagation() : undefined}
      >
        <button
          type="button"
          onClick={handleToggle}
          title={effectiveTitle}
          aria-label={effectiveTitle}
          aria-pressed={isPlayingThis}
          className={`flex items-center gap-2 rounded-xl border transition-all cursor-pointer font-medium select-none shadow-xs ${sizeClasses[size]} ${
            isPlayingThis
              ? 'bg-[#ff5700]/10 dark:bg-[#ff5700]/20 border-[#ff5700] text-[#ff5700] dark:text-[#ff8533] ring-2 ring-[#ff5700]/20 font-semibold'
              : 'bg-stone-50 dark:bg-stone-800 border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:bg-white dark:hover:bg-stone-700 hover:border-stone-300 dark:hover:border-stone-600 hover:text-[#ff5700]'
          }`}
        >
          {isPlayingThis ? (
            <>
              <SoundWaveBars />
              <Square className="w-3.5 h-3.5 fill-[#ff5700] text-[#ff5700]" />
              <span>Stop Audio</span>
            </>
          ) : (
            <>
              <Volume2 className={iconSizes[size]} />
              <span>{label || 'Pronounce'}</span>
            </>
          )}
        </button>

        {enableSpeedToggle && (
          <button
            type="button"
            onClick={toggleSpeed}
            title={isSlow ? 'Switch to Normal Speed (1.0x)' : 'Switch to Slow Speed (0.7x)'}
            aria-label={isSlow ? 'Slow Speed Active' : 'Normal Speed Active'}
            className={`px-2 py-1.5 rounded-xl border text-[11px] font-mono transition-colors flex items-center gap-1 cursor-pointer ${
              isSlow
                ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-700 text-amber-700 dark:text-amber-400 font-bold'
                : 'bg-white dark:bg-stone-800 border-stone-200 dark:border-stone-700 text-stone-500 hover:text-stone-800 dark:hover:text-stone-200'
            }`}
          >
            <Snail className="w-3 h-3" />
            <span>{isSlow ? '0.7x' : '1.0x'}</span>
          </button>
        )}
      </div>
    );
  }

  // Variant: Compact / Icon Toggle (Default)
  return (
    <div 
      className={`inline-flex items-center gap-1 ${className}`}
      onClick={stopPropagation ? (e) => e.stopPropagation() : undefined}
    >
      <button
        type="button"
        onClick={handleToggle}
        title={effectiveTitle}
        aria-label={effectiveTitle}
        aria-pressed={isPlayingThis}
        className={`rounded-lg border transition-all cursor-pointer flex items-center justify-center select-none shadow-xs ${sizeClasses[size]} ${
          isPlayingThis
            ? 'bg-[#ff5700]/10 dark:bg-[#ff5700]/20 border-[#ff5700] text-[#ff5700] dark:text-[#ff8533] ring-2 ring-[#ff5700]/20'
            : 'bg-stone-50 dark:bg-stone-800/90 border-stone-200 dark:border-stone-700/80 text-stone-500 dark:text-stone-400 hover:text-[#ff5700] hover:border-stone-300 dark:hover:border-stone-600 hover:bg-white dark:hover:bg-stone-700'
        }`}
      >
        {isPlayingThis ? (
          <div className="flex items-center gap-1">
            <SoundWaveBars />
            <Square className={`${iconSizes[size]} fill-[#ff5700] text-[#ff5700]`} />
          </div>
        ) : (
          <Volume2 className={iconSizes[size]} />
        )}
      </button>

      {enableSpeedToggle && (
        <button
          type="button"
          onClick={toggleSpeed}
          title={isSlow ? 'Slow Speed Active (0.7x). Click for Normal (1.0x)' : 'Click for Slow Speed (0.7x)'}
          aria-label={isSlow ? 'Slow Speed Active' : 'Normal Speed Active'}
          className={`px-1.5 py-1 rounded-md border text-[10px] font-mono transition-colors cursor-pointer ${
            isSlow
              ? 'bg-amber-100 dark:bg-amber-950/60 border-amber-300 dark:border-amber-700 text-amber-800 dark:text-amber-300 font-bold'
              : 'bg-stone-50 dark:bg-stone-800/60 border-stone-200 dark:border-stone-700 text-stone-400 hover:text-stone-600'
          }`}
        >
          {isSlow ? '0.7x' : '1.0x'}
        </button>
      )}
    </div>
  );
};
